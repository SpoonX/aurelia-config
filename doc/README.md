# aurelia-config

Aurelia-config is an aurelia plugin that allows you to load and configure plugins in a normalized manner.

## Overview
Using this plugin you can make it a lot easier to allow for configuration using [IoC](https://en.wikipedia.org/wiki/Inversion_of_control).

### For plugin developers
You can allow app developers to configure your plugin through a simple config object. The way you expose it is simple: export an object literal called `config`, and give it a namespace / key to use. This is the same object your `configure()` function will receive upon plugin-configuration time.

```js
// your-plugin.js

export function configure(aurelia, config) {
  // config is pojo
}

export {
  /* you need to namespace your defaults */
  'your-plugin': {
    /* This is your (optional) default config. */
  }
} as config;
```

Now app developers can use this config. Keep on reading to figure out how.

### For app developers
In stead of using `.plugin()` for every plugin, you only use it for the `aurelia-config` plugin. Aurelia-config will register the rest of the plugins, using the corresponding namespace segment of your exported default config (if existing) merged with the appConfigOverwrites.

```js
// Example config
let appConfigOverwrites = {
  'aurelia-api': {
    endpoints: [
      {name: 'api', url: 'http://127.0.0.1:1337/'}
    ]
  },
  'aurelia-notification': {
    baseClass: 'custom-notifications'
  }
};

// Configure function
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-config', configure => {
      return configure([
        'aurelia-api',
        'aurelia-notification',
      ], appConfigOverwrites);
    });
}
```
