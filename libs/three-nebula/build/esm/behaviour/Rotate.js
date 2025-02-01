import { DR, PI } from '../constants';
import { MathUtils, Vector3D, createSpan } from '../math';
import Behaviour from './Behaviour';
import { getEasingByName } from '../ease';
import { BEHAVIOUR_TYPE_ROTATE as type } from './types';
/**
 * Behaviour that rotates particles.
 */

export default class Rotate extends Behaviour {
  /**
   * Constructs a Rotate behaviour instance.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(x, y, z, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(x, y, z);
  }
  /**
   * Gets the rotation type.
   *
   * @return {string}
   */


  get rotationType() {
    return this._rotationType;
  }
  /**
   * Sets the rotation type.
   *
   * @param {string}
   * @return void
   */


  set rotationType(rotationType) {
    /**
     * @desc The rotation type. ENUM of ['same', 'set', 'to', 'add'].
     * @type {string}
     */
    this._rotationType = rotationType;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @return void
   */


  reset(x, y, z, life, easing) {
    /**
     * @desc X axis rotation.
     * @type {number|Span}
     */
    this.x = x || 0;
    /**
     * @desc Y axis rotation.
     * @type {number|Span}
     */

    this.y = y || 0;
    /**
     * @desc Z axis rotation.
     * @type {number|Span}
     */

    this.z = z || 0;

    if (x === undefined || x == 'same') {
      this.rotationType = 'same';
    } else if (y == undefined) {
      this.rotationType = 'set';
    } else if (z === undefined) {
      this.rotationType = 'to';
    } else {
      this.rotationType = 'add';
      this.x = createSpan(this.x * DR);
      this.y = createSpan(this.y * DR);
      this.z = createSpan(this.z * DR);
    }

    life && super.reset(life, easing);
  }
  /**
   * Initializes the behaviour on a particle.
   *
   * @param {object} particle - the particle to initialize the behaviour on
   * @return void
   */


  initialize(particle) {
    switch (this.rotationType) {
      case 'same':
        break;

      case 'set':
        this._setRotation(particle.rotation, this.x);

        break;

      case 'to':
        particle.transform.fR = particle.transform.fR || new Vector3D();
        particle.transform.tR = particle.transform.tR || new Vector3D();

        this._setRotation(particle.transform.fR, this.x);

        this._setRotation(particle.transform.tR, this.y);

        break;

      case 'add':
        particle.transform.addR = new Vector3D(this.x.getValue(), this.y.getValue(), this.z.getValue());
        break;
    }
  }
  /**
   * Sets the particle's rotation prior to the behaviour being applied.
   *
   * NOTE It's hard to see here, but this is mutating the particle's rotation
   * even though the particle is not being passed in directly.
   *
   * NOTE the else if below will never be reached because the value being passed in
   * will never be of type Vector3D.
   *
   * @param {Vector3D} particleRotation - the particle's rotation vector
   * @param {string|number} value - the value to set the rotation value to, if 'random'
   * rotation is randomised
   * @return void
   */


  _setRotation(particleRotation, value) {
    particleRotation = particleRotation || new Vector3D();

    if (value == 'random') {
      var x = MathUtils.randomAToB(-PI, PI);
      var y = MathUtils.randomAToB(-PI, PI);
      var z = MathUtils.randomAToB(-PI, PI);
      particleRotation.set(x, y, z);
    } // we can't ever get here because value will never be a Vector3D!
    // consider refactoring to
    //  if (value instance of Span) { vec3.add(value.getValue()); }
    else if (value instanceof Vector3D) {
      particleRotation.copy(value);
    }
  }
  /**
   * Mutates the particle.rotation property.
   *
   * @see http://stackoverflow.com/questions/21622956/how-to-convert-direction-vector-to-euler-angles
   * @param {object} particle - the particle to apply the behaviour to
   * @param {number} time - engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    this.energize(particle, time, index);

    switch (this.rotationType) {
      // orients the particle in the direction it is moving
      case 'same':
        if (!particle.rotation) {
          particle.rotation = new Vector3D();
        }

        particle.rotation.eulerFromDir(particle.velocity);
        break;

      case 'set':
        //
        break;

      case 'to':
        particle.rotation.x = MathUtils.lerp(particle.transform.fR.x, particle.transform.tR.x, this.energy);
        particle.rotation.y = MathUtils.lerp(particle.transform.fR.y, particle.transform.tR.y, this.energy);
        particle.rotation.z = MathUtils.lerp(particle.transform.fR.z, particle.transform.tR.z, this.energy);
        break;

      case 'add':
        particle.rotation.add(particle.transform.addR);
        break;
    }
  }

  static fromJSON(json) {
    const {
      x,
      y,
      z,
      life,
      easing,
      isEnabled = true
    } = json;
    return new Rotate(x, y, z, life, getEasingByName(easing), isEnabled);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUm90YXRlLmpzIl0sIm5hbWVzIjpbIkRSIiwiUEkiLCJNYXRoVXRpbHMiLCJWZWN0b3IzRCIsImNyZWF0ZVNwYW4iLCJCZWhhdmlvdXIiLCJnZXRFYXNpbmdCeU5hbWUiLCJCRUhBVklPVVJfVFlQRV9ST1RBVEUiLCJ0eXBlIiwiUm90YXRlIiwiY29uc3RydWN0b3IiLCJ4IiwieSIsInoiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJyb3RhdGlvblR5cGUiLCJfcm90YXRpb25UeXBlIiwidW5kZWZpbmVkIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiX3NldFJvdGF0aW9uIiwicm90YXRpb24iLCJ0cmFuc2Zvcm0iLCJmUiIsInRSIiwiYWRkUiIsImdldFZhbHVlIiwicGFydGljbGVSb3RhdGlvbiIsInZhbHVlIiwicmFuZG9tQVRvQiIsInNldCIsImNvcHkiLCJtdXRhdGUiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsImV1bGVyRnJvbURpciIsInZlbG9jaXR5IiwibGVycCIsImVuZXJneSIsImFkZCIsImZyb21KU09OIiwianNvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsRUFBVCxFQUFhQyxFQUFiLFFBQXVCLGNBQXZCO0FBQ0EsU0FBU0MsU0FBVCxFQUFvQkMsUUFBcEIsRUFBOEJDLFVBQTlCLFFBQWdELFNBQWhEO0FBRUEsT0FBT0MsU0FBUCxNQUFzQixhQUF0QjtBQUNBLFNBQVNDLGVBQVQsUUFBZ0MsU0FBaEM7QUFDQSxTQUFTQyxxQkFBcUIsSUFBSUMsSUFBbEMsUUFBOEMsU0FBOUM7QUFFQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxNQUFOLFNBQXFCSixTQUFyQixDQUErQjtBQUM1QztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VLLEVBQUFBLFdBQVcsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAs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LENBQUNFLFFBQVQsQ0FBa0JtQixHQUFsQixDQUFzQnJCLFFBQVEsQ0FBQ0csU0FBVCxDQUFtQkcsSUFBekM7QUFDQTtBQWxDSjtBQW9DRDs7QUFFYyxTQUFSZ0IsUUFBUSxDQUFDQyxJQUFELEVBQU87QUFDcEIsVUFBTTtBQUFFbEMsTUFBQUEsQ0FBRjtBQUFLQyxNQUFBQSxDQUFMO0FBQVFDLE1BQUFBLENBQVI7QUFBV0MsTUFBQUEsSUFBWDtBQUFpQkMsTUFBQUEsTUFBakI7QUFBeUJDLE1BQUFBLFNBQVMsR0FBRztBQUFyQyxRQUE4QzZCLElBQXBEO0FBRUEsV0FBTyxJQUFJcEMsTUFBSixDQUFXRSxDQUFYLEVBQWNDLENBQWQsRUFBaUJDLENBQWpCLEVBQW9CQyxJQUFwQixFQUEwQlIsZUFBZSxDQUFDUyxNQUFELENBQXpDLEVBQW1EQyxTQUFuRCxDQUFQO0FBQ0Q7O0FBM00yQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERSLCBQSSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNYXRoVXRpbHMsIFZlY3RvcjNELCBjcmVhdGVTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9ST1RBVEUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEJlaGF2aW91ciB0aGF0IHJvdGF0ZXMgcGFydGljbGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFJvdGF0ZSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBheGlzIHJvdGF0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBheGlzIHJvdGF0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0gWiBheGlzIHJvdGF0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gVGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgZWFzaW5nIGVxdWF0aW9uIHRvIHVzZSBmb3IgdHJhbnNmb3Jtc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHgsIHksIHosIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcblxuICAgIHRoaXMucmVzZXQoeCwgeSwgeik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm90YXRpb24gdHlwZS5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IHJvdGF0aW9uVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcm90YXRpb25UeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHJvdGF0aW9uIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHNldCByb3RhdGlvblR5cGUocm90YXRpb25UeXBlKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHJvdGF0aW9uIHR5cGUuIEVOVU0gb2YgWydzYW1lJywgJ3NldCcsICd0bycsICdhZGQnXS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuX3JvdGF0aW9uVHlwZSA9IHJvdGF0aW9uVHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFggYXhpcyByb3RhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyByb3RhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0geiAtIFogYXhpcyByb3RhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIHRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gdGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNldCh4LCB5LCB6LCBsaWZlLCBlYXNpbmcpIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBYIGF4aXMgcm90YXRpb24uXG4gICAgICogQHR5cGUge251bWJlcnxTcGFufVxuICAgICAqL1xuICAgIHRoaXMueCA9IHggfHwgMDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFkgYXhpcyByb3RhdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfFNwYW59XG4gICAgICovXG4gICAgdGhpcy55ID0geSB8fCAwO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgWiBheGlzIHJvdGF0aW9uLlxuICAgICAqIEB0eXBlIHtudW1iZXJ8U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLnogPSB6IHx8IDA7XG5cbiAgICBpZiAoeCA9PT0gdW5kZWZpbmVkIHx8IHggPT0gJ3NhbWUnKSB7XG4gICAgICB0aGlzLnJvdGF0aW9uVHlwZSA9ICdzYW1lJztcbiAgICB9IGVsc2UgaWYgKHkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJvdGF0aW9uVHlwZSA9ICdzZXQnO1xuICAgIH0gZWxzZSBpZiAoeiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJvdGF0aW9uVHlwZSA9ICd0byc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm90YXRpb25UeXBlID0gJ2FkZCc7XG4gICAgICB0aGlzLnggPSBjcmVhdGVTcGFuKHRoaXMueCAqIERSKTtcbiAgICAgIHRoaXMueSA9IGNyZWF0ZVNwYW4odGhpcy55ICogRFIpO1xuICAgICAgdGhpcy56ID0gY3JlYXRlU3Bhbih0aGlzLnogKiBEUik7XG4gICAgfVxuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBiZWhhdmlvdXIgb24gYSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIGJlaGF2aW91ciBvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBzd2l0Y2ggKHRoaXMucm90YXRpb25UeXBlKSB7XG4gICAgICBjYXNlICdzYW1lJzpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgIHRoaXMuX3NldFJvdGF0aW9uKHBhcnRpY2xlLnJvdGF0aW9uLCB0aGlzLngpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAndG8nOlxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIgPSBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIgfHwgbmV3IFZlY3RvcjNEKCk7XG4gICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS50UiA9IHBhcnRpY2xlLnRyYW5zZm9ybS50UiB8fCBuZXcgVmVjdG9yM0QoKTtcbiAgICAgICAgdGhpcy5fc2V0Um90YXRpb24ocGFydGljbGUudHJhbnNmb3JtLmZSLCB0aGlzLngpO1xuICAgICAgICB0aGlzLl9zZXRSb3RhdGlvbihwYXJ0aWNsZS50cmFuc2Zvcm0udFIsIHRoaXMueSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhZGQnOlxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uYWRkUiA9IG5ldyBWZWN0b3IzRChcbiAgICAgICAgICB0aGlzLnguZ2V0VmFsdWUoKSxcbiAgICAgICAgICB0aGlzLnkuZ2V0VmFsdWUoKSxcbiAgICAgICAgICB0aGlzLnouZ2V0VmFsdWUoKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFydGljbGUncyByb3RhdGlvbiBwcmlvciB0byB0aGUgYmVoYXZpb3VyIGJlaW5nIGFwcGxpZWQuXG4gICAqXG4gICAqIE5PVEUgSXQncyBoYXJkIHRvIHNlZSBoZXJlLCBidXQgdGhpcyBpcyBtdXRhdGluZyB0aGUgcGFydGljbGUncyByb3RhdGlvblxuICAgKiBldmVuIHRob3VnaCB0aGUgcGFydGljbGUgaXMgbm90IGJlaW5nIHBhc3NlZCBpbiBkaXJlY3RseS5cbiAgICpcbiAgICogTk9URSB0aGUgZWxzZSBpZiBiZWxvdyB3aWxsIG5ldmVyIGJlIHJlYWNoZWQgYmVjYXVzZSB0aGUgdmFsdWUgYmVpbmcgcGFzc2VkIGluXG4gICAqIHdpbGwgbmV2ZXIgYmUgb2YgdHlwZSBWZWN0b3IzRC5cbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IzRH0gcGFydGljbGVSb3RhdGlvbiAtIHRoZSBwYXJ0aWNsZSdzIHJvdGF0aW9uIHZlY3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHNldCB0aGUgcm90YXRpb24gdmFsdWUgdG8sIGlmICdyYW5kb20nXG4gICAqIHJvdGF0aW9uIGlzIHJhbmRvbWlzZWRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfc2V0Um90YXRpb24ocGFydGljbGVSb3RhdGlvbiwgdmFsdWUpIHtcbiAgICBwYXJ0aWNsZVJvdGF0aW9uID0gcGFydGljbGVSb3RhdGlvbiB8fCBuZXcgVmVjdG9yM0QoKTtcbiAgICBpZiAodmFsdWUgPT0gJ3JhbmRvbScpIHtcbiAgICAgIHZhciB4ID0gTWF0aFV0aWxzLnJhbmRvbUFUb0IoLVBJLCBQSSk7XG4gICAgICB2YXIgeSA9IE1hdGhVdGlscy5yYW5kb21BVG9CKC1QSSwgUEkpO1xuICAgICAgdmFyIHogPSBNYXRoVXRpbHMucmFuZG9tQVRvQigtUEksIFBJKTtcblxuICAgICAgcGFydGljbGVSb3RhdGlvbi5zZXQoeCwgeSwgeik7XG4gICAgfVxuICAgIC8vIHdlIGNhbid0IGV2ZXIgZ2V0IGhlcmUgYmVjYXVzZSB2YWx1ZSB3aWxsIG5ldmVyIGJlIGEgVmVjdG9yM0QhXG4gICAgLy8gY29uc2lkZXIgcmVmYWN0b3JpbmcgdG9cbiAgICAvLyAgaWYgKHZhbHVlIGluc3RhbmNlIG9mIFNwYW4pIHsgdmVjMy5hZGQodmFsdWUuZ2V0VmFsdWUoKSk7IH1cbiAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFZlY3RvcjNEKSB7XG4gICAgICBwYXJ0aWNsZVJvdGF0aW9uLmNvcHkodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZS5yb3RhdGlvbiBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxNjIyOTU2L2hvdy10by1jb252ZXJ0LWRpcmVjdGlvbi12ZWN0b3ItdG8tZXVsZXItYW5nbGVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBzd2l0Y2ggKHRoaXMucm90YXRpb25UeXBlKSB7XG4gICAgICAvLyBvcmllbnRzIHRoZSBwYXJ0aWNsZSBpbiB0aGUgZGlyZWN0aW9uIGl0IGlzIG1vdmluZ1xuICAgICAgY2FzZSAnc2FtZSc6XG4gICAgICAgIGlmICghcGFydGljbGUucm90YXRpb24pIHtcbiAgICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IG5ldyBWZWN0b3IzRCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydGljbGUucm90YXRpb24uZXVsZXJGcm9tRGlyKHBhcnRpY2xlLnZlbG9jaXR5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgIC8vXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd0byc6XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uLnggPSBNYXRoVXRpbHMubGVycChcbiAgICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIueCxcbiAgICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0udFIueCxcbiAgICAgICAgICB0aGlzLmVuZXJneVxuICAgICAgICApO1xuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbi55ID0gTWF0aFV0aWxzLmxlcnAoXG4gICAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmZSLnksXG4gICAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLnRSLnksXG4gICAgICAgICAgdGhpcy5lbmVyZ3lcbiAgICAgICAgKTtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24ueiA9IE1hdGhVdGlscy5sZXJwKFxuICAgICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5mUi56LFxuICAgICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS50Ui56LFxuICAgICAgICAgIHRoaXMuZW5lcmd5XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhZGQnOlxuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbi5hZGQocGFydGljbGUudHJhbnNmb3JtLmFkZFIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgeCwgeSwgeiwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlIH0gPSBqc29uO1xuXG4gICAgcmV0dXJuIG5ldyBSb3RhdGUoeCwgeSwgeiwgbGlmZSwgZ2V0RWFzaW5nQnlOYW1lKGVhc2luZyksIGlzRW5hYmxlZCk7XG4gIH1cbn1cbiJdfQ==