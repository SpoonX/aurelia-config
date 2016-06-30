# aurelia-config

Configuration plugin that allows you to expose and centralize your configuration.

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

This library is an unofficial plugin for the [Aurelia](http://www.aurelia.io/) platform and simplifies plugin configuration by collecting them in a single place.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Used By

This library is used by plugins and applications.

## Installation for plugin developers

There isn't much to do. Just tell the users to add it to the plugin list for aurelia-config and make sure your plugin exports a class or object named 'Config' (default). The user settings will get merged into that class or object.

## Installation for applications

Run `jspm i aurelia-config` from your project root or `npm i aurelia-config --save` when using webpack.

## Api documentation

See aurelia-config [documentation](doc/modules/_aurelia_config_.md)

## Usage

### Configuring the plugin

You can specify which plugin configs class you want to register and add the data you want to get merged into the configs of the plugins.

```js
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-config', {
      plugins: [
        // Add Configs from plugins
        // {
        // module:    moduleId,     // The plugin moduleId
        // config:    configObject, // The config object you want to merge into
        //                             the plugins config
        // alias:     'an-alias',   // The alias/key (default: ${moduleId}-config)
        //                             (used for registration in the ConfigManager
        //                             and the container, if applicable
        // className: 'ClassName'   // The class name (default: 'Config') of the
        //                             config object that will be imported from
        //                             the plugin
        // }
        {moduleId: 'aurelia-api', config: {key:'xy'}, className: 'Config'},
        {moduleId: 'aurelia-authorization', alias: 'authorization-config', config: {data:'xy'}},
      ],
      configs: [
        // Add new Configs by Object
        // {
        // key:     'an-alias',   // The alias/key (default: ${moduleId}-config)
        //                             (used for registration in the ConfigManager
        //                             and the container, if applicable
        // config:    configObject, // The config object you want to merge into
        //                             the plugins config
        // }
        {key: 'adhoc-config'}
      ],
      // Add entries to the pre-defined 'global-config'
      // globalConfig: configObject, // The config object you want to merge into
      //                                the plugins config
      globalConfig: {data:'xy'},
      // Allows injection by alias (default: true)
      registerAlias: true   
    })
    /* Your other plugins */
);

  aurelia.start().then(() => aurelia.setRoot());
}
```

### Usage

Well, above might be enough for you. Configs get registered and merged.

To access the merged configs, you still can inject them by class constructor.

```js
import {Config} from 'aurelia-authorization';

@inject(Config)
export class Foo {
  constructor(config) {
    this.config = config;
  }
}
```

Alternatively, you can inject the ConfigManager from aurelia-config and get the Config by alias.

```js
import {ConfigManager} from 'aurelia-config';

@inject(ConfigManager)
export class Foo {
  constructor(configManager) {
    this.config = configManager.configs['authorization-config'];
  }
}
```

Or, if `registerAlias: true` (default), you can inject the Config by alias right away.

```js
@inject('authorization-config')
export class Foo {
  constructor(config) {
    this.config = config;
  }
}
```

There also is a global config. Use it like any other Config. It's alias is 'global-config'.

```js
// the type is 'GlobalConfig'
//import {GlobalConfig} from 'aurelia-config';  

@inject('global-config')
export class Foo {
  constructor(config) {
    this.globalConfig = config;
  }
}
```
