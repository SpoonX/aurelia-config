import {Homefront} from 'homefront';
import {inject,Container,resolver} from 'aurelia-dependency-injection';
import {FrameworkConfiguration} from 'aurelia-framework';

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
