---
title: "Building a cost-effective ETL pipeline with DuckDB, dbt, and Prefect"
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

I've refrained from going through every aspect of the language, only highlighting those details which are unique to JavaScript. If you're still a beginner, consider this [free JavaScript course](https://javascript.info/). A seasoned developer who writes code in other languages will already be familiar with object-oriented concepts but may not have the same level of exposure to functional concepts.

## 1. The ECMAScript standard

JavaScript is an implementation of the ECMAScript standard, created to unify the language's specifications and features. You can learn more about it [here](https://exploringjs.com/impatient-js/ch_history.html#standardizing-javascript). Since ES6, arguably the last major update to the standard, newer editions have been released on a yearly basis.

While ES6 is supported in all modern browsers[^1] and runtimes, it has by no means replaced ES5. Moreover, since many of the new features in ES6 are syntactic sugar for ES5 features, you won't understand how they work and actually improve things without being familiar with ES5 syntax. For instance, in ES5, a constructor function needs to be defined for object instantiation:

```javascript
var SpaceShuttle = function (targetPlanet) {
  this.targetPlanet = targetPlanet;
};
var zeus = new SpaceShuttle("Jupiter");
```

In ES6, the constructor function is replaced with a class syntax:

```javascript
class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}
const zeus = new SpaceShuttle("Jupiter");
```

ECMAScript proposals don’t cause breaking changes, [in general](https://www.reddit.com/r/learnjavascript/comments/16hyjw1/comment/k0hwlvk/?context=3&share_id=KfmvL33UX20vZ9ZfZ40mF&utm_content=1&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1) -- only optimizations to existing runtime code, which makes perfect sense given its widespread use.

## 2. Dynamic typing is the default

In JavaScript, types are resolved at runtime, which means errors will go unnoticed until the code is executed.

What mainly differentiates TypeScript from JavaScript is its statically type system. This makes the code more readable since it shows intent, whilst also narrowing usage, which helps prevent a lot of bugs.

Refactoring is also improved, thanks to TypeScript's superior LSP capabilities. When you make a code change, your editor will instantly show you all the places that need fixing. Having said that, debugging type errors can be painful, but if you're using VSCode, the Pretty Typescript Errors extension can help you with that. To learn more about TypeScript, consider watching this [Youtube series](https://www.youtube.com/playlist?list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n).

TypeScript is a Javascript superset but also a compiler which compiles its own features into JS "workarounds". Its functionality is similar to Babel when it comes to using next-gen JS features as they will get compiled down for older browsers. The compiler can be configured according to your requirements.

Instead of switching to TypeScript and be forced to accept all of its other differences, you might want to consider using Flow, a static type checking library that allows you to incrementally add types to your JavaScript code. See this [tutorial](https://www.freecodecamp.org/news/why-use-static-types-in-javascript-part-1-8382da1e0adb/) to get started.

## 3. jQuery

The Document Object Model (DOM) allows JS code to directly interact with HTML and CSS. Browsers construct the DOM by storing all HTML tags as JS objects:

```javascript
console.dir(document); // displays DOM
document.querySelectorAll("a")[3]; // searches for a specific HTML tag is this a wrap?
```

jQuery used to be a popular JavaScript library for manipulating the DOM. Notice the syntax changes in the following example, adding an attribute to a matching element index:

```javascript
// jQuery
var subhead = $("h2");
subhead.eq(0).css("color", "red");

// JS
var subhead = document.querySelectorAll("h2");
subhead.style.color = "red";
```

However, with the introduction of frameworks like React which update the DOM more efficiently using a virtual DOM diffing algorithm, and [most of its features becoming native to JavaScript,](https://youmightnotneedjquery.com/) its use diminished considerably.

So why am I mentioning it? Because it's worthwhile to know how much JavaScript has come along since 2006 when jQuery was first released. Moreover, it adds much needed context for introducing AlpineJS, a minimal framework "for composing behaviour directly in your markup" and, arguably, the spiritual successor to jQuery.

## 4. Strict mode

Introduced in ES5, strict mode provides a way to opt into a restricted variant of JavaScript which helps in catching common coding mistakes and unsafe actions by throwing errors. For example, it prevents the use of undeclared variables, eliminates silent errors, and disallows duplicate property names or parameters.

Strict mode can be enabled for an entire script by placing the `"use strict";` directive at the beginning of the script, or limited to a specific function by placing the directive at the beginning of the function.

Note that anything inside a class block is already in strict mode, as well as all the module-level code. Therefore, if you're only writing code for modules, there is no need to include the directive anywhere because it's already implied.

## 5. Primitives

Primitives aren't objects, have no methods of their own (though they have a constructor), and are immutable. When trying to access a method on a primitive, JavaScript will use its constructor to make an object out of that primitive. Once the method is run, the object is garbage collected.

The supported primitive data types are _undefined_, _null_, _boolean_, _string_, _symbol_, and _number_.

## 6. It's a prototypal language

Prototype-based programming is a form of object-oriented programming which supports behaviour reuse (the equivalent of inheritance in class-based languages) by cloning existing objects that serve as prototypes. See [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) for details.

Constructors are functions which define the properties and behaviours of new objects that are called upon using the `new` keyword.

Use the dot notation or bracket notation (preferred) to access an object's properties.

`hasOwnProperty()` returns a boolean, depending on whether the property is present within the object. This method is defined in `Object.prototype`.

## 7. Callbacks

Callbacks are functions that are passed into another function to decide the invocation of that function, be it either synchronous or asynchronous.

## 8. Promises

A promise is a constructor which takes a function as its argument with two parameters: a resolve and a reject method. These methods are used to determine the outcome of the promise.

```javascript
const myPromise = new Promise((resolve, reject) => {
    if (condition here) {
        resolve("Promise was fulfilled");
    } else {
        reject("Promise was rejected");
    }
});
```

Promises are most useful when you have a process that takes an unknown amount of time in your code and you want to do something with the response. This can be achieved using the `then` method, executed after the promise is fulfilled with resolve:

```javascript
myPromise.then((result) => {
  log.console(result);
});
```

`PromiseJobs` is an internal FIFO queue for asynchronous tasks. Promise handlers always go through this internal queue.

## 9. Currying

## 10. A runtime environment is needed

Something like Node.js is really needed if you are depending a library; if you're working on a front-end web application, load JS libraries from a CDN.

JS libraries can be dynamically imported.

If you're doing server-side development, you will also be needing a package manager.

[^1]: It took several years until browsers implemented all of the features introduced in ES6, so a transpiler like Babel used to be necessary to convert ES6 into ES5 code.
