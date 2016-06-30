# Class ConfigManager
The ConfigManager classRegister and retrieve configs

## Index

### Constructors
* [constructor](_aurelia_config_.configmanager.md#constructor)

### Properties
* [configs](_aurelia_config_.configmanager.md#configs)
* [container](_aurelia_config_.configmanager.md#container)
* [loader](_aurelia_config_.configmanager.md#loader)

### Methods
* [addFromContainer](_aurelia_config_.configmanager.md#addfromcontainer)
* [addInstance](_aurelia_config_.configmanager.md#addinstance)
* [copy](_aurelia_config_.configmanager.md#copy)
* [extend](_aurelia_config_.configmanager.md#extend)
* [get](_aurelia_config_.configmanager.md#get)
* [has](_aurelia_config_.configmanager.md#has)
* [load](_aurelia_config_.configmanager.md#load)
* [remove](_aurelia_config_.configmanager.md#remove)

## Constructors

### new ConfigManager(container?: any, loader?: any): [ConfigManager](_aurelia_config_.configmanager.md)
Creates an instance of the ConfigManager  
* Defined in aurelia-config.d.ts:134


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| container? | any| The container for the Configs |
| loader? | any| The loader for the Configs |

#### Returns: [ConfigManager](_aurelia_config_.configmanager.md)

## Properties

### configs: any
POJO map of the registered configs param 

* Defined in aurelia-config.d.ts:122


### container: any
The container for the Configs param 

* Defined in aurelia-config.d.ts:128


### loader: any
The Config loader param 

* Defined in aurelia-config.d.ts:134


## Methods

### addFromContainer(key?: any, configObject?: any, alias?: any, registerAlias?: any): any
Add a Config by key from the container chainable 
  
* Defined in aurelia-config.d.ts:176


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| key? | any| The container key |
| configObject? | any| The configuration object |
| alias? | any| The aiias to register under if none is set in config.alias |
| registerAlias? | any| Register with container (true) |

#### Returns: any
itself

### addInstance(alias?: any, configObject?: any, registerAlias?: any): any
Add a Config from a BaseConfig or Object chainable 
  
* Defined in aurelia-config.d.ts:165


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| alias? | any| The unique alias to register under |
| configObject? | any|  |
| registerAlias? | any| Register with container (true) |

#### Returns: any
itself

### copy(targetAliasOrKeyOrInstance?: any, sourceAliasOrKeyOrInstance?: any, includeDefaults?: any): any
Deep copy a Config into another chainable 
  
* Defined in aurelia-config.d.ts:186


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| targetAliasOrKeyOrInstance? | any| The target alias, container key or an instance of BaseConfig |
| sourceAliasOrKeyOrInstance? | any| The source alias, container key or an instance of BaseConfig |
| includeDefaults? | any| Also copy defaults |

#### Returns: any
itself

### extend(targetAliasOrKeyOrInstance?: any, sourceAliasOrKeyOrInstance?: any, includeDefaults?: any): any
Deep extend a Config with another chainable 
  
* Defined in aurelia-config.d.ts:196


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| targetAliasOrKeyOrInstance? | any|  |
| sourceAliasOrKeyOrInstance? | any|  |
| includeDefaults? | any| Also merge defaults |

#### Returns: any
itself

### get(aliasOrKeyOrInstance?: any): any
Resolves an alias or container key or instance to Config instance  
* Defined in aurelia-config.d.ts:155


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| aliasOrKeyOrInstance? | any| The target alias or container key or a BaseConfig instance |

#### Returns: any
that


### has(alias?: any): any
Has alias registered  
* Defined in aurelia-config.d.ts:148


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| alias? | any| The requested alias |

#### Returns: any
that


### load(moduleId?: any, configObject?: any, className?: any, registerAlias?: any): any
Load a Config from a plugin by moduleId  
* Defined in aurelia-config.d.ts:215


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| moduleId? | any|  |
| configObject? | any| The config to merge into load Config |
| className? | any| The class to load as Config (default = 'Config)') |
| registerAlias? | any|  |

#### Returns: any



### remove(aliasOrKeyOrInstance?: any, removeAlias?: any): any
Remove a Config from the ConfigManager chainable 
  
* Defined in aurelia-config.d.ts:205


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| aliasOrKeyOrInstance? | any| The target alias or container key or an instance of BaseConfig |
| removeAlias? | any| Also remove container alias (true) |

#### Returns: any
itself

