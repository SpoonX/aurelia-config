import {Config} from './config';
import {inject} from 'aurelia-dependency-injection';
import {FrameworkConfiguration} from 'aurelia-framework';

/**
 * The PluginDefinition interface
 *
 * @export
 * @interface PluginDefinition
 */
interface PluginDefinition {
  /**
   * The moduleId as used by aurelia
   *
   * @type {string}
   * @memberOf PluginDefinition
   */
  moduleId: string;
  /**
   * Namespaced config of this plugin
   *
   * @type {{}}
   * @memberOf PluginDefinition
   */
  config?: {};
  /**
   * Determines whether to call the plugins configure with the plugin's namespace segment (default) ot with the root config data.
   *
   * @type {boolean}
   * @memberOf PluginDefinition
   */
  rootConfig?: boolean;
}

/**
 * The PluginManager class
 *
 * @export
 * @class PluginManager
 */
@inject(Config)
export class PluginManager {
  /**
   *
   *
   * @type {Config}
   * @memberOf PluginManager
   */
  config: Config;

  /**
   * Creates an instance of PluginManager.
   *
   * @param {Config} config
   *
   * @memberOf PluginManager
   */
  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Calls the handler on the normalized plugin definition
   *
   * @param {(Array<string|PluginDefinition>)} plugins
   * @param {Function} handler
   *
   * @memberOf PluginManager
   */
  normalized(plugins: Array<string|PluginDefinition>, handler: Function) {
    plugins.forEach(pluginDefinition => {
      pluginDefinition = pluginDefinition || {};

      if (typeof pluginDefinition === 'string') {
        pluginDefinition = {moduleId: pluginDefinition};
      }

      // this config object reference is kept through all the merging
      if (typeof pluginDefinition.config === 'undefined') {
        pluginDefinition.config = {};
      }

      handler(pluginDefinition);
    });
  }

  /**
   * Loads and merges exported configs and registered the plugins
   *
   * @param {FrameworkConfiguration} use
   * @param {(Array<string|PluginDefinition>)} plugins
   * @param {...Array<{}>} appConfigs
   * @returns {Promise<any>}
   *
   * @memberOf PluginManager
   */
  configure(use: FrameworkConfiguration, plugins: Array<string|PluginDefinition>, ...appConfigs: Array<{}>): Promise<any> {
    let loadConfigs   = [];
    let pluginConfigs = [];

    // to load module async and store module.config in plugin.config (can be undefined)
    let loadConfig = plugin => use.aurelia.loader.loadModule(plugin.moduleId)
      .then(module => Config.merge(plugin.config, module.config));

    // create arrays with the config loaders and config references, and register the plugin
    this.normalized(plugins, plugin => {
      // push the config loader promises
      loadConfigs.push(loadConfig(plugin));

      // push the plugin.config refrences
      pluginConfigs.push(plugin.config);

      // create namespace reference if needed
      this.config.fetchOrPut(plugin.moduleId, {});

      // since it registers with a config reference, we can register plugins here. They will then be configured by Aurelia itself later in that order.
      use.plugin(plugin.moduleId, plugin.rootConfig ? this.config.data : this.config.data[plugin.moduleId]);
    });

    // load plugin configs, then merges plugin configs and app configs in the right order.
    return Promise.all(loadConfigs).then(() => this.config.merge(pluginConfigs.concat(appConfigs)));
  }
}
