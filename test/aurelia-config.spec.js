import {Container} from 'aurelia-dependency-injection';
import {DefaultLoader} from 'aurelia-loader-default';
import {configure} from 'src/aurelia-config';
import {Config} from 'src/config';

function getAurelia() {
  return {container: new Container, loader: new DefaultLoader};
}

function getFrameworkConfiguration() {
  let aurelia = getAurelia();
  return {aurelia: aurelia, container: aurelia.container, plugin: null};
}

describe('configure', () => {
  it('Should configure with a array of plugins and appConfigs rest', done => {
    let frameworkConfiguration = getFrameworkConfiguration();
    let plugins    = [{key: 'value'}];
    let appConfig  = {foo: 'bar'};

    configure(frameworkConfiguration, plugins, appConfig).then(res => {
      let config = frameworkConfiguration.container.get(Config);

      expect(JSON.stringify(config.data)).toBe('{"aurelia-config":{"configure":true},"key":"value","foo":"bar"}');
      expect(res).not.toBeDefined();
    }).then(done);
  });

  it('Should not configure but only merge defaults when aurelia-config.configure=false', done => {
    let frameworkConfiguration = getFrameworkConfiguration();
    let plugins    = [{key: 'value'}];
    let appConfig  = {'aurelia-config': {configure: false}, foo: 'bar'};

    configure(frameworkConfiguration, plugins, appConfig).then(res => {
      let config = frameworkConfiguration.container.get(Config);

      expect(JSON.stringify(config.data)).toBe('{"aurelia-config":{"configure":false},"key":"value","foo":"bar"}');
      expect(res).toBe(null);
    }).then(done);
  });
});

