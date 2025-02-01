"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Vector3D = _interopRequireDefault(require("../math/Vector3D"));

var _types = require("./types");

/**
 * A Zone determines the area in 3D space where an emitter's particles can position
 * themselves. They are supplied to both the Position initializer
 * and the CrossZone behaviour.
 *
 * @see {@link '../initialize/Position.js'}
 * @see {@link '../behaviour/CrossZone.js'}
 * @abstract
 */
var Zone = /*#__PURE__*/function () {
  /**
   * Constructs a Zone instance.
   *
   * @param {string} type - The zone type
   * @return void
   */
  function Zone() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.ZONE_TYPE_ABSTRACT;
    (0, _classCallCheck2["default"])(this, Zone);
    this.type = type;
    this.vector = new _Vector3D["default"](0, 0, 0);
    this.random = 0;
    this.crossType = 'dead';
    this.log = true;
    this.supportsCrossing = true;
  }

  (0, _createClass2["default"])(Zone, [{
    key: "getPosition",
    value: function getPosition() {
      return null;
    }
  }, {
    key: "crossing",
    value: function crossing(particle) {
      if (!this.supportsCrossing) {
        return console.warn("".concat(this.constructor.name, " does not support the crossing method"));
      }

      switch (this.crossType) {
        case 'bound':
          this._bound(particle);

          break;

        case 'cross':
          this._cross(particle);

          break;

        case 'dead':
          this._dead(particle);

          break;
      }
    }
    /**
     * Determines if this zone is a BoxZone.
     *
     * @return {boolean}
     */

  }, {
    key: "isBoxZone",
    value: function isBoxZone() {
      return false;
    }
    /**
     * Determines if this zone is a LineZone.
     *
     * @return {boolean}
     */

  }, {
    key: "isLineZone",
    value: function isLineZone() {
      return false;
    }
    /**
     * Determines if this zone is a MeshZone.
     *
     * @return {boolean}
     */

  }, {
    key: "isMeshZone",
    value: function isMeshZone() {
      return false;
    }
    /**
     * Determines if this zone is a PointZone.
     *
     * @return {boolean}
     */

  }, {
    key: "isPointZone",
    value: function isPointZone() {
      return false;
    }
    /**
     * Determines if this zone is a ScreenZone.
     *
     * @return {boolean}
     */

  }, {
    key: "isScreenZone",
    value: function isScreenZone() {
      return false;
    }
    /**
     * Determines if this zone is a SphereZone.
     *
     * @return {boolean}
     */

  }, {
    key: "isSphereZone",
    value: function isSphereZone() {
      return false;
    }
    /**
     * Sets the particle's dead property to true if required.
     *
     * @param {Particle} particle
     * @abstract
     */

  }, {
    key: "_dead",
    value: function _dead(particle) {} //eslint-disable-line

    /**
     * @abstract
     */

  }, {
    key: "_bound",
    value: function _bound(particle) {} //eslint-disable-line

    /**
     * @abstract
     */

  }, {
    key: "_cross",
    value: function _cross(particle) {} //eslint-disable-line

  }]);
  return Zone;
}();

