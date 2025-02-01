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

var _Force2 = _interopRequireDefault(require("./Force"));

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that forces particles down the y axis.
 *
 */
var Gravity = /*#__PURE__*/function (_Force) {
  (0, _inherits2["default"])(Gravity, _Force);

  var _super = _createSuper(Gravity);

  /**
   * Constructs a Gravity behaviour instance.
   *
   * @param {number} gravity - the force to pull the particle down the y axis
   * @param {number} life - the life of the particle
   * @param {string} easing - the easing equation to use
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Gravity(gravity, life, easing) {
    var _this;

    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Gravity);
    _this = _super.call(this, 0, -gravity, 0, life, easing, isEnabled);
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.BEHAVIOUR_TYPE_GRAVITY;
    return _this;
  }

  (0, _createClass2["default"])(Gravity, null, [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var gravity = json.gravity,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Gravity(gravity, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Gravity;
}(_Force2["default"]);

exports["default"] = Gravity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvR3Jhdml0eS5qcyJdLCJuYW1lcyI6WyJHcmF2aXR5IiwiZ3Jhdml0eSIsImxpZmUiLCJlYXNpbmciLCJpc0VuYWJsZWQiLCJ0eXBlIiwianNvbiIsIkZvcmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxPOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxtQkFBWUMsT0FBWixFQUFxQkMsSUFBckIsRUFBMkJDLE1BQTNCLEVBQXFEO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUNuRCw4QkFBTSxDQUFOLEVBQVMsQ0FBQ0gsT0FBVixFQUFtQixDQUFuQixFQUFzQkMsSUFBdEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxTQUFwQztBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLElBQUwsR0FBWUEsNkJBQVo7QUFQbUQ7QUFRcEQ7Ozs7NkJBRWVDLEksRUFBTTtBQUFBLFVBQ1pMLE9BRFksR0FDZ0NLLElBRGhDLENBQ1pMLE9BRFk7QUFBQSxVQUNIQyxJQURHLEdBQ2dDSSxJQURoQyxDQUNISixJQURHO0FBQUEsVUFDR0MsTUFESCxHQUNnQ0csSUFEaEMsQ0FDR0gsTUFESDtBQUFBLDRCQUNnQ0csSUFEaEMsQ0FDV0YsU0FEWDtBQUFBLFVBQ1dBLFNBRFgsZ0NBQ3VCLElBRHZCO0FBR3BCLGFBQU8sSUFBSUosT0FBSixDQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQiwyQkFBZ0JDLE1BQWhCLENBQTNCLEVBQW9EQyxTQUFwRCxDQUFQO0FBQ0Q7OztFQXhCa0NHLGtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZvcmNlIGZyb20gJy4vRm9yY2UnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9HUkFWSVRZIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBmb3JjZXMgcGFydGljbGVzIGRvd24gdGhlIHkgYXhpcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZpdHkgZXh0ZW5kcyBGb3JjZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgR3Jhdml0eSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBncmF2aXR5IC0gdGhlIGZvcmNlIHRvIHB1bGwgdGhlIHBhcnRpY2xlIGRvd24gdGhlIHkgYXhpc1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIHRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZWFzaW5nIC0gdGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2VcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIHdpbGwgYmUgYXBwbGllZCBvciBub3RcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihncmF2aXR5LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcigwLCAtZ3Jhdml0eSwgMCwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IGdyYXZpdHksIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgR3Jhdml0eShncmF2aXR5LCBsaWZlLCBnZXRFYXNpbmdCeU5hbWUoZWFzaW5nKSwgaXNFbmFibGVkKTtcbiAgfVxufVxuIl19