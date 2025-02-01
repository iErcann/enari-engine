import { DEFAULT_RATE_NUM_PAN, DEFAULT_RATE_TIME_PAN } from './constants';
import { Span, createSpan } from '../math';
import Initializer from './Initializer';
import { INITIALIZER_TYPE_RATE as type } from './types';
/**
 * Calculates the rate of particle emission.
 *
 * NOTE This doesn't need to be an initializer, it doesn't have an initialize
 * method, it overrides the base init method and it is only relevent to the Emitter class.
 * It would be better to move this to the Emitter module itself as a standalone class.
 *
 */

export default class Rate extends Initializer {
  /**
   * Constructs a Rate instance.
   *
   * @param {number|array|Span} numPan - The number of particles to emit
   * @param {number|array|Span} timePan - The time between each particle emission
   * @return void
   */
  constructor(numPan = DEFAULT_RATE_NUM_PAN, timePan = DEFAULT_RATE_TIME_PAN) {
    super(type);
    /**
     * @desc Sets the number of particles to emit.
     * @type {Span}
     */

    this.numPan = createSpan(numPan);
    /**
     * @desc Sets the time between each particle emission.
     * @type {Span}
     */

    this.timePan = createSpan(timePan);
    /**
     * @desc The rate's start time.
     * @type {number}
     */

    this.startTime = 0;
    /**
     * @desc The rate's next time.
     * @type {number}
     */

    this.nextTime = 0;
    this.init();
  }
  /**
   * Sets the startTime and nextTime properties.
   *
   * @return void
   */


  init() {
    this.startTime = 0;
    this.nextTime = this.timePan.getValue();
  }
  /**
   * Gets the number of particles to emit.
   *
   * @param {number} time - Current particle engine time
   * @return {number}
   */


  getValue(time) {
    this.startTime += time;

    if (this.startTime >= this.nextTime) {
      this.init();

      if (this.numPan.b == 1) {
        if (this.numPan.getValue('Float') > 0.5) return 1;else return 0;
      } else {
        return this.numPan.getValue('Int');
      }
    }

    return 0;
  }
  /**
   * Creates a Rate initializer from JSON.
   *
   * @param {object} json - The JSON to construct the instance from.
   * @property {number} json.particlesMin - The minimum number of particles to emit
   * @property {number} json.particlesMax - The maximum number of particles to emit
   * @property {number} json.perSecondMin - The minimum per second emit rate
   * @property {number} json.perSecondMax - The maximum per second emit rate
   * @return {Rate}
   */


