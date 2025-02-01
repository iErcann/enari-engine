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

var _THREEUtil = _interopRequireDefault(require("../utils/THREEUtil"));

var _Vector3D = _interopRequireDefault(require("../math/Vector3D"));

var _Zone2 = _interopRequireDefault(require("./Zone"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ScreenZone = /*#__PURE__*/function (_Zone) {
  (0, _inherits2["default"])(ScreenZone, _Zone);

  var _super = _createSuper(ScreenZone);

  /**
   * ScreenZone is a 3d line zone
   * @param {Number|Vector3D} x1 - the line's start point of x value or a Vector3D Object
   * @param {Number|Vector3D} y1 - the line's start point of y value or a Vector3D Object
   * @param {Number} z1 - the line's start point of z value
   * @param {Number} x2 - the line's end point of x value
   * @param {Number} y2 - the line's end point of y value
   * @param {Number} z2 - the line's end point of z value
   * @example
   * var lineZone = new ScreenZone(0,0,0,100,100,0);
   * or
   * var lineZone = new ScreenZone(new Vector3D(0,0,0),new Vector3D(100,100,0));
   * @extends {Zone}
   * @constructor
   */
  function ScreenZone(camera, renderer, dis, dir) {
    var _this;

    (0, _classCallCheck2["default"])(this, ScreenZone);
    _this = _super.call(this, _types.ZONE_TYPE_SCREEN);
    _this.camera = camera;
    _this.renderer = renderer;
    _this.dis = dis || 20;
    dir = dir || '1234';

    for (var i = 1; i < 5; i++) {
      _this['d' + i] = dir.indexOf(i + '') >= 0;
    }

    return _this;
  }
  /**
   * Returns true to indicate this is a ScreenZone.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(ScreenZone, [{
    key: "isScreenZone",
    value: function isScreenZone() {
      return true;
    }
  }, {
    key: "_dead",
    value: function _dead(particle) {
      var pos = _THREEUtil["default"].toScreenPos(particle.position, this.camera, this.renderer.domElement);

      var canvas = this.renderer.domElement;

      if (pos.y + particle.radius < -this.dis && this.d1) {
        particle.dead = true;
      } else if (pos.y - particle.radius > canvas.height + this.dis && this.d3) {
        particle.dead = true;
      }

      if (pos.x + particle.radius < -this.dis && this.d4) {
        particle.dead = true;
      } else if (pos.x - particle.radius > canvas.width + this.dis && this.d2) {
        particle.dead = true;
      }
    }
  }, {
    key: "_bound",
    value: function _bound(particle) {
      var pos = _THREEUtil["default"].toScreenPos(particle.position, this.camera, this.renderer.domElement);

      var canvas = this.renderer.domElement;

      if (pos.y + particle.radius < -this.dis) {
        particle.velocity.y *= -1;
      } else if (pos.y - particle.radius > canvas.height + this.dis) {
        particle.velocity.y *= -1;
      }

      if (pos.x + particle.radius < -this.dis) {
        particle.velocity.y *= -1;
      } else if (pos.x - particle.radius > canvas.width + this.dis) {
        particle.velocity.y *= -1;
      }
    }
  }]);
  return ScreenZone;
}(_Zone2["default"]);

exports["default"] = ScreenZone;

ScreenZone.prototype.getPosition = function () {
  var vec2 = new _Vector3D["default"](),
      canvas;
  return function () {
    canvas = this.renderer.domElement;
    vec2.x = Math.random() * canvas.width;
    vec2.y = Math.random() * canvas.height;
    this.vector.copy(_THREEUtil["default"].toSpacePos(vec2, this.camera, canvas));
    return this.vector;
  };
}();

ScreenZone.prototype._cross = function () {
  var vec2 = new _Vector3D["default"]();
  return function (particle) {
    var pos = _THREEUtil["default"].toScreenPos(particle.position, this.camera, this.renderer.domElement);

    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis) {
      vec2.x = pos.x;
      vec2.y = canvas.height + this.dis + particle.radius;
      particle.position.y = _THREEUtil["default"].toSpacePos(vec2, this.camera, canvas).y;
    } else if (pos.y - particle.radius > canvas.height + this.dis) {
      vec2.x = pos.x;
      vec2.y = -this.dis - particle.radius;
      particle.position.y = _THREEUtil["default"].toSpacePos(vec2, this.camera, canvas).y;
    }

    if (pos.x + particle.radius < -this.dis) {
      vec2.y = pos.y;
      vec2.x = canvas.width + this.dis + particle.radius;
      particle.position.x = _THREEUtil["default"].toSpacePos(vec2, this.camera, canvas).x;
    } else if (pos.x - particle.radius > canvas.width + this.dis) {
      vec2.y = pos.y;
      vec2.x = -this.dis - particle.radius;
      particle.position.x = _THREEUtil["default"].toSpacePos(vec2, this.camera, canvas).x;
    }
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1NjcmVlblpvbmUuanMiXSwibmFtZXMiOlsiU2NyZWVuWm9uZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiZGlzIiwiZGlyIiwidHlwZSIsImkiLCJpbmRleE9mIiwicGFydGljbGUiLCJwb3MiLCJUSFJFRVV0aWwiLCJ0b1NjcmVlblBvcyIsInBvc2l0aW9uIiwiZG9tRWxlbWVudCIsImNhbnZhcyIsInkiLCJyYWRpdXMiLCJkMSIsImRlYWQiLCJoZWlnaHQiLCJkMyIsIngiLCJkNCIsIndpZHRoIiwiZDIiLCJ2ZWxvY2l0eSIsIlpvbmUiLCJwcm90b3R5cGUiLCJnZXRQb3NpdGlvbiIsInZlYzIiLCJWZWN0b3IzRCIsIk1hdGgiLCJyYW5kb20iLCJ2ZWN0b3IiLCJjb3B5IiwidG9TcGFjZVBvcyIsIl9jcm9zcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7SUFFcUJBLFU7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHNCQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsR0FBOUIsRUFBbUNDLEdBQW5DLEVBQXdDO0FBQUE7O0FBQUE7QUFDdEMsOEJBQU1DLHVCQUFOO0FBRUEsVUFBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxVQUFLQyxHQUFMLEdBQVdBLEdBQUcsSUFBSSxFQUFsQjtBQUNBQyxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSSxNQUFiOztBQUVBLFNBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QjtBQUE0QixZQUFLLE1BQU1BLENBQVgsSUFBZ0JGLEdBQUcsQ0FBQ0csT0FBSixDQUFZRCxDQUFDLEdBQUcsRUFBaEIs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LENBQUwsR0FBU04sR0FBRyxDQUFDTSxDQUFiO0FBQ0FjLE1BQUFBLElBQUksQ0FBQ1IsQ0FBTCxHQUFTLENBQUMsS0FBS2xCLEdBQU4sR0FBWUssUUFBUSxDQUFDUSxNQUE5QjtBQUNBUixNQUFBQSxRQUFRLENBQUNJLFFBQVQsQ0FBa0JTLENBQWxCLEdBQXNCWCxzQkFBVXlCLFVBQVYsQ0FBcUJOLElBQXJCLEVBQTJCLEtBQUs1QixNQUFoQyxFQUF3Q2EsTUFBeEMsRUFBZ0RPLENBQXRFO0FBQ0Q7QUFDRixHQTNCRDtBQTRCRCxDQS9CNkIsRUFBOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVEhSRUVVdGlsIGZyb20gJy4uL3V0aWxzL1RIUkVFVXRpbCc7XG5pbXBvcnQgVmVjdG9yM0QgZnJvbSAnLi4vbWF0aC9WZWN0b3IzRCc7XG5pbXBvcnQgWm9uZSBmcm9tICcuL1pvbmUnO1xuaW1wb3J0IHsgWk9ORV9UWVBFX1NDUkVFTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlblpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIFNjcmVlblpvbmUgaXMgYSAzZCBsaW5lIHpvbmVcbiAgICogQHBhcmFtIHtOdW1iZXJ8VmVjdG9yM0R9IHgxIC0gdGhlIGxpbmUncyBzdGFydCBwb2ludCBvZiB4IHZhbHVlIG9yIGEgVmVjdG9yM0QgT2JqZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfFZlY3RvcjNEfSB5MSAtIHRoZSBsaW5lJ3Mgc3RhcnQgcG9pbnQgb2YgeSB2YWx1ZSBvciBhIFZlY3RvcjNEIE9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gejEgLSB0aGUgbGluZSdzIHN0YXJ0IHBvaW50IG9mIHogdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHgyIC0gdGhlIGxpbmUncyBlbmQgcG9pbnQgb2YgeCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0geTIgLSB0aGUgbGluZSdzIGVuZCBwb2ludCBvZiB5IHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MiAtIHRoZSBsaW5lJ3MgZW5kIHBvaW50IG9mIHogdmFsdWVcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIGxpbmVab25lID0gbmV3IFNjcmVlblpvbmUoMCwwLDAsMTAwLDEwMCwwKTtcbiAgICogb3JcbiAgICogdmFyIGxpbmVab25lID0gbmV3IFNjcmVlblpvbmUobmV3IFZlY3RvcjNEKDAsMCwwKSxuZXcgVmVjdG9yM0QoMTAwLDEwMCwwKSk7XG4gICAqIEBleHRlbmRzIHtab25lfVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNhbWVyYSwgcmVuZGVyZXIsIGRpcywgZGlyKSB7XG4gICAgc3VwZXIodHlwZSk7XG5cbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5kaXMgPSBkaXMgfHwgMjA7XG4gICAgZGlyID0gZGlyIHx8ICcxMjM0JztcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNTsgaSsrKSB0aGlzWydkJyArIGldID0gZGlyLmluZGV4T2YoaSArICcnKSA+PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgU2NyZWVuWm9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU2NyZWVuWm9uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIF9kZWFkKHBhcnRpY2xlKSB7XG4gICAgdmFyIHBvcyA9IFRIUkVFVXRpbC50b1NjcmVlblBvcyhcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLFxuICAgICAgdGhpcy5jYW1lcmEsXG4gICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnRcbiAgICApO1xuICAgIHZhciBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cbiAgICBpZiAocG9zLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCAtdGhpcy5kaXMgJiYgdGhpcy5kMSkge1xuICAgICAgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChwb3MueSAtIHBhcnRpY2xlLnJhZGl1cyA+IGNhbnZhcy5oZWlnaHQgKyB0aGlzLmRpcyAmJiB0aGlzLmQzKSB7XG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocG9zLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCAtdGhpcy5kaXMgJiYgdGhpcy5kNCkge1xuICAgICAgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChwb3MueCAtIHBhcnRpY2xlLnJhZGl1cyA+IGNhbnZhcy53aWR0aCArIHRoaXMuZGlzICYmIHRoaXMuZDIpIHtcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIF9ib3VuZChwYXJ0aWNsZSkge1xuICAgIHZhciBwb3MgPSBUSFJFRVV0aWwudG9TY3JlZW5Qb3MoXG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbixcbiAgICAgIHRoaXMuY2FtZXJhLFxuICAgICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50XG4gICAgKTtcbiAgICB2YXIgY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG4gICAgaWYgKHBvcy55ICsgcGFydGljbGUucmFkaXVzIDwgLXRoaXMuZGlzKSB7XG4gICAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ICo9IC0xO1xuICAgIH0gZWxzZSBpZiAocG9zLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiBjYW52YXMuaGVpZ2h0ICsgdGhpcy5kaXMpIHtcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuXG4gICAgaWYgKHBvcy54ICsgcGFydGljbGUucmFkaXVzIDwgLXRoaXMuZGlzKSB7XG4gICAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ICo9IC0xO1xuICAgIH0gZWxzZSBpZiAocG9zLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiBjYW52YXMud2lkdGggKyB0aGlzLmRpcykge1xuICAgICAgcGFydGljbGUudmVsb2NpdHkueSAqPSAtMTtcbiAgICB9XG4gIH1cbn1cblxuU2NyZWVuWm9uZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB2ZWMyID0gbmV3IFZlY3RvcjNEKCksXG4gICAgY2FudmFzO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgdmVjMi54ID0gTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aDtcbiAgICB2ZWMyLnkgPSBNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodDtcbiAgICB0aGlzLnZlY3Rvci5jb3B5KFRIUkVFVXRpbC50b1NwYWNlUG9zKHZlYzIsIHRoaXMuY2FtZXJhLCBjYW52YXMpKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfTtcbn0pKCk7XG5cblNjcmVlblpvbmUucHJvdG90eXBlLl9jcm9zcyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHZlYzIgPSBuZXcgVmVjdG9yM0QoKTtcblxuICByZXR1cm4gZnVuY3Rpb24ocGFydGljbGUpIHtcbiAgICB2YXIgcG9zID0gVEhSRUVVdGlsLnRvU2NyZWVuUG9zKFxuICAgICAgcGFydGljbGUucG9zaXRpb24sXG4gICAgICB0aGlzLmNhbWVyYSxcbiAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudFxuICAgICk7XG4gICAgdmFyIGNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcblxuICAgIGlmIChwb3MueSArIHBhcnRpY2xlLnJhZGl1cyA8IC10aGlzLmRpcykge1xuICAgICAgdmVjMi54ID0gcG9zLng7XG4gICAgICB2ZWMyLnkgPSBjYW52YXMuaGVpZ2h0ICsgdGhpcy5kaXMgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gVEhSRUVVdGlsLnRvU3BhY2VQb3ModmVjMiwgdGhpcy5jYW1lcmEsIGNhbnZhcykueTtcbiAgICB9IGVsc2UgaWYgKHBvcy55IC0gcGFydGljbGUucmFkaXVzID4gY2FudmFzLmhlaWdodCArIHRoaXMuZGlzKSB7XG4gICAgICB2ZWMyLnggPSBwb3MueDtcbiAgICAgIHZlYzIueSA9IC10aGlzLmRpcyAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnkgPSBUSFJFRVV0aWwudG9TcGFjZVBvcyh2ZWMyLCB0aGlzLmNhbWVyYSwgY2FudmFzKS55O1xuICAgIH1cblxuICAgIGlmIChwb3MueCArIHBhcnRpY2xlLnJhZGl1cyA8IC10aGlzLmRpcykge1xuICAgICAgdmVjMi55ID0gcG9zLnk7XG4gICAgICB2ZWMyLnggPSBjYW52YXMud2lkdGggKyB0aGlzLmRpcyArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSBUSFJFRVV0aWwudG9TcGFjZVBvcyh2ZWMyLCB0aGlzLmNhbWVyYSwgY2FudmFzKS54O1xuICAgIH0gZWxzZSBpZiAocG9zLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiBjYW52YXMud2lkdGggKyB0aGlzLmRpcykge1xuICAgICAgdmVjMi55ID0gcG9zLnk7XG4gICAgICB2ZWMyLnggPSAtdGhpcy5kaXMgLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0gVEhSRUVVdGlsLnRvU3BhY2VQb3ModmVjMiwgdGhpcy5jYW1lcmEsIGNhbnZhcykueDtcbiAgICB9XG4gIH07XG59KSgpO1xuIl19