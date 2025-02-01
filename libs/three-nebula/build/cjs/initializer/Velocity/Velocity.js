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

var _Initializer2 = _interopRequireDefault(require("../Initializer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Abstract class for Velocity initializers.
 *
 */
var Velocity = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Velocity, _Initializer);

  var _super = _createSuper(Velocity);

  /**
   * Constructs a Velocity intitializer instance.
   *
   * @return void
   */
  function Velocity(type) {
    var _this;

    var isEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (0, _classCallCheck2["default"])(this, Velocity);
    _this = _super.call(this, type, isEnabled);
    /**
     * @desc Directional vector
     * @type {Vector3D}
     */

    _this.dirVec = new _math.Vector3D(0, 0, 0);
    return _this;
  }

  (0, _createClass2["default"])(Velocity, [{
    key: "normalize",
    value: function normalize(vr) {
      return vr * _constants.MEASURE;
    }
  }]);
  return Velocity;
}(_Initializer2["default"]);
/**
 * Sets the particle's initial velocity.
 *
 * @singleton
 * @param {Particle} particle - the particle to initialize the property on
 * @return void
 */


exports["default"] = Velocity;

Velocity.prototype.initialize = function () {
  var tha;
  var normal = new _math.Vector3D(0, 0, 1);
  var v = new _math.Vector3D(0, 0, 0);
  return function initialize(particle) {
    tha = this.tha * Math.random();
    this._useV && this.dirVec.copy(this.dir).scalar(this.radiusPan.getValue());

    _math.MathUtils.getNormal(this.dirVec, normal);

    v.copy(this.dirVec).applyAxisAngle(normal, tha);
    v.applyAxisAngle(this.dirVec.normalize(), Math.random() * _constants.PI * 2);
    particle.velocity.copy(v);
    return this;
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9WZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJWZWxvY2l0eSIsInR5cGUiLCJpc0VuYWJsZWQiLCJkaXJWZWMiLCJWZWN0b3IzRCIsInZyIiwiTUVBU1VSRSIsIkluaXRpYWxpemVyIiwicHJvdG90eXBlIiwiaW5pdGlhbGl6ZSIsInRoYSIsIm5vcm1hbCIsInYiLCJwYXJ0aWNsZSIsIk1hdGgiLCJyYW5kb20iLCJfdXNlViIsImNvcHkiLCJkaXIiLCJzY2FsYXIiLCJyYWRpdXNQYW4iLCJnZXRWYWx1ZSIsIk1hdGhVdGlscyIsImdldE5vcm1hbCIsImFwcGx5QXhpc0FuZ2xlIiwibm9ybWFsaXplIiwiUEkiLCJ2ZWxvY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsUTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNFLG9CQUFZQyxJQUFaLEVBQW9DO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUNsQyw4QkFBTUQsSUFBTixFQUFZQyxTQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0MsTUFBTCxHQUFjLElBQUlDLGNBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQWQ7QUFQa0M7QUFRbkM7Ozs7OEJBRVNDLEUsRUFBSTtBQUNaLGFBQU9BLEVBQUUsR0FBR0Msa0JBQVo7QUFDRDs7O0VBbEJtQ0Msd0I7QUFxQnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNBUCxRQUFRLENBQUNRLFNBQVQsQ0FBbUJDLFVBQW5CLEdBQWlDLFlBQVc7QUFDMUMsTUFBSUMsR0FBSjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxJQUFJUCxjQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFiO0FBQ0EsTUFBSVEsQ0FBQyxHQUFHLElBQUlSLGNBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQVI7QUFFQSxTQUFPLFNBQVNLLFVBQVQsQ0FBb0JJLFFBQXBCLEVBQThCO0FBQ25DSCxJQUFBQSxHQUFHLEdBQUcsS0FBS0EsR0FBTCxHQUFXSSxJQUFJLENBQUNDLE1BQUwsRUFBakI7QUFDQSxTQUFLQyxLQUFMLElBQWMsS0FBS2IsTUFBTCxDQUFZYyxJQUFaLENBQWlCLEtBQUtDLEdBQXRCLEVBQTJCQyxNQUEzQixDQUFrQyxLQUFLQyxTQUFMLENBQWVDLFFBQWYsRUFBbEMsQ0FBZDs7QUFFQUMsb0JBQVVDLFNBQVYsQ0FBb0IsS0FBS3BCLE1BQXpCLEVBQWlDUSxNQUFqQzs7QUFDQUMsSUFBQUEsQ0FBQyxDQUFDSyxJQUFGLENBQU8sS0FBS2QsTUFBWixFQUFvQnFCLGNBQXBCLENBQW1DYixNQUFuQyxFQUEyQ0QsR0FBM0M7QUFDQUUsSUFBQUEsQ0FBQyxDQUFDWSxjQUFGLENBQWlCLEtBQUtyQixNQUFMLENBQVlzQixTQUFaLEVBQWpCLEVBQTBDWCxJQUFJLENBQUNDLE1BQUwsS0FBZ0JXLGFBQWhCLEdBQXFCLENBQS9EO0FBRUFiLElBQUFBLFFBQVEsQ0FBQ2MsUUFBVCxDQUFrQlYsSUFBbEIsQ0FBdUJMLENBQXZCO0FBRUEsV0FBTyxJQUFQO0FBQ0QsR0FYRDtBQVlELENBakIrQixFQUFoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1FQVNVUkUsIFBJIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IE1hdGhVdGlscywgVmVjdG9yM0QgfSBmcm9tICcuLi8uLi9tYXRoJztcblxuaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4uL0luaXRpYWxpemVyJztcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmb3IgVmVsb2NpdHkgaW5pdGlhbGl6ZXJzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVsb2NpdHkgZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgVmVsb2NpdHkgaW50aXRpYWxpemVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHR5cGUsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGlyZWN0aW9uYWwgdmVjdG9yXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMuZGlyVmVjID0gbmV3IFZlY3RvcjNEKDAsIDAsIDApO1xuICB9XG5cbiAgbm9ybWFsaXplKHZyKSB7XG4gICAgcmV0dXJuIHZyICogTUVBU1VSRTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCB2ZWxvY2l0eS5cbiAqXG4gKiBAc2luZ2xldG9uXG4gKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBwcm9wZXJ0eSBvblxuICogQHJldHVybiB2b2lkXG4gKi9cblZlbG9jaXR5LnByb3RvdHlwZS5pbml0aWFsaXplID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhO1xuICB2YXIgbm9ybWFsID0gbmV3IFZlY3RvcjNEKDAsIDAsIDEpO1xuICB2YXIgdiA9IG5ldyBWZWN0b3IzRCgwLCAwLCAwKTtcblxuICByZXR1cm4gZnVuY3Rpb24gaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHRoYSA9IHRoaXMudGhhICogTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLl91c2VWICYmIHRoaXMuZGlyVmVjLmNvcHkodGhpcy5kaXIpLnNjYWxhcih0aGlzLnJhZGl1c1Bhbi5nZXRWYWx1ZSgpKTtcblxuICAgIE1hdGhVdGlscy5nZXROb3JtYWwodGhpcy5kaXJWZWMsIG5vcm1hbCk7XG4gICAgdi5jb3B5KHRoaXMuZGlyVmVjKS5hcHBseUF4aXNBbmdsZShub3JtYWwsIHRoYSk7XG4gICAgdi5hcHBseUF4aXNBbmdsZSh0aGlzLmRpclZlYy5ub3JtYWxpemUoKSwgTWF0aC5yYW5kb20oKSAqIFBJICogMik7XG5cbiAgICBwYXJ0aWNsZS52ZWxvY2l0eS5jb3B5KHYpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG59KSgpO1xuIl19