import {Container} from 'aurelia-dependency-injection';
import {DefaultLoader} from 'aurelia-loader-default';
import {Aurelia} from 'aurelia-framework';
import {PluginManager} from 'src/plugin-manager';
import {Config} from 'src/config';

import {config as testConfig} from 'test/resources/test-config';
import {config as otherConfig} from 'test/resources/test-config-other';

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}

describe('PluginManager', () => {
  describe('normalized', () => {
    it('Should call handler with mormalized string', () => {
      let aurelia = getAurelia();
      let pluginManager = aurelia.container.get(PluginManager);

      let plugins = ['string'];

      pluginManager.normalized(plugins, plugin => {
        expect(plugin.moduleId).toBe('string');
      });
    });

    it('Should call handler with mormalized object', () => {
      let aurelia = getAurelia();
      let pluginManager = aurelia.container.get(PluginManager);

      let plugins = [{moduleId: 'name'}];

      pluginManager.normalized(plugins, plugin => {
        expect(plugin.moduleId).toBe('name');
      });
    });
  });

  describe('configure', () => {
    it('Should configure with an array of plugins and appConfigs rest', done => {
      let aurelia = getAurelia();
      let pluginManager = aurelia.container.get(PluginManager);
      let plugins    = ['test/resources/test-config'];
      let appConfig  = {foo: {'bar': 'bang'}};

      pluginManager.configure(aurelia.use, plugins, appConfig)
      .then(res => {
        let config = aurelia.container.get(Config);
        let merged = Config.merge({}, testConfig, appConfig);
        expect(JSON.stringify(config.data)).toBe(JSON.stringify(merged));
      }).then(done);
    });

    it('Should configure with an array of plugins and appConfigs rest in right order', done => {
      let aurelia = getAurelia();
      let pluginManager = aurelia.container.get(PluginManager);
      let plugins = [
        {moduleId: 'test/resources/test-config'},
        {moduleId: 'test/resources/test-config-other', rootConfig: true}
      ];
      let appConfig = {foo: {'bar': 'bang'}};

      pluginManager.configure(aurelia.use, plugins, appConfig)
      .then(res => {
        let config = aurelia.container.get(Config);
        let merged = Config.merge({}, testConfig, otherConfig, appConfig);

        expect(JSON.stringify(config.data)).toBe(JSON.stringify(merged));
      }).then(done);
    });
  });
});

