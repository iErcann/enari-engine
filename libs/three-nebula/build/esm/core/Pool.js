import PUID from '../utils/PUID';
import { CORE_TYPE_POOL as type } from './types';
/**
 * An object pool implementation. Used for pooling objects to avoid unnecessary
 * garbage collection.
 *
 */

export default class Pool {
  /**
   * Constructs a Pool instance.
   *
   * @return void
   */
  constructor() {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    /**
     * @desc Incrementing id that keeps a count of the number of objects created
     * @type {integer}
     */

    this.cID = 0;
    /**
     * @desc Map of pools in the format of PUID<String>: pool<Array>
     * @type {object}
     */

    this.list = {};
  }
  /**
   * Attempts to create a new object either by creating a new instance or calling its
   * clone method.
   *
   * TODO COVERAGE - for the constructorArgs
   * @param {function|object} functionOrObject - The object to instantiate or clone
   * @return {object|undefined}
   */


  create(functionOrObject, ...constructorArgs) {
    if (!this.canCreateNewObject(functionOrObject)) {
      throw new Error('The pool is unable to create or clone the object supplied');
    }

    this.cID++;

    if (this.canInstantiateObject(functionOrObject)) {
      return new functionOrObject(...constructorArgs);
    }

    if (this.canCloneObject(functionOrObject)) {
      return functionOrObject.clone();
    }
  }
  /**
   * Determines if the object is able to be instantiated or not.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */


  canInstantiateObject(object) {
    return typeof object === 'function';
  }
  /**
   * Determines if the object is able to be cloned or not.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */


  canCloneObject(object) {
    return object.clone && typeof object.clone === 'function';
  }
  /**
   * Determines if a new object is able to be created.
   *
   * @param {object} object - The object to check
   * @return {boolean}
   */


  canCreateNewObject(object) {
    return this.canInstantiateObject(object) || this.canCloneObject(object) ? true : false;
  }
  /**
   * Gets a count of all objects in the pool.
   *
   * @return {integer}
   */


  getCount() {
    var count = 0;

    for (var id in this.list) count += this.list[id].length;

    return count++;
  }
  /**
   * Gets an object either by creating a new one or retrieving it from the pool.
   *
   * @param {function|object} obj - The function or object to get
   * @param {array} args - The args to pass to the function on creation
   * @return {object}
   */


  get(obj, ...args) {
    var p,
        puid = obj.__puid || PUID.id(obj);
    if (this.list[puid] && this.list[puid].length > 0) p = this.list[puid].pop();else p = this.create(obj, ...args);
    p.__puid = obj.__puid || puid;
    return p;
  }
  /**
   * Pushes an object into the pool.
   *
   * @param {object} obj - The object to expire
   * @return {integer}
   */


  expire(obj) {
    return this._getList(obj.__puid).push(obj);
  }
  /**
   * Destroys all pools.
   *
   * @return void
   */


  destroy() {
    for (var id in this.list) {
      this.list[id].length = 0;
      delete this.list[id];
    }
  }
  /**
   * Gets the pool mapped to the UID.
   *
   * @param {string} uid - The pool uid
   * @return {array}
   */


