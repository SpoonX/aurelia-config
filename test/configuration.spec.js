import {Config} from 'src/config';
import {Configuration} from 'src/configuration';
import {Container} from 'aurelia-dependency-injection';
import {InjectObjectTest} from 'test/resources/inject-test';

let container = new Container();

describe('Configuration', function() {
  describe('static .of()', function() {
    it('Should return a new instance of self.', function() {
      let segment = Configuration.of('foo');

      expect(segment instanceof Configuration).toBe(true);
      expect(segment._namespace).toBe('foo');
    });

    it('Should return a segment of the config as plain object.', function() {
      let config = container.get(Config);
      config.merge({foo: {bar: 'baz'}});

      let injectTest = container.get(InjectObjectTest);

      expect(injectTest.config instanceof Object).toBe(true);
      expect(injectTest.config.bar).toBe('baz');
    });
  });
});
