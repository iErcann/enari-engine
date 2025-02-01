import { DR } from '../../constants';
import { Polar3D } from '../../math';
import Velocity from './Velocity';
import { INITIALIZER_TYPE_POLAR_VELOCITY as type } from '../types';
/**
 * Sets the velocity property on initialized particles.
 *
 */

export default class PolarVelocity extends Velocity {
  /**
   * Constructs a PolarVelocity initializer.
   *
   * @param {Polar3D} polar3d - The polar vector for the velocity
   * @param {number} theta - The theta angle to use
   * @return void
   */
  constructor(polar3d, theta, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc Theta.
     * @type {number}
     */

    this.tha = theta * DR;
    /**
     * @desc Directional vector
     * @type {Vector3D}
     */

    this.dirVec = polar3d.toVector3D();
    /**
     * @desc Determines whether to use the directional vector or not.
     * @type {boolean}
     */

    this._useV = false;
  }
  /**
   * Creates a PolarVelocity initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @param {number} json.polarRadius - The Polar3D radius
   * @param {number} json.polarTheta - The Polar3D theta
   * @param {number} json.polarPhi - The Polar3D phi
   * @param {number} json.velocityTheta - The velocity theta
   * @return {PolarVelocity}
   */


  static fromJSON(json) {
    const {
      polarRadius,
      polarTheta,
      polarPhi,
      velocityTheta,
      isEnabled = true
    } = json;
    return new PolarVelocity(new Polar3D(polarRadius, polarTheta, polarPhi), velocityTheta, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9WZWxvY2l0eS9Qb2xhclZlbG9jaXR5LmpzIl0sIm5hbWVzIjpbIkRSIiwiUG9sYXIzRCIsIlZlbG9jaXR5IiwiSU5JVElBTElaRVJfVFlQRV9QT0xBUl9WRUxPQ0lUWSIsInR5cGUiLCJQb2xhclZlbG9jaXR5IiwiY29uc3RydWN0b3IiLCJwb2xhcjNkIiwidGhldGEiLCJpc0VuYWJsZWQiLCJ0aGEiLCJkaXJWZWMiLCJ0b1ZlY3RvcjNEIiwiX3VzZVYiLCJmcm9tSlNPTiIsImpzb24iLCJwb2xhclJhZGl1cyIsInBvbGFyVGhldGEiLCJwb2xhclBoaSIsInZlbG9jaXR5VGhldGEiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLEVBQVQsUUFBbUIsaUJBQW5CO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixZQUF4QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsWUFBckI7QUFDQSxTQUFTQywrQkFBK0IsSUFBSUMsSUFBNUMsUUFBd0QsVUFBeEQ7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLGFBQU4sU0FBNEJILFFBQTVCLENBQXFDO0FBQ2xEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VJLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQWlCQyxTQUFTLEdBQUcsSUFBN0IsRUFBbUM7QUFDNUMsVUFBTUwsSUFBTixFQUFZSyxTQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0MsR0FBTCxHQUFXRixLQUFLLEdBQUdSLEVBQW5CO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS1csTUFBTCxHQUFjSixPQUFPLENBQUNLLFVBQVIsRUFBZDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2lCLFNBQVJDLFFBQVEsQ0FBQ0MsSUFBRCxFQUFPO0FBQ3BCLFVBQU07QUFDSkMsTUFBQUEsV0FESTtBQUVKQyxNQUFBQSxVQUZJO0FBR0pDLE1BQUFBLFFBSEk7QUFJSkMsTUFBQUEsYUFKSTtBQUtKVixNQUFBQSxTQUFTLEdBQUc7QUFMUixRQU1GTSxJQU5KO0FBUUEsV0FBTyxJQUFJVixhQUFKLENBQ0wsSUFBSUosT0FBSixDQUFZZSxXQUFaLEVBQXlCQyxVQUF6QixFQUFxQ0MsUUFBckMsQ0FESyxFQUVMQyxhQUZLLEVBR0xWLFNBSEssQ0FBUDtBQUtEOztBQXREaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEUiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBQb2xhcjNEIH0gZnJvbSAnLi4vLi4vbWF0aCc7XG5pbXBvcnQgVmVsb2NpdHkgZnJvbSAnLi9WZWxvY2l0eSc7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX1BPTEFSX1ZFTE9DSVRZIGFzIHR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgdmVsb2NpdHkgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXJWZWxvY2l0eSBleHRlbmRzIFZlbG9jaXR5IHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBQb2xhclZlbG9jaXR5IGluaXRpYWxpemVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1BvbGFyM0R9IHBvbGFyM2QgLSBUaGUgcG9sYXIgdmVjdG9yIGZvciB0aGUgdmVsb2NpdHlcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRoZXRhIC0gVGhlIHRoZXRhIGFuZ2xlIHRvIHVzZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBvbGFyM2QsIHRoZXRhLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZXRhLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy50aGEgPSB0aGV0YSAqIERSO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGlyZWN0aW9uYWwgdmVjdG9yXG4gICAgICogQHR5cGUge1ZlY3RvcjNEfVxuICAgICAqL1xuICAgIHRoaXMuZGlyVmVjID0gcG9sYXIzZC50b1ZlY3RvcjNEKCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gdXNlIHRoZSBkaXJlY3Rpb25hbCB2ZWN0b3Igb3Igbm90LlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuX3VzZVYgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUG9sYXJWZWxvY2l0eSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi5wb2xhclJhZGl1cyAtIFRoZSBQb2xhcjNEIHJhZGl1c1xuICAgKiBAcGFyYW0ge251bWJlcn0ganNvbi5wb2xhclRoZXRhIC0gVGhlIFBvbGFyM0QgdGhldGFcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24ucG9sYXJQaGkgLSBUaGUgUG9sYXIzRCBwaGlcbiAgICogQHBhcmFtIHtudW1iZXJ9IGpzb24udmVsb2NpdHlUaGV0YSAtIFRoZSB2ZWxvY2l0eSB0aGV0YVxuICAgKiBAcmV0dXJuIHtQb2xhclZlbG9jaXR5fVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7XG4gICAgICBwb2xhclJhZGl1cyxcbiAgICAgIHBvbGFyVGhldGEsXG4gICAgICBwb2xhclBoaSxcbiAgICAgIHZlbG9jaXR5VGhldGEsXG4gICAgICBpc0VuYWJsZWQgPSB0cnVlLFxuICAgIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBQb2xhclZlbG9jaXR5KFxuICAgICAgbmV3IFBvbGFyM0QocG9sYXJSYWRpdXMsIHBvbGFyVGhldGEsIHBvbGFyUGhpKSxcbiAgICAgIHZlbG9jaXR5VGhldGEsXG4gICAgICBpc0VuYWJsZWRcbiAgICApO1xuICB9XG59XG4iXX0=