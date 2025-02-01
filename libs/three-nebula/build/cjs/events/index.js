"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _EventDispatcher = _interopRequireDefault(require("./EventDispatcher"));

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});
var _default = _EventDispatcher["default"];
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ldmVudHMvaW5kZXguanMiXSwibmFtZXMiOlsiRXZlbnREaXNwYXRjaGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7ZUFEZUEsMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4vRXZlbnREaXNwYXRjaGVyJztcblxuZXhwb3J0IGRlZmF1bHQgRXZlbnREaXNwYXRjaGVyO1xuZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuIl19