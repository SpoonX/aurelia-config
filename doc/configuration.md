# Configuration

## In your app

Your basic configuration file just exports a simple object with (usually name-spaced) configuration settings. Plugins which use aurelia-config will have similar files for their plugin default settings.

```js
export let config = {
  'aurelia-plugin': {
    foo: 'bar'
    nested: {
      object: false
    }
  },
  'other-plugin': {
    fuz: {baz: 'faz'}}
  }
}
```

Add app configuration, you'll tell aurelia-config which plugin and user configuration files to load and in which order.

Short version:

```js
aurelia.use
  .plugin('aurelia-config', [
    'aurelia-plugin',
    'aurelia-other-plugin',
    './userConfig'
  ])
  .plugin('aurelia-plugin')
  //...
```

Long version:

```js
let appConfig = { key: 'value'};

aurelia.use
  /* aurelia-config should be before other plugins which use aurelia-config.
    They then can use your user settings already during their configuration */
  .plugin('aurelia-config', [
    // a plugin that follows the convention aka exports a object named 'config'
    'aurelia-plugin',
    // a plugin that exports a configuration object named 'baseConfig'
    {name: 'aurelia-plugin', configName: 'pluginConfig'},
    // a configuration object
    userConfig,
    // a local configuration file that exports an object named 'config'
    './userConfig',
    // a local configuration file that exports an object named 'userConfig'
    {name: './userConfig', configName: 'userConfig'}
  ])
  // Other plugins that use aurelia-config don't need much user configuration anymore
  .plugin('aurelia-plugin')
  // but you still can overwrite or add settings, if the plugin allows that
  .plugin('other-plugin', {
    foo: 'bar'
  });
```

Configs get added in order of the array. Later called plugins overwrite previous settings. Hence, your user `config` should be the last entry in that array.

## Configure aurelia-config in your plugin

Your configuration file just exports a simple object with the configuration settings. It's best named 'config' and uses the plugin name as namespace, eg.:

```js
export let config = {
  'aurelia-plugin': {
    foo: 'bar',
    nested: {
      object: true
    }
  }
}
```

In your plugin's `configure` function, you can get the config segment by namespace.

```js
import {Config} from 'aurelia-config';

export function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config).use('aurelia-plugin');
  // config,fetch('foo') === 'bar'
  // config.data         === {foo: 'bar', nested: { object: true }}
}
```
