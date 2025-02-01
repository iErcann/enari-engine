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
 * Sets the mass property on initialized particles.
 *
 */
var Mass = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Mass, _Initializer);

  var _super = _createSuper(Mass);

  /**
   * Constructs a Mass initializer instance.
   *
   * @param {number} min - The minumum mass for the particle
   * @param {number} max - The maximum mass for the particle
   * @param {boolean} [center] - Determines whether to average the mass value
   * @return void
   */
  function Mass(min, max) {
    var _this;

    var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Mass);
    _this = _super.call(this, _types.INITIALIZER_TYPE_MASS, isEnabled);
    /**
     * @desc The mass span which is used to set the particle mass value.
     * @type {Span}
     */

    _this.massPan = (0, _math.createSpan)(min, max, center);
    return _this;
  }
  /**
   * Sets the particle's initial mass.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  (0, _createClass2["default"])(Mass, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.mass = this.massPan.getValue();
    }
    /**
     * Creates a Mass initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.min - The minimum mass
     * @property {number} json.max - The maximum mass
     * @property {number} json.center - The center of the mass
     * @return {Mass}
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
      return new Mass(min, max, center, isEnabled);
    }
  }]);
  return Mass;
}(_Initializer2["default"]);

exports["default"] = Mass;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9NYXNzLmpzIl0sIm5hbWVzIjpbIk1hc3MiLCJtaW4iLCJtYXgiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJ0eXBlIiwibWFzc1BhbiIsInBhcnRpY2xlIiwibWFzcyIsImdldFZhbHVlIiwianNvbiIsIkluaXRpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxJOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsZ0JBQVlDLEdBQVosRUFBaUJDLEdBQWpCLEVBQXdEO0FBQUE7O0FBQUEsUUFBbENDLE1BQWtDLHVFQUF6QixLQUF5QjtBQUFBLFFBQWxCQyxTQUFrQix1RUFBTixJQUFNO0FBQUE7QUFDdEQsOEJBQU1DLDRCQUFOLEVBQVlELFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLRSxPQUFMLEdBQWUsc0JBQVdMLEdBQVgsRUFBZ0JDLEdBQWhCLEVBQXFCQyxNQUFyQixDQUFmO0FBUHNEO0FBUXZEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzsrQkFDYUksUSxFQUFVO0FBQ25CQSxNQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0IsS0FBS0YsT0FBTCxDQUFhRyxRQUFiLEVBQWhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NkJBQ2tCQyxJLEVBQU07QUFBQSxVQUNaVCxHQURZLEdBQ21DUyxJQURuQyxDQUNaVCxHQURZO0FBQUEsVUFDUEMsR0FETyxHQUNtQ1EsSUFEbkMsQ0FDUFIsR0FETztBQUFBLHlCQUNtQ1EsSUFEbkMsQ0FDRlAsTUFERTtBQUFBLFVBQ0ZBLE1BREUsNkJBQ08sS0FEUDtBQUFBLDRCQUNtQ08sSUFEbkMsQ0FDY04sU0FEZDtBQUFBLFVBQ2NBLFNBRGQsZ0NBQzBCLElBRDFCO0FBR3BCLGFBQU8sSUFBSUosSUFBSixDQUFTQyxHQUFULEVBQWNDLEdBQWQsRUFBbUJDLE1BQW5CLEVBQTJCQyxTQUEzQixDQUFQO0FBQ0Q7OztFQTFDK0JPLHdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3BhbiB9IGZyb20gJy4uL21hdGgnO1xuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9NQVNTIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXNzIHByb3BlcnR5IG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc3MgZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgTWFzcyBpbml0aWFsaXplciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbiAtIFRoZSBtaW51bXVtIG1hc3MgZm9yIHRoZSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4IC0gVGhlIG1heGltdW0gbWFzcyBmb3IgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcl0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgbWFzcyB2YWx1ZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1pbiwgbWF4LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgbWFzcyBzcGFuIHdoaWNoIGlzIHVzZWQgdG8gc2V0IHRoZSBwYXJ0aWNsZSBtYXNzIHZhbHVlLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMubWFzc1BhbiA9IGNyZWF0ZVNwYW4obWluLCBtYXgsIGNlbnRlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFydGljbGUncyBpbml0aWFsIG1hc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLm1hc3MgPSB0aGlzLm1hc3NQYW4uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgTWFzcyBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5taW4gLSBUaGUgbWluaW11bSBtYXNzXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLm1heCAtIFRoZSBtYXhpbXVtIG1hc3NcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uY2VudGVyIC0gVGhlIGNlbnRlciBvZiB0aGUgbWFzc1xuICAgKiBAcmV0dXJuIHtNYXNzfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IG1pbiwgbWF4LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgTWFzcyhtaW4sIG1heCwgY2VudGVyLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=