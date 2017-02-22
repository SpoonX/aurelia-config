# Configuration

aurelia.use.plugin('aurelia-config', [plugins], appConfig);

Your app configuration is just a appropriatly namespaced object. 

```js
// Example config
let localConfigOverrides = {
  'aurelia-api': {
    endpoints: [
      {name: 'api', url: 'http://127.0.0.1:1337/'}
    ]
  },
  'aurelia-notification': {
    baseClass: 'custom-notifications'
  }
};
```

### Configuration options

* moduleId: The plugin or file name it is registered under
* rootConfig: (optional) Set this true, if your plugin expects namespaced configuration object for it's plugin configuration. 

Some examples:

```js
aurelia.use
  .plugin('aurelia-config', configure => {
    return configure([
      // load and merge exported object 'config', if existing, 
      // and configure 'plugin-name' with mergedConfig['plugin-name'] 
      'plugin-name',
      // same as above
      {plugin: 'plugin-name'},
      // load and merge exported object 'config', if existing,
      // and configure 'plugin-name' with mergedConfig root. 
      {plugin: 'plugin-name', rootConfig: true}
    ],  
    // your list of namespaced config objects
    appConfig,
    authConfig
  })
  //...
```
