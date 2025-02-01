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

var _constants = require("../constants");

var _Util = _interopRequireDefault(require("../utils/Util"));

var _Vector3D = _interopRequireDefault(require("../math/Vector3D"));

var _Zone2 = _interopRequireDefault(require("./Zone"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * A spherical zone for particles to be emitted within.
 *
 */
var SphereZone = /*#__PURE__*/function (_Zone) {
  (0, _inherits2["default"])(SphereZone, _Zone);

  var _super = _createSuper(SphereZone);

  /**
   * @constructs {SphereZone}
   *
   * @param {number} centerX - the sphere's center x coordinate
   * @param {number} centerY - the sphere's center y coordinate
   * @param {number} centerZ - the sphere's center z coordinate
   * @param {number} radius - the sphere's radius value
   * @return void
   */
  function SphereZone(centerX, centerY, centerZ, radius) {
    var _this;

    (0, _classCallCheck2["default"])(this, SphereZone);
    _this = _super.call(this, _types.ZONE_TYPE_SPHERE); // TODO see below, these should probably be assigned properly
    // eslint-disable-next-line

    var x, y, z, r;

    if (_Util["default"].isUndefined(centerY, centerZ, radius)) {
      x = y = z = 0;
      r = centerX || 100;
    } else {
      x = centerX; // eslint-disable-next-line

      y = centerY; // eslint-disable-next-line

      z = centerZ;
      r = radius;
    }

    _this.x = x; // TODO shouldn't this be set to y?

    _this.y = x; // TODO shouldn't this be set to z?

    _this.z = x;
    _this.radius = r;
    _this.the = _this.phi = 0;
    return _this;
  }
  /**
   * Returns true to indicate this is a SphereZone.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(SphereZone, [{
    key: "isSphereZone",
    value: function isSphereZone() {
      return true;
    }
    /**
     * Sets the particle to dead if the particle collides with the sphere.
     *
     * @param {object} particle
     * @return void
     */

  }, {
    key: "_dead",
    value: function _dead(particle) {
      var d = particle.position.distanceTo(this);
      if (d - particle.radius > this.radius) particle.dead = true;
    }
    /**
     * Warns that this zone does not support the _cross method.
     *
     * @return void
     */

  }, {
    key: "_cross",
    value: function _cross() {
      console.warn("".concat(this.constructor.name, " does not support the _cross method"));
    }
  }]);
  return SphereZone;
}(_Zone2["default"]);

exports["default"] = SphereZone;

SphereZone.prototype.getPosition = function () {
  var tha, phi, r;
  return function () {
    this.random = Math.random();
    r = this.random * this.radius;
    tha = _constants.PI * Math.random(); //[0-pi]

    phi = _constants.PI * 2 * Math.random(); //[0-2pi]

    this.vector.x = this.x + r * Math.sin(tha) * Math.cos(phi);
    this.vector.y = this.y + r * Math.sin(phi) * Math.sin(tha);
    this.vector.z = this.z + r * Math.cos(tha);
    return this.vector;
  };
}();

