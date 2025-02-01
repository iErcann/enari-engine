import Initializer from './Initializer';
import { createArraySpan } from '../math';
import { INITIALIZER_TYPE_BODY as type } from './types';
/**
 * Sets the body property on initialized particles.
 *
 */

export default class Body extends Initializer {
  /**
   * Constructs a Body initalizer instance.
   *
   * @param {string|number|object} body - The content for the particle body, can
   * be a color or an object (mesh)
   * @param {?number} w - The width of the particle body
   * @param {?number} h - The height of the particle body
   * @return void
   */
  constructor(body, w, h, isEnabled = true) {
    super(type, isEnabled);
    /**
     * @desc The content for the particle body
     * @type {ArraySpan}
     */

    this.body = createArraySpan(body);
    /**
     * @desc The width of the particle Body
     * @type {number}
     */

    this.w = w;
    /**
     * @desc The height of the particle Body
     * @type {number}
     */

    this.h = h || w;
  }
  /**
   * Sets the particle's initial body.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  initialize(particle) {
    var body = this.body.getValue();

    if (this.w) {
      particle.body = {
        width: this.w,
        height: this.h,
        body: body
      };
    } else {
      particle.body = body;
    }
  }
  /**
   * Creates a Body initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.body - The color for the particle body
   * @property {number} json.width - The width of the particle body
   * @property {number} json.height - The height of the particle body
   * @return {Body}
   */


  static fromJSON(json) {
    const {
      body,
      width,
      height,
      isEnabled = true
    } = json;
    return new Body(body, width, height, isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Cb2R5LmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpemVyIiwiY3JlYXRlQXJyYXlTcGFuIiwiSU5JVElBTElaRVJfVFlQRV9CT0RZIiwidHlwZSIsIkJvZHkiLCJjb25zdHJ1Y3RvciIsImJvZHkiLCJ3IiwiaCIsImlzRW5hYmxlZCIsImluaXRpYWxpemUiLCJwYXJ0aWNsZSIsImdldFZhbHVlIiwid2lkdGgiLCJoZWlnaHQiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLFNBQWhDO0FBQ0EsU0FBU0MscUJBQXFCLElBQUlDLElBQWxDLFFBQThDLFNBQTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxJQUFOLFNBQW1CSixXQUFuQixDQUErQjtBQUM1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxTQUFTLEdBQUcsSUFBekIsRUFBK0I7QUFDeEMsVUFBTU4sSUFBTixFQUFZTSxTQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0gsSUFBTCxHQUFZTCxlQUFlLENBQUNLLElBQUQsQ0FBM0I7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxDQUFMLEdBQVNBLENBQUMsSUFBSUQsQ0FBZDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUcsRUFBQUEsVUFBVSxDQUFDQyxRQUFELEVBQVc7QUFDbkIsUUFBSUwsSUFBSSxHQUFHLEtBQUtBLElBQUwsQ0FBVU0sUUFBVixFQUFYOztBQUVBLFFBQUksS0FBS0wsQ0FBVCxFQUFZO0FBQ1ZJLE1BQUFBLFFBQVEsQ0FBQ0wsSUFBVCxHQUFnQjtBQUNkTyxRQUFBQSxLQUFLLEVBQUUsS0FBS04sQ0FERTtBQUVkTyxRQUFBQSxNQUFNLEVBQUUsS0FBS04sQ0FGQztBQUdkRixRQUFBQSxJQUFJLEVBQUVBO0FBSFEsT0FBaEI7QUFLRCxLQU5ELE1BTU87QUFDTEssTUFBQUEsUUFBUSxDQUFDTCxJQUFULEdBQWdCQSxJQUFoQjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNpQixTQUFSUyxRQUFRLENBQUNDLElBQUQsRUFBTztBQUNwQixVQUFNO0FBQUVWLE1BQUFBLElBQUY7QUFBUU8sTUFBQUEsS0FBUjtBQUFlQyxNQUFBQSxNQUFmO0FBQXVCTCxNQUFBQSxTQUFTLEdBQUc7QUFBbkMsUUFBNENPLElBQWxEO0FBRUEsV0FBTyxJQUFJWixJQUFKLENBQVNFLElBQVQsRUFBZU8sS0FBZixFQUFzQkMsTUFBdEIsRUFBOEJMLFNBQTlCLENBQVA7QUFDRDs7QUFqRTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluaXRpYWxpemVyIGZyb20gJy4vSW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgY3JlYXRlQXJyYXlTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX0JPRFkgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuLyoqXG4gKiBTZXRzIHRoZSBib2R5IHByb3BlcnR5IG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgQm9keSBpbml0YWxpemVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8b2JqZWN0fSBib2R5IC0gVGhlIGNvbnRlbnQgZm9yIHRoZSBwYXJ0aWNsZSBib2R5LCBjYW5cbiAgICogYmUgYSBjb2xvciBvciBhbiBvYmplY3QgKG1lc2gpXG4gICAqIEBwYXJhbSB7P251bWJlcn0gdyAtIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgYm9keVxuICAgKiBAcGFyYW0gez9udW1iZXJ9IGggLSBUaGUgaGVpZ2h0IG9mIHRoZSBwYXJ0aWNsZSBib2R5XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoYm9keSwgdywgaCwgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY29udGVudCBmb3IgdGhlIHBhcnRpY2xlIGJvZHlcbiAgICAgKiBAdHlwZSB7QXJyYXlTcGFufVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGNyZWF0ZUFycmF5U3Bhbihib2R5KTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSB3aWR0aCBvZiB0aGUgcGFydGljbGUgQm9keVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy53ID0gdztcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIEJvZHlcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuaCA9IGggfHwgdztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwYXJ0aWNsZSdzIGluaXRpYWwgYm9keS5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydHkgb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgdmFyIGJvZHkgPSB0aGlzLmJvZHkuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLncpIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLncsXG4gICAgICAgIGhlaWdodDogdGhpcy5oLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuYm9keSA9IGJvZHk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBCb2R5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmJvZHkgLSBUaGUgY29sb3IgZm9yIHRoZSBwYXJ0aWNsZSBib2R5XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSBib2R5XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIGJvZHlcbiAgICogQHJldHVybiB7Qm9keX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBib2R5LCB3aWR0aCwgaGVpZ2h0LCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBCb2R5KGJvZHksIHdpZHRoLCBoZWlnaHQsIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==