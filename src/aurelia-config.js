import {ConfigManager} from './configManager';
import {GlobalConfig} from './globalConfig';
import {BaseConfig, normalizeKey} from './baseConfig';

/**
 * configure aurelia-config
 * @param  {Aurelia}         aurelia           The aurelia instance
 * @param  {function|Object} configOrConfigure The configuration object or function
 * @return {Promise}
 */
function configure(aurelia, configOrConfigure) {
  let configManager = aurelia.container.get(ConfigManager);
  configManager.aurelia = aurelia;

  if (typeof configOrConfigure === 'function') {
    return configOrConfigure(configManager);
  }
  return configManager.configure(configOrConfigure);
}

export {
  ConfigManager,
  configure,
  GlobalConfig,
  BaseConfig,
  normalizeKey
};
