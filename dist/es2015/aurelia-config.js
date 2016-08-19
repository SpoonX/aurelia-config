var _dec, _class2;

import * as LogManager from 'aurelia-logging';
import { Homefront } from 'homefront';
import { Loader } from 'aurelia-loader';
import { Container, resolver } from 'aurelia-dependency-injection';
import { Aurelia } from 'aurelia-framework';

export let Config = class Config extends Homefront {
  constructor(data = {}) {
    super(data, Homefront.MODE_NESTED);
  }

  use(namespace, data = {}) {
    let subConfig = new Homefront(data, Homefront.MODE_NESTED);

    return subConfig.merge(this.fetchOrPut(namespace, data));
  }
};

export let ConfigManager = class ConfigManager {
  constructor(config, loader) {
    this.config = config;
    this.loader = loader;
  }

  load(config) {
    let configName = 'config';
    let name = config;

    if (typeof config === 'object') {
      if (config.name && config.configName) {
        name = config.name;
        configName = config.configName;
      } else {
        return new Promise(resolve => {
          this.config.merge(config);

          resolve();
        });
      }
    }

    return this.loader.loadModule(name).then(loadedModule => {
      if (!configName in loadedModule) {
        throw new Error(`${ configName } not found for ${ name }`);
      }

      this.config.merge(loadedModule[configName]);

      LogManager.getLogger('aurelia-config').info(`Loaded ${ configName } from '${ name }'.`);

      return Promise.resolve();
    });
  }

  configure(pluginsOrConfigs = []) {
    let pluginOrConfig = pluginsOrConfigs.shift();

    return this.load(pluginOrConfig).then(() => {
      if (pluginsOrConfigs.length > 0) {
        return this.configure(pluginsOrConfigs);
      }

      return Promise.resolve();
    });
  }
};

export let Configuration = (_dec = resolver(), _dec(_class2 = class Configuration {
  constructor(namespace) {
    this._namespace = namespace;
  }

  get(container) {
    return container.get(Config).use(this._namespace);
  }

  static of(namespace) {
    return new Configuration(namespace);
  }
}) || _class2);

export function configure(aurelia, configureOrConfig) {
  let config;

  if (typeof configureOrConfig === 'object' && !Array.isArray(configureOrConfig)) {
    config = aurelia.container.registerInstance(Config, new Config(configureOrConfig || {}));
  } else {
    config = aurelia.container.get(Config);
  }

  let configManager = new ConfigManager(config, aurelia.loader);
  aurelia.container.registerInstance(ConfigManager, configManager);

  if (Array.isArray(configureOrConfig)) {
    return configManager.configure(configureOrConfig);
  } else if (typeof configureOrConfig === 'function') {
    configureOrConfig(config);
  }

  return Promise.resolve();
}