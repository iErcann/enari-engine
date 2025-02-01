import { MathUtils, createSpan } from '../math';
import Behaviour from './Behaviour';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_SCALE as type } from './types';
/**
 * Behaviour that scales particles.
 *
 */

export default class Scale extends Behaviour {
  /**
   * Constructs a Scale behaviour instance.
   *
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(scaleA, scaleB, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(scaleA, scaleB);
  }
  /**
   * Gets the _same property which determines if the scale props are the same.
   *
   * @return {boolean}
   */


  get same() {
    return this._same;
  }
  /**
   * Sets the _same property which determines if the scale props are the same.
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
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */


  reset(scaleA, scaleB, life, easing) {
    this.same = scaleB === null || scaleB === undefined ? true : false;
    /**
     * @desc The starting scale.
     * @type {Span}
     */

    this.scaleA = createSpan(scaleA || 1);
    /**
     * @desc The ending scale.
     * @type {Span}
     */

    this.scaleB = createSpan(scaleB);
    life && super.reset(life, easing);
  }
  /**
   * Initializes the behaviour on a particle.
   * Stores initial values for comparison and mutation in the applyBehaviour method.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */


  initialize(particle) {
    particle.transform.scaleA = this.scaleA.getValue();
    particle.transform.oldRadius = particle.radius;
    particle.transform.scaleB = this.same ? particle.transform.scaleA : this.scaleB.getValue();
  }
  /**
   * Applies the behaviour to the particle.
   * Mutates the particle's scale and its radius according to this scale.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.scale = MathUtils.lerp(particle.transform.scaleA, particle.transform.scaleB, this.energy);

    if (particle.scale < 0.0005) {
      particle.scale = 0;
    }

    particle.radius = particle.transform.oldRadius * particle.scale;
  }
  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Spring}
   */


