import {Container} from 'aurelia-dependency-injection';
import {DefaultLoader} from 'aurelia-loader-default';
import {configure} from 'src/aurelia-config';
import {Config} from 'src/config';

function getAurelia() {
  return {container: new Container, loader: new DefaultLoader};
}

describe('configure', () => {
  it('Should configure with an object', done => {
    let aurelia = getAurelia();

    let data = {key: 'value'};
    configure(aurelia, data).then(() => {
      let config = aurelia.container.get(Config);

      expect(config.data).toBe(data);

      done();
    });
  });

  it('Should configure with a array of configs', done =>{
    let aurelia = getAurelia();
    let data = [{key: 'value'}, 'test-plugin'];

    configure(aurelia, data).then(() => {
      let config = aurelia.container.get(Config);

      expect(JSON.stringify(config.data)).toBe('{"key":"value","foo":{"bar":"baz"}}');

      done();
    });
  });

  it('Should configure with a function', () =>{
    let aurelia = getAurelia();

    configure(aurelia, config => {
      expect(config instanceof Config).toBe(true);
    });
  });
});
