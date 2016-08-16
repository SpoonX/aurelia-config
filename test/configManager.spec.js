import {ConfigManager} from 'src/configManager';
import {Config} from 'src/config';
import {DefaultLoader} from 'aurelia-loader-default';
import {config as standardConfig} from 'test/resources/testConfigs';

function getConfigManager() {
  return new ConfigManager(new Config, new DefaultLoader);
}

describe('ConfigManager', function() {
  describe('.constructor()', function() {
    it('Should set config, loader and container', function() {
      let config = new Config;
      let loader = new DefaultLoader;
      let configManager = new ConfigManager(config, loader);

      expect(configManager.config).toBe(config);
      expect(configManager.loader).toBe(loader);
    });
  });

  describe('.load()', function() {
    it('Should load default object from local file', function(done) {
      let configManager = getConfigManager();

      configManager.load('test/resources/testConfigs')
        .then(() => {
          expect(configManager.config.fetch('foo.bar')).toBe(standardConfig.foo.bar);
          done();
        });
    });

    it('Should load custen named object from local file', function(done) {
      let configManager = getConfigManager();

      configManager.load({name: 'test/resources/testConfigs', configName: 'otherConfig'})
        .then(() => {
          expect(configManager.config.fetch('key')).toBe('other-value');
          done();
        });
    });

    it('Should load default object from plugin', function(done) {
      let configManager = getConfigManager();

      configManager.load('test-plugin')
        .then(() => {
          expect(configManager.config.fetch('foo.bar')).toBe('baz');
          done();
        });
    });

    it('Should load object directly', function(done) {
      let configManager = getConfigManager();

      configManager.load(standardConfig)
        .then(() => {
          expect(configManager.config.fetch('foo.bar')).toBe('bazzing');
          done();
        });
    });
  });

  describe('.configure()', function() {
    it('Should configure with array in right order', function(done) {
      let configManager = getConfigManager();
      configManager.configure([
        'test/resources/testConfigs',
        {
          name: 'test/resources/testConfigs',
          configName: 'otherConfig'
        },
        'test-plugin',
        {key: 'xy'}
      ]).then(() => {
        expect(JSON.stringify(configManager.config.data))
          .toBe(JSON.stringify({ foo: {bar: 'baz', buz: 'buzzing' }, key: 'xy', kepper: 'kept' }));
        done();
      });
    });
  });
});
