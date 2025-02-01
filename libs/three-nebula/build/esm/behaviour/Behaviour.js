import { DEFAULT_BEHAVIOUR_EASING, DEFAULT_LIFE } from './constants';
import { BEHAVIOUR_TYPE_ABSTRACT } from './types';
import { MEASURE } from '../constants';
import isNumber from 'lodash/isNumber';
import { uid } from '../utils';
/**
 * The base behaviour class.
 * Behaviours manage a particle's behaviour after they have been emitted.
 *
 */

export default class Behaviour {
  /**
   * Constructs a Behaviour instance.
   *
   * @param {number} [life=Infinity] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   * @param {string} [type=BEHAVIOUR_TYPE_ABSTRACT] - The behaviour type
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(life = Infinity, easing = DEFAULT_BEHAVIOUR_EASING, type = BEHAVIOUR_TYPE_ABSTRACT, isEnabled = true) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    /**
     * @desc Determines if the behaviour will be applied or not
     * @type {boolean}
     */

    this.isEnabled = isEnabled;
    /**
     * @desc The behaviour's id
     * @type {string} id
     */

    this.id = `behaviour-${uid()}`;
    /**
     * @desc The life of the behaviour
     * @type {number}
     */

    this.life = life;
    /**
     * @desc The behaviour's decaying trend
     * @type {function}
     */

    this.easing = easing;
    /**
     * @desc The age of the behaviour
     * @type {number}
     */

    this.age = 0;
    /**
     * @desc The energy of the behaviour
     * @type {number}
     */

    this.energy = 1;
    /**
     * Determines if the behaviour is dead or not
     * @type {boolean}
     */

