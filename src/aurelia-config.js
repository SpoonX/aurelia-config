import * as LogManager from 'aurelia-logging';
import {ConfigManager} from './configManager';
import {GlobalConfig} from './globalConfig';
import {BaseConfig, normalizeKey, fetchFrom, setIn, extendIn} from './baseConfig';

/**
 * Configure aurelia-config
 * @param  {Aurelia} aurelia   The aurelia instance
 * @param  {plugins: Arrray, registerAlias: boolean} plugins: Array of plugins cnfigs,  registerAlias: register configs with container (default: true)
 * @return {Promise}
 */
function configure(aurelia, {plugins, registerAlias} = {registerAlias: true}) {
  let configManager = aurelia.container.get(ConfigManager);
  configManager.aurelia = aurelia;

  // add globalConfig, don't add alias to container yet
  configManager.add(GlobalConfig, {}, false);

  if (!Array.isArray(plugins)) return Promise.resolve();

  let loaders = [];
  let globalConfig = configManager.configs['global-config'];

  // register and merge Configs
  plugins.forEach(plugin => {
    // extend global config
    if (plugin.moduleId === globalConfig.alias) {
      extendIn(globalConfig, 'current', plugin.config || {});
      if (registerAlias !== false) {
        aurelia.container.registerAlias(GlobalConfig, globalConfig.alias);
      }
      return;
    }

    // load plugin files and extend module configs
    loaders.push(aurelia.loader.loadModule(plugin.moduleId).then(loadedModule => {
      let ConfigClassName = plugin.className ? plugin.className : 'Config';

      if (ConfigClassName in loadedModule) {
        configManager.add(loadedModule[ConfigClassName], plugin.config, registerAlias);
      } else {
        LogManager.getLogger('aurelia-config').warn(`${ConfigClassName} not found for ${plugin.moduleId}`);
      }
    }));
  });

  return Promise.all(loaders);
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
