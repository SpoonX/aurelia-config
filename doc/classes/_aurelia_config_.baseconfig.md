# Class BaseConfig
BaseConfig class

## Index

### Constructors
* [constructor](_aurelia_config_.baseconfig.md#constructor)

### Properties
* [alias](_aurelia_config_.baseconfig.md#alias)
* [current](_aurelia_config_.baseconfig.md#current)
* [defaults](_aurelia_config_.baseconfig.md#defaults)

### Methods
* [delete](_aurelia_config_.baseconfig.md#delete)
* [extend](_aurelia_config_.baseconfig.md#extend)
* [fetch](_aurelia_config_.baseconfig.md#fetch)
* [reset](_aurelia_config_.baseconfig.md#reset)
* [set](_aurelia_config_.baseconfig.md#set)

## Constructors

### new BaseConfig(defaults?: any): [BaseConfig](_aurelia_config_.baseconfig.md)
Creates an instance of BaseConfig. Copies defaults into current  
* Defined in aurelia-config.d.ts:24


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| defaults? | any| Set the defaults. Required! |

#### Returns: [BaseConfig](_aurelia_config_.baseconfig.md)

## Properties

### alias: any
Derived classes should set an alternative alias param 

* Defined in aurelia-config.d.ts:24


### current: any
The current values of your config param 

* Defined in aurelia-config.d.ts:18


### defaults: any
The defaults of your config param 

* Defined in aurelia-config.d.ts:12


## Methods

### delete(...keys: any[]): any
Deletes a value from the current configuration  
* Defined in aurelia-config.d.ts:47


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| ...keys | any[]| (dot-separated) string(s) or array of keys |

#### Returns: any

### extend(keys?: any, value?: any): any
Entends an oject value in the current configuration  
* Defined in aurelia-config.d.ts:61


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| keys? | any| (dot-separated) string(s) or array of keys |
| value? | any| The value to set |

#### Returns: any

### fetch(...keys: any[]): any
Fetches a value from the current configuration  
* Defined in aurelia-config.d.ts:41


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| ...keys | any[]| (dot-separated) string(s) or array of keys |

#### Returns: any
that The retrived value


### reset(keys?: any): any
Reset the current configuration back to defaults  
* Defined in aurelia-config.d.ts:68


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| keys? | any| (dot-separated) string(s) or array of keys |

#### Returns: any

### set(keys?: any, value?: any): any
Sets a value in the current configuration  
* Defined in aurelia-config.d.ts:54


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| keys? | any| (dot-separated) string(s) or array of keys |
| value? | any| The value to set |

#### Returns: any