SphereZone.prototype._bound = function () {
  var normal = new _Vector3D["default"](),
      v = new _Vector3D["default"](),
      k;
  return function (particle) {
    var d = particle.position.distanceTo(this);

    if (d + particle.radius >= this.radius) {
      normal.copy(particle.position).sub(this).normalize();
      v.copy(particle.velocity);
      k = 2 * v.dot(normal);
      particle.velocity.sub(normal.scalar(k));
    }
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1NwaGVyZVpvbmUuanMiXSwibmFtZXMiOlsiU3BoZXJlWm9uZSIsImNlbnRlclgiLCJjZW50ZXJZIiwiY2VudGVyWiIsInJhZGl1cyIsInR5cGUiLCJ4IiwieSIsInoiLCJyIiwiVXRpbCIsImlzVW5kZWZpbmVkIiwidGhlIiwicGhpIiwicGFydGljbGUiLCJkIiwicG9zaXRpb24iLCJkaXN0YW5jZVRvIiwiZGVhZCIsImNvbnNvbGUiLCJ3YXJuIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiWm9uZSIsInByb3RvdHlwZSIsImdldFBvc2l0aW9uIiwidGhhIiwicmFuZG9tIiwiTWF0aCIsIlBJIiwidmVjdG9yIiwic2luIiwiY29zIiwiX2JvdW5kIiwibm9ybWFsIiwiVmVjdG9yM0QiLCJ2IiwiayIsImNvcHkiLCJzdWIiLCJub3JtYWxpemUiLCJ2ZWxvY2l0eSIsImRvdCIsInNjYWxhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsVTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Usc0JBQVlDLE9BQVosRUFBcUJDLE9BQXJCLEVBQThCQyxPQUE5QixFQUF1Q0MsTUFBdkMsRUFBK0M7QUFBQTs7QUFBQTtBQUM3Qyw4QkFBTUMsdUJBQU4sRUFENkMsQ0FHN0M7QUFDQTs7QUFDQSxRQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiOztBQUVBLFFBQUlDLGlCQUFLQyxXQUFMLENBQWlCVCxPQUFqQixFQUEwQkMsT0FBMUIsRUFBbUNDLE1BQW5DLENBQUosRUFBZ0Q7QUFDOUNFLE1BQUFBLENBQUMsR0FBR0MsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsQ0FBWjtBQUNBQyxNQUFBQSxDQUFDLEdBQUdSLE9BQU8sSUFBSSxHQUFmO0FBQ0Qs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QUEsTUFBTSxDQUNISSxJQURILENBQ1F4QixRQUFRLENBQUNFLFFBRGpCLEVBRUd1QixHQUZILENBRU8sSUFGUCxFQUdHQyxTQUhIO0FBSUFKLE1BQUFBLENBQUMsQ0FBQ0UsSUFBRixDQUFPeEIsUUFBUSxDQUFDMkIsUUFBaEI7QUFDQUosTUFBQUEsQ0FBQyxHQUFHLElBQUlELENBQUMsQ0FBQ00sR0FBRixDQUFNUixNQUFOLENBQVI7QUFDQXBCLE1BQUFBLFFBQVEsQ0FBQzJCLFFBQVQsQ0FBa0JGLEdBQWxCLENBQXNCTCxNQUFNLENBQUNTLE1BQVAsQ0FBY04sQ0FBZCxDQUF0QjtBQUNEO0FBQ0YsR0FaRDtBQWFELENBbEI2QixFQUE5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBJIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBVdGlsIGZyb20gJy4uL3V0aWxzL1V0aWwnO1xuaW1wb3J0IFZlY3RvcjNEIGZyb20gJy4uL21hdGgvVmVjdG9yM0QnO1xuaW1wb3J0IFpvbmUgZnJvbSAnLi9ab25lJztcbmltcG9ydCB7IFpPTkVfVFlQRV9TUEhFUkUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEEgc3BoZXJpY2FsIHpvbmUgZm9yIHBhcnRpY2xlcyB0byBiZSBlbWl0dGVkIHdpdGhpbi5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaGVyZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzIHtTcGhlcmVab25lfVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gY2VudGVyWCAtIHRoZSBzcGhlcmUncyBjZW50ZXIgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjZW50ZXJZIC0gdGhlIHNwaGVyZSdzIGNlbnRlciB5IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNlbnRlclogLSB0aGUgc3BoZXJlJ3MgY2VudGVyIHogY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzIC0gdGhlIHNwaGVyZSdzIHJhZGl1cyB2YWx1ZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclgsIGNlbnRlclksIGNlbnRlclosIHJhZGl1cykge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgLy8gVE9ETyBzZWUgYmVsb3csIHRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSBhc3NpZ25lZCBwcm9wZXJseVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGxldCB4LCB5LCB6LCByO1xuXG4gICAgaWYgKFV0aWwuaXNVbmRlZmluZWQoY2VudGVyWSwgY2VudGVyWiwgcmFkaXVzKSkge1xuICAgICAgeCA9IHkgPSB6ID0gMDtcbiAgICAgIHIgPSBjZW50ZXJYIHx8IDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGNlbnRlclg7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHkgPSBjZW50ZXJZO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB6ID0gY2VudGVyWjtcbiAgICAgIHIgPSByYWRpdXM7XG4gICAgfVxuXG4gICAgdGhpcy54ID0geDtcblxuICAgIC8vIFRPRE8gc2hvdWxkbid0IHRoaXMgYmUgc2V0IHRvIHk/XG4gICAgdGhpcy55ID0geDtcblxuICAgIC8vIFRPRE8gc2hvdWxkbid0IHRoaXMgYmUgc2V0IHRvIHo/XG4gICAgdGhpcy56ID0geDtcbiAgICB0aGlzLnJhZGl1cyA9IHI7XG4gICAgdGhpcy50aGUgPSB0aGlzLnBoaSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoaXMgaXMgYSBTcGhlcmVab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNTcGhlcmVab25lKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlIHRvIGRlYWQgaWYgdGhlIHBhcnRpY2xlIGNvbGxpZGVzIHdpdGggdGhlIHNwaGVyZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgX2RlYWQocGFydGljbGUpIHtcbiAgICB2YXIgZCA9IHBhcnRpY2xlLnBvc2l0aW9uLmRpc3RhbmNlVG8odGhpcyk7XG5cbiAgICBpZiAoZCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMucmFkaXVzKSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYXJucyB0aGF0IHRoaXMgem9uZSBkb2VzIG5vdCBzdXBwb3J0IHRoZSBfY3Jvc3MgbWV0aG9kLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9jcm9zcygpIHtcbiAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IHRoZSBfY3Jvc3MgbWV0aG9kYCk7XG4gIH1cbn1cblxuU3BoZXJlWm9uZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB0aGEsIHBoaSwgcjtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuXG4gICAgciA9IHRoaXMucmFuZG9tICogdGhpcy5yYWRpdXM7XG4gICAgdGhhID0gUEkgKiBNYXRoLnJhbmRvbSgpOyAvL1swLXBpXVxuICAgIHBoaSA9IFBJICogMiAqIE1hdGgucmFuZG9tKCk7IC8vWzAtMnBpXVxuXG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueCArIHIgKiBNYXRoLnNpbih0aGEpICogTWF0aC5jb3MocGhpKTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgciAqIE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGEpO1xuICAgIHRoaXMudmVjdG9yLnogPSB0aGlzLnogKyByICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfTtcbn0pKCk7XG5cblNwaGVyZVpvbmUucHJvdG90eXBlLl9ib3VuZCA9IChmdW5jdGlvbigpIHtcbiAgdmFyIG5vcm1hbCA9IG5ldyBWZWN0b3IzRCgpLFxuICAgIHYgPSBuZXcgVmVjdG9yM0QoKSxcbiAgICBrO1xuXG4gIHJldHVybiBmdW5jdGlvbihwYXJ0aWNsZSkge1xuICAgIHZhciBkID0gcGFydGljbGUucG9zaXRpb24uZGlzdGFuY2VUbyh0aGlzKTtcblxuICAgIGlmIChkICsgcGFydGljbGUucmFkaXVzID49IHRoaXMucmFkaXVzKSB7XG4gICAgICBub3JtYWxcbiAgICAgICAgLmNvcHkocGFydGljbGUucG9zaXRpb24pXG4gICAgICAgIC5zdWIodGhpcylcbiAgICAgICAgLm5vcm1hbGl6ZSgpO1xuICAgICAgdi5jb3B5KHBhcnRpY2xlLnZlbG9jaXR5KTtcbiAgICAgIGsgPSAyICogdi5kb3Qobm9ybWFsKTtcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnN1Yihub3JtYWwuc2NhbGFyKGspKTtcbiAgICB9XG4gIH07XG59KSgpO1xuIl19