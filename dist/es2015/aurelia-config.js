var _dec, _class, _dec2, _class2;

import { Homefront } from 'homefront';
import { inject, Container, resolver } from 'aurelia-dependency-injection';
import { FrameworkConfiguration } from 'aurelia-framework';

export let Config = class Config extends Homefront {};

export let PluginManager = (_dec = inject(Config), _dec(_class = class PluginManager {
  constructor(config) {
    this.config = config;
  }

  normalized(plugins, handler) {
    plugins.forEach(pluginDefinition => {
      pluginDefinition = pluginDefinition || {};

      if (typeof pluginDefinition === 'string') {
        pluginDefinition = { moduleId: pluginDefinition };
      }

      if (typeof pluginDefinition.config === 'undefined') {
        pluginDefinition.config = {};
      }

      handler(pluginDefinition);
    });
  }

  configure(use, plugins, ...appConfigs) {
    let loadConfigs = [];
    let pluginConfigs = [];

    let loadConfig = plugin => use.aurelia.loader.loadModule(plugin.moduleId).then(module => Config.merge(plugin.config, module.config));

    this.normalized(plugins, plugin => {
      loadConfigs.push(loadConfig(plugin));

      pluginConfigs.push(plugin.config);

      this.config.fetchOrPut(plugin.moduleId, {});

      use.plugin(plugin.moduleId, plugin.rootConfig ? this.config.data : this.config.data[plugin.moduleId]);
    });

    return Promise.all(loadConfigs).then(() => this.config.merge(pluginConfigs.concat(appConfigs)));
  }
}) || _class);

export let Configuration = (_dec2 = resolver(), _dec2(_class2 = class Configuration {
  constructor(namespace) {
    this._namespace = namespace;
  }

  get(container) {
    return container.get(Config).fetch(this._namespace);
  }

  static of(namespace) {
    return new Configuration(namespace);
  }
}) || _class2);

export function configure(use, callback) {
  let pluginManager = use.container.get(PluginManager);

  return callback((plugins, ...appConfigs) => pluginManager.configure(use, plugins, ...appConfigs));
}