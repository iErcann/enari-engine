"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _math = require("../math");

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _constants = require("./constants");

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that causes particles to drift to random coordinates in 3D space.
 *
 */
var RandomDrift = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(RandomDrift, _Behaviour);

  var _super = _createSuper(RandomDrift);

  /**
   * Constructs a RandomDrift behaviour instance.
   *
   * @param {number} driftX - x axis drift
   * @param {number} driftY - y axis drift
   * @param {number} driftZ - z axis drift
   * @param {number} [delay=DEFAULT_RANDOM_DRIFT_DELAY] - drift delay
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  function RandomDrift(driftX, driftY, driftZ) {
    var _this;

    var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.DEFAULT_RANDOM_DRIFT_DELAY;
    var life = arguments.length > 4 ? arguments[4] : undefined;
    var easing = arguments.length > 5 ? arguments[5] : undefined;
    var isEnabled = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    (0, _classCallCheck2["default"])(this, RandomDrift);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_RANDOM_DRIFT, isEnabled);

    _this.reset(driftX, driftY, driftZ, delay);
    /**
     * @desc Internal time used for calculating drift vs internal delay.
     * @type {number}
     */


    _this.time = 0;
    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} driftX - x axis drift
   * @param {number} driftY - y axis drift
   * @param {number} driftZ - z axis drift
   * @param {number} [delay=DEFAULT_RANDOM_DRIFT_DELAY] - drift delay
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   */


  (0, _createClass2["default"])(RandomDrift, [{
    key: "reset",
    value: function reset(driftX, driftY, driftZ) {
      var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.DEFAULT_RANDOM_DRIFT_DELAY;
      var life = arguments.length > 4 ? arguments[4] : undefined;
      var easing = arguments.length > 5 ? arguments[5] : undefined;

      /**
       * @desc A Vector3D that stores the drift properties.
       * @type {Vector3D}
       */
      this.randomForce = this.normalizeForce(new _math.Vector3D(driftX, driftY, driftZ));
      /**
       * @desc A Span containing the delay supplied.
       * @type {Span}
       */

      this.delayPan = (0, _math.createSpan)(delay);
      this.time = 0;
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(RandomDrift.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Mutates the particle.acceleration property.
     *
     * @param {object} particle - the particle to apply the behaviour to
     * @param {number} time - engine time
     * @param {integer} index - the particle index
     * @return void
     */

  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      this.energize(particle, time, index);
      this.time += time;

      if (this.time >= this.delayPan.getValue()) {
        var ax = _math.MathUtils.randomAToB(-this.randomForce.x, this.randomForce.x);

        var ay = _math.MathUtils.randomAToB(-this.randomForce.y, this.randomForce.y);

        var az = _math.MathUtils.randomAToB(-this.randomForce.z, this.randomForce.z);

        particle.acceleration.addValue(ax, ay, az);
        this.time = 0;
      }
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var x = json.x,
          y = json.y,
          z = json.z,
          delay = json.delay,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new RandomDrift(x, y, z, delay, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return RandomDrift;
}(_Behaviour2["default"]);

exports["default"] = RandomDrift;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUmFuZG9tRHJpZnQuanMiXSwibmFtZXMiOlsiUmFuZG9tRHJpZnQiLCJkcmlmdFgiLCJkcmlmdFkiLCJkcmlmdFoiLCJkZWxheSIsIkRFRkFVTFRfUkFORE9NX0RSSUZUX0RFTEFZIiwibGlmZSIsImVhc2luZyIsImlzRW5hYmxlZCIsInR5cGUiLCJyZXNldCIsInRpbWUiLCJyYW5kb21Gb3JjZSIsIm5vcm1hbGl6ZUZvcmNlIiwiVmVjdG9yM0QiLCJkZWxheVBhbiIsInBhcnRpY2xlIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsImdldFZhbHVlIiwiYXgiLCJNYXRoVXRpbHMiLCJyYW5kb21BVG9CIiwieCIsImF5IiwieSIsImF6IiwieiIsImFjY2VsZXJhdGlvbiIsImFkZFZhbHVlIiwianNvbiIsIkJlaGF2aW91ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxXOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsdUJBQ0VDLE1BREYsRUFFRUMsTUFGRixFQUdFQyxNQUhGLEVBUUU7QUFBQTs7QUFBQSxRQUpBQyxLQUlBLHVFQUpRQyxxQ0FJUjtBQUFBLFFBSEFDLElBR0E7QUFBQSxRQUZBQyxNQUVBO0FBQUEsUUFEQUMsU0FDQSx1RUFEWSxJQUNaO0FBQUE7QUFDQSw4QkFBTUYsSUFBTixFQUFZQyxNQUFaLEVBQW9CRSxrQ0FBcEIsRUFBMEJELFNBQTFCOztBQUVBLFVBQUtFLEtBQUwsQ0FBV1QsTUFBWCxFQUFtQkMsTUFBbkIsRUFBMkJDLE1BQTNCLEVBQW1DQyxLQUFuQztBQUVBO0FBQ0o7QUFDQTtBQUNBOzs7QUFDSSxVQUFLTyxJQUFMLEdBQVksQ0FBWjtBQVRBO0FBVUQ7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7MEJBRUlWLE0sRUFDQUMsTSxFQUNBQyxNLEVBSUE7QUFBQSxVQUhBQyxLQUdBLHVFQUhRQyxxQ0FHUjtBQUFBLFVBRkFDLElBRUE7QUFBQSxVQURBQyxNQUNBOztBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksV0FBS0ssV0FBTCxHQUFtQixLQUFLQyxjQUFMLENBQ2pCLElBQUlDLGNBQUosQ0FBYWIsTUFBYixFQUFxQkMsTUFBckIsRUFBNkJDLE1BQTdCLENBRGlCLENBQW5CO0FBR0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksV0FBS1ksUUFBTCxHQUFnQixzQkFBV1gsS0FBWCxDQUFoQjtBQUNBLFdBQUtPLElBQUwsR0FBWSxDQUFaO0FBRUFMLE1BQUFBLElBQUksNkdBQWdCQSxJQUFoQixFQUFzQkMsTUFBdEIsQ0FBSjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU1MsUSxFQUFVTCxJLEVBQU1NLEssRUFBTztBQUM1QixXQUFLQyxRQUFMLENBQWNGLFFBQWQsRUFBd0JMLElBQXhCLEVBQThCTSxLQUE5QjtBQUVBLFdBQUtOLElBQUwsSUFBYUEsSUFBYjs7QUFFQSxVQUFJLEtBQUtBLElBQUwsSUFBYSxLQUFLSSxRQUFMLENBQWNJLFFBQWQsRUFBakIsRUFBMkM7QUFDekMsWUFBTUMsRUFBRSxHQUFHQyxnQkFBVUMsVUFBVixDQUFxQixDQUFDLEtBQUtWLFdBQUwsQ0FBaUJXLENBQXZDLEVBQTBDLEtBQUtYLFdBQUwsQ0FBaUJXLENBQTNELENBQVg7O0FBQ0EsWUFBTUMsRUFBRSxHQUFHSCxnQkFBVUMsVUFBVixDQUFxQixDQUFDLEtBQUtWLFdBQUwsQ0FBaUJhLENBQXZDLEVBQTBDLEtBQUtiLFdBQUwsQ0FBaUJhLENBQTNELENBQVg7O0FBQ0EsWUFBTUMsRUFBRSxHQUFHTCxnQkFBVUMsVUFBVixDQUFxQixDQUFDLEtBQUtWLFdBQUwsQ0FBaUJlLENBQXZDLEVBQTBDLEtBQUtmLFdBQUwsQ0FBaUJlLENBQTNELENBQVg7O0FBRUFYLFFBQUFBLFFBQVEsQ0FBQ1ksWUFBVCxDQUFzQkMsUUFBdEIsQ0FBK0JULEVBQS9CLEVBQW1DSSxFQUFuQyxFQUF1Q0UsRUFBdkM7QUFFQSxhQUFLZixJQUFMLEdBQVksQ0FBWjtBQUNEO0FBQ0Y7Ozs2QkFFZW1CLEksRUFBTTtBQUFBLFVBQ1pQLENBRFksR0FDdUNPLElBRHZDLENBQ1pQLENBRFk7QUFBQSxVQUNURSxDQURTLEdBQ3VDSyxJQUR2QyxDQUNUTCxDQURTO0FBQUEsVUFDTkUsQ0FETSxHQUN1Q0csSUFEdkMsQ0FDTkgsQ0FETTtBQUFBLFVBQ0h2QixLQURHLEdBQ3VDMEIsSUFEdkMsQ0FDSDFCLEtBREc7QUFBQSxVQUNJRSxJQURKLEdBQ3VDd0IsSUFEdkMsQ0FDSXhCLElBREo7QUFBQSxVQUNVQyxNQURWLEdBQ3VDdUIsSUFEdkMsQ0FDVXZCLE1BRFY7QUFBQSw0QkFDdUN1QixJQUR2QyxDQUNrQnRCLFNBRGxCO0FBQUEsVUFDa0JBLFNBRGxCLGdDQUM4QixJQUQ5QjtBQUdwQixhQUFPLElBQUlSLFdBQUosQ0FDTHVCLENBREssRUFFTEUsQ0FGSyxFQUdMRSxDQUhLLEVBSUx2QixLQUpLLEVBS0xFLElBTEssRUFNTCwyQkFBZ0JDLE1BQWhCLENBTkssRUFPTEMsU0FQSyxDQUFQO0FBU0Q7OztFQXZHc0N1QixzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdGhVdGlscywgVmVjdG9yM0QsIGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tICcuL0JlaGF2aW91cic7XG5pbXBvcnQgeyBERUZBVUxUX1JBTkRPTV9EUklGVF9ERUxBWSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfUkFORE9NX0RSSUZUIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBjYXVzZXMgcGFydGljbGVzIHRvIGRyaWZ0IHRvIHJhbmRvbSBjb29yZGluYXRlcyBpbiAzRCBzcGFjZS5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbURyaWZ0IGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBSYW5kb21EcmlmdCBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkcmlmdFggLSB4IGF4aXMgZHJpZnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRyaWZ0WSAtIHkgYXhpcyBkcmlmdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZHJpZnRaIC0geiBheGlzIGRyaWZ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZGVsYXk9REVGQVVMVF9SQU5ET01fRFJJRlRfREVMQVldIC0gZHJpZnQgZGVsYXlcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgZHJpZnRYLFxuICAgIGRyaWZ0WSxcbiAgICBkcmlmdFosXG4gICAgZGVsYXkgPSBERUZBVUxUX1JBTkRPTV9EUklGVF9ERUxBWSxcbiAgICBsaWZlLFxuICAgIGVhc2luZyxcbiAgICBpc0VuYWJsZWQgPSB0cnVlXG4gICkge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcblxuICAgIHRoaXMucmVzZXQoZHJpZnRYLCBkcmlmdFksIGRyaWZ0WiwgZGVsYXkpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgSW50ZXJuYWwgdGltZSB1c2VkIGZvciBjYWxjdWxhdGluZyBkcmlmdCB2cyBpbnRlcm5hbCBkZWxheS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRyaWZ0WCAtIHggYXhpcyBkcmlmdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZHJpZnRZIC0geSBheGlzIGRyaWZ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkcmlmdFogLSB6IGF4aXMgZHJpZnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWxheT1ERUZBVUxUX1JBTkRPTV9EUklGVF9ERUxBWV0gLSBkcmlmdCBkZWxheVxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICovXG4gIHJlc2V0KFxuICAgIGRyaWZ0WCxcbiAgICBkcmlmdFksXG4gICAgZHJpZnRaLFxuICAgIGRlbGF5ID0gREVGQVVMVF9SQU5ET01fRFJJRlRfREVMQVksXG4gICAgbGlmZSxcbiAgICBlYXNpbmdcbiAgKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgQSBWZWN0b3IzRCB0aGF0IHN0b3JlcyB0aGUgZHJpZnQgcHJvcGVydGllcy5cbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5yYW5kb21Gb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UoXG4gICAgICBuZXcgVmVjdG9yM0QoZHJpZnRYLCBkcmlmdFksIGRyaWZ0WilcbiAgICApO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIEEgU3BhbiBjb250YWluaW5nIHRoZSBkZWxheSBzdXBwbGllZC5cbiAgICAgKiBAdHlwZSB7U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRlbGF5UGFuID0gY3JlYXRlU3BhbihkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZS5hY2NlbGVyYXRpb24gcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICB0aGlzLnRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnRpbWUgPj0gdGhpcy5kZWxheVBhbi5nZXRWYWx1ZSgpKSB7XG4gICAgICBjb25zdCBheCA9IE1hdGhVdGlscy5yYW5kb21BVG9CKC10aGlzLnJhbmRvbUZvcmNlLngsIHRoaXMucmFuZG9tRm9yY2UueCk7XG4gICAgICBjb25zdCBheSA9IE1hdGhVdGlscy5yYW5kb21BVG9CKC10aGlzLnJhbmRvbUZvcmNlLnksIHRoaXMucmFuZG9tRm9yY2UueSk7XG4gICAgICBjb25zdCBheiA9IE1hdGhVdGlscy5yYW5kb21BVG9CKC10aGlzLnJhbmRvbUZvcmNlLnosIHRoaXMucmFuZG9tRm9yY2Uueik7XG5cbiAgICAgIHBhcnRpY2xlLmFjY2VsZXJhdGlvbi5hZGRWYWx1ZShheCwgYXksIGF6KTtcblxuICAgICAgdGhpcy50aW1lID0gMDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgeCwgeSwgeiwgZGVsYXksIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgUmFuZG9tRHJpZnQoXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIHosXG4gICAgICBkZWxheSxcbiAgICAgIGxpZmUsXG4gICAgICBnZXRFYXNpbmdCeU5hbWUoZWFzaW5nKSxcbiAgICAgIGlzRW5hYmxlZFxuICAgICk7XG4gIH1cbn1cbiJdfQ==