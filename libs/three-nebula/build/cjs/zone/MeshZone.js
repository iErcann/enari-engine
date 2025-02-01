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

var _Zone2 = _interopRequireDefault(require("./Zone"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Uses a three THREE.Geometry to determine the zone parameters.
 *
 */
var MeshZone = /*#__PURE__*/function (_Zone) {
  (0, _inherits2["default"])(MeshZone, _Zone);

  var _super = _createSuper(MeshZone);

  /**
   * @constructs {MeshZone}
   *
   * @param {THREE.Geometry|Mesh} bounds - the geometry or mesh that will determine the zone bounds
   * @param {number} scale - the zone scale
   * @param {THREE.Geometry} ThreeGeometry - the three geometry class
   * @return void
   */
  function MeshZone(bounds) {
    var _this;

    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var ThreeGeometry = arguments.length > 2 ? arguments[2] : undefined;
    (0, _classCallCheck2["default"])(this, MeshZone);
    _this = _super.call(this, _types.ZONE_TYPE_MESH);
    _this.geometry = null;
    _this.scale = scale;
    _this.supportsCrossing = false;

    if (bounds.type && bounds.type === 'Geometry') {
      _this.geometry = bounds;
    }

    if (bounds.geometry) {
      _this.geometry = bounds.geometry;
    }

    if (!_this.geometry) {
      throw new Error('MeshZone unable to set geometry from the supplied bounds');
    }

    if (_this.geometry.isBufferGeometry) {
      _this.geometry = new ThreeGeometry().fromBufferGeometry(_this.geometry);
    }

    return _this;
  }
  /**
   * Returns true to indicate this is a MeshZone.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(MeshZone, [{
    key: "isMeshZone",
    value: function isMeshZone() {
      return true;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      var vertices = this.geometry.vertices;
      var rVector = vertices[vertices.length * Math.random() >> 0];
      this.vector.x = rVector.x * this.scale;
      this.vector.y = rVector.y * this.scale;
      this.vector.z = rVector.z * this.scale;
      return this.vector;
    }
  }]);
  return MeshZone;
}(_Zone2["default"]);

exports["default"] = MeshZone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL01lc2hab25lLmpzIl0sIm5hbWVzIjpbIk1lc2hab25lIiwiYm91bmRzIiwic2NhbGUiLCJUaHJlZUdlb21ldHJ5IiwidHlwZSIsImdlb21ldHJ5Iiwic3VwcG9ydHNDcm9zc2luZyIsIkVycm9yIiwiaXNCdWZmZXJHZW9tZXRyeSIsImZyb21CdWZmZXJHZW9tZXRyeSIsInZlcnRpY2VzIiwiclZlY3RvciIsImxlbmd0aCIsIk1hdGgiLCJyYW5kb20iLCJ2ZWN0b3IiLCJ4IiwieSIsInoiLCJab25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxROzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Usb0JBQVlDLE1BQVosRUFBOEM7QUFBQTs7QUFBQSxRQUExQkMsS0FBMEIsdUVBQWxCLENBQWtCO0FBQUEsUUFBZkMsYUFBZTtBQUFBO0FBQzVDLDhCQUFNQyxxQkFBTjtBQUVBLFVBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxVQUFLSCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLSSxnQkFBTCxHQUF3QixLQUF4Qjs7QUFFQSxRQUFJTCxNQUFNLENBQUNHLElBQVAsSUFBZUgsTUFBTSxDQUFDRyxJQUFQLEtBQWdCLFVBQW5DLEVBQStDO0FBQzdDLFlBQUtDLFFBQUwsR0FBZ0JKLE1BQWhCO0FBQ0Q7O0FBRUQsUUFBSUEsTUFBTSxDQUFDSSxRQUFYLEVBQXFCO0FBQ25CLFlBQUtBLFFBQUwsR0FBZ0JKLE1BQU0sQ0FBQ0ksUUFBdkI7QUFDRDs7QUFFRCxRQUFJLENBQUMsTUFBS0EsUUFBVixFQUFvQjtBQUNsQixZQUFNLElBQUlFLEtBQUosQ0FDSiwwREFESSxDQUFOO0FBR0Q7O0FBRUQsUUFBSSxNQUFLRixRQUFMLENBQWNHLGdCQUFsQixFQUFvQztBQUNsQyxZQUFLSCxRQUFMLEdBQWdCLElBQUlGLGFBQUosR0FBb0JNLGtCQUFwQixDQUF1QyxNQUFLSixRQUE1QyxDQUFoQjtBQUNEOztBQXZCMkM7QUF3QjdDO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7aUNBQ2U7QUFDWCxhQUFPLElBQVA7QUFDRDs7O2tDQUVhO0FBQ1osVUFBTUssUUFBUSxHQUFHLEtBQUtMLFFBQUwsQ0FBY0ssUUFBL0I7QUFDQSxVQUFNQyxPQUFPLEdBQUdELFFBQVEsQ0FBRUEsUUFBUSxDQUFDRSxNQUFULEdBQWtCQyxJQUFJLENBQUNDLE1BQUwsRUFBbkIsSUFBcUMsQ0FBdEMsQ0FBeEI7QUFFQSxXQUFLQyxNQUFMLENBQVlDLENBQVosR0FBZ0JMLE9BQU8sQ0FBQ0ssQ0FBUixHQUFZLEtBQUtkLEtBQWpDO0FBQ0EsV0FBS2EsTUFBTCxDQUFZRSxDQUFaLEdBQWdCTixPQUFPLENBQUNNLENBQVIsR0FBWSxLQUFLZixLQUFqQztBQUNBLFdBQUthLE1BQUwsQ0FBWUcsQ0FBWixHQUFnQlAsT0FBTyxDQUFDTyxDQUFSLEdBQVksS0FBS2hCLEtBQWpDO0FBRUEsYUFBTyxLQUFLYSxNQUFaO0FBQ0Q7OztFQXJEbUNJLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFpvbmUgZnJvbSAnLi9ab25lJztcbmltcG9ydCB7IFpPTkVfVFlQRV9NRVNIIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBVc2VzIGEgdGhyZWUgVEhSRUUuR2VvbWV0cnkgdG8gZGV0ZXJtaW5lIHRoZSB6b25lIHBhcmFtZXRlcnMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNoWm9uZSBleHRlbmRzIFpvbmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdHMge01lc2hab25lfVxuICAgKlxuICAgKiBAcGFyYW0ge1RIUkVFLkdlb21ldHJ5fE1lc2h9IGJvdW5kcyAtIHRoZSBnZW9tZXRyeSBvciBtZXNoIHRoYXQgd2lsbCBkZXRlcm1pbmUgdGhlIHpvbmUgYm91bmRzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZSAtIHRoZSB6b25lIHNjYWxlXG4gICAqIEBwYXJhbSB7VEhSRUUuR2VvbWV0cnl9IFRocmVlR2VvbWV0cnkgLSB0aGUgdGhyZWUgZ2VvbWV0cnkgY2xhc3NcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihib3VuZHMsIHNjYWxlID0gMSwgVGhyZWVHZW9tZXRyeSkge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgdGhpcy5nZW9tZXRyeSA9IG51bGw7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuc3VwcG9ydHNDcm9zc2luZyA9IGZhbHNlO1xuXG4gICAgaWYgKGJvdW5kcy50eXBlICYmIGJvdW5kcy50eXBlID09PSAnR2VvbWV0cnknKSB7XG4gICAgICB0aGlzLmdlb21ldHJ5ID0gYm91bmRzO1xuICAgIH1cblxuICAgIGlmIChib3VuZHMuZ2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuZ2VvbWV0cnkgPSBib3VuZHMuZ2VvbWV0cnk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmdlb21ldHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdNZXNoWm9uZSB1bmFibGUgdG8gc2V0IGdlb21ldHJ5IGZyb20gdGhlIHN1cHBsaWVkIGJvdW5kcydcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2VvbWV0cnkuaXNCdWZmZXJHZW9tZXRyeSkge1xuICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBUaHJlZUdlb21ldHJ5KCkuZnJvbUJ1ZmZlckdlb21ldHJ5KHRoaXMuZ2VvbWV0cnkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIE1lc2hab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNNZXNoWm9uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcztcbiAgICBjb25zdCByVmVjdG9yID0gdmVydGljZXNbKHZlcnRpY2VzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpID4+IDBdO1xuXG4gICAgdGhpcy52ZWN0b3IueCA9IHJWZWN0b3IueCAqIHRoaXMuc2NhbGU7XG4gICAgdGhpcy52ZWN0b3IueSA9IHJWZWN0b3IueSAqIHRoaXMuc2NhbGU7XG4gICAgdGhpcy52ZWN0b3IueiA9IHJWZWN0b3IueiAqIHRoaXMuc2NhbGU7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cbn1cbiJdfQ==