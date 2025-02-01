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

var _BaseRenderer2 = _interopRequireDefault(require("./BaseRenderer"));

var _core = require("../core");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CustomRenderer = /*#__PURE__*/function (_BaseRenderer) {
  (0, _inherits2["default"])(CustomRenderer, _BaseRenderer);

  var _super = _createSuper(CustomRenderer);

  function CustomRenderer() {
    var _this;

    (0, _classCallCheck2["default"])(this, CustomRenderer);
    _this = _super.call(this, _types.RENDERER_TYPE_CUSTOM);
    _this.targetPool = new _core.Pool();
    _this.materialPool = new _core.Pool();
    return _this;
  }

  (0, _createClass2["default"])(CustomRenderer, [{
    key: "onSystemUpdate",
    value: function onSystemUpdate() {}
  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {} // eslint-disable-line

  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {} // eslint-disable-line

  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {} // eslint-disable-line

  }]);
  return CustomRenderer;
}(_BaseRenderer2["default"]);

exports["default"] = CustomRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXJlci9DdXN0b21SZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJDdXN0b21SZW5kZXJlciIsInR5cGUiLCJ0YXJnZXRQb29sIiwiUG9vbCIsIm1hdGVyaWFsUG9vbCIsInBhcnRpY2xlIiwiQmFzZVJlbmRlcmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVxQkEsYzs7Ozs7QUFDbkIsNEJBQWM7QUFBQTs7QUFBQTtBQUNaLDhCQUFNQywyQkFBTjtBQUVBLFVBQUtDLFVBQUwsR0FBa0IsSUFBSUMsVUFBSixFQUFsQjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsSUFBSUQsVUFBSixFQUFwQjtBQUpZO0FBS2I7Ozs7cUNBRWdCLENBQUU7OztzQ0FFREUsUSxFQUFVLENBQUUsQyxDQUFDOzs7O3FDQUVkQSxRLEVBQVUsQ0FBRSxDLENBQUM7Ozs7bUNBRWZBLFEsRUFBVSxDQUFFLEMsQ0FBQzs7OztFQWRjQyx5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSAnLi9CYXNlUmVuZGVyZXInO1xuaW1wb3J0IHsgUG9vbCB9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHsgUkVOREVSRVJfVFlQRV9DVVNUT00gYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgdGhpcy50YXJnZXRQb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLm1hdGVyaWFsUG9vbCA9IG5ldyBQb29sKCk7XG4gIH1cblxuICBvblN5c3RlbVVwZGF0ZSgpIHt9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbn1cbiJdfQ==