"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniqueList = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Map of particle IDs to integer ids
 */
var UniqueList = /*#__PURE__*/function () {
  function UniqueList() {
    var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
    (0, _classCallCheck2["default"])(this, UniqueList);
    this.max = max;
    this.count = 0;
    this._items = {};
  }

  (0, _createClass2["default"])(UniqueList, [{
    key: "add",
    value: function add(item) {
      if (this._items[item] !== undefined) {
        return;
      }

      this._items[item] = this.count++;
    }
  }, {
    key: "find",
    value: function find(item) {
      return this._items[item];
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._items = {};
      this.count = 0;
    }
  }]);
  return UniqueList;
}();

exports.UniqueList = UniqueList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9jb21tb24vc3RvcmVzL1VuaXF1ZUxpc3QuanMiXSwibmFtZXMiOlsiVW5pcXVlTGlzdCIsIm1heCIsIkluZmluaXR5IiwiY291bnQiLCJfaXRlbXMiLCJpdGVtIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0lBQ2FBLFU7QUFDWCx3QkFBNEI7QUFBQSxRQUFoQkMsR0FBZ0IsdUVBQVZDLFFBQVU7QUFBQTtBQUMxQixTQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLRSxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0Q7Ozs7d0JBRUdDLEksRUFBTTtBQUNSLFVBQUksS0FBS0QsTUFBTCxDQUFZQyxJQUFaLE1BQXNCQyxTQUExQixFQUFxQztBQUNuQztBQUNEOztBQUVELFdBQUtGLE1BQUwsQ0FBWUMsSUFBWixJQUFvQixLQUFLRixLQUFMLEVBQXBCO0FBQ0Q7Ozt5QkFFSUUsSSxFQUFNO0FBQ1QsYUFBTyxLQUFLRCxNQUFMLENBQVlDLElBQVosQ0FBUDtBQUNEOzs7OEJBRVM7QUFDUixXQUFLRCxNQUFMLEdBQWMsRUFBZDtBQUNBLFdBQUtELEtBQUwsR0FBYSxDQUFiO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1hcCBvZiBwYXJ0aWNsZSBJRHMgdG8gaW50ZWdlciBpZHNcbiAqL1xuZXhwb3J0IGNsYXNzIFVuaXF1ZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihtYXggPSBJbmZpbml0eSkge1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuX2l0ZW1zID0ge307XG4gIH1cblxuICBhZGQoaXRlbSkge1xuICAgIGlmICh0aGlzLl9pdGVtc1tpdGVtXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faXRlbXNbaXRlbV0gPSB0aGlzLmNvdW50Kys7XG4gIH1cblxuICBmaW5kKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXNbaXRlbV07XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2l0ZW1zID0ge307XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gIH1cbn1cbiJdfQ==