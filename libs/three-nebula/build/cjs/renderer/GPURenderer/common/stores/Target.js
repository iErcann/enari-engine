"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Target = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Simple class that stores the particle's "target" or "next" state.
 *
 */
var Target = /*#__PURE__*/function () {
  function Target(THREE) {
    (0, _classCallCheck2["default"])(this, Target);
    this.position = new THREE.Vector3();
    this.size = 0;
    this.color = new THREE.Color();
    this.alpha = 0;
    this.texture = null;
    this.index = 0;
  }

  (0, _createClass2["default"])(Target, [{
    key: "reset",
    value: function reset() {
      this.position.set(0, 0, 0);
      this.size = 0;
      this.color.setRGB(0, 0, 0);
      this.alpha = 0;
      this.texture = null;
    }
  }]);
  return Target;
}();

exports.Target = Target;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9jb21tb24vc3RvcmVzL1RhcmdldC5qcyJdLCJuYW1lcyI6WyJUYXJnZXQiLCJUSFJFRSIsInBvc2l0aW9uIiwiVmVjdG9yMyIsInNpemUiLCJjb2xvciIsIkNvbG9yIiwiYWxwaGEiLCJ0ZXh0dXJlIiwiaW5kZXgiLCJzZXQiLCJzZXRSR0IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxNO0FBQ1gsa0JBQVlDLEtBQVosRUFBbUI7QUFBQTtBQUNqQixTQUFLQyxRQUFMLEdBQWdCLElBQUlELEtBQUssQ0FBQ0UsT0FBVixFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQUlKLEtBQUssQ0FBQ0ssS0FBVixFQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7Ozs7NEJBRU87QUFDTixXQUFLUCxRQUFMLENBQWNRLEdBQWQsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDQSxXQUFLTixJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUtDLEtBQUwsQ0FBV00sTUFBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtBQUNBLFdBQUtKLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU2ltcGxlIGNsYXNzIHRoYXQgc3RvcmVzIHRoZSBwYXJ0aWNsZSdzIFwidGFyZ2V0XCIgb3IgXCJuZXh0XCIgc3RhdGUuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgVGFyZ2V0IHtcbiAgY29uc3RydWN0b3IoVEhSRUUpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICB0aGlzLnNpemUgPSAwO1xuICAgIHRoaXMuY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgICB0aGlzLmFscGhhID0gMDtcbiAgICB0aGlzLnRleHR1cmUgPSBudWxsO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLmNvbG9yLnNldFJHQigwLCAwLCAwKTtcbiAgICB0aGlzLmFscGhhID0gMDtcbiAgICB0aGlzLnRleHR1cmUgPSBudWxsO1xuICB9XG59XG4iXX0=