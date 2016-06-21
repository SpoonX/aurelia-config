import {ConfigManager} from './configManager';
import {GlobalConfig} from './globalConfig';
import {BaseConfig, normalizeKey, fetchFrom, setIn, extendIn} from './baseConfig';

/**
 * Configure aurelia-config
 * @param  {Aurelia} aurelia The aurelia instance
 * @param  {Object}  config  The configuration object
 * @return {Promise}
 */
function configure(aurelia, config) {
  let configManager = aurelia.container.get(ConfigManager);
  configManager.aurelia = aurelia;

  return configManager.configure(config);
}

export {
  ConfigManager,
  configure,
  GlobalConfig,
  BaseConfig,
  normalizeKey,
  fetchFrom,
  setIn,
  extendIn
};
