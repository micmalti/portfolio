---
title: Calculus
updated: 2025-08-19 13:52:45Z
created: 2024-12-22 03:24:48Z
latitude: 48.57340530
longitude: 7.75211130
altitude: 0.0000
tags:
  - productivity
  - ui/ux
---

```python
    def __repr__(self):
        return f"Student({self.first_name!r}, {self.last_name!r}), {self.last_name!r})"
```
$$
m=\frac{y-y_0}{x-x_0}=\frac{f(x+\Delta x)-f(x_0)}{\cancel{x}+\Delta x-\cancel{x_0}}=\frac{\frac{1}{x_0+\Delta x}-\frac{1}{x_0}}{\Delta x}=\frac{\cancel{x_0}-(\cancel{x_0}+\cancel{\Delta x})}{\cancel{\Delta x}(x_0(x_0+\Delta x))} = -\frac{1}{x_0^2+\Delta x}
$$

setting $h=0$ produces **binomial expansion** limited to linear terms:
$$
f(x) \approx1-\frac{1}{2}x
$$
$\therefore T' \approx T(1+\frac{1}{2}\frac{v^2}{c^2})$

simpler relationship valid whenever errors are negligible for the particular problem at hand:
$$
\frac{\Delta T}{T}=\frac{1}{2}\frac{v^2}{c^2} \qquad\textnormal{where}\,\,\,\, \Delta T = T'-T
$$
when linear approximation insufficient, quadratic approximations used, like log quadratic instead of log linear functions in economics

:::note
for linear approximation of $f(x)=(1+x)^r$, re-expressed in terms of $h$:
$$
f(h)=(1+h)^r\\
f'(h)=r(1+h)^{r-1}
$$
at $h=0$,
$$
f(x) \approx 1+rx
$$
similarly, for $f(x)=\ln(1+x)$:
$$
f(h)=\ln(1+h)\\
f'(h)=\frac{1}{1+h}
$$
at $h=0$,
$$
f(x) \approx x
$$
:::

to calculate area under tangent line of $f(x)=\frac{1}{x}$ at $P$, enclosed by axes, necessary to find both x-intercept i.e. $x$ at $x=0$, and y-intercept i.e. $y$ at $x=0$:
![](../_resources/Screenshot_20250105_174757.png){width=50%}
which can be done by first finding $f'(x)$ via tangent line equation:

so, in the limit $x \rarr 0$,
$$
f'(x_0)=-\frac{1}{x_0^2}
$$
now, using the same equation but with $x,y$ values on tangent line:
$$
m=\frac{y-y_0}{x-x_0} \quad \rArr \quad  y-y_0=m(x-x_0)

$$
at $y=0$,
$$
0-\frac{1}{x_0}=-\frac{1}{x_0^2}(x-x_0)\\
x=2x_0
$$
at $x=0$:
$$
y-\frac{1}{x_0}=-\frac{1}{x_0^2}\left(0-x_0\right)\\
y=2\frac{1}{x_0}
$$
therefore, area equal to $\frac{1}{2}(2x_0)(2\frac{1}{x_0})= 2$

:::warning
it may be confusing to see role of a letter in a computation change midway, but this done for convenience to avoid need for defining an extra variable
:::

in terms of rate of change, while $\frac{\Delta y}{\Delta x}$ represents average change, its limiting value $\frac{\delta y}{\delta x}$ is the instantaneous rate - differential calculus relies on notion of an infinitesimal change, $\delta x$ to obtain slope at any point along the curve

for distance travelled, $d(t)$ its derivative represents instantaneous speed at time $t$:
$$
\delta y=f'(x)\delta x \quad \rArr \quad \delta d = s(t)\delta t  \\
s(t)=\frac{\delta d}{\delta t}
$$
as opposed to average speed which only returns same outcome when speed is constant:
$$
s(t)= \Delta d/ \Delta t
$$
:::note
$y(x)$ explicitly denotes $y$ as function of $x$, allowing use of derivative notation shorthand, $y'(x)$ i.e. Lagrange's notation, in favour of Leibniz's notation, $\frac{\delta y}{\delta x}$ or $\frac{\delta }{\delta x}y$ which aptly represents an "operator" applied to a function - both notations valid, provided they explicitly show differentiation with respect to $x$
:::

contrast this with integral calculus where, to recover $d(t)$ for time interval $[0,n]$ given $s(t)$, necessary to imagine chopping up interval into infinitesimally small intervals to recover *constant* speed within each interval which, when multiplied by interval size reveals distance travelled, to then sum them up for all intervals:
$$
d(t)=\lim_{\Delta t \rarr 0} \sum_{i=1}^n\left(\frac{\Delta d_i}{\Delta t_i}\right)\Delta t_i = \int \frac{\delta d}{\delta t}\delta t = \int s(t) \delta t
$$
where $s(t_i)\Delta t$ is **Riemann sum**

by the same logic, finding volume of a three-dimensional object:
$$
V = \int A(x) \delta x
$$
specifically, for solids of revolution, made by rotating a two-dimensional shape, say curve of $f(x)=\sqrt{x}$, around an axis of rotation, say x-axis, volume calculated by defining integrand as a slice of a disk of radius $f(x)$, thereby having an area $\pi f^2(x)$:
$$
V=\pi\int_0^1 x\delta x=\frac{\pi}{2}
$$
this works because each disk assumed to have infinitesimal height, and disk radius is a function expressed in terms of height - review [example problem](https://www.youtube.com/watch?v=Lbg1M0PTy1A) and [this one](https://youtu.be/ShGBRUx2ub8?list=PL590CCC2BC5AF3BC1&t=591) to find volume of a sphere

:::note
a different solid of revolution will be obtained when rotating curve around some other axis (see [here](https://youtu.be/ShGBRUx2ub8?list=PL590CCC2BC5AF3BC1&t=1270) for method of shells)
:::

$$
\begin{aligned}
&\qquad \qquad \qquad \qquad\textbf{Integral} & \quad\textbf{Function} &\quad \qquad \quad\textbf{Derivative}\\
& G(x)=\int y'(x)\delta x=\frac{1}{n+1}x^{n+1} +c;\quad n\neq-1&   y=x^n &  \qquad \frac{\delta y}{\delta x}=nx^{n-1};\quad n\neq0 \\
\end{aligned}
