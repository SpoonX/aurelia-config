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
   * @param  {[Object]} incomming The configuration object
   * @return {Promise}
   */
  configure(incomming = {plugins: []}) {
    let logger        = LogManager.getLogger('aurelia-config');
    let registerAlias = incomming.registerAlias !== false;

    // regster GlobalConfig
    let globalConfig = this.aurelia.container.get(GlobalConfig);
    // set default and extend
    globalConfig.reset();
    globalConfig.alias = GLOBAL_CONFIG_ID;
    // register config
    this.configs[GLOBAL_CONFIG_ID] = globalConfig;
    if (registerAlias) {
      this.aurelia.container.registerAlias(GlobalConfig, GLOBAL_CONFIG_ID);
    }

    if (!Array.isArray(incomming.plugins)) return Promise.resolve();

    // register and merge module Configs
    let loader = [];
    incomming.plugins.forEach(module => {
      // extend global config
      if (module.moduleId === GLOBAL_CONFIG_ID) {
        extend(true, globalConfig.current, module.config || {});
        return;
      }

      // load and extend module configs and collect load promises
      loader.push(this.aurelia.loader.loadModule(module.moduleId).then(loadedModule => {
        let ConfigClassName = module.className ? module.className : 'Config';
        if (ConfigClassName in loadedModule) {
          let config = this.aurelia.container.get(loadedModule[ConfigClassName]);
          // set default and extend
          config.reset();
          extend(true, config.current, module.config || {});
          // get id
          let id = module.alias ? module.alias : `${module.moduleId}-config`;
          if (this.configs[id]) {
            throw new Error(`A plugin named ${id} was already registered.`);
          }
          config.alias = id;
          // register config
          this.configs[id] = config;
          if (registerAlias) {
            this.aurelia.container.registerAlias(loadedModule[ConfigClassName], id);
          }

          logger.info(`Registered and configured config for plugin ${module.moduleId}.`);
        }
      }));
    });

    return Promise.all(loader);
  }
}
