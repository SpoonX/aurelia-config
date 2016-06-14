import {Config} from '../src/aurelia-config';
import {TestManualConfig} from './resources/testConfig';
import {Container} from 'aurelia-dependency-injection';

describe('Config', function() {
  describe('.register()', function() {
    it('should register a config manually', function() {
      let container = getContainer();
      let testManualConfig = container.get(TestManualConfig);

      expect(testManualConfig instanceof TestManualConfig).toBe(true);
      expect(Config.map['manual']).toBe(TestManualConfig);
    });
  });

  describe('.configure()', function() {
    it('Should configure with defaults', function() {
      let config   = new Config;
      let returned = config.configure();

      expect(returned).toBe(config);
    });
  });

  describe('.getConfig()', function() {
    it('Should get config by name', function() {
      let container = getContainer();
      let config = container.get(Config);
      let testManualConfig = container.get(TestManualConfig);

      expect(config.getConfig(container, 'manual')).toBe(testManualConfig);
    });
  });
});

function getContainer() {
  return new Container;
}
