"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _types = require("./types");

/**
 * The base Emitter / Particle property class.
 *
 * @abstract
 */
var Initializer = /*#__PURE__*/function () {
  /**
   * Constructs an Initializer instance.
   *
   * @param {string} [type=INITIALIZER_TYPE_ABSTRACT] - The intiializer type
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
    * @return void
   */
  function Initializer() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.INITIALIZER_TYPE_ABSTRACT;
    var isEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (0, _classCallCheck2["default"])(this, Initializer);
    this.type = type;
    this.isEnabled = isEnabled;
  }
  /**
   * Initializes the property on the emitter or particle.
   *
   * @see {@link '../emitter/emitter.js'} setupParticle
   * @param {Emitter} emitter - the emitter to initialize the property on
   * @param {Particle} particle - the particle to intiialize the property on
   * @return void
   */


  (0, _createClass2["default"])(Initializer, [{
    key: "init",
    value: function init(emitter, particle) {
      if (!this.isEnabled) {
        return;
      }

      if (particle) {
        this.initialize(particle);
        particle.hasBeenInitialized = true;
      } else {
        this.initialize(emitter);
        emitter.hasBeenInitialized = true;
      }
    }
    /**
     * @abstract
     */

  }, {
    key: "reset",
    value: function reset() {}
    /**
     * Place custom property initialization code in this method in the subclass.
     *
     * @param {object} target - either an Emitter or a Particle
     * @abstract
     */

  }, {
    key: "initialize",
    value: function initialize(target) {} // eslint-disable-line

    /**
     * Determines if the initializer requires a Web GL API to be provided to its constructor.
     * If true, the WebGL API will need to be provided as the first argument to the constructor
     * and fromJSON methods.
     *
     * @return {boolean}
     */

  }], [{
    key: "requiresWebGlApi",
    value: function requiresWebGlApi() {
      return false;
    }
    /**
     * Returns a new instance of the initializer from the JSON object passed.
     *
     * @abstract
     * @param {object} json - JSON object containing the required constructor properties
     * @return {Behaviour}
     */

  }, {
    key: "fromJSON",
    value: function fromJSON(json) {} // eslint-disable-line

  }]);
  return Initializer;
}();

exports["default"] = Initializer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Jbml0aWFsaXplci5qcyJdLCJuYW1lcyI6WyJJbml0aWFsaXplciIsInR5cGUiLCJJTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNUIiwiaXNFbmFibGVkIiwiZW1pdHRlciIsInBhcnRpY2xlIiwiaW5pdGlhbGl6ZSIsImhhc0JlZW5Jbml0aWFsaXplZCIsInRhcmdldCIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxXO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUUseUJBQWdFO0FBQUEsUUFBcERDLElBQW9ELHVFQUE3Q0MsZ0NBQTZDO0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUM5RCxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7eUJBQ09DLE8sRUFBU0MsUSxFQUFVO0FBQ3RCLFVBQUksQ0FBQyxLQUFLRixTQUFWLEVBQXFCO0FBQ25CO0FBQ0Q7O0FBRUQsVUFBSUUsUUFBSixFQUFjO0FBQ1osYUFBS0MsVUFBTCxDQUFnQkQsUUFBaEI7QUFDQUEsUUFBQUEsUUFBUSxDQUFDRSxrQkFBVCxHQUE4QixJQUE5QjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUtELFVBQUwsQ0FBZ0JGLE9BQWhCO0FBQ0FBLFFBQUFBLE9BQU8sQ0FBQ0csa0JBQVIsR0FBNkIsSUFBN0I7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBOzs7OzRCQUNVLENBQUU7QUFFVjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7K0JBQ2FDLE0sRUFBUSxDQUFFLEMsQ0FBQzs7QUFFdEI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7dUNBQzRCO0FBQ3hCLGFBQU8sS0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NkJBQ2tCQyxJLEVBQU0sQ0FBRSxDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNUIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgRW1pdHRlciAvIFBhcnRpY2xlIHByb3BlcnR5IGNsYXNzLlxuICpcbiAqIEBhYnN0cmFjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGFuIEluaXRpYWxpemVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGU9SU5JVElBTElaRVJfVFlQRV9BQlNUUkFDVF0gLSBUaGUgaW50aWlhbGl6ZXIgdHlwZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBpbml0aWFsaXplciBzaG91bGQgYmUgZW5hYmxlZCBvciBub3RcblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBJTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNULCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcHJvcGVydHkgb24gdGhlIGVtaXR0ZXIgb3IgcGFydGljbGUuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rICcuLi9lbWl0dGVyL2VtaXR0ZXIuanMnfSBzZXR1cFBhcnRpY2xlXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlciAtIHRoZSBlbWl0dGVyIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGludGlpYWxpemUgdGhlIHByb3BlcnR5IG9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJ0aWNsZSk7XG4gICAgICBwYXJ0aWNsZS5oYXNCZWVuSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoZW1pdHRlcik7XG4gICAgICBlbWl0dGVyLmhhc0JlZW5Jbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgcmVzZXQoKSB7fVxuXG4gIC8qKlxuICAgKiBQbGFjZSBjdXN0b20gcHJvcGVydHkgaW5pdGlhbGl6YXRpb24gY29kZSBpbiB0aGlzIG1ldGhvZCBpbiB0aGUgc3ViY2xhc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgLSBlaXRoZXIgYW4gRW1pdHRlciBvciBhIFBhcnRpY2xlXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5pdGlhbGl6ZXIgcmVxdWlyZXMgYSBXZWIgR0wgQVBJIHRvIGJlIHByb3ZpZGVkIHRvIGl0cyBjb25zdHJ1Y3Rvci5cbiAgICogSWYgdHJ1ZSwgdGhlIFdlYkdMIEFQSSB3aWxsIG5lZWQgdG8gYmUgcHJvdmlkZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgKiBhbmQgZnJvbUpTT04gbWV0aG9kcy5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyByZXF1aXJlc1dlYkdsQXBpKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBpbml0aWFsaXplciBmcm9tIHRoZSBKU09OIG9iamVjdCBwYXNzZWQuXG4gICAqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIEpTT04gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlcXVpcmVkIGNvbnN0cnVjdG9yIHByb3BlcnRpZXNcbiAgICogQHJldHVybiB7QmVoYXZpb3VyfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbn1cbiJdfQ==