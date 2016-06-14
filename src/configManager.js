import * as LogManager from 'aurelia-logging';

/**
 * The ConfigManager class
 * Register and retrieve configs
 */
export class ConfigManager {

  /**
   * Registered Configs
   * @type {Object} map A map of config key vs Config contructors
   */
  static map = {};

 /**
   * Register a Config
   * @param  {string}   key               identifier for the config
   * @param  {function} configConstructor construtor function for the config
   */
  static register(key, configConstructor) {
    if (ConfigManager.map[key] === undefined) {
      ConfigManager.map[key] = configConstructor;

      LogManager.getLogger('aurelia-config').info(`Registered config: ${key}`);
      return;
    }
    LogManager.getLogger('aurelia-config').warn(`ConfigManager: ${key} already registerd`);

    if (ConfigManager.map[key] === configConstructor) {
      LogManager.getLogger('aurelia-config').warn(`ConfigManager: ${key} already registerd`);
      return;
    }

    throw new Error(`ConfigManager.register: ${key} already used for a different type.`);
  }


  /**
   * Configuration function
   * @param  {[Object]} incomming The configuration object
   * @return {ConfigManager}   itself
   * @chainable
   */
  configure(incomming = {}) {
    return this;
  }

  /**
   * Get the config instance for 'key'
   * @param  {Container} container The container instance
   * @param  {[string]}  key       The key of the config. default='global'
   * @return {any}                 The selected config instance
   */
  getConfig(container, key = 'global') {
    return container.get(ConfigManager.map[key]);
  }
}
