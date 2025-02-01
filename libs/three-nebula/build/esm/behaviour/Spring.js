import Behaviour from './Behaviour';
import { Vector3D } from '../math';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_SPRING as type } from './types';
/**
 * Behaviour that causes particles to spring.
 *
 */

export default class Spring extends Behaviour {
  /**
   * Constructs a Spring behaviour instance.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(x, y, z, spring, friction, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(x, y, z, spring, friction);
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @return void
   */


  reset(x, y, z, spring, friction) {
    if (!this.pos) {
      this.pos = new Vector3D(x, y, z);
    } else {
      this.pos.set(x, y, z);
    }

    this.spring = spring || 0.1;
    this.friction = friction || 0.98;
  }
  /**
   * Applies the behaviour to the particle.
   * Mutates the particle's velocity according to this.pos and this.spring.
   *
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);
    particle.velocity.x += (this.pos.x - particle.position.x) * this.spring;
    particle.velocity.y += (this.pos.y - particle.position.y) * this.spring;
    particle.velocity.z += (this.pos.z - particle.position.z) * this.spring;
  }
  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Spring}
   */


  static fromJSON(json) {
    const {
      x,
      y,
      z,
      spring,
      friction,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Spring(x, y, z, spring, friction, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvU3ByaW5nLmpzIl0sIm5hbWVzIjpbIkJlaGF2aW91ciIsIlZlY3RvcjNEIiwiZ2V0RWFzaW5nQnlOYW1lIiwiQkVIQVZJT1VSX1RZUEVfU1BSSU5HIiwidHlwZSIsIlNwcmluZyIsImNvbnN0cnVjdG9yIiwieCIsInkiLCJ6Iiwic3ByaW5nIiwiZnJpY3Rpb24iLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJwb3MiLCJzZXQiLCJtdXRhdGUiLCJwYXJ0aWNsZSIsInRpbWUiLCJpbmRleCIsImVuZXJnaXplIiwidmVsb2NpdHkiLCJwb3NpdGlvbiIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsU0FBUCxNQUFzQixhQUF0QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsU0FBekI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0MscUJBQXFCLElBQUlDLElBQWxDLFFBQThDLFNBQTlDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxNQUFOLFNBQXFCTCxTQUFyQixDQUErQjtBQUM1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFTSxFQUFBQSxXQUFXLENBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQLEVBQVVDLE1BQVYsRUFBa0JDLFFBQWxCLEVBQTRCQyxJQUE1QixFQUFrQ0MsTUFBbEMsRUFBMENDLFNBQVMsR0FBRyxJQUF0RCxFQUE0RDtBQUNyRSxVQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JULElBQXBCLEVBQTBCVSxTQUExQjtBQUVBLFNBQUtDLEtBQUwsQ0FBV1IsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsTUFBcEIsRUFBNEJDLFFBQTVCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VJLEVBQUFBLEtBQUssQ0FBQ1IsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEI7QUFDL0IsUUFBSSxDQUFDLEtBQUtLLEdBQVYsRUFBZTtBQUNiLFdBQUtBLEdBQUwsR0FBVyxJQUFJZixRQUFKLENBQWFNLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQixDQUFYO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS08sR0FBTCxDQUFTQyxHQUFULENBQWFWLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQjtBQUNEOztBQUVELFNBQUtDLE1BQUwsR0FBY0EsTUFBTSxJQUFJLEdBQXhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBUSxJQUFJLElBQTVCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFTyxFQUFBQSxNQUFNLENBQUNDLFFBQUQsRUFBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBd0I7QUFDNUIsU0FBS0MsUUFBTCxDQUFjSCxRQUFkLEVBQXdCQyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQUYsSUFBQUEsUUFBUSxDQUFDSSxRQUFULENBQWtCaEIsQ0FBbEIsSUFBdUIsQ0FBQyxLQUFLUyxHQUFMLENBQVNULENBQVQsR0FBYVksUUFBUSxDQUFDSyxRQUFULENBQWtCakIsQ0FBaEMsSUFBcUMsS0FBS0csTUFBakU7QUFDQVMsSUFBQUEsUUFBUSxDQUFDSSxRQUFULENBQWtCZixDQUFsQixJQUF1QixDQUFDLEtBQUtRLEdBQUwsQ0FBU1IsQ0FBVCxHQUFhVyxRQUFRLENBQUNLLFFBQVQsQ0FBa0JoQixDQUFoQyxJQUFxQyxLQUFLRSxNQUFqRTtBQUNBUyxJQUFBQSxRQUFRLENBQUNJLFFBQVQsQ0FBa0JkLENBQWxCLElBQXVCLENBQUMsS0FBS08sR0FBTCxDQUFTUCxDQUFULEdBQWFVLFFBQVEsQ0FBQ0ssUUFBVCxDQUFrQmYsQ0FBaEMsSUFBcUMsS0FBS0MsTUFBakU7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJlLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRW5CLE1BQUFBLENBQUY7QUFBS0MsTUFBQUEsQ0FBTDtBQUFRQyxNQUFBQSxDQUFSO0FBQVdDLE1BQUFBLE1BQVg7QUFBbUJDLE1BQUFBLFFBQW5CO0FBQTZCQyxNQUFBQSxJQUE3QjtBQUFtQ0MsTUFBQUEsTUFBbkM7QUFBMkNDLE1BQUFBLFNBQVMsR0FBRztBQUF2RCxRQUFnRVksSUFBdEU7QUFFQSxXQUFPLElBQUlyQixNQUFKLENBQ0xFLENBREssRUFFTEMsQ0FGSyxFQUdMQyxDQUhLLEVBSUxDLE1BSkssRUFLTEMsUUFMSyxFQU1MQyxJQU5LLEVBT0xWLGVBQWUsQ0FBQ1csTUFBRCxDQVBWLEVBUUxDLFNBUkssQ0FBUDtBQVVEOztBQTdFMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmVoYXZpb3VyIGZyb20gJy4vQmVoYXZpb3VyJztcbmltcG9ydCB7IFZlY3RvcjNEIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBnZXRFYXNpbmdCeU5hbWUgfSBmcm9tICcuLi9lYXNlJztcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1NQUklORyBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQmVoYXZpb3VyIHRoYXQgY2F1c2VzIHBhcnRpY2xlcyB0byBzcHJpbmcuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpbmcgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFNwcmluZyBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBheGlzIHNwcmluZ1xuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyBzcHJpbmdcbiAgICogQHBhcmFtIHtudW1iZXJ9IHogLSBaIGF4aXMgc3ByaW5nXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzcHJpbmcgLSBTcHJpbmcgZmFjdG9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmcmljdGlvbiAtIFNwcmluZyBmcmljdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIHdpbGwgYmUgYXBwbGllZCBvciBub3RcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB6LCBzcHJpbmcsIGZyaWN0aW9uLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHksIHosIHNwcmluZywgZnJpY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBheGlzIHNwcmluZ1xuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyBzcHJpbmdcbiAgICogQHBhcmFtIHtudW1iZXJ9IHogLSBaIGF4aXMgc3ByaW5nXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzcHJpbmcgLSBTcHJpbmcgZmFjdG9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmcmljdGlvbiAtIFNwcmluZyBmcmljdGlvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlc2V0KHgsIHksIHosIHNwcmluZywgZnJpY3Rpb24pIHtcbiAgICBpZiAoIXRoaXMucG9zKSB7XG4gICAgICB0aGlzLnBvcyA9IG5ldyBWZWN0b3IzRCh4LCB5LCB6KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3Muc2V0KHgsIHksIHopO1xuICAgIH1cblxuICAgIHRoaXMuc3ByaW5nID0gc3ByaW5nIHx8IDAuMTtcbiAgICB0aGlzLmZyaWN0aW9uID0gZnJpY3Rpb24gfHwgMC45ODtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBiZWhhdmlvdXIgdG8gdGhlIHBhcnRpY2xlLlxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZSdzIHZlbG9jaXR5IGFjY29yZGluZyB0byB0aGlzLnBvcyBhbmQgdGhpcy5zcHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS52ZWxvY2l0eS54ICs9ICh0aGlzLnBvcy54IC0gcGFydGljbGUucG9zaXRpb24ueCkgKiB0aGlzLnNwcmluZztcbiAgICBwYXJ0aWNsZS52ZWxvY2l0eS55ICs9ICh0aGlzLnBvcy55IC0gcGFydGljbGUucG9zaXRpb24ueSkgKiB0aGlzLnNwcmluZztcbiAgICBwYXJ0aWNsZS52ZWxvY2l0eS56ICs9ICh0aGlzLnBvcy56IC0gcGFydGljbGUucG9zaXRpb24ueikgKiB0aGlzLnNwcmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBiZWhhdmlvdXIgZnJvbSB0aGUgSlNPTiBvYmplY3QgcGFzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIEpTT04gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlcXVpcmVkIGNvbnN0cnVjdG9yIHByb3BlcnRpZXNcbiAgICogQHJldHVybiB7U3ByaW5nfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IHgsIHksIHosIHNwcmluZywgZnJpY3Rpb24sIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgU3ByaW5nKFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB6LFxuICAgICAgc3ByaW5nLFxuICAgICAgZnJpY3Rpb24sXG4gICAgICBsaWZlLFxuICAgICAgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksXG4gICAgICBpc0VuYWJsZWRcbiAgICApO1xuICB9XG59XG4iXX0=