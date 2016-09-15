import {Homefront} from 'homefront';

/**
 * @extends Homefront
 * Config class
 */
export class Config extends Homefront {
  constructor() {
    super();

    this.put('aurelia-config.configure', true);
  }
}
