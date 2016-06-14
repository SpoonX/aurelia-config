import {resolver} from 'aurelia-dependency-injection';
import {ConfigManager} from './configManager';

/**
 * Register a Config with the ConfigManager
 * @param {string} key     The key for this config
 * @return {function}      The wrapper function to the class
 */
export function registerConfig(key) {
  return function(target) {
    ConfigManager.register(key, target);
  };
}


/**
 * DoConfig class. A resolver for configs which allows injection of the corresponding registered config into a class
 */
@resolver()
export class Config {

  /**
   * Construct the resolver with the specified key.
   * @param {string} key
   */
  constructor(key) {
    this._key = key;
  }

  /**
   * Get registered config instance .
   * @param {Container} container The container instance
   * @return {any}                The registered config instance
   */
  get(container) {
    return container.get(ConfigManager).getConfig(container, this._key);
  }

  /**
   * Get a new resolver.
   * @param {string} key The config key (default: 'global')
   * @return {Config}    Resolves to the config for this 'key'
   */
  static of(key = 'global') {
    return new Config(key);
  }
}
