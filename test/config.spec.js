import {Config} from 'src/config';
import {Homefront} from 'homefront';

describe('Config', function() {
  describe('constructor', function() {
    it('Should create with defaults', function() {
      let config = new Config;

      expect(config instanceof Homefront).toBeDefined();
      expect(config.getMode()).toBe(Homefront.MODE_NESTED);
      expect(config.data).toBeDefined();
    });

    it('Should create with initial data', function() {
      let data = {foo: {bar: 'baz'}};
      let config = new Config(data);

      expect(config instanceof Homefront).toBeDefined();
      expect(config.getMode()).toBe(Homefront.MODE_NESTED);
      expect(config.data).toBe(data);
      expect(config.fetch('foo')).toBe(data.foo);
    });

    xit('Should create with initial data ande mode=flat', function() {
      let data = [{'foo.bar': 'baz'}];
      let config = new Config({data: data, options: Homefront.MODE_FLAT});

      expect(config instanceof Homefront).toBeDefined();
      expect(config.getMode()).toBe(Homefront.MODE_FLAT);
      expect(config.data).toBe(data);
      expect(config.fetch('foo')).toBe({bar: 'baz'});
    });
  });

  describe('use', function() {
    it('Should return instance of Homefront', function() {
      let config = new Config;

      let branch = config.use('namespace');

      expect(branch instanceof Homefront).toBe(true);
    });

    it('Should return a branch of config.data', function() {
      let config = new Config;
      let data = {foo: {bar: 'baz'}};

      let branch = config.use('namespace', data);

      expect(branch instanceof Homefront).toBe(true);
      expect(branch.data).toBe(data);
      expect(branch.fetch('foo.bar')).toBe('baz');
    });

    it('Should accept complex nested namespaces', function() {
      let config = new Config;
      let data = {foo: {bar: 'baz'}};

      let branch = config.use('name.space', data);

      expect(branch instanceof Homefront).toBe(true);
      expect(branch.data).toBe(config.data.name.space);
      expect(branch.fetch('foo.bar')).toBe('baz');
    });


    it('Should return a branch initialized with default empty data', function() {
      let config = new Config;

      let branch = config.use('namespace');

      expect(branch instanceof Homefront).toBe(true);
      expect(branch.data).toBe(config.data.namespace);
    });
  });
});
