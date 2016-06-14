import {ConfigManager} from './configManager';
import {registerConfig, ConfigResolver} from './decorators';
import {GlobalConfig} from './globalConfig';

/**
 * configure aurelia-config
 * @param  {Aurelia}         aurelia           The aurelia instance
 * @param  {function|Object} configOrConfigure The configuration object or function
 * @return {ConfigManager}                     The ConfigManager instance
 */
function configure(aurelia, configOrConfigure) {
  let configManager = aurelia.container.get(ConfigManager);

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(configManager);
  } else {
    configManager.configure(configOrConfigure);
  }

  // get GlobalConfig initialzed and registered
  aurelia.container.get(GlobalConfig);

  return configManager;
}

export {
  ConfigManager,
  configure,
  registerConfig,
  ConfigResolver,
  GlobalConfig
};
