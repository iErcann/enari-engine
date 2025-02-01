import { DEFAULT_BIND_EMITTER, DEFAULT_BIND_EMITTER_EVENT, DEFAULT_DAMPING, DEFAULT_EMITTER_INDEX, DEFAULT_EMITTER_RATE } from './constants';
import EventDispatcher, { EMITTER_DEAD, PARTICLE_CREATED, PARTICLE_DEAD, PARTICLE_UPDATE } from '../events';
import { INTEGRATION_TYPE_EULER, integrate } from '../math';
import { Util, uid } from '../utils';
import { InitializerUtil } from '../initializer';
import Particle from '../core/Particle';
import isNumber from 'lodash/isNumber';
import { EMITTER_TYPE_EMITTER as type } from './types';
/**
 * Emitters are the System engine's particle factories. They cause particles to
 * be rendered by emitting them, and store all particle initializers and behaviours.
 *
 */

export default class Emitter extends Particle {
  /**
   * Constructs an Emitter instance.
   *
   * @param {object} properties - The properties to instantiate the emitter with
   * @return void
   */
  constructor(properties) {
    super(properties);
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc The particles emitted by this emitter.
     * @type {array}
     */

    this.particles = [];
    /**
     * @desc The initializers for particles emitted by this emitter.
     * @type {array}
     */

    this.initializers = [];
    /**
     * @desc The behaviours for particles emitted by this emitter.
     * @type {array}
     */

    this.behaviours = [];
    /**
     * @desc The behaviours for the emitter.
     * @type {array}
     */

    this.emitterBehaviours = [];
    /**
     * @desc The current emit iteration.
     * @type {integer}
     */

    this.currentEmitTime = 0;
    /**
     * @desc The total number of times the emitter should emit particles.
     * @type {integer}
     */

    this.totalEmitTimes = -1;
    /**
     * @desc The friction coefficient for all particle to emit by.
     * @type {number}
     */

    this.damping = DEFAULT_DAMPING;
    /**
     * @desc Ensures that particles emitted by this emitter are positioned
     * according to the emitter's properties.
     * @type {boolean}
     */

    this.bindEmitter = DEFAULT_BIND_EMITTER;
    /**
     * @desc Determines if the emitter will dispatch internal events. Defaults
     * to false
     * @type {boolean}
     */

    this.bindEmitterEvent = DEFAULT_BIND_EMITTER_EVENT;
    /**
     * @desc The number of particles to emit per second (a [particle]/b [s])
     * @type {Rate}
     */

    this.rate = DEFAULT_EMITTER_RATE;
    /**
     * @desc Determines if the emitter is emitting particles or not.
     * @type {boolean}
     */

    this.isEmitting = false;
    /**
     * @desc The emitter's id.
     * @type {string}
     */

    this.id = `emitter-${uid()}`;
    this.cID = 0;
    this.name = 'Emitter';
    /**
     * @desc The index of the emitter as it is added to the system.
     * @type {number|undefined}
     */

    this.index = DEFAULT_EMITTER_INDEX;
    /**
     * @desc The emitter's internal event dispatcher.
     * @type {EventDispatcher}
     */

    this.eventDispatcher = new EventDispatcher();
  }
  /**
   * Proxy method for the internal event dispatcher's dispatchEvent method.
   *
   * @param {string} event - The event to dispatch
   * @param {object<Particle>} [target=this] - The event target
   */


  dispatch(event, target = this) {
    this.eventDispatcher.dispatchEvent(event, target);
  }
  /**
   * Sets the emitter rate.
   *
   * @param {Rate} rate - a rate initializer object
   * @return {Emitter}
   */


  setRate(rate) {
    this.rate = rate;
    return this;
  }
  /**
   * Sets the position of the emitter.
   *
   * @param {object} newPosition - an object the new x, y and z props
   * @return {Emitter}
   */


  setPosition(newPosition = {}) {
    const {
      position
    } = this;
    const {
      x = position.x,
      y = position.y,
      z = position.z
    } = newPosition;
    this.position.set(x, y, z);
    return this;
  }
  /**
   * Sets the rotation of the emitter.
   *
   * @param {object} newRotation - an object the new x, y and z props
   * @return {Emitter}
   */


  setRotation(newRotation = {}) {
    const {
      rotation
    } = this;
    const {
      x = rotation.x,
      y = rotation.y,
      z = rotation.z
    } = newRotation;
    this.rotation.set(x, y, z);
    return this;
  }
  /**
   * Sets the total number of times the emitter should emit particles as well as
   * the emitter's life. Also intializes the emitter rate.
   * This enables the emitter to emit particles.
   *
   * @param {number} [totalEmitTimes=Infinity] - the total number of times to emit particles
   * @param {number} [life=Infinity] - the life of this emitter in milliseconds
   * @return {Emitter}
   */


  emit(totalEmitTimes = Infinity, life = Infinity) {
    this.currentEmitTime = 0;
    this.totalEmitTimes = isNumber(totalEmitTimes) ? totalEmitTimes : Infinity;

    if (totalEmitTimes === 1) {
      this.life = totalEmitTimes;
    } else {
      this.life = isNumber(life) ? life : Infinity;
    }

    this.rate.init();
    this.isEmitting = true;
    return this;
  }
  /**
   * Experimental emit method that is designed to be called from the System.emit method.
   *
   * @return {Emitter}
   */


  experimental_emit() {
    const {
      isEmitting,
      totalEmitTimes,
      life
    } = this;

    if (!isEmitting) {
      this.currentEmitTime = 0;

      if (!totalEmitTimes) {
        this.setTotalEmitTimes(Infinity);
      }

      if (!life) {
        this.setLife(Infinity);
      }

      this.rate.init();
      this.isEmitting = true;
    }

    return this;
  }
  /**
   * Sets the total emit times for the emitter.
   *
   * @param {number} [totalEmitTimes=Infinity] - the total number of times to emit particles
   * @return {Emitter}
   */


