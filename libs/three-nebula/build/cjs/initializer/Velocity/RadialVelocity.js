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

var _math = require("../../math");

var _constants = require("../../constants");

var _Velocity2 = _interopRequireDefault(require("./Velocity"));

var _types = require("../types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the velocity property on initialized particles.
 *
 */
var RadialVelocity = /*#__PURE__*/function (_Velocity) {
  (0, _inherits2["default"])(RadialVelocity, _Velocity);

  var _super = _createSuper(RadialVelocity);

  /**
   * Constructs a RadialVelocity initializer.
   *
   * @param {number|Span} radius - The velocity radius
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  function RadialVelocity(radius, vector3d, theta) {
    var _this;

    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, RadialVelocity);
    _this = _super.call(this, _types.INITIALIZER_TYPE_RADIAL_VELOCITY, isEnabled);
    /**
     * @desc Velocity radius span.
     * @type {Span}
     */

    _this.radiusPan = (0, _math.createSpan)(radius);
    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */

    _this.dir = vector3d.clone().normalize();
    /**
     * @desc Theta.
     * @type {number}
     */

    _this.tha = theta * _constants.DR;
    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */

    _this._useV = true;
    return _this;
  }
  /**
   * Creates a RadialVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.radius - The velocity radius
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {RadialVelocity}
   */


  (0, _createClass2["default"])(RadialVelocity, null, [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var radius = json.radius,
          x = json.x,
          y = json.y,
          z = json.z,
          theta = json.theta,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new RadialVelocity(radius, new _math.Vector3D(x, y, z), theta, isEnabled);
    }
  }]);
  return RadialVelocity;
}(_Velocity2["default"]);

exports["default"] = RadialVelocity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9SYWRpYWxWZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJSYWRpYWxWZWxvY2l0eSIsInJhZGl1cyIsInZlY3RvcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJ0eXBlIiwicmFkaXVzUGFuIiwiZGlyIiwiY2xvbmUiLCJub3JtYWxpemUiLCJ0aGEiLCJEUiIsIl91c2VWIiwianNvbiIsIngiLCJ5IiwieiIsIlZlY3RvcjNEIiwiVmVsb2NpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLGM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSwwQkFBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEJDLEtBQTlCLEVBQXVEO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUNyRCw4QkFBTUMsdUNBQU4sRUFBWUQsU0FBWjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtFLFNBQUwsR0FBaUIsc0JBQVdMLE1BQVgsQ0FBakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLTSxHQUFMLEdBQVdMLFFBQVEsQ0FBQ00sS0FBVCxHQUFpQkMsU0FBakIsRUFBWDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLEdBQUwsR0FBV1AsS0FBSyxHQUFHUSxhQUFuQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLEtBQUwsR0FBYSxJQUFiO0FBekJxRDtBQTBCdEQ7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs2QkFDa0JDLEksRUFBTTtBQUFBLFVBQ1paLE1BRFksR0FDaUNZLElBRGpDLENBQ1paLE1BRFk7QUFBQSxVQUNKYSxDQURJLEdBQ2lDRCxJQURqQyxDQUNKQyxDQURJO0FBQUEsVUFDREMsQ0FEQyxHQUNpQ0YsSUFEakMsQ0FDREUsQ0FEQztBQUFBLFVBQ0VDLENBREYsR0FDaUNILElBRGpDLENBQ0VHLENBREY7QUFBQSxVQUNLYixLQURMLEdBQ2lDVSxJQURqQyxDQUNLVixLQURMO0FBQUEsNEJBQ2lDVSxJQURqQyxDQUNZVCxTQURaO0FBQUEsVUFDWUEsU0FEWixnQ0FDd0IsSUFEeEI7QUFHcEIsYUFBTyxJQUFJSixjQUFKLENBQW1CQyxNQUFuQixFQUEyQixJQUFJZ0IsY0FBSixDQUFhSCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsQ0FBM0IsRUFBa0RiLEtBQWxELEVBQXlEQyxTQUF6RCxDQUFQO0FBQ0Q7OztFQXBEeUNjLHFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjdG9yM0QsIGNyZWF0ZVNwYW4gfSBmcm9tICcuLi8uLi9tYXRoJztcblxuaW1wb3J0IHsgRFIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xuaW1wb3J0IFZlbG9jaXR5IGZyb20gJy4vVmVsb2NpdHknO1xuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9SQURJQUxfVkVMT0NJVFkgYXMgdHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBTZXRzIHRoZSB2ZWxvY2l0eSBwcm9wZXJ0eSBvbiBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpYWxWZWxvY2l0eSBleHRlbmRzIFZlbG9jaXR5IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBSYWRpYWxWZWxvY2l0eSBpbml0aWFsaXplci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ8U3Bhbn0gcmFkaXVzIC0gVGhlIHZlbG9jaXR5IHJhZGl1c1xuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB2ZWN0b3IzZCAtIFRoZSBkaXJlY3Rpb25hbCB2ZWN0b3IgZm9yIHRoZSB2ZWxvY2l0eVxuICAgKiBAcGFyYW0ge251bWJlcn0gdGhldGEgLSBUaGUgdGhldGEgYW5nbGUgdG8gdXNlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IocmFkaXVzLCB2ZWN0b3IzZCwgdGhldGEsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVmVsb2NpdHkgcmFkaXVzIHNwYW4uXG4gICAgICogQHR5cGUge1NwYW59XG4gICAgICovXG4gICAgdGhpcy5yYWRpdXNQYW4gPSBjcmVhdGVTcGFuKHJhZGl1cyk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBEaXJlY3Rpb24gdmVjdG9yLlxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLmRpciA9IHZlY3RvcjNkLmNsb25lKCkubm9ybWFsaXplKCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGV0YS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMudGhhID0gdGhldGEgKiBEUjtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERldGVybWluZXMgd2hldGhlciB0byB1c2UgdGhlIGRpcmVjdGlvbmFsIHZlY3RvciBvciBub3QuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fdXNlViA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFJhZGlhbFZlbG9jaXR5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnJhZGl1cyAtIFRoZSB2ZWxvY2l0eSByYWRpdXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueCAtIFRoZSB2ZWxvY2l0eSB4IGF4aXMgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnkgLSBUaGUgdmVsb2NpdHkgeSBheGlzIGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi56IC0gVGhlIHZlbG9jaXR5IHogYXhpcyBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24udGhldGEgLSBUaGUgdmVsb2NpdHkgdGhldGFcbiAgICogQHJldHVybiB7UmFkaWFsVmVsb2NpdHl9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgcmFkaXVzLCB4LCB5LCB6LCB0aGV0YSwgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgUmFkaWFsVmVsb2NpdHkocmFkaXVzLCBuZXcgVmVjdG9yM0QoeCwgeSwgeiksIHRoZXRhLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=