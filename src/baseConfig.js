import extend from 'extend';

/**
 * BaseConfig class
 */
export class BaseConfig {

  /**
   * The defaults of your config
   * @param {Object}
   */
  defaults = {};

  /**
   * The current values of your config
   * @type {Object}
   */
  current = {};

  /**
   * Derived classes must set a unique alias
   * @type {String}
   */
  alias

  /**
   * Creates an instance of BaseConfig. Copies defaults into current
   * @param  {Object} defaultsOverwrite = {} Optionally extends the defaults
   */
  constructor(defaultsOverwrite = {}) {
    extendIn(this, 'defaults', defaultsOverwrite);
    this.current = JSON.parse(JSON.stringify(this.defaults));
  }

  /**
   * Fetches a value from the current configuration
   * @param  {string|Array<keys>} keys (dot-separated) string(s) or array of keys
   * @return {any}                that The retrived value
   */
  fetch(...keys) {
    return fetchFrom(this.current, ...normalizeKey(...keys));
  }

  /**
   * Deletes a value from the current configuration
   * @param {string|Array<keys>} keys (dot-separated) string(s) or array of keys
   */
  delete(...keys) {
    delete this.fetch(...keys);
  }

  /**
   * Sets a value in the current configuration
   * @param {string|Array<keys>} keys  (dot-separated) string(s) or array of keys
   * @param {any}                value The value to set
   */
  set(keys, value) {
    setIn(this.current, keys, value);
  }

  /**
   * Entends an oject value in the current configuration
   * @param {string|Array<keys>} keys  (dot-separated) string(s) or array of keys
   * @param {Object}             value The value to set
   */
  extend(keys, value) {
    extendIn(this.current, keys, value);
  }

  /**
   * Reset the current configuration back to defaults
   * @param {string|Array<keys>} keys  (dot-separated) string(s) or array of keys
   * @param {Object}             value The value to set
   */
  reset(keys = []) {
    setIn(this, ['current', ...keys], JSON.parse(JSON.stringify(fetchFrom(this, ['defaults', ...keys]))));
  }
}

/**
 * Used to normalize keys of mixed array and dot-separated string to a single string array
 * @param  {string|Array<keys>} keys    (dot-separated) string(s) or array of keys
 * @param  {Array}              ...rest Rest of the arguments
 * @return {Array}              that    The key normalized to an array of strings
 */
export function normalizeKey(key, ...rest) {
  let normalized = Array.isArray(key) ? normalizeKey(...key) : key.split('.');

  return rest.length === 0 ? normalized : normalized.concat(normalizeKey(...rest));
}


/**
 * Fetches value from (nested) object with a normalized key
 * @param  {Object}             data    The data to fetch data from
 * @param  {string|Array<keys>} keys    (dot-separated) string(s) or array of keys
 * @param  {Array}              ...rest Rest of the arguments
 * @return {any}                that    The retrieved value from the data
 */
export function fetchFrom(data, key, ...rest) {
  return rest.length === 0 ? data[key] : fetchFrom(data[key], ...rest);
}

/**
 * Sets a value in data object
 * @param {Object}             data  The data to set value in
 * @param {string|Array<keys>} keys  (dot-separated) string(s) or array of keys
 * @param {any}                value The value to set
 */
export function setIn(data, keys, value) {
  let normalizedKey = normalizeKey(keys);
  let key = normalizedKey.pop();
  (fetchFrom(data, ...normalizedKey) || data)[key] = value;
}

/**
 * Entends an oject value in data object
 * @param {Object}             data  The data to extend
 * @param {string|Array<keys>} keys  (dot-separated) string(s) or array of keys
 * @param {Object}             value The value to set
 */
export function extendIn(data, keys, value) {
  let normalizedKey = normalizeKey(keys);
  let key = normalizedKey.pop();
  let ref = fetchFrom(data, ...normalizedKey) || data;
  ref[key] = extend(true, ref[key], value);
}
