import {Config} from '../src/aurelia-config';

describe('Config', function() {
  describe('.configure()', function() {
    it('Should configure with defaults', function() {
      let config   = new Config;
      let returned = config.configure();

      expect(returned).toBe(config);
    });
  });
});
