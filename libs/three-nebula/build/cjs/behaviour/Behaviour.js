"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _constants = require("./constants");

var _types = require("./types");

var _constants2 = require("../constants");

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _utils = require("../utils");

/**
 * The base behaviour class.
 * Behaviours manage a particle's behaviour after they have been emitted.
 *
 */
var Behaviour = /*#__PURE__*/function () {
  /**
   * Constructs a Behaviour instance.
   *
   * @param {number} [life=Infinity] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   * @param {string} [type=BEHAVIOUR_TYPE_ABSTRACT] - The behaviour type
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Behaviour() {
    var life = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
    var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_BEHAVIOUR_EASING;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types.BEHAVIOUR_TYPE_ABSTRACT;
    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Behaviour);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    /**
     * @desc Determines if the behaviour will be applied or not
     * @type {boolean}
     */

    this.isEnabled = isEnabled;
    /**
     * @desc The behaviour's id
     * @type {string} id
     */

    this.id = "behaviour-".concat((0, _utils.uid)());
    /**
     * @desc The life of the behaviour
     * @type {number}
     */

    this.life = life;
    /**
     * @desc The behaviour's decaying trend
     * @type {function}
     */

    this.easing = easing;
    /**
     * @desc The age of the behaviour
     * @type {number}
     */

    this.age = 0;
    /**
     * @desc The energy of the behaviour
     * @type {number}
     */

    this.energy = 1;
    /**
     * Determines if the behaviour is dead or not
     * @type {boolean}
     */

    this.dead = false;
  }
  /**
   * Reset this behaviour's parameters
   *
   * @param {number} [life=DEFAULT_LIFE] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   */


  (0, _createClass2["default"])(Behaviour, [{
    key: "reset",
    value: function reset() {
      var life = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_LIFE;
      var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_BEHAVIOUR_EASING;
      this.life = life;
      this.easing = easing || _constants.DEFAULT_BEHAVIOUR_EASING;
    }
    /**
     * Ensures that life is infinity if an invalid value is supplied.
     *
     * @return void
     */

  }, {
    key: "normalizeForce",

    /**
     * Normalize a force by 1:100;
     *
     * @param {Vector3D} force - The force to normalize.
     * @return {Vector3D}
     */
    value: function normalizeForce(force) {
      return force.scalar(_constants2.MEASURE);
    }
    /**
     * Normalize a value by 1:100;
     *
     * @param {number} value - The value to normalize
     * @return {number}
     */

  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      return value * _constants2.MEASURE;
    }
    /**
     * Set the behaviour's initial properties on the particle.
     *
     * @param {Particle} particle
     * @abstract
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {} // eslint-disable-line

    /**
     * Apply behaviour to the target as a factor of time.
     * Internally calls the mutate method to change properties on the target
     * Will not do so if the behaviour is disabled
     *
     * @abstract
     * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
     * @param {Number} time - the system integration time
     * @param {integer} index - the target index
     * @return mixed
     */

  }, {
    key: "applyBehaviour",
    value: function applyBehaviour(target, time, index) {
      if (!this.isEnabled) {
        return;
      }

      this.mutate(target, time, index);
    }
    /**
     * Change the target's properties according to specific behaviour logic.
     *
     * @abstract
     * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
     * @param {Number} time - the system integration time
     * @return mixed
     */

  }, {
    key: "mutate",
    value: function mutate(target, time, index) {} // eslint-disable-line

    /**
     * Compares the age of the behaviour vs integration time and determines
     * if the behaviour should be set to dead or not.
     * Sets the behaviour energy as a factor of particle age and life.
     *
     * @param {Particle} particle - The particle to apply the behaviour to
     * @param {Number} time - the system integration time
     * @return void
     */

  }, {
    key: "energize",
    value: function energize(particle, time) {
      if (this.dead) {
        return;
      }

      this.age += time;

      if (this.age >= this.life) {
        this.energy = 0;
        this.dead = true;
        return;
      }

      var scale = this.easing(particle.age / particle.life);
      this.energy = Math.max(1 - scale, 0);
    }
    /**
     * Destory this behaviour.
     *
     * @abstract
     */

  }, {
    key: "destroy",
    value: function destroy() {}
    /**
     * Returns a new instance of the behaviour from the JSON object passed.
     *
     * @abstract
     * @param {object} json - JSON object containing the required constructor properties
     * @return {Behaviour}
     */

  }, {
    key: "fromJSON",
    value: function fromJSON(json) {} // eslint-disable-line

  }, {
    key: "life",
    set: function set(life) {
      this._life = (0, _isNumber["default"])(life) ? life : _constants.DEFAULT_LIFE;
    }
    /**
     * Gets the behaviour's life.
     *
     * @return {Number}
     */
    ,
    get: function get() {
      return this._life;
    }
  }]);
  return Behaviour;
}();

