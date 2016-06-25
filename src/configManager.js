import * as LogManager from 'aurelia-logging';
import extend from 'extend';
import {BaseConfig} from './baseConfig';
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
   * Load a plugin by moduleId and merge config
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
   * @param  {function|string|BaseConfig} keyOrInstance The target DI key or an instance of BaseConfig
   * @param  {Object}                    config        The configuration object
   * @param  {boolen}                    registerAlias Register with container (true)
   * @return {ConfigManager}                           itself
   * @chainable
   */
  add(keyOrInstance, configObject = {}, registerAlias = true) {
    let config = keyOrInstance instanceof BaseConfig
                ? keyOrInstance
                : this.container.get(keyOrInstance);

    // get id
    let id = assertId(config.alias, this.configs, 'unique');

    // set default and extend
    config.reset();
    extend(true, config.current, configObject);

    // register config
    this.configs[id] = config;
    if (registerAlias) {
      if (keyOrInstance instanceof BaseConfig) {
        this.container.registerInstance(keyOrInstance, id);
      } else {
        this.container.registerAlias(keyOrInstance, id);
      }
    }

    LogManager.getLogger('aurelia-config').info(`Registered and configured config '${id}'.`);

    return this;
  }

  /**
  * Deep copy a Config into another
  * @param  {function|string|BaseConfig} targetKeyOrInstance The target DI key or an instance of BaseConfig
  * @param  {function|string|BaseConfig} sourceKeyOrInstance The source DI key or an instance of BaseConfig
  * @param  {boolen}                    includeDefaults     Also copy defaults
  * @return {ConfigManager}                                 itself
  * @chainable
  */

  copy(targetKeyOrInstance, sourceKeyOrInstance, includeDefaults) {
    let targetConfig = targetKeyOrInstance instanceof BaseConfig
                    ? targetKeyOrInstance
                    : this.container.get(targetKeyOrInstance);
    let sourceConfig = sourceKeyOrInstance instanceof BaseConfig
                    ? sourceKeyOrInstance
                    : this.container.get(sourceKeyOrInstance);


    // set default and extend
    targetConfig.current = JSON.parse(JSON.stringify(sourceConfig.current));
    if (includeDefaults) {
      targetConfig.defaults = JSON.parse(JSON.stringify(sourceConfig.defaults));
    }

    return this;
  }

  /**
  * Deep extend a Config with another
  * @param  {function|string|BaseConfig} targetKeyOrInstance The target DI key or an instance of BaseConfig
  * @param  {function|string|BaseConfig} sourceKeyOrInstance The source DI key or an instance of BaseConfig
  * @param  {boolen}                    includeDefaults     Also merge defaults
  * @return {ConfigManager}                                 itself
  * @chainable
  */
  extend(targetKeyOrInstance, sourceKeyOrInstance, includeDefaults) {
    let targetConfig = targetKeyOrInstance instanceof BaseConfig
                    ? targetKeyOrInstance
                    : this.container.get(targetKeyOrInstance);
    let sourceConfig = sourceKeyOrInstance instanceof BaseConfig
                    ? sourceKeyOrInstance
                    : this.container.get(sourceKeyOrInstance);

    // set default and extend
    extend(true, targetConfig.current, sourceConfig.current);
    if (includeDefaults) {
      extend(true, targetConfig.defaults, sourceConfig.defaults);
    }

    return this;
  }

  /**
  * Remove a Config from the ConfigManager
  * @param  {function|string|BaseConfig} keyOrInstance The target DI key or an instance of BaseConfig
  * @param  {boolen}                    removeAlias   Also remove DI alias (true)
  * @return {ConfigManager}                           itself
  * @chainable
  */
  remove(keyOrInstance, removeAlias = true) {
    let config = keyOrInstance instanceof BaseConfig
                ? keyOrInstance
                : this.container.get(keyOrInstance);

    // get id
    let id = assertId(config.alias, this.configs, 'exists');

    // remove config
    delete this.configs[id];
    if (removeAlias) {
      this.container.unregister(id);
    }

    LogManager.getLogger('aurelia-config').info(`Removed config '${id}'.`);

    return this;
  }
}

function assertId(id, map, option) {
  if (!id || (map && option === 'exists' && !map[id])) {
    throw new Error(`Config class alias '${id}' is not a valid alias.`);
  } else if (map && option === 'unique' && map[id]) {
    throw new Error(`Config class alias '${id}' is not a unique alias.`);
  }
  return id;
}
