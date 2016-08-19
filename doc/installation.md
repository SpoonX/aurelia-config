# Installation 

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
