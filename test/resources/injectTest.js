import {ConfigResolver} from '../../src/decorators';
import {inject} from 'aurelia-dependency-injection';

@inject(ConfigResolver.of('inject-test'))
export class InjectTest {
  constructor(config) {
    this.config = config;
  }
}

@inject(ConfigResolver.of())
export class InjectTestGlobal {
  constructor(config) {
    this.config = config;
  }
}
