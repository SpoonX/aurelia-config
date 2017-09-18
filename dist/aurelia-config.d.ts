import {Homefront} from 'homefront';
import {Container,resolver,inject} from 'aurelia-dependency-injection';
import {FrameworkConfiguration} from 'aurelia-framework';

/**
 * The PluginDefinition interface
 *
 * @export
 * @interface PluginDefinition
 */
export declare interface PluginDefinition {
  
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
 * The Config class
 *
 * @export
 * @class Config
 * @extends {Homefront}
 *
 * @see https://github.com/spoonx/homefront
 */
export declare class Config extends Homefront {

}

/**
 * Configuration class. A resolver for config namespaces which allows injection of the corresponding config segement into a class
 * @export
 * @class Configuration
*/
export declare class Configuration {
  
  /**
     * Construct the resolver with the specified namespace.
     *
     * @param {string} namespace
     */
  constructor(namespace: string);
  
  /**
     * Resolve for namespace.
     *
     * @param {Container} container
     * @return {{}}
     *
     * @memberOf Configuration
     */
  get(container: Container): {};
  
  /**
     * Get a new resolver for `namespace`.
     *
     * @param {string} namespace The namespace
     *
     * @return {Configuration}  Resolves to the config segement of the namespace
     */
  static of(namespace: string): Configuration;
}

/**
 * The PluginManager class
 *
 * @export
 * @class PluginManager
 */

/**
 * The PluginManager class
 *
 * @export
 * @class PluginManager
 */
export declare class PluginManager {
  
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
  constructor(config: Config);
  
  /**
     * Calls the handler on the normalized plugin definition
     *
     * @param {(Array<string|PluginDefinition>)} plugins
     * @param {Function} handler
     *
     * @memberOf PluginManager
     */
  normalized(plugins: Array<string | PluginDefinition>, handler: Function): any;
  
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
  configure(use: FrameworkConfiguration, plugins: Array<string | PluginDefinition>, ...appConfigs: Array<{}>): Promise<any>;
}
export declare function configure(use: FrameworkConfiguration, callback: Function): any;