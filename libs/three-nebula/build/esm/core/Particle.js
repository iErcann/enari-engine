import { DEFAULT_AGE, DEFAULT_ALPHA, DEFAULT_BODY, DEFAULT_DEAD, DEFAULT_EASING, DEFAULT_ENERGY, DEFAULT_LIFE, DEFAULT_MASS, DEFAULT_PARENT, DEFAULT_RADIUS, DEFAULT_SCALE, DEFAULT_SLEEP, DEFAULT_USE_ALPHA, DEFAULT_USE_COLOR } from './constants';
import { Util, uid } from '../utils';
import { PI } from '../constants';
import { Vector3D } from '../math';
import { CORE_TYPE_PARTICLE as type } from './types';
/**
 * A Particle is an object that is emitted by an emitter.
 *
 */

export default class Particle {
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
  constructor(properties) {
    /**
     * @desc The particle's unique id
     * @type {number}
     */
    this.id = `particle-${uid()}`;
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc The particle's life
     * @type {number}
     */

    this.life = DEFAULT_LIFE;
    /**
     * @desc The particle's age
     * @type {number}
     */

    this.age = DEFAULT_AGE;
    /**
     * @desc The particle's energy loss
     * @type {number}
     */

    this.energy = DEFAULT_ENERGY;
    /**
     * @desc Determines if the particle is dead or not
     * @type {number}
     */

    this.dead = DEFAULT_DEAD;
    /**
     * @desc Determines if the particle is sleeping or not
     * @type {number}
     */

    this.sleep = DEFAULT_SLEEP;
    /**
     * @desc The particle's body
     * @type {object}
     */

    this.body = DEFAULT_BODY;
    /**
     * @desc The particle's parent
     * @type {?Emitter}
     */

    this.parent = DEFAULT_PARENT;
    /**
     * @desc The particle's mass
     * @type {number}
     */

    this.mass = DEFAULT_MASS;
    /**
     * @desc The particle's radius
     * @type {number}
     */

    this.radius = DEFAULT_RADIUS;
    /**
     * @desc The particle's alpha
     * @type {number}
     */

    this.alpha = DEFAULT_ALPHA;
    /**
     * @desc The particle's scale
     * @type {number}
     */

    this.scale = DEFAULT_SCALE;
    /**
     * @desc Determines whether to use color or not
     * @type {boolean}
     */

    this.useColor = DEFAULT_USE_COLOR;
    /**
     * @desc Determines whether to use alpha or not
     * @type {boolean}
     */

    this.useAlpha = DEFAULT_USE_ALPHA;
    /**
     * @desc The particle's easing
     * @type {string}
     */

    this.easing = DEFAULT_EASING;
    /**
     * @desc The particle's position
     * @type {Vector3D}
     */

    this.position = new Vector3D();
    /**
     * @desc The particle's velocity
     * @type {Vector3D}
     */

    this.velocity = new Vector3D();
    /**
     * @desc The particle's acceleration
     * @type {Vector3D}
     */

    this.acceleration = new Vector3D();
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

    this.rotation = new Vector3D();
    /**
     * @desc The particle's distance to the camera, only set by the GPURenderer for depth sorting purposes.
     * @type {number}
     */

    this.distanceToCamera = 0; // override constructor props with passed properties.

    Util.setPrototypeByObj(this, properties);
  }
  /**
   * Gets the particle's current direction.
   *
   * @return {number}
   */


  getDirection() {
    return Math.atan2(this.velocity.x, -this.velocity.y) * (180 / PI);
  }
  /**
   * Resets the particle's default properties and clear's its particle's position,
   * velocity, acceleration, color and rotation. Also destroy's the particle's
   * transform collection & removes all behaviours.
   *
   * @return {Particle}
   */