  setTotalEmitTimes(totalEmitTimes = Infinity) {
    this.totalEmitTimes = isNumber(totalEmitTimes) ? totalEmitTimes : Infinity;
    return this;
  }
  /**
   * Sets the life of the emitter.
   *
   * @param {number} [life=Infinity] - the life of this emitter in milliseconds
   * @return {Emitter}
   */


  setLife(life = Infinity) {
    if (this.totalEmitTimes === 1) {
      this.life = this.totalEmitTimes;
    } else {
      this.life = isNumber(life) ? life : Infinity;
    }

    return this;
  }
  /**
   * Stops the emitter from emitting particles.
   *
   * @return void
   */


  stopEmit() {
    this.totalEmitTimes = -1;
    this.currentEmitTime = 0;
    this.isEmitting = false;
  }
  /**
   * Kills all of the emitter's particles.
   *
   * @return void
   */


  removeAllParticles() {
    let i = this.particles.length;

    while (i--) {
      this.particles[i].dead = true;
    }
  }
  /**
   * Adds a particle initializer to the emitter.
   * Each initializer is run on each particle when they are created.
   *
   * @param {Initializer} initializer - The initializer to add
   * @return {Emitter}
   */


  addInitializer(initializer) {
    this.initializers.push(initializer);
    return this;
  }
  /**
   * Adds multiple particle initializers to the emitter.
   *
   * @param {array<Initializer>} initializers - an array of particle initializers
   * @return {Emitter}
   */


  addInitializers(initializers) {
    let i = initializers.length;

    while (i--) {
      this.addInitializer(initializers[i]);
    }

    return this;
  }
  /**
   * Sets the emitter's particle initializers.
   *
   * @param {array<Initializer>} initializers - an array of particle initializers
   * @return {Emitter}
   */


  setInitializers(initializers) {
    this.initializers = initializers;
    return this;
  }
  /**
   * Removes an initializer from the emitter's initializers array.
   *
   * @param {Initializer} initializer - The initializer to remove
   * @return {Emitter}
   */


  removeInitializer(initializer) {
    const index = this.initializers.indexOf(initializer);

    if (index > -1) {
      this.initializers.splice(index, 1);
    }

    return this;
  }
  /**
   * Removes all initializers.
   *
   * @return {Emitter}
   */


