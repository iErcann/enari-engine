import Vector3D from '../math/Vector3D';
import { ZONE_TYPE_ABSTRACT } from './types';
/**
 * A Zone determines the area in 3D space where an emitter's particles can position
 * themselves. They are supplied to both the Position initializer
 * and the CrossZone behaviour.
 *
 * @see {@link '../initialize/Position.js'}
 * @see {@link '../behaviour/CrossZone.js'}
 * @abstract
 */

export default class Zone {
  /**
   * Constructs a Zone instance.
   *
   * @param {string} type - The zone type
   * @return void
   */
  constructor(type = ZONE_TYPE_ABSTRACT) {
    this.type = type;
    this.vector = new Vector3D(0, 0, 0);
    this.random = 0;
    this.crossType = 'dead';
    this.log = true;
    this.supportsCrossing = true;
  }

  getPosition() {
    return null;
  }

  crossing(particle) {
    if (!this.supportsCrossing) {
      return console.warn(`${this.constructor.name} does not support the crossing method`);
    }

    switch (this.crossType) {
      case 'bound':
        this._bound(particle);

        break;

      case 'cross':
        this._cross(particle);

        break;

      case 'dead':
        this._dead(particle);

        break;
    }
  }
  /**
   * Determines if this zone is a BoxZone.
   *
   * @return {boolean}
   */


  isBoxZone() {
    return false;
  }
  /**
   * Determines if this zone is a LineZone.
   *
   * @return {boolean}
   */


  isLineZone() {
    return false;
  }
  /**
   * Determines if this zone is a MeshZone.
   *
   * @return {boolean}
   */


  isMeshZone() {
    return false;
  }
  /**
   * Determines if this zone is a PointZone.
   *
   * @return {boolean}
   */


  isPointZone() {
    return false;
  }
  /**
   * Determines if this zone is a ScreenZone.
   *
   * @return {boolean}
   */


  isScreenZone() {
    return false;
  }
  /**
   * Determines if this zone is a SphereZone.
   *
   * @return {boolean}
   */


  isSphereZone() {
    return false;
  }
  /**
   * Sets the particle's dead property to true if required.
   *
   * @param {Particle} particle
   * @abstract
   */


  _dead(particle) {} //eslint-disable-line

  /**
   * @abstract
   */


  _bound(particle) {} //eslint-disable-line

  /**
   * @abstract
   */


