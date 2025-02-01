import { Vector3D, createSpan } from '../../math';
import { DR } from '../../constants';
import Velocity from './Velocity';
import { INITIALIZER_TYPE_RADIAL_VELOCITY as type } from '../types';
/**
 * Sets the velocity property on initialized particles.
 *
 */

export default class RadialVelocity extends Velocity {
  /**
   * Constructs a RadialVelocity initializer.
   *
   * @param {number|Span} radius - The velocity radius
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(radius, vector3d, theta, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc Velocity radius span.
     * @type {Span}
     */

    this.radiusPan = createSpan(radius);
    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */

    this.dir = vector3d.clone().normalize();
    /**
     * @desc Theta.
     * @type {number}
     */

    this.tha = theta * DR;
    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */

    this._useV = true;
  }
  /**
   * Creates a RadialVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.radius - The velocity radius
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {RadialVelocity}
   */


  static fromJSON(json) {
    const {
      radius,
      x,
      y,
      z,
      theta,
      isEnabled = true
    } = json;
    return new RadialVelocity(radius, new Vector3D(x, y, z), theta, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9SYWRpYWxWZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJWZWN0b3IzRCIsImNyZWF0ZVNwYW4iLCJEUiIsIlZlbG9jaXR5IiwiSU5JVElBTElaRVJfVFlQRV9SQURJQUxfVkVMT0NJVFkiLCJ0eXBlIiwiUmFkaWFsVmVsb2NpdHkiLCJjb25zdHJ1Y3RvciIsInJhZGl1cyIsInZlY3RvcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJyYWRpdXNQYW4iLCJkaXIiLCJjbG9uZSIsIm5vcm1hbGl6ZSIsInRoYSIsIl91c2VWIiwiZnJvbUpTT04iLCJqc29uIiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxRQUFULEVBQW1CQyxVQUFuQixRQUFxQyxZQUFyQztBQUVBLFNBQVNDLEVBQVQsUUFBbUIsaUJBQW5CO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjtBQUNBLFNBQVNDLGdDQUFnQyxJQUFJQyxJQUE3QyxRQUF5RCxVQUF6RDtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsY0FBTixTQUE2QkgsUUFBN0IsQ0FBc0M7QUFDbkQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSSxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsUUFBVCxFQUFtQkMsS0FBbkIsRUFBMEJDLFNBQVMsR0FBRyxJQUF0QyxFQUE0QztBQUNyRCxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxTQUFMLEdBQWlCWCxVQUFVLENBQUNPLE1BQUQsQ0FBM0I7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSyxHQUFMLEdBQVdKLFFBQVEsQ0FBQ0ssS0FBVCxHQUFpQkMsU0FBakIsRUFBWDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLEdBQUwsR0FBV04sS0FBSyxHQUFHUixFQUFuQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtlLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkMsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFWCxNQUFBQSxNQUFGO0FBQVVZLE1BQUFBLENBQVY7QUFBYUMsTUFBQUEsQ0FBYjtBQUFnQkMsTUFBQUEsQ0FBaEI7QUFBbUJaLE1BQUFBLEtBQW5CO0FBQTBCQyxNQUFBQSxTQUFTLEdBQUc7QUFBdEMsUUFBK0NRLElBQXJEO0FBRUEsV0FBTyxJQUFJYixjQUFKLENBQW1CRSxNQUFuQixFQUEyQixJQUFJUixRQUFKLENBQWFvQixDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsQ0FBM0IsRUFBa0RaLEtBQWxELEVBQXlEQyxTQUF6RCxDQUFQO0FBQ0Q7O0FBcERrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlY3RvcjNELCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vLi4vbWF0aCc7XG5cbmltcG9ydCB7IERSIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJztcbmltcG9ydCBWZWxvY2l0eSBmcm9tICcuL1ZlbG9jaXR5JztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfUkFESUFMX1ZFTE9DSVRZIGFzIHR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgdmVsb2NpdHkgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaWFsVmVsb2NpdHkgZXh0ZW5kcyBWZWxvY2l0eSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgUmFkaWFsVmVsb2NpdHkgaW5pdGlhbGl6ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfFNwYW59IHJhZGl1cyAtIFRoZSB2ZWxvY2l0eSByYWRpdXNcbiAgICogQHBhcmFtIHtWZWN0b3IzRH0gdmVjdG9yM2QgLSBUaGUgZGlyZWN0aW9uYWwgdmVjdG9yIGZvciB0aGUgdmVsb2NpdHlcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRoZXRhIC0gVGhlIHRoZXRhIGFuZ2xlIHRvIHVzZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJhZGl1cywgdmVjdG9yM2QsIHRoZXRhLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFZlbG9jaXR5IHJhZGl1cyBzcGFuLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzUGFuID0gY3JlYXRlU3BhbihyYWRpdXMpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGlyZWN0aW9uIHZlY3Rvci5cbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5kaXIgPSB2ZWN0b3IzZC5jbG9uZSgpLm5vcm1hbGl6ZSgpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhldGEuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnRoYSA9IHRoZXRhICogRFI7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIHRoZSBkaXJlY3Rpb25hbCB2ZWN0b3Igb3Igbm90LlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuX3VzZVYgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSYWRpYWxWZWxvY2l0eSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi5yYWRpdXMgLSBUaGUgdmVsb2NpdHkgcmFkaXVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnggLSBUaGUgdmVsb2NpdHkgeCBheGlzIGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi55IC0gVGhlIHZlbG9jaXR5IHkgYXhpcyBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueiAtIFRoZSB2ZWxvY2l0eSB6IGF4aXMgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnRoZXRhIC0gVGhlIHZlbG9jaXR5IHRoZXRhXG4gICAqIEByZXR1cm4ge1JhZGlhbFZlbG9jaXR5fVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IHJhZGl1cywgeCwgeSwgeiwgdGhldGEsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFJhZGlhbFZlbG9jaXR5KHJhZGl1cywgbmV3IFZlY3RvcjNEKHgsIHksIHopLCB0aGV0YSwgaXNFbmFibGVkKTtcbiAgfVxufVxuIl19