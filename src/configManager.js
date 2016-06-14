import * as LogManager from 'aurelia-logging';

/**
 * The ConfigManager class
 * Register and retrieve configs
 */
export class ConfigManager {

  /**
   * Registered Config classes
   * @type {Object} map A map of config key vs Config classes
   */
  static map = {};

 /**
   * Register a Config
   * @param  {string}   key    identifier for the Config class
   * @param  {function} Config The Config class to register
   */
  static register(key, Config) {
    if (ConfigManager.map[key] === undefined) {
      ConfigManager.map[key] = Config;

      LogManager.getLogger('aurelia-config').info(`Registered config: ${key}`);
      return;
    }
    LogManager.getLogger('aurelia-config').warn(`ConfigManager: ${key} already registerd`);

    if (ConfigManager.map[key] === Config) {
      LogManager.getLogger('aurelia-config').warn(`ConfigManager: ${key} already registerd`);
      return;
    }

    throw new Error(`ConfigManager.register: ${key} already used for a different type.`);
  }


  /**
   * Configuration function
   * @param  {[Object]}       incomming The configuration object
   * @return {ConfigManager}            itself
   * @chainable
   */
  configure(incomming = {}) {
    return this;
  }

  /**
   * Get the Config instance for 'key'
   * @param  {Container} container The container instance
   * @param  {[string]}  key       The key of the Config. default='global'
   * @return {any}                 The selected Config instance
   */
  getConfig(container, key = 'global') {
    return container.get(ConfigManager.map[key]);
  }
}
