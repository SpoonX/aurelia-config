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
   * @param {{key, configObject}}
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
  * Creates an instance of the ConfigManager
  * @param {Container} container The container for the Configs
  * @param {Loader} loader The loader for the Configs
  */
  constructor(container, loader) {
    this.container = container;
    this.loader    = loader;
  }

  /**
   * Has alias registered
   * @param  {string} alias The requested alias
   * @return {boolean} that
   */
  has(alias) {
    return !!this.configs[alias];
  }

  /**
   * Resolves an alias or container key or instance to Config instance
   * @param {function|string|BaseConfig} aliasOrKeyOrInstance The target alias or container key or a BaseConfig instance
   * @return {BaseConfig} that
   */
  get(aliasOrKeyOrInstance) {
    // is registered Config
    if (typeof aliasOrKeyOrInstance === 'string' && !!this.configs[aliasOrKeyOrInstance]) {
      return this.configs[aliasOrKeyOrInstance];
    }

    // is a BaseConfig instance
    if (isConfig(aliasOrKeyOrInstance)) {
      return aliasOrKeyOrInstance;
    }

    // is registered string key from container or resolver
    if (typeof aliasOrKeyOrInstance !== 'string' || this.container.hasResolver(aliasOrKeyOrInstance)) {
      return this.container.get(aliasOrKeyOrInstance);
    }
  }


  /**
   * Add a Config from a BaseConfig or Object
   * @param  {string} alias The unique alias to register under
   * @param  {BaseConfig|Object} config The BaseConfig instance to add
   * @param  {boolean} registerAlias Register with container (true)
   * @return {ConfigManager} itself
   * @chainable
   */
  addInstance(alias, configObject = {}, registerAlias = true) {
    let config = configObject;
    // get id
    let id = assertId('unique', alias, this.configs);

    // in case config isn't a BaseConfig instance, it get's wrapped into one
    if (!isConfig(config)) {
      config = new BaseConfig(configObject);
    }
    if (registerAlias) {
      this.container.registerInstance(id, config);
    }

    // register config
    this.configs[id] = config;

    return this;
  }

  /**
   * Add a Config by key from the container
   * @param  {function|string} key The container key
   * @param  {Object} configObject The configuration object
   * @param  {string} alias The aiias to register under if none is set in config.alias
   * @param  {boolean} registerAlias Register with container (true)
   * @return {ConfigManager} itself
   * @chainable
   */
  addFromContainer(key, configObject = {}, alias, registerAlias = true) {
    let config = this.get(key);
    // get id
    let id = assertId('unique', config.alias || alias, this.configs);

    // extend with configObject or create new BaseConfig with configObject
    if (isConfig(config)) {
      extend(true, config.current, configObject);
      if (registerAlias) {
        this.container.registerAlias(key, id);
      }
    } else {
      config = new BaseConfig(config);
      extend(true, config.current, configObject);
      if (registerAlias) {
        this.container.registerInstance(id, config);
      }
    }

    this.configs[id] = config;

    return this;
  }

  /**
  * Deep copy a Config into another
  * @param {function|string|BaseConfig} targetAliasOrKeyOrInstance The target alias, container key or an instance of BaseConfig
  * @param {function|string|BaseConfig} sourceAliasOrKeyOrInstance The source alias, container key or an instance of BaseConfig
  * @param  {boolean} includeDefaults Also copy defaults
  * @return {ConfigManager} itself
  * @chainable
  */

  copy(targetAliasOrKeyOrInstance, sourceAliasOrKeyOrInstance, includeDefaults = false) {
    let targetConfig = this.get(targetAliasOrKeyOrInstance);
    let sourceConfig = this.get(sourceAliasOrKeyOrInstance);

    if (!isConfig(targetConfig)) {
      throw new TypeError('Target must resolve to type BaseClass');
    }
    let source = isConfig(sourceConfig) ? sourceConfig : {current: sourceConfig, defaults: sourceConfig};

    targetConfig.current = JSON.parse(JSON.stringify(source.current));
    if (includeDefaults) {
      targetConfig.defaults = JSON.parse(JSON.stringify(source.defaults));
    }

    return this;
  }

  /**
  * Deep extend a Config with another
  * @param {function|string|BaseConfig} targetKeyOrInstance The target container key or an instance of BaseConfig
  * @param {function|string|BaseConfig} sourceKeyOrInstance The source container key or an instance of BaseConfig
  * @param  {boolean} includeDefaults Also merge defaults
  * @return {ConfigManager} itself
  * @chainable
  */
  extend(targetAliasOrKeyOrInstance, sourceAliasOrKeyOrInstance, includeDefaults = false) {
    let targetConfig = this.get(targetAliasOrKeyOrInstance);
    let sourceConfig = this.get(sourceAliasOrKeyOrInstance);

    if (!isConfig(targetConfig)) {
      throw new TypeError('Target must resolve to type BaseClass');
    }
    let source = isConfig(sourceConfig) ? sourceConfig : {current: sourceConfig, defaults: sourceConfig};

    extend(true, targetConfig.current, source.current);
    if (includeDefaults) {
      extend(true, targetConfig.defaults, source.defaults);
    }

    return this;
  }

  /**
  * Remove a Config from the ConfigManager
  * @param  {function|string|BaseConfig} aliasOrKeyOrInstance The target alias or container key or an instance of BaseConfig
  * @param  {boolean} removeAlias Also remove container alias (true)
  * @return {ConfigManager} itself
  * @chainable
  */
  remove(aliasOrKeyOrInstance, removeAlias = true) {
    let config = this.get(aliasOrKeyOrInstance);

    // get id
    let id = assertId('exists', config.alias, this.configs);

    // remove config
    delete this.configs[id];
    if (removeAlias) {
      this.container.unregister(id);
    }

    LogManager.getLogger('aurelia-config').info(`Removed config '${id}'.`);

    return this;
  }

  /**
   * Load a Config from a plugin by moduleId
   * @param  {string} moduleId,The module to load fron
   * @param  {Object} configObject The config to merge into load Config
   * @param  {string} className The class to load as Config (default = 'Config)')
   * @param  {boolean} registerAlias:Register the aliases with the container (default=true)
   * @return {Promise<>}
   */
  load(moduleId, configObject = {}, className = 'Config', registerAlias = true) {
    // todo: make XYZConfig the default class and x-y-z the default alias
    return this.loader.loadModule(moduleId).then(loadedModule => {
      if (!className in loadedModule) {
        throw new Error(`${className} not found for ${moduleId}`);
      }
      this.addFromContainer(loadedModule[className], configObject, `${moduleId}-config`, registerAlias);

      LogManager.getLogger('aurelia-config').info(`Loaded ${className} from '${moduleId}'.`);
    });
  }

  /**
   * Configure with a list of plugins and configs
   * @param {{plugins, configs, globalConfig, registerAlias}} plugins: [{moduleId, configObject, className}], configs: {key, configObject}, globalConfig: configObject, registerAlias: boolean
   * @return {Promise<>}
   */
  configure({plugins, configs, globalConfig, registerAlias}) {
    let promise;

    // register and merge plugin Configs
    let moduleLoaders = [];
    (plugins || []).forEach(plugin => {
      moduleLoaders.push(this.load(plugin.moduleId, plugin.config, plugin.className, registerAlias));
    });
    promise = Promise.all(moduleLoaders);

    // register config objects
    promise.then(()=>{
      // add config objects
      (configs || []).forEach(row => {
        if (typeof row.key === 'string' && !this.container.hasResolver(row.key)) {
          this.addInstance(row.key, row.config);
        } else {
          this.addFromContainer(row.key, row.config);
        }
      });

      // add global config
      this.addFromContainer(GlobalConfig, globalConfig, 'global-config', registerAlias);
    });

    return promise;
  }
}

function assertId(type, id, map) {
  if (!id || (map && type === 'exists' && !map[id])) {
    throw new Error(`Config class alias '${id}' is not a valid alias.`);
  } else if (map && type === 'unique' && map[id]) {
    throw new Error(`Config class alias '${id}' is not a unique alias.`);
  }
  return id;
}

function isConfig(instance) {
  return instance instanceof BaseConfig;
}