  static fromJSON(json) {
    const {
      particlesMin,
      particlesMax,
      perSecondMin,
      perSecondMax
    } = json;
    return new Rate(new Span(particlesMin, particlesMax), new Span(perSecondMin, perSecondMax));
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9SYXRlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfUkFURV9OVU1fUEFOIiwiREVGQVVMVF9SQVRFX1RJTUVfUEFOIiwiU3BhbiIsImNyZWF0ZVNwYW4iLCJJbml0aWFsaXplciIsIklOSVRJQUxJWkVSX1RZUEVfUkFURSIsInR5cGUiLCJSYXRlIiwiY29uc3RydWN0b3IiLCJudW1QYW4iLCJ0aW1lUGFuIiwic3RhcnRUaW1lIiwibmV4dFRpbWUiLCJpbml0IiwiZ2V0VmFsdWUiLCJ0aW1lIiwiYiIsImZyb21KU09OIiwianNvbiIsInBhcnRpY2xlc01pbiIsInBhcnRpY2xlc01heCIsInBlclNlY29uZE1pbiIsInBlclNlY29uZE1heCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0Esb0JBQVQsRUFBK0JDLHFCQUEvQixRQUE0RCxhQUE1RDtBQUNBLFNBQVNDLElBQVQsRUFBZUMsVUFBZixRQUFpQyxTQUFqQztBQUVBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7QUFDQSxTQUFTQyxxQkFBcUIsSUFBSUMsSUFBbEMsUUFBOEMsU0FBOUM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsSUFBTixTQUFtQkgsV0FBbkIsQ0FBK0I7QUFDNUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUksRUFBQUEsV0FBVyxDQUFDQyxNQUFNLEdBQUdULG9CQUFWLEVBQWdDVSxPQUFPLEdBQUdULHFCQUExQyxFQUFpRTtBQUMxRSxVQUFNSyxJQUFOO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0csTUFBTCxHQUFjTixVQUFVLENBQUNNLE1BQUQsQ0FBeEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxPQUFMLEdBQWVQLFVBQVUsQ0FBQ08sT0FBRCxDQUF6QjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBRUEsU0FBS0MsSUFBTDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VBLEVBQUFBLElBQUksR0FBRztBQUNMLFNBQUtGLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtGLE9BQUwsQ0FBYUksUUFBYixFQUFoQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUEsRUFBQUEsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDYixTQUFLSixTQUFMLElBQWtCSSxJQUFsQjs7QUFFQSxRQUFJLEtBQUtKLFNBQUwsSUFBa0IsS0FBS0MsUUFBM0IsRUFBcUM7QUFDbkMsV0FBS0MsSUFBTDs7QUFFQSxVQUFJLEtBQUtKLE1BQUwsQ0FBWU8sQ0FBWixJQUFpQixDQUFyQixFQUF3QjtBQUN0QixZQUFJLEtBQUtQLE1BQUwsQ0FBWUssUUFBWixDQUFxQixPQUFyQixJQUFnQyxHQUFwQyxFQUF5QyxPQUFPLENBQVAsQ0FBekMsS0FDSyxPQUFPLENBQVA7QUFDTixPQUhELE1BR087QUFDTCxlQUFPLEtBQUtMLE1BQUwsQ0FBWUssUUFBWixDQUFxQixLQUFyQixDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPLENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDaUIsU0FBUkcsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFQyxNQUFBQSxZQUFGO0FBQWdCQyxNQUFBQSxZQUFoQjtBQUE4QkMsTUFBQUEsWUFBOUI7QUFBNENDLE1BQUFBO0FBQTVDLFFBQTZESixJQUFuRTtBQUVBLFdBQU8sSUFBSVgsSUFBSixDQUNMLElBQUlMLElBQUosQ0FBU2lCLFlBQVQsRUFBdUJDLFlBQXZCLENBREssRUFFTCxJQUFJbEIsSUFBSixDQUFTbUIsWUFBVCxFQUF1QkMsWUFBdkIsQ0FGSyxDQUFQO0FBSUQ7O0FBeEYyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERFRkFVTFRfUkFURV9OVU1fUEFOLCBERUZBVUxUX1JBVEVfVElNRV9QQU4gfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBTcGFuLCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5cbmltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfUkFURSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgcmF0ZSBvZiBwYXJ0aWNsZSBlbWlzc2lvbi5cbiAqXG4gKiBOT1RFIFRoaXMgZG9lc24ndCBuZWVkIHRvIGJlIGFuIGluaXRpYWxpemVyLCBpdCBkb2Vzbid0IGhhdmUgYW4gaW5pdGlhbGl6ZVxuICogbWV0aG9kLCBpdCBvdmVycmlkZXMgdGhlIGJhc2UgaW5pdCBtZXRob2QgYW5kIGl0IGlzIG9ubHkgcmVsZXZlbnQgdG8gdGhlIEVtaXR0ZXIgY2xhc3MuXG4gKiBJdCB3b3VsZCBiZSBiZXR0ZXIgdG8gbW92ZSB0aGlzIHRvIHRoZSBFbWl0dGVyIG1vZHVsZSBpdHNlbGYgYXMgYSBzdGFuZGFsb25lIGNsYXNzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0ZSBleHRlbmRzIEluaXRpYWxpemVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBSYXRlIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcnxhcnJheXxTcGFufSBudW1QYW4gLSBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0XG4gICAqIEBwYXJhbSB7bnVtYmVyfGFycmF5fFNwYW59IHRpbWVQYW4gLSBUaGUgdGltZSBiZXR3ZWVuIGVhY2ggcGFydGljbGUgZW1pc3Npb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihudW1QYW4gPSBERUZBVUxUX1JBVEVfTlVNX1BBTiwgdGltZVBhbiA9IERFRkFVTFRfUkFURV9USU1FX1BBTikge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgU2V0cyB0aGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBlbWl0LlxuICAgICAqIEB0eXBlIHtTcGFufVxuICAgICAqL1xuICAgIHRoaXMubnVtUGFuID0gY3JlYXRlU3BhbihudW1QYW4pO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgU2V0cyB0aGUgdGltZSBiZXR3ZWVuIGVhY2ggcGFydGljbGUgZW1pc3Npb24uXG4gICAgICogQHR5cGUge1NwYW59XG4gICAgICovXG4gICAgdGhpcy50aW1lUGFuID0gY3JlYXRlU3Bhbih0aW1lUGFuKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSByYXRlJ3Mgc3RhcnQgdGltZS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSByYXRlJ3MgbmV4dCB0aW1lLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5uZXh0VGltZSA9IDA7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzdGFydFRpbWUgYW5kIG5leHRUaW1lIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBDdXJyZW50IHBhcnRpY2xlIGVuZ2luZSB0aW1lXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFZhbHVlKHRpbWUpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lID49IHRoaXMubmV4dFRpbWUpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICBpZiAodGhpcy5udW1QYW4uYiA9PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm51bVBhbi5nZXRWYWx1ZSgnRmxvYXQnKSA+IDAuNSkgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1QYW4uZ2V0VmFsdWUoJ0ludCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSYXRlIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnBhcnRpY2xlc01pbiAtIFRoZSBtaW5pbXVtIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdFxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi5wYXJ0aWNsZXNNYXggLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ucGVyU2Vjb25kTWluIC0gVGhlIG1pbmltdW0gcGVyIHNlY29uZCBlbWl0IHJhdGVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ucGVyU2Vjb25kTWF4IC0gVGhlIG1heGltdW0gcGVyIHNlY29uZCBlbWl0IHJhdGVcbiAgICogQHJldHVybiB7UmF0ZX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBwYXJ0aWNsZXNNaW4sIHBhcnRpY2xlc01heCwgcGVyU2Vjb25kTWluLCBwZXJTZWNvbmRNYXggfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFJhdGUoXG4gICAgICBuZXcgU3BhbihwYXJ0aWNsZXNNaW4sIHBhcnRpY2xlc01heCksXG4gICAgICBuZXcgU3BhbihwZXJTZWNvbmRNaW4sIHBlclNlY29uZE1heClcbiAgICApO1xuICB9XG59XG4iXX0=