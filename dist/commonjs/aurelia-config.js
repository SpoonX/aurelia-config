'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configuration = exports.ConfigManager = exports.Config = undefined;

var _dec, _class2;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.configure = configure;

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _homefront = require('homefront');

var _aureliaLoader = require('aurelia-loader');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaFramework = require('aurelia-framework');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Config = exports.Config = function (_Homefront) {
  _inherits(Config, _Homefront);

  function Config() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    

    return _possibleConstructorReturn(this, _Homefront.call(this, data, _homefront.Homefront.MODE_NESTED));
  }

  Config.prototype.use = function use(namespace) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var subConfig = new _homefront.Homefront(data, _homefront.Homefront.MODE_NESTED);

    return subConfig.merge(this.fetchOrPut(namespace, data));
  };

  return Config;
}(_homefront.Homefront);

var ConfigManager = exports.ConfigManager = function () {
  function ConfigManager(config, loader) {
    

    this.config = config;
    this.loader = loader;
  }

  ConfigManager.prototype.load = function load(config) {
    var _this2 = this;

    var configName = 'config';
    var name = config;

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
      if (config.name && config.configName) {
        name = config.name;
        configName = config.configName;
      } else {
        return new Promise(function (resolve) {
          _this2.config.merge(config);

          resolve();
        });
      }
    }

    return this.loader.loadModule(name).then(function (loadedModule) {
      if (!configName in loadedModule) {
        throw new Error(configName + ' not found for ' + name);
      }

      _this2.config.merge(loadedModule[configName]);

      LogManager.getLogger('aurelia-config').info('Loaded ' + configName + ' from \'' + name + '\'.');

      return Promise.resolve();
    });
  };

  ConfigManager.prototype.configure = function configure() {
    var _this3 = this;

    var pluginsOrConfigs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var pluginOrConfig = pluginsOrConfigs.shift();

    return this.load(pluginOrConfig).then(function () {
      if (pluginsOrConfigs.length > 0) {
        return _this3.configure(pluginsOrConfigs);
      }

      return Promise.resolve();
    });
  };

  return ConfigManager;
}();

var Configuration = exports.Configuration = (_dec = (0, _aureliaDependencyInjection.resolver)(), _dec(_class2 = function () {
  function Configuration(namespace) {
    

    this._namespace = namespace;
  }

  Configuration.prototype.get = function get(container) {
    return container.get(Config).use(this._namespace);
  };

  Configuration.of = function of(namespace) {
    return new Configuration(namespace);
  };

  return Configuration;
}()) || _class2);
function configure(aurelia, configureOrConfig) {
  var config = void 0;

  if ((typeof configureOrConfig === 'undefined' ? 'undefined' : _typeof(configureOrConfig)) === 'object' && !Array.isArray(configureOrConfig)) {
    config = aurelia.container.registerInstance(Config, new Config(configureOrConfig || {}));
  } else {
    config = aurelia.container.get(Config);
  }

  var configManager = new ConfigManager(config, aurelia.loader);
  aurelia.container.registerInstance(ConfigManager, configManager);

  if (Array.isArray(configureOrConfig)) {
    return configManager.configure(configureOrConfig);
  } else if (typeof configureOrConfig === 'function') {
    configureOrConfig(config);
  }

  return Promise.resolve();
}