import * as LogManager from 'aurelia-logging';
import {Config} from './config';
import {Loader} from 'aurelia-loader';
import {Container} from 'aurelia-dependency-injection';

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
