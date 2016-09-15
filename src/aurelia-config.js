import {FrameworkConfiguration} from 'aurelia-framework';
import {ConfigManager} from './config-manager';
import {Config} from './config';

/**
 * configure function for aurelia-config
 * @param {FrameworkConfiguration} frameworkConfiguration The FrameworkConfiguration instance
 * @param {[string|{}]} plugins Array with plugins to load or function(configManager)
 * @param {...{}} appConfigs List of appConfigs to merge
 * @return {Promise<>}
 */
export function configure(frameworkConfiguration: FrameworkConfiguration, plugins: Array<string|{}>, ...appConfigs): Promise<> {
  let config = frameworkConfiguration.container.get(Config);
  let configManager = new ConfigManager(config, frameworkConfiguration.aurelia.loader);
  frameworkConfiguration.container.registerInstance(ConfigManager, configManager);

  return configManager.mergeDefaultsSynchronous(plugins.concat(appConfigs))
    .then(() => config.fetch('aurelia-config.configure') ? configManager.configurePlugins(frameworkConfiguration, plugins.slice()) : null);
}
