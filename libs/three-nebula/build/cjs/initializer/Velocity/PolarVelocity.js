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

var _constants = require("../../constants");

var _math = require("../../math");

var _Velocity2 = _interopRequireDefault(require("./Velocity"));

var _types = require("../types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the velocity property on initialized particles.
 *
 */
var PolarVelocity = /*#__PURE__*/function (_Velocity) {
  (0, _inherits2["default"])(PolarVelocity, _Velocity);

  var _super = _createSuper(PolarVelocity);

  /**
   * Constructs a PolarVelocity initializer.
   *
   * @param {Polar3D} polar3d - The polar vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  function PolarVelocity(polar3d, theta) {
    var _this;

    var isEnabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    (0, _classCallCheck2["default"])(this, PolarVelocity);
    _this = _super.call(this, _types.INITIALIZER_TYPE_POLAR_VELOCITY, isEnabled);
    /**
     * @desc Theta.
     * @type {number}
     */

    _this.tha = theta * _constants.DR;
    /**
     * @desc Directional vector
     * @type {Vector3D}
     */

    _this.dirVec = polar3d.toVector3D();
    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */

    _this._useV = false;
    return _this;
  }
  /**
   * Creates a PolarVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.polarRadius - The Polar3D radius
   * @param {number} json.polarTheta - The Polar3D theta
   * @param {number} json.polarPhi - The Polar3D phi
   * @param {number} json.velocityTheta - The velocity theta
   * @return {PolarVelocity}
   */


  (0, _createClass2["default"])(PolarVelocity, null, [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var polarRadius = json.polarRadius,
          polarTheta = json.polarTheta,
          polarPhi = json.polarPhi,
          velocityTheta = json.velocityTheta,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new PolarVelocity(new _math.Polar3D(polarRadius, polarTheta, polarPhi), velocityTheta, isEnabled);
    }
  }]);
  return PolarVelocity;
}(_Velocity2["default"]);

exports["default"] = PolarVelocity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9Qb2xhclZlbG9jaXR5LmpzIl0sIm5hbWVzIjpbIlBvbGFyVmVsb2NpdHkiLCJwb2xhcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJ0eXBlIiwidGhhIiwiRFIiLCJkaXJWZWMiLCJ0b1ZlY3RvcjNEIiwiX3VzZVYiLCJqc29uIiwicG9sYXJSYWRpdXMiLCJwb2xhclRoZXRhIiwicG9sYXJQaGkiLCJ2ZWxvY2l0eVRoZXRhIiwiUG9sYXIzRCIsIlZlbG9jaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxhOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHlCQUFZQyxPQUFaLEVBQXFCQyxLQUFyQixFQUE4QztBQUFBOztBQUFBLFFBQWxCQyxTQUFrQix1RUFBTixJQUFNO0FBQUE7QUFDNUMsOEJBQU1DLHNDQUFOLEVBQVlELFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLRSxHQUFMLEdBQVdILEtBQUssR0FBR0ksYUFBbkI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxNQUFMLEdBQWNOLE9BQU8sQ0FBQ08sVUFBUixFQUFkO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0MsS0FBTCxHQUFhLEtBQWI7QUFuQjRDO0FBb0I3QztBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs2QkFDa0JDLEksRUFBTTtBQUFBLFVBRWxCQyxXQUZrQixHQU9oQkQsSUFQZ0IsQ0FFbEJDLFdBRmtCO0FBQUEsVUFHbEJDLFVBSGtCLEdBT2hCRixJQVBnQixDQUdsQkUsVUFIa0I7QUFBQSxVQUlsQkMsUUFKa0IsR0FPaEJILElBUGdCLENBSWxCRyxRQUprQjtBQUFBLFVBS2xCQyxhQUxrQixHQU9oQkosSUFQZ0IsQ0FLbEJJLGFBTGtCO0FBQUEsNEJBT2hCSixJQVBnQixDQU1sQlAsU0FOa0I7QUFBQSxVQU1sQkEsU0FOa0IsZ0NBTU4sSUFOTTtBQVNwQixhQUFPLElBQUlILGFBQUosQ0FDTCxJQUFJZSxhQUFKLENBQVlKLFdBQVosRUFBeUJDLFVBQXpCLEVBQXFDQyxRQUFyQyxDQURLLEVBRUxDLGFBRkssRUFHTFgsU0FISyxDQUFQO0FBS0Q7OztFQXREd0NhLHFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRFIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUG9sYXIzRCB9IGZyb20gJy4uLy4uL21hdGgnO1xuaW1wb3J0IFZlbG9jaXR5IGZyb20gJy4vVmVsb2NpdHknO1xuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9QT0xBUl9WRUxPQ0lUWSBhcyB0eXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFNldHMgdGhlIHZlbG9jaXR5IHByb3BlcnR5IG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbGFyVmVsb2NpdHkgZXh0ZW5kcyBWZWxvY2l0eSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgUG9sYXJWZWxvY2l0eSBpbml0aWFsaXplci5cbiAgICpcbiAgICogQHBhcmFtIHtQb2xhcjNEfSBwb2xhcjNkIC0gVGhlIHBvbGFyIHZlY3RvciBmb3IgdGhlIHZlbG9jaXR5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aGV0YSAtIFRoZSB0aGV0YSBhbmdsZSB0byB1c2VcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwb2xhcjNkLCB0aGV0YSwgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGV0YS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMudGhhID0gdGhldGEgKiBEUjtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERpcmVjdGlvbmFsIHZlY3RvclxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLmRpclZlYyA9IHBvbGFyM2QudG9WZWN0b3IzRCgpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSB0aGUgZGlyZWN0aW9uYWwgdmVjdG9yIG9yIG5vdC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl91c2VWID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFBvbGFyVmVsb2NpdHkgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ucG9sYXJSYWRpdXMgLSBUaGUgUG9sYXIzRCByYWRpdXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ucG9sYXJUaGV0YSAtIFRoZSBQb2xhcjNEIHRoZXRhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnBvbGFyUGhpIC0gVGhlIFBvbGFyM0QgcGhpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnZlbG9jaXR5VGhldGEgLSBUaGUgdmVsb2NpdHkgdGhldGFcbiAgICogQHJldHVybiB7UG9sYXJWZWxvY2l0eX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qge1xuICAgICAgcG9sYXJSYWRpdXMsXG4gICAgICBwb2xhclRoZXRhLFxuICAgICAgcG9sYXJQaGksXG4gICAgICB2ZWxvY2l0eVRoZXRhLFxuICAgICAgaXNFbmFibGVkID0gdHJ1ZSxcbiAgICB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgUG9sYXJWZWxvY2l0eShcbiAgICAgIG5ldyBQb2xhcjNEKHBvbGFyUmFkaXVzLCBwb2xhclRoZXRhLCBwb2xhclBoaSksXG4gICAgICB2ZWxvY2l0eVRoZXRhLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19