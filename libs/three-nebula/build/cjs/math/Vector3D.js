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

var _three = require("../core/three/");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Vector3D = /*#__PURE__*/function (_Vector) {
  (0, _inherits2["default"])(Vector3D, _Vector);

  var _super = _createSuper(Vector3D);

  function Vector3D() {
    (0, _classCallCheck2["default"])(this, Vector3D);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Vector3D, [{
    key: "clear",
    value: function clear() {
      this.x = 0.0;
      this.y = 0.0;
      this.z = 0.0;
      return this;
    }
  }, {
    key: "scalar",
    value: function scalar(s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
  }, {
    key: "addValue",
    value: function addValue(a, b, c) {
      this.x += a;
      this.y += b;
      this.z += c;
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return 'x:' + this.x + 'y:' + this.y + 'z:' + this.z;
    }
  }, {
    key: "eulerFromDir",
    value: function eulerFromDir(vector3D) {
      var euler = new _three.Euler();
      return euler.setFromVector3(vector3D);
    }
  }]);
  return Vector3D;
}(_three.Vector3);

exports["default"] = Vector3D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1ZlY3RvcjNELmpzIl0sIm5hbWVzIjpbIlZlY3RvcjNEIiwieCIsInkiLCJ6IiwicyIsImEiLCJiIiwiYyIsInZlY3RvcjNEIiwiZXVsZXIiLCJFdWxlciIsInNldEZyb21WZWN0b3IzIiwiVmVjdG9yMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs0QkFDWDtBQUNOLFdBQUtDLENBQUwsR0FBUyxHQUFUO0FBQ0EsV0FBS0MsQ0FBTCxHQUFTLEdBQVQ7QUFDQSxXQUFLQyxDQUFMLEdBQVMsR0FBVDtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7MkJBRU1DLEMsRUFBRztBQUNSLFdBQUtILENBQUwsSUFBVUcsQ0FBVjtBQUNBLFdBQUtGLENBQUwsSUFBVUUsQ0FBVjtBQUNBLFdBQUtELENBQUwsSUFBVUMsQ0FBVjtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVFDLEMsRUFBR0MsQyxFQUFHQyxDLEVBQUc7QUFDaEIsV0FBS04sQ0FBTCxJQUFVSSxDQUFWO0FBQ0EsV0FBS0gsQ0FBTCxJQUFVSSxDQUFWO0FBQ0EsV0FBS0gsQ0FBTCxJQUFVSSxDQUFWO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU8sT0FBTyxLQUFLTixDQUFaLEdBQWdCLElBQWhCLEdBQXVCLEtBQUtDLENBQTVCLEdBQWdDLElBQWhDLEdBQXVDLEtBQUtDLENBQW5EO0FBQ0Q7OztpQ0FFWUssUSxFQUFVO0FBQ3JCLFVBQU1DLEtBQUssR0FBRyxJQUFJQyxZQUFKLEVBQWQ7QUFFQSxhQUFPRCxLQUFLLENBQUNFLGNBQU4sQ0FBcUJILFFBQXJCLENBQVA7QUFDRDs7O0VBakNtQ0ksYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV1bGVyLCBWZWN0b3IzIH0gZnJvbSAnLi4vY29yZS90aHJlZS8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IzRCBleHRlbmRzIFZlY3RvcjMge1xuICBjbGVhcigpIHtcbiAgICB0aGlzLnggPSAwLjA7XG4gICAgdGhpcy55ID0gMC4wO1xuICAgIHRoaXMueiA9IDAuMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcbiAgICB0aGlzLnogKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkVmFsdWUoYSwgYiwgYykge1xuICAgIHRoaXMueCArPSBhO1xuICAgIHRoaXMueSArPSBiO1xuICAgIHRoaXMueiArPSBjO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ3g6JyArIHRoaXMueCArICd5OicgKyB0aGlzLnkgKyAnejonICsgdGhpcy56O1xuICB9XG5cbiAgZXVsZXJGcm9tRGlyKHZlY3RvcjNEKSB7XG4gICAgY29uc3QgZXVsZXIgPSBuZXcgRXVsZXIoKTtcblxuICAgIHJldHVybiBldWxlci5zZXRGcm9tVmVjdG9yMyh2ZWN0b3IzRCk7XG4gIH1cbn1cbiJdfQ==