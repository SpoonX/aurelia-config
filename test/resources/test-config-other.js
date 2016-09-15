// namespaced
export let otherDefaults = {
  'test-config': {
    foo: {bar: 'baz'},
    keeper: 'kept'
  }
};

export let configure = function configure(aurelia, config) {
  return config;
};
