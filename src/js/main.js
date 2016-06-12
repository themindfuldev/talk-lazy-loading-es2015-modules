/* global Reveal */
/* global hljs */

// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  center: false,
  history: true,
  controls: false,
  transition: 'convex',

  // Optional libraries used to extend on reveal.js
  dependencies: [
    // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
    { src: 'js/lib/js/classList.min.js', condition: function() { return !document.body.classList; } },

    // Interpret Markdown in <section> elements
    { src: 'js/plugin/markdown/marked.min.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'js/plugin/markdown/markdown.min.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },

    // Syntax highlight for <code> elements
    { src: 'js/plugin/highlight/highlight.min.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },

    // Zoom in and out with Alt+click
    { src: 'js/plugin/zoom-js/zoom.min.js', async: true }
  ]
});

Reveal.addEventListener('ready', function() {
  'use strict';

  var footer = TEMPLATES.footer({
    title: '@@title'
  });

  var sectionEls = document.querySelectorAll('section:not(.stack)');
  var sections = Array.prototype.slice.call(sectionEls);
  sections.forEach(function(el) {
    el.innerHTML += footer;
  });

  var itemEls = document.querySelectorAll('div.slides section:not(:first-child) li, div.slides section:not(:first-child) > p, div.slides section:not(:first-child) pre');
  var items = Array.prototype.slice.call(itemEls);
  items.forEach(function(el) {
    el.classList.add('fragment');
  });
});
