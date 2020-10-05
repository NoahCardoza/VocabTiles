# HardDaysNight
Automatically handles A-2875 form submissions for the Air Force.

# Stack

+ [VueJS](https://vuejs.org/):
  A progressive, incrementally-adoptable JavaScript framework for building UI on the web.
+ [Vuex](https://vuex.vuejs.org/):
  Centralized State Management for Vue.js.
+ [NuxtJS](https://nuxtjs.org/):
  An intuitive VueJS frameworks which allows SSR, amoung many other features.
  + [Content](https://content.nuxtjs.org/):
  Nuxt Content lets you write in a content/ directory and fetch your
  Markdown, JSON, YAML, XML and CSV files through a MongoDB like API, acting as a Git-based Headless
  CMS.
  + [ExpressJS](https://expressjs.com/):
  A fast, unopinionated, minimalist web framework for node.
  The underlying HTTP server frameworks used by **Nuxt.js** to serve our app which can be hooked
  into to setup a REST API.
+ [Axios](https://github.com/axios/axios):
  A promise based HTTP client for the browser and node.js
+ [Tachyons](https://tachyons.io/docs/):
  Rapid CSS prototyping. For the hackathon this is great, but we'll probably remove it in prod and
  hand write the custom CSS