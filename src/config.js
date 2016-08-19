import {Homefront} from 'homefront';

/**
 * Config class
 */
export class Config extends Homefront {
  /**
  * Creates an instance of the Config as child from Homefront
  * @param {{}} data The initial config data passed onto Homefront's contructor
  */
  constructor(data: {} = {}) {
    super(data, Homefront.MODE_NESTED);
  }
  /**
   * Get a config segment as in instance of Homefront
   * @param {string} namespace The namespace of the config segment
   * @param {{}} data Data to merge into the config segment
   * @return {Homefront} that The config segment as instance of Homefront
   */
  use(namespace: string, data: {} = {}): Homefront {
    let subConfig = new Homefront(data, Homefront.MODE_NESTED);

    return subConfig.merge(this.fetchOrPut(namespace, data));
  }
}