  _getList(uid) {
    uid = uid || 'default';
    if (!this.list[uid]) this.list[uid] = [];
    return this.list[uid];
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1Bvb2wuanMiXSwibmFtZXMiOlsiUFVJRCIsIkNPUkVfVFlQRV9QT09MIiwidHlwZSIsIlBvb2wiLCJjb25zdHJ1Y3RvciIsImNJRCIsImxpc3QiLCJjcmVhdGUiLCJmdW5jdGlvbk9yT2JqZWN0IiwiY29uc3RydWN0b3JBcmdzIiwiY2FuQ3JlYXRlTmV3T2JqZWN0IiwiRXJyb3IiLCJjYW5JbnN0YW50aWF0ZU9iamVjdCIsImNhbkNsb25lT2JqZWN0IiwiY2xvbmUiLCJvYmplY3QiLCJnZXRDb3VudCIsImNvdW50IiwiaWQiLCJsZW5ndGgiLCJnZXQiLCJvYmoiLCJhcmdzIiwicCIsInB1aWQiLCJfX3B1aWQiLCJwb3AiLCJleHBpcmUiLCJfZ2V0TGlzdCIsInB1c2giLCJkZXN0cm95IiwidWlkIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxJQUFQLE1BQWlCLGVBQWpCO0FBQ0EsU0FBU0MsY0FBYyxJQUFJQyxJQUEzQixRQUF1QyxTQUF2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxJQUFOLENBQVc7QUFDeEI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxXQUFXLEdBQUc7QUFDWjtBQUNKO0FBQ0E7QUFDQTtBQUNJLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtHLEdBQUwsR0FBVyxDQUFYO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxNQUFNLENBQUNDLGdCQUFELEVBQW1CLEdBQUdDLGVBQXRCLEVBQXVDO0FBQzNDLFFBQUksQ0FBQyxLQUFLQyxrQkFBTCxDQUF3QkYsZ0JBQXhCLENBQUwsRUFBZ0Q7QUFDOUMsWUFBTSxJQUFJRyxLQUFKLENBQ0osMkRBREksQ0FBTjtBQUdEOztB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QUFpQixFQUFqQjtBQUVyQixXQUFPLEtBQUt6QixJQUFMLENBQVV5QixHQUFWLENBQVA7QUFDRDs7QUFySnVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBVSUQgZnJvbSAnLi4vdXRpbHMvUFVJRCc7XG5pbXBvcnQgeyBDT1JFX1RZUEVfUE9PTCBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG4vKipcbiAqIEFuIG9iamVjdCBwb29sIGltcGxlbWVudGF0aW9uLiBVc2VkIGZvciBwb29saW5nIG9iamVjdHMgdG8gYXZvaWQgdW5uZWNlc3NhcnlcbiAqIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFBvb2wgaW5zdGFuY2UuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIEluY3JlbWVudGluZyBpZCB0aGF0IGtlZXBzIGEgY291bnQgb2YgdGhlIG51bWJlciBvZiBvYmplY3RzIGNyZWF0ZWRcbiAgICAgKiBAdHlwZSB7aW50ZWdlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNJRCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBNYXAgb2YgcG9vbHMgaW4gdGhlIGZvcm1hdCBvZiBQVUlEPFN0cmluZz46IHBvb2w8QXJyYXk+XG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmxpc3QgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGVpdGhlciBieSBjcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBvciBjYWxsaW5nIGl0c1xuICAgKiBjbG9uZSBtZXRob2QuXG4gICAqXG4gICAqIFRPRE8gQ09WRVJBR0UgLSBmb3IgdGhlIGNvbnN0cnVjdG9yQXJnc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufG9iamVjdH0gZnVuY3Rpb25Pck9iamVjdCAtIFRoZSBvYmplY3QgdG8gaW5zdGFudGlhdGUgb3IgY2xvbmVcbiAgICogQHJldHVybiB7b2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGNyZWF0ZShmdW5jdGlvbk9yT2JqZWN0LCAuLi5jb25zdHJ1Y3RvckFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuY2FuQ3JlYXRlTmV3T2JqZWN0KGZ1bmN0aW9uT3JPYmplY3QpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgcG9vbCBpcyB1bmFibGUgdG8gY3JlYXRlIG9yIGNsb25lIHRoZSBvYmplY3Qgc3VwcGxpZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY0lEKys7XG5cbiAgICBpZiAodGhpcy5jYW5JbnN0YW50aWF0ZU9iamVjdChmdW5jdGlvbk9yT2JqZWN0KSkge1xuICAgICAgcmV0dXJuIG5ldyBmdW5jdGlvbk9yT2JqZWN0KC4uLmNvbnN0cnVjdG9yQXJncyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FuQ2xvbmVPYmplY3QoZnVuY3Rpb25Pck9iamVjdCkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbk9yT2JqZWN0LmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIG9iamVjdCBpcyBhYmxlIHRvIGJlIGluc3RhbnRpYXRlZCBvciBub3QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNoZWNrXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBjYW5JbnN0YW50aWF0ZU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBvYmplY3QgaXMgYWJsZSB0byBiZSBjbG9uZWQgb3Igbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjaGVja1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgY2FuQ2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5jbG9uZSAmJiB0eXBlb2Ygb2JqZWN0LmNsb25lID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgYSBuZXcgb2JqZWN0IGlzIGFibGUgdG8gYmUgY3JlYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY2hlY2tcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGNhbkNyZWF0ZU5ld09iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5jYW5JbnN0YW50aWF0ZU9iamVjdChvYmplY3QpIHx8IHRoaXMuY2FuQ2xvbmVPYmplY3Qob2JqZWN0KVxuICAgICAgPyB0cnVlXG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBjb3VudCBvZiBhbGwgb2JqZWN0cyBpbiB0aGUgcG9vbC5cbiAgICpcbiAgICogQHJldHVybiB7aW50ZWdlcn1cbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmxpc3QpIGNvdW50ICs9IHRoaXMubGlzdFtpZF0ubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBvYmplY3QgZWl0aGVyIGJ5IGNyZWF0aW5nIGEgbmV3IG9uZSBvciByZXRyaWV2aW5nIGl0IGZyb20gdGhlIHBvb2wuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb258b2JqZWN0fSBvYmogLSBUaGUgZnVuY3Rpb24gb3Igb2JqZWN0IHRvIGdldFxuICAgKiBAcGFyYW0ge2FycmF5fSBhcmdzIC0gVGhlIGFyZ3MgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24gb24gY3JlYXRpb25cbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKi9cbiAgZ2V0KG9iaiwgLi4uYXJncykge1xuICAgIHZhciBwLFxuICAgICAgcHVpZCA9IG9iai5fX3B1aWQgfHwgUFVJRC5pZChvYmopO1xuXG4gICAgaWYgKHRoaXMubGlzdFtwdWlkXSAmJiB0aGlzLmxpc3RbcHVpZF0ubGVuZ3RoID4gMClcbiAgICAgIHAgPSB0aGlzLmxpc3RbcHVpZF0ucG9wKCk7XG4gICAgZWxzZSBwID0gdGhpcy5jcmVhdGUob2JqLCAuLi5hcmdzKTtcblxuICAgIHAuX19wdWlkID0gb2JqLl9fcHVpZCB8fCBwdWlkO1xuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIGFuIG9iamVjdCBpbnRvIHRoZSBwb29sLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBleHBpcmVcbiAgICogQHJldHVybiB7aW50ZWdlcn1cbiAgICovXG4gIGV4cGlyZShvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0TGlzdChvYmouX19wdWlkKS5wdXNoKG9iaik7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYWxsIHBvb2xzLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5saXN0KSB7XG4gICAgICB0aGlzLmxpc3RbaWRdLmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5saXN0W2lkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcG9vbCBtYXBwZWQgdG8gdGhlIFVJRC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVpZCAtIFRoZSBwb29sIHVpZFxuICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICovXG4gIF9nZXRMaXN0KHVpZCkge1xuICAgIHVpZCA9IHVpZCB8fCAnZGVmYXVsdCc7XG4gICAgaWYgKCF0aGlzLmxpc3RbdWlkXSkgdGhpcy5saXN0W3VpZF0gPSBbXTtcblxuICAgIHJldHVybiB0aGlzLmxpc3RbdWlkXTtcbiAgfVxufVxuIl19