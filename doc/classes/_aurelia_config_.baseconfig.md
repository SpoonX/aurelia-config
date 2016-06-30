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

### new BaseConfig(defaults
  ) 

Creates an instance of BaseConfig. Copies defaults into current  
* Defined in aurelia-config.d.ts:24


#### Parameters

| Name | Description |
| ---- | ---- 
| defaults | Set the defaults. Required! |


## Properties

### alias
Derived classes should set an alternative alias param 

* Defined in aurelia-config.d.ts:24


### current
The current values of your config param 

* Defined in aurelia-config.d.ts:18


### defaults
The defaults of your config param 

* Defined in aurelia-config.d.ts:12


## Methods

### delete(...keys
  ) 

Deletes a value from the current configuration  
* Defined in aurelia-config.d.ts:47


#### Parameters

| Name | Description |
| ---- | ---- 
| ...keys | (dot-separated) string(s) or array of keys |


### extend(keys
  , value
  ) 

Entends an oject value in the current configuration  
* Defined in aurelia-config.d.ts:61


#### Parameters

| Name | Description |
| ---- | ---- 
| keys | (dot-separated) string(s) or array of keys |
| value | The value to set |


### fetch(...keys
  ) 

Fetches a value from the current configuration  
* Defined in aurelia-config.d.ts:41


#### Parameters

| Name | Description |
| ---- | ---- 
| ...keys | (dot-separated) string(s) or array of keys |

#### Returns:
  
that The retrived value


### reset(keys
  ) 

Reset the current configuration back to defaults  
* Defined in aurelia-config.d.ts:68


#### Parameters

| Name | Description |
| ---- | ---- 
| keys | (dot-separated) string(s) or array of keys |


### set(keys
  , value
  ) 

Sets a value in the current configuration  
* Defined in aurelia-config.d.ts:54


#### Parameters

| Name | Description |
| ---- | ---- 
| keys | (dot-separated) string(s) or array of keys |
| value | The value to set |


