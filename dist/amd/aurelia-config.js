define(['exports', 'homefront', 'aurelia-dependency-injection', 'aurelia-framework'], function (exports, _homefront, _aureliaDependencyInjection, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Configuration = exports.PluginManager = exports.Config = undefined;
  exports.configure = configure;

  var _dec, _class, _dec2, _class2;

  

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Config = exports.Config = function (_Homefront) {
    _inherits(Config, _Homefront);

    function Config() {
      

      return _possibleConstructorReturn(this, _Homefront.apply(this, arguments));
    }

    return Config;
  }(_homefront.Homefront);

  var PluginManager = exports.PluginManager = (_dec = (0, _aureliaDependencyInjection.inject)(Config), _dec(_class = function () {
    function PluginManager(config) {
      

      this.config = config;
    }

    PluginManager.prototype.normalized = function normalized(plugins, handler) {
      plugins.forEach(function (pluginDefinition) {
        pluginDefinition = pluginDefinition || {};

        if (typeof pluginDefinition === 'string') {
          pluginDefinition = { moduleId: pluginDefinition };
        }

        if (typeof pluginDefinition.config === 'undefined') {
          pluginDefinition.config = {};
        }

        handler(pluginDefinition);
      });
    };

    PluginManager.prototype.configure = function configure(use, plugins) {
      for (var _len = arguments.length, appConfigs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        appConfigs[_key - 2] = arguments[_key];
      }

      var _this2 = this;

      var loadConfigs = [];
      var pluginConfigs = [];

      var loadConfig = function loadConfig(plugin) {
        return use.aurelia.loader.loadModule(plugin.moduleId).then(function (module) {
          return Config.merge(plugin.config, module.config);
        });
      };

      this.normalized(plugins, function (plugin) {
        loadConfigs.push(loadConfig(plugin));

        pluginConfigs.push(plugin.config);

        _this2.config.fetchOrPut(plugin.moduleId, {});

        use.plugin(plugin.moduleId, plugin.rootConfig ? _this2.config.data : _this2.config.data[plugin.moduleId]);
      });

      return Promise.all(loadConfigs).then(function () {
        return _this2.config.merge(pluginConfigs.concat(appConfigs));
      });
    };

    return PluginManager;
  }()) || _class);
  var Configuration = exports.Configuration = (_dec2 = (0, _aureliaDependencyInjection.resolver)(), _dec2(_class2 = function () {
    function Configuration(namespace) {
      

      this._namespace = namespace;
    }

    Configuration.prototype.get = function get(container) {
      return container.get(Config).fetch(this._namespace);
    };

    Configuration.of = function of(namespace) {
      return new Configuration(namespace);
    };

    return Configuration;
  }()) || _class2);
  function configure(use, callback) {
    var pluginManager = use.container.get(PluginManager);

    callback(function (plugins) {
      for (var _len2 = arguments.length, appConfigs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        appConfigs[_key2 - 1] = arguments[_key2];
      }

      return pluginManager.configure.apply(pluginManager, [use, plugins].concat(appConfigs));
    });
  }
});