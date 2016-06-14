import {resolver} from 'aurelia-dependency-injection';
import {ConfigManager} from './configManager';

/**
 * Register a Config with the ConfigManager
 * @param {string} key     The key for a Config class
 * @return {function}      The wrapper function to the class
 */
export function registerConfig(key) {
  return function(target) {
    ConfigManager.register(key, target);
  };
}


/**
 * ConfigResolver class.
 * A resolver for Config classes which allows injection of the corresponding
 * registered Config instance into a class
 */
@resolver()
export class ConfigResolver {

  /**
   * Construct the resolver with the specified key.
   * @param {string} key
   */
  constructor(key) {
    this._key = key;
  }

  /**
   * Get registered Config instance .
   * @param {Container} container The container instance
   * @return {any}                The registered Config instance
   */
  get(container) {
    return container.get(ConfigManager).getConfig(container, this._key);
  }

  /**
   * Get a new resolver.
   * @param {string}          key The Config class key (default: 'global')
   * @return {ConfigResolver}     Resolves to the Config for this 'key'
   */
  static of(key = 'global') {
    return new ConfigResolver(key);
  }
}
