import {resolver} from 'aurelia-dependency-injection';
import {Config} from './config';
import * as LogManager from 'aurelia-logging';

/**
 * Register a Config with aurelia-config
 * @param {string} key The key for this config
 * @return {function} wrapper function to the class
 */
export function configFor(key) {
  return function(target) {
    LogManager.getLogger('aurelia-config').info(`Registered config: ${key} `);
    Config.map[key] = target;
  };
}


/**
 * DoConfig class. A resolver for configs which allows injection of the corresponding registered config into a class
 */
@resolver()
export class GetConfig {

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
    return container.get(Config).getConfig(container, this._key);
  }

  /**
   * Get a new resolver.
   * @param {string}      key The config key (default: 'global')
   * @return {GetConfig}      Resolves to the config for this 'key'
   */
  static of(key = 'global') {
    return new GetConfig(key);
  }
}
