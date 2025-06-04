/*
The Node Package Manager (npm) is a command-line tool used by developers to share and 
control JavaScript modules (or packages) for use with Node.js.

For each new project, npm creates a package.json file to list its package dependencies
and metadata:  npm init --yes (flag accepts metadata defaults)

You can change the default metadata for future npm init calls:
    npm set init-author-name "Michael Gauci"

To check the current default metadata:
    npm get init-author-name

package.json sets specific version numbers for each dependency, which is useful because 
npm packages are regularly updated, and updates may break your project. However, you'd
normally want bug fixes since they often include important security patches and won't 
break things in doing so. To allow updates to the latest patch version, you can prefix 
the dependency’s version with a ~ sign. A ^ sign will allow minor updates as well.

Packages can be installed:
1. globally in a root node_modules folder, accessible by all projects:
    npm install -g nodemon
To check the saved location of the global node_modules folder:
    npm root -g   
2. locally within a project's own node_modules folder, accessible only to that project:
    npm install lodash --save (flag adds dependency to current project)
    npm install gulp gulp-sass --save-dev (flag adds module to devDependencies object)
To see the list of installed project dependencies:
    npm list --depth 0
Most developers prefer to install packages local to each project to create a separation
between the dependencies of different projects.

To make use of an installed or built-in Node.js module inside your project:
    const _ = require("lodash");

Make sure to exclude the node_modules folder when uploading code to GitHub. If that 
project is accessed on a different computer, modules can be re-installed using:
    npm install --production (flag excludes dev dependencies)

package-lock.js avoids the possibility of installing modules from the same package.json
and end up with two different installations because of a newer version.

To update an npm package:
    npm update lodash

npm package versions in the dependencies section of package.json follow an industry 
standard for software versioning known as SemVer:  "package": "MAJOR.MINOR.PATCH"
    MAJOR: making incompatible API changes
    MINOR: adding functionality in a backwards-compatible manner
    PATCH: making backwards-compatible bug fixes

To remove an external package, you can just delete the corresponding key-value pair for
that package from your dependencies or better still:
    npm uninstall gulp gulp-sass --save-dev

To run JS code in Node.js, specify the relevant file name without its extension:
    node index
Alternatively, you can run npm scripts (as specified within the "scripts" property of 
package.json), to perform operations on your package before it is used:
    "scripts": {
        "build": "webpack",
        "start": "webpack-dev-server" --output-public-path=/build/",
        "server": "live-server"
    }
    npm build
    npm start
    npm run server
*/