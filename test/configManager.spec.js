import {ConfigManager} from '../src/configManager';
import {BaseConfig} from '../src/baseConfig';
import {GlobalConfig} from '../src/globalConfig';
import {DefaultLoader} from 'aurelia-loader-default';
import {Container} from 'aurelia-dependency-injection';
import {Config, OtherConfig, CustomConfig} from './resources/testConfigs';


function getConfigManager() {
  return new ConfigManager(new Container, new DefaultLoader);
}

describe('ConfigManager', function() {
  /**
  * Creates an instance of BaseConfig. Copies defaults into current
  * @param {Container} container The container for the Configs
  * @param {Loader}    loader    The loader for the Configs
  */
  describe('.constructor()', function() {
    it('Should set loader and container', function() {
      let loader = new DefaultLoader;
      let container = new Container;
      let configManager = new ConfigManager(container, loader);

      expect(configManager.loader).toBe(loader);
      expect(configManager.container).toBe(container);
    });
  });

  /**
   * Has alias registered
   * @param  {string} alias The target container key
   * @return {boolean}             that
   */
  describe('.has()', function() {
    it('Not be true for registered alias', function() {
      let configManager = getConfigManager();
      configManager.configs['key'] = new Config;
      expect(configManager.has('key')).toBe(true);
    });
  });

  /**
  * Resolve key or instance to Config instance
  * @param  {function|string|BaseConfig} key The target container key or an BaseConfig instance
  * @return {BaseConfig}                     that
  */
  describe('.get()', function() {
    it('Not resolve unknown string key', function() {
      let configManager = getConfigManager();
      expect(configManager.get('unknown')).toBe(undefined);
    });

    it('Resolve alias', function() {
      let configManager = getConfigManager();
      let config = new Config;
      configManager.configs['key'] = config;
      expect(configManager.get('key')).toBe(config);
    });

    it('Resolve instance to Config instance', function() {
      let configManager = getConfigManager();
      let config = new BaseConfig({});
      expect(configManager.get(config)).toBe(config);
    });

    it('Resolve contructor key to Config instance', function() {
      let configManager = getConfigManager();
      let testConfig = configManager.container.get(Config);
      expect(configManager.get(Config)).toBe(testConfig);
    });

    it('Resolve string key to Config instance', function() {
      let configManager = getConfigManager();
      let otherConfig = new OtherConfig;
      configManager.container.registerInstance('my-key', otherConfig);
      expect(configManager.get('my-key')).toBe(otherConfig);
    });
  });


 /**
  * Set a config
  * @param  {string}            alias   The unique alias to register under
  * @param  {BaseConfig|Object} config  The BaseConfig instance to add
  * @return {ConfigManager}             itself
  * @chainable
  */
  describe('.addInstance()', function() {
    it('Should add BaseConfig instance', function() {
      let configManager = getConfigManager();
      let config = new Config;

      let chain = configManager.addInstance('key', config);
      expect(chain).toBe(configManager);
      expect(configManager.get('key')).toBe(config);
      expect(configManager.container.get('key')).toBe(config);
    });

    it('Should add BaseConfig instance and not register with container', function() {
      let configManager = getConfigManager();
      let config = new Config;

      let chain = configManager.addInstance('key', config, false);
      expect(chain).toBe(configManager);
      expect(configManager.get('key')).toBe(config);
      expect(configManager.container.get('key')).not.toBe(config);
    });

    it('Should add Object and wrap in BaseConfig', function() {
      let configManager = getConfigManager();
      let config = {};

      let chain = configManager.addInstance('key', config);
      expect(chain).toBe(configManager);
      expect(configManager.get('key').defaults).toBe(config);
      expect(configManager.container.get('key').defaults).toBe(config);
    });

    it('Should not allow duplicate alias', function() {
      let configManager = getConfigManager();

      configManager.addInstance('key', {bar: 'baz'});

      let fail = () =>  configManager.addInstance('key', {});
      expect(fail).toThrow();
    });
  });

  /**
   * Add a config
   * @param  {function|string} key           The container key
   * @param  {Object}          configObject  The configuration object
   * @param  {string}          alias         The aiias to register under if none is set in config.alias
   * @param  {boolean}         registerAlias Register with container (true)
   * @return {ConfigManager}                 itself
   * @chainable
   */
  describe('.addFromContainer()', function() {
    it('Should add Config from container', function() {
      let configManager = getConfigManager();
      let config = configManager.container.get(Config);

      let chain = configManager.addFromContainer(Config);
      expect(chain).toBe(configManager);
      expect(configManager.configs['plugin-config']).toBe(config);
      expect(configManager.get('plugin-config')).toBe(config);
      expect(configManager.container.get('plugin-config')).toBe(config);
    });

    it('Should add OtherConfig from container with config, alias and not register alias', function() {
      let configManager = getConfigManager();
      let config = configManager.container.get(OtherConfig);
      let initial = {'foo': 'bar'};

      let chain = configManager.addFromContainer(OtherConfig, initial, 'other-config', false);
      expect(chain).toBe(configManager);
      expect(configManager.configs['other-config']).toBe(config);
      expect(configManager.configs['other-config'].current.key).toBe('other-value');
      expect(configManager.configs['other-config'].current.foo).toBe('bar');
      expect(configManager.get('other-config')).toBe(config);
      expect(configManager.container.get('other-config')).not.toBe(config);
    });

    it('Should add CustomConfig from container and wrap in BaseConfig', function() {
      let configManager = getConfigManager();
      let config = configManager.container.get(CustomConfig);
      let initial = {'foo': 'bar'};

      let chain = configManager.addFromContainer(CustomConfig, initial, 'custom-config', true);
      expect(chain).toBe(configManager);
      expect(configManager.configs['custom-config'] instanceof BaseConfig).toBe(true);
      expect(configManager.configs['custom-config'].current.customKey).toBe('custom-value');
      expect(configManager.configs['custom-config'].current.foo).toBe('bar');
      expect(configManager.configs['custom-config'].defaults).toBe(config);
      expect(configManager.get('custom-config').defaults).toBe(config);
      expect(configManager.container.get('custom-config').defaults).toBe(config);
    });

    it('Should add CustomConfig from container and wrap in BaseConfig not register with container', function() {
      let configManager = getConfigManager();
      let config = configManager.container.get(CustomConfig);
      let initial = {'foo': 'bar'};

      let chain = configManager.addFromContainer(CustomConfig, initial, 'custom-config', false);
      expect(chain).toBe(configManager);
      expect(configManager.configs['custom-config'] instanceof BaseConfig).toBe(true);
      expect(configManager.configs['custom-config'].current.customKey).toBe('custom-value');
      expect(configManager.configs['custom-config'].current.foo).toBe('bar');
      expect(configManager.configs['custom-config'].defaults).toBe(config);
      expect(configManager.get('custom-config').defaults).toBe(config);
      expect(configManager.container.get('custom-config').defaults).not.toBe(config);
    });

    it('Should not allow duplicate alias', function() {
      let configManager = getConfigManager();

      configManager.addFromContainer(OtherConfig, {}, 'custom-config');
      let fail = () => configManager.addFromContainer(CustomConfig, {}, 'custom-config');
      expect(fail).toThrow();
    });
  });

  /**
  * Deep copy a Config into another
  * @param  {function|string|BaseConfig} targetAliasOrKeyOrInstance The target alias, container key or an instance of BaseConfig
  * @param  {function|string|BaseConfig} sourceAliasOrKeyOrInstance The source alias, container key or an instance of BaseConfig
  * @param  {boolean}                    includeDefaults     Also copy defaults
  * @return {ConfigManager}                                  itself
  * @chainable
  */
  describe('.copy()', function() {
    it('Should copy without defaults', function() {
      let configManager = getConfigManager();
      let source = configManager.container.get(Config);
      let target = configManager.container.get(OtherConfig);

      let chain = configManager.copy(target, source);

      expect(chain).toBe(configManager);
      expect(target.current.key).toBe('value');
      expect(target.defaults.key).toBe('other-value');
    });

    it('Should copy with defaults', function() {
      let configManager = getConfigManager();
      let source = configManager.container.get(Config);
      let target = configManager.container.get(OtherConfig);

      let chain = configManager.copy(target, source, true);

      expect(chain).toBe(configManager);
      expect(target.current.key).toBe('value');
      expect(target.defaults.key).toBe('value');
    });
  });

  describe('.extend()', function() {
    it('Should extend without defaults', function() {
      let configManager = getConfigManager();
      let source = configManager.container.get(CustomConfig);
      let target = configManager.container.get(Config);

      let chain = configManager.extend(target, source);

      expect(chain).toBe(configManager);
      expect(target.current.key).toBe('value');
      expect(target.current.customKey).toBe('custom-value');
      expect(target.defaults.key).toBe('value');
      expect(target.defaults.customKey).toBe(undefined);
    });

    it('Should extend with defaults', function() {
      let configManager = getConfigManager();
      let source = configManager.container.get(CustomConfig);
      let target = configManager.container.get(Config);

      let chain = configManager.extend(target, source, true);

      expect(chain).toBe(configManager);
      expect(target.current.key).toBe('value');
      expect(target.current.customKey).toBe('custom-value');
      expect(target.defaults.key).toBe('value');
      expect(target.defaults.customKey).toBe('custom-value');
    });
  });

  /**
  * Remove a Config from the ConfigManager
  * @param  {function|string|BaseConfig} aliasOrKeyOrInstance The target alias or container key or an instance of BaseConfig
  * @param  {boolean}                    removeAlias          Also remove container alias (true)
  * @return {ConfigManager}                                   itself
  * @chainable
  */
  describe('.remove()', function() {
    it('Should remove from configManager and alias from container', function() {
      let configManager = getConfigManager();
      let target = configManager.container.get(Config);
      configManager.addFromContainer(Config);

      let chain = configManager.remove(target);

      expect(chain).toBe(configManager);
      expect(configManager.container.get(Config)).toBe(target);
      expect(configManager.has(Config)).toBe(false);
      expect(configManager.container.get('plugin-config')).not.toBe(target);
    });
  });

  describe('.remove()', function() {
    it('Should remove from configManager but keep alias in container', function() {
      let configManager = getConfigManager();
      let target = configManager.container.get(Config);
      configManager.addFromContainer(Config);

      let chain = configManager.remove(target, false);

      expect(chain).toBe(configManager);
      expect(configManager.container.get(Config)).toBe(target);
      expect(configManager.has(Config)).toBe(false);
      expect(configManager.container.get('plugin-config')).toBe(target);
    });
  });

  /**
   * Load a plugin by moduleId and merge config
   * @param  {{moduleId, registerAlias, configObject, className}} moduleId: string, registerAlias: boolean, config: configObject, className: string
   * @return {Promise<>}
   */
//  load(moduleId, registerAlias = true, configObject = {}, className = 'Config') {
  describe('.load()', function() {
    it('Should load default class Config', function(done) {
      let configManager = getConfigManager();

      configManager.load('test/resources/testConfigs')
        .then(()=>{
          expect(configManager.has('plugin-config')).toBe(true);
          let config = configManager.get('plugin-config');
          expect(configManager.container.get('plugin-config')).toBe(config);
          done();
        });
    });

    it('Should load custom class Config and not register alias with container', function(done) {
      let configManager = getConfigManager();

      configManager.load('test/resources/testConfigs', {data:'xy'}, 'OtherConfig', false)
        .then(()=>{
          expect(configManager.has('test/resources/testConfigs')).toBe(true);
          let config = configManager.get('test/resources/testConfigs');
          expect(configManager.container.get('test/resources/testConfigs')).not.toBe(config);
          expect(config.current.data).toBe('xy');
          done();
        });
    });

    it('Should fail to load not existing custom class', function(done) {
      let configManager = getConfigManager();

      configManager.load('test/resources/testConfigs', {}, 'UnknownConfig')
        .then(()=>{
          expect('to be called').toBe(false);
          done();
        }).catch(()=>{
          expect('failed').toBe('failed');
          done();
        });
    });
  });

  describe('.configure()', function() {
    it('Should configure plugin, object and global', function(done) {
      let configManager = getConfigManager();
      configManager.configure({
        plugins: [
          {moduleId: 'test/resources/testConfigs'}
        ],
        configs: [
          {key: 'adhoc-config'}
        ],
        globalConfig: {data:'xy'}
      }).then(()=>{
        expect(configManager.has('plugin-config')).toBe(true);
        expect(configManager.get('plugin-config') instanceof Config).toBe(true);
        expect(configManager.has('adhoc-config')).toBe(true);
        expect(configManager.has('global-config')).toBe(true);
        expect(configManager.get('global-config').current.data).toBe('xy');
        expect(configManager.get('global-config') instanceof GlobalConfig).toBe(true);
        done();
      });
    });
  });
});
