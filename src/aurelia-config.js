import {Aurelia} from 'aurelia-framework';
import {Config} from './config';
import {ConfigManager} from './configManager';

/**
 * configure function for aurelia-config
 * @param {Aurelia} aurelia The aurelia instance
 * @param {{}|Array<string|{name: string, className: string}>|Function)} configureOrConfig The configuration object, array or function
 * @return {Promise<>}
 */
export function configure(aurelia: Aurelia, configureOrConfig?: {}|Array<string|{name: string, className: string}>|Function): Promise<> {
  let config;

  if (typeof configureOrConfig === 'object' && !Array.isArray(configureOrConfig)) {
    // if called with configation object use it to initialze Homefront
    config = aurelia.container.registerInstance(Config, new Config(configureOrConfig || {}));
  } else {
    config = aurelia.container.get(Config);
  }

  let configManager = new ConfigManager(config, aurelia.loader);
  aurelia.container.registerInstance(ConfigManager, configManager);

  if (Array.isArray(configureOrConfig)) {
    return configManager.configure(configureOrConfig);
  } else if (typeof configureOrConfig === 'function') {
    configureOrConfig(config);
  }

  return Promise.resolve();
}
