"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PUID = _interopRequireDefault(require("../utils/PUID"));

var _types = require("./types");

/**
 * An object pool implementation. Used for pooling objects to avoid unnecessary
 * garbage collection.
 *
 */
var Pool = /*#__PURE__*/function () {
  /**
   * Constructs a Pool instance.
   *
   * @return void
   */
  function Pool() {
    (0, _classCallCheck2["default"])(this, Pool);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = _types.CORE_TYPE_POOL;
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


  (0, _createClass2["default"])(Pool, [{
    key: "create",
    value: function create(functionOrObject) {
      if (!this.canCreateNewObject(functionOrObject)) {
        throw new Error('The pool is unable to create or clone the object supplied');
      }

      this.cID++;

      if (this.canInstantiateObject(functionOrObject)) {
        for (var _len = arguments.length, constructorArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          constructorArgs[_key - 1] = arguments[_key];
        }

        return (0, _construct2["default"])(functionOrObject, constructorArgs);
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

  }, {
    key: "canInstantiateObject",
    value: function canInstantiateObject(object) {
      return typeof object === 'function';
    }
    /**
     * Determines if the object is able to be cloned or not.
     *
     * @param {object} object - The object to check
     * @return {boolean}
     */

  }, {
    key: "canCloneObject",
    value: function canCloneObject(object) {
      return object.clone && typeof object.clone === 'function';
    }
    /**
     * Determines if a new object is able to be created.
     *
     * @param {object} object - The object to check
     * @return {boolean}
     */

  }, {
    key: "canCreateNewObject",
    value: function canCreateNewObject(object) {
      return this.canInstantiateObject(object) || this.canCloneObject(object) ? true : false;
    }
    /**
     * Gets a count of all objects in the pool.
     *
     * @return {integer}
     */

  }, {
    key: "getCount",
    value: function getCount() {
      var count = 0;

      for (var id in this.list) {
        count += this.list[id].length;
      }

      return count++;
    }
    /**
     * Gets an object either by creating a new one or retrieving it from the pool.
     *
     * @param {function|object} obj - The function or object to get
     * @param {array} args - The args to pass to the function on creation
     * @return {object}
     */

  }, {
    key: "get",
    value: function get(obj) {
      var p,
          puid = obj.__puid || _PUID["default"].id(obj);

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this.list[puid] && this.list[puid].length > 0) p = this.list[puid].pop();else p = this.create.apply(this, [obj].concat(args));
      p.__puid = obj.__puid || puid;
      return p;
    }
    /**
     * Pushes an object into the pool.
     *
     * @param {object} obj - The object to expire
     * @return {integer}
     */

  }, {
    key: "expire",
    value: function expire(obj) {
      return this._getList(obj.__puid).push(obj);
    }
    /**
     * Destroys all pools.
     *
     * @return void
     */

  }, {
    key: "destroy",
    value: function destroy() {
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

  }, {
    key: "_getList",
    value: function _getList(uid) {
      uid = uid || 'default';
      if (!this.list[uid]) this.list[uid] = [];
      return this.list[uid];
    }
  }]);
  return Pool;
}();

exports["default"] = Pool;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1Bvb2wuanMiXSwibmFtZXMiOlsiUG9vbCIsInR5cGUiLCJjSUQiLCJsaXN0IiwiZnVuY3Rpb25Pck9iamVjdCIsImNhbkNyZWF0ZU5ld09iamVjdCIsIkVycm9yIiwiY2FuSW5zdGFudGlhdGVPYmplY3QiLCJjb25zdHJ1Y3RvckFyZ3MiLCJjYW5DbG9uZU9iamVjdCIsImNsb25lIiwib2JqZWN0IiwiY291bnQiLCJpZCIsImxlbmd0aCIsIm9iaiIsInAiLCJwdWlkIiwiX19wdWlkIiwiUFVJRCIsImFyZ3MiLCJwb3AiLCJjcmVhdGUiLCJfZ2V0TGlzdCIsInB1c2giLCJ1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLEk7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNFLGtCQUFjO0FBQUE7O0FBQ1o7QUFDSjtBQUNBO0FBQ0E7QUFDSSxTQUFLQyxJQUFMLEdBQVlBLHFCQUFaO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsR0FBTCxHQUFXLENBQVg7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7MkJBQ1NDLGdCLEVBQXNDO0FBQzNDLFVBQUksQ0FBQyxLQUFLQyxrQkFBTCxDQUF3QkQsZ0JBQXhCLENBQUwsRUFBZ0Q7QUFDOUMsY0FBTSxJQUFJRSxLQUFKLENBQ0osMkRBREksQ0FBTjtBQUdEOztBQUVELFdBQUtKLEdBQUw7O0FBRUEsVUFBSSxLQUFLSyxvQkFBTCxDQUEwQkgsZ0JBQTFCLENBQUosRUFBaUQ7QUFBQSwwQ0FUdkJJLGVBU3VCO0FBVHZCQSxVQUFBQSxlQVN1QjtBQUFBOztBQUMvQywyQ0FBV0osZ0JBQVgsRUFBK0JJLGVBQS9CO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLQyxjQUFMLENBQW9CTCxnQkFBcEIsQ0FBSixFQUEyQztBQUN6QyxlQUFPQSxnQkFBZ0IsQ0FBQ00sS0FBakIsRUFBUDtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7eUNBQ3VCQyxNLEVBQVE7QUFDM0IsYUFBTyxPQUFPQSxNQUFQLEtBQWtCLFVBQXpCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7bUNBQ2lCQSxNLEVBQVE7QUFDckIsYUFBT0EsTUFBTSxDQUFDRCxLQUFQLElBQWdCLE9BQU9DLE1BQU0sQ0FBQ0QsS0FBZCxLQUF3QixVQUEvQztBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O3VDQUNxQkMsTSxFQUFRO0FBQ3pCLGFBQU8sS0FBS0osb0JBQUwsQ0FBMEJJLE1BQTFCLEtBQXFDLEtBQUtGLGNBQUwsQ0FBb0JFLE1BQXBCLENBQXJDLEdBQ0gsSUFERyxHQUVILEtBRko7QUFHRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7K0JBQ2E7QUFDVCxVQUFJQyxLQUFLLEdBQUcsQ0FBWjs7QUFFQSxXQUFLLElBQUlDLEVBQVQsSUFBZSxLQUFLVixJQUFwQjtBQUEwQlMsUUFBQUEsS0FBSyxJQUFJLEtBQUtULElBQUwsQ0FBVVUsRUFBVixFQUFjQyxNQUF2QjtBQUExQjs7QUFFQSxhQUFPRixLQUFLLEVBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O3dCQUNNRyxHLEVBQWM7QUFDaEIsVUFBSUMsQ0FBSjtBQUFBLFVBQ0VDLElBQUksR0FBR0YsR0FBRyxDQUFDRyxNQUFKLElBQWNDLGlCQUFLTixFQUFMLENBQVFFLEdBQVIsQ0FEdkI7O0FBRGdCLHlDQUFOSyxJQUFNO0FBQU5BLFFBQUFBLElBQU07QUFBQTs7QUFJaEIsVUFBSSxLQUFLakIsSUFBTCxDQUFVYyxJQUFWLEtBQW1CLEtBQUtkLElBQUwsQ0FBVWMsSUFBVixFQUFnQkgsTUFBaEIsR0FBeUIsQ0FBaEQsRUFDRUUsQ0FBQyxHQUFHLEtBQUtiLElBQUwsQ0FBVWMsSUFBVixFQUFnQkksR0FBaEIsRUFBSixDQURGLEtBRUtMLENBQUMsR0FBRyxLQUFLTSxNQUFMLGNBQVlQLEdBQVosU0FBb0JLLElBQXBCLEVBQUo7QUFFTEosTUFBQUEsQ0FBQyxDQUFDRSxNQUFGLEdBQVdILEdBQUcsQ0FBQ0csTUFBSixJQUFjRCxJQUF6QjtBQUVBLGFBQU9ELENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU0QsRyxFQUFLO0FBQ1YsYUFBTyxLQUFLUSxRQUFMLENBQWNSLEdBQUcsQ0FBQ0csTUFBbEIsRUFBMEJNLElBQTFCLENBQStCVCxHQUEvQixDQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OzhCQUNZO0FBQ1IsV0FBSyxJQUFJRixFQUFULElBQWUsS0FBS1YsSUFBcEIsRUFBMEI7QUFDeEIsYUFBS0EsSUFBTCxDQUFVVSxFQUFWLEVBQWNDLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxlQUFPLEtBQUtYLElBQUwsQ0FBVVUsRUFBVixDQUFQO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDV1ksRyxFQUFLO0FBQ1pBLE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJLFNBQWI7QUFDQSxVQUFJLENBQUMsS0FBS3RCLElBQUwsQ0FBVXNCLEdBQVYsQ0FBTCxFQUFxQixLQUFLdEIsSUFBTCxDQUFVc0IsR0FBVixJQUFpQixFQUFqQjtBQUVyQixhQUFPLEtBQUt0QixJQUFMLENBQVVzQixHQUFWLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQVUlEIGZyb20gJy4uL3V0aWxzL1BVSUQnO1xuaW1wb3J0IHsgQ09SRV9UWVBFX1BPT0wgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuLyoqXG4gKiBBbiBvYmplY3QgcG9vbCBpbXBsZW1lbnRhdGlvbi4gVXNlZCBmb3IgcG9vbGluZyBvYmplY3RzIHRvIGF2b2lkIHVubmVjZXNzYXJ5XG4gKiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb29sIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBQb29sIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBJbmNyZW1lbnRpbmcgaWQgdGhhdCBrZWVwcyBhIGNvdW50IG9mIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBjcmVhdGVkXG4gICAgICogQHR5cGUge2ludGVnZXJ9XG4gICAgICovXG4gICAgdGhpcy5jSUQgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgTWFwIG9mIHBvb2xzIGluIHRoZSBmb3JtYXQgb2YgUFVJRDxTdHJpbmc+OiBwb29sPEFycmF5PlxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5saXN0ID0ge307XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBlaXRoZXIgYnkgY3JlYXRpbmcgYSBuZXcgaW5zdGFuY2Ugb3IgY2FsbGluZyBpdHNcbiAgICogY2xvbmUgbWV0aG9kLlxuICAgKlxuICAgKiBUT0RPIENPVkVSQUdFIC0gZm9yIHRoZSBjb25zdHJ1Y3RvckFyZ3NcbiAgICogQHBhcmFtIHtmdW5jdGlvbnxvYmplY3R9IGZ1bmN0aW9uT3JPYmplY3QgLSBUaGUgb2JqZWN0IHRvIGluc3RhbnRpYXRlIG9yIGNsb25lXG4gICAqIEByZXR1cm4ge29iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICBjcmVhdGUoZnVuY3Rpb25Pck9iamVjdCwgLi4uY29uc3RydWN0b3JBcmdzKSB7XG4gICAgaWYgKCF0aGlzLmNhbkNyZWF0ZU5ld09iamVjdChmdW5jdGlvbk9yT2JqZWN0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHBvb2wgaXMgdW5hYmxlIHRvIGNyZWF0ZSBvciBjbG9uZSB0aGUgb2JqZWN0IHN1cHBsaWVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmNJRCsrO1xuXG4gICAgaWYgKHRoaXMuY2FuSW5zdGFudGlhdGVPYmplY3QoZnVuY3Rpb25Pck9iamVjdCkpIHtcbiAgICAgIHJldHVybiBuZXcgZnVuY3Rpb25Pck9iamVjdCguLi5jb25zdHJ1Y3RvckFyZ3MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbkNsb25lT2JqZWN0KGZ1bmN0aW9uT3JPYmplY3QpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb25Pck9iamVjdC5jbG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBvYmplY3QgaXMgYWJsZSB0byBiZSBpbnN0YW50aWF0ZWQgb3Igbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjaGVja1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgY2FuSW5zdGFudGlhdGVPYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgb2JqZWN0IGlzIGFibGUgdG8gYmUgY2xvbmVkIG9yIG5vdC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY2hlY2tcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGNhbkNsb25lT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QuY2xvbmUgJiYgdHlwZW9mIG9iamVjdC5jbG9uZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGEgbmV3IG9iamVjdCBpcyBhYmxlIHRvIGJlIGNyZWF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNoZWNrXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBjYW5DcmVhdGVOZXdPYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuSW5zdGFudGlhdGVPYmplY3Qob2JqZWN0KSB8fCB0aGlzLmNhbkNsb25lT2JqZWN0KG9iamVjdClcbiAgICAgID8gdHJ1ZVxuICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgY291bnQgb2YgYWxsIG9iamVjdHMgaW4gdGhlIHBvb2wuXG4gICAqXG4gICAqIEByZXR1cm4ge2ludGVnZXJ9XG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5saXN0KSBjb3VudCArPSB0aGlzLmxpc3RbaWRdLmxlbmd0aDtcblxuICAgIHJldHVybiBjb3VudCsrO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gb2JqZWN0IGVpdGhlciBieSBjcmVhdGluZyBhIG5ldyBvbmUgb3IgcmV0cmlldmluZyBpdCBmcm9tIHRoZSBwb29sLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufG9iamVjdH0gb2JqIC0gVGhlIGZ1bmN0aW9uIG9yIG9iamVjdCB0byBnZXRcbiAgICogQHBhcmFtIHthcnJheX0gYXJncyAtIFRoZSBhcmdzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uIG9uIGNyZWF0aW9uXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIGdldChvYmosIC4uLmFyZ3MpIHtcbiAgICB2YXIgcCxcbiAgICAgIHB1aWQgPSBvYmouX19wdWlkIHx8IFBVSUQuaWQob2JqKTtcblxuICAgIGlmICh0aGlzLmxpc3RbcHVpZF0gJiYgdGhpcy5saXN0W3B1aWRdLmxlbmd0aCA+IDApXG4gICAgICBwID0gdGhpcy5saXN0W3B1aWRdLnBvcCgpO1xuICAgIGVsc2UgcCA9IHRoaXMuY3JlYXRlKG9iaiwgLi4uYXJncyk7XG5cbiAgICBwLl9fcHVpZCA9IG9iai5fX3B1aWQgfHwgcHVpZDtcblxuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hlcyBhbiBvYmplY3QgaW50byB0aGUgcG9vbC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gZXhwaXJlXG4gICAqIEByZXR1cm4ge2ludGVnZXJ9XG4gICAqL1xuICBleHBpcmUob2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldExpc3Qob2JqLl9fcHVpZCkucHVzaChvYmopO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFsbCBwb29scy5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGZvciAodmFyIGlkIGluIHRoaXMubGlzdCkge1xuICAgICAgdGhpcy5saXN0W2lkXS5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMubGlzdFtpZF07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBvb2wgbWFwcGVkIHRvIHRoZSBVSUQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1aWQgLSBUaGUgcG9vbCB1aWRcbiAgICogQHJldHVybiB7YXJyYXl9XG4gICAqL1xuICBfZ2V0TGlzdCh1aWQpIHtcbiAgICB1aWQgPSB1aWQgfHwgJ2RlZmF1bHQnO1xuICAgIGlmICghdGhpcy5saXN0W3VpZF0pIHRoaXMubGlzdFt1aWRdID0gW107XG5cbiAgICByZXR1cm4gdGhpcy5saXN0W3VpZF07XG4gIH1cbn1cbiJdfQ==