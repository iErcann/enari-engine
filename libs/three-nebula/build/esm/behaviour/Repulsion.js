import Attraction from './Attraction';
import { Vector3D } from '../math';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_REPULSION as type } from './types';
/**
 * Behaviour that causes particles to be repelled from a target position.
 *
 */

export default class Repulsion extends Attraction {
  /**
   * Constructs an Repulsion behaviour instance.
   *
   * @param {Vector3D} targetPosition - The position the particles will be repelled from
   * @param {number} force - The repulsion force scalar multiplier
   * @param {number} radius - The repulsion radius
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  constructor(targetPosition, force, radius, life, easing, isEnabled = true) {
    super(targetPosition, force, radius, life, easing, isEnabled);
    /**
     * @desc Repulsion is attraction with negative force.
     * @type {number}
     */

    this.force *= -1;
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
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


  reset(targetPosition, force, radius, life, easing) {
    super.reset(targetPosition, force, radius, life, easing);
    this.force *= -1;
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


  static fromJSON(json) {
    const {
      x,
      y,
      z,
      force,
      radius,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Repulsion(new Vector3D(x, y, z), force, radius, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUmVwdWxzaW9uLmpzIl0sIm5hbWVzIjpbIkF0dHJhY3Rpb24iLCJWZWN0b3IzRCIsImdldEVhc2luZ0J5TmFtZSIsIkJFSEFWSU9VUl9UWVBFX1JFUFVMU0lPTiIsInR5cGUiLCJSZXB1bHNpb24iLCJjb25zdHJ1Y3RvciIsInRhcmdldFBvc2l0aW9uIiwiZm9yY2UiLCJyYWRpdXMiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJmcm9tSlNPTiIsImpzb24iLCJ4IiwieSIsInoiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFVBQVAsTUFBdUIsY0FBdkI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFNBQXpCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxTQUFoQztBQUNBLFNBQVNDLHdCQUF3QixJQUFJQyxJQUFyQyxRQUFpRCxTQUFqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkwsVUFBeEIsQ0FBbUM7QUFDaEQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRU0sRUFBQUEsV0FBVyxDQUFDQyxjQUFELEVBQWlCQyxLQUFqQixFQUF3QkMsTUFBeEIsRUFBZ0NDLElBQWhDLEVBQXNDQyxNQUF0QyxFQUE4Q0MsU0FBUyxHQUFHLElBQTFELEVBQWdFO0FBQ3pFLFVBQU1MLGNBQU4sRUFBc0JDLEtBQXRCLEVBQTZCQyxNQUE3QixFQUFxQ0MsSUFBckMsRUFBMkNDLE1BQTNDLEVBQW1EQyxTQUFuRDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtKLEtBQUwsSUFBYyxDQUFDLENBQWY7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRVMsRUFBQUEsS0FBSyxDQUFDTixjQUFELEVBQWlCQyxLQUFqQixFQUF3QkMsTUFBeEIsRUFBZ0NDLElBQWhDLEVBQXNDQyxNQUF0QyxFQUE4QztBQUNqRCxVQUFNRSxLQUFOLENBQVlOLGNBQVosRUFBNEJDLEtBQTVCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsSUFBM0MsRUFBaURDLE1BQWpEO0FBQ0EsU0FBS0gsS0FBTCxJQUFjLENBQUMsQ0FBZjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUk0sUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFQyxNQUFBQSxDQUFGO0FBQUtDLE1BQUFBLENBQUw7QUFBUUMsTUFBQUEsQ0FBUjtBQUFXVixNQUFBQSxLQUFYO0FBQWtCQyxNQUFBQSxNQUFsQjtBQUEwQkMsTUFBQUEsSUFBMUI7QUFBZ0NDLE1BQUFBLE1BQWhDO0FBQXdDQyxNQUFBQSxTQUFTLEdBQUc7QUFBcEQsUUFBNkRHLElBQW5FO0FBRUEsV0FBTyxJQUFJVixTQUFKLENBQ0wsSUFBSUosUUFBSixDQUFhZSxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsQ0FESyxFQUVMVixLQUZLLEVBR0xDLE1BSEssRUFJTEMsSUFKSyxFQUtMUixlQUFlLENBQUNTLE1BQUQsQ0FMVixFQU1MQyxTQU5LLENBQVA7QUFRRDs7QUFqRStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSAnLi9BdHRyYWN0aW9uJztcbmltcG9ydCB7IFZlY3RvcjNEIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBnZXRFYXNpbmdCeU5hbWUgfSBmcm9tICcuLi9lYXNlJztcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1JFUFVMU0lPTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG4vKipcbiAqIEJlaGF2aW91ciB0aGF0IGNhdXNlcyBwYXJ0aWNsZXMgdG8gYmUgcmVwZWxsZWQgZnJvbSBhIHRhcmdldCBwb3NpdGlvbi5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHVsc2lvbiBleHRlbmRzIEF0dHJhY3Rpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhbiBSZXB1bHNpb24gYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiB0aGUgcGFydGljbGVzIHdpbGwgYmUgcmVwZWxsZWQgZnJvbVxuICAgKiBAcGFyYW0ge251bWJlcn0gZm9yY2UgLSBUaGUgcmVwdWxzaW9uIGZvcmNlIHNjYWxhciBtdWx0aXBsaWVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXMgLSBUaGUgcmVwdWxzaW9uIHJhZGl1c1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFJlcHVsc2lvbiBpcyBhdHRyYWN0aW9uIHdpdGggbmVnYXRpdmUgZm9yY2UuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yM0R9IHRhcmdldFBvc2l0aW9uIC0gdGhlIHBvc2l0aW9uIHRoZSBwYXJ0aWNsZXMgd2lsbCBiZSBhdHRyYWN0ZWQgdG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZvcmNlIC0gdGhlIGF0dHJhY3Rpb24gZm9yY2UgbXVsdGlwbGllclxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzIC0gdGhlIGF0dHJhY3Rpb24gcmFkaXVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBCb2R5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnggLSBUaGUgdGFyZ2V0IHBvc2l0aW9uIHggdmFsdWVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ueSAtIFRoZSB0YXJnZXQgcG9zaXRpb24geSB2YWx1ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi56IC0gVGhlIHRhcmdldCBwb3NpdGlvbiB6IHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmZvcmNlIC0gVGhlIGF0dHJhY3Rpb24gZm9yY2Ugc2NhbGFyIG11bHRpcGxpZXJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ubGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcHJvcGVydHkge3N0cmluZ30ganNvbi5lYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHJldHVybiB7Qm9keX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyB4LCB5LCB6LCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFJlcHVsc2lvbihcbiAgICAgIG5ldyBWZWN0b3IzRCh4LCB5LCB6KSxcbiAgICAgIGZvcmNlLFxuICAgICAgcmFkaXVzLFxuICAgICAgbGlmZSxcbiAgICAgIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19