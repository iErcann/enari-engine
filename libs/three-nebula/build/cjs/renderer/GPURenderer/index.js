"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _BaseRenderer2 = _interopRequireDefault(require("../BaseRenderer"));

var _constants = require("./common/constants");

var _Desktop = _interopRequireDefault(require("./Desktop"));

var _Mobile = _interopRequireDefault(require("./Mobile"));

var _types = require("../types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Performant particle renderer that uses THREE.Points to propagate particle (postiion, rgba etc.,) properties to
 * vertices in a ParticleBufferGeometry.
 * Uses a dynamic texture atlas to support systems with mutliple sprites in a performant way.
 *
 * NOTE! This is an experimental renderer and is currently not covered by tests, coverage will be added when the API
 * is more stable. Currently only compatible with sprite/texture based systems. Meshes are not yet supported.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 */
var GPURenderer = /*#__PURE__*/function (_BaseRenderer) {
  (0, _inherits2["default"])(GPURenderer, _BaseRenderer);

  var _super = _createSuper(GPURenderer);

  function GPURenderer(container, THREE) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_RENDERER_OPTIONS;
    (0, _classCallCheck2["default"])(this, GPURenderer);
    _this = _super.call(this, _types.RENDERER_TYPE_GPU);
    var shouldForceDesktopRenderer = options.shouldForceDesktopRenderer,
        shouldForceMobileRenderer = options.shouldForceMobileRenderer;
    var args = [container, THREE, options];

    if (shouldForceDesktopRenderer) {
      return (0, _possibleConstructorReturn2["default"])(_this, (0, _construct2["default"])(_Desktop["default"], args));
    }

    if (shouldForceMobileRenderer) {
      return (0, _possibleConstructorReturn2["default"])(_this, (0, _construct2["default"])(_Mobile["default"], args));
    }

    if (!_this.isFloatingPointTextureSupported()) {
      return (0, _possibleConstructorReturn2["default"])(_this, (0, _construct2["default"])(_Mobile["default"], args));
    }

    return (0, _possibleConstructorReturn2["default"])(_this, (0, _construct2["default"])(_Desktop["default"], args));
  }

  (0, _createClass2["default"])(GPURenderer, [{
    key: "isFloatingPointTextureSupported",
    value: function isFloatingPointTextureSupported() {
      var canvas = document.createElement('canvas');

      if (window.WebGL2RenderingContext && canvas.getContext('webgl2')) {
        // return false here to test the mobile renderer on desktop
        return true;
      }

      var gl = canvas.getContext('webgl');
      var support = !!gl.getExtension('OES_texture_float');
      canvas.remove();
      return support;
    }
  }]);
  return GPURenderer;
}(_BaseRenderer2["default"]);

exports["default"] = GPURenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJHUFVSZW5kZXJlciIsImNvbnRhaW5lciIsIlRIUkVFIiwib3B0aW9ucyIsIkRFRkFVTFRfUkVOREVSRVJfT1BUSU9OUyIsIlJFTkRFUkVSX1RZUEVfR1BVIiwic2hvdWxkRm9yY2VEZXNrdG9wUmVuZGVyZXIiLCJzaG91bGRGb3JjZU1vYmlsZVJlbmRlcmVyIiwiYXJncyIsIkRlc2t0b3BHUFVSZW5kZXJlciIsIk1vYmlsZUdQVVJlbmRlcmVyIiwiaXNGbG9hdGluZ1BvaW50VGV4dHVyZVN1cHBvcnRlZCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsIldlYkdMMlJlbmRlcmluZ0NvbnRleHQiLCJnZXRDb250ZXh0IiwiZ2wiLCJzdXBwb3J0IiwiZ2V0RXh0ZW5zaW9uIiwicmVtb3ZlIiwiQmFzZVJlbmRlcmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsVzs7Ozs7QUFDbkIsdUJBQVlDLFNBQVosRUFBdUJDLEtBQXZCLEVBQWtFO0FBQUE7O0FBQUEsUUFBcENDLE9BQW9DLHVFQUExQkMsbUNBQTBCO0FBQUE7QUFDaEUsOEJBQU1DLHdCQUFOO0FBRGdFLFFBR3hEQywwQkFId0QsR0FHRUgsT0FIRixDQUd4REcsMEJBSHdEO0FBQUEsUUFHNUJDLHlCQUg0QixHQUdFSixPQUhGLENBRzVCSSx5QkFINEI7QUFJaEUsUUFBTUMsSUFBSSxHQUFHLENBQUNQLFNBQUQsRUFBWUMsS0FBWixFQUFtQkMsT0FBbkIsQ0FBYjs7QUFFQSxRQUFJRywwQkFBSixFQUFnQztBQUM5Qiw0RkFBV0csbUJBQVgsRUFBaUNELElBQWpDO0FBQ0Q7O0FBRUQsUUFBSUQseUJBQUosRUFBK0I7QUFDN0IsNEZBQVdHLGtCQUFYLEVBQWdDRixJQUFoQztBQUNEOztBQUVELFFBQUksQ0FBQyxNQUFLRywrQkFBTCxFQUFMLEVBQTZDO0FBQzNDLDRGQUFXRCxrQkFBWCxFQUFnQ0YsSUFBaEM7QUFDRDs7QUFFRCwwRkFBV0MsbUJBQVgsRUFBaUNELElBQWpDO0FBQ0Q7Ozs7c0RBRWlDO0FBQ2hDLFVBQU1JLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWY7O0FBRUEsVUFBSUMsTUFBTSxDQUFDQyxzQkFBUCxJQUFpQ0osTUFBTSxDQUFDSyxVQUFQLENBQWtCLFFBQWxCLENBQXJDLEVBQWtFO0FBQ2hFO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBTUMsRUFBRSxHQUFHTixNQUFNLENBQUNLLFVBQVAsQ0FBa0IsT0FBbEIsQ0FBWDtBQUNBLFVBQU1FLE9BQU8sR0FBRyxDQUFDLENBQUNELEVBQUUsQ0FBQ0UsWUFBSCxDQUFnQixtQkFBaEIsQ0FBbEI7QUFFQVIsTUFBQUEsTUFBTSxDQUFDUyxNQUFQO0FBRUEsYUFBT0YsT0FBUDtBQUNEOzs7RUFwQ3NDRyx5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSAnLi4vQmFzZVJlbmRlcmVyJztcbmltcG9ydCB7IERFRkFVTFRfUkVOREVSRVJfT1BUSU9OUyB9IGZyb20gJy4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgRGVza3RvcEdQVVJlbmRlcmVyIGZyb20gJy4vRGVza3RvcCc7XG5pbXBvcnQgTW9iaWxlR1BVUmVuZGVyZXIgZnJvbSAnLi9Nb2JpbGUnO1xuaW1wb3J0IHsgUkVOREVSRVJfVFlQRV9HUFUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogUGVyZm9ybWFudCBwYXJ0aWNsZSByZW5kZXJlciB0aGF0IHVzZXMgVEhSRUUuUG9pbnRzIHRvIHByb3BhZ2F0ZSBwYXJ0aWNsZSAocG9zdGlpb24sIHJnYmEgZXRjLiwpIHByb3BlcnRpZXMgdG9cbiAqIHZlcnRpY2VzIGluIGEgUGFydGljbGVCdWZmZXJHZW9tZXRyeS5cbiAqIFVzZXMgYSBkeW5hbWljIHRleHR1cmUgYXRsYXMgdG8gc3VwcG9ydCBzeXN0ZW1zIHdpdGggbXV0bGlwbGUgc3ByaXRlcyBpbiBhIHBlcmZvcm1hbnQgd2F5LlxuICpcbiAqIE5PVEUhIFRoaXMgaXMgYW4gZXhwZXJpbWVudGFsIHJlbmRlcmVyIGFuZCBpcyBjdXJyZW50bHkgbm90IGNvdmVyZWQgYnkgdGVzdHMsIGNvdmVyYWdlIHdpbGwgYmUgYWRkZWQgd2hlbiB0aGUgQVBJXG4gKiBpcyBtb3JlIHN0YWJsZS4gQ3VycmVudGx5IG9ubHkgY29tcGF0aWJsZSB3aXRoIHNwcml0ZS90ZXh0dXJlIGJhc2VkIHN5c3RlbXMuIE1lc2hlcyBhcmUgbm90IHlldCBzdXBwb3J0ZWQuXG4gKlxuICogQGF1dGhvciB0aHJheCA8bWFudGhyYXhAZ21haWwuY29tPlxuICogQGF1dGhvciByb2hhbi1kZXNocGFuZGUgPHJvaGFuQGNyZWF0aXZlbGlmZWZvcm0uY29tPlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHUFVSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgVEhSRUUsIG9wdGlvbnMgPSBERUZBVUxUX1JFTkRFUkVSX09QVElPTlMpIHtcbiAgICBzdXBlcihSRU5ERVJFUl9UWVBFX0dQVSk7XG5cbiAgICBjb25zdCB7IHNob3VsZEZvcmNlRGVza3RvcFJlbmRlcmVyLCBzaG91bGRGb3JjZU1vYmlsZVJlbmRlcmVyIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGFyZ3MgPSBbY29udGFpbmVyLCBUSFJFRSwgb3B0aW9uc107XG5cbiAgICBpZiAoc2hvdWxkRm9yY2VEZXNrdG9wUmVuZGVyZXIpIHtcbiAgICAgIHJldHVybiBuZXcgRGVza3RvcEdQVVJlbmRlcmVyKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRGb3JjZU1vYmlsZVJlbmRlcmVyKSB7XG4gICAgICByZXR1cm4gbmV3IE1vYmlsZUdQVVJlbmRlcmVyKC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0Zsb2F0aW5nUG9pbnRUZXh0dXJlU3VwcG9ydGVkKCkpIHtcbiAgICAgIHJldHVybiBuZXcgTW9iaWxlR1BVUmVuZGVyZXIoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEZXNrdG9wR1BVUmVuZGVyZXIoLi4uYXJncyk7XG4gIH1cblxuICBpc0Zsb2F0aW5nUG9pbnRUZXh0dXJlU3VwcG9ydGVkKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgaWYgKHdpbmRvdy5XZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbDInKSkge1xuICAgICAgLy8gcmV0dXJuIGZhbHNlIGhlcmUgdG8gdGVzdCB0aGUgbW9iaWxlIHJlbmRlcmVyIG9uIGRlc2t0b3BcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG4gICAgY29uc3Qgc3VwcG9ydCA9ICEhZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdCcpO1xuXG4gICAgY2FudmFzLnJlbW92ZSgpO1xuXG4gICAgcmV0dXJuIHN1cHBvcnQ7XG4gIH1cbn1cbiJdfQ==