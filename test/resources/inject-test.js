import {inject} from 'aurelia-dependency-injection';
import {Configuration} from 'src/resolvers';

@inject(Configuration.of('foo', true))
export class InjectHomefrontTest {
  constructor(config) {
    this.config = config;
  }
}

@inject(Configuration.of('foo'))
export class InjectObjectTest {
  constructor(config) {
    this.config = config;
  }
}
