import {ConfigManager} from './configManager';
import {GlobalConfig} from './globalConfig';

/**
 * configure aurelia-config
 * @param  {Aurelia}         aurelia           The aurelia instance
 * @param  {function|Object} configOrConfigure The configuration object or function
 * @return {ConfigManager}                     The ConfigManager instance
 */
function configure(aurelia, configOrConfigure) {
  let configManager = aurelia.container.get(ConfigManager);
  configManager.aurelia = aurelia;

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(configManager);
  } else {
    configManager.configure(configOrConfigure);
  }

  return configManager;
}

export {
  ConfigManager,
  configure,
  GlobalConfig
};
