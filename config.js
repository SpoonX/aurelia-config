System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.2.1",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.2.0.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.6",
    "npm:aurelia-binding@1.0.0-beta.1.3.6": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.5",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.1",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.2",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.2",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.2.0.1",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.6",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.4",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.7",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.4",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.6",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-framework@1.0.0-beta.1.2.5": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.6",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.7"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.2.1": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.2.2": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-loader@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.2.2": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.2.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.1.6": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.1": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-router@1.0.0-beta.1.2.4": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.6",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.7"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.6",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.7"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.2.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.4",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.7"
    },
    "npm:aurelia-templating@1.0.0-beta.1.2.7": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.6",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1"
    }
  }
});
