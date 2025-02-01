"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Vector3D = _interopRequireDefault(require("./Vector3D"));

var _types = require("./types");

var Polar3D = /*#__PURE__*/function () {
  function Polar3D(radius, theta, phi) {
    (0, _classCallCheck2["default"])(this, Polar3D);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = _types.MATH_TYPE_POLAR_3D;
    this.radius = radius || 1;
    this.phi = phi || 0;
    this.theta = theta || 0;
  }

  (0, _createClass2["default"])(Polar3D, [{
    key: "set",
    value: function set(radius, theta, phi) {
      this.radius = radius || 1;
      this.phi = phi || 0;
      this.theta = theta || 0;
      return this;
    }
  }, {
    key: "setRadius",
    value: function setRadius(radius) {
      this.radius = radius;
      return this;
    }
  }, {
    key: "setPhi",
    value: function setPhi(phi) {
      this.phi = phi;
      return this;
    }
  }, {
    key: "setTheta",
    value: function setTheta(theta) {
      this.theta = theta;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(p) {
      this.radius = p.radius;
      this.phi = p.phi;
      this.theta = p.theta;
      return this;
    }
  }, {
    key: "toVector3D",
    value: function toVector3D() {
      return new _Vector3D["default"](this.getX(), this.getY(), this.getZ());
    }
  }, {
    key: "getX",
    value: function getX() {
      return this.radius * Math.sin(this.theta) * Math.cos(this.phi);
    }
  }, {
    key: "getY",
    value: function getY() {
      return -this.radius * Math.sin(this.theta) * Math.sin(this.phi);
    }
  }, {
    key: "getZ",
    value: function getZ() {
      return this.radius * Math.cos(this.theta);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      this.radius = 1;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.radius === this.radius && v.phi === this.phi && v.theta === this.theta;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.radius = 0.0;
      this.phi = 0.0;
      this.theta = 0.0;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Polar3D(this.radius, this.phi, this.theta);
    }
  }]);
  return Polar3D;
}();

exports["default"] = Polar3D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1BvbGFyM0QuanMiXSwibmFtZXMiOlsiUG9sYXIzRCIsInJhZGl1cyIsInRoZXRhIiwicGhpIiwidHlwZSIsInAiLCJWZWN0b3IzRCIsImdldFgiLCJnZXRZIiwiZ2V0WiIsIk1hdGgiLCJzaW4iLCJjb3MiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBRXFCQSxPO0FBQ25CLG1CQUFZQyxNQUFaLEVBQW9CQyxLQUFwQixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFBQTs7QUFDOUI7QUFDSjtBQUNBO0FBQ0E7QUFDSSxTQUFLQyxJQUFMLEdBQVlBLHlCQUFaO0FBQ0EsU0FBS0gsTUFBTCxHQUFjQSxNQUFNLElBQUksQ0FBeEI7QUFDQSxTQUFLRSxHQUFMLEdBQVdBLEdBQUcsSUFBSSxDQUFsQjtBQUNBLFNBQUtELEtBQUwsR0FBYUEsS0FBSyxJQUFJLENBQXRCO0FBQ0Q7Ozs7d0JBRUdELE0sRUFBUUMsSyxFQUFPQyxHLEVBQUs7QUFDdEIsV0FBS0YsTUFBTCxHQUFjQSxNQUFNLElBQUksQ0FBeEI7QUFDQSxXQUFLRSxHQUFMLEdBQVdBLEdBQUcsSUFBSSxDQUFsQjtBQUNBLFdBQUtELEtBQUwsR0FBYUEsS0FBSyxJQUFJLENBQXRCO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7Ozs4QkFFU0QsTSxFQUFRO0FBQ2hCLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7MkJBRU1FLEcsRUFBSztBQUNWLFdBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVFELEssRUFBTztBQUNkLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7eUJBRUlHLEMsRUFBRztBQUNOLFdBQUtKLE1BQUwsR0FBY0ksQ0FBQyxDQUFDSixNQUFoQjtBQUNBLFdBQUtFLEdBQUwsR0FBV0UsQ0FBQyxDQUFDRixHQUFiO0FBQ0EsV0FBS0QsS0FBTCxHQUFhRyxDQUFDLENBQUNILEtBQWY7QUFFQSxhQUFPLElBQVA7QUFDRDs7O2lDQUVZO0FBQ1gsYUFBTyxJQUFJSSxvQkFBSixDQUFhLEtBQUtDLElBQUwsRUFBYixFQUEwQixLQUFLQyxJQUFMLEVBQTFCLEVBQXVDLEtBQUtDLElBQUwsRUFBdkMsQ0FBUDtBQUNEOzs7MkJBRU07QUFDTCxhQUFPLEtBQUtSLE1BQUwsR0FBY1MsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS1QsS0FBZCxDQUFkLEdBQXFDUSxJQUFJLENBQUNFLEdBQUwsQ0FBUyxLQUFLVCxHQUFkLENBQTVDO0FBQ0Q7OzsyQkFFTTtBQUNMLGFBQU8sQ0FBQyxLQUFLRixNQUFOLEdBQWVTLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtULEtBQWQsQ0FBZixHQUFzQ1EsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS1IsR0FBZCxDQUE3QztBQUNEOzs7MkJBRU07QUFDTCxhQUFPLEtBQUtGLE1BQUwsR0FBY1MsSUFBSSxDQUFDRSxHQUFMLENBQVMsS0FBS1YsS0FBZCxDQUFyQjtBQUNEOzs7Z0NBRVc7QUFDVixXQUFLRCxNQUFMLEdBQWMsQ0FBZDtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7MkJBRU1ZLEMsRUFBRztBQUNSLGFBQ0VBLENBQUMsQ0FBQ1osTUFBRixLQUFhLEtBQUtBLE1BQWxCLElBQTRCWSxDQUFDLENBQUNWLEdBQUYsS0FBVSxLQUFLQSxHQUEzQyxJQUFrRFUsQ0FBQyxDQUFDWCxLQUFGLEtBQVksS0FBS0EsS0FEckU7QUFHRDs7OzRCQUVPO0FBQ04sV0FBS0QsTUFBTCxHQUFjLEdBQWQ7QUFDQSxXQUFLRSxHQUFMLEdBQVcsR0FBWDtBQUNBLFdBQUtELEtBQUwsR0FBYSxHQUFiO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7Ozs0QkFFTztBQUNOLGFBQU8sSUFBSUYsT0FBSixDQUFZLEtBQUtDLE1BQWpCLEVBQXlCLEtBQUtFLEdBQTlCLEVBQW1DLEtBQUtELEtBQXhDLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRCBmcm9tICcuL1ZlY3RvcjNEJztcbmltcG9ydCB7IE1BVEhfVFlQRV9QT0xBUl8zRCBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbGFyM0Qge1xuICBjb25zdHJ1Y3RvcihyYWRpdXMsIHRoZXRhLCBwaGkpIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMTtcbiAgICB0aGlzLnBoaSA9IHBoaSB8fCAwO1xuICAgIHRoaXMudGhldGEgPSB0aGV0YSB8fCAwO1xuICB9XG5cbiAgc2V0KHJhZGl1cywgdGhldGEsIHBoaSkge1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzIHx8IDE7XG4gICAgdGhpcy5waGkgPSBwaGkgfHwgMDtcbiAgICB0aGlzLnRoZXRhID0gdGhldGEgfHwgMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UmFkaXVzKHJhZGl1cykge1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRQaGkocGhpKSB7XG4gICAgdGhpcy5waGkgPSBwaGk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRoZXRhKHRoZXRhKSB7XG4gICAgdGhpcy50aGV0YSA9IHRoZXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb3B5KHApIHtcbiAgICB0aGlzLnJhZGl1cyA9IHAucmFkaXVzO1xuICAgIHRoaXMucGhpID0gcC5waGk7XG4gICAgdGhpcy50aGV0YSA9IHAudGhldGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvVmVjdG9yM0QoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzRCh0aGlzLmdldFgoKSwgdGhpcy5nZXRZKCksIHRoaXMuZ2V0WigpKTtcbiAgfVxuXG4gIGdldFgoKSB7XG4gICAgcmV0dXJuIHRoaXMucmFkaXVzICogTWF0aC5zaW4odGhpcy50aGV0YSkgKiBNYXRoLmNvcyh0aGlzLnBoaSk7XG4gIH1cblxuICBnZXRZKCkge1xuICAgIHJldHVybiAtdGhpcy5yYWRpdXMgKiBNYXRoLnNpbih0aGlzLnRoZXRhKSAqIE1hdGguc2luKHRoaXMucGhpKTtcbiAgfVxuXG4gIGdldFooKSB7XG4gICAgcmV0dXJuIHRoaXMucmFkaXVzICogTWF0aC5jb3ModGhpcy50aGV0YSk7XG4gIH1cblxuICBub3JtYWxpemUoKSB7XG4gICAgdGhpcy5yYWRpdXMgPSAxO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiAoXG4gICAgICB2LnJhZGl1cyA9PT0gdGhpcy5yYWRpdXMgJiYgdi5waGkgPT09IHRoaXMucGhpICYmIHYudGhldGEgPT09IHRoaXMudGhldGFcbiAgICApO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5waGkgPSAwLjA7XG4gICAgdGhpcy50aGV0YSA9IDAuMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2xhcjNEKHRoaXMucmFkaXVzLCB0aGlzLnBoaSwgdGhpcy50aGV0YSk7XG4gIH1cbn1cbiJdfQ==