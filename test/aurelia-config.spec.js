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

    it('Should configure with a function', function(done) {
      let result = configure(getAurelia(), config => {
        expect(config instanceof ConfigManager).toBe(true);
        done();
      });
      expect(result instanceof Promise).toBe(true);
    });
  });
});

function getAurelia() {
  return new Aurelia(new DefaultLoader, new Container);
}
