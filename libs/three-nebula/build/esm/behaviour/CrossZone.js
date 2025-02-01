import * as Zone from '../zone';
import Behaviour from './Behaviour';
import { DEFAULT_CROSS_TYPE } from './constants';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_CROSS_ZONE as type } from './types';
/**
 * Behaviour that allows for specific functions to be called on particles when
 * they interact with a zone.
 *
 */

export default class CrossZone extends Behaviour {
  /**
   * Constructs a CrossZone behaviour instance.
   *
   * @param {Zone} zone - the zone used to apply to particles with this behaviour
   * @param {string} [crossType=DEFAULT_CROSS_TYPE] - enum of cross types, valid strings include 'dead', 'bound', 'cross'
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   */
  constructor(zone, crossType, life, easing, isEnabled) {
    super(life, easing, type, isEnabled);
    this.reset(zone, crossType);
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Zone} zone - the zone used to apply to particles with this behaviour
   * @param {string} [crossType=DEFAULT_CROSS_TYPE] - enum of cross types, valid strings include 'dead', 'bound', 'cross'
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   */


  reset(zone, crossType = DEFAULT_CROSS_TYPE, life, easing) {
    /**
     * @desc The zone used to apply to particles with this behaviour
     * @type {Zone}
     */
    this.zone = zone;
    this.zone.crossType = crossType;
    life && super.reset(life, easing);
  }
  /**
   * Applies the behaviour to the particle.
   *
   * @see {@link '../zone/Zone.js'} crossing
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    this.zone.crossing.call(this.zone, particle);
  }
  /**
   * Creates a CrossZone initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @return {CrossZone}
   */