  reset() {
    this.life = DEFAULT_LIFE;
    this.age = DEFAULT_AGE;
    this.energy = DEFAULT_ENERGY;
    this.dead = DEFAULT_DEAD;
    this.sleep = DEFAULT_SLEEP;
    this.body = DEFAULT_BODY;
    this.parent = DEFAULT_PARENT;
    this.mass = DEFAULT_MASS;
    this.radius = DEFAULT_RADIUS;
    this.alpha = DEFAULT_ALPHA;
    this.scale = DEFAULT_SCALE;
    this.useColor = DEFAULT_USE_COLOR;
    this.useAlpha = DEFAULT_USE_ALPHA;
    this.easing = DEFAULT_EASING;
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
    Util.destroyObject(this.transform);
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


  update(time, index) {
    if (!this.sleep) {
      this.age += time;
      let i = this.behaviours.length;

      while (i--) {
        let behaviour = this.behaviours[i]; //behaviour && 

        behaviour.applyBehaviour(this, time, index);
      }
    }

    if (this.age >= this.life) {
      this.destroy();
    } else {
      const scale = this.easing(this.age / this.life);
      this.energy = Math.max(1 - scale, 0);
    }
  }
  /**
   * Adds a behaviour to the particle.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the particle
   * @return void
   */


  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
    behaviour.initialize(this);
  }
  /**
   * Adds multiple behaviours to the particle.
   *
   * @param {array<Behaviour>} behaviours - An array of behaviours to add to the particle
   * @return void
   */


