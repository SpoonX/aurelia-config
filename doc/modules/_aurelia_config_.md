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

### extendIn(data?: any, keys?: any, value?: any): any
Entends an oject value in data object  
* Defined in aurelia-config.d.ts:102


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| data? | any| The data to extend |
| keys? | any| (dot-separated) string(s) or array of keys |
| value? | any| The value to set |

#### Returns: any

### fetchFrom(data?: any, key?: any, ...rest: any[]): any
Fetches value from (nested) object with a normalized key  
* Defined in aurelia-config.d.ts:86


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| data? | any| The data to fetch data from |
| key? | any|  |
| ...rest | any[]|  |

#### Returns: any
that    The retrieved value from the data


### normalizeKey(key?: any, ...rest: any[]): any
Used to normalize keys of mixed array and dot-separated string to a single array of undotted strings  
* Defined in aurelia-config.d.ts:77


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| key? | any|  |
| ...rest | any[]|  |

#### Returns: any
that    The key normalized to an array of strings


### setIn(data?: any, keys?: any, value?: any): any
Sets a value in data object  
* Defined in aurelia-config.d.ts:94


#### Parameters

| Name | Type | Description |
| ---- | ---- | ---- |
| data? | any| The data to set value in |
| keys? | any| (dot-separated) string(s) or array of keys |
| value? | any| The value to set |

#### Returns: any

