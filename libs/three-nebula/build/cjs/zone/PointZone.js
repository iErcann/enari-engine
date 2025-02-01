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

var _Util = _interopRequireDefault(require("../utils/Util"));

var _Zone2 = _interopRequireDefault(require("./Zone"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PointZone = /*#__PURE__*/function (_Zone) {
  (0, _inherits2["default"])(PointZone, _Zone);

  var _super = _createSuper(PointZone);

  /**
   * PointZone is a point zone
   * @param {Number|Vector3D} x - the center's x value or a Vector3D Object
   * @param {Number} y - the center's y value
   * @param {Number} z - the center's z value
   * @example
   * var pointZone = new System.PointZone(0,30,10);
   * or
   * var pointZone = new System.PointZone(new System.Vector3D(0,30,10));
   * @extends {Zone}
   * @constructor
   */
  function PointZone(a, b, c) {
    var _this;

    (0, _classCallCheck2["default"])(this, PointZone);
    _this = _super.call(this, _types.ZONE_TYPE_POINT); // TODO see below, these should probably be assigned properly
    // eslint-disable-next-line

    var x, y, z;

    if (_Util["default"].isUndefined(a, b, c)) {
      x = y = z = 0;
    } else {
      x = a; // eslint-disable-next-line

      y = b; // eslint-disable-next-line

      z = c;
    }

    _this.x = x; // TODO shouldn't this be set to y?

    _this.y = x; // TODO shouldn't this be set to z?

    _this.z = x;
    _this.supportsCrossing = false;
    return _this;
  }
  /**
   * Returns true to indicate this is a PointZone.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(PointZone, [{
    key: "isPointZone",
    value: function isPointZone() {
      return true;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      this.vector.x = this.x;
      this.vector.y = this.y;
      this.vector.z = this.z;
      return this.vector;
    }
  }]);
  return PointZone;
}(_Zone2["default"]);

exports["default"] = PointZone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1BvaW50Wm9uZS5qcyJdLCJuYW1lcyI6WyJQb2ludFpvbmUiLCJhIiwiYiIsImMiLCJ0eXBlIiwieCIsInkiLCJ6IiwiVXRpbCIsImlzVW5kZWZpbmVkIiwic3VwcG9ydHNDcm9zc2luZyIsInZlY3RvciIsIlpvbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0lBRXFCQSxTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxDQUFsQixFQUFxQjtBQUFBOztBQUFBO0FBQ25CLDhCQUFNQyxzQkFBTixFQURtQixDQUduQjtBQUNBOztBQUNBLFFBQUlDLENBQUosRUFBT0MsQ0FBUCxFQUFVQyxDQUFWOztBQUVBLFFBQUlDLGlCQUFLQyxXQUFMLENBQWlCUixDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJDLENBQXZCLENBQUosRUFBK0I7QUFDN0JFLE1BQUFBLENBQUMsR0FBR0MsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsQ0FBWjtBQUNELEtBRkQsTUFFTztBQUNMRixNQUFBQSxDQUFDLEdBQUdKLENBQUosQ0FESyxDQUVMOztBQUNBSyxNQUFBQSxDQUFDLEdBQUdKLENBQUosQ0FISyxDQUlMOztBQUNBSyxNQUFBQSxDQUFDLEdBQUdKLENBQUo7QUFDRDs7QUFFRCxVQUFLRSxDQUFMLEdBQVNBLENBQVQsQ0FqQm1CLENBbUJuQjs7QUFDQSxVQUFLQyxDQUFMLEdBQVNELENBQVQsQ0FwQm1CLENBc0JuQjs7QUFDQSxVQUFLRSxDQUFMLEdBQVNGLENBQVQ7QUFDQSxVQUFLSyxnQkFBTCxHQUF3QixLQUF4QjtBQXhCbUI7QUF5QnBCO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7a0NBQ2dCO0FBQ1osYUFBTyxJQUFQO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUtDLE1BQUwsQ0FBWU4sQ0FBWixHQUFnQixLQUFLQSxDQUFyQjtBQUNBLFdBQUtNLE1BQUwsQ0FBWUwsQ0FBWixHQUFnQixLQUFLQSxDQUFyQjtBQUNBLFdBQUtLLE1BQUwsQ0FBWUosQ0FBWixHQUFnQixLQUFLQSxDQUFyQjtBQUVBLGFBQU8sS0FBS0ksTUFBWjtBQUNEOzs7RUF2RG9DQyxpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlsIGZyb20gJy4uL3V0aWxzL1V0aWwnO1xuaW1wb3J0IFpvbmUgZnJvbSAnLi9ab25lJztcbmltcG9ydCB7IFpPTkVfVFlQRV9QT0lOVCBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50Wm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogUG9pbnRab25lIGlzIGEgcG9pbnQgem9uZVxuICAgKiBAcGFyYW0ge051bWJlcnxWZWN0b3IzRH0geCAtIHRoZSBjZW50ZXIncyB4IHZhbHVlIG9yIGEgVmVjdG9yM0QgT2JqZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gdGhlIGNlbnRlcidzIHkgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogLSB0aGUgY2VudGVyJ3MgeiB2YWx1ZVxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgcG9pbnRab25lID0gbmV3IFN5c3RlbS5Qb2ludFpvbmUoMCwzMCwxMCk7XG4gICAqIG9yXG4gICAqIHZhciBwb2ludFpvbmUgPSBuZXcgU3lzdGVtLlBvaW50Wm9uZShuZXcgU3lzdGVtLlZlY3RvcjNEKDAsMzAsMTApKTtcbiAgICogQGV4dGVuZHMge1pvbmV9XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgLy8gVE9ETyBzZWUgYmVsb3csIHRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSBhc3NpZ25lZCBwcm9wZXJseVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHZhciB4LCB5LCB6O1xuXG4gICAgaWYgKFV0aWwuaXNVbmRlZmluZWQoYSwgYiwgYykpIHtcbiAgICAgIHggPSB5ID0geiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBhO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB5ID0gYjtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgeiA9IGM7XG4gICAgfVxuXG4gICAgdGhpcy54ID0geDtcblxuICAgIC8vIFRPRE8gc2hvdWxkbid0IHRoaXMgYmUgc2V0IHRvIHk/XG4gICAgdGhpcy55ID0geDtcblxuICAgIC8vIFRPRE8gc2hvdWxkbid0IHRoaXMgYmUgc2V0IHRvIHo/XG4gICAgdGhpcy56ID0geDtcbiAgICB0aGlzLnN1cHBvcnRzQ3Jvc3NpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIFBvaW50Wm9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzUG9pbnRab25lKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55O1xuICAgIHRoaXMudmVjdG9yLnogPSB0aGlzLno7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cbn1cbiJdfQ==