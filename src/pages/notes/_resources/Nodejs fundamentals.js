/*
Node.js is a JavaScript runtime intended for running JS code server-side. PHP and Java
run their tasks synchronously, whereas Node.js uses a single thread that can support 
thousands of connections concurrently. This optimizes throughput and scalability in 
apps with many I/O operations but must be avoided for CPU-intensive applications.

Node.js is built on a V8 JavaScript engine which executes code in a series of steps.
Firstly, a global execution context (usually an anonymous function) is created to serve 
as a space to run all the code that the engine receives. Every function call is pushed
to the top of the call stack (a LIFO queue) and a new function execution context is 
created, similar to the global execution context except for the arguments object which
contains a reference to all the parameters passed into the function. Besides, a stack 
frame is also created; this is a location in memory where parameters and variables are
stored. This memory gets cleared when the function returns and the whole context then
gets removed from the call stack.

Functions that might take a long time to complete are written with a callback function
that encapsulates the code for later execution when the blocking action is resolved. 
This returns control to the engine and defers the rest of the execution until after the
call stack has been cleared. The callback queue stores callbacks, including those 
triggered by external events, such as mouse clicks.

During code execution, the call stack keeps track of the currently executing function
context, the callback queue keeps track of any execution contexts that need to be run 
at a later stage, and the event loop periodically checks if the call stack is empty. 
When all execution contexts are executed, the event loop takes the first function that
entered the callback queue, places it on the call stack to be executed and the process
repeats itself until both the call stack and callback queue are empty.  

See docs: https://nodejs.org/docs/latest-v10.x/api/index.html
*/

// Some built-in modules

const path = require("path");
const fs = require("fs");
const os = require("os");

/*
The cluster module supports two methods of distributing incoming connections:
1. Round-robin (default); the master process listens on a port, accepts new connections
   and distributes them across the workers in a round-robin fashion, with some built-in 
   smarts to avoid overloading a worker process.
2. The master process creates the listen socket and sends it to interested workers. The
   workers then accept incoming connections directly, which should improve performance.
   In practice, distribution tends to be very unbalanced due to OS scheduler vagaries.
   Loads have been observed where over 70% of all connections ended up in just 2 
   processes, out of a total of 8.
*/

fs.readFile('./example.txt', 'utf8', (err, content) => {
  if (err) {
    throw err;
  } else {
    console.log(content);
  };
  });  

/*
readFile must load the entire file into a full buffer (which may not be large enough)
before serving it. readStream and writeStream are more memory-efficient because they 
read and write data in chunks, thereby utilizing a smaller buffer size.
*/

const readStream = fs.createReadStream('./example.txt', 'utf8');
const writeStream = fs.createWriteStream('./newfile.txt');

readStream.on('data', (chunk) => {  // module inherits from EventEmitter class
  writeStream.write(chunk);       // starts writing before file is fully loaded; more efficient
});
// shorthand version
readStream.pipe(writeStream);  // specifies source stream and destination stream

console.log(path.parse(__filename));  // returns file object

fs.mkdir(path.join(__dirname, "/test"),{}, err => {  // asyc errors aren't handled by try/catch loops as in the case of sync processes
    if(err) {
        throw err;
    }  // throws error if folder exists
    console.log("Folder created");
    fs.writeFile(
        path.join(__dirname, '/test', "hello.txt"), "Hello world!\n",
        err => {
            if(err) {
                throw err;
            };   
            console.log("File written");
            fs.appendFile(
                path.join(__dirname, '/test', "hello.txt"), "I'm learning Node.js",
                err => {
                    if (err) throw err;  // { } are recommended but can be omitted for one-liner if statements
                    console.log("Comment appended")
                }
            );
        }
    );
});  // nested callbacks

console.log(os.cpus());
console.log(os.freemem());
console.log(os.totalmem());

// Event-driven programming

const EventEmitter = require("events");

/*
Much of the Node.js core API is built around an idiomatic asynchronous event-driven 
architecture in which certain kinds of objects (called "emitters") emit named events 
that cause Function objects ("listeners") to be called. 
*/

class MyEmitter extends EventEmitter { }

// Instances of the EventEmitter class are created to bind events to listeners:
const myEmitter = new MyEmitter();

myEmitter.on("event", (n) => console.log(`Event ${n} fired`));  // event listener
myEmitter.emit("event", 27);  // event

// Create an event-driven logger

const uuid = require("uuid");

class Logger extends EventEmitter {
    log(msg) {
        // Call event
        this.emit("message", {id: uuid.v4(), msg:msg});
    };
};

const logger = new Logger();
logger.on("message", (data) => console.log("Called listener", data));
logger.log("Hello there!");

// Set up a basic web server

const http = require('http');

http.createServer((req, res) => {
    res.write("Hello world!");  // outputs response to browser
    res.end();
})  // server object
    .listen(5000, () => console.log("Server running..."))

