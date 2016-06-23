import {configure} from '../src/aurelia-config';
import {ConfigManager} from '../src/configManager';
import {Aurelia} from 'aurelia-framework';
import {DefaultLoader} from 'aurelia-loader-default';
import {Container} from 'aurelia-dependency-injection';

describe('aurelia-config', function() {
  describe('configure()', function() {
    it('Should configure with an object', function() {
      let result = configure(getAurelia(), {});
      expect(result instanceof Promise).toBe(true);
    });

    it('Should configure with a fucntion', function(done) {
      let result = configure(getAurelia(), config => {
        expect(config instanceof ConfigManager).toBe(true);
        done();
      });
      expect(result instanceof Promise).toBe(true);
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
