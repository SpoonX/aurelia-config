import {Config} from './config';
import {Loader} from 'aurelia-loader';
import {inject} from 'aurelia-dependency-injection';
import {FrameworkConfiguration} from 'aurelia-framework';

/**
 * The ConfigManager class
 * Loads and merges configs
 */
@inject(Config, Loader)
export class ConfigManager {
  /**
  * The config instance
  * @param {Config}
   */
  config: Config;

  /**
  * The Config loader
  * @param {Loader}
   */
  loader: Loader;

  /**
  * Creates an instance of the ConfigManager
  * @param {Config} config The Config instance to load into
  * @param {Loader} loader The loader for the Configs
  */
  constructor(config: Config, loader: Loader) {
    this.config = config;
    this.loader = loader;
  }

  /**
   * Load a defaults function or object from a plugin by plugin
   * @param  {string} plugin The module to load from
   * @param  {string} defaults The name of object or function to load
   * @return {Promise<{}|function>}
   */
  loadDefaults(plugin: string, defaults: string): Promise<> {
    return this.loader.loadModule(plugin).then(loadedModule => {
      if (!(defaults in loadedModule)) {
        throw new Error(`${defaults} not found for ${plugin}`);
      }

      return loadedModule[defaults];
    });
  }

  /**
   * Load and merge a plugin default
   * @param {string|{plugin: string, defaults?: string, alias?: string, rootConfig?: boolean}|{}} plugin The plugin, {plugin, defaults?, alias?, rootConfig?} or object
   * @return {Promise<Homefront>}
   */
  mergeDefault(plugin: string|{}): Promise<Homefront> {
    let load = () => Promise.resolve(null);

    if (typeof plugin === 'object' && plugin.plugin && plugin.defaults) {
      load = () => this.loadDefaults(plugin.plugin, plugin.defaults)
        .then(defaults => plugin.rootConfig ? defaults : {[plugin.alias || plugin.plugin]: defaults});
    } else if (typeof plugin === 'object' && !plugin.plugin) {
      load = () => Promise.resolve(plugin);
    }

    return load().then(defaults => this.config.merge(defaults));
  }

  /**
   * Load and merge plugin defaults sequentially
   * @param {[string|{plugin: string, defaults?: string, alias?: string, rootConfig?: boolean}|{}]} pluginsOrConfigs Array of plugins, {plugin, defaults?, alias?, rootConfig?} or objects
   * @return {Promise<Homefront>}
   */
  mergeDefaultsSynchronous(pluginsOrConfigs: Array<string|{}>): Promise<Homefront> {
    if (pluginsOrConfigs.length === 0) {
      return Promise.resolve(this.config);
    }

    let plugin = pluginsOrConfigs.shift();

    return this.mergeDefault(plugin).then(() => this.mergeDefaultsSynchronous(pluginsOrConfigs));
  }

  /**
   * Sequentially load plugins configure function and call with this.config.data
   * @param {Aurelia} aurelia The Aurelia instance
   * @param {[string|{plugin: string, defaults?: string, alias?: string, rootConfig: boolean, configure: boolean}|{}]} plugins Array of plugins, {plugin, defaults?, alias?, rootConfig?, configure?} or objects. Objects will be ignored
   * @return {Promise<>}
   */
  configurePlugins(frameworkConfiguration: FrameworkConfiguration, plugins: Array<string|{}>): Promise<> {
    if (plugins.length === 0) {
      return Promise.resolve();
    }

    let plugin    = plugins.shift();
    let configure = () => {};

    if (typeof plugin === 'string') {
      configure = () => frameworkConfiguration.plugin(plugin, this.config.data[plugin]);
    } else if (typeof plugin === 'object' && plugin.plugin && plugin.configure !== false) {
      configure = () => frameworkConfiguration.plugin(plugin.plugin, plugin.rootConfig ? this.config.data : this.config.data[plugin.alias || plugin.plugin]);
    }

    return Promise.resolve(configure()).then(() => this.configurePlugins(frameworkConfiguration, plugins));
  }
}
