import {configFor} from '../../src/decorators';
import {Config} from '../../src/config';

@configFor('inject-test')
export class TestConfig {
  key = 'value';
}


export class TestManualConfig {
  key = 'value';

  constructor() {
    Config.register('manual', TestManualConfig);
  }
}
