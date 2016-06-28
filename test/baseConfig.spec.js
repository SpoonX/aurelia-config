import {BaseConfig, normalizeKey, fetchFrom} from '../src/baseConfig';

describe('normalizeKey', function() {
  it('Should normalize string', function() {
    let normalizedKey = normalizeKey('foo');
    let expectedKey = ['foo'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });

  it('Should normalize dotted string', function() {
    let normalizedKey = normalizeKey('foo.bar.baz');
    let expectedKey = ['foo', 'bar', 'baz'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });

  it('Should normalize list of string', function() {
    let normalizedKey = normalizeKey('foo', 'bar', 'baz');
    let expectedKey = ['foo', 'bar', 'baz'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });

  it('Should normalize list of dotted strings', function() {
    let normalizedKey = normalizeKey('foo.bar', 'baz');
    let expectedKey = ['foo', 'bar', 'baz'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });

  it('Should normalize array of strings', function() {
    let normalizedKey = normalizeKey(['foo', 'bar', 'baz']);
    let expectedKey = ['foo', 'bar', 'baz'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });

  it('Should normalize array of dotted strings', function() {
    let normalizedKey = normalizeKey(['foo.bar', 'baz']);
    let expectedKey = ['foo', 'bar', 'baz'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });

  it('Should normalize array of array of strings', function() {
    let normalizedKey = normalizeKey(['foo'], ['bar'], ['baz']);
    let expectedKey = ['foo', 'bar', 'baz'];

    expect(expectedKey.every((value, index) => {
      return value === normalizedKey[index];
    })).toBe(true);
  });
});

describe('fetchFrom', function() {
  it('Should get string data from simple object', function() {
    let normalizedKey = normalizeKey('foo');
    let data = {'foo': 'bar'};

    expect(fetchFrom(data, normalizedKey)).toBe('bar');
  });

  it('Should get object data from simple object', function() {
    let normalizedKey = normalizeKey('foo');
    let data = {'foo': {'bar': 'baz'}};

    expect(JSON.stringify(fetchFrom(data, normalizedKey))).toBe(JSON.stringify({'bar': 'baz'}));
  });

  it('Should get string data from nested object', function() {
    let normalizedKey = normalizeKey('foo.bar');
    let data = {'foo': {'bar': 'baz'}};

    expect(fetchFrom(data, ...normalizedKey)).toBe('baz');
  });
});


describe('BaseConfig', function() {
  describe('constructor', function() {
    it('Should throw when called without default', function() {
      let fail = () => new BaseConfig();

      expect(fail).toThrow();
    });

    it('Should extend defaults and set current', function() {
      let baseConfig = new BaseConfig({'foo': 'bar'});

      expect(JSON.stringify(baseConfig.defaults)).toBe(JSON.stringify({'foo': 'bar'}));
      expect(JSON.stringify(baseConfig.current)).toBe(JSON.stringify({'foo': 'bar'}));
    });
  });

  describe('fetch', function() {
    it('Should get string data from simple object', function() {
      let baseConfig = new BaseConfig({'foo': 'bar'});

      expect(baseConfig.fetch('foo')).toBe('bar');
    });

    it('Should get object data from simple object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});

      expect(JSON.stringify(baseConfig.fetch('foo'))).toBe(JSON.stringify({'bar': 'baz'}));
    });

    it('Should get string data from nested object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});

      expect(baseConfig.fetch('foo.bar')).toBe('baz');
    });
  });

  describe('delete', function() {
    it('Should delete string data from simple object', function() {
      let baseConfig = new BaseConfig({'foo': 'bar'});

      expect(baseConfig.delete('foo')).toBeUndefined();
    });

    it('Should delete object data from simple object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});

      expect(baseConfig.delete('foo')).toBeUndefined();
    });

    it('Should delete string data from nested object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});

      expect(baseConfig.delete('foo.bar')).toBeUndefined();
      expect(baseConfig.fetch('foo')).toBeDefined();
    });
  });

  describe('set', function() {
    it('Should add string data in root object', function() {
      let baseConfig = new BaseConfig({});
      baseConfig.set('foo', 'bar');

      expect(baseConfig.fetch('foo')).toBe('bar');
    });

    it('Should add object data in root object', function() {
      let baseConfig = new BaseConfig({});
      baseConfig.set('foo', {'bar':'baz'});

      expect(baseConfig.fetch('foo.bar')).toBe('baz');
    });

    it('Should overwrite data in root object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});
      baseConfig.set('foo', 'bar');

      expect(baseConfig.fetch('foo')).toBe('bar');
    });

    it('Should overwrite data', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});
      baseConfig.set('foo.bar', 'bazzing');

      expect(baseConfig.fetch('foo.bar')).toBe('bazzing');
    });
  });

  describe('extend', function() {
    it('Should add object data in root object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});

      expect(baseConfig.fetch('foo.bar')).toBe('baz');
    });

    it('Should overwrite data in root object', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});
      baseConfig.extend('foo', {'bar':'bazzing'});

      expect(baseConfig.fetch('foo.bar')).toBe('bazzing');
    });

    it('Should add object data', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});
      baseConfig.extend('foo', {'barring': 'bazzing'});

      expect(baseConfig.fetch('foo.bar')).toBe('baz');
      expect(baseConfig.fetch('foo.barring')).toBe('bazzing');
    });

    it('Should overwrite object data in nested', function() {
      let baseConfig = new BaseConfig({'foo': {'bar': {'baz': 'bazzing'}}});
      baseConfig.extend('foo.bar', {'baz': 'barring'});

      expect(baseConfig.fetch('foo.bar.baz')).toBe('barring');
    });

    it('Should add object data in nested', function() {
      let baseConfig = new BaseConfig({'foo': {'bar': {'baz': 'bamm'}}});
      baseConfig.extend('foo.bar', {'barring': 'bazzing'});

      expect(baseConfig.fetch('foo.bar.baz')).toBe('bamm');
      expect(baseConfig.fetch('foo.bar.barring')).toBe('bazzing');
    });
  });


  describe('reset', function() {
    it('Should reset current to defaults', function() {
      let baseConfig = new BaseConfig({'foo': 'bar'});
      baseConfig.current = {'baz': 'bamm'};
      baseConfig.reset();

      expect(baseConfig.fetch('foo')).toBe('bar');
    });

    it('Should reset subtree of current to defaults', function() {
      let baseConfig = new BaseConfig({'foo': {'bar':'baz'}});
      baseConfig.current = {'foo': {'bar': 'bazzing'}};
      baseConfig.reset();

      expect(baseConfig.fetch('foo.bar')).toBe('baz');
    });
  });
});
