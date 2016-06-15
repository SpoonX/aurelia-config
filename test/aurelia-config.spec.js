import {configure, ConfigManager, GlobalConfig} from '../src/aurelia-config';
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
    it('Should export GlobalConfig', function() {
      expect(GlobalConfig).toBeDefined();
    });
  });

  describe('configure()', function() {
    it('Should configure with a function', function() {
      configure(getAurelia(), function(config) {
        expect(config instanceof ConfigManager).toBe(true);
      });
    });
  });

  describe('configure()', function() {
    it('Should configure with an object', function() {
      let config = configure(getAurelia(), {});
      expect(config instanceof ConfigManager).toBe(true);
    });
  });
});

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}
