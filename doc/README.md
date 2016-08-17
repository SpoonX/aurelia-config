# Overview

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

## Quick Homefront api overview

Since aurelia-config extends [homefront](https://www.npmjs.com/package/homefront), all of homefront's methods are available on the Config instance or a segments of it (when made with config.use('namespace')). Some of the methods homefronts gives you are:

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
