<!--

WARNING!! DON'T EDIT THE FILE README.md on the root of the project, that one is a GENERATED FILE!

You should just edit the source file at src/README.md - the one which stars with ## Lazy loading ES2015 modules in the browser

-->

## Lazy loading ES2015 modules in the browser

<img src="img/cover.jpg" class="logo" />

Tiago Garcia @ [FEDC 2016](http://frontenddesignconference.com/)

Jun 18th, 2016

---

## Tiago Garcia

<img src="http://www.gravatar.com/avatar/5cac784a074b86d771fe768274f6860c?s=250" class="avatar">

- Tech Manager at [Avenue Code](http://www.avenuecode.com)
- Tech Lead at [Macys.com](http://www.macys.com)
- *[tgarcia@avenuecode.com](mailto:tgarcia@avenuecode.com)*
- *[http://tiagorg.com](http://tiagorg.com)*

----

## Avenue Code

<img src="img/cover.jpg" class="logo" />

- *[https://www.avenuecode.com](https://www.avenuecode.com)*

---

## Agenda

- SPA for performance?
- Page load vs Lazy loading
- Do I need Lazy loading?
- How to Lazy load?
- AMD, CommonJS and ES2015 modules
- ES2015 Module Loader
- Webpack and Rollup
- System.js
- Importing modules synchronously and asynchronously
- JSPM as a dependency management system
- Optimization strategies

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

## Page load vs Lazy loading

- E-commerce A (server-side rendered) has 5 pages: home, browse, product, cart, checkout
  - Each page has *300 KB* HTML + *100 KB* JS
  - The complete flow will download:
    <ul>
      <li>*400 KB* for each page <i class="fa fa-exclamation-triangle icon-warning" aria-hidden="true"></i> </li>
      <li>*2 MB* total <i class="fa fa-exclamation-triangle icon-warning" aria-hidden="true"></i></li>
    </ul>

----

## Page load vs Lazy loading

- E-commerce B (SPA) has the same 5 pages
  - 1 actual page + 4 views
  - Home page has *300 KB* HTML + *100 KB* JS
  - Each of the views has *50 KB* JSON + *150 KB* JS
  - The complete flow will download:
    <ul>
      <li>*1.2 MB* total (vs *2 MB*) <i class="fa fa-check-circle icon-success" aria-hidden="true"></i></li>
      <li>80% just on home page: *1 MB* (vs *400 KB*) <i class="fa fa-times-circle icon-danger" aria-hidden="true"></i></li>
    </ul>
  - If there is lazy loading:
    - *400 KB* on home page
    - *200 KB* each view after

----

<img src="img/lazy-load-it.jpg" />

---

## Do I need Lazy loading?

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

## Do I need Lazy loading?

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
