import {ConfigManager} from 'src/config-manager';
import {Config} from 'src/config';
import {Container} from 'aurelia-dependency-injection';
import {DefaultLoader} from 'aurelia-loader-default';
import {Homefront} from 'homefront';

function getAurelia() {
  return {container: new Container, loader: new DefaultLoader};
}

function getFrameworkConfiguration() {
  let aurelia = getAurelia();
  return {aurelia: aurelia, container: aurelia.container, plugin: () => arguments};
}

function getConfigManager() {
  return new ConfigManager(new Config, new DefaultLoader);
}

describe('ConfigManager', function() {
  describe('.constructor()', function() {
    it('Should set config and loader', function() {
      let config = new Config;
      let loader = new DefaultLoader;
      let configManager = new ConfigManager(config, loader);

      expect(configManager.config).toBe(config);
      expect(configManager.loader).toBe(loader);
    });
  });

  describe('.loadDefaults()', function() {
    it('Should throw if not found', function(done) {
      let configManager = getConfigManager();

      configManager.loadDefaults('test/resources/test-config', 'xyz')
        .catch(error => {
          expect(error instanceof Error).toBe(true);
          done();
        });
    });

    it('Should load object from local file', function(done) {
      let configManager = getConfigManager();

      configManager.loadDefaults('test/resources/test-config', 'defaults')
        .then(defaults => {
          expect(defaults).toBeDefined();
          expect(typeof defaults === 'object').toBe(true);
        }).then(done);
    });

    it('Should load function from local file', function(done) {
      let configManager = getConfigManager();

      configManager.loadDefaults('test/resources/test-config', 'configure')
        .then(configure => {
          expect(configure).toBeDefined();
          expect(typeof configure === 'function').toBe(true);
        }).then(done);
    });
  });

  describe('.mergeDefault()', function() {
    it('Should not merge defaults when passed as string', function(done) {
      let configManager = getConfigManager();

      configManager.mergeDefault('test/resources/test-config')
        .then(config => {
          expect(config instanceof Homefront).toBe(true);
          expect(config).toBe(configManager.config);
          expect(JSON.stringify(config.data)).toBe('{"aurelia-config":{"configure":true}}');
        }).then(done);
    });

    it('Should not merge defaults when property defaults is not set', function(done) {
      let configManager = getConfigManager();

      configManager.mergeDefault({plugin: 'test/resources/test-config-other'})
        .then(config => {
          expect(config instanceof Homefront).toBe(true);
          expect(config).toBe(configManager.config);
          expect(JSON.stringify(config.data)).toBe('{"aurelia-config":{"configure":true}}');
        }).then(done);
    });

    it('Should merge defaults when property defaults is given', function(done) {
      let configManager = getConfigManager();

      configManager.mergeDefault({plugin: 'test/resources/test-config', defaults: 'defaults'})
        .then(config => {
          expect(config instanceof Homefront).toBe(true);
          expect(config).toBe(configManager.config);
          expect(config.data['test/resources/test-config'].foo.bar).toBe('bazzing');
        }).then(done);
    });

    it('Should merge defaults using an alias when properties allias and defaults are given', function(done) {
      let configManager = getConfigManager();

      configManager.mergeDefault({plugin: 'test/resources/test-config-other', defaults: 'otherDefaults', alias: 'spacy'})
        .then(config => {
          expect(config instanceof Homefront).toBe(true);
          expect(config).toBe(configManager.config);
          expect(config.data.spacy['test-config'].keeper).toBe('kept');
        }).then(done);
    });

    it('Should merge defaults when properties rootConfig and defaults are given', function(done) {
      let configManager = getConfigManager();

      configManager.mergeDefault({plugin: 'test/resources/test-config-other', defaults: 'otherDefaults', rootConfig: true})
        .then(config => {
          expect(config instanceof Homefront).toBe(true);
          expect(config).toBe(configManager.config);
          expect(config.data['test-config'].keeper).toBe('kept');
        }).then(done);
    });

    it('Should merge object', function(done) {
      let configManager = getConfigManager();

      configManager.mergeDefault({foo: 'bar'})
        .then(config => {
          expect(config instanceof Homefront).toBe(true);
          expect(config).toBe(configManager.config);
          expect(config.data.foo).toBe('bar');
        }).then(done);
    });
  });

  describe('.mergeDefaultsSynchronous()', function() {
    it('Should merge with array in right order', function(done) {
      let configManager = getConfigManager();
      configManager.mergeDefaultsSynchronous([
        {
          plugin: 'test/resources/test-config',
          defaults: 'defaults',
          alias: 'test-config'
        },
        {
          plugin: 'test/resources/test-config-other',
          defaults: 'otherDefaults',
          rootConfig: true
        },
        {'test-config': {key: 'xy', keeper: 'not-kept'}}
      ])
      .then(config => {
        expect(config instanceof Homefront).toBe(true);
        expect(config).toBe(configManager.config);
        expect(JSON.stringify(config.data))
          .toBe(JSON.stringify({'aurelia-config': { configure: true}, 'test-config': {foo: {bar: 'baz', buz: 'buzzing' }, keeper: 'not-kept', key: 'xy'}}));
      }).then(done);
    });
  });

  describe('.configurePlugins()', function() {
    it('Should configure if entry is a string', function(done) {
      let configManager = getConfigManager();
      configManager.config.data = {foo: 'bar'};

      let frameworkConfiguration = getFrameworkConfiguration();
      spyOn(frameworkConfiguration, 'plugin');

      configManager.configurePlugins(frameworkConfiguration, ['foo'])
      .then(result => {
        expect(frameworkConfiguration.plugin).toHaveBeenCalledWith('foo', configManager.config.data.foo);
        done();
      });
    });

    it('Should configure if entry is {plugin: string}', function(done) {
      let configManager = getConfigManager();
      configManager.config.data = {foo: 'bar'};

      let frameworkConfiguration = getFrameworkConfiguration();
      spyOn(frameworkConfiguration, 'plugin');

      configManager.configurePlugins(frameworkConfiguration, [{plugin: 'foo'}])
      .then(result => {
        expect(frameworkConfiguration.plugin).toHaveBeenCalledWith('foo', configManager.config.data.foo);
        done();
      });
    });

    it('Should configure if entry is {plugin: string, alias: string}', function(done) {
      let configManager = getConfigManager();
      configManager.config.data = {'spacy': {foo: 'bar'}};

      let frameworkConfiguration = getFrameworkConfiguration();
      spyOn(frameworkConfiguration, 'plugin');

      configManager.configurePlugins(frameworkConfiguration, [{plugin: 'baz', alias: 'spacy'}])
      .then(result => {
        expect(frameworkConfiguration.plugin).toHaveBeenCalledWith('baz', configManager.config.data.spacy);
        done();
      });
    });

    it('Should configure if entry is {plugin: string, rootConfig: true}', function(done) {
      let configManager = getConfigManager();
      configManager.config.data = {'plugin': {foo: 'bar'}};

      let frameworkConfiguration = getFrameworkConfiguration();
      spyOn(frameworkConfiguration, 'plugin');

      configManager.configurePlugins(frameworkConfiguration, [{plugin: 'baz', rootConfig: true}])
      .then(result => {
        expect(frameworkConfiguration.plugin).toHaveBeenCalledWith('baz', configManager.config.data);
        done();
      });
    });

    it('Should not configure when configure=false', function(done) {
      let configManager = getConfigManager();
      configManager.config.data = {foo: 'bar'};

      let frameworkConfiguration = getFrameworkConfiguration();
      spyOn(frameworkConfiguration, 'plugin');

      configManager.configurePlugins(frameworkConfiguration, [{plugin: 'baz', configure: false}])
      .then(result => {
        expect(frameworkConfiguration.plugin).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
