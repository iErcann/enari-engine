import { INITIALIZER_TYPE_ABSTRACT } from './types';
/**
 * The base Emitter / Particle property class.
 *
 * @abstract
 */

export default class Initializer {
  /**
   * Constructs an Initializer instance.
   *
   * @param {string} [type=INITIALIZER_TYPE_ABSTRACT] - The intiializer type
   * @param {boolean} [isEnabled=true] - Determines if the initializer should be enabled or not
    * @return void
   */
  constructor(type = INITIALIZER_TYPE_ABSTRACT, isEnabled = true) {
    this.type = type;
    this.isEnabled = isEnabled;
  }
  /**
   * Initializes the property on the emitter or particle.
   *
   * @see {@link '../emitter/emitter.js'} setupParticle
   * @param {Emitter} emitter - the emitter to initialize the property on
   * @param {Particle} particle - the particle to intiialize the property on
   * @return void
   */


  init(emitter, particle) {
    if (!this.isEnabled) {
      return;
    }

    if (particle) {
      this.initialize(particle);
      particle.hasBeenInitialized = true;
    } else {
      this.initialize(emitter);
      emitter.hasBeenInitialized = true;
    }
  }
  /**
   * @abstract
   */


  reset() {}
  /**
   * Place custom property initialization code in this method in the subclass.
   *
   * @param {object} target - either an Emitter or a Particle
   * @abstract
   */


  initialize(target) {} // eslint-disable-line

  /**
   * Determines if the initializer requires a Web GL API to be provided to its constructor.
   * If true, the WebGL API will need to be provided as the first argument to the constructor
   * and fromJSON methods.
   *
   * @return {boolean}
   */


  static requiresWebGlApi() {
    return false;
  }
  /**
   * Returns a new instance of the initializer from the JSON object passed.
   *
   * @abstract
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Behaviour}
   */


  static fromJSON(json) {} // eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Jbml0aWFsaXplci5qcyJdLCJuYW1lcyI6WyJJTklUSUFMSVpFUl9UWVBFX0FCU1RSQUNUIiwiSW5pdGlhbGl6ZXIiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJpc0VuYWJsZWQiLCJpbml0IiwiZW1pdHRlciIsInBhcnRpY2xlIiwiaW5pdGlhbGl6ZSIsImhhc0JlZW5Jbml0aWFsaXplZCIsInJlc2V0IiwidGFyZ2V0IiwicmVxdWlyZXNXZWJHbEFwaSIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EseUJBQVQsUUFBMEMsU0FBMUM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsV0FBTixDQUFrQjtBQUMvQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVFQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBR0gseUJBQVIsRUFBbUNJLFNBQVMsR0FBRyxJQUEvQyxFQUFxRDtBQUM5RCxTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VDLEVBQUFBLElBQUksQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQW9CO0FBQ3RCLFFBQUksQ0FBQyxLQUFLSCxTQUFWLEVBQXFCO0FBQ25CO0FBQ0Q7O0FBRUQsUUFBSUcsUUFBSixFQUFjO0FBQ1osV0FBS0MsVUFBTCxDQUFnQkQsUUFBaEI7QUFDQUEsTUFBQUEsUUFBUSxDQUFDRSxrQkFBVCxHQUE4QixJQUE5QjtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUtELFVBQUwsQ0FBZ0JGLE9BQWhCO0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0csa0JBQVIsR0FBNkIsSUFBN0I7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBOzs7QUFDRUMsRUFBQUEsS0FBSyxHQUFHLENBQUU7QUFFVjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRixFQUFBQSxVQUFVLENBQUNHLE1BQUQsRUFBUyxDQUFFLENBL0NVLENBK0NUOztBQUV0QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ3lCLFNBQWhCQyxnQkFBZ0IsR0FBRztBQUN4QixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkMsUUFBUSxDQUFDQyxJQUFELEVBQU8sQ0FBRSxDQW5FTyxDQW1FTjs7O0FBbkVNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9BQlNUUkFDVCB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIEVtaXR0ZXIgLyBQYXJ0aWNsZSBwcm9wZXJ0eSBjbGFzcy5cbiAqXG4gKiBAYWJzdHJhY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGl6ZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhbiBJbml0aWFsaXplciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPUlOSVRJQUxJWkVSX1RZUEVfQUJTVFJBQ1RdIC0gVGhlIGludGlpYWxpemVyIHR5cGVcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgaW5pdGlhbGl6ZXIgc2hvdWxkIGJlIGVuYWJsZWQgb3Igbm90XG5cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlID0gSU5JVElBTElaRVJfVFlQRV9BQlNUUkFDVCwgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHByb3BlcnR5IG9uIHRoZSBlbWl0dGVyIG9yIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayAnLi4vZW1pdHRlci9lbWl0dGVyLmpzJ30gc2V0dXBQYXJ0aWNsZVxuICAgKiBAcGFyYW0ge0VtaXR0ZXJ9IGVtaXR0ZXIgLSB0aGUgZW1pdHRlciB0byBpbml0aWFsaXplIHRoZSBwcm9wZXJ0eSBvblxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbnRpaWFsaXplIHRoZSBwcm9wZXJ0eSBvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGluaXQoZW1pdHRlciwgcGFydGljbGUpIHtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBhcnRpY2xlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUocGFydGljbGUpO1xuICAgICAgcGFydGljbGUuaGFzQmVlbkluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplKGVtaXR0ZXIpO1xuICAgICAgZW1pdHRlci5oYXNCZWVuSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIHJlc2V0KCkge31cblxuICAvKipcbiAgICogUGxhY2UgY3VzdG9tIHByb3BlcnR5IGluaXRpYWxpemF0aW9uIGNvZGUgaW4gdGhpcyBtZXRob2QgaW4gdGhlIHN1YmNsYXNzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IC0gZWl0aGVyIGFuIEVtaXR0ZXIgb3IgYSBQYXJ0aWNsZVxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluaXRpYWxpemVyIHJlcXVpcmVzIGEgV2ViIEdMIEFQSSB0byBiZSBwcm92aWRlZCB0byBpdHMgY29uc3RydWN0b3IuXG4gICAqIElmIHRydWUsIHRoZSBXZWJHTCBBUEkgd2lsbCBuZWVkIHRvIGJlIHByb3ZpZGVkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgY29uc3RydWN0b3JcbiAgICogYW5kIGZyb21KU09OIG1ldGhvZHMuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZXNXZWJHbEFwaSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgaW5pdGlhbGl6ZXIgZnJvbSB0aGUgSlNPTiBvYmplY3QgcGFzc2VkLlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSByZXF1aXJlZCBjb25zdHJ1Y3RvciBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm4ge0JlaGF2aW91cn1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG59XG4iXX0=