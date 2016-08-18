# Usage

You can use aurelia-config everywhere in your plugins or application by injecting `Config` into your class, eg:

```js
import {Config} from 'aurelia-config';
import {inject} from 'aurelia-dependency-injection';

@inject(Config)
export SomeClass {
  constructor(config) {
    // get value for 'aurelia-plugin.foo'
    // Using Homefront
    let foo          = config.fetch('aurelia-plugin.foo');  // = 'bar'
    // Using plain object
    let nested       = config.data.nested;                  // = {object: true}

    // or get a config segment for a simpler usage in the class
    // Using Homefront
    this.config      = config.use('aurelia-plugin');
    let nestedObject = this.config.fetch('nested.object');  // = true
    // Using plain object
    let nested       = this.config.data.nested;             // = {object: true}
  }
}
```

or use the `Configuration` resolver to inject the desired config segment.

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
