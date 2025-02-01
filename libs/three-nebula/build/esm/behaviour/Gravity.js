import Force from './Force';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_GRAVITY as type } from './types';
/**
 * Behaviour that forces particles down the y axis.
 *
 */

export default class Gravity extends Force {
  /**
   * Constructs a Gravity behaviour instance.
   *
   * @param {number} gravity - the force to pull the particle down the y axis
   * @param {number} life - the life of the particle
   * @param {string} easing - the easing equation to use
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(gravity, life, easing, isEnabled = true) {
    super(0, -gravity, 0, life, easing, isEnabled);
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
  }

  static fromJSON(json) {
    const {
      gravity,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Gravity(gravity, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvR3Jhdml0eS5qcyJdLCJuYW1lcyI6WyJGb3JjZSIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX0dSQVZJVFkiLCJ0eXBlIiwiR3Jhdml0eSIsImNvbnN0cnVjdG9yIiwiZ3Jhdml0eSIsImxpZmUiLCJlYXNpbmciLCJpc0VuYWJsZWQiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLEtBQVAsTUFBa0IsU0FBbEI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0Msc0JBQXNCLElBQUlDLElBQW5DLFFBQStDLFNBQS9DO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxPQUFOLFNBQXNCSixLQUF0QixDQUE0QjtBQUN6QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVVDLElBQVYsRUFBZ0JDLE1BQWhCLEVBQXdCQyxTQUFTLEdBQUcsSUFBcEMsRUFBMEM7QUFDbkQsVUFBTSxDQUFOLEVBQVMsQ0FBQ0gsT0FBVixFQUFtQixDQUFuQixFQUFzQkMsSUFBdEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxTQUFwQztBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtOLElBQUwsR0FBWUEsSUFBWjtBQUNEOztBQUVjLFNBQVJPLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRUwsTUFBQUEsT0FBRjtBQUFXQyxNQUFBQSxJQUFYO0FBQWlCQyxNQUFBQSxNQUFqQjtBQUF5QkMsTUFBQUEsU0FBUyxHQUFHO0FBQXJDLFFBQThDRSxJQUFwRDtBQUVBLFdBQU8sSUFBSVAsT0FBSixDQUFZRSxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQk4sZUFBZSxDQUFDTyxNQUFELENBQTFDLEVBQW9EQyxTQUFwRCxDQUFQO0FBQ0Q7O0FBeEJ3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb3JjZSBmcm9tICcuL0ZvcmNlJztcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfR1JBVklUWSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQmVoYXZpb3VyIHRoYXQgZm9yY2VzIHBhcnRpY2xlcyBkb3duIHRoZSB5IGF4aXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5IGV4dGVuZHMgRm9yY2Uge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIEdyYXZpdHkgYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3Jhdml0eSAtIHRoZSBmb3JjZSB0byBwdWxsIHRoZSBwYXJ0aWNsZSBkb3duIHRoZSB5IGF4aXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoZ3Jhdml0eSwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIoMCwgLWdyYXZpdHksIDAsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBncmF2aXR5LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IEdyYXZpdHkoZ3Jhdml0eSwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==