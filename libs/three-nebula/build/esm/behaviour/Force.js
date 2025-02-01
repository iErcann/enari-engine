import Behaviour from './Behaviour';
import { Vector3D } from '../math';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_FORCE as type } from './types';
/**
 * Behaviour that forces particles along a specific axis.
 *
 */

export default class Force extends Behaviour {
  /**
   * Constructs a Force behaviour instance.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(fx, fy, fz, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(fx, fy, fz);
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   */


  reset(fx, fy, fz) {
    /**
     * @desc The normalized force to exert on the particle in
     * @type {Vector3D}
     */
    this.force = this.normalizeForce(new Vector3D(fx, fy, fz));
    /**
     * @desc The id of the force vector
     * @property {number} this.force.id
     */

    this.force.id = Math.random();
  }
  /**
   * Mutates the particle.acceleration property.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.acceleration.add(this.force);
  }
  /**
   * Creates a Force initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @return {Force}
   */


  static fromJSON(json) {
    const {
      fx,
      fy,
      fz,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Force(fx, fy, fz, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiXSwibmFtZXMiOlsiQmVoYXZpb3VyIiwiVmVjdG9yM0QiLCJnZXRFYXNpbmdCeU5hbWUiLCJCRUhBVklPVVJfVFlQRV9GT1JDRSIsInR5cGUiLCJGb3JjZSIsImNvbnN0cnVjdG9yIiwiZngiLCJmeSIsImZ6IiwibGlmZSIsImVhc2luZyIsImlzRW5hYmxlZCIsInJlc2V0IiwiZm9yY2UiLCJub3JtYWxpemVGb3JjZSIsImlkIiwiTWF0aCIsInJhbmRvbSIsIm11dGF0ZSIsInBhcnRpY2xlIiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJhY2NlbGVyYXRpb24iLCJhZGQiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFNBQXpCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxTQUFoQztBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsS0FBTixTQUFvQkwsU0FBcEIsQ0FBOEI7QUFDM0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFTSxFQUFBQSxXQUFXLENBQUNDLEVBQUQsRUFBS0MsRUFBTCxFQUFTQyxFQUFULEVBQWFDLElBQWIsRUFBbUJDLE1BQW5CLEVBQTJCQyxTQUFTLEdBQUcsSUFBdkMsRUFBNkM7QUFDdEQsVUFBTUYsSUFBTixFQUFZQyxNQUFaLEVBQW9CUCxJQUFwQixFQUEwQlEsU0FBMUI7QUFFQSxTQUFLQyxLQUFMLENBQVdOLEVBQVgsRUFBZUMsRUFBZixFQUFtQkMsRUFBbkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUksRUFBQUEsS0FBSyxDQUFDTixFQUFELEVBQUtDLEVBQUwsRUFBU0MsRUFBVCxFQUFhO0FBQ2hCO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksU0FBS0ssS0FBTCxHQUFhLEtBQUtDLGNBQUwsQ0FBb0IsSUFBSWQsUUFBSixDQUFhTSxFQUFiLEVBQWlCQyxFQUFqQixFQUFxQkMsRUFBckIsQ0FBcEIsQ0FBYjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtLLEtBQUwsQ0FBV0UsRUFBWCxHQUFnQkMsSUFBSSxDQUFDQyxNQUFMLEVBQWhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUMsRUFBQUEsTUFBTSxDQUFDQyxRQUFELEVBQVdDLElBQVgsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQzVCLFNBQUtDLFFBQUwsQ0FBY0gsUUFBZCxFQUF3QkMsSUFBeEIsRUFBOEJDLEtBQTlCO0FBRUFGLElBQUFBLFFBQVEsQ0FBQ0ksWUFBVCxDQUFzQkMsR0FBdEIsQ0FBMEIsS0FBS1gsS0FBL0I7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJZLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRXBCLE1BQUFBLEVBQUY7QUFBTUMsTUFBQUEsRUFBTjtBQUFVQyxNQUFBQSxFQUFWO0FBQWNDLE1BQUFBLElBQWQ7QUFBb0JDLE1BQUFBLE1BQXBCO0FBQTRCQyxNQUFBQSxTQUFTLEdBQUc7QUFBeEMsUUFBaURlLElBQXZEO0FBRUEsV0FBTyxJQUFJdEIsS0FBSixDQUFVRSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEVBQWxCLEVBQXNCQyxJQUF0QixFQUE0QlIsZUFBZSxDQUFDUyxNQUFELENBQTNDLEVBQXFEQyxTQUFyRCxDQUFQO0FBQ0Q7O0FBL0QwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgVmVjdG9yM0QgfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfRk9SQ0UgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBmb3JjZXMgcGFydGljbGVzIGFsb25nIGEgc3BlY2lmaWMgYXhpcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBGb3JjZSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmeCAtIHRoZSB4IGF4aXMgZm9yY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZ5IC0gdGhlIHkgYXhpcyBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZnogLSB0aGUgeiBheGlzIGZvcmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZ4LCBmeSwgZnosIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcblxuICAgIHRoaXMucmVzZXQoZngsIGZ5LCBmeik7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZ4IC0gdGhlIHggYXhpcyBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZnkgLSB0aGUgeSBheGlzIGZvcmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmeiAtIHRoZSB6IGF4aXMgZm9yY2VcbiAgICovXG4gIHJlc2V0KGZ4LCBmeSwgZnopIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgbm9ybWFsaXplZCBmb3JjZSB0byBleGVydCBvbiB0aGUgcGFydGljbGUgaW5cbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjNEKGZ4LCBmeSwgZnopKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBpZCBvZiB0aGUgZm9yY2UgdmVjdG9yXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHRoaXMuZm9yY2UuaWRcbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlLmlkID0gTWF0aC5yYW5kb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZS5hY2NlbGVyYXRpb24gcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5hY2NlbGVyYXRpb24uYWRkKHRoaXMuZm9yY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBGb3JjZSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcmV0dXJuIHtGb3JjZX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBmeCwgZnksIGZ6LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IEZvcmNlKGZ4LCBmeSwgZnosIGxpZmUsIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=