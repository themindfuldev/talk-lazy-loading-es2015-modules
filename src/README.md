<!--

WARNING!! DON'T EDIT THE FILE README.md on the root of the project, that one is a GENERATED FILE!

You should just edit the source file at src/README.md - the one which stars with ## @@title

-->

## @@title

<img src="img/cover.jpg" class="logo" />

@@author @ [FEDC 2016](http://frontenddesignconference.com/)

@@date

---

## Tiago Garcia

<img src="http://www.gravatar.com/avatar/5cac784a074b86d771fe768274f6860c?s=250" class="avatar">

- Tech Manager at [Avenue Code](http://www.avenuecode.com)
- Tech Lead at [Macys.com](http://www.macys.com)
- *[@@email](mailto:@@email)*
- *[http://tiagorg.com](http://tiagorg.com)*

----

## Avenue Code

- Founded in 2008
- Offices in San Francisco, São Paulo and Belo Horizonte
- Primary verticals: Retail & Financial services
- Partners with MuleSoft, Adobe, Chef, Oracle and AWS
- Project Management, Business Analysis, Development, QA, DevOps, Coaching
- Careers at *[https://www.avenuecode.com/careers](https://www.avenuecode.com/carreers)*

---

## Agenda

- SPA for performance?
- Page load vs Lazy-loading
- Do I need Lazy-loading?
- How to Lazy load?
- Lazy-loading in AMD
- Lazy-loading in CommonJS
- Lazy-loading in ES2015
- ES2015 Module Loader
- System.js
- JSPM

---

## SPA for performance?

<img src="img/back-in-my-day.jpg" />

----

## SPA for performance?

- Moving you server-side app to SPA will improve the page performance:
  - Requests returning JSON instead of HTML
  - Rendering a new view instead of a page reload
  - Routing and state management on the client-side
- But that is not enough!
  - Have you ever looked if you application is downloading more stuff that is being actually used?
  - Such performance gains can fall short if you download all your stuff at once!

---

## Page load vs Lazy-loading

- E-commerce A (server-side rendered) has 5 pages: home, browse, product, cart, checkout
  - Each page has *300 KB* HTML + *100 KB* JS
  - The complete flow will download:
    <ul>
      <li>*400 KB* for each page <i class="fa fa-exclamation-triangle icon-warning" aria-hidden="true"></i> </li>
      <li>*2 MB* total <i class="fa fa-exclamation-triangle icon-warning" aria-hidden="true"></i></li>
    </ul>

----

## Page load vs Lazy-loading

- E-commerce B (SPA) has the same 5 pages
  - 1 actual page + 4 views
  - Home page has *300 KB* HTML + *100 KB* JS
  - Each of the views has *50 KB* JSON + *150 KB* JS
  - The complete flow will download:
    <ul>
      <li>*1.2 MB* total (vs *2 MB*) <i class="fa fa-check-circle icon-success" aria-hidden="true"></i></li>
      <li>80% just on home page: *1 MB* (vs *400 KB*) <i class="fa fa-times-circle icon-danger" aria-hidden="true"></i></li>
    </ul>
  - If there is Lazy-loading:
    - *400 KB* on home page
    - *200 KB* each view after

----

<img src="img/lazy-load-it.jpg" />

---

## Do I need Lazy-loading?

- *Above the fold*
  - what you see first when you open a page
  - part of the *Critical Rendering Path*
  - must be rendered during the page load time
- *Below the fold*
  - everything else, needs scrolling or user interaction
  - won't be displayed during the page load time
  - it doesn't need to be rendered with the page load
- More significant on client-side JS.

----

## Do I need Lazy-loading?

- Ask yourself these questions:
  - Is there any chunk of code that only runs after some user interaction (as a button click)?
  - Is there any chunk of code that only runs upon a certain condition (as an uncommon widget)?
  - Is there any library that is needed only by such chunks of code?
- If you answered yes, you CAN lazy load and potentially improve your page performance.
- You just need to download enough JS for the content above the fold. Anything else, lazy load it!

---

## How to Lazy load?

- DON'T include all your scripts in the page at once.
- DON'T import all your modules on the top of your file.
- Carefully decide WHEN to import or require your modules and libraries:
  - Event callbacks (user interactions / network calls)
  - Conditionally (for uncommon scenarios)
  - After some time (chat overlays)

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

- [https://webpack.github.io/docs/code-splitting.html](https://webpack.github.io/docs/code-splitting.html)

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
- Such proposal has a promises-based API which inspired *System.js*
- A new proposal is in the works by WhatWG for ES2016: [Loader](https://whatwg.github.io/loader/)

----

## System.js

- [System.js](https://github.com/systemjs/systemjs) has asynchronous module loading using a Promises-based API
- Promises can be chained and combined
- *`Promises.all `* can load multiple modules in parallel

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

---

# JSPM

