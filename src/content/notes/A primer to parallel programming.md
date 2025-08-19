---
title: "A primer to parallel programming"
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

## The dual meaning of multi-threading

Physical CPU cores are single-threaded yet with simultaneous multi-threading (SMT) or hyper-threading (Intel's implementation of SMT), unused execution units are allocated to run another thread, thereby allowing the CPU to approach its theoretical maximum performance. This is possible by the sharing of resources between the _virtual_ (or _logical_) cores on the same physical core.

Although a hyper-threaded core is treated by the operating system as two entirely separate cores, in reality, virtual cores aren't fully independent because they have to contend with each other for unshared resources, like memory.

Of particular note is the difference between a physical core and a physical thread. A physical core is a processing unit that reads and executes instructions, having ts own arithmetic logic unit (ALU), registers, and cache. A physical thread, on the other hand, is a single sequence of instructions that can be executed in parallel with other sequences of instructions. In a single-core CPU, there is typically only one physical thread per core, but in a multi-core CPU, there can be multiple physical threads per core, made possible by SMT. For example, a quad-core CPU with SMT that supports two threads per core would have a total of 8 physical threads. However, it would still only have 4 physical cores.

A CPU that supports SMT allows the operating system to tell which logical cores share a physical core by reading the CPUID data. OpenMP has no built-in support to detect SMT.

In software development, multi-threading has a different meaning than in computer architecture, where it refers to running multiple tasks i.e. function calls, concurrently on a single hardware thread (or a CPU core if it is single-threaded). This is often achieved by **time-slicing**; each thread gets a few milliseconds to execute before the OS schedules another thread to run on the same core. This gives the impression that one hardware thread is running multiple software threads at once, when in reality, it is only running one thread at a time which is quickly switching between many software threads. A **synchronous** workflow is when the CPU waits for a task to be completed before moving on to another task. Time-slicing is therefore an **asynchronous** (non-blocking) operation.

Therefore, in the hardware sense, a multi-threaded program can run concurrent tasks (synchronously or asynchronously) on different cores. This is one of two forms of parallel computing, the other being multi-threading on multiple processors.

## Writing parallel programs

OpenMP is a programming model for shared memory parallel computing, which means it can take full advantage of SMT-enabled processors. It consists of a set of compiler directives, library routines, and environment variables that define the threading behaviour at runtime.

MPI, on the other hand, is a message passing interface for distributed memory parallel computing. MPI programs can run on SMT-enabled processors, but SMT does not directly affect the communication between MPI processes. However, SMT can still provide performance benefits for MPI applications by allowing multiple MPI processes to run simultaneously on a single physical core, potentially reducing contention for shared resources such as cache and memory bandwidth.

MPI consists of a standardised set of low-level routines which parallel hardware vendors use as a blueprint to create higher-level routines for the distributed-memory communication environment supplied with their machines. It has become the _de facto_ standard for parallel programming on a distributed memory system.[^1]

Each parallel process executes a designated portion of the global problem on a separate logical core, independently from the rest. If more processes are requested than the available threads, everything will run, but with a lower efficiency.

This [StackOverflow thread](https://stackoverflow.com/questions/2427399/mpich-vs-openmpi) delves into the differences between two popular MPI implementations, MPICH and Open-MPI.

Usually in traditional HPC, you are expected to write parallel code to scale across multiple nodes, each having one or more sockets (like 2 AMD 64-core CPUs). Theoretically you get the best performance with something like 1 MPI process per socket with OpenMP utilizing the threads on that socket.

Whether you need or want MPI or OpenMP (or both) heavily depends the type of application you are running, and whether your problem is mostly memory-bound or CPU-bound (or both). OpenMP tends to suffer from memory limitations, so be wary of that when doing memory-intensive calculations.

Note that in Python, there are several libraries that provide an easy-to-use API to spawn processes in parallel without the need to resort to either OpenMP or MPI.

## Final considerations

It's worth noting that while SMT can provide performance benefits, it can also introduce additional complexity and potential issues related to thread scheduling, resource contention, and synchronization. Careful tuning and optimization may be required to fully realize the benefits of using SMT with OpenMP and MPI.

The memory bus can become saturated beyond a certain number of threads or cores; in such a situation, any further increase not only won't improve performance, but may end up reducing it.

Other common issues with this approach include:

- **task granularity** Finding the right balance between computation time (the time required to perform the computation of a task) and communication time (the time required to exchange data between processors);
- **memory allocation** Allocating a lot of memory typically means that you will also need to do a lot of garbage collection work to reclaim memory that has been freed; check if the garbage collection algorithm is adequate;
- **load balancing** Make sure to split the work evenly among the available threads; a lower performance is achieved if more hardware threads are specified than those available in the CPU.

Parallelizing a program that is I/O-bound won't achieve significant performance benefits unless it is coupled with software multi-threading. Conversely, software multi-threading for CPU-bound tasks will result in a slower execution time but improved performance with parallelization.

[^1]: In larger systems, the distribution of processes is handled by resource managers (job schedulers), such as SLURM.
