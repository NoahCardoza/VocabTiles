# Vocab Tiles
A vocabulary game/quiz app.

## The problem: How to remotely teach basic vocabulary and simple phrases to Literacy students

This app helps students to learn and practice vocabulary that may have been taught in class, but which they have not yet mastered.

Students who are completely new to a language, and especially those whose prior knowledge differs highly from the target language, cannot read the directions in the target language. So the app plays audio of a word, and the student simply taps or clicks the tile that shows the correct word.

This app is most useful to students who can both see and hear, but the word also appears above the tiles, so deaf students can also benefit. It is also useful for teachers to see the students' progress. The app will keep track of students' average score per category as well as per quiz and display them in an admin area that only the teacher can access.

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