"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpan = exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _MathUtils = _interopRequireDefault(require("./MathUtils"));

var _Util = _interopRequireDefault(require("../utils/Util"));

var _types = require("./types");

var Span = /*#__PURE__*/function () {
  /**
   * Span Class. Get a random Number from a to b. Or from c-a to c+b
   * @param {Number|Array} a - min number
   * @param {Number} b - max number
   * @param {Number} center - the center's z value
   * @example
   * var span = new Span(0,30);
   * or
   * var span = new Span(["#fff","#ff0","#000"]);
   * or
   * var span = new Span(5,1,"center");
   * @extends {Zone}
   * @constructor
   */
  function Span(a, b, center) {
    (0, _classCallCheck2["default"])(this, Span);
    this._isArray = false;
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = _types.MATH_TYPE_SPAN;

    if (_Util["default"].isArray(a)) {
      this._isArray = true;
      this.a = a;
    } else {
      this.a = _Util["default"].initValue(a, 1);
      this.b = _Util["default"].initValue(b, this.a);
      this._center = _Util["default"].initValue(center, false);
    }
  }
  /**
   * Span.getValue function
   * @name get a random Number from a to b. Or get a random Number from c-a to c+b
   * @param {number} INT or int
   * @return {number} a random Number
   */


  (0, _createClass2["default"])(Span, [{
    key: "getValue",
    value: function getValue(INT) {
      if (this._isArray) {
        return this.a[this.a.length * Math.random() >> 0];
      } else {
        if (!this._center) return _MathUtils["default"].randomAToB(this.a, this.b, INT);else return _MathUtils["default"].randomFloating(this.a, this.b, INT);
      }
    }
  }]);
  return Span;
}();

exports["default"] = Span;

var createSpan = function createSpan(a, b, c) {
  if (a instanceof Span) return a;

  if (b === undefined) {
    return new Span(a);
  } else {
    if (c === undefined) return new Span(a, b);else return new Span(a, b, c);
  }
};

