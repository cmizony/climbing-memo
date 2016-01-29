| | Travis | Coverralls | Codacy | Heroku
|---|---|---|---|---|
| **Develop** | [![Build Status](https://travis-ci.org/10alab/Siurana.svg?branch=develop)](https://travis-ci.org/10alab/Siurana) | [![Coverage Status](https://coveralls.io/repos/10alab/Siurana/badge.svg?branch=develop&service=github)](https://coveralls.io/github/10alab/Siurana?branch=develop) | [![Codacy Badge](https://api.codacy.com/project/badge/82b99cbb621d4ee6ae23826ec798d7cd)](https://www.codacy.com/app/cmizony/Siurana) | [![Demo latest](https://img.shields.io/badge/demo-latest-brightgreen.svg)](https://test-climbing-memo.herokuapp.com/)
| **Master** | [![Build Status](https://travis-ci.org/10alab/Siurana.svg?branch=master)](https://travis-ci.org/10alab/Siurana) | [![Coverage Status](https://coveralls.io/repos/10alab/Siurana/badge.svg?branch=master&service=github)](https://coveralls.io/github/10alab/Siurana?branch=master) | | [![Demo stable](https://img.shields.io/badge/demo-stable-brightgreen.svg)](https://climbing-memo.herokuapp.com/)

[![Gitter Chat](http://img.shields.io/badge/gitter-cmizony / 10aLab-blue.svg)](https://gitter.im/cmizony/10aLab)
[![Sauce Test Status](https://saucelabs.com/buildstatus/cmizony)](https://saucelabs.com/u/cmizony)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/cmizony.svg)](https://saucelabs.com/u/cmizony)

# Climbing Memo

> Front-end application to visualize climbing data

**Features**
* Table and timeline of climbing routes
* Markdown support for routes notes
* Map of routes using Google Map API
* Charts generated with D3.js
* Offline mode
* Responsive design

Demo
-----

Hosted demo is available on heroku for both stable and latest version (cf heroku badges above)

[![App screenshot](gallery/timeline.png)](gallery)

Get started
-----

Make sure to have `npm`, `grunt` and `bower` installed.

Create a [firebase account](https://www.firebase.com/) and configure your database in [app.js](app/scripts/app.js#L30)


```sh
$ npm install && grunt serve
```

To run a production server use `npm start` and to run the unit tests use `grunt test`
Before contributing please read the [guidelines](https://github.com/10alab/Siurana/blob/develop/CONTRIBUTION.md)

To generate the documentation run `grunt jsdoc` and browse `dist/doc/index.html`

Technologies
-----

**Technologies:**

* Database:        Firebase
* Deployement:     Travis + Heroku
* Framework:       AngularJS
* Style:           Sass + Bootstrap material design
* Tests:           Karma + Jasmine + Coveralls
* Validators:      Jshint + Jscs
* Visualizations:  D3 + Angular Gmap
* WebServer:       NodeJS

Module structure
-----

**Angular module dependencies:**

```sh

                +--------+            +------+               +-------+
                | Routes +------------> Core <---------------+ Users |
                +----^---+            +---^--+               +---^---+
                     |                    |                      |
                     |                    |                      |
   ^--------------^--+--------------^-----+----------^           |
   |              |                 |                |           |
   |              |                 |                |           |
+--+--+       +---+----+        +---+---+      +-----+----+      |
| Map +-------> Charts <--------+ Table |      | Timeline |      |
+--^--+       +---^----+        +---^---+      +-----^----+      |
   |              |                 |                |           |
   |              |                 |                |           |
   |              |                 |                |           |
   +--------------+-------------+---+----------------+-----------+
                                |
                                |
                         +------+-------+
                         | ClimbingMemo |
                         +--------------+
```
