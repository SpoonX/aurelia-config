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

## Usage

### Configure aurelia-config in your app

Your basic configuration file just exports a simple object with (preferably name-spaced) configuration settings, eg.:

```js
export let appConfig = {
  'aurelia-api': {
    api: 'http://example.com/api',
    auth: 'http://example.com/auth'
  },
  'aurelia-authentication': {
    endpoint: 'auth',
    configureEndpoints: true
  }
}
```

Register the with aurelia-config the plugin configs and your appConfig.

```js
let someConfig = { key: 'value'};

aurelia.use
  // aurelia-config should be before other plugins which use aurelia-config so that they can use your appConfig setting already during configuration
  .plugin('aurelia-config', [
    /* a plugin which follows the convention aka exports a object named 'config' */
    'aurelia-api',
    /* a plugin which exports a configuration object named 'baseConfig' */
    {
      name: 'aurelia-authentication',
      configName: 'baseConfig'
    },
    /* a configuration object */
    someConfig,
    /* a local configuration which which exports a object named 'config' */
    './appConfig'
  ])
  /* Other plugins that use aurelia-config don't need any or much configuration anymore */
  .plugin('aurelia-api')
  /* but you still can overwrite or add settings if the plugin allows that*/
  .plugin('aurelia-authentication', {
    configureEndpoints: 'false'
  });
```

Configs get added in order of the array. So, later called plugins overwrite previous settings. Hence, your `appConfig` should be the last entry in that array.

### Configure aurelia-config in your plugin

Your configuration file just exports a simple object with the configuration settings. It's best named 'config' and uses the plugin name as namespace), eg.:

```js
export let config = {
  'aurelia-authentication': {
    endpoint: null,
    configureEndpoints: false
  }
}
```

In your exported configure function, you can get it by namespace, eg:

```js
import {Config} from 'aurelia-config';

export function configure(aurelia, configCallback) {
  let authConfig = aurelia.container.get(Config).use('aurelia-authentication');
  // authConfig = {endpoint: null, configureEndpoints: false }

  // do something based on authConfig
}
```

### Use aurelia-config in your app or plugin

You can use aurelia-config then everywhere in your plugins or application by injecting `Config` into your class, eg:

```js
import {Config} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

@inject(Config)
export SomeClass {
  constructor(config) {
    let authEnpoint = config.fetch('aurelia-config.endpoints.auth');
    // or restrict it to a domain for a simpler use in the class
    this.config = config.use('aurelia-config');
    let apiEnpoint = this.config.fetch('endpoints.api');

    // or use the data object directly
    this.configData = config.use('aurelia-config').data;
    let userEndpoint = this.configData.endpoints.user;
  }
}
```

or use the Configuration resolver to inject the desired config segment.

```js
import {Configuration} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

@inject(Configuration.of('aurelia-api'))
export SomeClass {
  constructor(config) {
    let authEnpoint = config.fetch('endpoints.auth');
    let userEndpoint = config.data.endpoints.user;
  }
}
```

## Quick Homefront api overview

Since aurelia-config extends [homefront](https://www.npmjs.com/package/homefront), all of homefront's methods are available on the Config instance or a segments of it (when made with config.use('namespace')). Some methods homefronts gives you:

```js
  // contains the data in a single object
  .data            
  // recursively merges given sources into data.          
  .merge(sources)  
  // Fetches value of given key.
  .fetch(key, defaultValue)    
  //Convenience method. Calls .fetch(), and on null result calls .put() using provided toPut.
  .fetchOrPut(key, toPut)
  // Sets value for a key (creates object in path when not found).
  .put(key, value)    
  // Removes value by key.
  .remove(key)   
  // Search and return keys and values that match given string.
  .search(phrase)
```

Keys can be dot separated strings or an array of keys