  addBehaviours(behaviours) {
    let i = behaviours.length;

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


  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      this.behaviours.splice(index, 1);
    }
  }
  /**
   * Removes all behaviours from the particle.
   *
   * @return void
   */


  removeAllBehaviours() {
    Util.destroyArray(this.behaviours);
  }
  /**
   * Destroys the particle.
   *
   * @return void
   */


  destroy() {
    this.removeAllBehaviours();
    this.energy = 0;
    this.dead = true;
    this.parent = null;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfQUdFIiwiREVGQVVMVF9BTFBIQSIsIkRFRkFVTFRfQk9EWSIsIkRFRkFVTFRfREVBRCIsIkRFRkFVTFRfRUFTSU5HIiwiREVGQVVMVF9FTkVSR1kiLCJERUZBVUxUX0xJRkUiLCJERUZBVUxUX01BU1MiLCJERUZBVUxUX1BBUkVOVCIsIkRFRkFVTFRfUkFESVVTIiwiREVGQVVMVF9TQ0FMRSIsIkRFRkFVTFRfU0xFRVAiLCJERUZBVUxUX1VTRV9BTFBIQSIsIkRFRkFVTFRfVVNFX0NPTE9SIiwiVXRpbCIsInVpZCIsIlBJIiwiVmVjdG9yM0QiLCJDT1JFX1RZUEVfUEFSVElDTEUiLCJ0eXBlIiwiUGFydGljbGUiLCJjb25zdHJ1Y3RvciIsInByb3BlcnRpZXMiLCJpZCIsImxpZmUiLCJhZ2UiLCJlbmVyZ3kiLCJkZWFkIiwic2xlZXAiLCJib2R5IiwicGFyZW50IiwibWFzcyIsInJhZGl1cyIsImFscGhhIiwic2NhbGUiLCJ1c2VDb2xvciIsInVzZUFscGhhIiwiZWFzaW5nIiwicG9zaXRpb24iLCJ2ZWxvY2l0eSIsImFjY2VsZXJhdGlvbiIsIm9sZCIsImNsb25lIiwiYmVoYXZpb3VycyIsInRyYW5zZm9ybSIsImNvbG9yIiwiciIsImciLCJiIiwicm90YXRpb24iLCJkaXN0YW5jZVRvQ2FtZXJhIiwic2V0UHJvdG90eXBlQnlPYmoiLCJnZXREaXJlY3Rpb24iLCJNYXRoIiwiYXRhbjIiLCJ4IiwieSIsInJlc2V0Iiwic2V0IiwiY2xlYXIiLCJkZXN0cm95T2JqZWN0IiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsInVwZGF0ZSIsInRpbWUiLCJpbmRleCIsImkiLCJsZW5ndGgiLCJiZWhhdmlvdXIiLCJhcHBseUJlaGF2aW91ciIsImRlc3Ryb3kiLCJtYXgiLCJhZGRCZWhhdmlvdXIiLCJwdXNoIiwiaW5pdGlhbGl6ZSIsImFkZEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJpbmRleE9mIiwic3BsaWNlIiwiZGVzdHJveUFycmF5Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUNFQSxXQURGLEVBRUVDLGFBRkYsRUFHRUMsWUFIRixFQUlFQyxZQUpGLEVBS0VDLGNBTEYsRUFNRUMsY0FORixFQU9FQyxZQVBGLEVBUUVDLFlBUkYsRUFTRUMsY0FURixFQVVFQyxjQVZGLEVBV0VDLGFBWEYsRUFZRUMsYUFaRixFQWFFQyxpQkFiRixFQWNFQyxpQkFkRixRQWVPLGFBZlA7QUFnQkEsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLFVBQTFCO0FBRUEsU0FBU0MsRUFBVCxRQUFtQixjQUFuQjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsU0FBekI7QUFDQSxTQUFTQyxrQkFBa0IsSUFBSUMsSUFBL0IsUUFBMkMsU0FBM0M7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLFFBQU4sQ0FBZTtBQUM1QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxXQUFXLENBQUNDLFVBQUQsRUFBYTtBQUN0QjtBQUNKO0FBQ0E7QUFDQTtBQUNJLFNBQUtDLEVBQUwsR0FBVyxZQUFXUixHQUFHLEVBQUcsRUFBNUI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSSxJQUFMLEdBQVlBLElBQVo7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSyxJQUFMLEdBQVlsQixZQUFaO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS21CLEdBQUwsR0FBV3pCLFdBQVg7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLMEIsTUFBTCxHQUFjckIsY0FBZDtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtzQixJQUFMLEdBQVl4QixZQUFaO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS3lCLEtBQUwsR0FBYWpCLGFBQWI7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLa0IsSUFBTCxHQUFZM0IsWUFBWjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUs0QixNQUFMLEdBQWN0QixjQUFkO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS3VCLElBQUwsR0FBWXhCLFlBQVo7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLeUIsTUFBTCxHQUFjdkIsY0FBZDtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUt3QixLQUFMLEdBQWFoQyxhQUFiO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS2lDLEtBQUwsR0FBYXhCLGFBQWI7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLeUIsUUFBTCxHQUFnQnRCLGlCQUFoQjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUt1QixRQUFMLEdBQWdCeEIsaUJBQWhCO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS3lCLE1BQUwsR0FBY2pDLGNBQWQ7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLa0MsUUFBTCxHQUFnQixJQUFJckIsUUFBSixFQUFoQjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtzQixRQUFMLEdBQWdCLElBQUl0QixRQUFKLEVBQWhCO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS3VCLFlBQUwsR0FBb0IsSUFBSXZCLFFBQUosRUFBcEI7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLd0IsR0FBTCxHQUFXLEVBQVg7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQSxHQUFMLENBQVNILFFBQVQsR0FBb0IsS0FBS0EsUUFBTCxDQUFjSSxLQUFkLEVBQXBCO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0QsR0FBTCxDQUFTRixRQUFULEdBQW9CLEtBQUtBLFFBQUwsQ0FBY0csS0FBZCxFQUFwQjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtELEdBQUwsQ0FBU0QsWUFBVCxHQUF3QixLQUFLQSxZQUFMLENBQWtCRSxLQUFsQixFQUF4QjtBQUNBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsS0FBTCxHQUFhO0FBQUVDLE1BQUFBLENBQUMsRUFBRSxDQUFMO0FBQVFDLE1BQUFBLENBQUMsRUFBRSxDQUFYO0FBQWNDLE1BQUFBLENBQUMsRUFBRTtBQUFqQixLQUFiO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsUUFBTCxHQUFnQixJQUFJaEMsUUFBSixFQUFoQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtpQyxnQkFBTCxHQUF3QixDQUF4QixDQTlJc0IsQ0FnSnRCOztBQUNBcEMsSUFBQUEsSUFBSSxDQUFDcUMsaUJBQUwsQ0FBdUIsSUFBdkIsRUFBNkI3QixVQUE3QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0U4QixFQUFBQSxZQUFZLEdBQUc7QUFDYixXQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLZixRQUFMLENBQWNnQixDQUF6QixFQUE0QixDQUFDLEtBQUtoQixRQUFMLENBQWNpQixDQUEzQyxLQUFpRCxNQUFNeEMsRUFBdkQsQ0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFeUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS2pDLElBQUwsR0FBWWxCLFlBQVo7QUFDQSxTQUFLbUIsR0FBTCxHQUFXekIsV0FBWDtBQUNBLFNBQUswQixNQUFMLEdBQWNyQixjQUFkO0FBQ0EsU0FBS3NCLElBQUwsR0FBWXhCLFlBQVo7QUFDQSxTQUFLeUIsS0FBTCxHQUFhakIsYUFBYjtBQUNBLFNBQUtrQixJQUFMLEdBQVkzQixZQUFaO0FBQ0EsU0FBSzRCLE1BQUwsR0FBY3RCLGNBQWQ7QUFDQSxTQUFLdUIsSUFBTCxHQUFZeEIsWUFBWjtBQUNBLFNBQUt5QixNQUFMLEdBQWN2QixjQUFkO0FBQ0EsU0FBS3dCLEtBQUwsR0FBYWhDLGFBQWI7QUFDQSxTQUFLaUMsS0FBTCxHQUFheEIsYUFBYjtBQUNBLFNBQUt5QixRQUFMLEdBQWdCdEIsaUJBQWhCO0FBQ0EsU0FBS3VCLFFBQUwsR0FBZ0J4QixpQkFBaEI7QUFDQSxTQUFLeUIsTUFBTCxHQUFjakMsY0FBZDtBQUNBLFNBQUtrQyxRQUFMLENBQWNvQixHQUFkLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCO0FBQ0EsU0FBS25CLFFBQUwsQ0FBY21CLEdBQWQsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDQSxTQUFLbEIsWUFBTCxDQUFrQmtCLEdBQWxCLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCO0FBQ0EsU0FBS2pCLEdBQUwsQ0FBU0gsUUFBVCxDQUFrQm9CLEdBQWxCLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCO0FBQ0EsU0FBS2pCLEdBQUwsQ0FBU0YsUUFBVCxDQUFrQm1CLEdBQWxCLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCO0FBQ0EsU0FBS2pCLEdBQUwsQ0FBU0QsWUFBVCxDQUFzQmtCLEdBQXRCLENBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDO0FBQ0EsU0FBS2IsS0FBTCxDQUFXQyxDQUFYLEdBQWUsQ0FBZjtBQUNBLFNBQUtELEtBQUwsQ0FBV0UsQ0FBWCxHQUFlLENBQWY7QUFDQSxTQUFLRixLQUFMLENBQVdHLENBQVgsR0FBZSxDQUFmO0FBRUEsU0FBS0MsUUFBTCxDQUFjVSxLQUFkO0FBQ0E3QyxJQUFBQSxJQUFJLENBQUM4QyxhQUFMLENBQW1CLEtBQUtoQixTQUF4QjtBQUNBLFNBQUtpQixtQkFBTDtBQUVBLFdBQU8sSUFBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUMsRUFBQUEsTUFBTSxDQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBYztBQUNsQixRQUFJLENBQUMsS0FBS3BDLEtBQVYsRUFBaUI7QUFDZixXQUFLSCxHQUFMLElBQVlzQyxJQUFaO0FBRUEsVUFBSUUsQ0FBQyxHQUFHLEtBQUt0QixVQUFMLENBQWdCdUIsTUFBeEI7O0FBRUEsYUFBT0QsQ0FBQyxFQUFSLEVBQVk7QUFDVixZQUFJRSxTQUFTLEdBQUcsS0FBS3hCLFVBQUwsQ0FBZ0JzQixDQUFoQixDQUFoQixDQURVLENBR1Y7O0FBQ0FFLFFBQUFBLFNBQVMsQ0FBQ0MsY0FBVixDQUF5QixJQUF6QixFQUErQkwsSUFBL0IsRUFBcUNDLEtBQXJDO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJLEtBQUt2QyxHQUFMLElBQVksS0FBS0QsSUFBckIsRUFBMkI7QUFDekIsV0FBSzZDLE9BQUw7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNbkMsS0FBSyxHQUFHLEtBQUtHLE1BQUwsQ0FBWSxLQUFLWixHQUFMLEdBQVcsS0FBS0QsSUFBNUIsQ0FBZDtBQUVBLFdBQUtFLE1BQUwsR0FBYzJCLElBQUksQ0FBQ2lCLEdBQUwsQ0FBUyxJQUFJcEMsS0FBYixFQUFvQixDQUFwQixDQUFkO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VxQyxFQUFBQSxZQUFZLENBQUNKLFNBQUQsRUFBWTtBQUN0QixTQUFLeEIsVUFBTCxDQUFnQjZCLElBQWhCLENBQXFCTCxTQUFyQjtBQUNBQSxJQUFBQSxTQUFTLENBQUNNLFVBQVYsQ0FBcUIsSUFBckI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VDLEVBQUFBLGFBQWEsQ0FBQy9CLFVBQUQsRUFBYTtBQUN4QixRQUFJc0IsQ0FBQyxHQUFHdEIsVUFBVSxDQUFDdUIsTUFBbkI7O0FBRUEsV0FBT0QsQ0FBQyxFQUFSLEVBQVk7QUFDVixXQUFLTSxZQUFMLENBQWtCNUIsVUFBVSxDQUFDc0IsQ0FBRCxDQUE1QjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFVSxFQUFBQSxlQUFlLENBQUNSLFNBQUQsRUFBWTtBQUN6QixVQUFNSCxLQUFLLEdBQUcsS0FBS3JCLFVBQUwsQ0FBZ0JpQyxPQUFoQixDQUF3QlQsU0FBeEIsQ0FBZDs7QUFFQSxRQUFJSCxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCO0FBQ2QsV0FBS3JCLFVBQUwsQ0FBZ0JrQyxNQUFoQixDQUF1QmIsS0FBdkIsRUFBOEIsQ0FBOUI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VILEVBQUFBLG1CQUFtQixHQUFHO0FBQ3BCL0MsSUFBQUEsSUFBSSxDQUFDZ0UsWUFBTCxDQUFrQixLQUFLbkMsVUFBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFMEIsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsU0FBS1IsbUJBQUw7QUFDQSxTQUFLbkMsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtHLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7O0FBeFQyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERFRkFVTFRfQUdFLFxuICBERUZBVUxUX0FMUEhBLFxuICBERUZBVUxUX0JPRFksXG4gIERFRkFVTFRfREVBRCxcbiAgREVGQVVMVF9FQVNJTkcsXG4gIERFRkFVTFRfRU5FUkdZLFxuICBERUZBVUxUX0xJRkUsXG4gIERFRkFVTFRfTUFTUyxcbiAgREVGQVVMVF9QQVJFTlQsXG4gIERFRkFVTFRfUkFESVVTLFxuICBERUZBVUxUX1NDQUxFLFxuICBERUZBVUxUX1NMRUVQLFxuICBERUZBVUxUX1VTRV9BTFBIQSxcbiAgREVGQVVMVF9VU0VfQ09MT1IsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFV0aWwsIHVpZCB9IGZyb20gJy4uL3V0aWxzJztcblxuaW1wb3J0IHsgUEkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgVmVjdG9yM0QgfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IENPUkVfVFlQRV9QQVJUSUNMRSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQSBQYXJ0aWNsZSBpcyBhbiBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIGJ5IGFuIGVtaXR0ZXIuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgUGFydGljbGUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIC0gVGhlIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgdGhlIHBhcnRpY2xlIHdpdGhcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMubGlmZSAtIFRoZSBwYXJ0aWNsZSdzIGxpZmVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMuYWdlIC0gVGhlIHBhcnRpY2xlJ3MgYWdlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLmVuZXJneSAtIFRoZSBwYXJ0aWNsZSdzIGVuZXJneSBsb3NzXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvcGVydGllcy5kZWFkIC0gRGV0ZXJtaW5lcyBpZiB0aGUgcGFydGljbGUgaXMgZGVhZCBvciBub3RcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBwcm9wZXJ0aWVzLnNsZWVwIC0gRGV0ZXJtaW5lcyBpZiB0aGUgcGFydGljbGUgaXMgc2xlZXBpbmcgb3Igbm90XG4gICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBwcm9wZXJ0aWVzLnRhcmdldCAtIFRoZSBwYXJ0aWNsZSdzIHRhcmdldFxuICAgKiBAcHJvcGVydHkge29iamVjdH0gcHJvcGVydGllcy5ib2R5IC0gVGhlIHBhcnRpY2xlJ3MgYm9keVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5tYXNzIC0gVGhlIHBhcnRpY2xlJ3MgbWFzc1xuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5yYWRpdXMgLSBUaGUgcGFydGljbGUncyByYWRpdXNcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb3BlcnRpZXMuYWxwaGEgLSBUaGUgcGFydGljbGUncyBhbHBoYVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy5zY2FsZSAtIFRoZSBwYXJ0aWNsZSdzIHNjYWxlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLnJvdGF0aW9uIC0gVGhlIHBhcnRpY2xlJ3Mgcm90YXRpb25cbiAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfSBwcm9wZXJ0aWVzLmNvbG9yIC0gVGhlIHBhcnRpY2xlJ3MgY29sb3JcbiAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gcHJvcGVydGllcy5lYXNpbmcgLSBUaGUgcGFydGljbGUncyBlYXNpbmdcbiAgICogQHByb3BlcnR5IHtWZWN0b3IzRH0gcHJvcGVydGllcy5wb3NpdGlvbiAtIFRoZSBwYXJ0aWNsZSdzIHBvc2l0aW9uXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yM0R9IHByb3BlcnRpZXMudmVsb2NpdHkgLSBUaGUgcGFydGljbGUncyB2ZWxvY2l0eVxuICAgKiBAcHJvcGVydHkge1ZlY3RvcjNEfSBwcm9wZXJ0aWVzLmFjY2VsZXJhdGlvbiAtIFRoZSBwYXJ0aWNsZSdzIGFjY2VsZXJhdGlvblxuICAgKiBAcHJvcGVydHkge2FycmF5fSBwcm9wZXJ0aWVzLmJlaGF2aW91cnMgLSBUaGUgcGFydGljbGUncyBiZWhhdmlvdXJzIGFycmF5XG4gICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBwcm9wZXJ0aWVzLnRyYW5zZm9ybSAtIFRoZSBwYXJ0aWNsZSdzIHRyYW5zZm9ybSBjb2xsZWN0aW9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcGVydGllcykge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHVuaXF1ZSBpZFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5pZCA9IGBwYXJ0aWNsZS0ke3VpZCgpfWA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgbGlmZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5saWZlID0gREVGQVVMVF9MSUZFO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIGFnZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5hZ2UgPSBERUZBVUxUX0FHRTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBlbmVyZ3kgbG9zc1xuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5lbmVyZ3kgPSBERUZBVUxUX0VORVJHWTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIHRoZSBwYXJ0aWNsZSBpcyBkZWFkIG9yIG5vdFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5kZWFkID0gREVGQVVMVF9ERUFEO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIERldGVybWluZXMgaWYgdGhlIHBhcnRpY2xlIGlzIHNsZWVwaW5nIG9yIG5vdFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5zbGVlcCA9IERFRkFVTFRfU0xFRVA7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgYm9keVxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gREVGQVVMVF9CT0RZO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHBhcmVudFxuICAgICAqIEB0eXBlIHs/RW1pdHRlcn1cbiAgICAgKi9cbiAgICB0aGlzLnBhcmVudCA9IERFRkFVTFRfUEFSRU5UO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIG1hc3NcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubWFzcyA9IERFRkFVTFRfTUFTUztcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyByYWRpdXNcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzID0gREVGQVVMVF9SQURJVVM7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgYWxwaGFcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuYWxwaGEgPSBERUZBVUxUX0FMUEhBO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHNjYWxlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnNjYWxlID0gREVGQVVMVF9TQ0FMRTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIGNvbG9yIG9yIG5vdFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMudXNlQ29sb3IgPSBERUZBVUxUX1VTRV9DT0xPUjtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIGFscGhhIG9yIG5vdFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMudXNlQWxwaGEgPSBERUZBVUxUX1VTRV9BTFBIQTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBlYXNpbmdcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZWFzaW5nID0gREVGQVVMVF9FQVNJTkc7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgcG9zaXRpb25cbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHZlbG9jaXR5XG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yM0QoKTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBhY2NlbGVyYXRpb25cbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5hY2NlbGVyYXRpb24gPSBuZXcgVmVjdG9yM0QoKTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBsYXN0IHBvc2l0aW9uLCB2ZWxvY2l0eSBhbmQgYWNjZWxlcmF0aW9uXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMub2xkID0ge307XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3Mgb2xkIHBvc2l0aW9uXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMub2xkLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpO1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIG9sZCB2ZWxvY2l0eVxuICAgICAqIEB0eXBlIHtWZWN0b3IzRH1cbiAgICAgKi9cbiAgICB0aGlzLm9sZC52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuY2xvbmUoKTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBvbGQgYWNjZWxlcmF0aW9uXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMub2xkLmFjY2VsZXJhdGlvbiA9IHRoaXMuYWNjZWxlcmF0aW9uLmNsb25lKCk7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlJ3MgYmVoYXZpb3VycyBhcnJheVxuICAgICAqIEB0eXBlIHthcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyB0cmFuc2Zvcm0gY29sbGVjdGlvblxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICovXG4gICAgdGhpcy50cmFuc2Zvcm0gPSB7fTtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBjb2xvciBzdG9yZVxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5jb2xvciA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZSdzIHJvdGF0aW9uXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnJvdGF0aW9uID0gbmV3IFZlY3RvcjNEKCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgcGFydGljbGUncyBkaXN0YW5jZSB0byB0aGUgY2FtZXJhLCBvbmx5IHNldCBieSB0aGUgR1BVUmVuZGVyZXIgZm9yIGRlcHRoIHNvcnRpbmcgcHVycG9zZXMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmRpc3RhbmNlVG9DYW1lcmEgPSAwO1xuXG4gICAgLy8gb3ZlcnJpZGUgY29uc3RydWN0b3IgcHJvcHMgd2l0aCBwYXNzZWQgcHJvcGVydGllcy5cbiAgICBVdGlsLnNldFByb3RvdHlwZUJ5T2JqKHRoaXMsIHByb3BlcnRpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBhcnRpY2xlJ3MgY3VycmVudCBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldERpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnZlbG9jaXR5LngsIC10aGlzLnZlbG9jaXR5LnkpICogKDE4MCAvIFBJKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHBhcnRpY2xlJ3MgZGVmYXVsdCBwcm9wZXJ0aWVzIGFuZCBjbGVhcidzIGl0cyBwYXJ0aWNsZSdzIHBvc2l0aW9uLFxuICAgKiB2ZWxvY2l0eSwgYWNjZWxlcmF0aW9uLCBjb2xvciBhbmQgcm90YXRpb24uIEFsc28gZGVzdHJveSdzIHRoZSBwYXJ0aWNsZSdzXG4gICAqIHRyYW5zZm9ybSBjb2xsZWN0aW9uICYgcmVtb3ZlcyBhbGwgYmVoYXZpb3Vycy5cbiAgICpcbiAgICogQHJldHVybiB7UGFydGljbGV9XG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmxpZmUgPSBERUZBVUxUX0xJRkU7XG4gICAgdGhpcy5hZ2UgPSBERUZBVUxUX0FHRTtcbiAgICB0aGlzLmVuZXJneSA9IERFRkFVTFRfRU5FUkdZO1xuICAgIHRoaXMuZGVhZCA9IERFRkFVTFRfREVBRDtcbiAgICB0aGlzLnNsZWVwID0gREVGQVVMVF9TTEVFUDtcbiAgICB0aGlzLmJvZHkgPSBERUZBVUxUX0JPRFk7XG4gICAgdGhpcy5wYXJlbnQgPSBERUZBVUxUX1BBUkVOVDtcbiAgICB0aGlzLm1hc3MgPSBERUZBVUxUX01BU1M7XG4gICAgdGhpcy5yYWRpdXMgPSBERUZBVUxUX1JBRElVUztcbiAgICB0aGlzLmFscGhhID0gREVGQVVMVF9BTFBIQTtcbiAgICB0aGlzLnNjYWxlID0gREVGQVVMVF9TQ0FMRTtcbiAgICB0aGlzLnVzZUNvbG9yID0gREVGQVVMVF9VU0VfQ09MT1I7XG4gICAgdGhpcy51c2VBbHBoYSA9IERFRkFVTFRfVVNFX0FMUEhBO1xuICAgIHRoaXMuZWFzaW5nID0gREVGQVVMVF9FQVNJTkc7XG4gICAgdGhpcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy52ZWxvY2l0eS5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy5hY2NlbGVyYXRpb24uc2V0KDAsIDAsIDApO1xuICAgIHRoaXMub2xkLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICB0aGlzLm9sZC52ZWxvY2l0eS5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy5vbGQuYWNjZWxlcmF0aW9uLnNldCgwLCAwLCAwKTtcbiAgICB0aGlzLmNvbG9yLnIgPSAwO1xuICAgIHRoaXMuY29sb3IuZyA9IDA7XG4gICAgdGhpcy5jb2xvci5iID0gMDtcblxuICAgIHRoaXMucm90YXRpb24uY2xlYXIoKTtcbiAgICBVdGlsLmRlc3Ryb3lPYmplY3QodGhpcy50cmFuc2Zvcm0pO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcGFydGljbGUncyBwcm9wZXJ0aWVzIGJ5IGFwcGx5aW5nIGVhY2ggYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogV2lsbCBhbHNvIHVwZGF0ZSB0aGUgcGFydGljbGUncyBlbmVyZ3ksIHVubGVzcyBpdCdzIGFnZSBpcyBncmVhdGVyIHRoYW4gaXQncyBsaWZlXG4gICAqIGluIHdoaWNoIGNhc2UgaXQgd2lsbCBiZSBkZXN0cm95ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gSW50ZWdyYXRpb24gdGltZVxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gUGFydGljbGUgaW5kZXhcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICB1cGRhdGUodGltZSwgaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuc2xlZXApIHtcbiAgICAgIHRoaXMuYWdlICs9IHRpbWU7XG5cbiAgICAgIGxldCBpID0gdGhpcy5iZWhhdmlvdXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBsZXQgYmVoYXZpb3VyID0gdGhpcy5iZWhhdmlvdXJzW2ldO1xuXG4gICAgICAgIC8vYmVoYXZpb3VyICYmIFxuICAgICAgICBiZWhhdmlvdXIuYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUpIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZWFzaW5nKHRoaXMuYWdlIC8gdGhpcy5saWZlKTtcblxuICAgICAgdGhpcy5lbmVyZ3kgPSBNYXRoLm1heCgxIC0gc2NhbGUsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gYWRkIHRvIHRoZSBwYXJ0aWNsZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbXVsdGlwbGUgYmVoYXZpb3VycyB0byB0aGUgcGFydGljbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8QmVoYXZpb3VyPn0gYmVoYXZpb3VycyAtIEFuIGFycmF5IG9mIGJlaGF2aW91cnMgdG8gYWRkIHRvIHRoZSBwYXJ0aWNsZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGxldCBpID0gYmVoYXZpb3Vycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byByZW1vdmUgZnJvbSB0aGUgcGFydGljbGVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBiZWhhdmlvdXJzIGZyb20gdGhlIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgcGFydGljbGUuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cbn1cbiJdfQ==