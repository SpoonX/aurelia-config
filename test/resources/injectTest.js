import {Config} from '../../src/decorators';
import {inject} from 'aurelia-dependency-injection';

@inject(Config.of('inject-test'))
export class InjectTest {
  constructor(config) {
    this.config = config;
  }
}

@inject(Config.of())
export class InjectTestGlobal {
  constructor(config) {
    this.config = config;
  }
}
