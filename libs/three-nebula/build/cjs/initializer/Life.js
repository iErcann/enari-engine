"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Initializer2 = _interopRequireDefault(require("./Initializer"));

var _math = require("../math");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the life property on initialized particles.
 *
 */
var Life = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Life, _Initializer);

  var _super = _createSuper(Life);

  /**
   * Constructs a Life property instance.
   *
   * @param {number} min - The minimum life
   * @param {number} max - The maximum life
   * @param {boolean} [center] - Determines whether to average the life value
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
   * @return void
   */
  function Life(min, max, center) {
    var _this;

    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Life);
    _this = _super.call(this, _types.INITIALIZER_TYPE_LIFE, isEnabled);
    /**
     * @desc The life span of the particle.
     * @type {Span}
     */

    _this.lifePan = (0, _math.createSpan)(min, max, center);
    return _this;
  }
  /**
   * Sets the particle's initial life.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  (0, _createClass2["default"])(Life, [{
    key: "initialize",
    value: function initialize(particle) {
      if (this.lifePan.a == Infinity || this.lifePan.a == 'infi') {
        particle.life = Infinity;
      } else {
        particle.life = this.lifePan.getValue();
      }
    }
    /**
     * Creates a Life initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @param {number} json.min - The minimum life time
     * @param {number} json.max - The maximum life time
     * @param {number} json.center - The center of the life time
     * @param {boolean} [json.isEnabled=true] - Determines if the initializer should be enabled or not
     * @return {Life}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var min = json.min,
          max = json.max,
          _json$center = json.center,
          center = _json$center === void 0 ? false : _json$center,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Life(min, max, center, isEnabled);
    }
  }]);
  return Life;
}(_Initializer2["default"]);

exports["default"] = Life;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9MaWZlLmpzIl0sIm5hbWVzIjpbIkxpZmUiLCJtaW4iLCJtYXgiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJ0eXBlIiwibGlmZVBhbiIsInBhcnRpY2xlIiwiYSIsIkluZmluaXR5IiwibGlmZSIsImdldFZhbHVlIiwianNvbiIsIkluaXRpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxJOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxnQkFBWUMsR0FBWixFQUFpQkMsR0FBakIsRUFBc0JDLE1BQXRCLEVBQWdEO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUM5Qyw4QkFBTUMsNEJBQU4sRUFBWUQsU0FBWjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtFLE9BQUwsR0FBZSxzQkFBV0wsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUJDLE1BQXJCLENBQWY7QUFQOEM7QUFRL0M7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OytCQUNhSSxRLEVBQVU7QUFDbkIsVUFBSSxLQUFLRCxPQUFMLENBQWFFLENBQWIsSUFBa0JDLFFBQWxCLElBQThCLEtBQUtILE9BQUwsQ0FBYUUsQ0FBYixJQUFrQixNQUFwRCxFQUE0RDtBQUMxREQsUUFBQUEsUUFBUSxDQUFDRyxJQUFULEdBQWdCRCxRQUFoQjtBQUNELE9BRkQsTUFFTztBQUNMRixRQUFBQSxRQUFRLENBQUNHLElBQVQsR0FBZ0IsS0FBS0osT0FBTCxDQUFhSyxRQUFiLEVBQWhCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNrQkMsSSxFQUFNO0FBQUEsVUFDWlgsR0FEWSxHQUNtQ1csSUFEbkMsQ0FDWlgsR0FEWTtBQUFBLFVBQ1BDLEdBRE8sR0FDbUNVLElBRG5DLENBQ1BWLEdBRE87QUFBQSx5QkFDbUNVLElBRG5DLENBQ0ZULE1BREU7QUFBQSxVQUNGQSxNQURFLDZCQUNPLEtBRFA7QUFBQSw0QkFDbUNTLElBRG5DLENBQ2NSLFNBRGQ7QUFBQSxVQUNjQSxTQURkLGdDQUMwQixJQUQxQjtBQUdwQixhQUFPLElBQUlKLElBQUosQ0FBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxNQUFuQixFQUEyQkMsU0FBM0IsQ0FBUDtBQUNEOzs7RUFoRCtCUyx3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcbmltcG9ydCB7IGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfTElGRSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlmZSBwcm9wZXJ0eSBvbiBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIExpZmUgcHJvcGVydHkgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSBUaGUgbWluaW11bSBsaWZlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXggLSBUaGUgbWF4aW11bSBsaWZlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcl0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgbGlmZSB2YWx1ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBpbml0aWFsaXplciBzaG91bGQgYmUgZW5hYmxlZCBvciBub3RcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtaW4sIG1heCwgY2VudGVyLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBsaWZlIHNwYW4gb2YgdGhlIHBhcnRpY2xlLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMubGlmZVBhbiA9IGNyZWF0ZVNwYW4obWluLCBtYXgsIGNlbnRlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFydGljbGUncyBpbml0aWFsIGxpZmUuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmxpZmVQYW4uYSA9PSBJbmZpbml0eSB8fCB0aGlzLmxpZmVQYW4uYSA9PSAnaW5maScpIHtcbiAgICAgIHBhcnRpY2xlLmxpZmUgPSBJbmZpbml0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUubGlmZSA9IHRoaXMubGlmZVBhbi5nZXRWYWx1ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgTGlmZSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi5taW4gLSBUaGUgbWluaW11bSBsaWZlIHRpbWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ubWF4IC0gVGhlIG1heGltdW0gbGlmZSB0aW1lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLmNlbnRlciAtIFRoZSBjZW50ZXIgb2YgdGhlIGxpZmUgdGltZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtqc29uLmlzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGluaXRpYWxpemVyIHNob3VsZCBiZSBlbmFibGVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHtMaWZlfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IG1pbiwgbWF4LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgTGlmZShtaW4sIG1heCwgY2VudGVyLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=