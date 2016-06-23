import * as LogManager from 'aurelia-logging';
import {extendIn} from './baseConfig';
import {GlobalConfig} from './globalConfig';

/**
 * The ConfigManager class
 * Register and retrieve configs
 */
export class ConfigManager {
  /**
   * POJO map of the registered configs
   * @type {Object}
   */
  configs = {};

  /**
  * The container for the Configs
  * @param {Container}
   */
  container;

  /**
  * The Config loader
  * @param {Loader}
   */
  loader;

  /**
  * Creates an instance of BaseConfig. Copies defaults into current
   * @param  {Container} container The container for the Configs
   * @param  {Loader}    loader    The loader for the Configs
   */
  constructor(container, loader) {
    this.container = container;
    this.loader = loader;
  }

  /**
   * Configure with a list of plugins and configs
   * @param  {{plugins, configs, registerAlias}} plugins: [{moduleId, config, className}], configs: {key, config}, registerAlias: boolean
   * @return {Promise<>}
   */
  configure({plugins, configs, registerAlias}) {
    let promise;

    // register and merge plugin Configs
    let moduleLoaders = [];
    (plugins || []).forEach(plugin => {
      moduleLoaders.push(this.load(plugin.moduleId, registerAlias, plugin.config, plugin.className));
    });
    promise = Promise.all(moduleLoaders);

    // register config objects
    promise.then(()=>{
      (configs || []).forEach(configObject => {
        this.add(configObject.key, configObject.config, registerAlias);
      });

      // add globalConfig if it wasn't listed in configs
      if (!this.container.hasResolver(GlobalConfig)) {
        this.add(GlobalConfig);
      }
    });

    return promise;
  }

  /**
   * Load a plugin by moduleId annd merge config
   * @param  {{moduleId, registerAlias, config, className}} moduleId: string, registerAlias: boolean, config: configObject, className: string
   * @return {Promise<>}
   */
  load(moduleId, registerAlias = true, config = {}, className = 'Config') {
    return this.loader.loadModule(moduleId).then(loadedModule => {
      if (!className in loadedModule) {
        throw new Error(`${className} not found for ${moduleId}`);
      }

      this.add(loadedModule[className], config, registerAlias);
    });
  }

  /**
   * configure a Config class
   * @param  {function|string} key           The used DI key for the Config
   * @param  {Object}          config        The configuration object
   * @param  {boolen}          registerAlias Register with container (true)
   * @return this
   * @chainable
   */
  add(key, config = {}, registerAlias = true) {
    let currentConfig = this.container.get(key);

    // set default and extend
    currentConfig.reset();
    extendIn(currentConfig, 'current', config);

    // get id
    let id = currentConfig.alias;
    if (!id || this.configs[id]) {
      throw new Error(`Config class alias '${id}' is not a valid unique alias.`);
    }

    // register currentConfig
    this.configs[id] = currentConfig;
    if (registerAlias) {
      this.container.registerAlias(key, id);
    }

    LogManager.getLogger('aurelia-config').info(`Registered and configured config '${id}'.`);

    return this;
  }
}