  static fromJSON(json) {
    const {
      zoneType,
      zoneParams,
      crossType,
      life,
      easing,
      isEnabled = true
    } = json;
    const zone = new Zone[zoneType](...Object.values(zoneParams));
    return new CrossZone(zone, crossType, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQ3Jvc3Nab25lLmpzIl0sIm5hbWVzIjpbIlpvbmUiLCJCZWhhdmlvdXIiLCJERUZBVUxUX0NST1NTX1RZUEUiLCJnZXRFYXNpbmdCeU5hbWUiLCJCRUhBVklPVVJfVFlQRV9DUk9TU19aT05FIiwidHlwZSIsIkNyb3NzWm9uZSIsImNvbnN0cnVjdG9yIiwiem9uZSIsImNyb3NzVHlwZSIsImxpZmUiLCJlYXNpbmciLCJpc0VuYWJsZWQiLCJyZXNldCIsIm11dGF0ZSIsInBhcnRpY2xlIiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJjcm9zc2luZyIsImNhbGwiLCJmcm9tSlNPTiIsImpzb24iLCJ6b25lVHlwZSIsInpvbmVQYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBS0EsSUFBWixNQUFzQixTQUF0QjtBQUVBLE9BQU9DLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxTQUFTQyxrQkFBVCxRQUFtQyxhQUFuQztBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsU0FBaEM7QUFDQSxTQUFTQyx5QkFBeUIsSUFBSUMsSUFBdEMsUUFBa0QsU0FBbEQ7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkwsU0FBeEIsQ0FBa0M7QUFDL0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VNLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxTQUFQLEVBQWtCQyxJQUFsQixFQUF3QkMsTUFBeEIsRUFBZ0NDLFNBQWhDLEVBQTJDO0FBQ3BELFVBQU1GLElBQU4sRUFBWUMsTUFBWixFQUFvQk4sSUFBcEIsRUFBMEJPLFNBQTFCO0FBRUEsU0FBS0MsS0FBTCxDQUFXTCxJQUFYLEVBQWlCQyxTQUFqQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VJLEVBQUFBLEtBQUssQ0FBQ0wsSUFBRCxFQUFPQyxTQUFTLEdBQUdQLGtCQUFuQixFQUF1Q1EsSUFBdkMsRUFBNkNDLE1BQTdDLEVBQXFEO0FBQ3hEO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0EsSUFBTCxDQUFVQyxTQUFWLEdBQXNCQSxTQUF0QjtBQUVBQyxJQUFBQSxJQUFJLElBQUksTUFBTUcsS0FBTixDQUFZSCxJQUFaLEVBQWtCQyxNQUFsQixDQUFSO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRyxFQUFBQSxNQUFNLENBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBd0I7QUFDNUIsU0FBS0MsUUFBTCxDQUFjSCxRQUFkLEVBQXdCQyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQSxTQUFLVCxJQUFMLENBQVVXLFFBQVYsQ0FBbUJDLElBQW5CLENBQXdCLEtBQUtaLElBQTdCLEVBQW1DTyxRQUFuQztBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUk0sUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUNKQyxNQUFBQSxRQURJO0FBRUpDLE1BQUFBLFVBRkk7QUFHSmYsTUFBQUEsU0FISTtBQUlKQyxNQUFBQSxJQUpJO0FBS0pDLE1BQUFBLE1BTEk7QUFNSkMsTUFBQUEsU0FBUyxHQUFHO0FBTlIsUUFPRlUsSUFQSjtBQVNBLFVBQU1kLElBQUksR0FBRyxJQUFJUixJQUFJLENBQUN1QixRQUFELENBQVIsQ0FBbUIsR0FBR0UsTUFBTSxDQUFDQyxNQUFQLENBQWNGLFVBQWQsQ0FBdEIsQ0FBYjtBQUVBLFdBQU8sSUFBSWxCLFNBQUosQ0FDTEUsSUFESyxFQUVMQyxTQUZLLEVBR0xDLElBSEssRUFJTFAsZUFBZSxDQUFDUSxNQUFELENBSlYsRUFLTEMsU0FMSyxDQUFQO0FBT0Q7O0FBM0U4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFpvbmUgZnJvbSAnLi4vem9uZSc7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgREVGQVVMVF9DUk9TU19UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9DUk9TU19aT05FIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBhbGxvd3MgZm9yIHNwZWNpZmljIGZ1bmN0aW9ucyB0byBiZSBjYWxsZWQgb24gcGFydGljbGVzIHdoZW5cbiAqIHRoZXkgaW50ZXJhY3Qgd2l0aCBhIHpvbmUuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm9zc1pvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIENyb3NzWm9uZSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZX0gem9uZSAtIHRoZSB6b25lIHVzZWQgdG8gYXBwbHkgdG8gcGFydGljbGVzIHdpdGggdGhpcyBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjcm9zc1R5cGU9REVGQVVMVF9DUk9TU19UWVBFXSAtIGVudW0gb2YgY3Jvc3MgdHlwZXMsIHZhbGlkIHN0cmluZ3MgaW5jbHVkZSAnZGVhZCcsICdib3VuZCcsICdjcm9zcydcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nLCB0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZX0gem9uZSAtIHRoZSB6b25lIHVzZWQgdG8gYXBwbHkgdG8gcGFydGljbGVzIHdpdGggdGhpcyBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjcm9zc1R5cGU9REVGQVVMVF9DUk9TU19UWVBFXSAtIGVudW0gb2YgY3Jvc3MgdHlwZXMsIHZhbGlkIHN0cmluZ3MgaW5jbHVkZSAnZGVhZCcsICdib3VuZCcsICdjcm9zcydcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqL1xuICByZXNldCh6b25lLCBjcm9zc1R5cGUgPSBERUZBVUxUX0NST1NTX1RZUEUsIGxpZmUsIGVhc2luZykge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSB6b25lIHVzZWQgdG8gYXBwbHkgdG8gcGFydGljbGVzIHdpdGggdGhpcyBiZWhhdmlvdXJcbiAgICAgKiBAdHlwZSB7Wm9uZX1cbiAgICAgKi9cbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBjcm9zc1R5cGU7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgJy4uL3pvbmUvWm9uZS5qcyd9IGNyb3NzaW5nXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICB0aGlzLnpvbmUuY3Jvc3NpbmcuY2FsbCh0aGlzLnpvbmUsIHBhcnRpY2xlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ3Jvc3Nab25lIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEByZXR1cm4ge0Nyb3NzWm9uZX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qge1xuICAgICAgem9uZVR5cGUsXG4gICAgICB6b25lUGFyYW1zLFxuICAgICAgY3Jvc3NUeXBlLFxuICAgICAgbGlmZSxcbiAgICAgIGVhc2luZyxcbiAgICAgIGlzRW5hYmxlZCA9IHRydWUsXG4gICAgfSA9IGpzb247XG5cbiAgICBjb25zdCB6b25lID0gbmV3IFpvbmVbem9uZVR5cGVdKC4uLk9iamVjdC52YWx1ZXMoem9uZVBhcmFtcykpO1xuXG4gICAgcmV0dXJuIG5ldyBDcm9zc1pvbmUoXG4gICAgICB6b25lLFxuICAgICAgY3Jvc3NUeXBlLFxuICAgICAgbGlmZSxcbiAgICAgIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19