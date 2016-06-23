import {ConfigManager} from './configManager';

/**
 * Configure aurelia-config
 * @param  {Aurelia} aurelia The aurelia instance
 * @param  {Object|function} configOrConfigure configuration object or a confi function
 * @return {Promise}
 */
export function configure(aurelia, configOrConfigure) {
  let configManager = new ConfigManager(aurelia.container, aurelia.loader);
  aurelia.container.registerInstance(ConfigManager, configManager);

  if (typeof configOrConfigure === 'function') {
    return Promise.resolve(configOrConfigure(configManager));
  }

  return configManager.configure(configOrConfigure);
}
