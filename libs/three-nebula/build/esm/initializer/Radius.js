import Initializer from './Initializer';
import { createSpan } from '../math';
import { INITIALIZER_TYPE_RADIUS as type } from './types';
/**
 * Sets the radius property on initialized particles.
 *
 */

export default class Radius extends Initializer {
  /**
   * Constructs a Radius initializer instance.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */
  constructor(width, height, center = false, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The radius span which is used to set the particle radius value.
     * @type {Span}
     */

    this.radius = createSpan(width, height, center);
  }
  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {number} width - The width of the particle radius
   * @param {number} height - The height of the particle radius
   * @param {boolean} [center=false] - Determines whether to average the radius value
   * @return void
   */


  reset(width, height, center = false) {
    this.radius = createSpan(width, height, center);
  }
  /**
   * Sets the particle's initial radius.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    particle.radius = this.radius.getValue();
    particle.transform.oldRadius = particle.radius;
  }
  /**
   * Creates a Radius initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.width - The width of the particle radius
   * @property {number} json.height - The height of the particle radius
   * @property {number} json.center - The center of the particle radius
   * @return {Radius}
   */


  static fromJSON(json) {
    const {
      width,
      height,
      center = false,
      isEnabled = true
    } = json;
    return new Radius(width, height, center, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9SYWRpdXMuanMiXSwibmFtZXMiOlsiSW5pdGlhbGl6ZXIiLCJjcmVhdGVTcGFuIiwiSU5JVElBTElaRVJfVFlQRV9SQURJVVMiLCJ0eXBlIiwiUmFkaXVzIiwiY29uc3RydWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsImNlbnRlciIsImlzRW5hYmxlZCIsInJhZGl1cyIsInJlc2V0IiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiZ2V0VmFsdWUiLCJ0cmFuc2Zvcm0iLCJvbGRSYWRpdXMiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLFNBQTNCO0FBQ0EsU0FBU0MsdUJBQXVCLElBQUlDLElBQXBDLFFBQWdELFNBQWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxNQUFOLFNBQXFCSixXQUFyQixDQUFpQztBQUM5QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VLLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFNLEdBQUcsS0FBekIsRUFBZ0NDLFNBQVMsR0FBRyxJQUE1QyxFQUFrRDtBQUMzRCxVQUFNTixJQUFOLEVBQVlNLFNBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxNQUFMLEdBQWNULFVBQVUsQ0FBQ0ssS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFoQixDQUF4QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUcsRUFBQUEsS0FBSyxDQUFDTCxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLE1BQU0sR0FBRyxLQUF6QixFQUFnQztBQUNuQyxTQUFLRSxNQUFMLEdBQWNULFVBQVUsQ0FBQ0ssS0FBRCxFQUFRQyxNQUFSLEVBQWdCQyxNQUFoQixDQUF4QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUksRUFBQUEsVUFBVSxDQUFDQyxRQUFELEVBQVc7QUFDbkJBLElBQUFBLFFBQVEsQ0FBQ0gsTUFBVCxHQUFrQixLQUFLQSxNQUFMLENBQVlJLFFBQVosRUFBbEI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CQyxTQUFuQixHQUErQkgsUUFBUSxDQUFDSCxNQUF4QztBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUk8sUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFWixNQUFBQSxLQUFGO0FBQVNDLE1BQUFBLE1BQVQ7QUFBaUJDLE1BQUFBLE1BQU0sR0FBRyxLQUExQjtBQUFpQ0MsTUFBQUEsU0FBUyxHQUFHO0FBQTdDLFFBQXNEUyxJQUE1RDtBQUVBLFdBQU8sSUFBSWQsTUFBSixDQUFXRSxLQUFYLEVBQWtCQyxNQUFsQixFQUEwQkMsTUFBMUIsRUFBa0NDLFNBQWxDLENBQVA7QUFDRDs7QUF4RDZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3BhbiB9IGZyb20gJy4uL21hdGgnO1xuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9SQURJVVMgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuLyoqXG4gKiBTZXRzIHRoZSByYWRpdXMgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaXVzIGV4dGVuZHMgSW5pdGlhbGl6ZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFJhZGl1cyBpbml0aWFsaXplciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjZW50ZXI9ZmFsc2VdIC0gRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIGF2ZXJhZ2UgdGhlIHJhZGl1cyB2YWx1ZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIGNlbnRlciA9IGZhbHNlLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSByYWRpdXMgc3BhbiB3aGljaCBpcyB1c2VkIHRvIHNldCB0aGUgcGFydGljbGUgcmFkaXVzIHZhbHVlLlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMucmFkaXVzID0gY3JlYXRlU3Bhbih3aWR0aCwgaGVpZ2h0LCBjZW50ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgaW5pdGlhbGl6ZXIgcHJvcGVydGllcy5cbiAgICogQ2xlYXJzIGFsbCBwcmV2aW91c2x5IHNldCB6b25lcyBhbmQgcmVzZXRzIHRoZSB6b25lcyBhY2NvcmRpbmcgdG8gYXJncyBwYXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgcmFkaXVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcbiAgICogQHBhcmFtIHtib29sZWFufSBbY2VudGVyPWZhbHNlXSAtIERldGVybWluZXMgd2hldGhlciB0byBhdmVyYWdlIHRoZSByYWRpdXMgdmFsdWVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNldCh3aWR0aCwgaGVpZ2h0LCBjZW50ZXIgPSBmYWxzZSkge1xuICAgIHRoaXMucmFkaXVzID0gY3JlYXRlU3Bhbih3aWR0aCwgaGVpZ2h0LCBjZW50ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCByYWRpdXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnR5IG9uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHRoaXMucmFkaXVzLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUudHJhbnNmb3JtLm9sZFJhZGl1cyA9IHBhcnRpY2xlLnJhZGl1cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmFkaXVzIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSByYWRpdXNcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uaGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgcmFkaXVzXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmNlbnRlciAtIFRoZSBjZW50ZXIgb2YgdGhlIHBhcnRpY2xlIHJhZGl1c1xuICAgKiBAcmV0dXJuIHtSYWRpdXN9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgY2VudGVyID0gZmFsc2UsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFJhZGl1cyh3aWR0aCwgaGVpZ2h0LCBjZW50ZXIsIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==