  static fromJSON(json) {
    const {
      scaleA,
      scaleB,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Scale(scaleA, scaleB, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvU2NhbGUuanMiXSwibmFtZXMiOlsiTWF0aFV0aWxzIiwiY3JlYXRlU3BhbiIsIkJlaGF2aW91ciIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX1NDQUxFIiwidHlwZSIsIlNjYWxlIiwiY29uc3RydWN0b3IiLCJzY2FsZUEiLCJzY2FsZUIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJzYW1lIiwiX3NhbWUiLCJ1bmRlZmluZWQiLCJpbml0aWFsaXplIiwicGFydGljbGUiLCJ0cmFuc2Zvcm0iLCJnZXRWYWx1ZSIsIm9sZFJhZGl1cyIsInJhZGl1cyIsIm11dGF0ZSIsInRpbWUiLCJpbmRleCIsImVuZXJnaXplIiwic2NhbGUiLCJsZXJwIiwiZW5lcmd5IiwiZnJvbUpTT04iLCJqc29uIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxTQUFULEVBQW9CQyxVQUFwQixRQUFzQyxTQUF0QztBQUVBLE9BQU9DLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0Msb0JBQW9CLElBQUlDLElBQWpDLFFBQTZDLFNBQTdDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxLQUFOLFNBQW9CSixTQUFwQixDQUE4QjtBQUMzQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxFQUFpQkMsSUFBakIsRUFBdUJDLE1BQXZCLEVBQStCQyxTQUFTLEdBQUcsSUFBM0MsRUFBaUQ7QUFDMUQsVUFBTUYsSUFBTixFQUFZQyxNQUFaLEVBQW9CTixJQUFwQixFQUEwQk8sU0FBMUI7QUFFQSxTQUFLQyxLQUFMLENBQVdMLE1BQVgsRUFBbUJDLE1BQW5CO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFDVSxNQUFKSyxJQUFJLEdBQUc7QUFDVCxXQUFPLEtBQUtDLEtBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ1UsTUFBSkQsSUFBSSxDQUFDQSxJQUFELEVBQU87QUFDYjtBQUNKO0FBQ0E7QUFDSSxTQUFLQyxLQUFMLEdBQWFELElBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VELEVBQUFBLEtBQUssQ0FBQ0wsTUFBRCxFQUFTQyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsTUFBdkIsRUFBK0I7QUFDbEMsU0FBS0csSUFBTCxHQUFZTCxNQUFNLEtBQUssSUFBWCxJQUFtQkEsTUFBTSxLQUFLTyxTQUE5QixHQUEwQyxJQUExQyxHQUFpRCxLQUE3RDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtSLE1BQUwsR0FBY1AsVUFBVSxDQUFDTyxNQUFNLElBQUksQ0FBWCxDQUF4QjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLE1BQUwsR0FBY1IsVUFBVSxDQUFDUSxNQUFELENBQXhCO0FBRUFDLElBQUFBLElBQUksSUFBSSxNQUFNRyxLQUFOLENBQVlILElBQVosRUFBa0JDLE1BQWxCLENBQVI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRU0sRUFBQUEsVUFBVSxDQUFDQyxRQUFELEVBQVc7QUFDbkJBLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlgsTUFBbkIsR0FBNEIsS0FBS0EsTUFBTCxDQUFZWSxRQUFaLEVBQTVCO0FBQ0FGLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkUsU0FBbkIsR0FBK0JILFFBQVEsQ0FBQ0ksTUFBeEM7QUFFQUosSUFBQUEsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQUFuQixHQUE0QixLQUFLSyxJQUFMLEdBQ3hCSSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJYLE1BREssR0FFeEIsS0FBS0MsTUFBTCxDQUFZVyxRQUFaLEVBRko7QUFHRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLE1BQU0sQ0FBQ0wsUUFBRCxFQUFXTSxJQUFYLEVBQWlCQyxLQUFqQixFQUF3QjtBQUM1QixTQUFLQyxRQUFMLENBQWNSLFFBQWQsRUFBd0JNLElBQXhCLEVBQThCQyxLQUE5QjtBQUVBUCxJQUFBQSxRQUFRLENBQUNTLEtBQVQsR0FBaUIzQixTQUFTLENBQUM0QixJQUFWLENBQ2ZWLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlgsTUFESixFQUVmVSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJWLE1BRkosRUFHZixLQUFLb0IsTUFIVSxDQUFqQjs7QUFNQSxRQUFJWCxRQUFRLENBQUNTLEtBQVQsR0FBaUIsTUFBckIsRUFBNkI7QUFDM0JULE1BQUFBLFFBQVEsQ0FBQ1MsS0FBVCxHQUFpQixDQUFqQjtBQUNEOztBQUVEVCxJQUFBQSxRQUFRLENBQUNJLE1BQVQsR0FBa0JKLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkUsU0FBbkIsR0FBK0JILFFBQVEsQ0FBQ1MsS0FBMUQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJHLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRXZCLE1BQUFBLE1BQUY7QUFBVUMsTUFBQUEsTUFBVjtBQUFrQkMsTUFBQUEsSUFBbEI7QUFBd0JDLE1BQUFBLE1BQXhCO0FBQWdDQyxNQUFBQSxTQUFTLEdBQUc7QUFBNUMsUUFBcURtQixJQUEzRDtBQUVBLFdBQU8sSUFBSXpCLEtBQUosQ0FBVUUsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLElBQTFCLEVBQWdDUCxlQUFlLENBQUNRLE1BQUQsQ0FBL0MsRUFBeURDLFNBQXpELENBQVA7QUFDRDs7QUFySDBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0aFV0aWxzLCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9TQ0FMRSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQmVoYXZpb3VyIHRoYXQgc2NhbGVzIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBTY2FsZSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZUEgLSB0aGUgc3RhcnRpbmcgc2NhbGUgdmFsdWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBzY2FsZUIgLSB0aGUgZW5kaW5nIHNjYWxlIHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSB0aGUgZWFzaW5nIGVxdWF0aW9uIHRvIHVzZSBmb3IgdHJhbnNmb3Jtc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNjYWxlQSwgc2NhbGVCLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICB0aGlzLnJlc2V0KHNjYWxlQSwgc2NhbGVCKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBfc2FtZSBwcm9wZXJ0eSB3aGljaCBkZXRlcm1pbmVzIGlmIHRoZSBzY2FsZSBwcm9wcyBhcmUgdGhlIHNhbWUuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgc2FtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2FtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBfc2FtZSBwcm9wZXJ0eSB3aGljaCBkZXRlcm1pbmVzIGlmIHRoZSBzY2FsZSBwcm9wcyBhcmUgdGhlIHNhbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2FtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgc2V0IHNhbWUoc2FtZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuX3NhbWUgPSBzYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZUEgLSB0aGUgc3RhcnRpbmcgc2NhbGUgdmFsdWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBzY2FsZUIgLSB0aGUgZW5kaW5nIHNjYWxlIHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSB0aGUgZWFzaW5nIGVxdWF0aW9uIHRvIHVzZSBmb3IgdHJhbnNmb3Jtc1xuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlc2V0KHNjYWxlQSwgc2NhbGVCLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBzY2FsZUIgPT09IG51bGwgfHwgc2NhbGVCID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgc3RhcnRpbmcgc2NhbGUuXG4gICAgICogQHR5cGUge1NwYW59XG4gICAgICovXG4gICAgdGhpcy5zY2FsZUEgPSBjcmVhdGVTcGFuKHNjYWxlQSB8fCAxKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBlbmRpbmcgc2NhbGUuXG4gICAgICogQHR5cGUge1NwYW59XG4gICAgICovXG4gICAgdGhpcy5zY2FsZUIgPSBjcmVhdGVTcGFuKHNjYWxlQik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGJlaGF2aW91ciBvbiBhIHBhcnRpY2xlLlxuICAgKiBTdG9yZXMgaW5pdGlhbCB2YWx1ZXMgZm9yIGNvbXBhcmlzb24gYW5kIG11dGF0aW9uIGluIHRoZSBhcHBseUJlaGF2aW91ciBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBiZWhhdmlvdXIgb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQSA9IHRoaXMuc2NhbGVBLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUudHJhbnNmb3JtLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcblxuICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5zY2FsZUIgPSB0aGlzLnNhbWVcbiAgICAgID8gcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQVxuICAgICAgOiB0aGlzLnNjYWxlQi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGJlaGF2aW91ciB0byB0aGUgcGFydGljbGUuXG4gICAqIE11dGF0ZXMgdGhlIHBhcnRpY2xlJ3Mgc2NhbGUgYW5kIGl0cyByYWRpdXMgYWNjb3JkaW5nIHRvIHRoaXMgc2NhbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5zY2FsZSA9IE1hdGhVdGlscy5sZXJwKFxuICAgICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQSxcbiAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5zY2FsZUIsXG4gICAgICB0aGlzLmVuZXJneVxuICAgICk7XG5cbiAgICBpZiAocGFydGljbGUuc2NhbGUgPCAwLjAwMDUpIHtcbiAgICAgIHBhcnRpY2xlLnNjYWxlID0gMDtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSBwYXJ0aWNsZS50cmFuc2Zvcm0ub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIEpTT04gb2JqZWN0IHBhc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSByZXF1aXJlZCBjb25zdHJ1Y3RvciBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm4ge1NwcmluZ31cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBzY2FsZUEsIHNjYWxlQiwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBTY2FsZShzY2FsZUEsIHNjYWxlQiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==