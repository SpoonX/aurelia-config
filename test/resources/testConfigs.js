import {BaseConfig} from '../../src/baseConfig';

export class Config extends BaseConfig {
  alias = 'plugin-config'

  constructor() {
    super({key: 'value'});
  }
}

export class OtherConfig extends BaseConfig {
  //alias = 'other-config'

  constructor() {
    super({key: 'other-value'});
  }
}

export class CustomConfig {
  customKey = 'custom-value'
}

export class FaultyConfig extends BaseConfig {
}
