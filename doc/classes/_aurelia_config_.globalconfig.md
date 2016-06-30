# Class GlobalConfig
GlobalConfig class

### Extends
* <a href="_aurelia_config_.baseconfig.md" class="tsd-signature-type">BaseConfig</a>

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

### new GlobalConfig(defaults
  ) 

  
* Overwrites <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#constructor">constructor</a>
* Defined in aurelia-config.d.ts:108


#### Parameters

| Name | Description |
| ---- | ---- 
| defaults |  |


## Properties

### alias

* Overwrites <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#alias">alias</a>
* Defined in aurelia-config.d.ts:108


### current
The current values of your config param 

* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#current">current</a>
* Defined in aurelia-config.d.ts:18


### defaults
The defaults of your config param 

* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#defaults">defaults</a>
* Defined in aurelia-config.d.ts:12


## Methods

### delete(...keys
  ) 

Deletes a value from the current configuration  
* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#delete">delete</a>
* Defined in aurelia-config.d.ts:47


#### Parameters

| Name | Description |
| ---- | ---- 
| ...keys | (dot-separated) string(s) or array of keys |


### extend(keys
  , value
  ) 

Entends an oject value in the current configuration  
* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#extend">extend</a>
* Defined in aurelia-config.d.ts:61


#### Parameters

| Name | Description |
| ---- | ---- 
| keys | (dot-separated) string(s) or array of keys |
| value | The value to set |


### fetch(...keys
  ) 

Fetches a value from the current configuration  
* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#fetch">fetch</a>
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
* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#reset">reset</a>
* Defined in aurelia-config.d.ts:68


#### Parameters

| Name | Description |
| ---- | ---- 
| keys | (dot-separated) string(s) or array of keys |


### set(keys
  , value
  ) 

Sets a value in the current configuration  
* Inherited from <a href="_aurelia_config_.baseconfig.md">BaseConfig</a>.<a href="_aurelia_config_.baseconfig.md#set">set</a>
* Defined in aurelia-config.d.ts:54


#### Parameters

| Name | Description |
| ---- | ---- 
| keys | (dot-separated) string(s) or array of keys |
| value | The value to set |


