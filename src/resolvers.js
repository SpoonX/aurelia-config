import {Container, resolver} from 'aurelia-dependency-injection';
import {Config} from './config';

/**
 * Configuration class. A resolver for config namespaces which allows injection of the corresponding config segement into a class
 */
@resolver()
export class Configuration {
  /**
   * @param {string} _namespace  The namespace
   */
  _namespace: string;

  /**
   * Construct the resolver with the specified namespace.
   *
   * @param {string} namespace
   */
  constructor(namespace: string) {
    this._namespace   = namespace;
  }

  /**
   * Resolve for namespace.
   *
   * @param {Container} container The container
   *
   * @return {}
   */
  get(container: Container): {} {
    return container.get(Config).fetch(this._namespace);
  }

  /**
   * Get a new resolver for `namespace`.
   *
   * @param {string} namespace The namespace
   *
   * @return {Configuration}  Resolves to the config segement of the namespace
   */
  static of(namespace: string): Configuration {
    return new Configuration(namespace);
  }
}
