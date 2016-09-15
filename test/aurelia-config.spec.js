import {Container} from 'aurelia-dependency-injection';
import {DefaultLoader} from 'aurelia-loader-default';
import {Aurelia} from 'aurelia-framework';
import {Config} from 'src/config';

import * as simplePlugin from 'test/resources/simple-config';
import * as testPlugin from 'test/resources/test-config';
import * as otherPlugin from 'test/resources/test-config-other';

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}

describe('configure', () => {
  it('Should configure with an plugins without config and appConfigs rest', done => {
    let aurelia = getAurelia();
    let frameworkConfiguration = aurelia.use;
    let plugins    = ['test/resources/simple-config'];
    let appConfig  = {foo: {'bar': 'bang'}};

    spyOn(simplePlugin, 'configure');

    frameworkConfiguration.plugin('src/aurelia-config', configure => configure(plugins, appConfig));

    frameworkConfiguration.apply().then(res => {
      let config = frameworkConfiguration.container.get(Config);
      let merged = Config.merge({'test/resources/simple-config': {}}, appConfig);

      expect(JSON.stringify(config.data)).toBe(JSON.stringify(merged));
      expect(simplePlugin.configure).toHaveBeenCalledWith(frameworkConfiguration, config.data['test/resources/simple-config']);
    }).then(done);
  });


  it('Should configure with an array of plugins and appConfigs rest', done => {
    let aurelia = getAurelia();
    let frameworkConfiguration = aurelia.use;
    let plugins    = ['test/resources/test-config'];
    let appConfig  = {foo: {'bar': 'bang'}};

    spyOn(testPlugin, 'configure');

    frameworkConfiguration.plugin('src/aurelia-config', configure => configure(plugins, appConfig));

    frameworkConfiguration.apply().then(res => {
      let config = frameworkConfiguration.container.get(Config);
      let merged = Config.merge({}, testPlugin.config, appConfig);

      expect(JSON.stringify(config.data)).toBe(JSON.stringify(merged));
      expect(testPlugin.configure).toHaveBeenCalledWith(frameworkConfiguration, config.data['test/resources/test-config']);
    }).then(done);
  });

  it('Should configure with an array of plugins and appConfigs rest in right order', done => {
    let aurelia = getAurelia();
    let frameworkConfiguration = aurelia.use;
    let plugins = [
      {moduleId: 'test/resources/test-config'},
      {moduleId: 'test/resources/test-config-other', rootConfig: true}
    ];
    let appConfig = {foo: {'bar': 'bang'}};

    spyOn(testPlugin, 'configure');
    spyOn(otherPlugin, 'configure');

    frameworkConfiguration.plugin('src/aurelia-config', configure => configure(plugins, appConfig));

    frameworkConfiguration.apply().then(res => {
      let config = frameworkConfiguration.container.get(Config);
      let merged = Config.merge({}, testPlugin.config, otherPlugin.config, appConfig);

      expect(JSON.stringify(config.data)).toBe(JSON.stringify(merged));
      expect(testPlugin.configure).toHaveBeenCalledWith(frameworkConfiguration, config.data['test/resources/test-config']);
      expect(otherPlugin.configure).toHaveBeenCalledWith(frameworkConfiguration, config.data);
    }).then(done);
  });
});

