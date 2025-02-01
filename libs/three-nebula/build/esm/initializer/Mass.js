import Initializer from './Initializer';
import { createSpan } from '../math';
import { INITIALIZER_TYPE_MASS as type } from './types';
/**
 * Sets the mass property on initialized particles.
 *
 */

export default class Mass extends Initializer {
  /**
   * Constructs a Mass initializer instance.
   *
   * @param {number} min - The minumum mass for the particle
   * @param {number} max - The maximum mass for the particle
   * @param {boolean} [center] - Determines whether to average the mass value
   * @return void
   */
  constructor(min, max, center = false, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The mass span which is used to set the particle mass value.
     * @type {Span}
     */

    this.massPan = createSpan(min, max, center);
  }
  /**
   * Sets the particle's initial mass.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    particle.mass = this.massPan.getValue();
  }
  /**
   * Creates a Mass initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.min - The minimum mass
   * @property {number} json.max - The maximum mass
   * @property {number} json.center - The center of the mass
   * @return {Mass}
   */


  static fromJSON(json) {
    const {
      min,
      max,
      center = false,
      isEnabled = true
    } = json;
    return new Mass(min, max, center, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9NYXNzLmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpemVyIiwiY3JlYXRlU3BhbiIsIklOSVRJQUxJWkVSX1RZUEVfTUFTUyIsInR5cGUiLCJNYXNzIiwiY29uc3RydWN0b3IiLCJtaW4iLCJtYXgiLCJjZW50ZXIiLCJpc0VuYWJsZWQiLCJtYXNzUGFuIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwibWFzcyIsImdldFZhbHVlIiwiZnJvbUpTT04iLCJqc29uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGVBQXhCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixTQUEzQjtBQUNBLFNBQVNDLHFCQUFxQixJQUFJQyxJQUFsQyxRQUE4QyxTQUE5QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsSUFBTixTQUFtQkosV0FBbkIsQ0FBK0I7QUFDNUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFNLEdBQUcsS0FBcEIsRUFBMkJDLFNBQVMsR0FBRyxJQUF2QyxFQUE2QztBQUN0RCxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxPQUFMLEdBQWVULFVBQVUsQ0FBQ0ssR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsQ0FBekI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VHLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CQSxJQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0IsS0FBS0gsT0FBTCxDQUFhSSxRQUFiLEVBQWhCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNpQixTQUFSQyxRQUFRLENBQUNDLElBQUQsRUFBTztBQUNwQixVQUFNO0FBQUVWLE1BQUFBLEdBQUY7QUFBT0MsTUFBQUEsR0FBUDtBQUFZQyxNQUFBQSxNQUFNLEdBQUcsS0FBckI7QUFBNEJDLE1BQUFBLFNBQVMsR0FBRztBQUF4QyxRQUFpRE8sSUFBdkQ7QUFFQSxXQUFPLElBQUlaLElBQUosQ0FBU0UsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxNQUFuQixFQUEyQkMsU0FBM0IsQ0FBUDtBQUNEOztBQTFDMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XG5pbXBvcnQgeyBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX01BU1MgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hc3MgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzcyBleHRlbmRzIEluaXRpYWxpemVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBNYXNzIGluaXRpYWxpemVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWluIC0gVGhlIG1pbnVtdW0gbWFzcyBmb3IgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXggLSBUaGUgbWF4aW11bSBtYXNzIGZvciB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtib29sZWFufSBbY2VudGVyXSAtIERldGVybWluZXMgd2hldGhlciB0byBhdmVyYWdlIHRoZSBtYXNzIHZhbHVlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IobWluLCBtYXgsIGNlbnRlciA9IGZhbHNlLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBtYXNzIHNwYW4gd2hpY2ggaXMgdXNlZCB0byBzZXQgdGhlIHBhcnRpY2xlIG1hc3MgdmFsdWUuXG4gICAgICogQHR5cGUge1NwYW59XG4gICAgICovXG4gICAgdGhpcy5tYXNzUGFuID0gY3JlYXRlU3BhbihtaW4sIG1heCwgY2VudGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwYXJ0aWNsZSdzIGluaXRpYWwgbWFzcy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUubWFzcyA9IHRoaXMubWFzc1Bhbi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBNYXNzIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLm1pbiAtIFRoZSBtaW5pbXVtIG1hc3NcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ubWF4IC0gVGhlIG1heGltdW0gbWFzc1xuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5jZW50ZXIgLSBUaGUgY2VudGVyIG9mIHRoZSBtYXNzXG4gICAqIEByZXR1cm4ge01hc3N9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgbWluLCBtYXgsIGNlbnRlciA9IGZhbHNlLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBNYXNzKG1pbiwgbWF4LCBjZW50ZXIsIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==