exports["default"] = Zone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1pvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsInR5cGUiLCJaT05FX1RZUEVfQUJTVFJBQ1QiLCJ2ZWN0b3IiLCJWZWN0b3IzRCIsInJhbmRvbSIsImNyb3NzVHlwZSIsImxvZyIsInN1cHBvcnRzQ3Jvc3NpbmciLCJwYXJ0aWNsZSIsImNvbnNvbGUiLCJ3YXJuIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiX2JvdW5kIiwiX2Nyb3NzIiwiX2RlYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLEk7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Usa0JBQXVDO0FBQUEsUUFBM0JDLElBQTJCLHVFQUFwQkMseUJBQW9CO0FBQUE7QUFDckMsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLElBQUlDLG9CQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLElBQVg7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOzs7O2tDQUVhO0FBQ1osYUFBTyxJQUFQO0FBQ0Q7Ozs2QkFFUUMsUSxFQUFVO0FBQ2pCLFVBQUksQ0FBQyxLQUFLRCxnQkFBVixFQUE0QjtBQUMxQixlQUFPRSxPQUFPLENBQUNDLElBQVIsV0FDRixLQUFLQyxXQUFMLENBQWlCQyxJQURmLDJDQUFQO0FBR0Q7O0FBRUQsY0FBUSxLQUFLUCxTQUFiO0FBQ0UsYUFBSyxPQUFMO0FBQ0UsZUFBS1EsTUFBTCxDQUFZTCxRQUFaOztBQUNBOztBQUVGLGFBQUssT0FBTDtBQUNFLGVBQUtNLE1BQUwsQ0FBWU4sUUFBWjs7QUFDQTs7QUFFRixhQUFLLE1BQUw7QUFDRSxlQUFLTyxLQUFMLENBQVdQLFFBQVg7O0FBQ0E7QUFYSjtBQWFEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztnQ0FDYztBQUNWLGFBQU8sS0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztpQ0FDZTtBQUNYLGFBQU8sS0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztpQ0FDZTtBQUNYLGFBQU8sS0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztrQ0FDZ0I7QUFDWixhQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7bUNBQ2lCO0FBQ2IsYUFBTyxLQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O21DQUNpQjtBQUNiLGFBQU8sS0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzBCQUNRQSxRLEVBQVUsQ0FBRSxDLENBQUM7O0FBRW5CO0FBQ0Y7QUFDQTs7OzsyQkFDU0EsUSxFQUFVLENBQUUsQyxDQUFDOztBQUVwQjtBQUNGO0FBQ0E7Ozs7MkJBQ1NBLFEsRUFBVSxDQUFFLEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRCBmcm9tICcuLi9tYXRoL1ZlY3RvcjNEJztcbmltcG9ydCB7IFpPTkVfVFlQRV9BQlNUUkFDVCB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEEgWm9uZSBkZXRlcm1pbmVzIHRoZSBhcmVhIGluIDNEIHNwYWNlIHdoZXJlIGFuIGVtaXR0ZXIncyBwYXJ0aWNsZXMgY2FuIHBvc2l0aW9uXG4gKiB0aGVtc2VsdmVzLiBUaGV5IGFyZSBzdXBwbGllZCB0byBib3RoIHRoZSBQb3NpdGlvbiBpbml0aWFsaXplclxuICogYW5kIHRoZSBDcm9zc1pvbmUgYmVoYXZpb3VyLlxuICpcbiAqIEBzZWUge0BsaW5rICcuLi9pbml0aWFsaXplL1Bvc2l0aW9uLmpzJ31cbiAqIEBzZWUge0BsaW5rICcuLi9iZWhhdmlvdXIvQ3Jvc3Nab25lLmpzJ31cbiAqIEBhYnN0cmFjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBab25lIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB6b25lIHR5cGVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlID0gWk9ORV9UWVBFX0FCU1RSQUNUKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IzRCgwLCAwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSAnZGVhZCc7XG4gICAgdGhpcy5sb2cgPSB0cnVlO1xuICAgIHRoaXMuc3VwcG9ydHNDcm9zc2luZyA9IHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKCF0aGlzLnN1cHBvcnRzQ3Jvc3NpbmcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4oXG4gICAgICAgIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCB0aGUgY3Jvc3NpbmcgbWV0aG9kYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMuY3Jvc3NUeXBlKSB7XG4gICAgICBjYXNlICdib3VuZCc6XG4gICAgICAgIHRoaXMuX2JvdW5kKHBhcnRpY2xlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nyb3NzJzpcbiAgICAgICAgdGhpcy5fY3Jvc3MocGFydGljbGUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZGVhZCc6XG4gICAgICAgIHRoaXMuX2RlYWQocGFydGljbGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBCb3hab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNCb3hab25lKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoaXMgem9uZSBpcyBhIExpbmVab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNMaW5lWm9uZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBNZXNoWm9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzTWVzaFpvbmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhpcyB6b25lIGlzIGEgUG9pbnRab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNQb2ludFpvbmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhpcyB6b25lIGlzIGEgU2NyZWVuWm9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU2NyZWVuWm9uZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBTcGhlcmVab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNTcGhlcmVab25lKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwYXJ0aWNsZSdzIGRlYWQgcHJvcGVydHkgdG8gdHJ1ZSBpZiByZXF1aXJlZC5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBfZGVhZChwYXJ0aWNsZSkge30gLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgX2JvdW5kKHBhcnRpY2xlKSB7fSAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuICAvKipcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBfY3Jvc3MocGFydGljbGUpIHt9IC8vZXNsaW50LWRpc2FibGUtbGluZVxufVxuIl19