exports["default"] = Behaviour;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQmVoYXZpb3VyLmpzIl0sIm5hbWVzIjpbIkJlaGF2aW91ciIsImxpZmUiLCJJbmZpbml0eSIsImVhc2luZyIsIkRFRkFVTFRfQkVIQVZJT1VSX0VBU0lORyIsInR5cGUiLCJCRUhBVklPVVJfVFlQRV9BQlNUUkFDVCIsImlzRW5hYmxlZCIsImlkIiwiYWdlIiwiZW5lcmd5IiwiZGVhZCIsIkRFRkFVTFRfTElGRSIsImZvcmNlIiwic2NhbGFyIiwiTUVBU1VSRSIsInZhbHVlIiwicGFydGljbGUiLCJ0YXJnZXQiLCJ0aW1lIiwiaW5kZXgiLCJtdXRhdGUiLCJzY2FsZSIsIk1hdGgiLCJtYXgiLCJqc29uIiwiX2xpZmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxTO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHVCQUtFO0FBQUEsUUFKQUMsSUFJQSx1RUFKT0MsUUFJUDtBQUFBLFFBSEFDLE1BR0EsdUVBSFNDLG1DQUdUO0FBQUEsUUFGQUMsSUFFQSx1RUFGT0MsOEJBRVA7QUFBQSxRQURBQyxTQUNBLHVFQURZLElBQ1o7QUFBQTs7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNJLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtFLFNBQUwsR0FBaUJBLFNBQWpCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsRUFBTCx1QkFBdUIsaUJBQXZCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS1AsSUFBTCxHQUFZQSxJQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0UsTUFBTCxHQUFjQSxNQUFkO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS00sR0FBTCxHQUFXLENBQVg7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzRCQUNnRTtBQUFBLFVBQXhEVixJQUF3RCx1RUFBakRXLHVCQUFpRDtBQUFBLFVBQW5DVCxNQUFtQyx1RUFBMUJDLG1DQUEwQjtBQUM1RCxXQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFDQSxXQUFLRSxNQUFMLEdBQWNBLE1BQU0sSUFBSUMsbUNBQXhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OztBQWNFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTttQ0FDaUJTLEssRUFBTztBQUNwQixhQUFPQSxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsbUJBQWIsQ0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O21DQUNpQkMsSyxFQUFPO0FBQ3BCLGFBQU9BLEtBQUssR0FBR0QsbUJBQWY7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsrQkFDYUUsUSxFQUFVLENBQUUsQyxDQUFDOztBQUV4QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O21DQUNpQkMsTSxFQUFRQyxJLEVBQU1DLEssRUFBTztBQUNsQyxVQUFJLENBQUMsS0FBS2IsU0FBVixFQUFxQjtBQUNuQjtBQUNEOztBQUVELFdBQUtjLE1BQUwsQ0FBWUgsTUFBWixFQUFvQkMsSUFBcEIsRUFBMEJDLEtBQTFCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzJCQUNTRixNLEVBQVFDLEksRUFBTUMsSyxFQUFPLENBQUUsQyxDQUFDOztBQUUvQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NkJBQ1dILFEsRUFBVUUsSSxFQUFNO0FBQ3ZCLFVBQUksS0FBS1IsSUFBVCxFQUFlO0FBQ2I7QUFDRDs7QUFFRCxXQUFLRixHQUFMLElBQVlVLElBQVo7O0FBRUEsVUFBSSxLQUFLVixHQUFMLElBQVksS0FBS1IsSUFBckIsRUFBMkI7QUFDekIsYUFBS1MsTUFBTCxHQUFjLENBQWQ7QUFDQSxhQUFLQyxJQUFMLEdBQVksSUFBWjtBQUVBO0FBQ0Q7O0FBRUQsVUFBTVcsS0FBSyxHQUFHLEtBQUtuQixNQUFMLENBQVljLFFBQVEsQ0FBQ1IsR0FBVCxHQUFlUSxRQUFRLENBQUNoQixJQUFwQyxDQUFkO0FBRUEsV0FBS1MsTUFBTCxHQUFjYSxJQUFJLENBQUNDLEdBQUwsQ0FBUyxJQUFJRixLQUFiLEVBQW9CLENBQXBCLENBQWQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7OEJBQ1ksQ0FBRTtBQUVaO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNXRyxJLEVBQU0sQ0FBRSxDLENBQUM7Ozs7c0JBaEhUeEIsSSxFQUFNO0FBQ2IsV0FBS3lCLEtBQUwsR0FBYSwwQkFBU3pCLElBQVQsSUFBaUJBLElBQWpCLEdBQXdCVyx1QkFBckM7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O3dCQUNhO0FBQ1QsYUFBTyxLQUFLYyxLQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkcsIERFRkFVTFRfTElGRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfQUJTVFJBQ1QgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IE1FQVNVUkUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IGlzTnVtYmVyIGZyb20gJ2xvZGFzaC9pc051bWJlcic7XG5pbXBvcnQgeyB1aWQgfSBmcm9tICcuLi91dGlscyc7XG5cbi8qKlxuICogVGhlIGJhc2UgYmVoYXZpb3VyIGNsYXNzLlxuICogQmVoYXZpb3VycyBtYW5hZ2UgYSBwYXJ0aWNsZSdzIGJlaGF2aW91ciBhZnRlciB0aGV5IGhhdmUgYmVlbiBlbWl0dGVkLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBCZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9REVGQVVMVF9CRUhBVklPVVJfRUFTSU5HXSAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGU9QkVIQVZJT1VSX1RZUEVfQUJTVFJBQ1RdIC0gVGhlIGJlaGF2aW91ciB0eXBlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbGlmZSA9IEluZmluaXR5LFxuICAgIGVhc2luZyA9IERFRkFVTFRfQkVIQVZJT1VSX0VBU0lORyxcbiAgICB0eXBlID0gQkVIQVZJT1VSX1RZUEVfQUJTVFJBQ1QsXG4gICAgaXNFbmFibGVkID0gdHJ1ZVxuICApIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaXNFbmFibGVkID0gaXNFbmFibGVkO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGJlaGF2aW91cidzIGlkXG4gICAgICogQHR5cGUge3N0cmluZ30gaWRcbiAgICAgKi9cbiAgICB0aGlzLmlkID0gYGJlaGF2aW91ci0ke3VpZCgpfWA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxpZmUgPSBsaWZlO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGFnZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFnZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgZW5lcmd5IG9mIHRoZSBiZWhhdmlvdXJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZW5lcmd5ID0gMTtcblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciBpcyBkZWFkIG9yIG5vdFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9REVGQVVMVF9MSUZFXSAtIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vhc2luZz1ERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkddIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqL1xuICByZXNldChsaWZlID0gREVGQVVMVF9MSUZFLCBlYXNpbmcgPSBERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkcpIHtcbiAgICB0aGlzLmxpZmUgPSBsaWZlO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IERFRkFVTFRfQkVIQVZJT1VSX0VBU0lORztcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoYXQgbGlmZSBpcyBpbmZpbml0eSBpZiBhbiBpbnZhbGlkIHZhbHVlIGlzIHN1cHBsaWVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHNldCBsaWZlKGxpZmUpIHtcbiAgICB0aGlzLl9saWZlID0gaXNOdW1iZXIobGlmZSkgPyBsaWZlIDogREVGQVVMVF9MSUZFO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGJlaGF2aW91cidzIGxpZmUuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIGdldCBsaWZlKCkge1xuICAgIHJldHVybiB0aGlzLl9saWZlO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIGZvcmNlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSBmb3JjZSAtIFRoZSBmb3JjZSB0byBub3JtYWxpemUuXG4gICAqIEByZXR1cm4ge1ZlY3RvcjNEfVxuICAgKi9cbiAgbm9ybWFsaXplRm9yY2UoZm9yY2UpIHtcbiAgICByZXR1cm4gZm9yY2Uuc2NhbGFyKE1FQVNVUkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZhbHVlIGJ5IDE6MTAwO1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICogTUVBU1VSRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGJlaGF2aW91cidzIGluaXRpYWwgcHJvcGVydGllcyBvbiB0aGUgcGFydGljbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIC8qKlxuICAgKiBBcHBseSBiZWhhdmlvdXIgdG8gdGhlIHRhcmdldCBhcyBhIGZhY3RvciBvZiB0aW1lLlxuICAgKiBJbnRlcm5hbGx5IGNhbGxzIHRoZSBtdXRhdGUgbWV0aG9kIHRvIGNoYW5nZSBwcm9wZXJ0aWVzIG9uIHRoZSB0YXJnZXRcbiAgICogV2lsbCBub3QgZG8gc28gaWYgdGhlIGJlaGF2aW91ciBpcyBkaXNhYmxlZFxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtQYXJ0aWNsZXxFbWl0dGVyfSB0YXJnZXQgLSBUaGUgcGFydGljbGUgb3IgZW1pdHRlciB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIC0gdGhlIHN5c3RlbSBpbnRlZ3JhdGlvbiB0aW1lXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgdGFyZ2V0IGluZGV4XG4gICAqIEByZXR1cm4gbWl4ZWRcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHRhcmdldCwgdGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tdXRhdGUodGFyZ2V0LCB0aW1lLCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSB0YXJnZXQncyBwcm9wZXJ0aWVzIGFjY29yZGluZyB0byBzcGVjaWZpYyBiZWhhdmlvdXIgbG9naWMuXG4gICAqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfEVtaXR0ZXJ9IHRhcmdldCAtIFRoZSBwYXJ0aWNsZSBvciBlbWl0dGVyIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgLSB0aGUgc3lzdGVtIGludGVncmF0aW9uIHRpbWVcbiAgICogQHJldHVybiBtaXhlZFxuICAgKi9cbiAgbXV0YXRlKHRhcmdldCwgdGltZSwgaW5kZXgpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAvKipcbiAgICogQ29tcGFyZXMgdGhlIGFnZSBvZiB0aGUgYmVoYXZpb3VyIHZzIGludGVncmF0aW9uIHRpbWUgYW5kIGRldGVybWluZXNcbiAgICogaWYgdGhlIGJlaGF2aW91ciBzaG91bGQgYmUgc2V0IHRvIGRlYWQgb3Igbm90LlxuICAgKiBTZXRzIHRoZSBiZWhhdmlvdXIgZW5lcmd5IGFzIGEgZmFjdG9yIG9mIHBhcnRpY2xlIGFnZSBhbmQgbGlmZS5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSAtIHRoZSBzeXN0ZW0gaW50ZWdyYXRpb24gdGltZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGVuZXJnaXplKHBhcnRpY2xlLCB0aW1lKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWdlICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyhwYXJ0aWNsZS5hZ2UgLyBwYXJ0aWNsZS5saWZlKTtcblxuICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgYmVoYXZpb3VyLlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIGRlc3Ryb3koKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBiZWhhdmlvdXIgZnJvbSB0aGUgSlNPTiBvYmplY3QgcGFzc2VkLlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSByZXF1aXJlZCBjb25zdHJ1Y3RvciBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm4ge0JlaGF2aW91cn1cbiAgICovXG4gIGZyb21KU09OKGpzb24pIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbn1cbiJdfQ==