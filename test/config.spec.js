import {Config} from 'src/config';
import {Homefront} from 'homefront';

describe('Config', function() {
  describe('constructor', function() {
    it('Should create', function() {
      let config = new Config;

      expect(config instanceof Homefront).toBeDefined();
      expect(config.getMode()).toBe(Homefront.MODE_NESTED);
      expect(config.data).toBeDefined();
    });
  });
});
