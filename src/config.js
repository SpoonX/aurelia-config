/**
 * The Config class
 */
export class Config {

  /**
   * Registered Configs
   * @type {Object} map A map of config key vs Config contructors
   */
  static map = {global: {}};

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
