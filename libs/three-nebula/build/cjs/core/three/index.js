"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Vector3: true,
  Quaternion: true,
  Euler: true
};
Object.defineProperty(exports, "Vector3", {
  enumerable: true,
  get: function get() {
    return _Vector.Vector3;
  }
});
Object.defineProperty(exports, "Quaternion", {
  enumerable: true,
  get: function get() {
    return _Quaternion.Quaternion;
  }
});
Object.defineProperty(exports, "Euler", {
  enumerable: true,
  get: function get() {
    return _Euler.Euler;
  }
});

var _Vector = require("./Vector3");

var _Quaternion = require("./Quaternion");

var _Euler = require("./Euler");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3RocmVlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9WZWN0b3IzJztcbmV4cG9ydCB7IFF1YXRlcm5pb24gfSBmcm9tICcuL1F1YXRlcm5pb24nO1xuZXhwb3J0IHsgRXVsZXIgfSBmcm9tICcuL0V1bGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbiJdfQ==