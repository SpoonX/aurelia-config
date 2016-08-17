# Usage

## Configure aurelia-config in your app

Your basic configuration file just exports a simple object with (preferably name-spaced) configuration settings, eg.:

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

Register the with aurelia-config the plugin configs and your user config.

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

Configs get added in order of the array. So, later called plugins overwrite previous settings. Hence, your user `config` should be the last entry in that array.

## Configure aurelia-config in your plugin

Your configuration file just exports a simple object with the configuration settings. It's best named 'config' and uses the plugin name as namespace), eg.:

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

In your exported configure function, you can get it by namespace, eg:

```js
import {Config} from 'aurelia-config';

export function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config).use('aurelia-plugin');
  // config,fetch('foo') === 'bar'
  // config.data         === {foo: 'bar', nested: { object: true }}

  // do something based on your config
}
```

## Use aurelia-config in your app or plugin

You can use aurelia-config then everywhere in your plugins or application by injecting `Config` into your class, eg:

```js
import {Config} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

@inject(Config)
export SomeClass {
  constructor(config) {
    let foo          = config.fetch('aurelia-plugin.foo');  // = 'bar'

    // or restrict it to a domain for a simpler use in the class
    this.config      = config.use('aurelia-plugin');
    let nestedObject = this.config.fetch('nested.object'); // = true

    // or use the data object directly
    this.configData = config.use('aurelia-plugin').data;
    let nested      = this.configData.nested;              // = {object: true}
  }
}
```

or use the Configuration resolver to inject the desired config segment.

```js
import {Configuration} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

@inject(Configuration.of('aurelia-plugin'))
export SomeClass {
  constructor(config) {
    let foo          = config.fetch('foo');           // = 'bar'
    let nestedObject = config.fetch('nested.object'); // = true
    let nested       = config.data.nested;            // = {object: true}
  }
}
```
