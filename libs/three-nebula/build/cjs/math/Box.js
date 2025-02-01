"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _types = require("./types");

var Box = /*#__PURE__*/function () {
  function Box(x, y, z, w, h, d) {
    (0, _classCallCheck2["default"])(this, Box);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = _types.MATH_TYPE_BOX;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = w;
    this.height = h;
    this.depth = d;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
    this.right = this.x + this.width;
  }

  (0, _createClass2["default"])(Box, [{
    key: "contains",
    value: function contains(x, y, z) {
      if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y && z <= this.depth && z >= this.z) return true;else return false;
    }
  }]);
  return Box;
}();

exports["default"] = Box;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0JveC5qcyJdLCJuYW1lcyI6WyJCb3giLCJ4IiwieSIsInoiLCJ3IiwiaCIsImQiLCJ0eXBlIiwid2lkdGgiLCJoZWlnaHQiLCJkZXB0aCIsImJvdHRvbSIsInJpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxHO0FBQ25CLGVBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQkMsQ0FBM0IsRUFBOEI7QUFBQTs7QUFDNUI7QUFDSjtBQUNBO0FBQ0E7QUFDSSxTQUFLQyxJQUFMLEdBQVlBLG9CQUFaO0FBQ0EsU0FBS04sQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0ssS0FBTCxHQUFhSixDQUFiO0FBQ0EsU0FBS0ssTUFBTCxHQUFjSixDQUFkO0FBQ0EsU0FBS0ssS0FBTCxHQUFhSixDQUFiO0FBQ0EsU0FBS0ssTUFBTCxHQUFjLEtBQUtULENBQUwsR0FBUyxLQUFLTyxNQUE1QjtBQUNBLFNBQUtHLEtBQUwsR0FBYSxLQUFLWCxDQUFMLEdBQVMsS0FBS08sS0FBM0I7QUFDQSxTQUFLSSxLQUFMLEdBQWEsS0FBS1gsQ0FBTCxHQUFTLEtBQUtPLEtBQTNCO0FBQ0Q7Ozs7NkJBRVFQLEMsRUFBR0MsQyxFQUFHQyxDLEVBQUc7QUFDaEIsVUFDRUYsQ0FBQyxJQUFJLEtBQUtXLEtBQVYsSUFDQVgsQ0FBQyxJQUFJLEtBQUtBLENBRFYsSUFFQUMsQ0FBQyxJQUFJLEtBQUtTLE1BRlYsSUFHQVQsQ0FBQyxJQUFJLEtBQUtBLENBSFYsSUFJQUMsQ0FBQyxJQUFJLEtBQUtPLEtBSlYsSUFLQVAsQ0FBQyxJQUFJLEtBQUtBLENBTlosRUFRRSxPQUFPLElBQVAsQ0FSRixLQVNLLE9BQU8sS0FBUDtBQUNOIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTUFUSF9UWVBFX0JPWCBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHosIHcsIGgsIGQpIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHo7XG4gICAgdGhpcy53aWR0aCA9IHc7XG4gICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIHRoaXMuZGVwdGggPSBkO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIH1cblxuICBjb250YWlucyh4LCB5LCB6KSB7XG4gICAgaWYgKFxuICAgICAgeCA8PSB0aGlzLnJpZ2h0ICYmXG4gICAgICB4ID49IHRoaXMueCAmJlxuICAgICAgeSA8PSB0aGlzLmJvdHRvbSAmJlxuICAgICAgeSA+PSB0aGlzLnkgJiZcbiAgICAgIHogPD0gdGhpcy5kZXB0aCAmJlxuICAgICAgeiA+PSB0aGlzLnpcbiAgICApXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19