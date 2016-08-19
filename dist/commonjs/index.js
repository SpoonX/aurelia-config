'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaConfig = require('./aurelia-config');

Object.keys(_aureliaConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaConfig[key];
    }
  });
});