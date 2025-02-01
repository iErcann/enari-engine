import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
const _excluded = ["zoneType"];
import * as Zone from '../zone';
import Initializer from './Initializer';
import { SUPPORTED_JSON_ZONE_TYPES } from '../core/constants';
import { INITIALIZER_TYPE_POSITION as type } from './types';
/**
 * Sets the starting position property for initialized particles.
 * This is derived from a zone randomly chosen from those supplied to the constructor.
 *
 */

export default class Position extends Initializer {
  /**
   * Constructs a Position initializer instance.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */
  constructor() {
    super(type);
    this.reset.apply(this, arguments);
  }
  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */


  reset() {
    if (!this.zones) {
      this.zones = [];
    } else {
      this.zones.length = 0;
    }
    /**
     * @desc The zones to use as bounds for calculating the particle's starting position.
     * @type {array<Zone>}
     */


    this.zones = this.zones.concat(Array.prototype.slice.call(arguments));
  }
  /**
   * Adds a zone or zones to this.zones.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */


  addZone() {
    this.zones = this.zones.concat(Array.prototype.slice.call(arguments));
  }
  /**
   * Creates a Position initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {string} json.zoneType - The type of zone to use for initial position
   * @return {Position}
   */


  static fromJSON(json) {
    const {
      zoneType
    } = json,
          params = _objectWithoutProperties(json, _excluded);

    if (!SUPPORTED_JSON_ZONE_TYPES.includes(zoneType)) {
      throw new Error(`The zone type ${zoneType} is invalid or not yet supported`);
    }

    return new Position(new Zone[zoneType](...Object.values(params)));
  }

}
/**
 * Sets the particle's initial position.
 *
 * @param {Particle} particle - the particle to initialize the property on
 * @return void
 */

