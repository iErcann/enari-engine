"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Vector3D = _interopRequireDefault(require("../math/Vector3D"));

var _Zone2 = _interopRequireDefault(require("./Zone"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var LineZone = /*#__PURE__*/function (_Zone) {
  (0, _inherits2["default"])(LineZone, _Zone);

  var _super = _createSuper(LineZone);

  /**
   * LineZone is a 3d line zone
   * @param {Number|Vector3D} x1 - the line's start point of x value or a Vector3D Object
   * @param {Number|Vector3D} y1 - the line's start point of y value or a Vector3D Object
   * @param {Number} z1 - the line's start point of z value
   * @param {Number} x2 - the line's end point of x value
   * @param {Number} y2 - the line's end point of y value
   * @param {Number} z2 - the line's end point of z value
   * @example
   * var lineZone = new System.LineZone(0,0,0,100,100,0);
   * or
   * var lineZone = new System.LineZone(new System.Vector3D(0,0,0),new System.Vector3D(100,100,0));
   * @extends {Zone}
   * @constructor
   */
  function LineZone(x1, y1, z1, x2, y2, z2) {
    var _this;

    (0, _classCallCheck2["default"])(this, LineZone);
    _this = _super.call(this, _types.ZONE_TYPE_LINE);

    if (x1 instanceof _Vector3D["default"]) {
      _this.x1 = x1.x;
      _this.y1 = x1.y;
      _this.z1 = x1.z;
      _this.x2 = x2.x;
      _this.y2 = x2.y;
      _this.z2 = x2.z;
    } else {
      _this.x1 = x1;
      _this.y1 = y1;
      _this.z1 = z1;
      _this.x2 = x2;
      _this.y2 = y2;
      _this.z2 = z2;
    }

    _this.supportsCrossing = false;
    return _this;
  }
  /**
   * Returns true to indicate this is a LineZone.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(LineZone, [{
    key: "isLineZone",
    value: function isLineZone() {
      return true;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      this.random = Math.random();
      this.vector.x = this.x1 + this.random * (this.x2 - this.x1);
      this.vector.y = this.y1 + this.random * (this.y2 - this.y1);
      this.vector.z = this.z1 + this.random * (this.z2 - this.z1);
      return this.vector;
    }
  }]);
  return LineZone;
}(_Zone2["default"]);

exports["default"] = LineZone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL0xpbmVab25lLmpzIl0sIm5hbWVzIjpbIkxpbmVab25lIiwieDEiLCJ5MSIsInoxIiwieDIiLCJ5MiIsInoyIiwidHlwZSIsIlZlY3RvcjNEIiwieCIsInkiLCJ6Iiwic3VwcG9ydHNDcm9zc2luZyIsInJhbmRvbSIsIk1hdGgiLCJ2ZWN0b3IiLCJab25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVxQkEsUTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Usb0JBQVlDLEVBQVosRUFBZ0JDLEVBQWhCLEVBQW9CQyxFQUFwQixFQUF3QkMsRUFBeEIsRUFBNEJDLEVBQTVCLEVBQWdDQyxFQUFoQyxFQUFvQztBQUFBOztBQUFBO0FBQ2xDLDhCQUFNQyxxQkFBTjs7QUFFQSxRQUFJTixFQUFFLFlBQVlPLG9CQUFsQixFQUE0QjtBQUMxQixZQUFLUCxFQUFMLEdBQVVBLEVBQUUsQ0FBQ1EsQ0FBYjtBQUNBLFlBQUtQLEVBQUwsR0FBVUQsRUFBRSxDQUFDUyxDQUFiO0FBQ0EsWUFBS1AsRUFBTCxHQUFVRixFQUFFLENBQUNVLENBQWI7QUFFQSxZQUFLUCxFQUFMLEdBQVVBLEVBQUUsQ0FBQ0ssQ0FBYjtBQUNBLFlBQUtKLEVBQUwsR0FBVUQsRUFBRSxDQUFDTSxDQUFiO0FBQ0EsWUFBS0osRUFBTCxHQUFVRixFQUFFLENBQUNPLENBQWI7QUFDRCxLQVJELE1BUU87QUFDTCxZQUFLVixFQUFMLEdBQVVBLEVBQVY7QUFDQSxZQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxZQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFFQSxZQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxZQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxZQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDRDs7QUFFRCxVQUFLTSxnQkFBTCxHQUF3QixLQUF4QjtBQXJCa0M7QUFzQm5DO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7aUNBQ2U7QUFDWCxhQUFPLElBQVA7QUFDRDs7O2tDQUVhO0FBQ1osV0FBS0MsTUFBTCxHQUFjQyxJQUFJLENBQUNELE1BQUwsRUFBZDtBQUNBLFdBQUtFLE1BQUwsQ0FBWU4sQ0FBWixHQUFnQixLQUFLUixFQUFMLEdBQVUsS0FBS1ksTUFBTCxJQUFlLEtBQUtULEVBQUwsR0FBVSxLQUFLSCxFQUE5QixDQUExQjtBQUNBLFdBQUtjLE1BQUwsQ0FBWUwsQ0FBWixHQUFnQixLQUFLUixFQUFMLEdBQVUsS0FBS1csTUFBTCxJQUFlLEtBQUtSLEVBQUwsR0FBVSxLQUFLSCxFQUE5QixDQUExQjtBQUNBLFdBQUthLE1BQUwsQ0FBWUosQ0FBWixHQUFnQixLQUFLUixFQUFMLEdBQVUsS0FBS1UsTUFBTCxJQUFlLEtBQUtQLEVBQUwsR0FBVSxLQUFLSCxFQUE5QixDQUExQjtBQUVBLGFBQU8sS0FBS1ksTUFBWjtBQUNEOzs7RUF4RG1DQyxpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRCBmcm9tICcuLi9tYXRoL1ZlY3RvcjNEJztcbmltcG9ydCBab25lIGZyb20gJy4vWm9uZSc7XG5pbXBvcnQgeyBaT05FX1RZUEVfTElORSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBMaW5lWm9uZSBpcyBhIDNkIGxpbmUgem9uZVxuICAgKiBAcGFyYW0ge051bWJlcnxWZWN0b3IzRH0geDEgLSB0aGUgbGluZSdzIHN0YXJ0IHBvaW50IG9mIHggdmFsdWUgb3IgYSBWZWN0b3IzRCBPYmplY3RcbiAgICogQHBhcmFtIHtOdW1iZXJ8VmVjdG9yM0R9IHkxIC0gdGhlIGxpbmUncyBzdGFydCBwb2ludCBvZiB5IHZhbHVlIG9yIGEgVmVjdG9yM0QgT2JqZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MSAtIHRoZSBsaW5lJ3Mgc3RhcnQgcG9pbnQgb2YgeiB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0geDIgLSB0aGUgbGluZSdzIGVuZCBwb2ludCBvZiB4IHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5MiAtIHRoZSBsaW5lJ3MgZW5kIHBvaW50IG9mIHkgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHoyIC0gdGhlIGxpbmUncyBlbmQgcG9pbnQgb2YgeiB2YWx1ZVxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbGluZVpvbmUgPSBuZXcgU3lzdGVtLkxpbmVab25lKDAsMCwwLDEwMCwxMDAsMCk7XG4gICAqIG9yXG4gICAqIHZhciBsaW5lWm9uZSA9IG5ldyBTeXN0ZW0uTGluZVpvbmUobmV3IFN5c3RlbS5WZWN0b3IzRCgwLDAsMCksbmV3IFN5c3RlbS5WZWN0b3IzRCgxMDAsMTAwLDApKTtcbiAgICogQGV4dGVuZHMge1pvbmV9XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoeDEsIHkxLCB6MSwgeDIsIHkyLCB6Mikge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgaWYgKHgxIGluc3RhbmNlb2YgVmVjdG9yM0QpIHtcbiAgICAgIHRoaXMueDEgPSB4MS54O1xuICAgICAgdGhpcy55MSA9IHgxLnk7XG4gICAgICB0aGlzLnoxID0geDEuejtcblxuICAgICAgdGhpcy54MiA9IHgyLng7XG4gICAgICB0aGlzLnkyID0geDIueTtcbiAgICAgIHRoaXMuejIgPSB4Mi56O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLngxID0geDE7XG4gICAgICB0aGlzLnkxID0geTE7XG4gICAgICB0aGlzLnoxID0gejE7XG5cbiAgICAgIHRoaXMueDIgPSB4MjtcbiAgICAgIHRoaXMueTIgPSB5MjtcbiAgICAgIHRoaXMuejIgPSB6MjtcbiAgICB9XG5cbiAgICB0aGlzLnN1cHBvcnRzQ3Jvc3NpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIExpbmVab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNMaW5lWm9uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMucmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54MSArIHRoaXMucmFuZG9tICogKHRoaXMueDIgLSB0aGlzLngxKTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55MSArIHRoaXMucmFuZG9tICogKHRoaXMueTIgLSB0aGlzLnkxKTtcbiAgICB0aGlzLnZlY3Rvci56ID0gdGhpcy56MSArIHRoaXMucmFuZG9tICogKHRoaXMuejIgLSB0aGlzLnoxKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxufVxuIl19