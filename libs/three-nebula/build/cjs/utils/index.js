"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ColorUtil", {
  enumerable: true,
  get: function get() {
    return _ColorUtil["default"];
  }
});
Object.defineProperty(exports, "PUID", {
  enumerable: true,
  get: function get() {
    return _PUID["default"];
  }
});
Object.defineProperty(exports, "THREEUtil", {
  enumerable: true,
  get: function get() {
    return _THREEUtil["default"];
  }
});
Object.defineProperty(exports, "Util", {
  enumerable: true,
  get: function get() {
    return _Util["default"];
  }
});
Object.defineProperty(exports, "uid", {
  enumerable: true,
  get: function get() {
    return _uid["default"];
  }
});
exports.withDefaults = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ColorUtil = _interopRequireDefault(require("./ColorUtil"));

var _PUID = _interopRequireDefault(require("./PUID"));

var _THREEUtil = _interopRequireDefault(require("./THREEUtil"));

var _Util = _interopRequireDefault(require("./Util"));

var _uid = _interopRequireDefault(require("./uid"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var withDefaults = function withDefaults(defaults, properties) {
  return _objectSpread(_objectSpread({}, defaults), properties);
};

exports.withDefaults = withDefaults;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ3aXRoRGVmYXVsdHMiLCJkZWZhdWx0cyIsInByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNDLFFBQUQsRUFBV0MsVUFBWDtBQUFBLHlDQUN2QkQsUUFEdUIsR0FFdkJDLFVBRnVCO0FBQUEsQ0FBckIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBkZWZhdWx0IGFzIENvbG9yVXRpbCB9IGZyb20gJy4vQ29sb3JVdGlsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUFVJRCB9IGZyb20gJy4vUFVJRCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRIUkVFVXRpbCB9IGZyb20gJy4vVEhSRUVVdGlsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVXRpbCB9IGZyb20gJy4vVXRpbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVpZCB9IGZyb20gJy4vdWlkJztcblxuZXhwb3J0IGNvbnN0IHdpdGhEZWZhdWx0cyA9IChkZWZhdWx0cywgcHJvcGVydGllcykgPT4gKHtcbiAgLi4uZGVmYXVsdHMsXG4gIC4uLnByb3BlcnRpZXMsXG59KTtcbiJdfQ==