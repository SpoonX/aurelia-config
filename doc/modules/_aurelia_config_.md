# Module "aurelia-config"


## Index

### Classes
* [BaseConfig](../classes/_aurelia_config_.baseconfig.md)
* [ConfigManager](../classes/_aurelia_config_.configmanager.md)
* [GlobalConfig](../classes/_aurelia_config_.globalconfig.md)

### Functions
* [extendIn](_aurelia_config_.md#extendin)
* [fetchFrom](_aurelia_config_.md#fetchfrom)
* [normalizeKey](_aurelia_config_.md#normalizekey)
* [setIn](_aurelia_config_.md#setin)

## Functions

### extendIn(data
  , keys
  , value
  ) 

Entends an oject value in data object  
* Defined in aurelia-config.d.ts:102


#### Parameters

| Name | Description |
| ---- | ---- 
| data | The data to extend |
| keys | (dot-separated) string(s) or array of keys |
| value | The value to set |


### fetchFrom(data
  , key
  , ...rest
  ) 

Fetches value from (nested) object with a normalized key  
* Defined in aurelia-config.d.ts:86


#### Parameters

| Name | Description |
| ---- | ---- 
| data | The data to fetch data from |
| key |  |
| ...rest |  |

#### Returns:
  
that    The retrieved value from the data


### normalizeKey(key
  , ...rest
  ) 

Used to normalize keys of mixed array and dot-separated string to a single array of undotted strings  
* Defined in aurelia-config.d.ts:77


#### Parameters

| Name | Description |
| ---- | ---- 
| key |  |
| ...rest |  |

#### Returns:
  
that    The key normalized to an array of strings


### setIn(data
  , keys
  , value
  ) 

Sets a value in data object  
* Defined in aurelia-config.d.ts:94


#### Parameters

| Name | Description |
| ---- | ---- 
| data | The data to set value in |
| keys | (dot-separated) string(s) or array of keys |
| value | The value to set |


