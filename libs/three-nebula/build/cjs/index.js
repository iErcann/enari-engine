"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  System: true,
  Particle: true,
  Pool: true
};
Object.defineProperty(exports, "System", {
  enumerable: true,
  get: function get() {
    return _core.System;
  }
});
Object.defineProperty(exports, "Particle", {
  enumerable: true,
  get: function get() {
    return _core.Particle;
  }
});
Object.defineProperty(exports, "Pool", {
  enumerable: true,
  get: function get() {
    return _core.Pool;
  }
});
exports["default"] = void 0;

var _core = require("./core");

var _behaviour = require("./behaviour");

Object.keys(_behaviour).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _behaviour[key];
    }
  });
});

var _debug = require("./debug");

Object.keys(_debug).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _debug[key];
    }
  });
});

var _ease = require("./ease");

Object.keys(_ease).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ease[key];
    }
  });
});

var _emitter = require("./emitter");

Object.keys(_emitter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _emitter[key];
    }
  });
});

var _initializer = require("./initializer");

Object.keys(_initializer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _initializer[key];
    }
  });
});

var _math = require("./math");

Object.keys(_math).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _math[key];
    }
  });
});

var _renderer = require("./renderer");

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderer[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _zone = require("./zone");

Object.keys(_zone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _zone[key];
    }
  });
});
var _default = _core.System;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTeXN0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO2VBRWVBLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTeXN0ZW0gfSBmcm9tICcuL2NvcmUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2JlaGF2aW91cic7XG5leHBvcnQgKiBmcm9tICcuL2RlYnVnJztcbmV4cG9ydCAqIGZyb20gJy4vZWFzZSc7XG5leHBvcnQgKiBmcm9tICcuL2VtaXR0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9pbml0aWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuL21hdGgnO1xuZXhwb3J0ICogZnJvbSAnLi9yZW5kZXJlcic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCAqIGZyb20gJy4vem9uZSc7XG5leHBvcnQgeyBTeXN0ZW0sIFBhcnRpY2xlLCBQb29sIH0gZnJvbSAnLi9jb3JlJztcbmV4cG9ydCBkZWZhdWx0IFN5c3RlbTtcbiJdfQ==