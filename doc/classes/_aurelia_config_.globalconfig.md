# Class GlobalConfig
GlobalConfig class

### Extends
* [BaseConfig](_aurelia_config_.baseconfig.md)

## Index

### Constructors
* [constructor](_aurelia_config_.globalconfig.md#constructor)

### Properties
* [alias](_aurelia_config_.globalconfig.md#alias)
* [current](_aurelia_config_.globalconfig.md#current)
* [defaults](_aurelia_config_.globalconfig.md#defaults)

### Methods
* [delete](_aurelia_config_.globalconfig.md#delete)
* [extend](_aurelia_config_.globalconfig.md#extend)
* [fetch](_aurelia_config_.globalconfig.md#fetch)
* [reset](_aurelia_config_.globalconfig.md#reset)
* [set](_aurelia_config_.globalconfig.md#set)

## Constructors

### new GlobalConfig(defaults?: any): [GlobalConfig](_aurelia_config_.globalconfig.md)
  
* Overwrites [BaseConfig](_aurelia_config_.baseconfig.md).[constructor](_aurelia_config_.baseconfig.md#constructor)
* Defined in aurelia-config.d.ts:108


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| defaults? | any|  |

#### Returns: [GlobalConfig](_aurelia_config_.globalconfig.md)

## Properties

### alias: any

* Overwrites [BaseConfig](_aurelia_config_.baseconfig.md).[alias](_aurelia_config_.baseconfig.md#alias)
* Defined in aurelia-config.d.ts:108


### current: any
The current values of your config param 

* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[current](_aurelia_config_.baseconfig.md#current)
* Defined in aurelia-config.d.ts:18


### defaults: any
The defaults of your config param 

* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[defaults](_aurelia_config_.baseconfig.md#defaults)
* Defined in aurelia-config.d.ts:12


## Methods

### delete(...keys: any[]): any
Deletes a value from the current configuration  
* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[delete](_aurelia_config_.baseconfig.md#delete)
* Defined in aurelia-config.d.ts:47


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| ...keys | any[]| (dot-separated) string(s) or array of keys |

#### Returns: any

### extend(keys?: any, value?: any): any
Entends an oject value in the current configuration  
* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[extend](_aurelia_config_.baseconfig.md#extend)
* Defined in aurelia-config.d.ts:61


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| keys? | any| (dot-separated) string(s) or array of keys |
| value? | any| The value to set |

#### Returns: any

### fetch(...keys: any[]): any
Fetches a value from the current configuration  
* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[fetch](_aurelia_config_.baseconfig.md#fetch)
* Defined in aurelia-config.d.ts:41


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| ...keys | any[]| (dot-separated) string(s) or array of keys |

#### Returns: any
that The retrived value


### reset(keys?: any): any
Reset the current configuration back to defaults  
* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[reset](_aurelia_config_.baseconfig.md#reset)
* Defined in aurelia-config.d.ts:68


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| keys? | any| (dot-separated) string(s) or array of keys |

#### Returns: any

### set(keys?: any, value?: any): any
Sets a value in the current configuration  
* Inherited from [BaseConfig](_aurelia_config_.baseconfig.md).[set](_aurelia_config_.baseconfig.md#set)
* Defined in aurelia-config.d.ts:54


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| keys? | any| (dot-separated) string(s) or array of keys |
| value? | any| The value to set |

#### Returns: any

