"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createColorSpan = exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _MathUtils = _interopRequireDefault(require("./MathUtils"));

var _Span2 = _interopRequireDefault(require("./Span"));

var _sample = _interopRequireDefault(require("lodash/sample"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Class for storing and interacting with an array of colours.
 *
 */
var ColorSpan = /*#__PURE__*/function (_Span) {
  (0, _inherits2["default"])(ColorSpan, _Span);

  var _super = _createSuper(ColorSpan);

  /**
   * Constructs a ColorSpan instance.
   *
   * @param {string|array<string>} colors - A color or array of colors. If the
   * string 'random' is provided, a random color will be returned from getValue
   * @return void
   */
  function ColorSpan(colors) {
    var _this;

    (0, _classCallCheck2["default"])(this, ColorSpan);
    _this = _super.call(this);
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.MATH_TYPE_COLOR_SPAN;
    /**
     * @desc Determines if a random color should be returned from the getValue method.
     * @type {boolean}
     */

    _this.shouldRandomize = colors === 'random' ? true : false;
    /**
     * @desc An array of colors to select from
     * @type {array<string>}
     */

    _this.colors = Array.isArray(colors) ? colors : [colors];
    return _this;
  }
  /**
   * Gets a color from the color array
   * or a random color if this.shouldRandomize is true.
   *
   * @return {string} a hex color
   */


  (0, _createClass2["default"])(ColorSpan, [{
    key: "getValue",
    value: function getValue() {
      return this.shouldRandomize ? _MathUtils["default"].randomColor() : (0, _sample["default"])(this.colors);
    }
  }]);
  return ColorSpan;
}(_Span2["default"]);
/**
 * Attempts to create an ArraySpan from the colors provided.
 *
 * @param {mixed} colors - colors to try and create an ArraySpan from
 * @return {?ColorSpan}
 */


exports["default"] = ColorSpan;

var createColorSpan = function createColorSpan(colors) {
  if (!colors) {
    console.warn("Invalid colors argument ".concat(colors, " passed to createColorSpan. Defaulting to 'random'."));
    colors = 'random';
  }

  if (colors instanceof ColorSpan) {
    return colors;
  }

  return new ColorSpan(colors);
};

exports.createColorSpan = createColorSpan;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0NvbG9yU3Bhbi5qcyJdLCJuYW1lcyI6WyJDb2xvclNwYW4iLCJjb2xvcnMiLCJ0eXBlIiwic2hvdWxkUmFuZG9taXplIiwiQXJyYXkiLCJpc0FycmF5IiwiTWF0aFV0aWxzIiwicmFuZG9tQ29sb3IiLCJTcGFuIiwiY3JlYXRlQ29sb3JTcGFuIiwiY29uc29sZSIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLFM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UscUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTtBQUNsQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLElBQUwsR0FBWUEsMkJBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxlQUFMLEdBQXVCRixNQUFNLEtBQUssUUFBWCxHQUFzQixJQUF0QixHQUE2QixLQUFwRDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtBLE1BQUwsR0FBY0csS0FBSyxDQUFDQyxPQUFOLENBQWNKLE1BQWQsSUFBd0JBLE1BQXhCLEdBQWlDLENBQUNBLE1BQUQsQ0FBL0M7QUFuQmtCO0FBb0JuQjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7K0JBQ2E7QUFDVCxhQUFPLEtBQUtFLGVBQUwsR0FBdUJHLHNCQUFVQyxXQUFWLEVBQXZCLEdBQWlELHdCQUFPLEtBQUtOLE1BQVosQ0FBeEQ7QUFDRDs7O0VBdENvQ08saUI7QUF5Q3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDTyxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFSLE1BQU0sRUFBSTtBQUN2QyxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYUyxJQUFBQSxPQUFPLENBQUNDLElBQVIsbUNBQzZCVixNQUQ3QjtBQUlBQSxJQUFBQSxNQUFNLEdBQUcsUUFBVDtBQUNEOztBQUVELE1BQUlBLE1BQU0sWUFBWUQsU0FBdEIsRUFBaUM7QUFDL0IsV0FBT0MsTUFBUDtBQUNEOztBQUVELFNBQU8sSUFBSUQsU0FBSixDQUFjQyxNQUFkLENBQVA7QUFDRCxDQWRNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGhVdGlscyBmcm9tICcuL01hdGhVdGlscyc7XG5pbXBvcnQgU3BhbiBmcm9tICcuL1NwYW4nO1xuaW1wb3J0IHNhbXBsZSBmcm9tICdsb2Rhc2gvc2FtcGxlJztcbmltcG9ydCB7IE1BVEhfVFlQRV9DT0xPUl9TUEFOIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBDbGFzcyBmb3Igc3RvcmluZyBhbmQgaW50ZXJhY3Rpbmcgd2l0aCBhbiBhcnJheSBvZiBjb2xvdXJzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTcGFuIGV4dGVuZHMgU3BhbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgQ29sb3JTcGFuIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xhcnJheTxzdHJpbmc+fSBjb2xvcnMgLSBBIGNvbG9yIG9yIGFycmF5IG9mIGNvbG9ycy4gSWYgdGhlXG4gICAqIHN0cmluZyAncmFuZG9tJyBpcyBwcm92aWRlZCwgYSByYW5kb20gY29sb3Igd2lsbCBiZSByZXR1cm5lZCBmcm9tIGdldFZhbHVlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoY29sb3JzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERldGVybWluZXMgaWYgYSByYW5kb20gY29sb3Igc2hvdWxkIGJlIHJldHVybmVkIGZyb20gdGhlIGdldFZhbHVlIG1ldGhvZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnNob3VsZFJhbmRvbWl6ZSA9IGNvbG9ycyA9PT0gJ3JhbmRvbScgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBBbiBhcnJheSBvZiBjb2xvcnMgdG8gc2VsZWN0IGZyb21cbiAgICAgKiBAdHlwZSB7YXJyYXk8c3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycyA9IEFycmF5LmlzQXJyYXkoY29sb3JzKSA/IGNvbG9ycyA6IFtjb2xvcnNdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBjb2xvciBmcm9tIHRoZSBjb2xvciBhcnJheVxuICAgKiBvciBhIHJhbmRvbSBjb2xvciBpZiB0aGlzLnNob3VsZFJhbmRvbWl6ZSBpcyB0cnVlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgaGV4IGNvbG9yXG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaG91bGRSYW5kb21pemUgPyBNYXRoVXRpbHMucmFuZG9tQ29sb3IoKSA6IHNhbXBsZSh0aGlzLmNvbG9ycyk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBjcmVhdGUgYW4gQXJyYXlTcGFuIGZyb20gdGhlIGNvbG9ycyBwcm92aWRlZC5cbiAqXG4gKiBAcGFyYW0ge21peGVkfSBjb2xvcnMgLSBjb2xvcnMgdG8gdHJ5IGFuZCBjcmVhdGUgYW4gQXJyYXlTcGFuIGZyb21cbiAqIEByZXR1cm4gez9Db2xvclNwYW59XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVDb2xvclNwYW4gPSBjb2xvcnMgPT4ge1xuICBpZiAoIWNvbG9ycykge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBJbnZhbGlkIGNvbG9ycyBhcmd1bWVudCAke2NvbG9yc30gcGFzc2VkIHRvIGNyZWF0ZUNvbG9yU3Bhbi4gRGVmYXVsdGluZyB0byAncmFuZG9tJy5gXG4gICAgKTtcblxuICAgIGNvbG9ycyA9ICdyYW5kb20nO1xuICB9XG5cbiAgaWYgKGNvbG9ycyBpbnN0YW5jZW9mIENvbG9yU3Bhbikge1xuICAgIHJldHVybiBjb2xvcnM7XG4gIH1cblxuICByZXR1cm4gbmV3IENvbG9yU3Bhbihjb2xvcnMpO1xufTtcbiJdfQ==