// Set up a web server without Express.js

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/api/users') {
    const users = [
      {name: 'Mike Tyson', age: 67},
      {name: 'Tina Turner', age: 64}
    ];
    res.writeHead(200, {'Content-Type':'application/JSON'});
    res.end(JSON.stringify(users));  // converts JS object into a JSON object
  };
  if (req.url === '/luffy.jpg') {
    const readStream = fs.createReadStream(path.join(__dirname, 'public', 'luffy.jpg'));
    res.writeHead(200, {'Content-Type':'image/png'});
    readStream.pipe(res);
  };
  const contentTypeObject = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg'
  };
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url);
  let contentType = contentTypeObject[path.extname(filePath)];
  fs.readFile(filePath, (err, content) => {
    if(err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf8');
        }) 
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, {'Content-Type': contentType}); // sets content type according to the file extension
      res.end(content, 'utf8');  // sends response
    }
  });
});

const PORT = process.env.PORT || 5000; // checks for the host port environment variable first 

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`))

// Set up a web server with Express.js

/*
While not part of Node.js, Express is a module which runs between the server created by
Node.js and frontend pages of a web app. It handles routing, directing users to the 
correct page based on their interaction with the application.
*/

const express = require('express');
const app = express();  // factory function (creates and returns an object when called)

// Absolute file paths can be generated as follows:
const absolutePath = __dirname + "/views/index.html";

/*
Routing syntax in Express: app.METHOD(PATH, HANDLER)
  METHOD: an http method in lowercase
  PATH: a relative server path (string/regex)
  HANDLER: a function called when the path matches the route
*/

app.get('/', (req, res) => {
  res.sendFile(absolutePath);  // reads and sends the requested file
});

/*
A middleware function extends the capabilities of a route handler by adding information 
to the request or response objects (its arguments) when a request matches the route. If
a given condition isn't met to trigger a response, the function will execute the next 
function in the application’s request-response cycle (its other argument).
*/

const middlewarePath = __dirname + "/public";
const middlewareFunction = express.static(middlewarePath);  //specifies path of the folder containing the assets
app.use(middlewareFunction); // without a stated path, middleware is executed for all requests

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

/*
The above functions are executed for all request types, these may be changed to execute
only POST requests, or other HTTP verbs as shown in earlier examples.
*/

/*
A server can have a number of HTTP services which clients can call using HTTP requests.
Every HTTP request has a method which determines its intention, the standard ones being
GET, POST (creating data), PUT (updating data) and DELETE. 

REST (REpresentational State Transfer) is a convention for building such HTTP services.
Simple HTTP protocol principles are used to create, read, update and delete data, 
collectively referred to as CRUD operations. A REST API allows data exchange without 
the need for clients to know anything about the server other than the resource URL and
the action required (usually GET to fetch data). 
*/

app.get('/json', (req, res) => {
  res.json({"message": "Hello json"});  // API response
});

/*
When building an API, we have to allow users to communicate to us what they want to get
from our service. This is achieved by using route parameters, named segments of the URL
delimited by /, where each segment captures the value of the part of the URL which 
matches its position. The captured values can be found in the req.params object.
*/

app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word});
});

/*
Another way to get input from the client is by using a query string, delimited by a ?,
which consists of field=value couples separated by an &. Express parses data from the 
query string and populate the req.query object. Some characters, such as %, cannot be 
in URLs so they have to be encoded in a different format before you can send them. 
*/

app.get('/name', (req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({"name": `${firstName} ${lastName}`});
});

/*
In REST convention, POST is used to send data to create new items in the database. For
such requests, the data is hidden in the request body and encoded like a query string,
the default format used by HTML forms; multipart/form-data encoding is used to upload 
binary files, whereas more complex JSON data structures can be handled with Ajax.

Middleware can also be chained inside a route definition. This approach is useful for 
performing some validation on the data; at each point of the middleware stack you can 
block the execution of the current chain and pass control to functions specifically 
designed for error handling, or to pass control to the next matching route to handle
special cases. 
*/

app.use(bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({"name": `${firstName} ${lastName}`});
});

/*
Sensitive information should be stored as environment variables in a .env file to keep
it private. Remember to put this file in the .gitignore list.
*/

// To add an environment variable inside .env, strictly follow this syntax:
VAR_NAME=uppercase

// To access environment variables from the app:
process.env.VAR_NAME

// To listen on a given port, putting the server in a running state:
app.listen(5000);

/*
AJAX allows web pages to be updated asynchronously by exchanging data with a web server 
behind the scenes, making it possible to update parts of a web page without reloading 
the whole page. This is achieved using a browser built-in XMLHttpRequest object which 
requests data from a web server following a specific DOM event. The response is read by
JS and proper action is taken.
*/

// Syntax for creating an XMLHttpRequest object:
const ajaxObject = new XMLHttpRequest();

/*
Since modern browsers prevent access across domains for security reasons, both the web 
page and any file that is fetched must be located on the same server.
*/