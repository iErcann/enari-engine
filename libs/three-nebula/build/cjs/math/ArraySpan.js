"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createArraySpan = exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Span2 = _interopRequireDefault(require("./Span"));

var _sample = _interopRequireDefault(require("lodash/sample"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Class for storing items of mixed type and fetching a randomised
 * value from these items.
 *
 */
var ArraySpan = /*#__PURE__*/function (_Span) {
  (0, _inherits2["default"])(ArraySpan, _Span);

  var _super = _createSuper(ArraySpan);

  /**
   * Constructs an ArraySpan instance.
   *
   * @param {mixed|array<mixed>} items - Items
   * @return void
   */
  function ArraySpan(items) {
    var _this;

    (0, _classCallCheck2["default"])(this, ArraySpan);
    _this = _super.call(this);
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.MATH_TYPE_ARRAY_SPAN;
    /**
     * @desc An array of colors
     * @type {array}
     */

    _this.items = Array.isArray(items) ? items : [items];
    return _this;
  }
  /**
   * Gets a random item.
   *
   * @return {mixed}
   */


  (0, _createClass2["default"])(ArraySpan, [{
    key: "getValue",
    value: function getValue() {
      return (0, _sample["default"])(this.items);
    }
  }]);
  return ArraySpan;
}(_Span2["default"]);
/**
 * Attempts to create an ArraySpan from the items provided.
 *
 * @param {mixed} items - Items to try and create an ArraySpan from
 * @return {?ArraySpan}
 */


exports["default"] = ArraySpan;

var createArraySpan = function createArraySpan(items) {
  if (!items) {
    return null;
  }

  if (items instanceof ArraySpan) {
    return items;
  }

  return new ArraySpan(items);
};

exports.createArraySpan = createArraySpan;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyJdLCJuYW1lcyI6WyJBcnJheVNwYW4iLCJpdGVtcyIsInR5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJTcGFuIiwiY3JlYXRlQXJyYXlTcGFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLFM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7QUFDakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxJQUFMLEdBQVlBLDJCQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0QsS0FBTCxHQUFhRSxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsS0FBZCxJQUF1QkEsS0FBdkIsR0FBK0IsQ0FBQ0EsS0FBRCxDQUE1QztBQWJpQjtBQWNsQjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7OytCQUNhO0FBQ1QsYUFBTyx3QkFBTyxLQUFLQSxLQUFaLENBQVA7QUFDRDs7O0VBOUJvQ0ksaUI7QUFpQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDTyxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFMLEtBQUssRUFBSTtBQUN0QyxNQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQUlBLEtBQUssWUFBWUQsU0FBckIsRUFBZ0M7QUFDOUIsV0FBT0MsS0FBUDtBQUNEOztBQUVELFNBQU8sSUFBSUQsU0FBSixDQUFjQyxLQUFkLENBQVA7QUFDRCxDQVZNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNwYW4gZnJvbSAnLi9TcGFuJztcbmltcG9ydCBzYW1wbGUgZnJvbSAnbG9kYXNoL3NhbXBsZSc7XG5pbXBvcnQgeyBNQVRIX1RZUEVfQVJSQVlfU1BBTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHN0b3JpbmcgaXRlbXMgb2YgbWl4ZWQgdHlwZSBhbmQgZmV0Y2hpbmcgYSByYW5kb21pc2VkXG4gKiB2YWx1ZSBmcm9tIHRoZXNlIGl0ZW1zLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlTcGFuIGV4dGVuZHMgU3BhbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGFuIEFycmF5U3BhbiBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHttaXhlZHxhcnJheTxtaXhlZD59IGl0ZW1zIC0gSXRlbXNcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpdGVtcykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBBbiBhcnJheSBvZiBjb2xvcnNcbiAgICAgKiBAdHlwZSB7YXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5pdGVtcyA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbaXRlbXNdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSByYW5kb20gaXRlbS5cbiAgICpcbiAgICogQHJldHVybiB7bWl4ZWR9XG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gc2FtcGxlKHRoaXMuaXRlbXMpO1xuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gY3JlYXRlIGFuIEFycmF5U3BhbiBmcm9tIHRoZSBpdGVtcyBwcm92aWRlZC5cbiAqXG4gKiBAcGFyYW0ge21peGVkfSBpdGVtcyAtIEl0ZW1zIHRvIHRyeSBhbmQgY3JlYXRlIGFuIEFycmF5U3BhbiBmcm9tXG4gKiBAcmV0dXJuIHs/QXJyYXlTcGFufVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQXJyYXlTcGFuID0gaXRlbXMgPT4ge1xuICBpZiAoIWl0ZW1zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheVNwYW4pIHtcbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICByZXR1cm4gbmV3IEFycmF5U3BhbihpdGVtcyk7XG59O1xuIl19