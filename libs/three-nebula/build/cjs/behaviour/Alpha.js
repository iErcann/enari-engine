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
 * Behaviour that applies an alpha transition effect to particles.
 *
 */
var Alpha = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Alpha, _Behaviour);

  var _super = _createSuper(Alpha);

  /**
   * Constructs an Alpha behaviour instance.
   *
   * @param {number} alphaA - The starting alpha value
   * @param {?number} alphaB - The ending alpha value
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Alpha() {
    var _this;

    var alphaA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var alphaB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var life = arguments.length > 2 ? arguments[2] : undefined;
    var easing = arguments.length > 3 ? arguments[3] : undefined;
    var isEnabled = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    (0, _classCallCheck2["default"])(this, Alpha);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_ALPHA, isEnabled);
    /**
     * @desc The starting alpha value
     * @type {number|Span}
     */

    _this.alphaA = alphaA;
    /**
     * @desc The ending alpha value
     * @type {number|Span}
     */

    _this.alphaB = alphaB;

    _this.reset(alphaA, alphaB);

    return _this;
  }
  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(Alpha, [{
    key: "reset",

    /**
     * Resets the behaviour properties.
     *
     * @param {number} alphaA - the starting alpha value
     * @param {?number} alphaB - the ending alpha value
     * @param {number} life - the life of the behaviour
     * @param {function} easing - the easing equation to use for transforms
     * @return void
     */
    value: function reset() {
      var alphaA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var alphaB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var life = arguments.length > 2 ? arguments[2] : undefined;
      var easing = arguments.length > 3 ? arguments[3] : undefined;
      this.same = alphaB === null || alphaB === undefined ? true : false;
      this.alphaA = (0, _math.createSpan)(alphaA);
      this.alphaB = (0, _math.createSpan)(alphaB);
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(Alpha.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Initializes the behaviour on a particle.
     *
     * @param {object} particle - the particle to initialize the behaviour on
     * @return void
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.useAlpha = true;
      particle.transform.alphaA = this.alphaA.getValue();
      particle.transform.alphaB = this.same ? particle.transform.alphaA : this.alphaB.getValue();
    }
    /**
     * Mutates the target's alpha/opacity property.
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
      particle.alpha = _math.MathUtils.lerp(particle.transform.alphaA, particle.transform.alphaB, this.energy);

      if (particle.alpha < _constants.PARTICLE_ALPHA_THRESHOLD) {
        particle.alpha = 0;
      }
    }
    /**
     * Creates a Body initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.alphaA - The starting alpha value
     * @property {number} json.alphaB - The ending alpha value
     * @property {number} json.life - The life of the behaviour
     * @property {string} json.easing - The easing equation to use for transforms
     * @return {Body}
     */

  }, {
    key: "same",
    get: function get() {
      return this._same;
    }
    /**
     * Sets the _same property which determines if the alpha are the same.
     *
     * @param {boolean} same
     * @return {boolean}
     */
    ,
    set: function set(same) {
      /**
       * @type {boolean}
       */
      this._same = same;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var alphaA = json.alphaA,
          alphaB = json.alphaB,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Alpha(alphaA, alphaB, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Alpha;
}(_Behaviour2["default"]);

exports["default"] = Alpha;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiXSwibmFtZXMiOlsiQWxwaGEiLCJhbHBoYUEiLCJhbHBoYUIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwidHlwZSIsInJlc2V0Iiwic2FtZSIsInVuZGVmaW5lZCIsInBhcnRpY2xlIiwidXNlQWxwaGEiLCJ0cmFuc2Zvcm0iLCJnZXRWYWx1ZSIsInRpbWUiLCJpbmRleCIsImVuZXJnaXplIiwiYWxwaGEiLCJNYXRoVXRpbHMiLCJsZXJwIiwiZW5lcmd5IiwiUEFSVElDTEVfQUxQSEFfVEhSRVNIT0xEIiwiX3NhbWUiLCJqc29uIiwiQmVoYXZpb3VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLEs7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsbUJBQXVFO0FBQUE7O0FBQUEsUUFBM0RDLE1BQTJELHVFQUFsRCxDQUFrRDtBQUFBLFFBQS9DQyxNQUErQyx1RUFBdEMsSUFBc0M7QUFBQSxRQUFoQ0MsSUFBZ0M7QUFBQSxRQUExQkMsTUFBMEI7QUFBQSxRQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTtBQUFBO0FBQ3JFLDhCQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JFLDJCQUFwQixFQUEwQkQsU0FBMUI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLSixNQUFMLEdBQWNBLE1BQWQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxNQUFMLEdBQWNBLE1BQWQ7O0FBRUEsVUFBS0ssS0FBTCxDQUFXTixNQUFYLEVBQW1CQyxNQUFuQjs7QUFmcUU7QUFnQnRFO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBa0JFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs0QkFDaUQ7QUFBQSxVQUF6Q0QsTUFBeUMsdUVBQWhDLENBQWdDO0FBQUEsVUFBN0JDLE1BQTZCLHVFQUFwQixJQUFvQjtBQUFBLFVBQWRDLElBQWM7QUFBQSxVQUFSQyxNQUFRO0FBQzdDLFdBQUtJLElBQUwsR0FBWU4sTUFBTSxLQUFLLElBQVgsSUFBbUJBLE1BQU0sS0FBS08sU0FBOUIsR0FBMEMsSUFBMUMsR0FBaUQsS0FBN0Q7QUFDQSxXQUFLUixNQUFMLEdBQWMsc0JBQVdBLE1BQVgsQ0FBZDtBQUNBLFdBQUtDLE1BQUwsR0FBYyxzQkFBV0EsTUFBWCxDQUFkO0FBRUFDLE1BQUFBLElBQUksdUdBQWdCQSxJQUFoQixFQUFzQkMsTUFBdEIsQ0FBSjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OytCQUNhTSxRLEVBQVU7QUFDbkJBLE1BQUFBLFFBQVEsQ0FBQ0MsUUFBVCxHQUFvQixJQUFwQjtBQUNBRCxNQUFBQSxRQUFRLENBQUNFLFNBQVQsQ0FBbUJYLE1BQW5CLEdBQTRCLEtBQUtBLE1BQUwsQ0FBWVksUUFBWixFQUE1QjtBQUVBSCxNQUFBQSxRQUFRLENBQUNFLFNBQVQsQ0FBbUJWLE1BQW5CLEdBQTRCLEtBQUtNLElBQUwsR0FDeEJFLFFBQVEsQ0FBQ0UsU0FBVCxDQUFtQlgsTUFESyxHQUV4QixLQUFLQyxNQUFMLENBQVlXLFFBQVosRUFGSjtBQUdEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU0gsUSxFQUFVSSxJLEVBQU1DLEssRUFBTztBQUM1QixXQUFLQyxRQUFMLENBQWNOLFFBQWQsRUFBd0JJLElBQXhCLEVBQThCQyxLQUE5QjtBQUVBTCxNQUFBQSxRQUFRLENBQUNPLEtBQVQsR0FBaUJDLGdCQUFVQyxJQUFWLENBQ2ZULFFBQVEsQ0FBQ0UsU0FBVCxDQUFtQlgsTUFESixFQUVmUyxRQUFRLENBQUNFLFNBQVQsQ0FBbUJWLE1BRkosRUFHZixLQUFLa0IsTUFIVSxDQUFqQjs7QUFNQSxVQUFJVixRQUFRLENBQUNPLEtBQVQsR0FBaUJJLG1DQUFyQixFQUErQztBQUM3Q1gsUUFBQUEsUUFBUSxDQUFDTyxLQUFULEdBQWlCLENBQWpCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O3dCQWhGYTtBQUNULGFBQU8sS0FBS0ssS0FBWjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztzQkFDV2QsSSxFQUFNO0FBQ2I7QUFDSjtBQUNBO0FBQ0ksV0FBS2MsS0FBTCxHQUFhZCxJQUFiO0FBQ0Q7Ozs2QkFrRWVlLEksRUFBTTtBQUFBLFVBQ1p0QixNQURZLEdBQ3VDc0IsSUFEdkMsQ0FDWnRCLE1BRFk7QUFBQSxVQUNKQyxNQURJLEdBQ3VDcUIsSUFEdkMsQ0FDSnJCLE1BREk7QUFBQSxVQUNJQyxJQURKLEdBQ3VDb0IsSUFEdkMsQ0FDSXBCLElBREo7QUFBQSxVQUNVQyxNQURWLEdBQ3VDbUIsSUFEdkMsQ0FDVW5CLE1BRFY7QUFBQSw0QkFDdUNtQixJQUR2QyxDQUNrQmxCLFNBRGxCO0FBQUEsVUFDa0JBLFNBRGxCLGdDQUM4QixJQUQ5QjtBQUdwQixhQUFPLElBQUlMLEtBQUosQ0FBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLElBQTFCLEVBQWdDLDJCQUFnQkMsTUFBaEIsQ0FBaEMsRUFBeURDLFNBQXpELENBQVA7QUFDRDs7O0VBdkhnQ21CLHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0aFV0aWxzLCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgUEFSVElDTEVfQUxQSEFfVEhSRVNIT0xEIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9BTFBIQSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQmVoYXZpb3VyIHRoYXQgYXBwbGllcyBhbiBhbHBoYSB0cmFuc2l0aW9uIGVmZmVjdCB0byBwYXJ0aWNsZXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHBoYSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGFuIEFscGhhIGJlaGF2aW91ciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFscGhhQSAtIFRoZSBzdGFydGluZyBhbHBoYSB2YWx1ZVxuICAgKiBAcGFyYW0gez9udW1iZXJ9IGFscGhhQiAtIFRoZSBlbmRpbmcgYWxwaGEgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoYWxwaGFBID0gMSwgYWxwaGFCID0gbnVsbCwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nLCB0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXG4gICAgICogQHR5cGUge251bWJlcnxTcGFufVxuICAgICAqL1xuICAgIHRoaXMuYWxwaGFBID0gYWxwaGFBO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGVuZGluZyBhbHBoYSB2YWx1ZVxuICAgICAqIEB0eXBlIHtudW1iZXJ8U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLmFscGhhQiA9IGFscGhhQjtcblxuICAgIHRoaXMucmVzZXQoYWxwaGFBLCBhbHBoYUIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBzYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9zYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzZXQgc2FtZShzYW1lKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fc2FtZSA9IHNhbWU7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFscGhhQSAtIHRoZSBzdGFydGluZyBhbHBoYSB2YWx1ZVxuICAgKiBAcGFyYW0gez9udW1iZXJ9IGFscGhhQiAtIHRoZSBlbmRpbmcgYWxwaGEgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVzZXQoYWxwaGFBID0gMSwgYWxwaGFCID0gbnVsbCwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYWxwaGFCID09PSBudWxsIHx8IGFscGhhQiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuYWxwaGFBID0gY3JlYXRlU3BhbihhbHBoYUEpO1xuICAgIHRoaXMuYWxwaGFCID0gY3JlYXRlU3BhbihhbHBoYUIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBiZWhhdmlvdXIgb24gYSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIGJlaGF2aW91ciBvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS51c2VBbHBoYSA9IHRydWU7XG4gICAgcGFydGljbGUudHJhbnNmb3JtLmFscGhhQSA9IHRoaXMuYWxwaGFBLmdldFZhbHVlKCk7XG5cbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFCID0gdGhpcy5zYW1lXG4gICAgICA/IHBhcnRpY2xlLnRyYW5zZm9ybS5hbHBoYUFcbiAgICAgIDogdGhpcy5hbHBoYUIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXRhdGVzIHRoZSB0YXJnZXQncyBhbHBoYS9vcGFjaXR5IHByb3BlcnR5LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIGVuZ2luZSB0aW1lXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5lbmVyZ2l6ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUuYWxwaGEgPSBNYXRoVXRpbHMubGVycChcbiAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5hbHBoYUEsXG4gICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFCLFxuICAgICAgdGhpcy5lbmVyZ3lcbiAgICApO1xuXG4gICAgaWYgKHBhcnRpY2xlLmFscGhhIDwgUEFSVElDTEVfQUxQSEFfVEhSRVNIT0xEKSB7XG4gICAgICBwYXJ0aWNsZS5hbHBoYSA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBCb2R5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmFscGhhQSAtIFRoZSBzdGFydGluZyBhbHBoYSB2YWx1ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5hbHBoYUIgLSBUaGUgZW5kaW5nIGFscGhhIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBqc29uLmVhc2luZyAtIFRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEByZXR1cm4ge0JvZHl9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgYWxwaGFBLCBhbHBoYUIsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgQWxwaGEoYWxwaGFBLCBhbHBoYUIsIGxpZmUsIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=