    this.dead = false;
  }
  /**
   * Reset this behaviour's parameters
   *
   * @param {number} [life=DEFAULT_LIFE] - The life of the behaviour
   * @param {function} [easing=DEFAULT_BEHAVIOUR_EASING] - The behaviour's decaying trend
   */


  reset(life = DEFAULT_LIFE, easing = DEFAULT_BEHAVIOUR_EASING) {
    this.life = life;
    this.easing = easing || DEFAULT_BEHAVIOUR_EASING;
  }
  /**
   * Ensures that life is infinity if an invalid value is supplied.
   *
   * @return void
   */


  set life(life) {
    this._life = isNumber(life) ? life : DEFAULT_LIFE;
  }
  /**
   * Gets the behaviour's life.
   *
   * @return {Number}
   */


  get life() {
    return this._life;
  }
  /**
   * Normalize a force by 1:100;
   *
   * @param {Vector3D} force - The force to normalize.
   * @return {Vector3D}
   */


  normalizeForce(force) {
    return force.scalar(MEASURE);
  }
  /**
   * Normalize a value by 1:100;
   *
   * @param {number} value - The value to normalize
   * @return {number}
   */


  normalizeValue(value) {
    return value * MEASURE;
  }
  /**
   * Set the behaviour's initial properties on the particle.
   *
   * @param {Particle} particle
   * @abstract
   */


  initialize(particle) {} // eslint-disable-line

  /**
   * Apply behaviour to the target as a factor of time.
   * Internally calls the mutate method to change properties on the target
   * Will not do so if the behaviour is disabled
   *
   * @abstract
   * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
   * @param {Number} time - the system integration time
   * @param {integer} index - the target index
   * @return mixed
   */


  applyBehaviour(target, time, index) {
    if (!this.isEnabled) {
      return;
    }

    this.mutate(target, time, index);
  }
  /**
   * Change the target's properties according to specific behaviour logic.
   *
   * @abstract
   * @param {Particle|Emitter} target - The particle or emitter to apply the behaviour to
   * @param {Number} time - the system integration time
   * @return mixed
   */


  mutate(target, time, index) {} // eslint-disable-line

  /**
   * Compares the age of the behaviour vs integration time and determines
   * if the behaviour should be set to dead or not.
   * Sets the behaviour energy as a factor of particle age and life.
   *
   * @param {Particle} particle - The particle to apply the behaviour to
   * @param {Number} time - the system integration time
   * @return void
   */


  energize(particle, time) {
    if (this.dead) {
      return;
    }

    this.age += time;

    if (this.age >= this.life) {
      this.energy = 0;
      this.dead = true;
      return;
    }

    const scale = this.easing(particle.age / particle.life);
    this.energy = Math.max(1 - scale, 0);
  }
  /**
   * Destory this behaviour.
   *
   * @abstract
   */


  destroy() {}
  /**
   * Returns a new instance of the behaviour from the JSON object passed.
   *
   * @abstract
   * @param {object} json - JSON object containing the required constructor properties
   * @return {Behaviour}
   */


  fromJSON(json) {} // eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQmVoYXZpb3VyLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfQkVIQVZJT1VSX0VBU0lORyIsIkRFRkFVTFRfTElGRSIsIkJFSEFWSU9VUl9UWVBFX0FCU1RSQUNUIiwiTUVBU1VSRSIsImlzTnVtYmVyIiwidWlkIiwiQmVoYXZpb3VyIiwiY29uc3RydWN0b3IiLCJsaWZlIiwiSW5maW5pdHkiLCJlYXNpbmciLCJ0eXBlIiwiaXNFbmFibGVkIiwiaWQiLCJhZ2UiLCJlbmVyZ3kiLCJkZWFkIiwicmVzZXQiLCJfbGlmZSIsIm5vcm1hbGl6ZUZvcmNlIiwiZm9yY2UiLCJzY2FsYXIiLCJub3JtYWxpemVWYWx1ZSIsInZhbHVlIiwiaW5pdGlhbGl6ZSIsInBhcnRpY2xlIiwiYXBwbHlCZWhhdmlvdXIiLCJ0YXJnZXQiLCJ0aW1lIiwiaW5kZXgiLCJtdXRhdGUiLCJlbmVyZ2l6ZSIsInNjYWxlIiwiTWF0aCIsIm1heCIsImRlc3Ryb3kiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLHdCQUFULEVBQW1DQyxZQUFuQyxRQUF1RCxhQUF2RDtBQUVBLFNBQVNDLHVCQUFULFFBQXdDLFNBQXhDO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixjQUF4QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsaUJBQXJCO0FBQ0EsU0FBU0MsR0FBVCxRQUFvQixVQUFwQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxTQUFOLENBQWdCO0FBQzdCO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxXQUFXLENBQ1RDLElBQUksR0FBR0MsUUFERSxFQUVUQyxNQUFNLEdBQUdWLHdCQUZBLEVBR1RXLElBQUksR0FBR1QsdUJBSEUsRUFJVFUsU0FBUyxHQUFHLElBSkgsRUFLVDtBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksU0FBS0QsSUFBTCxHQUFZQSxJQUFa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RDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztBQUNFRyxFQUFBQSxPQUFPLEdBQUcsQ0FBRTtBQUVaO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUMsRUFBQUEsUUFBUSxDQUFDQyxJQUFELEVBQU8sQ0FBRSxDQWpNWSxDQWlNWDs7O0FBak1XIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HLCBERUZBVUxUX0xJRkUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX0FCU1RSQUNUIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBNRUFTVVJFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBpc051bWJlciBmcm9tICdsb2Rhc2gvaXNOdW1iZXInO1xuaW1wb3J0IHsgdWlkIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGJlaGF2aW91ciBjbGFzcy5cbiAqIEJlaGF2aW91cnMgbWFuYWdlIGEgcGFydGljbGUncyBiZWhhdmlvdXIgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZW1pdHRlZC5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgQmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gVGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZWFzaW5nPURFRkFVTFRfQkVIQVZJT1VSX0VBU0lOR10gLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPUJFSEFWSU9VUl9UWVBFX0FCU1RSQUNUXSAtIFRoZSBiZWhhdmlvdXIgdHlwZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGxpZmUgPSBJbmZpbml0eSxcbiAgICBlYXNpbmcgPSBERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkcsXG4gICAgdHlwZSA9IEJFSEFWSU9VUl9UWVBFX0FCU1RSQUNULFxuICAgIGlzRW5hYmxlZCA9IHRydWVcbiAgKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIHdpbGwgYmUgYXBwbGllZCBvciBub3RcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBiZWhhdmlvdXIncyBpZFxuICAgICAqIEB0eXBlIHtzdHJpbmd9IGlkXG4gICAgICovXG4gICAgdGhpcy5pZCA9IGBiZWhhdmlvdXItJHt1aWQoKX1gO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGxpZmUgb2YgdGhlIGJlaGF2aW91clxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5saWZlID0gbGlmZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLmVhc2luZyA9IGVhc2luZztcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBhZ2Ugb2YgdGhlIGJlaGF2aW91clxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5hZ2UgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGVuZXJneSBvZiB0aGUgYmVoYXZpb3VyXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmVuZXJneSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgaXMgZGVhZCBvciBub3RcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPURFRkFVTFRfTElGRV0gLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtlYXNpbmc9REVGQVVMVF9CRUhBVklPVVJfRUFTSU5HXSAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKi9cbiAgcmVzZXQobGlmZSA9IERFRkFVTFRfTElGRSwgZWFzaW5nID0gREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HKSB7XG4gICAgdGhpcy5saWZlID0gbGlmZTtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkc7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlcyB0aGF0IGxpZmUgaXMgaW5maW5pdHkgaWYgYW4gaW52YWxpZCB2YWx1ZSBpcyBzdXBwbGllZC5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBzZXQgbGlmZShsaWZlKSB7XG4gICAgdGhpcy5fbGlmZSA9IGlzTnVtYmVyKGxpZmUpID8gbGlmZSA6IERFRkFVTFRfTElGRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBiZWhhdmlvdXIncyBsaWZlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgbGlmZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlmZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBmb3JjZSBieSAxOjEwMDtcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IzRH0gZm9yY2UgLSBUaGUgZm9yY2UgdG8gbm9ybWFsaXplLlxuICAgKiBAcmV0dXJuIHtWZWN0b3IzRH1cbiAgICovXG4gIG5vcm1hbGl6ZUZvcmNlKGZvcmNlKSB7XG4gICAgcmV0dXJuIGZvcmNlLnNjYWxhcihNRUFTVVJFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2YWx1ZSBieSAxOjEwMDtcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIE1FQVNVUkU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBiZWhhdmlvdXIncyBpbml0aWFsIHByb3BlcnRpZXMgb24gdGhlIHBhcnRpY2xlLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAvKipcbiAgICogQXBwbHkgYmVoYXZpb3VyIHRvIHRoZSB0YXJnZXQgYXMgYSBmYWN0b3Igb2YgdGltZS5cbiAgICogSW50ZXJuYWxseSBjYWxscyB0aGUgbXV0YXRlIG1ldGhvZCB0byBjaGFuZ2UgcHJvcGVydGllcyBvbiB0aGUgdGFyZ2V0XG4gICAqIFdpbGwgbm90IGRvIHNvIGlmIHRoZSBiZWhhdmlvdXIgaXMgZGlzYWJsZWRcbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7UGFydGljbGV8RW1pdHRlcn0gdGFyZ2V0IC0gVGhlIHBhcnRpY2xlIG9yIGVtaXR0ZXIgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSAtIHRoZSBzeXN0ZW0gaW50ZWdyYXRpb24gdGltZVxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gdGhlIHRhcmdldCBpbmRleFxuICAgKiBAcmV0dXJuIG1peGVkXG4gICAqL1xuICBhcHBseUJlaGF2aW91cih0YXJnZXQsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubXV0YXRlKHRhcmdldCwgdGltZSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgdGFyZ2V0J3MgcHJvcGVydGllcyBhY2NvcmRpbmcgdG8gc3BlY2lmaWMgYmVoYXZpb3VyIGxvZ2ljLlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtQYXJ0aWNsZXxFbWl0dGVyfSB0YXJnZXQgLSBUaGUgcGFydGljbGUgb3IgZW1pdHRlciB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIC0gdGhlIHN5c3RlbSBpbnRlZ3JhdGlvbiB0aW1lXG4gICAqIEByZXR1cm4gbWl4ZWRcbiAgICovXG4gIG11dGF0ZSh0YXJnZXQsIHRpbWUsIGluZGV4KSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSBhZ2Ugb2YgdGhlIGJlaGF2aW91ciB2cyBpbnRlZ3JhdGlvbiB0aW1lIGFuZCBkZXRlcm1pbmVzXG4gICAqIGlmIHRoZSBiZWhhdmlvdXIgc2hvdWxkIGJlIHNldCB0byBkZWFkIG9yIG5vdC5cbiAgICogU2V0cyB0aGUgYmVoYXZpb3VyIGVuZXJneSBhcyBhIGZhY3RvciBvZiBwYXJ0aWNsZSBhZ2UgYW5kIGxpZmUuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgLSB0aGUgc3lzdGVtIGludGVncmF0aW9uIHRpbWVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBlbmVyZ2l6ZShwYXJ0aWNsZSwgdGltZSkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuYWdlID49IHRoaXMubGlmZSkge1xuICAgICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG5cbiAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIGJlaGF2aW91ci5cbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBkZXN0cm95KCkge31cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIEpTT04gb2JqZWN0IHBhc3NlZC5cbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gSlNPTiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVxdWlyZWQgY29uc3RydWN0b3IgcHJvcGVydGllc1xuICAgKiBAcmV0dXJuIHtCZWhhdmlvdXJ9XG4gICAqL1xuICBmcm9tSlNPTihqc29uKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG59XG4iXX0=