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

### new ConfigManager(container
  , loader
  ) 

Creates an instance of the ConfigManager  
* Defined in aurelia-config.d.ts:134


#### Parameters

| Name | Description |
| ---- | ---- 
| container | The container for the Configs |
| loader | The loader for the Configs |


## Properties

### configs
POJO map of the registered configs param 

* Defined in aurelia-config.d.ts:122


### container
The container for the Configs param 

* Defined in aurelia-config.d.ts:128


### loader
The Config loader param 

* Defined in aurelia-config.d.ts:134


## Methods

### addFromContainer(key
  , configObject
  , alias
  , registerAlias
  ) 

Add a Config by key from the container chainable 
  
* Defined in aurelia-config.d.ts:176


#### Parameters

| Name | Description |
| ---- | ---- 
| key | The container key |
| configObject | The configuration object |
| alias | The aiias to register under if none is set in config.alias |
| registerAlias | Register with container (true) |

#### Returns:
  
itself

### addInstance(alias
  , configObject
  , registerAlias
  ) 

Add a Config from a BaseConfig or Object chainable 
  
* Defined in aurelia-config.d.ts:165


#### Parameters

| Name | Description |
| ---- | ---- 
| alias | The unique alias to register under |
| configObject |  |
| registerAlias | Register with container (true) |

#### Returns:
  
itself

### copy(targetAliasOrKeyOrInstance
  , sourceAliasOrKeyOrInstance
  , includeDefaults
  ) 

Deep copy a Config into another chainable 
  
* Defined in aurelia-config.d.ts:186


#### Parameters

| Name | Description |
| ---- | ---- 
| targetAliasOrKeyOrInstance | The target alias, container key or an instance of BaseConfig |
| sourceAliasOrKeyOrInstance | The source alias, container key or an instance of BaseConfig |
| includeDefaults | Also copy defaults |

#### Returns:
  
itself

### extend(targetAliasOrKeyOrInstance
  , sourceAliasOrKeyOrInstance
  , includeDefaults
  ) 

Deep extend a Config with another chainable 
  
* Defined in aurelia-config.d.ts:196


#### Parameters

| Name | Description |
| ---- | ---- 
| targetAliasOrKeyOrInstance |  |
| sourceAliasOrKeyOrInstance |  |
| includeDefaults | Also merge defaults |

#### Returns:
  
itself

### get(aliasOrKeyOrInstance
  ) 

Resolves an alias or container key or instance to Config instance  
* Defined in aurelia-config.d.ts:155


#### Parameters

| Name | Description |
| ---- | ---- 
| aliasOrKeyOrInstance | The target alias or container key or a BaseConfig instance |

#### Returns:
  
that


### has(alias
  ) 

Has alias registered  
* Defined in aurelia-config.d.ts:148


#### Parameters

| Name | Description |
| ---- | ---- 
| alias | The requested alias |

#### Returns:
  
that


### load(moduleId
  , configObject
  , className
  , registerAlias
  ) 

Load a Config from a plugin by moduleId  
* Defined in aurelia-config.d.ts:215


#### Parameters

| Name | Description |
| ---- | ---- 
| moduleId |  |
| configObject | The config to merge into load Config |
| className | The class to load as Config (default = 'Config)') |
| registerAlias |  |

#### Returns:
  



### remove(aliasOrKeyOrInstance
  , removeAlias
  ) 

Remove a Config from the ConfigManager chainable 
  
* Defined in aurelia-config.d.ts:205


#### Parameters

| Name | Description |
| ---- | ---- 
| aliasOrKeyOrInstance | The target alias or container key or an instance of BaseConfig |
| removeAlias | Also remove container alias (true) |

#### Returns:
  
itself

