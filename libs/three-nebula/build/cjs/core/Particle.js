"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _constants = require("./constants");

var _utils = require("../utils");

var _constants2 = require("../constants");

var _math = require("../math");

var _types = require("./types");

/**
 * A Particle is an object that is emitted by an emitter.
 *
 */
var Particle = /*#__PURE__*/function () {
  /**
   * Constructs a Particle instance.
   *
   * @param {object} properties - The properties to instantiate the particle with
   * @property {number} properties.life - The particle's life
   * @property {number} properties.age - The particle's age
   * @property {number} properties.energy - The particle's energy loss
   * @property {boolean} properties.dead - Determines if the particle is dead or not
   * @property {boolean} properties.sleep - Determines if the particle is sleeping or not
   * @property {object} properties.target - The particle's target
   * @property {object} properties.body - The particle's body
   * @property {number} properties.mass - The particle's mass
   * @property {number} properties.radius - The particle's radius
   * @property {number} properties.alpha - The particle's alpha
   * @property {number} properties.scale - The particle's scale
   * @property {number} properties.rotation - The particle's rotation
   * @property {string|number} properties.color - The particle's color
   * @property {function} properties.easing - The particle's easing
   * @property {Vector3D} properties.position - The particle's position
   * @property {Vector3D} properties.velocity - The particle's velocity
   * @property {Vector3D} properties.acceleration - The particle's acceleration
   * @property {array} properties.behaviours - The particle's behaviours array
   * @property {object} properties.transform - The particle's transform collection
   * @return void
   */
  function Particle(properties) {
    (0, _classCallCheck2["default"])(this, Particle);

    /**
     * @desc The particle's unique id
     * @type {number}
     */
    this.id = "particle-".concat((0, _utils.uid)());
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = _types.CORE_TYPE_PARTICLE;
    /**
     * @desc The particle's life
     * @type {number}
     */

    this.life = _constants.DEFAULT_LIFE;
    /**
     * @desc The particle's age
     * @type {number}
     */

    this.age = _constants.DEFAULT_AGE;
    /**
     * @desc The particle's energy loss
     * @type {number}
     */

    this.energy = _constants.DEFAULT_ENERGY;
    /**
     * @desc Determines if the particle is dead or not
     * @type {number}
     */

    this.dead = _constants.DEFAULT_DEAD;
    /**
     * @desc Determines if the particle is sleeping or not
     * @type {number}
     */

    this.sleep = _constants.DEFAULT_SLEEP;
    /**
     * @desc The particle's body
     * @type {object}
     */

    this.body = _constants.DEFAULT_BODY;
    /**
     * @desc The particle's parent
     * @type {?Emitter}
     */

    this.parent = _constants.DEFAULT_PARENT;
    /**
     * @desc The particle's mass
     * @type {number}
     */

    this.mass = _constants.DEFAULT_MASS;
    /**
     * @desc The particle's radius
     * @type {number}
     */

    this.radius = _constants.DEFAULT_RADIUS;
    /**
     * @desc The particle's alpha
     * @type {number}
     */

    this.alpha = _constants.DEFAULT_ALPHA;
    /**
     * @desc The particle's scale
     * @type {number}
     */

    this.scale = _constants.DEFAULT_SCALE;
    /**
     * @desc Determines whether to use color or not
     * @type {boolean}
     */

    this.useColor = _constants.DEFAULT_USE_COLOR;
    /**
     * @desc Determines whether to use alpha or not
     * @type {boolean}
     */

    this.useAlpha = _constants.DEFAULT_USE_ALPHA;
    /**
     * @desc The particle's easing
     * @type {string}
     */

    this.easing = _constants.DEFAULT_EASING;
    /**
     * @desc The particle's position
     * @type {Vector3D}
     */

    this.position = new _math.Vector3D();
    /**
     * @desc The particle's velocity
     * @type {Vector3D}
     */

    this.velocity = new _math.Vector3D();
    /**
     * @desc The particle's acceleration
     * @type {Vector3D}
     */

    this.acceleration = new _math.Vector3D();
    /**
     * @desc The particle's last position, velocity and acceleration
     * @type {Vector3D}
     */

    this.old = {};
    /**
     * @desc The particle's old position
     * @type {Vector3D}
     */

    this.old.position = this.position.clone();
    /**
     * @desc The particle's old velocity
     * @type {Vector3D}
     */

    this.old.velocity = this.velocity.clone();
    /**
     * @desc The particle's old acceleration
     * @type {Vector3D}
     */

    this.old.acceleration = this.acceleration.clone();
    /**
     * @desc The particle's behaviours array
     * @type {array}
     */

    this.behaviours = [];
    /**
     * @desc The particle's transform collection
     * @type {object}
     */

    this.transform = {};
    /**
     * @desc The particle's color store
     * @type {object}
     */

    this.color = {
      r: 0,
      g: 0,
      b: 0
    };
    /**
     * @desc The particle's rotation
     * @type {number}
     */

    this.rotation = new _math.Vector3D();
    /**
     * @desc The particle's distance to the camera, only set by the GPURenderer for depth sorting purposes.
     * @type {number}
     */

    this.distanceToCamera = 0; // override constructor props with passed properties.

    _utils.Util.setPrototypeByObj(this, properties);
  }
  /**
   * Gets the particle's current direction.
   *
   * @return {number}
   */


  (0, _createClass2["default"])(Particle, [{
    key: "getDirection",
    value: function getDirection() {
      return Math.atan2(this.velocity.x, -this.velocity.y) * (180 / _constants2.PI);
    }
    /**
     * Resets the particle's default properties and clear's its particle's position,
     * velocity, acceleration, color and rotation. Also destroy's the particle's
     * transform collection & removes all behaviours.
     *
     * @return {Particle}
     */

  }, {
    key: "reset",
    value: function reset() {
      this.life = _constants.DEFAULT_LIFE;
      this.age = _constants.DEFAULT_AGE;
      this.energy = _constants.DEFAULT_ENERGY;
      this.dead = _constants.DEFAULT_DEAD;
      this.sleep = _constants.DEFAULT_SLEEP;
      this.body = _constants.DEFAULT_BODY;
      this.parent = _constants.DEFAULT_PARENT;
      this.mass = _constants.DEFAULT_MASS;
      this.radius = _constants.DEFAULT_RADIUS;
      this.alpha = _constants.DEFAULT_ALPHA;
      this.scale = _constants.DEFAULT_SCALE;
      this.useColor = _constants.DEFAULT_USE_COLOR;
      this.useAlpha = _constants.DEFAULT_USE_ALPHA;
      this.easing = _constants.DEFAULT_EASING;
      this.position.set(0, 0, 0);
      this.velocity.set(0, 0, 0);
      this.acceleration.set(0, 0, 0);
      this.old.position.set(0, 0, 0);
      this.old.velocity.set(0, 0, 0);
      this.old.acceleration.set(0, 0, 0);
      this.color.r = 0;
      this.color.g = 0;
      this.color.b = 0;
      this.rotation.clear();

      _utils.Util.destroyObject(this.transform);

      this.removeAllBehaviours();
      return this;
    }
    /**
     * Updates the particle's properties by applying each behaviour to the particle.
     * Will also update the particle's energy, unless it's age is greater than it's life
     * in which case it will be destroyed.
     *
     * @param {number} time - Integration time
     * @param {integer} index - Particle index
     * @return void
     */

  }, {
    key: "update",
    value: function update(time, index) {
      if (!this.sleep) {
        this.age += time;
        var i = this.behaviours.length;

        while (i--) {
          var behaviour = this.behaviours[i]; //behaviour && 

          behaviour.applyBehaviour(this, time, index);
        }
      }

      if (this.age >= this.life) {
        this.destroy();
      } else {
        var scale = this.easing(this.age / this.life);
        this.energy = Math.max(1 - scale, 0);
      }
    }
    /**
     * Adds a behaviour to the particle.
     *
     * @param {Behaviour} behaviour - The behaviour to add to the particle
     * @return void
     */

  }, {
    key: "addBehaviour",
    value: function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);
      behaviour.initialize(this);
    }
    /**
     * Adds multiple behaviours to the particle.
     *
     * @param {array<Behaviour>} behaviours - An array of behaviours to add to the particle
     * @return void
     */

  }, {
    key: "addBehaviours",
    value: function addBehaviours(behaviours) {
      var i = behaviours.length;

      while (i--) {
        this.addBehaviour(behaviours[i]);
      }
    }
    /**
     * Removes the behaviour from the particle.
     *
     * @param {Behaviour} behaviour - The behaviour to remove from the particle
     * @return void
     */

  }, {
    key: "removeBehaviour",
    value: function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);

      if (index > -1) {
        this.behaviours.splice(index, 1);
      }
    }
    /**
     * Removes all behaviours from the particle.
     *
     * @return void
     */

  }, {
    key: "removeAllBehaviours",
    value: function removeAllBehaviours() {
      _utils.Util.destroyArray(this.behaviours);
    }
    /**
     * Destroys the particle.
     *
     * @return void
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.removeAllBehaviours();
      this.energy = 0;
      this.dead = true;
      this.parent = null;
    }
  }]);
  return Particle;
}();

exports["default"] = Particle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIl0sIm5hbWVzIjpbIlBhcnRpY2xlIiwicHJvcGVydGllcyIsImlkIiwidHlwZSIsImxpZmUiLCJERUZBVUxUX0xJRkUiLCJhZ2UiLCJERUZBVUxUX0FHRSIsImVuZXJneSIsIkRFRkFVTFRfRU5FUkdZIiwiZGVhZCIsIkRFRkFVTFRfREVBRCIsInNsZWVwIiwiREVGQVVMVF9TTEVFUCIsImJvZHkiLCJERUZBVUxUX0JPRFkiLCJwYXJlbnQiLCJERUZBVUxUX1BBUkVOVCIsIm1hc3MiLCJERUZBVUxUX01BU1MiLCJyYWRpdXMiLCJERUZBVUxUX1JBRElVUyIsImFscGhhIiwiREVGQVVMVF9BTFBIQSIsInNjYWxlIiwiREVGQVVMVF9TQ0FMRSIsInVzZUNvbG9yIiwiREVGQVVMVF9VU0VfQ09MT1IiLCJ1c2VBbHBoYSIsIkRFRkFVTFRfVVNFX0FMUEhBIiwiZWFzaW5nIiwiREVGQVVMVF9FQVNJTkciLCJwb3NpdGlvbiIsIlZlY3RvcjNEIiwidmVsb2NpdHkiLCJhY2NlbGVyYXRpb24iLCJvbGQiLCJjbG9uZSIsImJlaGF2aW91cnMiLCJ0cmFuc2Zvcm0iLCJjb2xvciIsInIiLCJnIiwiYiIsInJvdGF0aW9uIiwiZGlzdGFuY2VUb0NhbWVyYSIsIlV0aWwiLCJzZXRQcm90b3R5cGVCeU9iaiIsIk1hdGgiLCJhdGFuMiIsIngiLCJ5IiwiUEkiLCJzZXQiLCJjbGVhciIsImRlc3Ryb3lPYmplY3QiLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwidGltZSIsImluZGV4IiwiaSIsImxlbmd0aCIsImJlaGF2aW91ciIsImFwcGx5QmVoYXZpb3VyIiwiZGVzdHJveSIsIm1heCIsInB1c2giLCJpbml0aWFsaXplIiwiYWRkQmVoYXZpb3VyIiwiaW5kZXhPZiIsInNwbGljZSIsImRlc3Ryb3lBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQWdCQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTtBQUNB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QWN3QyxJQUFJLENBQUNnQixHQUFMLENBQVMsSUFBSXhDLEtBQWIsRUFBb0IsQ0FBcEIsQ0FBZDtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7aUNBQ2VxQyxTLEVBQVc7QUFDdEIsV0FBS3ZCLFVBQUwsQ0FBZ0IyQixJQUFoQixDQUFxQkosU0FBckI7QUFDQUEsTUFBQUEsU0FBUyxDQUFDSyxVQUFWLENBQXFCLElBQXJCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7a0NBQ2dCNUIsVSxFQUFZO0FBQ3hCLFVBQUlxQixDQUFDLEdBQUdyQixVQUFVLENBQUNzQixNQUFuQjs7QUFFQSxhQUFPRCxDQUFDLEVBQVIsRUFBWTtBQUNWLGFBQUtRLFlBQUwsQ0FBa0I3QixVQUFVLENBQUNxQixDQUFELENBQTVCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztvQ0FDa0JFLFMsRUFBVztBQUN6QixVQUFNSCxLQUFLLEdBQUcsS0FBS3BCLFVBQUwsQ0FBZ0I4QixPQUFoQixDQUF3QlAsU0FBeEIsQ0FBZDs7QUFFQSxVQUFJSCxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCO0FBQ2QsYUFBS3BCLFVBQUwsQ0FBZ0IrQixNQUFoQixDQUF1QlgsS0FBdkIsRUFBOEIsQ0FBOUI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OzswQ0FDd0I7QUFDcEJaLGtCQUFLd0IsWUFBTCxDQUFrQixLQUFLaEMsVUFBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7OEJBQ1k7QUFDUixXQUFLa0IsbUJBQUw7QUFDQSxXQUFLaEQsTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLRSxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQUtNLE1BQUwsR0FBYyxJQUFkO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBERUZBVUxUX0FHRSxcbiAgREVGQVVMVF9BTFBIQSxcbiAgREVGQVVMVF9CT0RZLFxuICBERUZBVUxUX0RFQUQsXG4gIERFRkFVTFRfRUFTSU5HLFxuICBERUZBVUxUX0VORVJHWSxcbiAgREVGQVVMVF9MSUZFLFxuICBERUZBVUxUX01BU1MsXG4gIERFRkFVTFRfUEFSRU5ULFxuICBERUZBVUxUX1JBRElVUyxcbiAgREVGQVVMVF9TQ0FMRSxcbiAgREVGQVVMVF9TTEVFUCxcbiAgREVGQVVMVF9VU0VfQUxQSEEsXG4gIERFRkFVTFRfVVNFX0NPTE9SLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBVdGlsLCB1aWQgfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCB7IFBJIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IFZlY3RvcjNEIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBDT1JFX1RZUEVfUEFSVElDTEUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEEgUGFydGljbGUgaXMgYW4gb2JqZWN0IHRoYXQgaXMgZW1pdHRlZCBieSBhbiBlbWl0dGVyLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFBhcnRpY2xlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcGVydGllcyAtIFRoZSBwcm9wZXJ0aWVzIHRvIGluc3RhbnRpYXRlIHRoZSBwYXJ0aWNsZSB3aXRoXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLmxpZmUgLSBUaGUgcGFydGljbGUncyBsaWZlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLmFnZSAtIFRoZSBwYXJ0aWNsZSdzIGFnZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5lbmVyZ3kgLSBUaGUgcGFydGljbGUncyBlbmVyZ3kgbG9zc1xuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHByb3BlcnRpZXMuZGVhZCAtIERldGVybWluZXMgaWYgdGhlIHBhcnRpY2xlIGlzIGRlYWQgb3Igbm90XG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvcGVydGllcy5zbGVlcCAtIERldGVybWluZXMgaWYgdGhlIHBhcnRpY2xlIGlzIHNsZWVwaW5nIG9yIG5vdFxuICAgKiBAcHJvcGVydHkge29iamVjdH0gcHJvcGVydGllcy50YXJnZXQgLSBUaGUgcGFydGljbGUncyB0YXJnZXRcbiAgICogQHByb3BlcnR5IHtvYmplY3R9IHByb3BlcnRpZXMuYm9keSAtIFRoZSBwYXJ0aWNsZSdzIGJvZHlcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMubWFzcyAtIFRoZSBwYXJ0aWNsZSdzIG1hc3NcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMucmFkaXVzIC0gVGhlIHBhcnRpY2xlJ3MgcmFkaXVzXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLmFscGhhIC0gVGhlIHBhcnRpY2xlJ3MgYWxwaGFcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMuc2NhbGUgLSBUaGUgcGFydGljbGUncyBzY2FsZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5yb3RhdGlvbiAtIFRoZSBwYXJ0aWNsZSdzIHJvdGF0aW9uXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bWJlcn0gcHJvcGVydGllcy5jb2xvciAtIFRoZSBwYXJ0aWNsZSdzIGNvbG9yXG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHByb3BlcnRpZXMuZWFzaW5nIC0gVGhlIHBhcnRpY2xlJ3MgZWFzaW5nXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yM0R9IHByb3BlcnRpZXMucG9zaXRpb24gLSBUaGUgcGFydGljbGUncyBwb3NpdGlvblxuICAgKiBAcHJvcGVydHkge1ZlY3RvcjNEfSBwcm9wZXJ0aWVzLnZlbG9jaXR5IC0gVGhlIHBhcnRpY2xlJ3MgdmVsb2NpdHlcbiAgICogQHByb3BlcnR5IHtWZWN0b3IzRH0gcHJvcGVydGllcy5hY2NlbGVyYXRpb24gLSBUaGUgcGFydGljbGUncyBhY2NlbGVyYXRpb25cbiAgICogQHByb3BlcnR5IHthcnJheX0gcHJvcGVydGllcy5iZWhhdmlvdXJzIC0gVGhlIHBhcnRpY2xlJ3MgYmVoYXZpb3VycyBhcnJheVxuICAgKiBAcHJvcGVydHkge29iamVjdH0gcHJvcGVydGllcy50cmFuc2Zvcm0gLSBUaGUgcGFydGljbGUncyB0cmFuc2Zvcm0gY29sbGVjdGlvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyB1bmlxdWUgaWRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuaWQgPSBgcGFydGljbGUtJHt1aWQoKX1gO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGxpZmVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGlmZSA9IERFRkFVTFRfTElGRTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBhZ2VcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuYWdlID0gREVGQVVMVF9BR0U7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgZW5lcmd5IGxvc3NcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZW5lcmd5ID0gREVGQVVMVF9FTkVSR1k7XG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgcGFydGljbGUgaXMgZGVhZCBvciBub3RcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZGVhZCA9IERFRkFVTFRfREVBRDtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIHRoZSBwYXJ0aWNsZSBpcyBzbGVlcGluZyBvciBub3RcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuc2xlZXAgPSBERUZBVUxUX1NMRUVQO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGJvZHlcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IERFRkFVTFRfQk9EWTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBwYXJlbnRcbiAgICAgKiBAdHlwZSB7P0VtaXR0ZXJ9XG4gICAgICovXG4gICAgdGhpcy5wYXJlbnQgPSBERUZBVUxUX1BBUkVOVDtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBtYXNzXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLm1hc3MgPSBERUZBVUxUX01BU1M7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgcmFkaXVzXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJhZGl1cyA9IERFRkFVTFRfUkFESVVTO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGFscGhhXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFscGhhID0gREVGQVVMVF9BTFBIQTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBzY2FsZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5zY2FsZSA9IERFRkFVTFRfU0NBTEU7XG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSBjb2xvciBvciBub3RcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnVzZUNvbG9yID0gREVGQVVMVF9VU0VfQ09MT1I7XG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSBhbHBoYSBvciBub3RcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnVzZUFscGhhID0gREVGQVVMVF9VU0VfQUxQSEE7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgZWFzaW5nXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmVhc2luZyA9IERFRkFVTFRfRUFTSU5HO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHBvc2l0aW9uXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yM0QoKTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyB2ZWxvY2l0eVxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcjNEKCk7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgYWNjZWxlcmF0aW9uXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3RvcjNEKCk7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgbGFzdCBwb3NpdGlvbiwgdmVsb2NpdHkgYW5kIGFjY2VsZXJhdGlvblxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLm9sZCA9IHt9O1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIG9sZCBwb3NpdGlvblxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLm9sZC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uY2xvbmUoKTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBvbGQgdmVsb2NpdHlcbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5vbGQudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmNsb25lKCk7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3Mgb2xkIGFjY2VsZXJhdGlvblxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLm9sZC5hY2NlbGVyYXRpb24gPSB0aGlzLmFjY2VsZXJhdGlvbi5jbG9uZSgpO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGJlaGF2aW91cnMgYXJyYXlcbiAgICAgKiBAdHlwZSB7YXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5iZWhhdmlvdXJzID0gW107XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgdHJhbnNmb3JtIGNvbGxlY3Rpb25cbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMudHJhbnNmb3JtID0ge307XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgY29sb3Igc3RvcmVcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuY29sb3IgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyByb3RhdGlvblxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgZGlzdGFuY2UgdG8gdGhlIGNhbWVyYSwgb25seSBzZXQgYnkgdGhlIEdQVVJlbmRlcmVyIGZvciBkZXB0aCBzb3J0aW5nIHB1cnBvc2VzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5kaXN0YW5jZVRvQ2FtZXJhID0gMDtcblxuICAgIC8vIG92ZXJyaWRlIGNvbnN0cnVjdG9yIHByb3BzIHdpdGggcGFzc2VkIHByb3BlcnRpZXMuXG4gICAgVXRpbC5zZXRQcm90b3R5cGVCeU9iaih0aGlzLCBwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwYXJ0aWNsZSdzIGN1cnJlbnQgZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy52ZWxvY2l0eS54LCAtdGhpcy52ZWxvY2l0eS55KSAqICgxODAgLyBQSSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBwYXJ0aWNsZSdzIGRlZmF1bHQgcHJvcGVydGllcyBhbmQgY2xlYXIncyBpdHMgcGFydGljbGUncyBwb3NpdGlvbixcbiAgICogdmVsb2NpdHksIGFjY2VsZXJhdGlvbiwgY29sb3IgYW5kIHJvdGF0aW9uLiBBbHNvIGRlc3Ryb3kncyB0aGUgcGFydGljbGUnc1xuICAgKiB0cmFuc2Zvcm0gY29sbGVjdGlvbiAmIHJlbW92ZXMgYWxsIGJlaGF2aW91cnMuXG4gICAqXG4gICAqIEByZXR1cm4ge1BhcnRpY2xlfVxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5saWZlID0gREVGQVVMVF9MSUZFO1xuICAgIHRoaXMuYWdlID0gREVGQVVMVF9BR0U7XG4gICAgdGhpcy5lbmVyZ3kgPSBERUZBVUxUX0VORVJHWTtcbiAgICB0aGlzLmRlYWQgPSBERUZBVUxUX0RFQUQ7XG4gICAgdGhpcy5zbGVlcCA9IERFRkFVTFRfU0xFRVA7XG4gICAgdGhpcy5ib2R5ID0gREVGQVVMVF9CT0RZO1xuICAgIHRoaXMucGFyZW50ID0gREVGQVVMVF9QQVJFTlQ7XG4gICAgdGhpcy5tYXNzID0gREVGQVVMVF9NQVNTO1xuICAgIHRoaXMucmFkaXVzID0gREVGQVVMVF9SQURJVVM7XG4gICAgdGhpcy5hbHBoYSA9IERFRkFVTFRfQUxQSEE7XG4gICAgdGhpcy5zY2FsZSA9IERFRkFVTFRfU0NBTEU7XG4gICAgdGhpcy51c2VDb2xvciA9IERFRkFVTFRfVVNFX0NPTE9SO1xuICAgIHRoaXMudXNlQWxwaGEgPSBERUZBVUxUX1VTRV9BTFBIQTtcbiAgICB0aGlzLmVhc2luZyA9IERFRkFVTFRfRUFTSU5HO1xuICAgIHRoaXMucG9zaXRpb24uc2V0KDAsIDAsIDApO1xuICAgIHRoaXMudmVsb2NpdHkuc2V0KDAsIDAsIDApO1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uLnNldCgwLCAwLCAwKTtcbiAgICB0aGlzLm9sZC5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy5vbGQudmVsb2NpdHkuc2V0KDAsIDAsIDApO1xuICAgIHRoaXMub2xkLmFjY2VsZXJhdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy5jb2xvci5yID0gMDtcbiAgICB0aGlzLmNvbG9yLmcgPSAwO1xuICAgIHRoaXMuY29sb3IuYiA9IDA7XG5cbiAgICB0aGlzLnJvdGF0aW9uLmNsZWFyKCk7XG4gICAgVXRpbC5kZXN0cm95T2JqZWN0KHRoaXMudHJhbnNmb3JtKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBhcnRpY2xlJ3MgcHJvcGVydGllcyBieSBhcHBseWluZyBlYWNoIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqIFdpbGwgYWxzbyB1cGRhdGUgdGhlIHBhcnRpY2xlJ3MgZW5lcmd5LCB1bmxlc3MgaXQncyBhZ2UgaXMgZ3JlYXRlciB0aGFuIGl0J3MgbGlmZVxuICAgKiBpbiB3aGljaCBjYXNlIGl0IHdpbGwgYmUgZGVzdHJveWVkLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIEludGVncmF0aW9uIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIFBhcnRpY2xlIGluZGV4XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuXG4gICAgICBsZXQgaSA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbGV0IGJlaGF2aW91ciA9IHRoaXMuYmVoYXZpb3Vyc1tpXTtcblxuICAgICAgICAvL2JlaGF2aW91ciAmJiBcbiAgICAgICAgYmVoYXZpb3VyLmFwcGx5QmVoYXZpb3VyKHRoaXMsIHRpbWUsIGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlKSB7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG5cbiAgICAgIHRoaXMuZW5lcmd5ID0gTWF0aC5tYXgoMSAtIHNjYWxlLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgLSBUaGUgYmVoYXZpb3VyIHRvIGFkZCB0byB0aGUgcGFydGljbGVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcbiAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG11bHRpcGxlIGJlaGF2aW91cnMgdG8gdGhlIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5PEJlaGF2aW91cj59IGJlaGF2aW91cnMgLSBBbiBhcnJheSBvZiBiZWhhdmlvdXJzIHRvIGFkZCB0byB0aGUgcGFydGljbGVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBhZGRCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBsZXQgaSA9IGJlaGF2aW91cnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5hZGRCZWhhdmlvdXIoYmVoYXZpb3Vyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGJlaGF2aW91ciBmcm9tIHRoZSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gcmVtb3ZlIGZyb20gdGhlIHBhcnRpY2xlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5iZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmJlaGF2aW91cnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB9XG59XG4iXX0=