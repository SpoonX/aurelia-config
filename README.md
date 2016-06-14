# aurelia-config

Configuration plugin that allows you to expose your configuration.

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

This library is an unofficial plugin for the [Aurelia](http://www.aurelia.io/) platform and simplifies plugin configuration by collecting them in a single place.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Used By

This library is used by plugins and applications.

## Installation for applications

Installing this module is fairly simple.

Run `jspm i aurelia-config` from your project root or `npm i aurelia-config --save` when using webpack.

## Usage

### Configuring the plugin

This module comes with a configure method. You need to can call it upon registering the plugin. Make sure your project uses a `main.js` file to initialize aurelia. In your configure function, add the following:

```js
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-config', {});

  aurelia.start().then(() => aurelia.setRoot());
}
```

## Installation for plugin developers

Installing this module is fairly simple.

Run from your project root `jspm i aurelia-config` AND `npm i aurelia-config --save` to install (peer)dependencies for jspm/SystemJs as well as webpack.

### Usage

#### Register a Config

```js
import {configFor} from 'aurelia-config';

@configFor('my-config')
export class TestConfig {
  key = 'value';
}
```

#### Inject a config

```js
import {GetConfig} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

// inject a registered config
@inject(GetConfig.of('my-config'))
export class Test {
  constructor(config) {
    this.config = config;
  }
}

// inject the global config
@inject(GetConfig.of())
export class TestGlobal {
  constructor(config) {
    this.config = config;
  }
}
```
