import { MathUtils, createSpan } from '../math';
import Behaviour from './Behaviour';
import { PARTICLE_ALPHA_THRESHOLD } from './constants';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_ALPHA as type } from './types';
/**
 * Behaviour that applies an alpha transition effect to particles.
 *
 */

export default class Alpha extends Behaviour {
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
  constructor(alphaA = 1, alphaB = null, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    /**
     * @desc The starting alpha value
     * @type {number|Span}
     */

    this.alphaA = alphaA;
    /**
     * @desc The ending alpha value
     * @type {number|Span}
     */

    this.alphaB = alphaB;
    this.reset(alphaA, alphaB);
  }
  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */


  get same() {
    return this._same;
  }
  /**
   * Sets the _same property which determines if the alpha are the same.
   *
   * @param {boolean} same
   * @return {boolean}
   */


  set same(same) {
    /**
     * @type {boolean}
     */
    this._same = same;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} alphaA - the starting alpha value
   * @param {?number} alphaB - the ending alpha value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */


  reset(alphaA = 1, alphaB = null, life, easing) {
    this.same = alphaB === null || alphaB === undefined ? true : false;
    this.alphaA = createSpan(alphaA);
    this.alphaB = createSpan(alphaB);
    life && super.reset(life, easing);
  }
  /**
   * Initializes the behaviour on a particle.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */


