import {BaseConfig} from '../../src/baseConfig';

export class Config extends BaseConfig {
  alias = 'plugin-config';
  defaults = { key: 'value'};
}

export class OtherConfig extends BaseConfig {
  alias = 'other-config';
  defaults = {key: 'value'};
}

export class FaultyConfig extends BaseConfig {
}
