import * as LogManager from 'aurelia-logging';

/**
 * The Config class
 */
export class Config {

  /**
   * Registered Configs
   * @type {Object} map A map of config key vs Config contructors
   */
  static map = {};

 /**
   * Register a Config
   * @param  {string} key identifier for the config
   * @param  {function} configConstructor construtor function for the config
   */
  static register(key, configConstructor) {
    if (Config.map[key] === undefined) {
      Config.map[key] = configConstructor;

      LogManager.getLogger('aurelia-config').info(`Registered config: ${key}`);
      return;
    }

    if (Config.map[key] === configConstructor) {
      LogManager.getLogger('aurelia-config').warn(`Config: ${key} already registerd`);
      return;
    }

    throw new Error(`Config.register: ${key} already used for a different type.`)
  }


  /**
   * Configuration function
   * @param  {[Object]} [incomming] The configuration object
   * @return {Config}               itself
   * @chainable
   */
  configure(incomming = {}) {
    return this;
  }

  /**
   * Get the config instance for 'key'
   * @param  {Container} container The container instance
   * @param  {string}    key       The key of the config
   * @return {any}                 The selected config instance
   */
  getConfig(container, key) {
    return container.get(Config.map[key]);
  }
}
