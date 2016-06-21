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
   * @return {Promise}
   */
  configure(incomming = {plugins: []}) {
    let logger        = LogManager.getLogger('aurelia-config');
    let registerAlias = incomming.registerAlias !== false;

    // regster GlobalConfig
    let globalConfig = this.aurelia.container.get(GlobalConfig);
    globalConfig.reset();
    globalConfig.alias = GLOBAL_CONFIG_ID;
    globalConfig.aliases.push(GLOBAL_CONFIG_ID);
    if (registerAlias) {
      this.aurelia.container.registerAlias(GlobalConfig, GLOBAL_CONFIG_ID);
    }
    this.configs[GLOBAL_CONFIG_ID] = globalConfig;

    if (!Array.isArray(incomming.plugins)) return this;

    // register and merge module Configs
    let loader = [];
    incomming.plugins.forEach(module => {
      if (module.moduleId === GLOBAL_CONFIG_ID) {
        extend(true, globalConfig.current, module.config || {});
        return;
      }

      loader.push(this.aurelia.loader.loadModule(module.moduleId).then(m => {
        let ConfigClassName = module.className ? module.className : 'Config';
        if (ConfigClassName in m) {
          let config = this.aurelia.container.get(m[ConfigClassName]);
          config.reset();
          extend(true, config.current, module.config || {});

          let id = module.alias ? module.alias : `${module.moduleId}-config`;
          config.alias = id;
          if (globalConfig.aliases.indexOf(id) !== -1) {
            throw new Error(`A plugin named ${module.moduleId} was already registered.`);
          }
          globalConfig.aliases.push(id);
          if (registerAlias) {
            this.aurelia.container.registerAlias(m[ConfigClassName], id);
          }

          this.configs[id] = config;

          logger.info(`Registered and configured config for plugin ${module.moduleId}.`);
        }
      }));
    });

    return Promise.all(loader);
  }
}
