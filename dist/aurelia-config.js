import * as LogManager from 'aurelia-logging';
import {Homefront} from 'homefront';
import {Loader} from 'aurelia-loader';
import {Container,resolver} from 'aurelia-dependency-injection';
import {Aurelia} from 'aurelia-framework';

/**
 * Config class
 */
export class Config extends Homefront {
  /**
  * Creates an instance of the Config as child from Homefront
  * @param {{}} data The initial config data passed onto Homefront's contructor
  */
  constructor(data: {} = {}) {
    super(data, Homefront.MODE_NESTED);
  }
  /**
   * Get a config segment as in instance of Homefront
   * @param {string} namespace The namespace of the config segment
   * @param {{}} data Data to merge into the config segment
   * @return {Homefront} that The config segment as instance of Homefront
   */
  use(namespace: string, data: {} = {}): Homefront {
    let subConfig = new Homefront(data, Homefront.MODE_NESTED);

    return subConfig.merge(this.fetchOrPut(namespace, data));
  }
}

/**
 * The ConfigManager class
 * Loads and merges configs
 */
export class ConfigManager {
  /**
  * The config instance
  * @param {Config}
   */
  config: Config;

  /**
  * The container for the configs
  * @param {Container}
   */
  container: Container;

  /**
  * The Config loader
  * @param {Loader}
   */
  loader: Loader;

  /**
  * Creates an instance of the ConfigManager
  * @param {Config} config The Config instance to load into
  * @param {Loader} loader The loader for the Configs
  */
  constructor(config: Config, loader: Loader) {
    this.config    = config;
    this.loader    = loader;
  }

  /**
   * Load a Config from a plugin by moduleId
   * @param  {string} name,The module to load fron
   * @param  {string} configName The class to load as Config (default = 'Config)')
   * @return {Promise<>}
   */
  load(config: string|{name: string, configName: string}): Promise<> {
    let configName = 'config';
    let name = config;

    if (typeof config === 'object') {
      if (config.name && config.configName) {
        name = config.name;
        configName = config.configName;
      } else {
        return new Promise(resolve => {
          this.config.merge(config);

          resolve();
        });
      }
    }

    return this.loader.loadModule(name).then(loadedModule => {
      if (!configName in loadedModule) {
        throw new Error(`${configName} not found for ${name}`);
      }

      this.config.merge(loadedModule[configName]);

      LogManager.getLogger('aurelia-config').info(`Loaded ${configName} from '${name}'.`);

      return Promise.resolve();
    });
  }

  /**
   * Configure with an array of moduleIds and confi objects or file names
   * @param {[moduleId|{name: 'moduleId', configName: 'configName'}]} pluginsOrConfigs
   * @return {Promise<>}
   */
  configure(pluginsOrConfigs: Array<string|{name: string, configName: string}> = []): Promise<> {
    let pluginOrConfig = pluginsOrConfigs.shift();

    return this.load(pluginOrConfig).then(() => {
      if (pluginsOrConfigs.length > 0) {
        return this.configure(pluginsOrConfigs);
      }

      return Promise.resolve();
    });
  }
}

/**
 * Configuration class. A resolver for config namespaces which allows injection of the corresponding config segement into a class
 */
@resolver()
export class Configuration {
  /**
   * @param {string} _namespace  The namespace
   */
  _namespace: string;

  /**
   * Construct the resolver with the specified namespace.
   *
   * @param {string} namespace
   */
  constructor(namespace: string) {
    this._namespace = namespace;
  }

  /**
   * Resolve for namespace.
   *
   * @param {Container} container The container
   *
   * @return {Homefront}
   */
  get(container: Container): Homefront {
    return container.get(Config).use(this._namespace);
  }

  /**
   * Get a new resolver for `namespace`.
   *
   * @param {string} namespace The namespace
   *
   * @return {Configuration}  Resolves to the config segement of the namespace
   */
  static of(namespace: string): Configuration {
    return new Configuration(namespace);
  }
}

/**
 * configure function for aurelia-config
 * @param {Aurelia} aurelia The aurelia instance
 * @param {{}|Array<string|{name: string, className: string}>|Function)} configureOrConfig The configuration object, array or function
 * @return {Promise<>}
 */
export function configure(aurelia: Aurelia, configureOrConfig?: {}|Array<string|{name: string, className: string}>|Function): Promise<> {
  let config;

  if (typeof configureOrConfig === 'object' && !Array.isArray(configureOrConfig)) {
    // if called with configation object use it to initialze Homefront
    config = aurelia.container.registerInstance(Config, new Config(configureOrConfig || {}));
  } else {
    config = aurelia.container.get(Config);
  }

  let configManager = new ConfigManager(config, aurelia.loader);
  aurelia.container.registerInstance(ConfigManager, configManager);

  if (Array.isArray(configureOrConfig)) {
    return configManager.configure(configureOrConfig);
  } else if (typeof configureOrConfig === 'function') {
    configureOrConfig(config);
  }

  return Promise.resolve();
}
