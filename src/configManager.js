import * as LogManager from 'aurelia-logging';
import {extendIn} from './baseConfig';

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
   * configure a Config class
   * @param  {function} configConstructor The Config class to add
   * @param  {config}                     The configuration object
   * @param  {boolen} registerAlias       Register with container
   * @return this
   * @chainable
   */
  add(configConstructor, config = {}, registerAlias = true) {
    let currentConfig = this.aurelia.container.get(configConstructor);

    // set default and extend
    currentConfig.reset();
    extendIn(currentConfig, 'current', config || {});

    // get id
    let id = currentConfig.alias;
    if (!id || this.configs[id]) {
      throw new Error(`Class must provide ${id} a unique alias.`);
    }

    // register currentConfig
    this.configs[id] = currentConfig;
    if (registerAlias) {
      this.aurelia.container.registerAlias(configConstructor, id);
    }

    LogManager.getLogger('aurelia-config').info(`Registered and configured config ${id}.`);

    return this;
  }
}
