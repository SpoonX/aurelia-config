import * as LogManager from 'aurelia-logging';
import extend from 'extend';
import {GlobalConfig} from './globalConfig';

export const GLOBAL_CONFIG_ID = 'global-config';

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
   * Configuration function
   * @param  {[Object]}       incomming The configuration object
   * @return {ConfigManager}            itself
   * @chainable
   */
  configure(incomming = {plugins: []}) {
    let logger        = LogManager.getLogger('aurelia-config');
    let registerAlias = incomming.registerAlias !== false;

    // regster GlobalConfig
    this.configs[GLOBAL_CONFIG_ID] = this.aurelia.container.get(GlobalConfig);
    if (registerAlias) {
      this.aurelia.container.registerAlias(GlobalConfig, GLOBAL_CONFIG_ID);
    }

    if (!Array.isArray(incomming.plugins)) return this;

    // register and merge module Configs
    incomming.plugins.forEach(module => {
      if (module.moduleId === GLOBAL_CONFIG_ID) {
        extend(true, this.configs[GLOBAL_CONFIG_ID], module.config || {});
        return;
      }
      this.aurelia.loader.loadModule(module.moduleId).then(m => {
        if ('Config' in m) {
          let config = this.aurelia.container.get(m.Config);
          let id     = module.alias ? module.alias : `${module.moduleId}-config`;

          this.configs[id] = extend(true, config, module.config || {});
          if (registerAlias) {
            this.aurelia.container.registerAlias(m.Config, id);
          }

          logger.info(`Registered and configured config for plugin ${module.moduleId}.`);
        }
      });
    });

    return this;
  }
}