exports.createSpan = createSpan;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1NwYW4uanMiXSwibmFtZXMiOlsiU3BhbiIsImEiLCJiIiwiY2VudGVyIiwiX2lzQXJyYXkiLCJ0eXBlIiwiVXRpbCIsImlzQXJyYXkiLCJpbml0VmFsdWUiLCJfY2VudGVyIiwiSU5UIiwibGVuZ3RoIiwiTWF0aCIsInJhbmRvbSIsIk1hdGhVdGlscyIsInJhbmRvbUFUb0IiLCJyYW5kb21GbG9hdGluZyIsImNyZWF0ZVNwYW4iLCJjIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0lBRXFCQSxJO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxnQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxNQUFsQixFQUEwQjtBQUFBO0FBQ3hCLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxJQUFMLEdBQVlBLHFCQUFaOztBQUVBLFFBQUlDLGlCQUFLQyxPQUFMLENBQWFOLENBQWIsQ0FBSixFQUFxQjtBQUNuQixXQUFLRyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsV0FBS0gsQ0FBTCxHQUFTQSxDQUFUO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBS0EsQ0FBTCxHQUFTSyxpQkFBS0UsU0FBTCxDQUFlUCxDQUFmLEVBQWtCLENBQWxCLENBQVQ7QUFDQSxXQUFLQyxDQUFMLEdBQVNJLGlCQUFLRSxTQUFMLENBQWVOLENBQWYsRUFBa0IsS0FBS0QsQ0FBdkIsQ0FBVDtBQUNBLFdBQUtRLE9BQUwsR0FBZUgsaUJBQUtFLFNBQUwsQ0FBZUwsTUFBZixFQUF1QixLQUF2QixDQUFmO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7NkJBQ1dPLEcsRUFBSztBQUNaLFVBQUksS0FBS04sUUFBVCxFQUFtQjtBQUNqQixlQUFPLEtBQUtILENBQUwsQ0FBUSxLQUFLQSxDQUFMLENBQU9VLE1BQVAsR0FBZ0JDLElBQUksQ0FBQ0MsTUFBTCxFQUFqQixJQUFtQyxDQUExQyxDQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxDQUFDLEtBQUtKLE9BQVYsRUFBbUIsT0FBT0ssc0JBQVVDLFVBQVYsQ0FBcUIsS0FBS2QsQ0FBMUIsRUFBNkIsS0FBS0MsQ0FBbEMsRUFBcUNRLEdBQXJDLENBQVAsQ0FBbkIsS0FDSyxPQUFPSSxzQkFBVUUsY0FBVixDQUF5QixLQUFLZixDQUE5QixFQUFpQyxLQUFLQyxDQUF0QyxFQUF5Q1EsR0FBekMsQ0FBUDtBQUNOO0FBQ0Y7Ozs7Ozs7QUFHSSxJQUFNTyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDaEIsQ0FBRCxFQUFJQyxDQUFKLEVBQU9nQixDQUFQLEVBQWE7QUFDckMsTUFBSWpCLENBQUMsWUFBWUQsSUFBakIsRUFBdUIsT0FBT0MsQ0FBUDs7QUFFdkIsTUFBSUMsQ0FBQyxLQUFLaUIsU0FBVixFQUFxQjtBQUNuQixXQUFPLElBQUluQixJQUFKLENBQVNDLENBQVQsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFFBQUlpQixDQUFDLEtBQUtDLFNBQVYsRUFBcUIsT0FBTyxJQUFJbkIsSUFBSixDQUFTQyxDQUFULEVBQVlDLENBQVosQ0FBUCxDQUFyQixLQUNLLE9BQU8sSUFBSUYsSUFBSixDQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZWdCLENBQWYsQ0FBUDtBQUNOO0FBQ0YsQ0FUTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRoVXRpbHMgZnJvbSAnLi9NYXRoVXRpbHMnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vdXRpbHMvVXRpbCc7XG5pbXBvcnQgeyBNQVRIX1RZUEVfU1BBTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW4ge1xuICAvKipcbiAgICogU3BhbiBDbGFzcy4gR2V0IGEgcmFuZG9tIE51bWJlciBmcm9tIGEgdG8gYi4gT3IgZnJvbSBjLWEgdG8gYytiXG4gICAqIEBwYXJhbSB7TnVtYmVyfEFycmF5fSBhIC0gbWluIG51bWJlclxuICAgKiBAcGFyYW0ge051bWJlcn0gYiAtIG1heCBudW1iZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNlbnRlciAtIHRoZSBjZW50ZXIncyB6IHZhbHVlXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBzcGFuID0gbmV3IFNwYW4oMCwzMCk7XG4gICAqIG9yXG4gICAqIHZhciBzcGFuID0gbmV3IFNwYW4oW1wiI2ZmZlwiLFwiI2ZmMFwiLFwiIzAwMFwiXSk7XG4gICAqIG9yXG4gICAqIHZhciBzcGFuID0gbmV3IFNwYW4oNSwxLFwiY2VudGVyXCIpO1xuICAgKiBAZXh0ZW5kcyB7Wm9uZX1cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjZW50ZXIpIHtcbiAgICB0aGlzLl9pc0FycmF5ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICBpZiAoVXRpbC5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLl9pc0FycmF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYSA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYSA9IFV0aWwuaW5pdFZhbHVlKGEsIDEpO1xuICAgICAgdGhpcy5iID0gVXRpbC5pbml0VmFsdWUoYiwgdGhpcy5hKTtcbiAgICAgIHRoaXMuX2NlbnRlciA9IFV0aWwuaW5pdFZhbHVlKGNlbnRlciwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGFuLmdldFZhbHVlIGZ1bmN0aW9uXG4gICAqIEBuYW1lIGdldCBhIHJhbmRvbSBOdW1iZXIgZnJvbSBhIHRvIGIuIE9yIGdldCBhIHJhbmRvbSBOdW1iZXIgZnJvbSBjLWEgdG8gYytiXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBJTlQgb3IgaW50XG4gICAqIEByZXR1cm4ge251bWJlcn0gYSByYW5kb20gTnVtYmVyXG4gICAqL1xuICBnZXRWYWx1ZShJTlQpIHtcbiAgICBpZiAodGhpcy5faXNBcnJheSkge1xuICAgICAgcmV0dXJuIHRoaXMuYVsodGhpcy5hLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpID4+IDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuX2NlbnRlcikgcmV0dXJuIE1hdGhVdGlscy5yYW5kb21BVG9CKHRoaXMuYSwgdGhpcy5iLCBJTlQpO1xuICAgICAgZWxzZSByZXR1cm4gTWF0aFV0aWxzLnJhbmRvbUZsb2F0aW5nKHRoaXMuYSwgdGhpcy5iLCBJTlQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlU3BhbiA9IChhLCBiLCBjKSA9PiB7XG4gIGlmIChhIGluc3RhbmNlb2YgU3BhbikgcmV0dXJuIGE7XG5cbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuZXcgU3BhbihhKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFNwYW4oYSwgYik7XG4gICAgZWxzZSByZXR1cm4gbmV3IFNwYW4oYSwgYiwgYyk7XG4gIH1cbn07XG4iXX0=