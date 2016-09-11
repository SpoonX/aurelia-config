# Configuration

## In your app

Your basic configuration file just exports a simple object with aliasd configuration settings. The plugins will be configured with the corresponding namespace segments.

```js
export let appConfig = {
  'aurelia-plugin': {
    foo: 'bar'
    nested: {
      object: false
    }
  },
  'other-plugin': {
    fuz: {baz: 'faz'}}
  }
 /* or even configure aurelia-config itself. 
  * following would prevent aurelia-config to configure the listed plugins by default
  * 'aurelia-config': {
  *   configure: false
  * }
  */
}
```

At app configuration, you'll tell aurelia-config which plugin and app configuration files to load and in which order.

```js
aurelia.use
  .plugin('aurelia-config', [
      // plugins to configure with mergedDefaults['plugin-name'] 
      'plugin-name',
      // same as above
      {plugin: 'other-plugin'},
      // same as above plus the exported object 'defaults' will be merged into the mergedDefaults 
      {plugin: 'other-plugin', defaults: 'defaults'},
      //plugins to configure with mergedDefaults['alias'] 
      {plugin: 'username/my-plugin', alias: 'alias'},
      //plugins to configure with the whole mergedDefaults 
      {plugin: 'username/my-plugin', rootConfig: true},
      // don't configure, but the exported object 'defaults' will be merged into the mergedDefaults
      {plugin: 'simple-plugin', defaults: 'defaults', configure: false},
    ],  
    // your list of namespaced config objects
    appConfig,
    authConfig
  })
  //...
```

Settings get added in order of the array. Later called plugins overwrite previous settings. Hence, your app config should be the last entry in that array.

## Configure aurelia-config in your plugin

### The plugins configure function
Your plugin configuration function needs to accept a configuration object. `Aurelia-config` will call configue with the approriate namepsace section of the merged default. 

### Optionally export plugin defaults
If you want some defaults of your plugin to be merged into the gloabl defaults, your configuration file nedd just to export a simple object with the configuration settings. It's best named 'defaults' and uses the plugin name as alias (if not, you need to tell that aurelie-config. see above), eg.:

```js
export let defaults = {
  'aurelia-plugin': {
    foo: 'bar',
    nested: {
      object: true
    }
  }
}
```
