# Usage

You can use aurelia-config everywhere in your plugins or application by injecting `Config` into your class, eg:

```js
import {Config} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

@inject(Config)
export SomeClass {
  constructor(config) {
    // get value for 'aurelia-plugin.foo'
    let foo          = config.fetch('aurelia-plugin.foo');  // = 'bar'

    // or get a config segment for a simpler usage in the class
    // As plain object
    this config      = config.fetch('aurelia-plugin');
    let nested       = this.config.nested.object;           // = true
    // As instance of Homefront
    this config      = config.use('aurelia-plugin');
    let nested       = this.config.fetch('nested.object');  // = true
  }
}
```

or use the `Configuration` resolver to inject the desired config segment either as object or as Homefront instance.

```js
import {Configuration} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

// as plain object
@inject(Configuration.of('aurelia-plugin'))
export SomeClass {
  constructor(config) {
    let foo          = config.foo;           // = 'bar'
    let nestedObject = config.nested.object; // = true
  }
}

// as Homefront instance
@inject(Configuration.of('aurelia-plugin', true))
export SomeClass {
  constructor(config) {
    let foo          = config.fetch('foo');           // = 'bar'
    let nestedObject = config.fetch('nested.object'); // = true
  }
}
```