  removeAllInitializers() {
    Util.destroyArray(this.initializers);
    return this;
  }
  /**
   * Adds a behaviour to the emitter. All emitter behaviours are added to each particle when
   * they are emitted.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the emitter
   * @return {Emitter}
   */


  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
    return this;
  }
  /**
   * Adds multiple behaviours to the emitter.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  addBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addBehaviour(behaviours[i]);
    }

    return this;
  }
  /**
   * Sets the emitter's behaviours.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  setBehaviours(behaviours) {
    this.behaviours = behaviours;
    return this;
  }
  /**
   * Removes the behaviour from the emitter's behaviours array.
   *
   * @param {Behaviour} behaviour - The behaviour to remove
   * @return {Emitter}
   */


  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      this.behaviours.splice(index, 1);
    }

    return this;
  }
  /**
   * Removes all behaviours from the emitter.
   *
   * @return {Emitter}
   */


  removeAllBehaviours() {
    Util.destroyArray(this.behaviours);
    return this;
  }
  /**
   * Adds an emitter behaviour to the emitter.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the emitter
   * @return {Emitter}
   */


  addEmitterBehaviour(behaviour) {
    this.emitterBehaviours.push(behaviour);
    behaviour.initialize(this);
    return this;
  }
  /**
   * Adds multiple behaviours to the emitter.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  addEmitterBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addEmitterBehaviour(behaviours[i]);
    }

    return this;
  }
  /**
   * Sets the emitter's behaviours.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  setEmitterBehaviours(behaviours) {
    const length = behaviours.length;
    this.emitterBehaviours = behaviours;

    for (let i = 0; i < length; i++) {
      this.emitterBehaviours[i].initialize(this);
    }

    return this;
  }
  /**
   * Removes the behaviour from the emitter's behaviours array.
   *
   * @param {Behaviour} behaviour - The behaviour to remove
   * @return {Emitter}
   */


  removeEmitterBehaviour(behaviour) {
    const index = this.emitterBehaviours.indexOf(behaviour);

    if (index > -1) {
      this.emitterBehaviours.splice(index, 1);
    }

    return this;
  }
  /**
   * Removes all behaviours from the emitter.
   *
   * @return {Emitter}
   */


  removeAllEmitterBehaviours() {
    Util.destroyArray(this.emitterBehaviours);
    return this;
  }
  /**
   * Adds the event listener for the EMITTER_DEAD event.
   *
   * @param {onEmitterDead} - The function to call when the EMITTER_DEAD is dispatched.
   * @return {Emitter}
   */


  addOnEmitterDeadEventListener(onEmitterDead) {
    this.eventDispatcher.addEventListener(`${this.id}_${EMITTER_DEAD}`, () => onEmitterDead());
    return this;
  }
  /**
   * Creates a particle by retreiving one from the pool and setting it up with
   * the supplied initializer and behaviour.
   *
   * @return {Emitter}
   */


  createParticle() {
    const particle = this.parent.pool.get(Particle);
    const index = this.particles.length;
    this.setupParticle(particle, index);
    this.parent && this.parent.dispatch(PARTICLE_CREATED, particle);
    this.bindEmitterEvent && this.dispatch(PARTICLE_CREATED, particle);
    return particle;
  }
  /**
   * Sets up a particle by running all initializers on it and setting its behaviours.
   * Also adds the particle to this.particles.
   *
   * @param {Particle} particle - The particle to setup
   * @return void
   */


  setupParticle(particle, index) {
    const {
      initializers,
      behaviours
    } = this;
    InitializerUtil.initialize(this, particle, initializers);
    particle.addBehaviours(behaviours);
    particle.parent = this;
    particle.index = index;
    this.particles.push(particle);
  }
  /**
   * Updates the emitter according to the time passed by calling the generate
   * and integrate methods. The generate method creates particles, the integrate
   * method updates existing particles.
   *
   * If the emitter age is greater than time, the emitter is killed.
   *
   * This method also indexes/deindexes particles.
   *
   * @param {number} time - System engine time
   * @return void
   */


  update(time) {
    if (!this.isEmitting) {
      return;
    }

    this.age += time;

    if (this.dead || this.age >= this.life) {
      this.destroy();
    }

    this.generate(time);
    this.integrate(time);
    let i = this.particles.length;

    while (i--) {
      const particle = this.particles[i];

      if (particle.dead) {
        this.parent && this.parent.dispatch(PARTICLE_DEAD, particle);
        this.bindEmitterEvent && this.dispatch(PARTICLE_DEAD, particle);
        this.parent.pool.expire(particle.reset());
        this.particles.splice(i, 1);
      }
    }

    this.updateEmitterBehaviours(time);
  }
  /**
   * Updates the emitter's emitter behaviours.
   *
   * @param {number} time - System engine time
   * @return void
   */


  updateEmitterBehaviours(time) {
    if (this.sleep) {
      return;
    }

    const length = this.emitterBehaviours.length;

    for (let i = 0; i < length; i++) {
      this.emitterBehaviours[i].applyBehaviour(this, time, i);
    }
  }
  /**
   * Runs the integration algorithm on the emitter and all particles.
   * Updates the particles with the timstamp passed.
   *
   * @param {number} time - System engine time
   * @return void
   */


  integrate(time) {
    const integrationType = this.parent ? this.parent.integrationType : INTEGRATION_TYPE_EULER;
    const damping = 1 - this.damping;
    integrate(this, time, damping, integrationType);
    let index = this.particles.length;

    while (index--) {
      const particle = this.particles[index];
      particle.update(time, index);
      integrate(particle, time, damping, integrationType);
      this.parent && this.parent.dispatch(PARTICLE_UPDATE, particle);
      this.bindEmitterEvent && this.dispatch(PARTICLE_UPDATE, particle);
    }
  }
  /**
   * Generates new particles.
   *
   * @param {number} time - System engine time
   * @return void
   */


  generate(time) {
    if (this.totalEmitTimes === 1) {
      let i = this.rate.getValue(99999);

      if (i > 0) {
        this.cID = i;
      }

      while (i--) {
        this.createParticle();
      }

      this.totalEmitTimes = 0;
      return;
    }

    this.currentEmitTime += time;

    if (this.currentEmitTime < this.totalEmitTimes) {
      let i = this.rate.getValue(time);

      if (i > 0) {
        this.cID = i;
      }

      while (i--) {
        this.createParticle();
      }
    }
  }
  /**
   * Kills the emitter.
   *
   * @return void
   */


  destroy() {
    this.dead = true;
    this.energy = 0;
    this.totalEmitTimes = -1;

    if (this.particles.length == 0) {
      this.isEmitting = false;
      this.removeAllInitializers();
      this.removeAllBehaviours();
      this.dispatch(`${this.id}_${EMITTER_DEAD}`);
      this.parent && this.parent.removeEmitter(this);
    }
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbWl0dGVyL0VtaXR0ZXIuanMiXSwibmFtZXMiOlsiREVGQVVMVF9CSU5EX0VNSVRURVIiLCJERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVCIsIkRFRkFVTFRfREFNUElORyIsIkRFRkFVTFRfRU1JVFRFUl9JTkRFWCIsIkRFRkFVTFRfRU1JVFRFUl9SQVRFIiwiRXZlbnREaXNwYXRjaGVyIiwiRU1JVFRFUl9ERUFEIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX0RFQUQiLCJQQVJUSUNMRV9VUERBVEUiLCJJTlRFR1JBVElPTl9UWVBFX0VVTEVSIiwiaW50ZWdyYXRlIiwiVXRpbCIsInVpZCIsIkluaXRpYWxpemVyVXRpbCIsIlBhcnRpY2xlIiwiaXNOdW1iZXIiLCJFTUlUVEVSX1RZUEVfRU1JVFRFUiIsInR5cGUiLCJFbWl0dGVyIiwiY29uc3RydWN0b3IiLCJwcm9wZXJ0aWVzIiwicGFydGljbGVzIiwiaW5pdGlhbGl6ZXJzIiwiYmVoYXZpb3VycyIsImVtaXR0ZXJCZWhhdmlvdXJzIiwiY3VycmVudEVtaXRUaW1lIiwidG90YWxFbWl0VGltZXMiLCJkYW1waW5nIiwiYmluZEVtaXR0ZXIiLCJiaW5kRW1pdHRlckV2ZW50IiwicmF0ZSIsImlzRW1pdHRpbmciLCJpZCIsImNJRCIsIm5hbWUiLCJpbmRleCIsImV2ZW50RGlzcGF0Y2hlciIsImRpc3BhdGNoIiwiZXZlbnQiLCJ0YXJnZXQiLCJkaXNwYXRjaEV2ZW50Iiwic2V0UmF0ZSIsInNldFBvc2l0aW9uIiwibmV3UG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsInNldCIsInNldFJvdGF0aW9uIiwibmV3Um90YXRpb24iLCJyb3RhdGlvbiIsImVtaXQiLCJJbmZpbml0eSIsImxpZmUiLCJpbml0IiwiZXhwZXJpbWVudGFsX2VtaXQiLCJzZXRUb3RhbEVtaXRUaW1lcyIsInNldExpZmUiLCJzdG9wRW1pdCIsInJlbW92ZUFsbFBhcnRpY2xlcyIsImkiLCJsZW5ndGgiLCJkZWFkIiwiYWRkSW5pdGlhbGl6ZXIiLCJpbml0aWFsaXplciIsInB1c2giLCJhZGRJbml0aWFsaXplcnMiLCJzZXRJbml0aWFsaXplcnMiLCJyZW1vdmVJbml0aWFsaXplciIsImluZGV4T2YiLCJzcGxpY2UiLCJyZW1vdmVBbGxJbml0aWFsaXplcnMiLCJkZXN0cm95QXJyYXkiLCJhZGRCZWhhdmlvdXIiLCJiZWhhdmlvdXIiLCJhZGRCZWhhdmlvdXJzIiwic2V0QmVoYXZpb3VycyIsInJlbW92ZUJlaGF2aW91ciIsInJlbW92ZUFsbEJlaGF2aW91cnMiLCJhZGRFbWl0dGVyQmVoYXZpb3VyIiwiaW5pdGlhbGl6ZSIsImFkZEVtaXR0ZXJCZWhhdmlvdXJzIiwic2V0RW1pdHRlckJlaGF2aW91cnMiLCJyZW1vdmVFbWl0dGVyQmVoYXZpb3VyIiwicmVtb3ZlQWxsRW1pdHRlckJlaGF2aW91cnMiLCJhZGRPbkVtaXR0ZXJEZWFkRXZlbnRMaXN0ZW5lciIsIm9uRW1pdHRlckRlYWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlUGFydGljbGUiLCJwYXJ0aWNsZSIsInBhcmVudCIsInBvb2wiLCJnZXQiLCJzZXR1cFBhcnRpY2xlIiwidXBkYXRlIiwidGltZSIsImFnZSIsImRlc3Ryb3kiLCJnZW5lcmF0ZSIsImV4cGlyZSIsInJlc2V0IiwidXBkYXRlRW1pdHRlckJlaGF2aW91cnMiLCJzbGVlcCIsImFwcGx5QmVoYXZpb3VyIiwiaW50ZWdyYXRpb25UeXBlIiwiZ2V0VmFsdWUiLCJlbmVyZ3kiLCJyZW1vdmVFbWl0dGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUNFQSxvQkFERixFQUVFQywwQkFGRixFQUdFQyxlQUhGLEVBSUVDLHFCQUpGLEVBS0VDLG9CQUxGLFFBTU8sYUFOUDtBQU9BLE9BQU9DLGVBQVAsSUFDRUMsWUFERixFQUVFQyxnQkFGRixFQUdFQyxhQUhGLEVBSUVDLGVBSkYsUUFLTyxXQUxQO0FBTUEsU0FBU0Msc0JBQVQsRUFBaUNDLFNBQWpDLFFBQWtELFNBQWxEO0FB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QUFZLElBQVo7QUFDQSxTQUFLNEMsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLakYsY0FBTCxHQUFzQixDQUFDLENBQXZCOztBQUVBLFFBQUksS0FBS0wsU0FBTCxDQUFleUMsTUFBZixJQUF5QixDQUE3QixFQUFnQztBQUM5QixXQUFLL0IsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUt5QyxxQkFBTDtBQUNBLFdBQUtPLG1CQUFMO0FBQ0EsV0FBSzFDLFFBQUwsQ0FBZSxHQUFFLEtBQUtMLEVBQUcsSUFBRzNCLFlBQWEsRUFBekM7QUFFQSxXQUFLc0YsTUFBTCxJQUFlLEtBQUtBLE1BQUwsQ0FBWWlCLGFBQVosQ0FBMEIsSUFBMUIsQ0FBZjtBQUNEO0FBQ0Y7O0FBenBCMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBERUZBVUxUX0JJTkRfRU1JVFRFUixcbiAgREVGQVVMVF9CSU5EX0VNSVRURVJfRVZFTlQsXG4gIERFRkFVTFRfREFNUElORyxcbiAgREVGQVVMVF9FTUlUVEVSX0lOREVYLFxuICBERUZBVUxUX0VNSVRURVJfUkFURSxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciwge1xuICBFTUlUVEVSX0RFQUQsXG4gIFBBUlRJQ0xFX0NSRUFURUQsXG4gIFBBUlRJQ0xFX0RFQUQsXG4gIFBBUlRJQ0xFX1VQREFURSxcbn0gZnJvbSAnLi4vZXZlbnRzJztcbmltcG9ydCB7IElOVEVHUkFUSU9OX1RZUEVfRVVMRVIsIGludGVncmF0ZSB9IGZyb20gJy4uL21hdGgnO1xuaW1wb3J0IHsgVXRpbCwgdWlkIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgeyBJbml0aWFsaXplclV0aWwgfSBmcm9tICcuLi9pbml0aWFsaXplcic7XG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi4vY29yZS9QYXJ0aWNsZSc7XG5pbXBvcnQgaXNOdW1iZXIgZnJvbSAnbG9kYXNoL2lzTnVtYmVyJztcbmltcG9ydCB7IEVNSVRURVJfVFlQRV9FTUlUVEVSIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBFbWl0dGVycyBhcmUgdGhlIFN5c3RlbSBlbmdpbmUncyBwYXJ0aWNsZSBmYWN0b3JpZXMuIFRoZXkgY2F1c2UgcGFydGljbGVzIHRvXG4gKiBiZSByZW5kZXJlZCBieSBlbWl0dGluZyB0aGVtLCBhbmQgc3RvcmUgYWxsIHBhcnRpY2xlIGluaXRpYWxpemVycyBhbmQgYmVoYXZpb3Vycy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIgZXh0ZW5kcyBQYXJ0aWNsZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGFuIEVtaXR0ZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIC0gVGhlIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgdGhlIGVtaXR0ZXIgd2l0aFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcbiAgICBzdXBlcihwcm9wZXJ0aWVzKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBwYXJ0aWNsZXMgZW1pdHRlZCBieSB0aGlzIGVtaXR0ZXIuXG4gICAgICogQHR5cGUge2FycmF5fVxuICAgICAqL1xuICAgIHRoaXMucGFydGljbGVzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgaW5pdGlhbGl6ZXJzIGZvciBwYXJ0aWNsZXMgZW1pdHRlZCBieSB0aGlzIGVtaXR0ZXIuXG4gICAgICogQHR5cGUge2FycmF5fVxuICAgICAqL1xuICAgIHRoaXMuaW5pdGlhbGl6ZXJzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgYmVoYXZpb3VycyBmb3IgcGFydGljbGVzIGVtaXR0ZWQgYnkgdGhpcyBlbWl0dGVyLlxuICAgICAqIEB0eXBlIHthcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBiZWhhdmlvdXJzIGZvciB0aGUgZW1pdHRlci5cbiAgICAgKiBAdHlwZSB7YXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5lbWl0dGVyQmVoYXZpb3VycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGN1cnJlbnQgZW1pdCBpdGVyYXRpb24uXG4gICAgICogQHR5cGUge2ludGVnZXJ9XG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0aGUgZW1pdHRlciBzaG91bGQgZW1pdCBwYXJ0aWNsZXMuXG4gICAgICogQHR5cGUge2ludGVnZXJ9XG4gICAgICovXG4gICAgdGhpcy50b3RhbEVtaXRUaW1lcyA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGZyaWN0aW9uIGNvZWZmaWNpZW50IGZvciBhbGwgcGFydGljbGUgdG8gZW1pdCBieS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuZGFtcGluZyA9IERFRkFVTFRfREFNUElORztcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIEVuc3VyZXMgdGhhdCBwYXJ0aWNsZXMgZW1pdHRlZCBieSB0aGlzIGVtaXR0ZXIgYXJlIHBvc2l0aW9uZWRcbiAgICAgKiBhY2NvcmRpbmcgdG8gdGhlIGVtaXR0ZXIncyBwcm9wZXJ0aWVzLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuYmluZEVtaXR0ZXIgPSBERUZBVUxUX0JJTkRfRU1JVFRFUjtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERldGVybWluZXMgaWYgdGhlIGVtaXR0ZXIgd2lsbCBkaXNwYXRjaCBpbnRlcm5hbCBldmVudHMuIERlZmF1bHRzXG4gICAgICogdG8gZmFsc2VcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmJpbmRFbWl0dGVyRXZlbnQgPSBERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXQgcGVyIHNlY29uZCAoYSBbcGFydGljbGVdL2IgW3NdKVxuICAgICAqIEB0eXBlIHtSYXRlfVxuICAgICAqL1xuICAgIHRoaXMucmF0ZSA9IERFRkFVTFRfRU1JVFRFUl9SQVRFO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgZW1pdHRlciBpcyBlbWl0dGluZyBwYXJ0aWNsZXMgb3Igbm90LlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaXNFbWl0dGluZyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGVtaXR0ZXIncyBpZC5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuaWQgPSBgZW1pdHRlci0ke3VpZCgpfWA7XG4gICAgdGhpcy5jSUQgPSAwO1xuICAgIHRoaXMubmFtZSA9ICdFbWl0dGVyJztcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBpbmRleCBvZiB0aGUgZW1pdHRlciBhcyBpdCBpcyBhZGRlZCB0byB0aGUgc3lzdGVtLlxuICAgICAqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHRoaXMuaW5kZXggPSBERUZBVUxUX0VNSVRURVJfSU5ERVg7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgZW1pdHRlcidzIGludGVybmFsIGV2ZW50IGRpc3BhdGNoZXIuXG4gICAgICogQHR5cGUge0V2ZW50RGlzcGF0Y2hlcn1cbiAgICAgKi9cbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm94eSBtZXRob2QgZm9yIHRoZSBpbnRlcm5hbCBldmVudCBkaXNwYXRjaGVyJ3MgZGlzcGF0Y2hFdmVudCBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCB0byBkaXNwYXRjaFxuICAgKiBAcGFyYW0ge29iamVjdDxQYXJ0aWNsZT59IFt0YXJnZXQ9dGhpc10gLSBUaGUgZXZlbnQgdGFyZ2V0XG4gICAqL1xuICBkaXNwYXRjaChldmVudCwgdGFyZ2V0ID0gdGhpcykge1xuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZW1pdHRlciByYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JhdGV9IHJhdGUgLSBhIHJhdGUgaW5pdGlhbGl6ZXIgb2JqZWN0XG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBzZXRSYXRlKHJhdGUpIHtcbiAgICB0aGlzLnJhdGUgPSByYXRlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQb3NpdGlvbiAtIGFuIG9iamVjdCB0aGUgbmV3IHgsIHkgYW5kIHogcHJvcHNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHNldFBvc2l0aW9uKG5ld1Bvc2l0aW9uID0ge30pIHtcbiAgICBjb25zdCB7IHBvc2l0aW9uIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgeCA9IHBvc2l0aW9uLngsIHkgPSBwb3NpdGlvbi55LCB6ID0gcG9zaXRpb24ueiB9ID0gbmV3UG9zaXRpb247XG5cbiAgICB0aGlzLnBvc2l0aW9uLnNldCh4LCB5LCB6KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHJvdGF0aW9uIG9mIHRoZSBlbWl0dGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV3Um90YXRpb24gLSBhbiBvYmplY3QgdGhlIG5ldyB4LCB5IGFuZCB6IHByb3BzXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBzZXRSb3RhdGlvbihuZXdSb3RhdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgeyByb3RhdGlvbiB9ID0gdGhpcztcbiAgICBjb25zdCB7IHggPSByb3RhdGlvbi54LCB5ID0gcm90YXRpb24ueSwgeiA9IHJvdGF0aW9uLnogfSA9IG5ld1JvdGF0aW9uO1xuXG4gICAgdGhpcy5yb3RhdGlvbi5zZXQoeCwgeSwgeik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdGhlIGVtaXR0ZXIgc2hvdWxkIGVtaXQgcGFydGljbGVzIGFzIHdlbGwgYXNcbiAgICogdGhlIGVtaXR0ZXIncyBsaWZlLiBBbHNvIGludGlhbGl6ZXMgdGhlIGVtaXR0ZXIgcmF0ZS5cbiAgICogVGhpcyBlbmFibGVzIHRoZSBlbWl0dGVyIHRvIGVtaXQgcGFydGljbGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RvdGFsRW1pdFRpbWVzPUluZmluaXR5XSAtIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdG8gZW1pdCBwYXJ0aWNsZXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlciBpbiBtaWxsaXNlY29uZHNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGVtaXQodG90YWxFbWl0VGltZXMgPSBJbmZpbml0eSwgbGlmZSA9IEluZmluaXR5KSB7XG4gICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgPSAwO1xuICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSBpc051bWJlcih0b3RhbEVtaXRUaW1lcykgPyB0b3RhbEVtaXRUaW1lcyA6IEluZmluaXR5O1xuXG4gICAgaWYgKHRvdGFsRW1pdFRpbWVzID09PSAxKSB7XG4gICAgICB0aGlzLmxpZmUgPSB0b3RhbEVtaXRUaW1lcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saWZlID0gaXNOdW1iZXIobGlmZSkgPyBsaWZlIDogSW5maW5pdHk7XG4gICAgfVxuXG4gICAgdGhpcy5yYXRlLmluaXQoKTtcbiAgICB0aGlzLmlzRW1pdHRpbmcgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRXhwZXJpbWVudGFsIGVtaXQgbWV0aG9kIHRoYXQgaXMgZGVzaWduZWQgdG8gYmUgY2FsbGVkIGZyb20gdGhlIFN5c3RlbS5lbWl0IG1ldGhvZC5cbiAgICpcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGV4cGVyaW1lbnRhbF9lbWl0KCkge1xuICAgIGNvbnN0IHsgaXNFbWl0dGluZywgdG90YWxFbWl0VGltZXMsIGxpZmUgfSA9IHRoaXM7XG5cbiAgICBpZiAoIWlzRW1pdHRpbmcpIHtcbiAgICAgIHRoaXMuY3VycmVudEVtaXRUaW1lID0gMDtcblxuICAgICAgaWYgKCF0b3RhbEVtaXRUaW1lcykge1xuICAgICAgICB0aGlzLnNldFRvdGFsRW1pdFRpbWVzKEluZmluaXR5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsaWZlKSB7XG4gICAgICAgIHRoaXMuc2V0TGlmZShJbmZpbml0eSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmF0ZS5pbml0KCk7XG4gICAgICB0aGlzLmlzRW1pdHRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRvdGFsIGVtaXQgdGltZXMgZm9yIHRoZSBlbWl0dGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RvdGFsRW1pdFRpbWVzPUluZmluaXR5XSAtIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdG8gZW1pdCBwYXJ0aWNsZXNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHNldFRvdGFsRW1pdFRpbWVzKHRvdGFsRW1pdFRpbWVzID0gSW5maW5pdHkpIHtcbiAgICB0aGlzLnRvdGFsRW1pdFRpbWVzID0gaXNOdW1iZXIodG90YWxFbWl0VGltZXMpID8gdG90YWxFbWl0VGltZXMgOiBJbmZpbml0eTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpZmUgb2YgdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSB0aGUgbGlmZSBvZiB0aGlzIGVtaXR0ZXIgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBzZXRMaWZlKGxpZmUgPSBJbmZpbml0eSkge1xuICAgIGlmICh0aGlzLnRvdGFsRW1pdFRpbWVzID09PSAxKSB7XG4gICAgICB0aGlzLmxpZmUgPSB0aGlzLnRvdGFsRW1pdFRpbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpZmUgPSBpc051bWJlcihsaWZlKSA/IGxpZmUgOiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgZW1pdHRlciBmcm9tIGVtaXR0aW5nIHBhcnRpY2xlcy5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBzdG9wRW1pdCgpIHtcbiAgICB0aGlzLnRvdGFsRW1pdFRpbWVzID0gLTE7XG4gICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgPSAwO1xuICAgIHRoaXMuaXNFbWl0dGluZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEtpbGxzIGFsbCBvZiB0aGUgZW1pdHRlcidzIHBhcnRpY2xlcy5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZW1vdmVBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHBhcnRpY2xlIGluaXRpYWxpemVyIHRvIHRoZSBlbWl0dGVyLlxuICAgKiBFYWNoIGluaXRpYWxpemVyIGlzIHJ1biBvbiBlYWNoIHBhcnRpY2xlIHdoZW4gdGhleSBhcmUgY3JlYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtJbml0aWFsaXplcn0gaW5pdGlhbGl6ZXIgLSBUaGUgaW5pdGlhbGl6ZXIgdG8gYWRkXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBhZGRJbml0aWFsaXplcihpbml0aWFsaXplcikge1xuICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnB1c2goaW5pdGlhbGl6ZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBtdWx0aXBsZSBwYXJ0aWNsZSBpbml0aWFsaXplcnMgdG8gdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8SW5pdGlhbGl6ZXI+fSBpbml0aWFsaXplcnMgLSBhbiBhcnJheSBvZiBwYXJ0aWNsZSBpbml0aWFsaXplcnNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGFkZEluaXRpYWxpemVycyhpbml0aWFsaXplcnMpIHtcbiAgICBsZXQgaSA9IGluaXRpYWxpemVycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZEluaXRpYWxpemVyKGluaXRpYWxpemVyc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZW1pdHRlcidzIHBhcnRpY2xlIGluaXRpYWxpemVycy5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheTxJbml0aWFsaXplcj59IGluaXRpYWxpemVycyAtIGFuIGFycmF5IG9mIHBhcnRpY2xlIGluaXRpYWxpemVyc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgc2V0SW5pdGlhbGl6ZXJzKGluaXRpYWxpemVycykge1xuICAgIHRoaXMuaW5pdGlhbGl6ZXJzID0gaW5pdGlhbGl6ZXJzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBpbml0aWFsaXplciBmcm9tIHRoZSBlbWl0dGVyJ3MgaW5pdGlhbGl6ZXJzIGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0luaXRpYWxpemVyfSBpbml0aWFsaXplciAtIFRoZSBpbml0aWFsaXplciB0byByZW1vdmVcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHJlbW92ZUluaXRpYWxpemVyKGluaXRpYWxpemVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmluaXRpYWxpemVycy5pbmRleE9mKGluaXRpYWxpemVyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGluaXRpYWxpemVycy5cbiAgICpcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBcnJheSh0aGlzLmluaXRpYWxpemVycyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgYmVoYXZpb3VyIHRvIHRoZSBlbWl0dGVyLiBBbGwgZW1pdHRlciBiZWhhdmlvdXJzIGFyZSBhZGRlZCB0byBlYWNoIHBhcnRpY2xlIHdoZW5cbiAgICogdGhleSBhcmUgZW1pdHRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gYWRkIHRvIHRoZSBlbWl0dGVyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbXVsdGlwbGUgYmVoYXZpb3VycyB0byB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheTxCZWhhdmlvdXI+fSBiZWhhdmlvdXJzIC0gYW4gYXJyYXkgb2YgZW1pdHRlciBiZWhhdmlvdXJzXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBhZGRCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBsZXQgaSA9IGJlaGF2aW91cnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5hZGRCZWhhdmlvdXIoYmVoYXZpb3Vyc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZW1pdHRlcidzIGJlaGF2aW91cnMuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8QmVoYXZpb3VyPn0gYmVoYXZpb3VycyAtIGFuIGFycmF5IG9mIGVtaXR0ZXIgYmVoYXZpb3Vyc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgc2V0QmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzID0gYmVoYXZpb3VycztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGJlaGF2aW91ciBmcm9tIHRoZSBlbWl0dGVyJ3MgYmVoYXZpb3VycyBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGJlaGF2aW91cnMgZnJvbSB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZW1pdHRlciBiZWhhdmlvdXIgdG8gdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgLSBUaGUgYmVoYXZpb3VyIHRvIGFkZCB0byB0aGUgZW1pdHRlclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgYWRkRW1pdHRlckJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBtdWx0aXBsZSBiZWhhdmlvdXJzIHRvIHRoZSBlbWl0dGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5PEJlaGF2aW91cj59IGJlaGF2aW91cnMgLSBhbiBhcnJheSBvZiBlbWl0dGVyIGJlaGF2aW91cnNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGFkZEVtaXR0ZXJCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBsZXQgaSA9IGJlaGF2aW91cnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5hZGRFbWl0dGVyQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGVtaXR0ZXIncyBiZWhhdmlvdXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5PEJlaGF2aW91cj59IGJlaGF2aW91cnMgLSBhbiBhcnJheSBvZiBlbWl0dGVyIGJlaGF2aW91cnNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHNldEVtaXR0ZXJCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICBjb25zdCBsZW5ndGggPSBiZWhhdmlvdXJzLmxlbmd0aDtcblxuICAgIHRoaXMuZW1pdHRlckJlaGF2aW91cnMgPSBiZWhhdmlvdXJzO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5lbWl0dGVyQmVoYXZpb3Vyc1tpXS5pbml0aWFsaXplKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGJlaGF2aW91ciBmcm9tIHRoZSBlbWl0dGVyJ3MgYmVoYXZpb3VycyBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICByZW1vdmVFbWl0dGVyQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVyQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5lbWl0dGVyQmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGJlaGF2aW91cnMgZnJvbSB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHJlbW92ZUFsbEVtaXR0ZXJCZWhhdmlvdXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFycmF5KHRoaXMuZW1pdHRlckJlaGF2aW91cnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBFTUlUVEVSX0RFQUQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7b25FbWl0dGVyRGVhZH0gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBFTUlUVEVSX0RFQUQgaXMgZGlzcGF0Y2hlZC5cbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGFkZE9uRW1pdHRlckRlYWRFdmVudExpc3RlbmVyKG9uRW1pdHRlckRlYWQpIHtcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKGAke3RoaXMuaWR9XyR7RU1JVFRFUl9ERUFEfWAsICgpID0+XG4gICAgICBvbkVtaXR0ZXJEZWFkKClcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHBhcnRpY2xlIGJ5IHJldHJlaXZpbmcgb25lIGZyb20gdGhlIHBvb2wgYW5kIHNldHRpbmcgaXQgdXAgd2l0aFxuICAgKiB0aGUgc3VwcGxpZWQgaW5pdGlhbGl6ZXIgYW5kIGJlaGF2aW91ci5cbiAgICpcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGNyZWF0ZVBhcnRpY2xlKCkge1xuICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJlbnQucG9vbC5nZXQoUGFydGljbGUpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuXG4gICAgdGhpcy5zZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbmRleCk7XG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzcGF0Y2goUEFSVElDTEVfQ1JFQVRFRCwgcGFydGljbGUpO1xuICAgIHRoaXMuYmluZEVtaXR0ZXJFdmVudCAmJiB0aGlzLmRpc3BhdGNoKFBBUlRJQ0xFX0NSRUFURUQsIHBhcnRpY2xlKTtcblxuICAgIHJldHVybiBwYXJ0aWNsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIGEgcGFydGljbGUgYnkgcnVubmluZyBhbGwgaW5pdGlhbGl6ZXJzIG9uIGl0IGFuZCBzZXR0aW5nIGl0cyBiZWhhdmlvdXJzLlxuICAgKiBBbHNvIGFkZHMgdGhlIHBhcnRpY2xlIHRvIHRoaXMucGFydGljbGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBzZXR1cFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHNldHVwUGFydGljbGUocGFydGljbGUsIGluZGV4KSB7XG4gICAgY29uc3QgeyBpbml0aWFsaXplcnMsIGJlaGF2aW91cnMgfSA9IHRoaXM7XG5cbiAgICBJbml0aWFsaXplclV0aWwuaW5pdGlhbGl6ZSh0aGlzLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXJzKTtcblxuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XG4gICAgcGFydGljbGUucGFyZW50ID0gdGhpcztcbiAgICBwYXJ0aWNsZS5pbmRleCA9IGluZGV4O1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZW1pdHRlciBhY2NvcmRpbmcgdG8gdGhlIHRpbWUgcGFzc2VkIGJ5IGNhbGxpbmcgdGhlIGdlbmVyYXRlXG4gICAqIGFuZCBpbnRlZ3JhdGUgbWV0aG9kcy4gVGhlIGdlbmVyYXRlIG1ldGhvZCBjcmVhdGVzIHBhcnRpY2xlcywgdGhlIGludGVncmF0ZVxuICAgKiBtZXRob2QgdXBkYXRlcyBleGlzdGluZyBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIElmIHRoZSBlbWl0dGVyIGFnZSBpcyBncmVhdGVyIHRoYW4gdGltZSwgdGhlIGVtaXR0ZXIgaXMga2lsbGVkLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBhbHNvIGluZGV4ZXMvZGVpbmRleGVzIHBhcnRpY2xlcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBTeXN0ZW0gZW5naW5lIHRpbWVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICB1cGRhdGUodGltZSkge1xuICAgIGlmICghdGhpcy5pc0VtaXR0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmRlYWQgfHwgdGhpcy5hZ2UgPj0gdGhpcy5saWZlKSB7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLmdlbmVyYXRlKHRpbWUpO1xuICAgIHRoaXMuaW50ZWdyYXRlKHRpbWUpO1xuXG4gICAgbGV0IGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xuXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xuICAgICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaChQQVJUSUNMRV9ERUFELCBwYXJ0aWNsZSk7XG4gICAgICAgIHRoaXMuYmluZEVtaXR0ZXJFdmVudCAmJiB0aGlzLmRpc3BhdGNoKFBBUlRJQ0xFX0RFQUQsIHBhcnRpY2xlKTtcbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUucmVzZXQoKSk7XG4gICAgICAgIHRoaXMucGFydGljbGVzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUVtaXR0ZXJCZWhhdmlvdXJzKHRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGVtaXR0ZXIncyBlbWl0dGVyIGJlaGF2aW91cnMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gU3lzdGVtIGVuZ2luZSB0aW1lXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgdXBkYXRlRW1pdHRlckJlaGF2aW91cnModGltZSkge1xuICAgIGlmICh0aGlzLnNsZWVwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5lbWl0dGVyQmVoYXZpb3Vycy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzW2ldLmFwcGx5QmVoYXZpb3VyKHRoaXMsIHRpbWUsIGkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBpbnRlZ3JhdGlvbiBhbGdvcml0aG0gb24gdGhlIGVtaXR0ZXIgYW5kIGFsbCBwYXJ0aWNsZXMuXG4gICAqIFVwZGF0ZXMgdGhlIHBhcnRpY2xlcyB3aXRoIHRoZSB0aW1zdGFtcCBwYXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gU3lzdGVtIGVuZ2luZSB0aW1lXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW50ZWdyYXRlKHRpbWUpIHtcbiAgICBjb25zdCBpbnRlZ3JhdGlvblR5cGUgPSB0aGlzLnBhcmVudFxuICAgICAgPyB0aGlzLnBhcmVudC5pbnRlZ3JhdGlvblR5cGVcbiAgICAgIDogSU5URUdSQVRJT05fVFlQRV9FVUxFUjtcbiAgICBjb25zdCBkYW1waW5nID0gMSAtIHRoaXMuZGFtcGluZztcblxuICAgIGludGVncmF0ZSh0aGlzLCB0aW1lLCBkYW1waW5nLCBpbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaW5kZXhdO1xuXG4gICAgICBwYXJ0aWNsZS51cGRhdGUodGltZSwgaW5kZXgpO1xuICAgICAgaW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nLCBpbnRlZ3JhdGlvblR5cGUpO1xuXG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaChQQVJUSUNMRV9VUERBVEUsIHBhcnRpY2xlKTtcbiAgICAgIHRoaXMuYmluZEVtaXR0ZXJFdmVudCAmJiB0aGlzLmRpc3BhdGNoKFBBUlRJQ0xFX1VQREFURSwgcGFydGljbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgbmV3IHBhcnRpY2xlcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBTeXN0ZW0gZW5naW5lIHRpbWVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBnZW5lcmF0ZSh0aW1lKSB7XG4gICAgaWYgKHRoaXMudG90YWxFbWl0VGltZXMgPT09IDEpIHtcbiAgICAgIGxldCBpID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIHRoaXMuY0lEID0gaTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB0aGlzLmNyZWF0ZVBhcnRpY2xlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSAwO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRFbWl0VGltZSA8IHRoaXMudG90YWxFbWl0VGltZXMpIHtcbiAgICAgIGxldCBpID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xuXG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgdGhpcy5jSUQgPSBpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogS2lsbHMgdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMuZW5lcmd5ID0gMDtcbiAgICB0aGlzLnRvdGFsRW1pdFRpbWVzID0gLTE7XG5cbiAgICBpZiAodGhpcy5wYXJ0aWNsZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuaXNFbWl0dGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxJbml0aWFsaXplcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgICAgdGhpcy5kaXNwYXRjaChgJHt0aGlzLmlkfV8ke0VNSVRURVJfREVBRH1gKTtcblxuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVtb3ZlRW1pdHRlcih0aGlzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==