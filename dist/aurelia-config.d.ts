import * as LogManager from 'aurelia-logging';
import {Homefront} from 'homefront';
import {Loader} from 'aurelia-loader';
import {Container,resolver} from 'aurelia-dependency-injection';
import {Aurelia} from 'aurelia-framework';

/**
 * Config class
 */
export declare class Config extends Homefront {
  
  /**
    * Creates an instance of the Config as child from Homefront
    * @param {{}} data The initial config data passed onto Homefront's contructor
    */
  constructor(data?: {});
  
  /**
     * Get a config segment as in instance of Homefront
     * @param {string} namespace The namespace of the config segment
     * @param {{}} data Data to merge into the config segment
     * @return {Homefront} that The config segment as instance of Homefront
     */
  use(namespace: string, data?: {}): Homefront;
}

/**
 * The ConfigManager class
 * Loads and merges configs
 */
export declare class ConfigManager {
  
  /**
    * The config instance
    * @param {Config}
     */
  config: Config;
  
  /**
    * The container for the configs
    * @param {Container}
     */
  container: Container;
  
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
  constructor(config: Config, loader: Loader);
  
  /**
     * Load a Config from a plugin by moduleId
     * @param  {string} name,The module to load fron
     * @param  {string} configName The class to load as Config (default = 'Config)')
     * @return {Promise<>}
     */
  load(config: string | { name: string, configName: string }): Promise<>;
  
  /**
     * Configure with an array of moduleIds and confi objects or file names
     * @param {[moduleId|{name: 'moduleId', configName: 'configName'}]} pluginsOrConfigs
     * @return {Promise<>}
     */
  configure(pluginsOrConfigs?: Array<string | { name: string, configName: string }>): Promise<>;
}

/**
 * Configuration class. A resolver for config namespaces which allows injection of the corresponding config segement into a class
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
     * @param {Container} container The container
     *
     * @return {Homefront}
     */
  get(container: Container): Homefront;
  
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
 * configure function for aurelia-config
 * @param {Aurelia} aurelia The aurelia instance
 * @param {{}|Array<string|{name: string, className: string}>|Function)} configureOrConfig The configuration object, array or function
 * @return {Promise<>}
 */
export declare function configure(aurelia: Aurelia, configureOrConfig?: {} | Array<string | { name: string, className: string }> | Function): Promise<>;