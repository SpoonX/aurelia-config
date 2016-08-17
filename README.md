# aurelia-config

Aurelia-config is configuration loader and handler (using [homefront](https://www.npmjs.com/package/homefront)) that allows you to expose and centralize your configuration.

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

This library is an unofficial plugin for the [Aurelia](http://www.aurelia.io/) platform and simplifies plugin configuration by collecting them in a single place.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Overview

Sick of configuring every plugin separately, inconsistent naming and one plugin not knowing what the other does. Here comes the solution. One user config file for all your plugin. It works as follows:
At aurelia configuration you first load and tell aurelia-config which plugin configs it should load and the configs you want to merge into that. That creates one big config object (as an instance of [homefront](https://www.npmjs.com/package/homefront)) which can be easily accessed from everywhere in your app or your plugins. The usage of namespaces per plugins and a Configuration resolver even simplifies that.

- One config to rule them all
- Automatically load and merge plugin and user configs
- Namespaces and a Configuration resolver allow easier access of selected config segments
- All [homefront](https://www.npmjs.com/package/homefront) methods are available on the config object and on a selected config segment

## Used By

This library is used by plugins and applications.

## Uses

- [homefront](https://www.npmjs.com/package/homefront).

## Documentation

You can find usage examples and the documentation at [aurelia-config-doc](http://aurelia-config.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Installation for plugin developers

Run `jspm i aurelia-config` from your plugin root resp. `npm i aurelia-config --save`.

## Installation for applications

### Aureli-Cli

Run `npm i aurelia-config --save` from your project root.

Aurelia-config makes use [homefront](https://www.npmjs.com/package/homefront). So, add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`.

```js
"dependencies": [
  // ...
  {
    "name": "homefront",
    "path": "../node_modules/homefront/dist",
    "main": "index"
  },
  "aurelia-config",
  // ...
],
```

### Jspm

Run `jspm i aurelia-config` from your project root.

Add `aurelia-config` to the `bundles.dist.aurelia.includes` section of `build/bundles.js`.

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

### Webpack

Run `npm i aurelia-config --save` from your project root.

Add `'aurelia-config'` in the `coreBundles.aurelia section` of your `webpack.config.js`.

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-config` or add `"aurelia-config": "github:spoonx/aurelia-config",` to your `typings.json` and run `typings i`.
