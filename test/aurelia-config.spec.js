import {configure, ConfigManager, BaseConfig, GlobalConfig} from '../src/aurelia-config';
import {Aurelia} from 'aurelia-framework';
import {DefaultLoader} from 'aurelia-loader-default';
import {Container} from 'aurelia-dependency-injection';

describe('aurelia-config', function() {
  describe('export', function() {
    it('Should export configure', function() {
      expect(configure).toBeDefined();
    });
    it('Should export ConfigManager', function() {
      expect(ConfigManager).toBeDefined();
    });
    it('Should export BaseConfig', function() {
      expect(BaseConfig).toBeDefined();
    });
    it('Should export GlobalConfig', function() {
      expect(GlobalConfig).toBeDefined();
    });
  });

  describe('configure()', function() {
    it('Should configure with an object', function() {
      let config = configure(getAurelia(), {});
      expect(config instanceof Promise).toBe(true);
    });

    it('Should fail to configure plugins without alias', function(done) {
      configure(getAurelia(), {
        plugins: [
          {moduleId: 'test/resources/testConfigs', className: 'FaultyConfig', config: {}}
        ]
      }).then(() => {
        expect('failed').toBe(true);
      }).catch(e => {
        expect(e instanceof Error).toBe(true);
      }).then(done);
    });
  });
});

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}
