| | Travis | Coverralls | Heroku | Bithound |
|---|---|---|---|---|
| **Develop** | [![Build Status](https://travis-ci.org/10alab/Siurana.svg?branch=develop)](https://travis-ci.org/10alab/Siurana) | [![Coverage Status](https://coveralls.io/repos/10alab/Siurana/badge.svg?branch=develop&service=github)](https://coveralls.io/github/10alab/Siurana?branch=develop) | [![Heroku](https://heroku-badge.herokuapp.com/?app=test-climbing-memo&style=flat)](https://test-climbing-memo.herokuapp.com) | [![bitHound Overall Score](https://www.bithound.io/github/10alab/Siurana/badges/score.svg)](https://www.bithound.io/github/10alab/Siurana) |
| **Master** | [![Build Status](https://travis-ci.org/10alab/Siurana.svg?branch=master)](https://travis-ci.org/10alab/Siurana) | [![Coverage Status](https://coveralls.io/repos/10alab/Siurana/badge.svg?branch=master&service=github)](https://coveralls.io/github/10alab/Siurana?branch=master) | [![Heroku](https://heroku-badge.herokuapp.com/?app=climbing-memo&style=flat)](https://climbing-memo.herokuapp.com) | [![bitHound Overall Score](https://www.bithound.io/github/10alab/Siurana/badges/score.svg)](https://www.bithound.io/github/10alab/Siurana) |

[![Codacy Badge](https://api.codacy.com/project/badge/82b99cbb621d4ee6ae23826ec798d7cd)](https://www.codacy.com/app/cmizony/Siurana)
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

Hosted demo is available on heroku at [climbing-memo.herokuapp.com](http://climbing-memo.herokuapp.com/)

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
* Generator:       Yeoman-angular
* Style:           Sass + Bootstrap material design
* Tests:           Karma + Jasmine + Coveralls
* Validators:      Jshint + Jscs
* Visualizations:  D3 + Angular Gmap
* WebServer:       NodeJS & Grunt-http

Module structure
-----

**Angular module dependencies:**

```sh
             +---------+
    +------> |  Core   | <----+
    |        +---------+      |
    |                         |
+---+-----+              +----+-----+
|  Users  | <------------+  Routes  |
+---+-----+              +-+-----+--+
    ^                      ^     ^
    |                      |     |
    |        +-------------+     |
    |        |                   |
+---+--------+---+       +-------+---+
|  ClimbingMemo  +-----> |  Charts   |
+----------------+       +-----------+
```
