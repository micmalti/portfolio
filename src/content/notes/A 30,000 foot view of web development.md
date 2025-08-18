---
title: "A 30,0000 foot view of web development"
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

So, if you’re probably one of those people who shows a keen interest in web development but feels lost in the sea of terminology that this field is bogged with, then you’re at the right place. What follows is a summary of my journey to get my head wrapped around web development.

*Review 'Python Testing With Pytest' by Brian Okken*

**Client-side** (aka front-end) development deals with user interaction; anything which appears on screen comes from the website’s front-end. Webpage content (forms, buttons, text, etc.) is written in **HTML5**, styled with **CSS** and rendered interactive by **JavaScript**.

Most entry-level articles about front-end development generally stop here, but this ain’t some superfluous article so we’re digging deeper.

A good place to start is the [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/).

## HTML is enough, really

*ML* in HTML stands for **markup language**, a language that annotates text that is displayed on a website. Annotations are enclosed in markup tags and serve to instruct browsers on how to display the HTML file contents. For instance, text in between `<p>` and `</p>` tags appears as a paragraph.

Custom tags in addition to the ones defined by the [W3C](https://www.lifewire.com/what-is-the-w3c-3469951) can be created using **XML**, which is a language for writing markup languages. Standardised markup languages written in XML also exist such as MathML for defining mathematical notation.

HTMX

## CSS for that extra flare

While HTML uses tags, CSS makes use of selectors. Each selector, containing one or more styling properties, is linked to an HTML element either by specifying the latter’s name, thus becoming an **HTML selector** or by defining it as a **class selector** or **ID selector** and adding the corresponding attribute to the HTML element like so:
```html
.intro {font-size: 20px }
<p class=”intro”>This is a paragraph</p>

#words {font-size: 20px }
<p id=”words”>This is another paragraph</p>
```

Unlike class attributes which can be defined more than once, ID attributes can only be specified once so there are those who try to avoid using ID selectors. **Nested selectors**, **child selectors** and **adjacent selectors** may very well simplify CSS code and make it more maintainable but the likelihood that conflicts arise with properties specified in and inherited from other selectors increases. For a more comprehensive overview of CSS, check out this [tutorial](https://www.htmldog.com/guides/css/).

Every browser has its own default stylesheet. To avoid cross-browser inconsistencies as much as possible, a set of styles known as the **CSS reset** is loaded prior to your other styles to remove the browser built-in styles. One may [specify it directly](https://gist.github.com/stephan-romhart/91716eb47202163fac5e8a7b6679389f#file-organize-reset-css) or through a [library](https://github.com/sindresorhus/modern-normalize)

**Vendor prefixes** are a way for browser manufacturers to support new CSS features before they are fully implemented by all browsers. In order to implement a new CSS style property such as a transition, you normally have to prepend the prefix for each browser to the standard CSS property (although some browsers have a different syntax for certain properties than others do):
```css
-webkit-transition: all 4s ease;
-moz-transition: all 4s ease;
-ms-transition: all 4s ease;
-o-transition: all 4s ease;
transition: all 4s ease;
```
Matcha is [just one in a whole slew](https://github.com/dbohdan/classless-css) of classless (semantic) CSS libraries. It's not a CSS framework but a stylesheet creator from which you can import when you don’t want to think about CSS or styling but want a site that looks alright. [CSS Bed](https://www.cssbed.com/) has a collection of **classless themes**.

### How the processor trend came and went

Nowadays, web developers prefer using **CSS pre-processors**, scripting languages which compile into CSS code, as these provide added features that ultimately make it easier to write and maintain code. By far, the most popular one is **Sass** which supports two syntaxes, each with its own file extension, .sass and .scss, and only the latter fully supports CSS syntax. Here’s a [tutorial](https://www.youtube.com/watch?v=roywYSEPSvc) to get you started with using Sass and a [gist](./_resources/Sass.scss) filled with examples of its main features.

**CSS post-processing** comes into play when one wants to needs to run certain tasks on pure CSS code such as minification and appending vendor prefixes.

**Autoprefixer** is one of several JavaScript plugins available in **PostCSS**, which, as the name suggests, auto-appends vendor prefixes.

By supporting plugins which accepted Sass code, PostCSS effectively blurred the line between pre- from post-processors.

### Rapid prototyping with CSS frameworks

[How I Organize My CSS for Websites Without a Framework](https://medium.com/@stephan.romhart/how-i-organize-my-css-for-websites-without-a-framework-4d93fbbc74fe)

**Bootstrap** is a popular CSS framework that you might want to learn. While being popular means a active community with plenty of supporting material, it also means that without some heavy customization, your website will appear bland. Critics of this framework say that it includes lots of extra CSS code that remains unused (even after removing unused rules with [UnCSS](https://www.npmjs.com/package/uncss)) and it takes time to override some CSS rules of Bootstrap components for greater customization. Bootstrap's grid layout has been eclipsed by the more user-friendly [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) but the ease with which you can create UI components without the need of heavy JS coding is something that keeps this framework very much alive.

Tailwind CSS

Pico CSS

## Automation saves time

PostCSS can be integrated in **Gulp** as explained in this [video](https://www.youtube.com/watch?v=jbjVUgCrXsE) which will introduce you to the basic principles of this build tool:

```bash
npm i gulp gulp-postcss --save-dev
```

The scope of using a **task runner** like Gulp is to automate routine tasks, thereby simplifying the workflow and increase productivity. For instance, instead of re-compiling and running Autoprefixer each time you edit a .scss file, you just send it to Gulp and let it do the job for you. Unlike Gulp which does each operation in memory, **Grunt**, another task runner, creates a temporary file for each operation. While this may seem to favour Gulp in terms of speed, one also has to consider their proficiency in Node.js since Gulp makes use of Node streams and promises. Check out this [starter guide](https://www.smashingmagazine.com/2014/06/building-with-gulp/) to learn more about how Gulp works.

**Minification** isn’t reserved just for .css files but extends to any static asset and it involves the reduction of file size with no effect on how the browser reads the minified version. It thus makes your application’s download size smaller, thereby improving load performance.

**Gzipping** comes with a similar benefit to minification but instead of doing it yourself, you must configure your web server to do it for you. Here’s how to set gzipping in [Apache](https://css-tricks.com/snippets/htaccess/active-gzip-compression/) and [Nginx](https://docs.nginx.com/nginx/admin-guide/web-server/compression/).

### Webpack and other bundlers

Gulp is being overtaken by **Webpack**, a **module bundler** which comes pre-packaged with Angular, since it extends into the basic functionality of a task runner. A bundler packs together JavaScript modules and other assets into single files for use within a browser while also managing dependencies. In 2023, Webpack was still the go-to solution for project bundling, albeit slower compared to the newcomer Vite.

To get started with Webpack:
`npm install --save-dev webpack webpack-cli`

Loaders are packages which, when bundled to Webpack, automate common build steps such as transforming TypeScript to JavaScript code, and minification:
`npm i purgecss-webpack-plugin -D`

Plugins allow for customizations of the webpack build process. To avoid the need to compile each time you make changes, install webpack-dev-server:
```json
"scripts": {
  "start": "webpack-dev-server  --config webpack.dev.js --open",
}
```
For more information about Webpack, check out this [tutorial](https://www.youtube.com/watch?v=MpGLUVbqoYQ).

The less popular **Browserify** is a pure bundle manager so it's normally used alongside a task runner. The primary advantage of a bundler is faster loading time by reducing the number of files the browser needs to download.

However, for big apps, loading one huge monolithic file can also slow down the initial start of your app. In this case, a **module loader** such as [RequireJS](https://requirejs.org/docs/node.html) provides better performance by making sure all modules are loaded at run time.

## JavaScript and its derivatives

EcmaScript, a scripting language specification standardized by ECMA International, has **JavaScript** as its most popular implementation; JavaScript is basically ECMAScript at its core but builds upon it. While most browsers support the latest version of JavaScript based off ES6, for older browsers (or an older version of Node.js), there's **Babel** which translates newer JS syntax into their older equivalent and also lets you use JS features which have not yet been incorporated into the spec. There is a preset (plugin) for Babel in Webpack.

An alternative to using JavaScript is **TypeScript**, a superset of JavaScript. This means that while JS code is still valid in TypeScript you'll also get additional features, such as object-oriented programming. If you plan on using Angular, then you need to learn this language since Angular requires TS code. TypeScript uses a compiler (available as a Node package) to transpile TS code to ES5 by default which is supported by all browsers, eliminating the need of using Babel. The downside is that you need a build step for compilation which may not be worth the effort if you already have a build pipeline.

Modules are scripts that provide instant functionality when added to a project. For example, Mustache is a logic-less templating engine. See [here](https://dev.to/cocoroutine/truth-about-template-engines-3a7) to read about template engines.

**Package managers** are there to ensure that your application's dependencies are installed correctly onto a different machine. **NPM** (a package manager for Javascript) does this by creating a package.json upon being initialised into your project directory:
```bash
npm init`
```
The `node_modules` folder which is automatically generated to hold your project dependencies won't need to be committed to GitHub because it can be re-created from `package.json`:
```bash
npm install
```
**Yarn** comes with similar features to NPM with the additional benefit of downloading packages faster. This may not warrant an excuse to switch from NPM since the latter still enjoys support from a larger community and comes with Node.js by default. For those who once used **Bower**, it has since been deprecated by its creators.

The prime benefit of using a **CDN** is improved performance:
   -  Browsers limit how many files can concurrently be downloaded from a single domain, thus the use of a CDN allows for parallel downloads
   -  JS libraries cached by a browsers from previously visited sites that used them from a CDN won’t need to be downloaded again
   -  Site visitors will be delivered static content from the closest point of presence (PoP) instead of the origin server (only relevant if your user is global)

Using a CDN is also cost-effective since it reduces the server load and limits bandwidth consumption and may improve your SEO from a faster load time.

Popular JS libraries are usually available on a CDN as minified and slim versions. As explained earlier, minified files are recommended. The slim version will usually leave out non-core features of the library to reduce the file size so do opt for it whenever possible.

This doesn’t mean you shouldn’t set up fallbacks to ensure that your website remains functional in the event that the CDN is down:
```plaintext
<script type="text/javascript">
  window.jQuery || document.write('<script>"/path/to/jquery-3.4.1.slim.min.js"<\x3C/script>')
</script>
```
See this [gist](./_resources/npm.js) to learn more about how to use npm.

### Semantic versioning

Consider a package whose version is 4.12.3.

If its update cycle follows semantic versioning, then a newer **major** version will cause breaking changes. Non-breaking changes, such as the deprecation of old functionality or the addition of new features, are tagged by incrementing the **minor** version version. Bug fix updates are tagged using the **patch** version.

^: allows minor and patch updates (default behaviour when running `npm install`)
~: allows patch updates only

No preceding symbol means that the module will not be updated.

## The front-end framework zoo

A **framework** is a collection of pre-written libraries that developers can access and use for creating routine programming functions and features. Its primary goal is to improve workflow and code structure. Frameworks differ from **modules** (libraries in JS) which consist of a set of functions that can be called upon by the source code to extend its functionality.

Framework creators certainly had a particular type of website in mind when they designed their frameworks but over time, new features had to be added to accommodate different use cases. That’s one reason why it can sometimes feel superficial to differentiate between different frameworks (and yes, there is no outright winner). What matters most is not which framework you choose but whether you manage to achieve what you set out to do. You may also just ditch frameworks altogether and go [vanilla JS](https://www.youtube.com/watch?v=k7n2xnOiWI8)!

## Back-end frameworks

Programming languages like Python have included threading libraries to [support multi-threading](https://www.toptal.com/python/beginners-guide-to-concurrency-and-parallelism-in-python). This is especially important in the field of AI since algorithms are expected to execute many computations in very short time frames. Check out this [tutorial](https://www.youtube.com/watch?v=aysceqdGFw8) to learn more about using parallel programming in Python. **Flask** and **Django** are Python frameworks.

**Node.js** is a server-side runtime environment for JavaScript which can use multiple threads in the background to execute non-blocking I/O operations. A **callback**, the asynchronous equivalent of a function, is called upon completion of a given task. For instance, a function to read a file may start reading file and return the control to the execution environment immediately so that the next instruction can be executed. Once file I/O is complete, the file content is passed as a parameter of the callback function. This is made possible by the **event loop**. For a more detailed overview of Node.js, check out this [video](https://www.youtube.com/watch?v=L0pjVcIsU6A) and this [gist](./_resources/Nodejs%20fundamentals.js) which also features a comparison between setting up a server in Node.js versus Express.js.

Node.js comes with a large set of built-in modules which you can add to your project:
```js
const path = require('packageName')
```
For custom modules:
```js
module.exports = {objectName: objectName, ...};
const path = require('filePath');
```
While you can set up a server using Node.js' built-in `http` module, this is only done in development since a proper web-server can handle SSL much faster besides other safety and caching features. Setting up a server can be easily done with **Express.js**. Alternative frameworks do exist such as **Restify**, a REST-oriented framework, but none of them are quite as popular as Express.js.

It is advisable to put a Node.js server behind a proxy since actual web servers like **nginx** can handle.

**Ruby on Rails** is a server-side fully MVC framework written in **Ruby**.

### Going API-first

Any serious discussion of backend technologies won't be complete without mentioning APIs and how companies such as Twilio and frameworks like FastAPI have popularised their usage to the point where a novel type of architecture has emerged which caters specifically for them.

Microservices are an architectural and organizational approach to software development where software is composed of small independent services that communicate over well-defined APIs, making applications easier to scale and faster to develop. By contrast, all processes in **monolithic architectures** are tightly coupled and run as a single service which means that if one process of the application experiences a spike in demand, the entire architecture must be scaled.

## Web stacks are king

You might already know this but it’s a standard practice to have a **local development server** to build websites. It’s easy when you’re only coding with HTML and CSS since what you would only need to do is to host a local server on your machine, otherwise known as a **localhost**, and point your HTML file to it. But what about more complex projects which require a database and dynamic content? That’s where **web stacks** come into play. In computing, web stacks are a subset of a **solution stack**, which is a collection of software intended to perform a specific task (for a web stack, it’s web development).

Web stacks can either be server-side or client-side. **Server-side**

Now, there is a multitude of web stacks to choose from so it makes more sense to just compare the underlying software of the most popular ones (LAMP and MEAN) to better understand their best-use scenarios.

The **MEAN** stack is composed of a MongoDB database, Express.js with Node as the back-end web framework and Angular as the front-end, client-side framework.

The **LAMP** stack is composed of Linux as the base operating system, programming logic written in PHP, a mySQL database, and an Apache web server. Installation details on how to install a LAMP stack can be found [here](https://prognotes.net/2016/07/install-local-lamp-stack-linux/). Its variants include:

- **WAMP** and **MAMP** (swapping out Linux with Windows or Macintosh)
- **LEMP** and **LLMP** (using nginx or lighttpd instead of Apache),
- **LAPP** (switching MySQL and PHP for PostgreSQL and either Perl or Python).

**XAMPP** is a cross-platform stack which uses MariaDB as the database and PHP and Perl as scripting languages.

For the Microsoft-centric developers, there is **WISA**, comprising a Windows server, Internet Information Services (IIS) as the web server, Microsoft SQL Server and ASP.NET.

Microservices are an architectural and organizational approach to software development where software is composed of small independent services that communicate over well-defined APIs, making applications easier to scale and faster to develop. By contrast, all processes in monolithic architectures are tightly coupled and run as a single service which means that if one process of the application experiences a spike in demand, the entire architecture must be scaled.

[How to over-engineer a website](https://www.youtube.com/watch?v=Sxxw3qtb3_g)

## And what about WordPress?

In the early days of the internet, content was directly embedded in HTML code, without any distinction between the layout of the website and its content. This changed with the advent of **content management system** systems like **WordPress** which stores web content in a database then injects it into an HTML template via PHP. **Magento**, meanwhile, is a CMS specific to e-commerce websites.

While professional blogging sites can certainly be built using WordPress, it is generally best to avoid it for specific user requirements due to its limited plugins and lack of customisation.

For a more general use case, WordPress is fine until you need to migrate your application to a different JS framework or wish to display the same content on various devices. These demands gave rise to a **headless CMS** -- a tool which turns your content into a cloud-based API so it can be accessed from any application. One such tool for developing such a headless CMS is Sanity Studio.

## Conclusion

Hopefully, you’re now familiar with some basic topics (and a few hot ones) with which you can start talking to your web developer friends and be taken seriously. And that’s all in 10 minutes!
