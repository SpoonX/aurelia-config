import {GetConfig} from '../../src/decorators';
import {inject} from 'aurelia-dependency-injection';

@inject(GetConfig.of('inject-test'))
export class InjectTest {
  constructor(config) {
    this.config = config;
  }
}

@inject(GetConfig.of())
export class InjectTestGlobal {
  constructor(config) {
    this.config = config;
  }
}
