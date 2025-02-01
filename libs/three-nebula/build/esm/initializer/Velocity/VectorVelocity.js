import { Vector3D, createSpan } from '../../math';
import { DR } from '../../constants';
import Velocity from './Velocity';
import { INITIALIZER_TYPE_VECTOR_VELOCITY as type } from '../types';
/**
 * Sets the velocity property on initialized particles.
 *
 */

export default class VectorVelocity extends Velocity {
  /**
   * Constructs a VectorVelocity initializer.
   *
   * @param {Vector3D} vector3d - The directional vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(vector3d, theta, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc Velocity radius span.
     * @type {Span}
     */

    this.radiusPan = createSpan(1);
    /**
     * @desc Direction vector.
     * @type {Vector3D}
     */

    this.dir = vector3d.clone();
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
   * Creates a VectorVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.x - The velocity x axis direction
   * @param {number} json.y - The velocity y axis direction
   * @param {number} json.z - The velocity z axis direction
   * @param {number} json.theta - The velocity theta
   * @return {VectorVelocity}
   */


  static fromJSON(json) {
    const {
      x,
      y,
      z,
      theta,
      isEnabled = true
    } = json;
    return new VectorVelocity(new Vector3D(x, y, z), theta, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9WZWN0b3JWZWxvY2l0eS5qcyJdLCJuYW1lcyI6WyJWZWN0b3IzRCIsImNyZWF0ZVNwYW4iLCJEUiIsIlZlbG9jaXR5IiwiSU5JVElBTElaRVJfVFlQRV9WRUNUT1JfVkVMT0NJVFkiLCJ0eXBlIiwiVmVjdG9yVmVsb2NpdHkiLCJjb25zdHJ1Y3RvciIsInZlY3RvcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJyYWRpdXNQYW4iLCJkaXIiLCJjbG9uZSIsInRoYSIsIl91c2VWIiwiZnJvbUpTT04iLCJqc29uIiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxRQUFULEVBQW1CQyxVQUFuQixRQUFxQyxZQUFyQztBQUVBLFNBQVNDLEVBQVQsUUFBbUIsaUJBQW5CO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjtBQUNBLFNBQVNDLGdDQUFnQyxJQUFJQyxJQUE3QyxRQUF5RCxVQUF6RDtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsY0FBTixTQUE2QkgsUUFBN0IsQ0FBc0M7QUFDbkQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUksRUFBQUEsV0FBVyxDQUFDQyxRQUFELEVBQVdDLEtBQVgsRUFBa0JDLFNBQVMsR0FBRyxJQUE5QixFQUFvQztBQUM3QyxVQUFNTCxJQUFOLEVBQVlLLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxTQUFMLEdBQWlCVixVQUFVLENBQUMsQ0FBRCxDQUEzQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtXLEdBQUwsR0FBV0osUUFBUSxDQUFDSyxLQUFULEVBQVg7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxHQUFMLEdBQVdMLEtBQUssR0FBR1AsRUFBbkI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLYSxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNpQixTQUFSQyxRQUFRLENBQUNDLElBQUQsRUFBTztBQUNwQixVQUFNO0FBQUVDLE1BQUFBLENBQUY7QUFBS0MsTUFBQUEsQ0FBTDtBQUFRQyxNQUFBQSxDQUFSO0FBQVdYLE1BQUFBLEtBQVg7QUFBa0JDLE1BQUFBLFNBQVMsR0FBRztBQUE5QixRQUF1Q08sSUFBN0M7QUFFQSxXQUFPLElBQUlYLGNBQUosQ0FBbUIsSUFBSU4sUUFBSixDQUFha0IsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLENBQW5CLEVBQTBDWCxLQUExQyxFQUFpREMsU0FBakQsQ0FBUDtBQUNEOztBQWxEa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3IzRCwgY3JlYXRlU3BhbiB9IGZyb20gJy4uLy4uL21hdGgnO1xuXG5pbXBvcnQgeyBEUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSAnLi9WZWxvY2l0eSc7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX1ZFQ1RPUl9WRUxPQ0lUWSBhcyB0eXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFNldHMgdGhlIHZlbG9jaXR5IHByb3BlcnR5IG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvclZlbG9jaXR5IGV4dGVuZHMgVmVsb2NpdHkge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFZlY3RvclZlbG9jaXR5IGluaXRpYWxpemVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB2ZWN0b3IzZCAtIFRoZSBkaXJlY3Rpb25hbCB2ZWN0b3IgZm9yIHRoZSB2ZWxvY2l0eVxuICAgKiBAcGFyYW0ge251bWJlcn0gdGhldGEgLSBUaGUgdGhldGEgYW5nbGUgdG8gdXNlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IodmVjdG9yM2QsIHRoZXRhLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFZlbG9jaXR5IHJhZGl1cyBzcGFuLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzUGFuID0gY3JlYXRlU3BhbigxKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERpcmVjdGlvbiB2ZWN0b3IuXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMuZGlyID0gdmVjdG9yM2QuY2xvbmUoKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZXRhLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy50aGEgPSB0aGV0YSAqIERSO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHVzZSB0aGUgZGlyZWN0aW9uYWwgdmVjdG9yIG9yIG5vdC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl91c2VWID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgVmVjdG9yVmVsb2NpdHkgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ueCAtIFRoZSB2ZWxvY2l0eSB4IGF4aXMgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnkgLSBUaGUgdmVsb2NpdHkgeSBheGlzIGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi56IC0gVGhlIHZlbG9jaXR5IHogYXhpcyBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24udGhldGEgLSBUaGUgdmVsb2NpdHkgdGhldGFcbiAgICogQHJldHVybiB7VmVjdG9yVmVsb2NpdHl9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgeCwgeSwgeiwgdGhldGEsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvclZlbG9jaXR5KG5ldyBWZWN0b3IzRCh4LCB5LCB6KSwgdGhldGEsIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==