import {registerConfig} from '../../src/decorators';
import {ConfigManager} from '../../src/configManager';

@registerConfig('inject-test')
export class TestConfig {
  key = 'value';
}


export class TestManualConfig {
  key = 'value';

  constructor() {
    ConfigManager.register('manual', TestManualConfig);
  }
}
