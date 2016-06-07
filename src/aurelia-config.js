import {Config} from './config';

function configure(aurelia, config) {
  return config(aurelia.container.get(Config));
}

export {
  Config,
  configure
};
