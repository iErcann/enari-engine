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

var _Initializer2 = _interopRequireDefault(require("./Initializer"));

var _math = require("../math");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the radius property on initialized particles.
 *
 */
var Radius = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Radius, _Initializer);

  var _super = _createSuper(Radius);

  /**
   * Constructs a Radius initializer instance.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */
  function Radius(width, height) {
    var _this;

    var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Radius);
    _this = _super.call(this, _types.INITIALIZER_TYPE_RADIUS, isEnabled);
    /**
     * @desc The radius span which is used to set the particle radius value.
     * @type {Span}
     */

    _this.radius = (0, _math.createSpan)(width, height, center);
    return _this;
  }
  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */


  (0, _createClass2["default"])(Radius, [{
    key: "reset",
    value: function reset(width, height) {
      var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.radius = (0, _math.createSpan)(width, height, center);
    }
    /**
     * Sets the particle's initial radius.
     *
     * @param {Particle} particle - the particle to initialize the property on
     * @return void
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.radius = this.radius.getValue();
      particle.transform.oldRadius = particle.radius;
    }
    /**
     * Creates a Radius initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.width - The width of the particle radius
     * @property {number} json.height - The height of the particle radius
     * @property {number} json.center - The center of the particle radius
     * @return {Radius}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var width = json.width,
          height = json.height,
          _json$center = json.center,
          center = _json$center === void 0 ? false : _json$center,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Radius(width, height, center, isEnabled);
    }
  }]);
  return Radius;
}(_Initializer2["default"]);

exports["default"] = Radius;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9SYWRpdXMuanMiXSwibmFtZXMiOlsiUmFkaXVzIiwid2lkdGgiLCJoZWlnaHQiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJ0eXBlIiwicmFkaXVzIiwicGFydGljbGUiLCJnZXRWYWx1ZSIsInRyYW5zZm9ybSIsIm9sZFJhZGl1cyIsImpzb24iLCJJbml0aWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGtCQUFZQyxLQUFaLEVBQW1CQyxNQUFuQixFQUE2RDtBQUFBOztBQUFBLFFBQWxDQyxNQUFrQyx1RUFBekIsS0FBeUI7QUFBQSxRQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTtBQUFBO0FBQzNELDhCQUFNQyw4QkFBTixFQUFZRCxTQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0UsTUFBTCxHQUFjLHNCQUFXTCxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsTUFBMUIsQ0FBZDtBQVAyRDtBQVE1RDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7MEJBQ1FGLEssRUFBT0MsTSxFQUF3QjtBQUFBLFVBQWhCQyxNQUFnQix1RUFBUCxLQUFPO0FBQ25DLFdBQUtHLE1BQUwsR0FBYyxzQkFBV0wsS0FBWCxFQUFrQkMsTUFBbEIsRUFBMEJDLE1BQTFCLENBQWQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsrQkFDYUksUSxFQUFVO0FBQ25CQSxNQUFBQSxRQUFRLENBQUNELE1BQVQsR0FBa0IsS0FBS0EsTUFBTCxDQUFZRSxRQUFaLEVBQWxCO0FBQ0FELE1BQUFBLFFBQVEsQ0FBQ0UsU0FBVCxDQUFtQkMsU0FBbkIsR0FBK0JILFFBQVEsQ0FBQ0QsTUFBeEM7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDa0JLLEksRUFBTTtBQUFBLFVBQ1pWLEtBRFksR0FDd0NVLElBRHhDLENBQ1pWLEtBRFk7QUFBQSxVQUNMQyxNQURLLEdBQ3dDUyxJQUR4QyxDQUNMVCxNQURLO0FBQUEseUJBQ3dDUyxJQUR4QyxDQUNHUixNQURIO0FBQUEsVUFDR0EsTUFESCw2QkFDWSxLQURaO0FBQUEsNEJBQ3dDUSxJQUR4QyxDQUNtQlAsU0FEbkI7QUFBQSxVQUNtQkEsU0FEbkIsZ0NBQytCLElBRC9CO0FBR3BCLGFBQU8sSUFBSUosTUFBSixDQUFXQyxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsTUFBMUIsRUFBa0NDLFNBQWxDLENBQVA7QUFDRDs7O0VBeERpQ1Esd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XG5pbXBvcnQgeyBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX1JBRElVUyBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG4vKipcbiAqIFNldHMgdGhlIHJhZGl1cyBwcm9wZXJ0eSBvbiBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpdXMgZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgUmFkaXVzIGluaXRpYWxpemVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBUaGUgd2lkdGggb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgcmFkaXVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcj1mYWxzZV0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgcmFkaXVzIHZhbHVlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgY2VudGVyID0gZmFsc2UsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcih0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHJhZGl1cyBzcGFuIHdoaWNoIGlzIHVzZWQgdG8gc2V0IHRoZSBwYXJ0aWNsZSByYWRpdXMgdmFsdWUuXG4gICAgICogQHR5cGUge1NwYW59XG4gICAgICovXG4gICAgdGhpcy5yYWRpdXMgPSBjcmVhdGVTcGFuKHdpZHRoLCBoZWlnaHQsIGNlbnRlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBpbml0aWFsaXplciBwcm9wZXJ0aWVzLlxuICAgKiBDbGVhcnMgYWxsIHByZXZpb3VzbHkgc2V0IHpvbmVzIGFuZCByZXNldHMgdGhlIHpvbmVzIGFjY29yZGluZyB0byBhcmdzIHBhc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjZW50ZXI9ZmFsc2VdIC0gRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIGF2ZXJhZ2UgdGhlIHJhZGl1cyB2YWx1ZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlc2V0KHdpZHRoLCBoZWlnaHQsIGNlbnRlciA9IGZhbHNlKSB7XG4gICAgdGhpcy5yYWRpdXMgPSBjcmVhdGVTcGFuKHdpZHRoLCBoZWlnaHQsIGNlbnRlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFydGljbGUncyBpbml0aWFsIHJhZGl1cy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUucmFkaXVzID0gdGhpcy5yYWRpdXMuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0ub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSYWRpdXMgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ud2lkdGggLSBUaGUgd2lkdGggb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5oZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uY2VudGVyIC0gVGhlIGNlbnRlciBvZiB0aGUgcGFydGljbGUgcmFkaXVzXG4gICAqIEByZXR1cm4ge1JhZGl1c31cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgUmFkaXVzKHdpZHRoLCBoZWlnaHQsIGNlbnRlciwgaXNFbmFibGVkKTtcbiAgfVxufVxuIl19