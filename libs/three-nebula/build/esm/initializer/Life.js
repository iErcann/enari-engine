import Initializer from './Initializer';
import { createSpan } from '../math';
import { INITIALIZER_TYPE_LIFE as type } from './types';
/**
 * Sets the life property on initialized particles.
 *
 */

export default class Life extends Initializer {
  /**
   * Constructs a Life property instance.
   *
   * @param {number} min - The minimum life
   * @param {number} max - The maximum life
   * @param {boolean} [center] - Determines whether to average the life value
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
   * @return void
   */
  constructor(min, max, center, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The life span of the particle.
     * @type {Span}
     */

    this.lifePan = createSpan(min, max, center);
  }
  /**
   * Sets the particle's initial life.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    if (this.lifePan.a == Infinity || this.lifePan.a == 'infi') {
      particle.life = Infinity;
    } else {
      particle.life = this.lifePan.getValue();
    }
  }
  /**
   * Creates a Life initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.min - The minimum life time
   * @param {number} json.max - The maximum life time
   * @param {number} json.center - The center of the life time
   * @param {boolean} [json.isEnabled=true] - Determines if the initializer should be enabled or not
   * @return {Life}
   */


  static fromJSON(json) {
    const {
      min,
      max,
      center = false,
      isEnabled = true
    } = json;
    return new Life(min, max, center, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9MaWZlLmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpemVyIiwiY3JlYXRlU3BhbiIsIklOSVRJQUxJWkVSX1RZUEVfTElGRSIsInR5cGUiLCJMaWZlIiwiY29uc3RydWN0b3IiLCJtaW4iLCJtYXgiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJsaWZlUGFuIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiYSIsIkluZmluaXR5IiwibGlmZSIsImdldFZhbHVlIiwiZnJvbUpTT04iLCJqc29uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixTQUEzQjtBQUNBLFNBQVNDLHFCQUFxQixJQUFJQyxJQUFsQyxRQUE4QyxTQUE5QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsSUFBTixTQUFtQkosV0FBbkIsQ0FBK0I7QUFDNUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VLLEVBQUFBLFdBQVcsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLFNBQVMsR0FBRyxJQUEvQixFQUFxQztBQUM5QyxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxPQUFMLEdBQWVULFVBQVUsQ0FBQ0ssR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsQ0FBekI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CLFFBQUksS0FBS0YsT0FBTCxDQUFhRyxDQUFiLElBQWtCQyxRQUFsQixJQUE4QixLQUFLSixPQUFMLENBQWFHLENBQWIsSUFBa0IsTUFBcEQsRUFBNEQ7QUFDMURELE1BQUFBLFFBQVEsQ0FBQ0csSUFBVCxHQUFnQkQsUUFBaEI7QUFDRCxLQUZELE1BRU87QUFDTEYsTUFBQUEsUUFBUSxDQUFDRyxJQUFULEdBQWdCLEtBQUtMLE9BQUwsQ0FBYU0sUUFBYixFQUFoQjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJDLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRVosTUFBQUEsR0FBRjtBQUFPQyxNQUFBQSxHQUFQO0FBQVlDLE1BQUFBLE1BQU0sR0FBRyxLQUFyQjtBQUE0QkMsTUFBQUEsU0FBUyxHQUFHO0FBQXhDLFFBQWlEUyxJQUF2RDtBQUVBLFdBQU8sSUFBSWQsSUFBSixDQUFTRSxHQUFULEVBQWNDLEdBQWQsRUFBbUJDLE1BQW5CLEVBQTJCQyxTQUEzQixDQUFQO0FBQ0Q7O0FBaEQyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcbmltcG9ydCB7IGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfTElGRSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlmZSBwcm9wZXJ0eSBvbiBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgSW5pdGlhbGl6ZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIExpZmUgcHJvcGVydHkgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSBUaGUgbWluaW11bSBsaWZlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXggLSBUaGUgbWF4aW11bSBsaWZlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NlbnRlcl0gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXZlcmFnZSB0aGUgbGlmZSB2YWx1ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBpbml0aWFsaXplciBzaG91bGQgYmUgZW5hYmxlZCBvciBub3RcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtaW4sIG1heCwgY2VudGVyLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBsaWZlIHNwYW4gb2YgdGhlIHBhcnRpY2xlLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMubGlmZVBhbiA9IGNyZWF0ZVNwYW4obWluLCBtYXgsIGNlbnRlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFydGljbGUncyBpbml0aWFsIGxpZmUuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmxpZmVQYW4uYSA9PSBJbmZpbml0eSB8fCB0aGlzLmxpZmVQYW4uYSA9PSAnaW5maScpIHtcbiAgICAgIHBhcnRpY2xlLmxpZmUgPSBJbmZpbml0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUubGlmZSA9IHRoaXMubGlmZVBhbi5nZXRWYWx1ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgTGlmZSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi5taW4gLSBUaGUgbWluaW11bSBsaWZlIHRpbWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ubWF4IC0gVGhlIG1heGltdW0gbGlmZSB0aW1lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLmNlbnRlciAtIFRoZSBjZW50ZXIgb2YgdGhlIGxpZmUgdGltZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtqc29uLmlzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGluaXRpYWxpemVyIHNob3VsZCBiZSBlbmFibGVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHtMaWZlfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IG1pbiwgbWF4LCBjZW50ZXIgPSBmYWxzZSwgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgTGlmZShtaW4sIG1heCwgY2VudGVyLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=