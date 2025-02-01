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

var _MathUtils = _interopRequireDefault(require("../math/MathUtils"));

var _Util = _interopRequireDefault(require("../utils/Util"));

var _Zone2 = _interopRequireDefault(require("./Zone"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BoxZone = /*#__PURE__*/function (_Zone) {
  (0, _inherits2["default"])(BoxZone, _Zone);

  var _super = _createSuper(BoxZone);

  /**
   * BoxZone is a box zone
   * @param {Number|Vector3D} x - the position's x value or a Vector3D Object
   * @param {Number} y - the position's y value
   * @param {Number} z - the position's z value
   * @param {Number} w - the Box's width
   * @param {Number} h - the Box's height
   * @param {Number} d - the Box's depth
   * @example
   * var boxZone = new BoxZone(0,0,0,50,50,50);
   * or
   * var boxZone = new BoxZone(new Vector3D(0,0,0), 50, 50, 50);
   * @extends {Zone}
   * @constructor
   */
  function BoxZone(a, b, c, d, e, f) {
    var _this;

    (0, _classCallCheck2["default"])(this, BoxZone);
    _this = _super.call(this, _types.ZONE_TYPE_BOX); // TODO this reassigning of arguments is pretty dangerous, need to fix it.
    // eslint-disable-next-line

    var x, y, z, w, h, d;

    if (_Util["default"].isUndefined(b, c, d, e, f)) {
      x = y = z = 0;
      w = h = d = a || 100;
    } else if (_Util["default"].isUndefined(d, e, f)) {
      x = y = z = 0;
      w = a;
      h = b;
      d = c;
    } else {
      x = a;
      y = b;
      z = c;
      w = d;
      h = e;
      d = f;
    }

    _this.x = x;
    _this.y = y;
    _this.z = z;
    _this.width = w;
    _this.height = h;
    _this.depth = d; // TODO Set this via an argument to the constructor

    _this.friction = 0.85; // TODO Set this via an argument to the constructor

    _this.max = 6;
    return _this;
  }
  /**
   * Returns true to indicate this is a BoxZone.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(BoxZone, [{
    key: "isBoxZone",
    value: function isBoxZone() {
      return true;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      this.vector.x = this.x + _MathUtils["default"].randomAToB(-0.5, 0.5) * this.width;
      this.vector.y = this.y + _MathUtils["default"].randomAToB(-0.5, 0.5) * this.height;
      this.vector.z = this.z + _MathUtils["default"].randomAToB(-0.5, 0.5) * this.depth;
      return this.vector;
    }
  }, {
    key: "_dead",
    value: function _dead(particle) {
      if (particle.position.x + particle.radius < this.x - this.width / 2) particle.dead = true;else if (particle.position.x - particle.radius > this.x + this.width / 2) particle.dead = true;
      if (particle.position.y + particle.radius < this.y - this.height / 2) particle.dead = true;else if (particle.position.y - particle.radius > this.y + this.height / 2) particle.dead = true;
      if (particle.position.z + particle.radius < this.z - this.depth / 2) particle.dead = true;else if (particle.position.z - particle.radius > this.z + this.depth / 2) particle.dead = true;
    }
  }, {
    key: "_bound",
    value: function _bound(particle) {
      if (particle.position.x - particle.radius < this.x - this.width / 2) {
        particle.position.x = this.x - this.width / 2 + particle.radius;
        particle.velocity.x *= -this.friction;

        this._static(particle, 'x');
      } else if (particle.position.x + particle.radius > this.x + this.width / 2) {
        particle.position.x = this.x + this.width / 2 - particle.radius;
        particle.velocity.x *= -this.friction;

        this._static(particle, 'x');
      }

      if (particle.position.y - particle.radius < this.y - this.height / 2) {
        particle.position.y = this.y - this.height / 2 + particle.radius;
        particle.velocity.y *= -this.friction;

        this._static(particle, 'y');
      } else if (particle.position.y + particle.radius > this.y + this.height / 2) {
        particle.position.y = this.y + this.height / 2 - particle.radius;
        particle.velocity.y *= -this.friction;

        this._static(particle, 'y');
      }

      if (particle.position.z - particle.radius < this.z - this.depth / 2) {
        particle.position.z = this.z - this.depth / 2 + particle.radius;
        particle.velocity.z *= -this.friction;

        this._static(particle, 'z');
      } else if (particle.position.z + particle.radius > this.z + this.depth / 2) {
        particle.position.z = this.z + this.depth / 2 - particle.radius;
        particle.velocity.z *= -this.friction;

        this._static(particle, 'z');
      }
    }
  }, {
    key: "_static",
    value: function _static(particle, axis) {
      if (particle.velocity[axis] * particle.acceleration[axis] > 0) return;

      if (Math.abs(particle.velocity[axis]) < Math.abs(particle.acceleration[axis]) * 0.0167 * this.max) {
        particle.velocity[axis] = 0;
        particle.acceleration[axis] = 0;
      }
    }
  }, {
    key: "_cross",
    value: function _cross(particle) {
      if (particle.position.x + particle.radius < this.x - this.width / 2 && particle.velocity.x <= 0) particle.position.x = this.x + this.width / 2 + particle.radius;else if (particle.position.x - particle.radius > this.x + this.width / 2 && particle.velocity.x >= 0) particle.position.x = this.x - this.width / 2 - particle.radius;
      if (particle.position.y + particle.radius < this.y - this.height / 2 && particle.velocity.y <= 0) particle.position.y = this.y + this.height / 2 + particle.radius;else if (particle.position.y - particle.radius > this.y + this.height / 2 && particle.velocity.y >= 0) particle.position.y = this.y - this.height / 2 - particle.radius;
      if (particle.position.z + particle.radius < this.z - this.depth / 2 && particle.velocity.z <= 0) particle.position.z = this.z + this.depth / 2 + particle.radius;else if (particle.position.z - particle.radius > this.z + this.depth / 2 && particle.velocity.z >= 0) particle.position.z = this.z - this.depth / 2 - particle.radius;
    }
  }]);
  return BoxZone;
}(_Zone2["default"]);

exports["default"] = BoxZone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL0JveFpvbmUuanMiXSwibmFtZXMiOlsiQm94Wm9uZSIsImEiLCJiIiwiYyIsImQiLCJlIiwiZiIsInR5cGUiLCJ4IiwieSIsInoiLCJ3IiwiaCIsIlV0aWwiLCJpc1VuZGVmaW5lZCIsIndpZHRoIiwiaGVpZ2h0IiwiZGVwdGgiLCJmcmljdGlvbiIsIm1heCIsInZlY3RvciIsIk1hdGhVdGlscyIsInJhbmRvbUFUb0IiLCJwYXJ0aWNsZSIsInBvc2l0aW9uIiwicmFkaXVzIiwiZGVhZCIsInZlbG9jaXR5IiwiX3N0YXRpYyIsImF4aXMiLCJhY2NlbGVyYXRpb24iLCJNYXRoIiwiYWJzIiwiWm9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLG1CQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsQ0FBeEIsRUFBMkJDLENBQTNCLEVBQThCO0FBQUE7O0FBQUE7QUFDNUIsOEJBQU1DLG9CQUFOLEVBRDRCLENBRzVCO0FBQ0E7O0FBQ0EsUUFBSUMsQ0FBSixFQUFPQyxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJSLENBQW5COztBQUVBLFFBQUlTLGlCQUFLQyxXQUFMLENBQWlCWixDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QkMsQ0FBN0IsQ0FBSixFQUFxQztBQUNuQ0UsTUFBQUEsQ0FBQyxHQUFHQyxDQUFDLEdBQUdDLENBQUMsR0FBRyxDQUFaO0FBQ0FDLE1BQUFBLENBQUMsR0FBR0MsQ0FBQyxHQUFHUixDQUFDLEdBQUdILENBQUMsSUFBSSxHQUFqQjtBQUNELEtB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QUFRLENBQUNDLFFBQVQsQ0FBa0JmLENBQWxCLEdBQXNCLEtBQUtBLENBQUwsR0FBUyxLQUFLTyxNQUFMLEdBQWMsQ0FBdkIsR0FBMkJPLFFBQVEsQ0FBQ0UsTUFBMUQ7QUFFRixVQUNFRixRQUFRLENBQUNDLFFBQVQsQ0FBa0JkLENBQWxCLEdBQXNCYSxRQUFRLENBQUNFLE1BQS9CLEdBQXdDLEtBQUtmLENBQUwsR0FBUyxLQUFLTyxLQUFMLEdBQWEsQ0FBOUQsSUFDQU0sUUFBUSxDQUFDSSxRQUFULENBQWtCakIsQ0FBbEIsSUFBdUIsQ0FGekIsRUFJRWEsUUFBUSxDQUFDQyxRQUFULENBQWtCZCxDQUFsQixHQUFzQixLQUFLQSxDQUFMLEdBQVMsS0FBS08sS0FBTCxHQUFhLENBQXRCLEdBQTBCTSxRQUFRLENBQUNFLE1BQXpELENBSkYsS0FLSyxJQUNIRixRQUFRLENBQUNDLFFBQVQsQ0FBa0JkLENBQWxCLEdBQXNCYSxRQUFRLENBQUNFLE1BQS9CLEdBQXdDLEtBQUtmLENBQUwsR0FBUyxLQUFLTyxLQUFMLEdBQWEsQ0FBOUQsSUFDQU0sUUFBUSxDQUFDSSxRQUFULENBQWtCakIsQ0FBbEIsSUFBdUIsQ0FGcEIsRUFJSGEsUUFBUSxDQUFDQyxRQUFULENBQWtCZCxDQUFsQixHQUFzQixLQUFLQSxDQUFMLEdBQVMsS0FBS08sS0FBTCxHQUFhLENBQXRCLEdBQTBCTSxRQUFRLENBQUNFLE1BQXpEO0FBQ0g7OztFQWxLa0NRLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGhVdGlscyBmcm9tICcuLi9tYXRoL01hdGhVdGlscyc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi91dGlscy9VdGlsJztcbmltcG9ydCBab25lIGZyb20gJy4vWm9uZSc7XG5pbXBvcnQgeyBaT05FX1RZUEVfQk9YIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94Wm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQm94Wm9uZSBpcyBhIGJveCB6b25lXG4gICAqIEBwYXJhbSB7TnVtYmVyfFZlY3RvcjNEfSB4IC0gdGhlIHBvc2l0aW9uJ3MgeCB2YWx1ZSBvciBhIFZlY3RvcjNEIE9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0geSAtIHRoZSBwb3NpdGlvbidzIHkgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogLSB0aGUgcG9zaXRpb24ncyB6IHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3IC0gdGhlIEJveCdzIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoIC0gdGhlIEJveCdzIGhlaWdodFxuICAgKiBAcGFyYW0ge051bWJlcn0gZCAtIHRoZSBCb3gncyBkZXB0aFxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgYm94Wm9uZSA9IG5ldyBCb3hab25lKDAsMCwwLDUwLDUwLDUwKTtcbiAgICogb3JcbiAgICogdmFyIGJveFpvbmUgPSBuZXcgQm94Wm9uZShuZXcgVmVjdG9yM0QoMCwwLDApLCA1MCwgNTAsIDUwKTtcbiAgICogQGV4dGVuZHMge1pvbmV9XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgYywgZCwgZSwgZikge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgLy8gVE9ETyB0aGlzIHJlYXNzaWduaW5nIG9mIGFyZ3VtZW50cyBpcyBwcmV0dHkgZGFuZ2Vyb3VzLCBuZWVkIHRvIGZpeCBpdC5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB2YXIgeCwgeSwgeiwgdywgaCwgZDtcblxuICAgIGlmIChVdGlsLmlzVW5kZWZpbmVkKGIsIGMsIGQsIGUsIGYpKSB7XG4gICAgICB4ID0geSA9IHogPSAwO1xuICAgICAgdyA9IGggPSBkID0gYSB8fCAxMDA7XG4gICAgfSBlbHNlIGlmIChVdGlsLmlzVW5kZWZpbmVkKGQsIGUsIGYpKSB7XG4gICAgICB4ID0geSA9IHogPSAwO1xuICAgICAgdyA9IGE7XG4gICAgICBoID0gYjtcbiAgICAgIGQgPSBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gYTtcbiAgICAgIHkgPSBiO1xuICAgICAgeiA9IGM7XG4gICAgICB3ID0gZDtcbiAgICAgIGggPSBlO1xuICAgICAgZCA9IGY7XG4gICAgfVxuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHo7XG4gICAgdGhpcy53aWR0aCA9IHc7XG4gICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIHRoaXMuZGVwdGggPSBkO1xuICAgIC8vIFRPRE8gU2V0IHRoaXMgdmlhIGFuIGFyZ3VtZW50IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgIHRoaXMuZnJpY3Rpb24gPSAwLjg1O1xuICAgIC8vIFRPRE8gU2V0IHRoaXMgdmlhIGFuIGFyZ3VtZW50IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgIHRoaXMubWF4ID0gNjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIEJveFpvbmUuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc0JveFpvbmUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgTWF0aFV0aWxzLnJhbmRvbUFUb0IoLTAuNSwgMC41KSAqIHRoaXMud2lkdGg7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueSArIE1hdGhVdGlscy5yYW5kb21BVG9CKC0wLjUsIDAuNSkgKiB0aGlzLmhlaWdodDtcbiAgICB0aGlzLnZlY3Rvci56ID0gdGhpcy56ICsgTWF0aFV0aWxzLnJhbmRvbUFUb0IoLTAuNSwgMC41KSAqIHRoaXMuZGVwdGg7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBfZGVhZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5wb3NpdGlvbi54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54IC0gdGhpcy53aWR0aCAvIDIpXG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICBlbHNlIGlmIChwYXJ0aWNsZS5wb3NpdGlvbi54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCAvIDIpXG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcblxuICAgIGlmIChwYXJ0aWNsZS5wb3NpdGlvbi55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55IC0gdGhpcy5oZWlnaHQgLyAyKVxuICAgICAgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgZWxzZSBpZiAocGFydGljbGUucG9zaXRpb24ueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMilcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuXG4gICAgaWYgKHBhcnRpY2xlLnBvc2l0aW9uLnogKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnogLSB0aGlzLmRlcHRoIC8gMilcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIGVsc2UgaWYgKHBhcnRpY2xlLnBvc2l0aW9uLnogLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnogKyB0aGlzLmRlcHRoIC8gMilcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICB9XG5cbiAgX2JvdW5kKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLnBvc2l0aW9uLnggLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnggLSB0aGlzLndpZHRoIC8gMikge1xuICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHRoaXMueCAtIHRoaXMud2lkdGggLyAyICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgcGFydGljbGUudmVsb2NpdHkueCAqPSAtdGhpcy5mcmljdGlvbjtcbiAgICAgIHRoaXMuX3N0YXRpYyhwYXJ0aWNsZSwgJ3gnKTtcbiAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnBvc2l0aW9uLnggKyBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoIC8gMikge1xuICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHRoaXMueCArIHRoaXMud2lkdGggLyAyIC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgcGFydGljbGUudmVsb2NpdHkueCAqPSAtdGhpcy5mcmljdGlvbjtcbiAgICAgIHRoaXMuX3N0YXRpYyhwYXJ0aWNsZSwgJ3gnKTtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUucG9zaXRpb24ueSAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAtIHRoaXMuaGVpZ2h0IC8gMikge1xuICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHRoaXMueSAtIHRoaXMuaGVpZ2h0IC8gMiArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgKj0gLXRoaXMuZnJpY3Rpb247XG4gICAgICB0aGlzLl9zdGF0aWMocGFydGljbGUsICd5Jyk7XG4gICAgfSBlbHNlIGlmIChwYXJ0aWNsZS5wb3NpdGlvbi55ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyKSB7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyIC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgcGFydGljbGUudmVsb2NpdHkueSAqPSAtdGhpcy5mcmljdGlvbjtcbiAgICAgIHRoaXMuX3N0YXRpYyhwYXJ0aWNsZSwgJ3knKTtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUucG9zaXRpb24ueiAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueiAtIHRoaXMuZGVwdGggLyAyKSB7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ID0gdGhpcy56IC0gdGhpcy5kZXB0aCAvIDIgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICBwYXJ0aWNsZS52ZWxvY2l0eS56ICo9IC10aGlzLmZyaWN0aW9uO1xuICAgICAgdGhpcy5fc3RhdGljKHBhcnRpY2xlLCAneicpO1xuICAgIH0gZWxzZSBpZiAocGFydGljbGUucG9zaXRpb24ueiArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueiArIHRoaXMuZGVwdGggLyAyKSB7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ID0gdGhpcy56ICsgdGhpcy5kZXB0aCAvIDIgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICBwYXJ0aWNsZS52ZWxvY2l0eS56ICo9IC10aGlzLmZyaWN0aW9uO1xuICAgICAgdGhpcy5fc3RhdGljKHBhcnRpY2xlLCAneicpO1xuICAgIH1cbiAgfVxuXG4gIF9zdGF0aWMocGFydGljbGUsIGF4aXMpIHtcbiAgICBpZiAocGFydGljbGUudmVsb2NpdHlbYXhpc10gKiBwYXJ0aWNsZS5hY2NlbGVyYXRpb25bYXhpc10gPiAwKSByZXR1cm47XG4gICAgaWYgKFxuICAgICAgTWF0aC5hYnMocGFydGljbGUudmVsb2NpdHlbYXhpc10pIDxcbiAgICAgIE1hdGguYWJzKHBhcnRpY2xlLmFjY2VsZXJhdGlvbltheGlzXSkgKiAwLjAxNjcgKiB0aGlzLm1heFxuICAgICkge1xuICAgICAgcGFydGljbGUudmVsb2NpdHlbYXhpc10gPSAwO1xuICAgICAgcGFydGljbGUuYWNjZWxlcmF0aW9uW2F4aXNdID0gMDtcbiAgICB9XG4gIH1cblxuICBfY3Jvc3MocGFydGljbGUpIHtcbiAgICBpZiAoXG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54IC0gdGhpcy53aWR0aCAvIDIgJiZcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnggPD0gMFxuICAgIClcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSB0aGlzLnggKyB0aGlzLndpZHRoIC8gMiArIHBhcnRpY2xlLnJhZGl1cztcbiAgICBlbHNlIGlmIChcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnggKyB0aGlzLndpZHRoIC8gMiAmJlxuICAgICAgcGFydGljbGUudmVsb2NpdHkueCA+PSAwXG4gICAgKVxuICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IHRoaXMueCAtIHRoaXMud2lkdGggLyAyIC0gcGFydGljbGUucmFkaXVzO1xuXG4gICAgaWYgKFxuICAgICAgcGFydGljbGUucG9zaXRpb24ueSArIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueSAtIHRoaXMuaGVpZ2h0IC8gMiAmJlxuICAgICAgcGFydGljbGUudmVsb2NpdHkueSA8PSAwXG4gICAgKVxuICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMiArIHBhcnRpY2xlLnJhZGl1cztcbiAgICBlbHNlIGlmIChcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDIgJiZcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgPj0gMFxuICAgIClcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSB0aGlzLnkgLSB0aGlzLmhlaWdodCAvIDIgLSBwYXJ0aWNsZS5yYWRpdXM7XG5cbiAgICBpZiAoXG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi56ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy56IC0gdGhpcy5kZXB0aCAvIDIgJiZcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnogPD0gMFxuICAgIClcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSB0aGlzLnogKyB0aGlzLmRlcHRoIC8gMiArIHBhcnRpY2xlLnJhZGl1cztcbiAgICBlbHNlIGlmIChcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnogKyB0aGlzLmRlcHRoIC8gMiAmJlxuICAgICAgcGFydGljbGUudmVsb2NpdHkueiA+PSAwXG4gICAgKVxuICAgICAgcGFydGljbGUucG9zaXRpb24ueiA9IHRoaXMueiAtIHRoaXMuZGVwdGggLyAyIC0gcGFydGljbGUucmFkaXVzO1xuICB9XG59XG4iXX0=