import {BaseConfig} from './baseConfig';

/**
 * GlobalConfig class
 */
export class GlobalConfig extends BaseConfig {
  alias = 'global-config'
  constructor(defaults = {}) {
    super(defaults);
  }
}
