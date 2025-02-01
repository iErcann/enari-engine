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

var _constants = require("./constants");

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _math = require("../math");

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that causes particles to be attracted to a target position.
 *
 */
var Attraction = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Attraction, _Behaviour);

  var _super = _createSuper(Attraction);

  /**
   * Constructs an Attraction behaviour instance.
   *
   * @param {Vector3D} targetPosition - The position the particles will be attracted to
   * @param {number} force - The attraction force scalar multiplier
   * @param {number} radius - The attraction radius
   * @param {number} [life=DEFAULT_LIFE] - The life of the particle
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Attraction() {
    var _this;

    var targetPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _math.Vector3D();
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_ATTRACTION_FORCE_SCALAR;
    var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_ATTRACITON_RADIUS;
    var life = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.DEFAULT_LIFE;
    var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _constants.DEFAULT_BEHAVIOUR_EASING;
    var isEnabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    (0, _classCallCheck2["default"])(this, Attraction);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_ATTRACTION, isEnabled);
    /**
     * @desc The position the particles will be attracted to
     * @type {Vector3D}
     */

    _this.targetPosition = targetPosition;
    /**
     * @desc The attraction radius
     * @type {number} - the attraction radius
     */

    _this.radius = radius;
    /**
     * @desc The attraction force scalar multiplier
     * @type {number}
     */

    _this.force = _this.normalizeValue(force);
    /**
     * @desc The radius of the attraction squared
     * @type {number}
     */

    _this.radiusSq = _this.radius * _this.radius;
    /**
     * @desc The attraction force in 3D space
     * @type {Vector3D}
     */

    _this.attractionForce = new _math.Vector3D();
    /**
     * @desc The linear attraction force
     * @type {number}
     */

    _this.lengthSq = 0;
    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Vector3D} targetPosition - the position the particles will be attracted to
   * @param {number} force - the attraction force multiplier
   * @param {number} radius - the attraction radius
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */


  (0, _createClass2["default"])(Attraction, [{
    key: "reset",
    value: function reset() {
      var targetPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _math.Vector3D();
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_ATTRACTION_FORCE_SCALAR;
      var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_ATTRACITON_RADIUS;
      var life = arguments.length > 3 ? arguments[3] : undefined;
      var easing = arguments.length > 4 ? arguments[4] : undefined;
      this.targetPosition = targetPosition;
      this.radius = radius;
      this.force = this.normalizeValue(force);
      this.radiusSq = this.radius * this.radius;
      this.attractionForce = new _math.Vector3D();
      this.lengthSq = 0;
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(Attraction.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Mutates particle acceleration.
     *
     * @param {Particle} particle - the particle to apply the behaviour to
     * @param {number} time - particle engine time
     * @param {integer} index - the particle index
     * @return void
     */

  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      this.energize(particle, time, index);
      this.attractionForce.copy(this.targetPosition);
      this.attractionForce.sub(particle.position);
      this.lengthSq = this.attractionForce.lengthSq();

      if (this.lengthSq > _constants.PARTICLE_LENGTH_SQ_THRESHOLD && this.lengthSq < this.radiusSq) {
        this.attractionForce.normalize();
        this.attractionForce.scalar(1 - this.lengthSq / this.radiusSq);
        this.attractionForce.scalar(this.force);
        particle.acceleration.add(this.attractionForce);
      }
    }
    /**
     * Creates a Body initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.x - The target position x value
     * @property {number} json.y - The target position y value
     * @property {number} json.z - The target position z value
     * @property {number} json.force - The attraction force scalar multiplier
     * @property {number} json.life - The life of the particle
     * @property {string} json.easing - The behaviour's decaying trend
     * @return {Body}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var x = json.x,
          y = json.y,
          z = json.z,
          force = json.force,
          radius = json.radius,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Attraction(new _math.Vector3D(x, y, z), force, radius, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Attraction;
}(_Behaviour2["default"]);

exports["default"] = Attraction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQXR0cmFjdGlvbi5qcyJdLCJuYW1lcyI6WyJBdHRyYWN0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJWZWN0b3IzRCIsImZvcmNlIiwiREVGQVVMVF9BVFRSQUNUSU9OX0ZPUkNFX1NDQUxBUiIsInJhZGl1cyIsIkRFRkFVTFRfQVRUUkFDSVRPTl9SQURJVVMiLCJsaWZlIiwiREVGQVVMVF9MSUZFIiwiZWFzaW5nIiwiREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HIiwiaXNFbmFibGVkIiwidHlwZSIsIm5vcm1hbGl6ZVZhbHVlIiwicmFkaXVzU3EiLCJhdHRyYWN0aW9uRm9yY2UiLCJsZW5ndGhTcSIsInBhcnRpY2xlIiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJjb3B5Iiwic3ViIiwicG9zaXRpb24iLCJQQVJUSUNMRV9MRU5HVEhfU1FfVEhSRVNIT0xEIiwibm9ybWFsaXplIiwic2NhbGFyIiwiYWNjZWxlcmF0aW9uIiwiYWRkIiwianNvbiIsIngiLCJ5IiwieiIsIkJlaGF2aW91ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBUUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxVOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Usd0JBT0U7QUFBQTs7QUFBQSxRQU5BQyxjQU1BLHVFQU5pQixJQUFJQyxjQUFKLEVBTWpCO0FBQUEsUUFMQUMsS0FLQSx1RUFMUUMsMENBS1I7QUFBQSxRQUpBQyxNQUlBLHVFQUpTQyxvQ0FJVDtBQUFBLFFBSEFDLElBR0EsdUVBSE9DLHVCQUdQO0FBQUEsUUFGQUMsTUFFQSx1RUFGU0MsbUNBRVQ7QUFBQSxRQURBQyxTQUNBLHVFQURZLElBQ1o7QUFBQTtBQUNBLDhCQUFNSixJQUFOLEVBQVlFLE1BQVosRUFBb0JHLGdDQUFwQixFQUEw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QzBCbEIsU0FEMUI7QUFBQSxVQUMwQkEsU0FEMUIsZ0NBQ3NDLElBRHRDO0FBR3BCLGFBQU8sSUFBSVgsVUFBSixDQUNMLElBQUlFLGNBQUosQ0FBYTRCLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixDQURLLEVBRUw3QixLQUZLLEVBR0xFLE1BSEssRUFJTEUsSUFKSyxFQUtMLDJCQUFnQkUsTUFBaEIsQ0FMSyxFQU1MRSxTQU5LLENBQVA7QUFRRDs7O0VBeklxQ3NCLHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgREVGQVVMVF9BVFRSQUNJVE9OX1JBRElVUyxcbiAgREVGQVVMVF9BVFRSQUNUSU9OX0ZPUkNFX1NDQUxBUixcbiAgREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HLFxuICBERUZBVUxUX0xJRkUsXG4gIFBBUlRJQ0xFX0xFTkdUSF9TUV9USFJFU0hPTEQsXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tICcuL0JlaGF2aW91cic7XG5pbXBvcnQgeyBWZWN0b3IzRCB9IGZyb20gJy4uL21hdGgnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9BVFRSQUNUSU9OIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBjYXVzZXMgcGFydGljbGVzIHRvIGJlIGF0dHJhY3RlZCB0byBhIHRhcmdldCBwb3NpdGlvbi5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJhY3Rpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhbiBBdHRyYWN0aW9uIGJlaGF2aW91ciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IzRH0gdGFyZ2V0UG9zaXRpb24gLSBUaGUgcG9zaXRpb24gdGhlIHBhcnRpY2xlcyB3aWxsIGJlIGF0dHJhY3RlZCB0b1xuICAgKiBAcGFyYW0ge251bWJlcn0gZm9yY2UgLSBUaGUgYXR0cmFjdGlvbiBmb3JjZSBzY2FsYXIgbXVsdGlwbGllclxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzIC0gVGhlIGF0dHJhY3Rpb24gcmFkaXVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1ERUZBVUxUX0xJRkVdIC0gVGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9REVGQVVMVF9CRUhBVklPVVJfRUFTSU5HXSAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRhcmdldFBvc2l0aW9uID0gbmV3IFZlY3RvcjNEKCksXG4gICAgZm9yY2UgPSBERUZBVUxUX0FUVFJBQ1RJT05fRk9SQ0VfU0NBTEFSLFxuICAgIHJhZGl1cyA9IERFRkFVTFRfQVRUUkFDSVRPTl9SQURJVVMsXG4gICAgbGlmZSA9IERFRkFVTFRfTElGRSxcbiAgICBlYXNpbmcgPSBERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkcsXG4gICAgaXNFbmFibGVkID0gdHJ1ZVxuICApIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcG9zaXRpb24gdGhlIHBhcnRpY2xlcyB3aWxsIGJlIGF0dHJhY3RlZCB0b1xuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgYXR0cmFjdGlvbiByYWRpdXNcbiAgICAgKiBAdHlwZSB7bnVtYmVyfSAtIHRoZSBhdHRyYWN0aW9uIHJhZGl1c1xuICAgICAqL1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGF0dHJhY3Rpb24gZm9yY2Ugc2NhbGFyIG11bHRpcGxpZXJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZm9yY2UgPSB0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSByYWRpdXMgb2YgdGhlIGF0dHJhY3Rpb24gc3F1YXJlZFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgYXR0cmFjdGlvbiBmb3JjZSBpbiAzRCBzcGFjZVxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IzRCgpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGxpbmVhciBhdHRyYWN0aW9uIGZvcmNlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB0YXJnZXRQb3NpdGlvbiAtIHRoZSBwb3NpdGlvbiB0aGUgcGFydGljbGVzIHdpbGwgYmUgYXR0cmFjdGVkIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmb3JjZSAtIHRoZSBhdHRyYWN0aW9uIGZvcmNlIG11bHRpcGxpZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1cyAtIHRoZSBhdHRyYWN0aW9uIHJhZGl1c1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIHRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNldChcbiAgICB0YXJnZXRQb3NpdGlvbiA9IG5ldyBWZWN0b3IzRCgpLFxuICAgIGZvcmNlID0gREVGQVVMVF9BVFRSQUNUSU9OX0ZPUkNFX1NDQUxBUixcbiAgICByYWRpdXMgPSBERUZBVUxUX0FUVFJBQ0lUT05fUkFESVVTLFxuICAgIGxpZmUsXG4gICAgZWFzaW5nXG4gICkge1xuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSB0YXJnZXRQb3NpdGlvbjtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSk7XG4gICAgdGhpcy5yYWRpdXNTcSA9IHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UgPSBuZXcgVmVjdG9yM0QoKTtcbiAgICB0aGlzLmxlbmd0aFNxID0gMDtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXRhdGVzIHBhcnRpY2xlIGFjY2VsZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIHBhcnRpY2xlIGVuZ2luZSB0aW1lXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5lbmVyZ2l6ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucG9zaXRpb24pO1xuXG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmxlbmd0aFNxID4gUEFSVElDTEVfTEVOR1RIX1NRX1RIUkVTSE9MRCAmJlxuICAgICAgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3FcbiAgICApIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2Uuc2NhbGFyKDEgLSB0aGlzLmxlbmd0aFNxIC8gdGhpcy5yYWRpdXNTcSk7XG4gICAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zY2FsYXIodGhpcy5mb3JjZSk7XG5cbiAgICAgIHBhcnRpY2xlLmFjY2VsZXJhdGlvbi5hZGQodGhpcy5hdHRyYWN0aW9uRm9yY2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQm9keSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi54IC0gVGhlIHRhcmdldCBwb3NpdGlvbiB4IHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnkgLSBUaGUgdGFyZ2V0IHBvc2l0aW9uIHkgdmFsdWVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ueiAtIFRoZSB0YXJnZXQgcG9zaXRpb24geiB2YWx1ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5mb3JjZSAtIFRoZSBhdHRyYWN0aW9uIGZvcmNlIHNjYWxhciBtdWx0aXBsaWVyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGpzb24uZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEByZXR1cm4ge0JvZHl9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgeCwgeSwgeiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBBdHRyYWN0aW9uKFxuICAgICAgbmV3IFZlY3RvcjNEKHgsIHksIHopLFxuICAgICAgZm9yY2UsXG4gICAgICByYWRpdXMsXG4gICAgICBsaWZlLFxuICAgICAgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksXG4gICAgICBpc0VuYWJsZWRcbiAgICApO1xuICB9XG59XG4iXX0=