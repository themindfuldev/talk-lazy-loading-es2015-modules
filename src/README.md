<!--

WARNING!! DON'T EDIT THE FILE README.md on the root of the project, that one is a GENERATED FILE!

You should just edit the source file at src/README.md - the one which stars with ## @@title

-->

## @@title

<img src="img/cover.jpg" class="logo" />

@@author @ *Macy's*

@@date

---
## Tiago Garcia

<img src="http://www.gravatar.com/avatar/5cac784a074b86d771fe768274f6860c?s=250" class="avatar">

- Tech Manager at [Avenue Code](http://www.avenuecode.com)
- Tech Lead at [Macys.com](http://www.macys.com)
- *[@@email](mailto:@@email)*
- *[tiagorg.com](http://tiagorg.com)*

----

## Avenue Code

<p class="ac-column-logo">
  <img src="img/ac-logo-big.png" class="ac-logo-big" />
</p>

<ul class="ac-column-text">
  <li>Offices in San Francisco, São Paulo, Belo Horizonte</li>
  <li>Primary verticals: Retail & Financial services</li>
  <li>Partners with MuleSoft, Adobe, Chef, Oracle and AWS</li>
  <li>Project Management, Business Analysis, Development, QA, DevOps, Coaching</li>
  <li>*[www.avenuecode.com/careers](https://www.avenuecode.com/carreers)*</li>
</ul>

---

# Agenda

- *Part I: JavaScript Lazy-loading for dummies*
  - SPA for performance?
  - Lazy-loading 101
  - Do I need Lazy-loading?
  - How to Lazy load?
- *Part II: Blazing loading*
  - Lazy-loading in AMD
  - Lazy-loading in CommonJS
  - Lazy-loading in ES2015
  - System.js

---

# Part I

<img src="img/part-i.jpg" />

---

## SPA for performance?

<img src="img/back-in-my-day.jpg" />

----

## SPA for performance?

- Moving you server-side app to SPA would improve the page performance:
  - Requests returning JSON instead of HTML
  - Rendering a new view instead of a page reload
  - Routing and state management on the client-side
- But that may not be enough!
  - Have you ever checked if you application is downloading more stuff that is being actually used?
  - All those performance gains can fall short if you download all your stuff at once!

---

## Lazy-loading 101

- E-commerce A (server-side rendered) has 5 pages: home, browse, product, cart, checkout
  - Each page has *300 KB* HTML + *100 KB* JS
  - The complete flow will download:
    <ul>
      <li>*400 KB* for each page <i class="fa fa-exclamation-triangle icon-warning" aria-hidden="true"></i> </li>
      <li>*2 MB* total <i class="fa fa-exclamation-triangle icon-warning" aria-hidden="true"></i></li>
    </ul>

----

## Lazy-loading 101

- E-commerce B (SPA) has the same 5 pages
  - 1 actual page + 4 views
  - Home page has *300 KB* HTML + *100 KB* JS
  - Each of the views has *50 KB* JSON + *150 KB* JS
  - The complete flow will download:
    <ul>
      <li>*1.2 MB* total (vs *2 MB*) <i class="fa fa-check-circle icon-success" aria-hidden="true"></i></li>
      <li>80% just on home page: *1 MB* (vs *400 KB*) <i class="fa fa-times-circle icon-danger" aria-hidden="true"></i></li>
    </ul>
  - However, if you use Lazy-loading:
    - *400 KB* on home page
    - *200 KB* each view after

----

## What is Lazy-loading?

- *Lazy loading* is a design pattern about deferring the _initialization_ (loading/fetching/allocation) of a _resource_ (code/data/asset) until the point at which it is needed.
- Its main goal is to improve _efficiency_ when a significant amount of resources is not needed at first.
- Lazy-loading is targeted to increase performance and save on memory consumption and processing power.
- It's an [EAA pattern](http://martinfowler.com/eaaCatalog/lazyLoad.html) from Martin Fowler.

---

## Do I need Lazy-loading?

- *Above the fold*
  - what you see first when you open a page
  - part of the *Critical Rendering Path*
  - must be rendered during the page load time
  - thus, it can't be lazy loaded
- *Below the fold*
  - everything else, needs scrolling or user interaction
  - won't be displayed during the page load time
  - it doesn't need to be rendered with the page load
  - thus, it can be lazy loaded

----

## Do I need Lazy-loading?

- Ask yourself these questions:
  - Is there any chunk of code/library that only runs below the fold (as a reviews panel)?
  - Is there any chunk of code/library that only runs after some event (as a button click)?
  - Is there any chunk of code/library that only runs upon a certain condition (as an uncommon widget)?
- If you answered yes, you may profit from lazy load and potentially improve your page performance.
- Just defer the downloading of those chunks of code/libraries until the trigger is executed.

----

## Do I need Lazy-loading?

- Lazy loading isn't recommended for certain scenarios:
  - Supporting network limitations (offline mode)
  - Web-based mobile apps (Web Views)
  - Apps that can't be paused (games)
  - Specific UX requirements (single loading screen)

---

## How to Lazy load?

- DON'T include all your scripts in the page at once.
- DON'T import all your modules on the top of your file.
- Carefully decide WHEN to import or require your modules and libraries:
  - Below the fold (scroll listener)
  - Event callbacks (user interactions / network calls)
  - Conditionally (for uncommon scenarios)
  - After some time (chat overlays)
- This talk is about JS but you can also lazy load images, fonts and CSS.

---

# Part II

<img src="img/part-ii.jpg" />

---

## Lazy-loading in AMD

- Quick refresher on AMD modules:

```
// dog.js
define('dog', [], function() {
  var Dog = function(name, breed) {
    this.name = name;
    this.breed = breed;
  };
  Dog.prototype.bark = function() {
    return this.name + ': ' + getBarkStyle(this.breed);
  };

  function getBarkStyle(breed) {
    return breed === 'husky'? 'woooooow!': 'woof, woof!';
  };

  return Dog;
});
```

----

## Lazy-loading in AMD

- Lazy-loading upon user interaction:

```
// main.js
define('main', [], function() {
  document.getElementById('loadDogButton')
          .addEventListener('click', function(e) {
    // Lazy-loading dog module
    require(['dog'], function(Dog) {
      var dogContainer = document.getElementById('dogContainer');

      var sherlock = new Dog('Sherlock', 'beagle');
      dogContainer.innerHTML += sherlock.bark();

      var whisky = new Dog('Whisky', 'husky');
      dogContainer.innerHTML += '<br/>' + whisky.bark();
    });
  });
});
```

---

## Lazy-loading in CommonJS

- Quick refresher on CommonJS modules:

```
// dog.js
var Dog = function(name, breed) {
  this.name = name;
  this.breed = breed;
};

Dog.prototype.bark = function() {
  return this.name + ': ' + getBarkStyle(this.breed);
};

function getBarkStyle(breed) {
  return breed === 'husky'? 'woooooow!': 'woof, woof!';
};

module.exports = Dog;
```

----

## Lazy-loading in CommonJS

- Using [Webpack](https://webpack.github.io)'s *`require.ensure`*

```
// main.js
document.getElementById('loadDogButton')
        .addEventListener('click', function(e) {
  // Lazy-loading dog module
  require.ensure([], function(require) {
    var Dog = require('./dog'),
        dogContainer = document.getElementById('dogContainer');

    var sherlock = new Dog('Sherlock', 'beagle');
    dogContainer.innerHTML += sherlock.bark();

    var whisky = new Dog('Whisky', 'husky');
    dogContainer.innerHTML += '<br/>' + whisky.bark();
  });

});
```

- Read more about [Code Splitting](https://webpack.github.io/docs/code-splitting.html)

---

## Lazy-loading in ES2015

- Quick refresher on ES2015 modules:

```
// dog.js
let getBarkStyle = function(breed) {
  return breed === 'husky'? 'woooooow!': 'woof, woof!';
};

export class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    return `${this.name}: ${getBarkStyle(this.breed)}`;
  };
}
```

----

## ES2015 Module Loader

- ES2015 doesn't actually have a module loader specification
- A popular proposal has been retreated: [es6-module-loader](https://github.com/ModuleLoader/es6-module-loader)
- Such proposal uses a promises-based API which inspired *System.js*
- A new proposal is in the works by WhatWG for ES2016: [Loader](https://whatwg.github.io/loader/)

----

## System.js

- [System.js](https://github.com/systemjs/systemjs) is a module loader which supports AMD, CommonJS, ES2015 and global scripts.
- Is performs asynchronous module loading using a Promises-based API.
- Promises can be chained and combined.
- *`Promises.all `* can load multiple modules in parallel.

----

## Lazy-loading in System.js

- Using *`System.import`* and getting a promise

```
// main.js
document.getElementById('loadDogButton')
        .addEventListener('click', e => {
  // Lazy-loading dog module
  System.import('dog').then(Dog => {
    let dogContainer = document.getElementById('dogContainer');

    let sherlock = new Dog('Sherlock', 'beagle');
    dogContainer.innerHTML += sherlock.bark();

    let whisky = new Dog('Whisky', 'husky');
    dogContainer.innerHTML += `<br/>${whisky.bark()}`;
  });
});
```

----

## JSPM

- [JSPM](http://jspm.io) is a JS package manager for *System.js*.
- Loads modules written in AMD, CommonJS and ES2015, either locally or directly from *npm* and *GitHub*.
- Performs bundling.
- [github.com/tiagorg/lazy-load-es2015-systemjs](https://github.com/tiagorg/lazy-load-es2015-systemjs)

----

## Webpack 2

- [Webpack 2](https://github.com/webpack/webpack/tree/v2.1.0-beta.15) is still in beta but now offers native *ES2015* and *System.js* support.
- Loads modules written in AMD, CommonJS and ES2015.
- Performs bundling and tree-shaking.
- [What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)
- [Roadmap](https://webpack.github.io/docs/roadmap.html)
- [github.com/tiagorg/lazy-load-es2015-webpack2](https://github.com/tiagorg/lazy-load-es2015-webpack2)

---

# Conclusion

<img src="img/lazy-load-it.jpg" />

---

# Questions?

<img src="img/questions.jpg" />

---

## Lunch & Learn

<p class="ac-column-logo">
  <img src="img/ac-logo-big.png" class="ac-logo-big" />
</p>

<ul class="ac-column-text">
  <li>Avenue Code is launching *Lunch & Learn*.</li>
  <li>We will regularly present cutting-edge content.</li>
  <li>Front-end (JavaScript, CSS3, HTML5), Back-end (Java, .NET, MuleSoft), Mobile (iOS/Android), DevOps (Chef), QA, Agile Coaching, Project Management...</li>
  <li>*Michael Kasten*</li>
</ul>

---

# Thanks!

- Special thanks to Macy's, Avenue Code and most importantly all the attendees!
- Talk: [tiagorg.com/talk-lazy-loading-es2015-modules](http://tiagorg.com/talk-lazy-loading-es2015-modules)
- Github: [github.com/tiagorg/talk-lazy-loading-es2015-modules](https://github.com/tiagorg/talk-lazy-loading-es2015-modules)
- More talks at [tiagorg.com](http://tiagorg.com)
