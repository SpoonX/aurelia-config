import {Config} from './config';
import {configFor, GetConfig} from './decorators';
import {GlobalConfig} from './globalConfig';

/**
 * configure aurelia-config
 * @param  {Aurelia}         aurelia           The aurelia instance
 * @param  {function|Object} configOrConfigure The configuration object or function
 * @return {Config}                            The aurelia-config Config instance
 */
function configure(aurelia, configOrConfigure) {
  let config = aurelia.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(config);
  } else {
    config.configure(configOrConfigure);
  }

  // get GlobalConfig initialzed and registered
  aurelia.container.get(GlobalConfig);

  return config;
}

export {
  Config,
  configure,
  configFor,
  GetConfig,
  GlobalConfig
};
