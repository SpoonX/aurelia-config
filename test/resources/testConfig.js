import {configFor} from '../../src/decorators';

@configFor('inject-test')
export class TestConfig {
  key = 'value';
}
