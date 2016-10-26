import {FrameworkConfiguration} from 'aurelia-framework';
import {PluginManager} from './plugin-manager';

/**
 * configure function for aurelia-config
 * @param {FrameworkConfiguration} use The FrameworkConfiguration instance

 * @return {Promise<>}
 */
export function configure(use: FrameworkConfiguration, callback: Function): any {
  let pluginManager = use.container.get(PluginManager);

  return callback((plugins: Array<stringPluginDefinition>, ...appConfigs: {}) => pluginManager.configure(use, plugins, ...appConfigs));
}
