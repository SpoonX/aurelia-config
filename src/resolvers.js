import {Container, resolver} from 'aurelia-dependency-injection';
import {Config} from './config';
import {Homefront} from 'homefront';

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
   * @param {boolean} _asHomefront  Inject as instance of Homefront or as plain object
   */
  _asHomefront: boolean;

  /**
   * Construct the resolver with the specified namespace.
   *
   * @param {string} namespace
   */
  constructor(namespace: string, asHomefront: boolean = false) {
    this._namespace   = namespace;
    this._asHomefront = asHomefront;
  }

  /**
   * Resolve for namespace.
   *
   * @param {Container} container The container
   *
   * @return {Homefront}
   */
  get(container: Container): {}|Homefront {
    return (this._asHomefront
            ? container.get(Config).use(this._namespace)
            : container.get(Config).fetch(this._namespace));
  }

  /**
   * Get a new resolver for `namespace`.
   *
   * @param {string} namespace The namespace
   *
   * @return {Configuration}  Resolves to the config segement of the namespace
   */
  static of(namespace: string, asHomefront: boolean): Configuration {
    return new Configuration(namespace, asHomefront);
  }
}
