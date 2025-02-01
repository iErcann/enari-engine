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

var _constants = require("./constants");

var _math = require("../math");

var _Initializer2 = _interopRequireDefault(require("./Initializer"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Calculates the rate of particle emission.
 *
 * NOTE This doesn't need to be an initializer, it doesn't have an initialize
 * method, it overrides the base init method and it is only relevent to the Emitter class.
 * It would be better to move this to the Emitter module itself as a standalone class.
 *
 */
var Rate = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Rate, _Initializer);

  var _super = _createSuper(Rate);

  /**
   * Constructs a Rate instance.
   *
   * @param {number|array|Span} numPan - The number of particles to emit
   * @param {number|array|Span} timePan - The time between each particle emission
   * @return void
   */
  function Rate() {
    var _this;

    var numPan = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_RATE_NUM_PAN;
    var timePan = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_RATE_TIME_PAN;
    (0, _classCallCheck2["default"])(this, Rate);
    _this = _super.call(this, _types.INITIALIZER_TYPE_RATE);
    /**
     * @desc Sets the number of particles to emit.
     * @type {Span}
     */

    _this.numPan = (0, _math.createSpan)(numPan);
    /**
     * @desc Sets the time between each particle emission.
     * @type {Span}
     */

    _this.timePan = (0, _math.createSpan)(timePan);
    /**
     * @desc The rate's start time.
     * @type {number}
     */

    _this.startTime = 0;
    /**
     * @desc The rate's next time.
     * @type {number}
     */

    _this.nextTime = 0;

    _this.init();

    return _this;
  }
  /**
   * Sets the startTime and nextTime properties.
   *
   * @return void
   */


  (0, _createClass2["default"])(Rate, [{
    key: "init",
    value: function init() {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();
    }
    /**
     * Gets the number of particles to emit.
     *
     * @param {number} time - Current particle engine time
     * @return {number}
     */

  }, {
    key: "getValue",
    value: function getValue(time) {
      this.startTime += time;

      if (this.startTime >= this.nextTime) {
        this.init();

        if (this.numPan.b == 1) {
          if (this.numPan.getValue('Float') > 0.5) return 1;else return 0;
        } else {
          return this.numPan.getValue('Int');
        }
      }

      return 0;
    }
    /**
     * Creates a Rate initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.particlesMin - The minimum number of particles to emit
     * @property {number} json.particlesMax - The maximum number of particles to emit
     * @property {number} json.perSecondMin - The minimum per second emit rate
     * @property {number} json.perSecondMax - The maximum per second emit rate
     * @return {Rate}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var particlesMin = json.particlesMin,
          particlesMax = json.particlesMax,
          perSecondMin = json.perSecondMin,
          perSecondMax = json.perSecondMax;
      return new Rate(new _math.Span(particlesMin, particlesMax), new _math.Span(perSecondMin, perSecondMax));
    }
  }]);
  return Rate;
}(_Initializer2["default"]);

exports["default"] = Rate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9SYXRlLmpzIl0sIm5hbWVzIjpbIlJhdGUiLCJudW1QYW4iLCJERUZBVUxUX1JBVEVfTlVNX1BBTiIsInRpbWVQYW4iLCJERUZBVUxUX1JBVEVfVElNRV9QQU4iLCJ0eXBlIiwic3RhcnRUaW1lIiwibmV4dFRpbWUiLCJpbml0IiwiZ2V0VmFsdWUiLCJ0aW1lIiwiYiIsImpzb24iLCJwYXJ0aWNsZXNNaW4iLCJwYXJ0aWNsZXNNYXgiLCJwZXJTZWNvbmRNaW4iLCJwZXJTZWNvbmRNYXgiLCJTcGFuIiwiSW5pdGlhbGl6ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsSTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxrQkFBNEU7QUFBQTs7QUFBQSxRQUFoRUMsTUFBZ0UsdUVBQXZEQywrQkFBdUQ7QUFBQSxRQUFqQ0MsT0FBaUMsdUVBQXZCQyxnQ0FBdUI7QUFBQTtBQUMxRSw4QkFBTUMsNEJBQU47QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLSixNQUFMLEdBQWMsc0JBQVdBLE1BQVgsQ0FBZDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtFLE9BQUwsR0FBZSxzQkFBV0EsT0FBWCxDQUFmO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0csU0FBTCxHQUFpQixDQUFqQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7O0FBRUEsVUFBS0MsSUFBTDs7QUEzQjBFO0FBNEIzRTtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7OzJCQUNTO0FBQ0wsV0FBS0YsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsS0FBS0osT0FBTCxDQUFhTSxRQUFiLEVBQWhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NkJBQ1dDLEksRUFBTTtBQUNiLFdBQUtKLFNBQUwsSUFBa0JJLElBQWxCOztBQUVBLFVBQUksS0FBS0osU0FBTCxJQUFrQixLQUFLQyxRQUEzQixFQUFxQztBQUNuQyxhQUFLQyxJQUFMOztBQUVBLFlBQUksS0FBS1AsTUFBTCxDQUFZVSxDQUFaLElBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGNBQUksS0FBS1YsTUFBTCxDQUFZUSxRQUFaLENBQXFCLE9BQXJCLElBQWdDLEdBQXBDLEVBQXlDLE9BQU8sQ0FBUCxDQUF6QyxLQUNLLE9BQU8sQ0FBUDtBQUNOLFNBSEQsTUFHTztBQUNMLGlCQUFPLEtBQUtSLE1BQUwsQ0FBWVEsUUFBWixDQUFxQixLQUFyQixDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPLENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNrQkcsSSxFQUFNO0FBQUEsVUFDWkMsWUFEWSxHQUMrQ0QsSUFEL0MsQ0FDWkMsWUFEWTtBQUFBLFVBQ0VDLFlBREYsR0FDK0NGLElBRC9DLENBQ0VFLFlBREY7QUFBQSxVQUNnQkMsWUFEaEIsR0FDK0NILElBRC9DLENBQ2dCRyxZQURoQjtBQUFBLFVBQzhCQyxZQUQ5QixHQUMrQ0osSUFEL0MsQ0FDOEJJLFlBRDlCO0FBR3BCLGFBQU8sSUFBSWhCLElBQUosQ0FDTCxJQUFJaUIsVUFBSixDQUFTSixZQUFULEVBQXVCQyxZQUF2QixDQURLLEVBRUwsSUFBSUcsVUFBSixDQUFTRixZQUFULEVBQXVCQyxZQUF2QixDQUZLLENBQVA7QUFJRDs7O0VBeEYrQkUsd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBERUZBVUxUX1JBVEVfTlVNX1BBTiwgREVGQVVMVF9SQVRFX1RJTUVfUEFOIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgU3BhbiwgY3JlYXRlU3BhbiB9IGZyb20gJy4uL21hdGgnO1xuXG5pbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX1JBVEUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHJhdGUgb2YgcGFydGljbGUgZW1pc3Npb24uXG4gKlxuICogTk9URSBUaGlzIGRvZXNuJ3QgbmVlZCB0byBiZSBhbiBpbml0aWFsaXplciwgaXQgZG9lc24ndCBoYXZlIGFuIGluaXRpYWxpemVcbiAqIG1ldGhvZCwgaXQgb3ZlcnJpZGVzIHRoZSBiYXNlIGluaXQgbWV0aG9kIGFuZCBpdCBpcyBvbmx5IHJlbGV2ZW50IHRvIHRoZSBFbWl0dGVyIGNsYXNzLlxuICogSXQgd291bGQgYmUgYmV0dGVyIHRvIG1vdmUgdGhpcyB0byB0aGUgRW1pdHRlciBtb2R1bGUgaXRzZWxmIGFzIGEgc3RhbmRhbG9uZSBjbGFzcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGUgZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgUmF0ZSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ8YXJyYXl8U3Bhbn0gbnVtUGFuIC0gVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdFxuICAgKiBAcGFyYW0ge251bWJlcnxhcnJheXxTcGFufSB0aW1lUGFuIC0gVGhlIHRpbWUgYmV0d2VlbiBlYWNoIHBhcnRpY2xlIGVtaXNzaW9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtUGFuID0gREVGQVVMVF9SQVRFX05VTV9QQU4sIHRpbWVQYW4gPSBERUZBVUxUX1JBVEVfVElNRV9QQU4pIHtcbiAgICBzdXBlcih0eXBlKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFNldHMgdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdC5cbiAgICAgKiBAdHlwZSB7U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLm51bVBhbiA9IGNyZWF0ZVNwYW4obnVtUGFuKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFNldHMgdGhlIHRpbWUgYmV0d2VlbiBlYWNoIHBhcnRpY2xlIGVtaXNzaW9uLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMudGltZVBhbiA9IGNyZWF0ZVNwYW4odGltZVBhbik7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcmF0ZSdzIHN0YXJ0IHRpbWUuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcmF0ZSdzIG5leHQgdGltZS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubmV4dFRpbWUgPSAwO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3RhcnRUaW1lIGFuZCBuZXh0VGltZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSB0aGlzLnRpbWVQYW4uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gQ3VycmVudCBwYXJ0aWNsZSBlbmdpbmUgdGltZVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRWYWx1ZSh0aW1lKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA+PSB0aGlzLm5leHRUaW1lKSB7XG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgaWYgKHRoaXMubnVtUGFuLmIgPT0gMSkge1xuICAgICAgICBpZiAodGhpcy5udW1QYW4uZ2V0VmFsdWUoJ0Zsb2F0JykgPiAwLjUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUGFuLmdldFZhbHVlKCdJbnQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmF0ZSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5wYXJ0aWNsZXNNaW4gLSBUaGUgbWluaW11bSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ucGFydGljbGVzTWF4IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnBlclNlY29uZE1pbiAtIFRoZSBtaW5pbXVtIHBlciBzZWNvbmQgZW1pdCByYXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnBlclNlY29uZE1heCAtIFRoZSBtYXhpbXVtIHBlciBzZWNvbmQgZW1pdCByYXRlXG4gICAqIEByZXR1cm4ge1JhdGV9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgcGFydGljbGVzTWluLCBwYXJ0aWNsZXNNYXgsIHBlclNlY29uZE1pbiwgcGVyU2Vjb25kTWF4IH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBSYXRlKFxuICAgICAgbmV3IFNwYW4ocGFydGljbGVzTWluLCBwYXJ0aWNsZXNNYXgpLFxuICAgICAgbmV3IFNwYW4ocGVyU2Vjb25kTWluLCBwZXJTZWNvbmRNYXgpXG4gICAgKTtcbiAgfVxufVxuIl19