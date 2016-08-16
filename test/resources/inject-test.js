import {inject} from 'aurelia-dependency-injection';
import {Configuration} from 'src/resolvers';

@inject(Configuration.of('foo'))
export class InjectTest {
  constructor(config) {
    this.config = config;
  }
}
