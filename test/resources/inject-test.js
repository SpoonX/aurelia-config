import {inject} from 'aurelia-dependency-injection';
import {Configuration} from 'src/configuration';

@inject(Configuration.of('foo'))
export class InjectObjectTest {
  constructor(config) {
    this.config = config;
  }
}