  initialize(particle) {
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


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.alpha = MathUtils.lerp(particle.transform.alphaA, particle.transform.alphaB, this.energy);

    if (particle.alpha < PARTICLE_ALPHA_THRESHOLD) {
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


  static fromJSON(json) {
    const {
      alphaA,
      alphaB,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Alpha(alphaA, alphaB, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiXSwibmFtZXMiOlsiTWF0aFV0aWxzIiwiY3JlYXRlU3BhbiIsIkJlaGF2aW91ciIsIlBBUlRJQ0xFX0FMUEhBX1RIUkVTSE9MRCIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX0FMUEhBIiwidHlwZSIsIkFscGhhIiwiY29uc3RydWN0b3IiLCJhbHBoYUEiLCJhbHBoYUIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJzYW1lIiwiX3NhbWUiLCJ1bmRlZmluZWQiLCJpbml0aWFsaXplIiwicGFydGljbGUiLCJ1c2VBbHBoYSIsInRyYW5zZm9ybSIsImdldFZhbHVlIiwibXV0YXRlIiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJhbHBoYSIsImxlcnAiLCJlbmVyZ3kiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFNBQVQsRUFBb0JDLFVBQXBCLFFBQXNDLFNBQXRDO0FBRUEsT0FBT0MsU0FBUCxNQUFzQixhQUF0QjtBQUNBLFNBQVNDLHdCQUFULFFBQXlDLGFBQXpDO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxTQUFoQztBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsS0FBTixTQUFvQkwsU0FBcEIsQ0FBOEI7QUFDM0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRU0sRUFBQUEsV0FBVyxDQUFDQyxNQUFNLEdBQUcsQ0FBVixFQUFhQyxNQUFNLEdBQUcsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDQyxNQUFsQyxFQUEwQ0MsU0FBUyxHQUFHLElBQXRELEVBQTREO0FBQ3JFLFVBQU1GLElBQU4sRUFBWUMsTUFBWixFQUFvQk4sSUFBcEIsRUFBMEJPLFNBQTFCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0osTUFBTCxHQUFjQSxNQUFkO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBRUEsU0FBS0ksS0FBTCxDQUFXTCxNQUFYLEVBQW1CQyxNQUFuQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ1UsTUFBSkssSUFBSSxHQUFHO0FBQ1QsV0FBTyxLQUFLQyxLQUFaO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNVLE1BQUpELElBQUksQ0FBQ0EsSUFBRCxFQUFPO0FBQ2I7QUFDSjtBQUNBO0FBQ0ksU0FBS0MsS0FBTCxHQUFhRCxJQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRCxFQUFBQSxLQUFLLENBQUNMLE1BQU0sR0FBRyxDQUFWLEVBQWFDLE1BQU0sR0FBRyxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0NDLE1BQWxDLEVBQTBDO0FBQzdDLFNBQUtHLElBQUwsR0FBWUwsTUFBTSxLQUFLLElBQVgsSUFBbUJBLE1BQU0sS0FBS08sU0FBOUIsR0FBMEMsSUFBMUMsR0FBaUQsS0FBN0Q7QUFDQSxTQUFLUixNQUFMLEdBQWNSLFVBQVUsQ0FBQ1EsTUFBRCxDQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBY1QsVUFBVSxDQUFDUyxNQUFELENBQXhCO0FBRUFDLElBQUFBLElBQUksSUFBSSxNQUFNRyxLQUFOLENBQVlILElBQVosRUFBa0JDLE1BQWxCLENBQVI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VNLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CQSxJQUFBQSxRQUFRLENBQUNDLFFBQVQsR0FBb0IsSUFBcEI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CWixNQUFuQixHQUE0QixLQUFLQSxNQUFMLENBQVlhLFFBQVosRUFBNUI7QUFFQUgsSUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CWCxNQUFuQixHQUE0QixLQUFLSyxJQUFMLEdBQ3hCSSxRQUFRLENBQUNFLFNBQVQsQ0FBbUJaLE1BREssR0FFeEIsS0FBS0MsTUFBTCxDQUFZWSxRQUFaLEVBRko7QUFHRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxNQUFNLENBQUNKLFFBQUQsRUFBV0ssSUFBWCxFQUFpQkMsS0FBakIsRUFBd0I7QUFDNUIsU0FBS0MsUUFBTCxDQUFjUCxRQUFkLEVBQXdCSyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQU4sSUFBQUEsUUFBUSxDQUFDUSxLQUFULEdBQWlCM0IsU0FBUyxDQUFDNEIsSUFBVixDQUNmVCxRQUFRLENBQUNFLFNBQVQsQ0FBbUJaLE1BREosRUFFZlUsUUFBUSxDQUFDRSxTQUFULENBQW1CWCxNQUZKLEVBR2YsS0FBS21CLE1BSFUsQ0FBakI7O0FBTUEsUUFBSVYsUUFBUSxDQUFDUSxLQUFULEdBQWlCeEIsd0JBQXJCLEVBQStDO0FBQzdDZ0IsTUFBQUEsUUFBUSxDQUFDUSxLQUFULEdBQWlCLENBQWpCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkcsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFdEIsTUFBQUEsTUFBRjtBQUFVQyxNQUFBQSxNQUFWO0FBQWtCQyxNQUFBQSxJQUFsQjtBQUF3QkMsTUFBQUEsTUFBeEI7QUFBZ0NDLE1BQUFBLFNBQVMsR0FBRztBQUE1QyxRQUFxRGtCLElBQTNEO0FBRUEsV0FBTyxJQUFJeEIsS0FBSixDQUFVRSxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQkMsSUFBMUIsRUFBZ0NQLGVBQWUsQ0FBQ1EsTUFBRCxDQUEvQyxFQUF5REMsU0FBekQsQ0FBUDtBQUNEOztBQXZIMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXRoVXRpbHMsIGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tICcuL0JlaGF2aW91cic7XG5pbXBvcnQgeyBQQVJUSUNMRV9BTFBIQV9USFJFU0hPTEQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRFYXNpbmdCeU5hbWUgfSBmcm9tICcuLi9lYXNlJztcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX0FMUEhBIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBhcHBsaWVzIGFuIGFscGhhIHRyYW5zaXRpb24gZWZmZWN0IHRvIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFscGhhIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYW4gQWxwaGEgYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYWxwaGFBIC0gVGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXG4gICAqIEBwYXJhbSB7P251bWJlcn0gYWxwaGFCIC0gVGhlIGVuZGluZyBhbHBoYSB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIHdpbGwgYmUgYXBwbGllZCBvciBub3RcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbHBoYUEgPSAxLCBhbHBoYUIgPSBudWxsLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgc3RhcnRpbmcgYWxwaGEgdmFsdWVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfFNwYW59XG4gICAgICovXG4gICAgdGhpcy5hbHBoYUEgPSBhbHBoYUE7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgZW5kaW5nIGFscGhhIHZhbHVlXG4gICAgICogQHR5cGUge251bWJlcnxTcGFufVxuICAgICAqL1xuICAgIHRoaXMuYWxwaGFCID0gYWxwaGFCO1xuXG4gICAgdGhpcy5yZXNldChhbHBoYUEsIGFscGhhQik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgX3NhbWUgcHJvcGVydHkgd2hpY2ggZGV0ZXJtaW5lcyBpZiB0aGUgYWxwaGEgYXJlIHRoZSBzYW1lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZ2V0IHNhbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NhbWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgX3NhbWUgcHJvcGVydHkgd2hpY2ggZGV0ZXJtaW5lcyBpZiB0aGUgYWxwaGEgYXJlIHRoZSBzYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNhbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHNldCBzYW1lKHNhbWUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9zYW1lID0gc2FtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYWxwaGFBIC0gdGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXG4gICAqIEBwYXJhbSB7P251bWJlcn0gYWxwaGFCIC0gdGhlIGVuZGluZyBhbHBoYSB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIHRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gdGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNldChhbHBoYUEgPSAxLCBhbHBoYUIgPSBudWxsLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBhbHBoYUIgPT09IG51bGwgfHwgYWxwaGFCID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hbHBoYUEgPSBjcmVhdGVTcGFuKGFscGhhQSk7XG4gICAgdGhpcy5hbHBoYUIgPSBjcmVhdGVTcGFuKGFscGhhQik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGJlaGF2aW91ciBvbiBhIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgYmVoYXZpb3VyIG9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnVzZUFscGhhID0gdHJ1ZTtcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWxwaGFBID0gdGhpcy5hbHBoYUEuZ2V0VmFsdWUoKTtcblxuICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5hbHBoYUIgPSB0aGlzLnNhbWVcbiAgICAgID8gcGFydGljbGUudHJhbnNmb3JtLmFscGhhQVxuICAgICAgOiB0aGlzLmFscGhhQi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11dGF0ZXMgdGhlIHRhcmdldCdzIGFscGhhL29wYWNpdHkgcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5hbHBoYSA9IE1hdGhVdGlscy5sZXJwKFxuICAgICAgcGFydGljbGUudHJhbnNmb3JtLmFscGhhQSxcbiAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5hbHBoYUIsXG4gICAgICB0aGlzLmVuZXJneVxuICAgICk7XG5cbiAgICBpZiAocGFydGljbGUuYWxwaGEgPCBQQVJUSUNMRV9BTFBIQV9USFJFU0hPTEQpIHtcbiAgICAgIHBhcnRpY2xlLmFscGhhID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIEJvZHkgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uYWxwaGFBIC0gVGhlIHN0YXJ0aW5nIGFscGhhIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmFscGhhQiAtIFRoZSBlbmRpbmcgYWxwaGEgdmFsdWVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ubGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGpzb24uZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcbiAgICogQHJldHVybiB7Qm9keX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBhbHBoYUEsIGFscGhhQiwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBBbHBoYShhbHBoYUEsIGFscGhhQiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==