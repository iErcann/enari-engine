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
var VectorVelocity = /*#__PURE__*/function (_Velocity) {
  (0, _inherits2["default"])(VectorVelocity, _Velocity);

  var _super = _createSuper(VectorVelocity);

  /**
   * Constructs a VectorVelocity initializer.
   *
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  function VectorVelocity(vector3d, theta) {
    var _this;

    var isEnabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    (0, _classCallCheck2["default"])(this, VectorVelocity);
    _this = _super.call(this, _types.INITIALIZER_TYPE_VECTOR_VELOCITY, isEnabled);
    /**
     * @desc Velocity radius span.
     * @type {Span}
     */

    _this.radiusPan = (0, _math.createSpan)(1);
    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */

    _this.dir = vector3d.clone();
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
   * Creates a VectorVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {VectorVelocity}
   */


  (0, _createClass2["default"])(VectorVelocity, null, [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var x = json.x,
          y = json.y,
          z = json.z,
          theta = json.theta,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new VectorVelocity(new _math.Vector3D(x, y, z), theta, isEnabled);
    }
  }]);
  return VectorVelocity;
}(_Velocity2["default"]);

exports["default"] = VectorVelocity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9WZWN0b3JWZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJWZWN0b3JWZWxvY2l0eSIsInZlY3RvcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJ0eXBlIiwicmFkaXVzUGFuIiwiZGlyIiwiY2xvbmUiLCJ0aGEiLCJEUiIsIl91c2VWIiwianNvbiIsIngiLCJ5IiwieiIsIlZlY3RvcjNEIiwiVmVsb2NpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLGM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsMEJBQVlDLFFBQVosRUFBc0JDLEtBQXRCLEVBQStDO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUM3Qyw4QkFBTUMsdUNBQU4sRUFBWUQsU0FBWjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtFLFNBQUwsR0FBaUIsc0JBQVcsQ0FBWCxDQUFqQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLEdBQUwsR0FBV0wsUUFBUSxDQUFDTSxLQUFULEVBQVg7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxHQUFMLEdBQVdOLEtBQUssR0FBR08sYUFBbkI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxLQUFMLEdBQWEsSUFBYjtBQXpCNkM7QUEwQjlDO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzZCQUNrQkMsSSxFQUFNO0FBQUEsVUFDWkMsQ0FEWSxHQUN5QkQsSUFEekIsQ0FDWkMsQ0FEWTtBQUFBLFVBQ1RDLENBRFMsR0FDeUJGLElBRHpCLENBQ1RFLENBRFM7QUFBQSxVQUNOQyxDQURNLEdBQ3lCSCxJQUR6QixDQUNORyxDQURNO0FBQUEsVUFDSFosS0FERyxHQUN5QlMsSUFEekIsQ0FDSFQsS0FERztBQUFBLDRCQUN5QlMsSUFEekIsQ0FDSVIsU0FESjtBQUFBLFVBQ0lBLFNBREosZ0NBQ2dCLElBRGhCO0FBR3BCLGFBQU8sSUFBSUgsY0FBSixDQUFtQixJQUFJZSxjQUFKLENBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixDQUFuQixFQUEwQ1osS0FBMUMsRUFBaURDLFNBQWpELENBQVA7QUFDRDs7O0VBbER5Q2EscUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3IzRCwgY3JlYXRlU3BhbiB9IGZyb20gJy4uLy4uL21hdGgnO1xuXG5pbXBvcnQgeyBEUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSAnLi9WZWxvY2l0eSc7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX1ZFQ1RPUl9WRUxPQ0lUWSBhcyB0eXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFNldHMgdGhlIHZlbG9jaXR5IHByb3BlcnR5IG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvclZlbG9jaXR5IGV4dGVuZHMgVmVsb2NpdHkge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFZlY3RvclZlbG9jaXR5IGluaXRpYWxpemVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB2ZWN0b3IzZCAtIFRoZSBkaXJlY3Rpb25hbCB2ZWN0b3IgZm9yIHRoZSB2ZWxvY2l0eVxuICAgKiBAcGFyYW0ge251bWJlcn0gdGhldGEgLSBUaGUgdGhldGEgYW5nbGUgdG8gdXNlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IodmVjdG9yM2QsIHRoZXRhLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFZlbG9jaXR5IHJhZGl1cyBzcGFuLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzUGFuID0gY3JlYXRlU3BhbigxKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERpcmVjdGlvbiB2ZWN0b3IuXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMuZGlyID0gdmVjdG9yM2QuY2xvbmUoKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZXRhLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy50aGEgPSB0aGV0YSAqIERSO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSB0aGUgZGlyZWN0aW9uYWwgdmVjdG9yIG9yIG5vdC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl91c2VWID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgVmVjdG9yVmVsb2NpdHkgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueCAtIFRoZSB2ZWxvY2l0eSB4IGF4aXMgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnkgLSBUaGUgdmVsb2NpdHkgeSBheGlzIGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi56IC0gVGhlIHZlbG9jaXR5IHogYXhpcyBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24udGhldGEgLSBUaGUgdmVsb2NpdHkgdGhldGFcbiAgICogQHJldHVybiB7VmVjdG9yVmVsb2NpdHl9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgeCwgeSwgeiwgdGhldGEsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvclZlbG9jaXR5KG5ldyBWZWN0b3IzRCh4LCB5LCB6KSwgdGhldGEsIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==