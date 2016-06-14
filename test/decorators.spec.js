import {configure, ConfigManager, GlobalConfig} from '../src/aurelia-config';
import {Aurelia} from 'aurelia-framework';
import {DefaultLoader} from 'aurelia-loader-default';
import {Container} from 'aurelia-dependency-injection';
import {TestConfig} from './resources/testConfig';
import {InjectTest, InjectTestGlobal} from './resources/injectTest';

describe('decorators', function() {
  describe('@registerConfig()', function() {
    it('should register a config', function(done) {
      let aurelia = getAurelia();

      configure(aurelia, function(configManager) {
        aurelia.start().then(()=>{
          let container = aurelia.container;
          let testConfig = container.get(TestConfig);

          expect(testConfig instanceof TestConfig).toBe(true);
          expect(ConfigManager.map['inject-test']).toBe(TestConfig);

          done();
        });
      });
    });
  });

  describe('@Config.of()', function() {
    it('should fail to get unregister config', function(done) {
      let aurelia = getAurelia();

      configure(aurelia, function(configManager) {
        aurelia.start().then(()=>{
          let container = aurelia.container;
          let fail = () => container.get(injectTest);

          expect(fail).toThrow();

          done();
        });
      });
    });

    it('should get register config', function(done) {
      let aurelia = getAurelia();

      configure(aurelia, function(config) {
        aurelia.start().then(()=>{
          let container = aurelia.container;
          let testConfig = container.get(TestConfig);
          let injectTest = container.get(InjectTest);

          expect(injectTest.config instanceof TestConfig).toBe(true);
          expect(injectTest.config).toBe(testConfig);

          testConfig.foo = 'bar';

          expect(injectTest.config).toBe(testConfig);

          done();
        });
      });
    });

    it('should get global config', function(done) {
      let aurelia = getAurelia();

      configure(aurelia, function(config) {
        aurelia.start().then(()=>{
          let container = aurelia.container;
          let injectTestGlobal = container.get(InjectTestGlobal);

          // GlobalConfig should have been regirster in configure
          expect(injectTestGlobal.config instanceof GlobalConfig).toBe(true);
          expect(JSON.stringify(injectTestGlobal.config)).toBe('{}');

          let globalConfig = container.get(GlobalConfig);
          globalConfig.foo = 'bar';

          expect(injectTestGlobal.config).toBe(globalConfig);

          done();
        });
      });
    });
  });
});

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}