  _cross(particle) {} //eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1pvbmUuanMiXSwibmFtZXMiOlsiVmVjdG9yM0QiLCJaT05FX1RZUEVfQUJTVFJBQ1QiLCJab25lIiwiY29uc3RydWN0b3IiLCJ0eXBlIiwidmVjdG9yIiwicmFuZG9tIiwiY3Jvc3NUeXBlIiwibG9nIiwic3VwcG9ydHNDcm9zc2luZyIsImdldFBvc2l0aW9uIiwiY3Jvc3NpbmciLCJwYXJ0aWNsZSIsImNvbnNvbGUiLCJ3YXJuIiwibmFtZSIsIl9ib3VuZCIsIl9jcm9zcyIsIl9kZWFkIiwiaXNCb3hab25lIiwiaXNMaW5lWm9uZSIsImlzTWVzaFpvbmUiLCJpc1BvaW50Wm9uZSIsImlzU2NyZWVuWm9uZSIsImlzU3BoZXJlWm9uZSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixrQkFBckI7QUFDQSxTQUFTQyxrQkFBVCxRQUFtQyxTQUFuQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLElBQU4sQ0FBVztBQUN4QjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFJLEdBQUdILGtCQUFSLEVBQTRCO0FBQ3JDLFNBQUtHLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFJTCxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFkO0FBQ0EsU0FBS00sTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLElBQVg7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOztBQUVEQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixXQUFPLElBQVA7QUFDRDs7QUFFREMsRUFBQUEsUUFBUSxDQUFDQyxRQUFELEVBQVc7QUFDakIsUUFBSSxDQUFDLEtBQUtILGdCQUFWLEVBQTRCO0FBQzFCLGFBQU9JLE9BQU8sQ0FBQ0MsSUFBUixDQUNKLEdBQUUsS0FBS1gsV0FBTCxDQUFpQlksSUFBSyx1Q0FEcEIsQ0FBUDtBQUdEOztBQUVELFlBQVEsS0FBS1IsU0FBYjtBQUNFLFdBQUssT0FBTDtBQUNFLGFBQUtTLE1BQUwsQ0FBWUosUUFBWjs7QUFDQTs7QUFFRixXQUFLLE9BQUw7QUFDRSxhQUFLSyxNQUFMLENBQVlMLFFBQVo7O0FBQ0E7O0FBRUYsV0FBSyxNQUFMO0FBQ0UsYUFBS00sS0FBTCxDQUFXTixRQUFYOztBQUNBO0FBWEo7QUFhRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFTyxFQUFBQSxTQUFTLEdBQUc7QUFDVixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxVQUFVLEdBQUc7QUFDWCxXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxVQUFVLEdBQUc7QUFDWCxXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxZQUFZLEdBQUc7QUFDYixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFQyxFQUFBQSxZQUFZLEdBQUc7QUFDYixXQUFPLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VOLEVBQUFBLEtBQUssQ0FBQ04sUUFBRCxFQUFXLENBQUUsQ0F0R00sQ0FzR0w7O0FBRW5CO0FBQ0Y7QUFDQTs7O0FBQ0VJLEVBQUFBLE1BQU0sQ0FBQ0osUUFBRCxFQUFXLENBQUUsQ0EzR0ssQ0EyR0o7O0FBRXBCO0FBQ0Y7QUFDQTs7O0FBQ0VLLEVBQUFBLE1BQU0sQ0FBQ0wsUUFBRCxFQUFXLENBQUUsQ0FoSEssQ0FnSEo7OztBQWhISSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRCBmcm9tICcuLi9tYXRoL1ZlY3RvcjNEJztcbmltcG9ydCB7IFpPTkVfVFlQRV9BQlNUUkFDVCB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEEgWm9uZSBkZXRlcm1pbmVzIHRoZSBhcmVhIGluIDNEIHNwYWNlIHdoZXJlIGFuIGVtaXR0ZXIncyBwYXJ0aWNsZXMgY2FuIHBvc2l0aW9uXG4gKiB0aGVtc2VsdmVzLiBUaGV5IGFyZSBzdXBwbGllZCB0byBib3RoIHRoZSBQb3NpdGlvbiBpbml0aWFsaXplclxuICogYW5kIHRoZSBDcm9zc1pvbmUgYmVoYXZpb3VyLlxuICpcbiAqIEBzZWUge0BsaW5rICcuLi9pbml0aWFsaXplL1Bvc2l0aW9uLmpzJ31cbiAqIEBzZWUge0BsaW5rICcuLi9iZWhhdmlvdXIvQ3Jvc3Nab25lLmpzJ31cbiAqIEBhYnN0cmFjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBab25lIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB6b25lIHR5cGVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlID0gWk9ORV9UWVBFX0FCU1RSQUNUKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnZlY3RvciA9IG5ldyBWZWN0b3IzRCgwLCAwLCAwKTtcbiAgICB0aGlzLnJhbmRvbSA9IDA7XG4gICAgdGhpcy5jcm9zc1R5cGUgPSAnZGVhZCc7XG4gICAgdGhpcy5sb2cgPSB0cnVlO1xuICAgIHRoaXMuc3VwcG9ydHNDcm9zc2luZyA9IHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNyb3NzaW5nKHBhcnRpY2xlKSB7XG4gICAgaWYgKCF0aGlzLnN1cHBvcnRzQ3Jvc3NpbmcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4oXG4gICAgICAgIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCB0aGUgY3Jvc3NpbmcgbWV0aG9kYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMuY3Jvc3NUeXBlKSB7XG4gICAgICBjYXNlICdib3VuZCc6XG4gICAgICAgIHRoaXMuX2JvdW5kKHBhcnRpY2xlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nyb3NzJzpcbiAgICAgICAgdGhpcy5fY3Jvc3MocGFydGljbGUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZGVhZCc6XG4gICAgICAgIHRoaXMuX2RlYWQocGFydGljbGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBCb3hab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNCb3hab25lKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoaXMgem9uZSBpcyBhIExpbmVab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNMaW5lWm9uZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBNZXNoWm9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzTWVzaFpvbmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhpcyB6b25lIGlzIGEgUG9pbnRab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNQb2ludFpvbmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhpcyB6b25lIGlzIGEgU2NyZWVuWm9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU2NyZWVuWm9uZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGlzIHpvbmUgaXMgYSBTcGhlcmVab25lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNTcGhlcmVab25lKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwYXJ0aWNsZSdzIGRlYWQgcHJvcGVydHkgdG8gdHJ1ZSBpZiByZXF1aXJlZC5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBfZGVhZChwYXJ0aWNsZSkge30gLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgX2JvdW5kKHBhcnRpY2xlKSB7fSAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuICAvKipcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBfY3Jvc3MocGFydGljbGUpIHt9IC8vZXNsaW50LWRpc2FibGUtbGluZVxufVxuIl19