Position.prototype.initialize = function () {
  let zone;
  return function (target) {
    zone = this.zones[Math.random() * this.zones.length >> 0];
    zone.getPosition();
    target.position.x = zone.vector.x;
    target.position.y = zone.vector.y;
    target.position.z = zone.vector.z;
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Qb3NpdGlvbi5qcyJdLCJuYW1lcyI6WyJab25lIiwiSW5pdGlhbGl6ZXIiLCJTVVBQT1JURURfSlNPTl9aT05FX1RZUEVTIiwiSU5JVElBTElaRVJfVFlQRV9QT1NJVElPTiIsInR5cGUiLCJQb3NpdGlvbiIsImNvbnN0cnVjdG9yIiwicmVzZXQiLCJhcHBseSIsImFyZ3VtZW50cyIsInpvbmVzIiwibGVuZ3RoIiwiY29uY2F0IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJhZGRab25lIiwiZnJvbUpTT04iLCJqc29uIiwiem9uZVR5cGUiLCJwYXJhbXMiLCJpbmNsdWRlcyIsIkVycm9yIiwiT2JqZWN0IiwidmFsdWVzIiwiaW5pdGlhbGl6ZSIsInpvbmUiLCJ0YXJnZXQiLCJNYXRoIiwicmFuZG9tIiwiZ2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJ2ZWN0b3IiLCJ5IiwieiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEtBQUtBLElBQVosTUFBc0IsU0FBdEI7QUFFQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0MseUJBQVQsUUFBMEMsbUJBQTFDO0FBQ0EsU0FBU0MseUJBQXlCLElBQUlDLElBQXRDLFFBQWtELFNBQWxEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLFFBQU4sU0FBdUJKLFdBQXZCLENBQW1DO0FBQ2hEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLEdBQUc7QUFDWixVQUFNRixJQUFOO0FBRUEsU0FBS0csS0FBTCxDQUFXQyxLQUFYLENBQWlCLElBQWpCLEVBQXVCQyxTQUF2QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRixFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJLENBQUMsS0FBS0csS0FBVixFQUFpQjtBQUNmLFdBQUtBLEtBQUwsR0FBYSxFQUFiO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0EsS0FBTCxDQUFXQyxNQUFYLEdBQW9CLENBQXBCO0FBQ0Q7QUFFRDtBQUNKO0FBQ0E7QUFDQTs7O0FBQ0ksU0FBS0QsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV0UsTUFBWCxDQUFrQkMsS0FBSyxDQUFDQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJQLFNBQTNCLENBQWxCLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VRLEVBQUFBLE9BQU8sR0FBRztBQUNSLFNBQUtQLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVdFLE1BQVgsQ0FBa0JDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCUCxTQUEzQixDQUFsQixDQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJTLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFBRUMsTUFBQUE7QUFBRixRQUEwQkQsSUFBaEM7QUFBQSxVQUFxQkUsTUFBckIsNEJBQWdDRixJQUFoQzs7QUFFQSxRQUFJLENBQUNqQix5QkFBeUIsQ0FBQ29CLFFBQTFCLENBQW1DRixRQUFuQyxDQUFMLEVBQW1EO0FBQ2pELFlBQU0sSUFBSUcsS0FBSixDQUNILGlCQUFnQkgsUUFBUyxrQ0FEdEIsQ0FBTjtBQUdEOztBQUVELFdBQU8sSUFBSWYsUUFBSixDQUFhLElBQUlMLElBQUksQ0FBQ29CLFFBQUQsQ0FBUixDQUFtQixHQUFHSSxNQUFNLENBQUNDLE1BQVAsQ0FBY0osTUFBZCxDQUF0QixDQUFiLENBQVA7QUFDRDs7QUE3RCtDO0FBZ0VsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FoQixRQUFRLENBQUNTLFNBQVQsQ0FBbUJZLFVBQW5CLEdBQWlDLFlBQVc7QUFDMUMsTUFBSUMsSUFBSjtBQUVBLFNBQU8sVUFBU0MsTUFBVCxFQUFpQjtBQUN0QkQsSUFBQUEsSUFBSSxHQUFHLEtBQUtqQixLQUFMLENBQVltQixJQUFJLENBQUNDLE1BQUwsS0FBZ0IsS0FBS3BCLEtBQUwsQ0FBV0MsTUFBNUIsSUFBdUMsQ0FBbEQsQ0FBUDtBQUVBZ0IsSUFBQUEsSUFBSSxDQUFDSSxXQUFMO0FBRUFILElBQUFBLE1BQU0sQ0FBQ0ksUUFBUCxDQUFnQkMsQ0FBaEIsR0FBb0JOLElBQUksQ0FBQ08sTUFBTCxDQUFZRCxDQUFoQztBQUNBTCxJQUFBQSxNQUFNLENBQUNJLFFBQVAsQ0FBZ0JHLENBQWhCLEdBQW9CUixJQUFJLENBQUNPLE1BQUwsQ0FBWUMsQ0FBaEM7QUFDQVAsSUFBQUEsTUFBTSxDQUFDSSxRQUFQLENBQWdCSSxDQUFoQixHQUFvQlQsSUFBSSxDQUFDTyxNQUFMLENBQVlFLENBQWhDO0FBQ0QsR0FSRDtBQVNELENBWitCLEVBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgWm9uZSBmcm9tICcuLi96b25lJztcblxuaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgU1VQUE9SVEVEX0pTT05fWk9ORV9UWVBFUyB9IGZyb20gJy4uL2NvcmUvY29uc3RhbnRzJztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfUE9TSVRJT04gYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIHByb3BlcnR5IGZvciBpbml0aWFsaXplZCBwYXJ0aWNsZXMuXG4gKiBUaGlzIGlzIGRlcml2ZWQgZnJvbSBhIHpvbmUgcmFuZG9tbHkgY2hvc2VuIGZyb20gdGhvc2Ugc3VwcGxpZWQgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24gZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgUG9zaXRpb24gaW5pdGlhbGl6ZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZXxhcnJheTxab25lPn1cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih0eXBlKTtcblxuICAgIHRoaXMucmVzZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGluaXRpYWxpemVyIHByb3BlcnRpZXMuXG4gICAqIENsZWFycyBhbGwgcHJldmlvdXNseSBzZXQgem9uZXMgYW5kIHJlc2V0cyB0aGUgem9uZXMgYWNjb3JkaW5nIHRvIGFyZ3MgcGFzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1pvbmV8YXJyYXk8Wm9uZT59XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgaWYgKCF0aGlzLnpvbmVzKSB7XG4gICAgICB0aGlzLnpvbmVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9uZXMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgem9uZXMgdG8gdXNlIGFzIGJvdW5kcyBmb3IgY2FsY3VsYXRpbmcgdGhlIHBhcnRpY2xlJ3Mgc3RhcnRpbmcgcG9zaXRpb24uXG4gICAgICogQHR5cGUge2FycmF5PFpvbmU+fVxuICAgICAqL1xuICAgIHRoaXMuem9uZXMgPSB0aGlzLnpvbmVzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgem9uZSBvciB6b25lcyB0byB0aGlzLnpvbmVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1pvbmV8YXJyYXk8Wm9uZT59XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgYWRkWm9uZSgpIHtcbiAgICB0aGlzLnpvbmVzID0gdGhpcy56b25lcy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFBvc2l0aW9uIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBqc29uLnpvbmVUeXBlIC0gVGhlIHR5cGUgb2Ygem9uZSB0byB1c2UgZm9yIGluaXRpYWwgcG9zaXRpb25cbiAgICogQHJldHVybiB7UG9zaXRpb259XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgem9uZVR5cGUsIC4uLnBhcmFtcyB9ID0ganNvbjtcblxuICAgIGlmICghU1VQUE9SVEVEX0pTT05fWk9ORV9UWVBFUy5pbmNsdWRlcyh6b25lVHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRoZSB6b25lIHR5cGUgJHt6b25lVHlwZX0gaXMgaW52YWxpZCBvciBub3QgeWV0IHN1cHBvcnRlZGBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihuZXcgWm9uZVt6b25lVHlwZV0oLi4uT2JqZWN0LnZhbHVlcyhwYXJhbXMpKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBwYXJ0aWNsZSdzIGluaXRpYWwgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cbiAqIEByZXR1cm4gdm9pZFxuICovXG5Qb3NpdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IHpvbmU7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHpvbmUgPSB0aGlzLnpvbmVzWyhNYXRoLnJhbmRvbSgpICogdGhpcy56b25lcy5sZW5ndGgpID4+IDBdO1xuXG4gICAgem9uZS5nZXRQb3NpdGlvbigpO1xuXG4gICAgdGFyZ2V0LnBvc2l0aW9uLnggPSB6b25lLnZlY3Rvci54O1xuICAgIHRhcmdldC5wb3NpdGlvbi55ID0gem9uZS52ZWN0b3IueTtcbiAgICB0YXJnZXQucG9zaXRpb24ueiA9IHpvbmUudmVjdG9yLno7XG4gIH07XG59KSgpO1xuIl19