"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _constants = require("./constants");

var _events = _interopRequireWildcard(require("../events"));

var _math = require("../math");

var _utils = require("../utils");

var _initializer = require("../initializer");

var _Particle2 = _interopRequireDefault(require("../core/Particle"));

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Emitters are the System engine's particle factories. They cause particles to
 * be rendered by emitting them, and store all particle initializers and behaviours.
 *
 */
var Emitter = /*#__PURE__*/function (_Particle) {
  (0, _inherits2["default"])(Emitter, _Particle);

  var _super = _createSuper(Emitter);

  /**
   * Constructs an Emitter instance.
   *
   * @param {object} properties - The properties to instantiate the emitter with
   * @return void
   */
  function Emitter(properties) {
    var _this;

    (0, _classCallCheck2["default"])(this, Emitter);
    _this = _super.call(this, properties);
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.EMITTER_TYPE_EMITTER;
    /**
     * @desc The particles emitted by this emitter.
     * @type {array}
     */

    _this.particles = [];
    /**
     * @desc The initializers for particles emitted by this emitter.
     * @type {array}
     */

    _this.initializers = [];
    /**
     * @desc The behaviours for particles emitted by this emitter.
     * @type {array}
     */

    _this.behaviours = [];
    /**
     * @desc The behaviours for the emitter.
     * @type {array}
     */

    _this.emitterBehaviours = [];
    /**
     * @desc The current emit iteration.
     * @type {integer}
     */

    _this.currentEmitTime = 0;
    /**
     * @desc The total number of times the emitter should emit particles.
     * @type {integer}
     */

    _this.totalEmitTimes = -1;
    /**
     * @desc The friction coefficient for all particle to emit by.
     * @type {number}
     */

    _this.damping = _constants.DEFAULT_DAMPING;
    /**
     * @desc Ensures that particles emitted by this emitter are positioned
     * according to the emitter's properties.
     * @type {boolean}
     */

    _this.bindEmitter = _constants.DEFAULT_BIND_EMITTER;
    /**
     * @desc Determines if the emitter will dispatch internal events. Defaults
     * to false
     * @type {boolean}
     */

    _this.bindEmitterEvent = _constants.DEFAULT_BIND_EMITTER_EVENT;
    /**
     * @desc The number of particles to emit per second (a [particle]/b [s])
     * @type {Rate}
     */

    _this.rate = _constants.DEFAULT_EMITTER_RATE;
    /**
     * @desc Determines if the emitter is emitting particles or not.
     * @type {boolean}
     */

    _this.isEmitting = false;
    /**
     * @desc The emitter's id.
     * @type {string}
     */

    _this.id = "emitter-".concat((0, _utils.uid)());
    _this.cID = 0;
    _this.name = 'Emitter';
    /**
     * @desc The index of the emitter as it is added to the system.
     * @type {number|undefined}
     */

    _this.index = _constants.DEFAULT_EMITTER_INDEX;
    /**
     * @desc The emitter's internal event dispatcher.
     * @type {EventDispatcher}
     */

    _this.eventDispatcher = new _events["default"]();
    return _this;
  }
  /**
   * Proxy method for the internal event dispatcher's dispatchEvent method.
   *
   * @param {string} event - The event to dispatch
   * @param {object<Particle>} [target=this] - The event target
   */


  (0, _createClass2["default"])(Emitter, [{
    key: "dispatch",
    value: function dispatch(event) {
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      this.eventDispatcher.dispatchEvent(event, target);
    }
    /**
     * Sets the emitter rate.
     *
     * @param {Rate} rate - a rate initializer object
     * @return {Emitter}
     */

  }, {
    key: "setRate",
    value: function setRate(rate) {
      this.rate = rate;
      return this;
    }
    /**
     * Sets the position of the emitter.
     *
     * @param {object} newPosition - an object the new x, y and z props
     * @return {Emitter}
     */

  }, {
    key: "setPosition",
    value: function setPosition() {
      var newPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var position = this.position;
      var _newPosition$x = newPosition.x,
          x = _newPosition$x === void 0 ? position.x : _newPosition$x,
          _newPosition$y = newPosition.y,
          y = _newPosition$y === void 0 ? position.y : _newPosition$y,
          _newPosition$z = newPosition.z,
          z = _newPosition$z === void 0 ? position.z : _newPosition$z;
      this.position.set(x, y, z);
      return this;
    }
    /**
     * Sets the rotation of the emitter.
     *
     * @param {object} newRotation - an object the new x, y and z props
     * @return {Emitter}
     */

  }, {
    key: "setRotation",
    value: function setRotation() {
      var newRotation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var rotation = this.rotation;
      var _newRotation$x = newRotation.x,
          x = _newRotation$x === void 0 ? rotation.x : _newRotation$x,
          _newRotation$y = newRotation.y,
          y = _newRotation$y === void 0 ? rotation.y : _newRotation$y,
          _newRotation$z = newRotation.z,
          z = _newRotation$z === void 0 ? rotation.z : _newRotation$z;
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

  }, {
    key: "emit",
    value: function emit() {
      var totalEmitTimes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
      var life = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      this.currentEmitTime = 0;
      this.totalEmitTimes = (0, _isNumber["default"])(totalEmitTimes) ? totalEmitTimes : Infinity;

      if (totalEmitTimes === 1) {
        this.life = totalEmitTimes;
      } else {
        this.life = (0, _isNumber["default"])(life) ? life : Infinity;
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

  }, {
    key: "experimental_emit",
    value: function experimental_emit() {
      var isEmitting = this.isEmitting,
          totalEmitTimes = this.totalEmitTimes,
          life = this.life;

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

  }, {
    key: "setTotalEmitTimes",
    value: function setTotalEmitTimes() {
      var totalEmitTimes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
      this.totalEmitTimes = (0, _isNumber["default"])(totalEmitTimes) ? totalEmitTimes : Infinity;
      return this;
    }
    /**
     * Sets the life of the emitter.
     *
     * @param {number} [life=Infinity] - the life of this emitter in milliseconds
     * @return {Emitter}
     */

  }, {
    key: "setLife",
    value: function setLife() {
      var life = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;

      if (this.totalEmitTimes === 1) {
        this.life = this.totalEmitTimes;
      } else {
        this.life = (0, _isNumber["default"])(life) ? life : Infinity;
      }

      return this;
    }
    /**
     * Stops the emitter from emitting particles.
     *
     * @return void
     */

  }, {
    key: "stopEmit",
    value: function stopEmit() {
      this.totalEmitTimes = -1;
      this.currentEmitTime = 0;
      this.isEmitting = false;
    }
    /**
     * Kills all of the emitter's particles.
     *
     * @return void
     */

  }, {
    key: "removeAllParticles",
    value: function removeAllParticles() {
      var i = this.particles.length;

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

  }, {
    key: "addInitializer",
    value: function addInitializer(initializer) {
      this.initializers.push(initializer);
      return this;
    }
    /**
     * Adds multiple particle initializers to the emitter.
     *
     * @param {array<Initializer>} initializers - an array of particle initializers
     * @return {Emitter}
     */

  }, {
    key: "addInitializers",
    value: function addInitializers(initializers) {
      var i = initializers.length;

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

  }, {
    key: "setInitializers",
    value: function setInitializers(initializers) {
      this.initializers = initializers;
      return this;
    }
    /**
     * Removes an initializer from the emitter's initializers array.
     *
     * @param {Initializer} initializer - The initializer to remove
     * @return {Emitter}
     */

  }, {
    key: "removeInitializer",
    value: function removeInitializer(initializer) {
      var index = this.initializers.indexOf(initializer);

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

  }, {
    key: "removeAllInitializers",
    value: function removeAllInitializers() {
      _utils.Util.destroyArray(this.initializers);

      return this;
    }
    /**
     * Adds a behaviour to the emitter. All emitter behaviours are added to each particle when
     * they are emitted.
     *
     * @param {Behaviour} behaviour - The behaviour to add to the emitter
     * @return {Emitter}
     */

  }, {
    key: "addBehaviour",
    value: function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);
      return this;
    }
    /**
     * Adds multiple behaviours to the emitter.
     *
     * @param {array<Behaviour>} behaviours - an array of emitter behaviours
     * @return {Emitter}
     */

  }, {
    key: "addBehaviours",
    value: function addBehaviours(behaviours) {
      var i = behaviours.length;

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

  }, {
    key: "setBehaviours",
    value: function setBehaviours(behaviours) {
      this.behaviours = behaviours;
      return this;
    }
    /**
     * Removes the behaviour from the emitter's behaviours array.
     *
     * @param {Behaviour} behaviour - The behaviour to remove
     * @return {Emitter}
     */

  }, {
    key: "removeBehaviour",
    value: function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);

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

  }, {
    key: "removeAllBehaviours",
    value: function removeAllBehaviours() {
      _utils.Util.destroyArray(this.behaviours);

      return this;
    }
    /**
     * Adds an emitter behaviour to the emitter.
     *
     * @param {Behaviour} behaviour - The behaviour to add to the emitter
     * @return {Emitter}
     */

  }, {
    key: "addEmitterBehaviour",
    value: function addEmitterBehaviour(behaviour) {
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

  }, {
    key: "addEmitterBehaviours",
    value: function addEmitterBehaviours(behaviours) {
      var i = behaviours.length;

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

  }, {
    key: "setEmitterBehaviours",
    value: function setEmitterBehaviours(behaviours) {
      var length = behaviours.length;
      this.emitterBehaviours = behaviours;

      for (var i = 0; i < length; i++) {
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

  }, {
    key: "removeEmitterBehaviour",
    value: function removeEmitterBehaviour(behaviour) {
      var index = this.emitterBehaviours.indexOf(behaviour);

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

  }, {
    key: "removeAllEmitterBehaviours",
    value: function removeAllEmitterBehaviours() {
      _utils.Util.destroyArray(this.emitterBehaviours);

      return this;
    }
    /**
     * Adds the event listener for the EMITTER_DEAD event.
     *
     * @param {onEmitterDead} - The function to call when the EMITTER_DEAD is dispatched.
     * @return {Emitter}
     */

  }, {
    key: "addOnEmitterDeadEventListener",
    value: function addOnEmitterDeadEventListener(onEmitterDead) {
      this.eventDispatcher.addEventListener("".concat(this.id, "_").concat(_events.EMITTER_DEAD), function () {
        return onEmitterDead();
      });
      return this;
    }
    /**
     * Creates a particle by retreiving one from the pool and setting it up with
     * the supplied initializer and behaviour.
     *
     * @return {Emitter}
     */

  }, {
    key: "createParticle",
    value: function createParticle() {
      var particle = this.parent.pool.get(_Particle2["default"]);
      var index = this.particles.length;
      this.setupParticle(particle, index);
      this.parent && this.parent.dispatch(_events.PARTICLE_CREATED, particle);
      this.bindEmitterEvent && this.dispatch(_events.PARTICLE_CREATED, particle);
      return particle;
    }
    /**
     * Sets up a particle by running all initializers on it and setting its behaviours.
     * Also adds the particle to this.particles.
     *
     * @param {Particle} particle - The particle to setup
     * @return void
     */

  }, {
    key: "setupParticle",
    value: function setupParticle(particle, index) {
      var initializers = this.initializers,
          behaviours = this.behaviours;

      _initializer.InitializerUtil.initialize(this, particle, initializers);

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

  }, {
    key: "update",
    value: function update(time) {
      if (!this.isEmitting) {
        return;
      }

      this.age += time;

      if (this.dead || this.age >= this.life) {
        this.destroy();
      }

      this.generate(time);
      this.integrate(time);
      var i = this.particles.length;

      while (i--) {
        var particle = this.particles[i];

        if (particle.dead) {
          this.parent && this.parent.dispatch(_events.PARTICLE_DEAD, particle);
          this.bindEmitterEvent && this.dispatch(_events.PARTICLE_DEAD, particle);
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

  }, {
    key: "updateEmitterBehaviours",
    value: function updateEmitterBehaviours(time) {
      if (this.sleep) {
        return;
      }

      var length = this.emitterBehaviours.length;

      for (var i = 0; i < length; i++) {
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

  }, {
    key: "integrate",
    value: function integrate(time) {
      var integrationType = this.parent ? this.parent.integrationType : _math.INTEGRATION_TYPE_EULER;
      var damping = 1 - this.damping;
      (0, _math.integrate)(this, time, damping, integrationType);
      var index = this.particles.length;

      while (index--) {
        var particle = this.particles[index];
        particle.update(time, index);
        (0, _math.integrate)(particle, time, damping, integrationType);
        this.parent && this.parent.dispatch(_events.PARTICLE_UPDATE, particle);
        this.bindEmitterEvent && this.dispatch(_events.PARTICLE_UPDATE, particle);
      }
    }
    /**
     * Generates new particles.
     *
     * @param {number} time - System engine time
     * @return void
     */

  }, {
    key: "generate",
    value: function generate(time) {
      if (this.totalEmitTimes === 1) {
        var i = this.rate.getValue(99999);

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
        var _i = this.rate.getValue(time);

        if (_i > 0) {
          this.cID = _i;
        }

        while (_i--) {
          this.createParticle();
        }
      }
    }
    /**
     * Kills the emitter.
     *
     * @return void
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.dead = true;
      this.energy = 0;
      this.totalEmitTimes = -1;

      if (this.particles.length == 0) {
        this.isEmitting = false;
        this.removeAllInitializers();
        this.removeAllBehaviours();
        this.dispatch("".concat(this.id, "_").concat(_events.EMITTER_DEAD));
        this.parent && this.parent.removeEmitter(this);
      }
    }
  }]);
  return Emitter;
}(_Particle2["default"]);

exports["default"] = Emitter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbWl0dGVyL0VtaXR0ZXIuanMiXSwibmFtZXMiOlsiRW1pdHRlciIsInByb3BlcnRpZXMiLCJ0eXBlIiwicGFydGljbGVzIiwiaW5pdGlhbGl6ZXJzIiwiYmVoYXZpb3VycyIsImVtaXR0ZXJCZWhhdmlvdXJzIiwiY3VycmVudEVtaXRUaW1lIiwidG90YWxFbWl0VGltZXMiLCJkYW1waW5nIiwiREVGQVVMVF9EQU1QSU5HIiwiYmluZEVtaXR0ZXIiLCJERUZBVUxUX0JJTkRfRU1JVFRFUiIsImJpbmRFbWl0dGVyRXZlbnQiLCJERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVCIsInJhdGUiLCJERUZBVUxUX0VNSVRURVJfUkFURSIsImlzRW1pdHRpbmciLCJpZCIsImNJRCIsIm5hbWUiLCJpbmRleCIsIkRFRkFVTFRfRU1JVFRFUl9JTkRFWCIsImV2ZW50RGlzcGF0Y2hlciIsIkV2ZW50RGlzcGF0Y2hlciIsImV2ZW50IiwidGFyZ2V0IiwiZGlzcGF0Y2hFdmVudCIsIm5ld1Bvc2l0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInoiLCJzZXQiLCJuZXdSb3RhdGlvbiIsInJvdGF0aW9uIiwiSW5maW5pdHkiLCJsaWZlIiwiaW5pdCIsInNldFRvdGFsRW1pdFRpbWVzIiwic2V0TGlmZSIsImkiLCJsZW5ndGgiLCJkZWFkIiwiaW5pdGlhbGl6ZXIiLCJwdXNoIiwiYWRkSW5pdGlhbGl6ZXIiLCJpbmRleE9mIiwic3BsaWNlIiwiVXRpbCIsImRlc3Ryb3lBcnJheSIsImJlaGF2aW91ciIsImFkZEJlaGF2aW91ciIsImluaXRpYWxpemUiLCJhZGRFbWl0dGVyQmVoYXZpb3VyIiwib25FbWl0dGVyRGVhZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJFTUlUVEVSX0RFQUQiLCJwYXJ0aWNsZSIsInBhcmVudCIsInBvb2wiLCJnZXQiLCJQYXJ0aWNsZSIsInNldHVwUGFydGljbGUiLCJkaXNwYXRjaCIsIlBBUlRJQ0xFX0NSRUFURUQiLCJJbml0aWFsaXplclV0aWwiLCJhZGRCZWhhdmlvdXJzIiwidGltZSIsImFnZSIsImRlc3Ryb3kiLCJnZW5lcmF0ZSIsImludGVncmF0ZSIsIlBBUlRJQ0xFX0RFQUQiLCJleHBpcmUiLCJyZXNldCIsInVwZGF0ZUVtaXR0ZXJCZWhhdmlvdXJzIiwic2xlZXAiLCJhcHBseUJlaGF2aW91ciIsImludGVncmF0aW9uVHlwZSIsIklOVEVHUkFUSU9OX1RZUEVfRVVMRVIiLCJ1cGRhdGUiLCJQQVJUSUNMRV9VUERBVEUiLCJnZXRWYWx1ZSIsImNyZWF0ZVBhcnRpY2xlIiwiZW5lcmd5IiwicmVtb3ZlQWxsSW5pdGlhbGl6ZXJzIiwicmVtb3ZlQWxsQmVoYXZpb3VycyIsInJlbW92ZUVtaXR0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQU1BOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsbUJBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFBQTtBQUN0Qiw4QkFBTUEsVUFBTjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLElBQUwsR0FBWUEsMkJBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxpQkFBTCxHQUF5QixFQUF6QjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxjQUFMLEdBQXNCLENBQUMsQ0FBdkI7QUFFQTtBQUNKO0FBQ0E7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UUFBTCxXQUFpQixLQUFLOUMsRUFBdEIsY0FBNEJ1QyxvQkFBNUI7QUFFQSxhQUFLRSxNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZNkIsYUFBWixDQUEwQixJQUExQixDQUFmO0FBQ0Q7QUFDRjs7O0VBenBCa0MxQixxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERFRkFVTFRfQklORF9FTUlUVEVSLFxuICBERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVCxcbiAgREVGQVVMVF9EQU1QSU5HLFxuICBERUZBVUxUX0VNSVRURVJfSU5ERVgsXG4gIERFRkFVTFRfRU1JVFRFUl9SQVRFLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyLCB7XG4gIEVNSVRURVJfREVBRCxcbiAgUEFSVElDTEVfQ1JFQVRFRCxcbiAgUEFSVElDTEVfREVBRCxcbiAgUEFSVElDTEVfVVBEQVRFLFxufSBmcm9tICcuLi9ldmVudHMnO1xuaW1wb3J0IHsgSU5URUdSQVRJT05fVFlQRV9FVUxFUiwgaW50ZWdyYXRlIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBVdGlsLCB1aWQgfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCB7IEluaXRpYWxpemVyVXRpbCB9IGZyb20gJy4uL2luaXRpYWxpemVyJztcbmltcG9ydCBQYXJ0aWNsZSBmcm9tICcuLi9jb3JlL1BhcnRpY2xlJztcbmltcG9ydCBpc051bWJlciBmcm9tICdsb2Rhc2gvaXNOdW1iZXInO1xuaW1wb3J0IHsgRU1JVFRFUl9UWVBFX0VNSVRURVIgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEVtaXR0ZXJzIGFyZSB0aGUgU3lzdGVtIGVuZ2luZSdzIHBhcnRpY2xlIGZhY3Rvcmllcy4gVGhleSBjYXVzZSBwYXJ0aWNsZXMgdG9cbiAqIGJlIHJlbmRlcmVkIGJ5IGVtaXR0aW5nIHRoZW0sIGFuZCBzdG9yZSBhbGwgcGFydGljbGUgaW5pdGlhbGl6ZXJzIGFuZCBiZWhhdmlvdXJzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlciBleHRlbmRzIFBhcnRpY2xlIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYW4gRW1pdHRlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByb3BlcnRpZXMgLSBUaGUgcHJvcGVydGllcyB0byBpbnN0YW50aWF0ZSB0aGUgZW1pdHRlciB3aXRoXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcGVydGllcykge1xuICAgIHN1cGVyKHByb3BlcnRpZXMpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlcyBlbWl0dGVkIGJ5IHRoaXMgZW1pdHRlci5cbiAgICAgKiBAdHlwZSB7YXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBpbml0aWFsaXplcnMgZm9yIHBhcnRpY2xlcyBlbWl0dGVkIGJ5IHRoaXMgZW1pdHRlci5cbiAgICAgKiBAdHlwZSB7YXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5pbml0aWFsaXplcnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBiZWhhdmlvdXJzIGZvciBwYXJ0aWNsZXMgZW1pdHRlZCBieSB0aGlzIGVtaXR0ZXIuXG4gICAgICogQHR5cGUge2FycmF5fVxuICAgICAqL1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGJlaGF2aW91cnMgZm9yIHRoZSBlbWl0dGVyLlxuICAgICAqIEB0eXBlIHthcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY3VycmVudCBlbWl0IGl0ZXJhdGlvbi5cbiAgICAgKiBAdHlwZSB7aW50ZWdlcn1cbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRFbWl0VGltZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRoZSBlbWl0dGVyIHNob3VsZCBlbWl0IHBhcnRpY2xlcy5cbiAgICAgKiBAdHlwZSB7aW50ZWdlcn1cbiAgICAgKi9cbiAgICB0aGlzLnRvdGFsRW1pdFRpbWVzID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQgZm9yIGFsbCBwYXJ0aWNsZSB0byBlbWl0IGJ5LlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5kYW1waW5nID0gREVGQVVMVF9EQU1QSU5HO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRW5zdXJlcyB0aGF0IHBhcnRpY2xlcyBlbWl0dGVkIGJ5IHRoaXMgZW1pdHRlciBhcmUgcG9zaXRpb25lZFxuICAgICAqIGFjY29yZGluZyB0byB0aGUgZW1pdHRlcidzIHByb3BlcnRpZXMuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5iaW5kRW1pdHRlciA9IERFRkFVTFRfQklORF9FTUlUVEVSO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgZW1pdHRlciB3aWxsIGRpc3BhdGNoIGludGVybmFsIGV2ZW50cy4gRGVmYXVsdHNcbiAgICAgKiB0byBmYWxzZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuYmluZEVtaXR0ZXJFdmVudCA9IERFRkFVTFRfQklORF9FTUlUVEVSX0VWRU5UO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgdG8gZW1pdCBwZXIgc2Vjb25kIChhIFtwYXJ0aWNsZV0vYiBbc10pXG4gICAgICogQHR5cGUge1JhdGV9XG4gICAgICovXG4gICAgdGhpcy5yYXRlID0gREVGQVVMVF9FTUlUVEVSX1JBVEU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIHRoZSBlbWl0dGVyIGlzIGVtaXR0aW5nIHBhcnRpY2xlcyBvciBub3QuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pc0VtaXR0aW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgZW1pdHRlcidzIGlkLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5pZCA9IGBlbWl0dGVyLSR7dWlkKCl9YDtcbiAgICB0aGlzLmNJRCA9IDA7XG4gICAgdGhpcy5uYW1lID0gJ0VtaXR0ZXInO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGluZGV4IG9mIHRoZSBlbWl0dGVyIGFzIGl0IGlzIGFkZGVkIHRvIHRoZSBzeXN0ZW0uXG4gICAgICogQHR5cGUge251bWJlcnx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5pbmRleCA9IERFRkFVTFRfRU1JVFRFUl9JTkRFWDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBlbWl0dGVyJ3MgaW50ZXJuYWwgZXZlbnQgZGlzcGF0Y2hlci5cbiAgICAgKiBAdHlwZSB7RXZlbnREaXNwYXRjaGVyfVxuICAgICAqL1xuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3h5IG1ldGhvZCBmb3IgdGhlIGludGVybmFsIGV2ZW50IGRpc3BhdGNoZXIncyBkaXNwYXRjaEV2ZW50IG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IHRvIGRpc3BhdGNoXG4gICAqIEBwYXJhbSB7b2JqZWN0PFBhcnRpY2xlPn0gW3RhcmdldD10aGlzXSAtIFRoZSBldmVudCB0YXJnZXRcbiAgICovXG4gIGRpc3BhdGNoKGV2ZW50LCB0YXJnZXQgPSB0aGlzKSB7XG4gICAgdGhpcy5ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hFdmVudChldmVudCwgdGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBlbWl0dGVyIHJhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmF0ZX0gcmF0ZSAtIGEgcmF0ZSBpbml0aWFsaXplciBvYmplY3RcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHNldFJhdGUocmF0ZSkge1xuICAgIHRoaXMucmF0ZSA9IHJhdGU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5ld1Bvc2l0aW9uIC0gYW4gb2JqZWN0IHRoZSBuZXcgeCwgeSBhbmQgeiBwcm9wc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgc2V0UG9zaXRpb24obmV3UG9zaXRpb24gPSB7fSkge1xuICAgIGNvbnN0IHsgcG9zaXRpb24gfSA9IHRoaXM7XG4gICAgY29uc3QgeyB4ID0gcG9zaXRpb24ueCwgeSA9IHBvc2l0aW9uLnksIHogPSBwb3NpdGlvbi56IH0gPSBuZXdQb3NpdGlvbjtcblxuICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIHopO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcm90YXRpb24gb2YgdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXdSb3RhdGlvbiAtIGFuIG9iamVjdCB0aGUgbmV3IHgsIHkgYW5kIHogcHJvcHNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHNldFJvdGF0aW9uKG5ld1JvdGF0aW9uID0ge30pIHtcbiAgICBjb25zdCB7IHJvdGF0aW9uIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgeCA9IHJvdGF0aW9uLngsIHkgPSByb3RhdGlvbi55LCB6ID0gcm90YXRpb24ueiB9ID0gbmV3Um90YXRpb247XG5cbiAgICB0aGlzLnJvdGF0aW9uLnNldCh4LCB5LCB6KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0aGUgZW1pdHRlciBzaG91bGQgZW1pdCBwYXJ0aWNsZXMgYXMgd2VsbCBhc1xuICAgKiB0aGUgZW1pdHRlcidzIGxpZmUuIEFsc28gaW50aWFsaXplcyB0aGUgZW1pdHRlciByYXRlLlxuICAgKiBUaGlzIGVuYWJsZXMgdGhlIGVtaXR0ZXIgdG8gZW1pdCBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdG90YWxFbWl0VGltZXM9SW5maW5pdHldIC0gdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0byBlbWl0IHBhcnRpY2xlc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpZmU9SW5maW5pdHldIC0gdGhlIGxpZmUgb2YgdGhpcyBlbWl0dGVyIGluIG1pbGxpc2Vjb25kc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgZW1pdCh0b3RhbEVtaXRUaW1lcyA9IEluZmluaXR5LCBsaWZlID0gSW5maW5pdHkpIHtcbiAgICB0aGlzLmN1cnJlbnRFbWl0VGltZSA9IDA7XG4gICAgdGhpcy50b3RhbEVtaXRUaW1lcyA9IGlzTnVtYmVyKHRvdGFsRW1pdFRpbWVzKSA/IHRvdGFsRW1pdFRpbWVzIDogSW5maW5pdHk7XG5cbiAgICBpZiAodG90YWxFbWl0VGltZXMgPT09IDEpIHtcbiAgICAgIHRoaXMubGlmZSA9IHRvdGFsRW1pdFRpbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpZmUgPSBpc051bWJlcihsaWZlKSA/IGxpZmUgOiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xuICAgIHRoaXMuaXNFbWl0dGluZyA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBlcmltZW50YWwgZW1pdCBtZXRob2QgdGhhdCBpcyBkZXNpZ25lZCB0byBiZSBjYWxsZWQgZnJvbSB0aGUgU3lzdGVtLmVtaXQgbWV0aG9kLlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgZXhwZXJpbWVudGFsX2VtaXQoKSB7XG4gICAgY29uc3QgeyBpc0VtaXR0aW5nLCB0b3RhbEVtaXRUaW1lcywgbGlmZSB9ID0gdGhpcztcblxuICAgIGlmICghaXNFbWl0dGluZykge1xuICAgICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgPSAwO1xuXG4gICAgICBpZiAoIXRvdGFsRW1pdFRpbWVzKSB7XG4gICAgICAgIHRoaXMuc2V0VG90YWxFbWl0VGltZXMoSW5maW5pdHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxpZmUpIHtcbiAgICAgICAgdGhpcy5zZXRMaWZlKEluZmluaXR5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yYXRlLmluaXQoKTtcbiAgICAgIHRoaXMuaXNFbWl0dGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdG90YWwgZW1pdCB0aW1lcyBmb3IgdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdG90YWxFbWl0VGltZXM9SW5maW5pdHldIC0gdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0byBlbWl0IHBhcnRpY2xlc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgc2V0VG90YWxFbWl0VGltZXModG90YWxFbWl0VGltZXMgPSBJbmZpbml0eSkge1xuICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSBpc051bWJlcih0b3RhbEVtaXRUaW1lcykgPyB0b3RhbEVtaXRUaW1lcyA6IEluZmluaXR5O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGlmZSBvZiB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlciBpbiBtaWxsaXNlY29uZHNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHNldExpZmUobGlmZSA9IEluZmluaXR5KSB7XG4gICAgaWYgKHRoaXMudG90YWxFbWl0VGltZXMgPT09IDEpIHtcbiAgICAgIHRoaXMubGlmZSA9IHRoaXMudG90YWxFbWl0VGltZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlmZSA9IGlzTnVtYmVyKGxpZmUpID8gbGlmZSA6IEluZmluaXR5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBlbWl0dGVyIGZyb20gZW1pdHRpbmcgcGFydGljbGVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHN0b3BFbWl0KCkge1xuICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSAtMTtcbiAgICB0aGlzLmN1cnJlbnRFbWl0VGltZSA9IDA7XG4gICAgdGhpcy5pc0VtaXR0aW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogS2lsbHMgYWxsIG9mIHRoZSBlbWl0dGVyJ3MgcGFydGljbGVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlbW92ZUFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMucGFydGljbGVzW2ldLmRlYWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcGFydGljbGUgaW5pdGlhbGl6ZXIgdG8gdGhlIGVtaXR0ZXIuXG4gICAqIEVhY2ggaW5pdGlhbGl6ZXIgaXMgcnVuIG9uIGVhY2ggcGFydGljbGUgd2hlbiB0aGV5IGFyZSBjcmVhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0luaXRpYWxpemVyfSBpbml0aWFsaXplciAtIFRoZSBpbml0aWFsaXplciB0byBhZGRcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGFkZEluaXRpYWxpemVyKGluaXRpYWxpemVyKSB7XG4gICAgdGhpcy5pbml0aWFsaXplcnMucHVzaChpbml0aWFsaXplcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG11bHRpcGxlIHBhcnRpY2xlIGluaXRpYWxpemVycyB0byB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheTxJbml0aWFsaXplcj59IGluaXRpYWxpemVycyAtIGFuIGFycmF5IG9mIHBhcnRpY2xlIGluaXRpYWxpemVyc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgYWRkSW5pdGlhbGl6ZXJzKGluaXRpYWxpemVycykge1xuICAgIGxldCBpID0gaW5pdGlhbGl6ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuYWRkSW5pdGlhbGl6ZXIoaW5pdGlhbGl6ZXJzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBlbWl0dGVyJ3MgcGFydGljbGUgaW5pdGlhbGl6ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5PEluaXRpYWxpemVyPn0gaW5pdGlhbGl6ZXJzIC0gYW4gYXJyYXkgb2YgcGFydGljbGUgaW5pdGlhbGl6ZXJzXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBzZXRJbml0aWFsaXplcnMoaW5pdGlhbGl6ZXJzKSB7XG4gICAgdGhpcy5pbml0aWFsaXplcnMgPSBpbml0aWFsaXplcnM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGluaXRpYWxpemVyIGZyb20gdGhlIGVtaXR0ZXIncyBpbml0aWFsaXplcnMgYXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZXJ9IGluaXRpYWxpemVyIC0gVGhlIGluaXRpYWxpemVyIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgcmVtb3ZlSW5pdGlhbGl6ZXIoaW5pdGlhbGl6ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5pdGlhbGl6ZXJzLmluZGV4T2YoaW5pdGlhbGl6ZXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgaW5pdGlhbGl6ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgcmVtb3ZlQWxsSW5pdGlhbGl6ZXJzKCkge1xuICAgIFV0aWwuZGVzdHJveUFycmF5KHRoaXMuaW5pdGlhbGl6ZXJzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBiZWhhdmlvdXIgdG8gdGhlIGVtaXR0ZXIuIEFsbCBlbWl0dGVyIGJlaGF2aW91cnMgYXJlIGFkZGVkIHRvIGVhY2ggcGFydGljbGUgd2hlblxuICAgKiB0aGV5IGFyZSBlbWl0dGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byBhZGQgdG8gdGhlIGVtaXR0ZXJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBtdWx0aXBsZSBiZWhhdmlvdXJzIHRvIHRoZSBlbWl0dGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5PEJlaGF2aW91cj59IGJlaGF2aW91cnMgLSBhbiBhcnJheSBvZiBlbWl0dGVyIGJlaGF2aW91cnNcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGxldCBpID0gYmVoYXZpb3Vycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBlbWl0dGVyJ3MgYmVoYXZpb3Vycy5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheTxCZWhhdmlvdXI+fSBiZWhhdmlvdXJzIC0gYW4gYXJyYXkgb2YgZW1pdHRlciBiZWhhdmlvdXJzXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBzZXRCZWhhdmlvdXJzKGJlaGF2aW91cnMpIHtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBiZWhhdmlvdXJzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIGVtaXR0ZXIncyBiZWhhdmlvdXJzIGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byByZW1vdmVcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHJlbW92ZUJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBlbWl0dGVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmRlc3Ryb3lBcnJheSh0aGlzLmJlaGF2aW91cnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlbWl0dGVyIGJlaGF2aW91ciB0byB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciAtIFRoZSBiZWhhdmlvdXIgdG8gYWRkIHRvIHRoZSBlbWl0dGVyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAqL1xuICBhZGRFbWl0dGVyQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIHRoaXMuZW1pdHRlckJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuXG4gICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG11bHRpcGxlIGJlaGF2aW91cnMgdG8gdGhlIGVtaXR0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8QmVoYXZpb3VyPn0gYmVoYXZpb3VycyAtIGFuIGFycmF5IG9mIGVtaXR0ZXIgYmVoYXZpb3Vyc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgYWRkRW1pdHRlckJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGxldCBpID0gYmVoYXZpb3Vycy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZEVtaXR0ZXJCZWhhdmlvdXIoYmVoYXZpb3Vyc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZW1pdHRlcidzIGJlaGF2aW91cnMuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8QmVoYXZpb3VyPn0gYmVoYXZpb3VycyAtIGFuIGFycmF5IG9mIGVtaXR0ZXIgYmVoYXZpb3Vyc1xuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgc2V0RW1pdHRlckJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJlaGF2aW91cnMubGVuZ3RoO1xuXG4gICAgdGhpcy5lbWl0dGVyQmVoYXZpb3VycyA9IGJlaGF2aW91cnM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzW2ldLmluaXRpYWxpemUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIGVtaXR0ZXIncyBiZWhhdmlvdXJzIGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byByZW1vdmVcbiAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICovXG4gIHJlbW92ZUVtaXR0ZXJCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzLmluZGV4T2YoYmVoYXZpb3VyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBlbWl0dGVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgcmVtb3ZlQWxsRW1pdHRlckJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QXJyYXkodGhpcy5lbWl0dGVyQmVoYXZpb3Vycyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIEVNSVRURVJfREVBRCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtvbkVtaXR0ZXJEZWFkfSAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIEVNSVRURVJfREVBRCBpcyBkaXNwYXRjaGVkLlxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgYWRkT25FbWl0dGVyRGVhZEV2ZW50TGlzdGVuZXIob25FbWl0dGVyRGVhZCkge1xuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoYCR7dGhpcy5pZH1fJHtFTUlUVEVSX0RFQUR9YCwgKCkgPT5cbiAgICAgIG9uRW1pdHRlckRlYWQoKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcGFydGljbGUgYnkgcmV0cmVpdmluZyBvbmUgZnJvbSB0aGUgcG9vbCBhbmQgc2V0dGluZyBpdCB1cCB3aXRoXG4gICAqIHRoZSBzdXBwbGllZCBpbml0aWFsaXplciBhbmQgYmVoYXZpb3VyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgKi9cbiAgY3JlYXRlUGFydGljbGUoKSB7XG4gICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcmVudC5wb29sLmdldChQYXJ0aWNsZSk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG5cbiAgICB0aGlzLnNldHVwUGFydGljbGUocGFydGljbGUsIGluZGV4KTtcbiAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaChQQVJUSUNMRV9DUkVBVEVELCBwYXJ0aWNsZSk7XG4gICAgdGhpcy5iaW5kRW1pdHRlckV2ZW50ICYmIHRoaXMuZGlzcGF0Y2goUEFSVElDTEVfQ1JFQVRFRCwgcGFydGljbGUpO1xuXG4gICAgcmV0dXJuIHBhcnRpY2xlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdXAgYSBwYXJ0aWNsZSBieSBydW5uaW5nIGFsbCBpbml0aWFsaXplcnMgb24gaXQgYW5kIHNldHRpbmcgaXRzIGJlaGF2aW91cnMuXG4gICAqIEFsc28gYWRkcyB0aGUgcGFydGljbGUgdG8gdGhpcy5wYXJ0aWNsZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIHNldHVwXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5kZXgpIHtcbiAgICBjb25zdCB7IGluaXRpYWxpemVycywgYmVoYXZpb3VycyB9ID0gdGhpcztcblxuICAgIEluaXRpYWxpemVyVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcnMpO1xuXG4gICAgcGFydGljbGUuYWRkQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xuICAgIHBhcnRpY2xlLmluZGV4ID0gaW5kZXg7XG5cbiAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBlbWl0dGVyIGFjY29yZGluZyB0byB0aGUgdGltZSBwYXNzZWQgYnkgY2FsbGluZyB0aGUgZ2VuZXJhdGVcbiAgICogYW5kIGludGVncmF0ZSBtZXRob2RzLiBUaGUgZ2VuZXJhdGUgbWV0aG9kIGNyZWF0ZXMgcGFydGljbGVzLCB0aGUgaW50ZWdyYXRlXG4gICAqIG1ldGhvZCB1cGRhdGVzIGV4aXN0aW5nIHBhcnRpY2xlcy5cbiAgICpcbiAgICogSWYgdGhlIGVtaXR0ZXIgYWdlIGlzIGdyZWF0ZXIgdGhhbiB0aW1lLCB0aGUgZW1pdHRlciBpcyBraWxsZWQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGFsc28gaW5kZXhlcy9kZWluZGV4ZXMgcGFydGljbGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFN5c3RlbSBlbmdpbmUgdGltZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgaWYgKCF0aGlzLmlzRW1pdHRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFnZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuZGVhZCB8fCB0aGlzLmFnZSA+PSB0aGlzLmxpZmUpIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHRoaXMuZ2VuZXJhdGUodGltZSk7XG4gICAgdGhpcy5pbnRlZ3JhdGUodGltZSk7XG5cbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5kZWFkKSB7XG4gICAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoKFBBUlRJQ0xFX0RFQUQsIHBhcnRpY2xlKTtcbiAgICAgICAgdGhpcy5iaW5kRW1pdHRlckV2ZW50ICYmIHRoaXMuZGlzcGF0Y2goUEFSVElDTEVfREVBRCwgcGFydGljbGUpO1xuICAgICAgICB0aGlzLnBhcmVudC5wb29sLmV4cGlyZShwYXJ0aWNsZS5yZXNldCgpKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRW1pdHRlckJlaGF2aW91cnModGltZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZW1pdHRlcidzIGVtaXR0ZXIgYmVoYXZpb3Vycy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBTeXN0ZW0gZW5naW5lIHRpbWVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICB1cGRhdGVFbWl0dGVyQmVoYXZpb3Vycyh0aW1lKSB7XG4gICAgaWYgKHRoaXMuc2xlZXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZW1pdHRlckJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIGludGVncmF0aW9uIGFsZ29yaXRobSBvbiB0aGUgZW1pdHRlciBhbmQgYWxsIHBhcnRpY2xlcy5cbiAgICogVXBkYXRlcyB0aGUgcGFydGljbGVzIHdpdGggdGhlIHRpbXN0YW1wIHBhc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBTeXN0ZW0gZW5naW5lIHRpbWVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbnRlZ3JhdGUodGltZSkge1xuICAgIGNvbnN0IGludGVncmF0aW9uVHlwZSA9IHRoaXMucGFyZW50XG4gICAgICA/IHRoaXMucGFyZW50LmludGVncmF0aW9uVHlwZVxuICAgICAgOiBJTlRFR1JBVElPTl9UWVBFX0VVTEVSO1xuICAgIGNvbnN0IGRhbXBpbmcgPSAxIC0gdGhpcy5kYW1waW5nO1xuXG4gICAgaW50ZWdyYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcsIGludGVncmF0aW9uVHlwZSk7XG5cbiAgICBsZXQgaW5kZXggPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgY29uc3QgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpbmRleF07XG5cbiAgICAgIHBhcnRpY2xlLnVwZGF0ZSh0aW1lLCBpbmRleCk7XG4gICAgICBpbnRlZ3JhdGUocGFydGljbGUsIHRpbWUsIGRhbXBpbmcsIGludGVncmF0aW9uVHlwZSk7XG5cbiAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoKFBBUlRJQ0xFX1VQREFURSwgcGFydGljbGUpO1xuICAgICAgdGhpcy5iaW5kRW1pdHRlckV2ZW50ICYmIHRoaXMuZGlzcGF0Y2goUEFSVElDTEVfVVBEQVRFLCBwYXJ0aWNsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBuZXcgcGFydGljbGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFN5c3RlbSBlbmdpbmUgdGltZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGdlbmVyYXRlKHRpbWUpIHtcbiAgICBpZiAodGhpcy50b3RhbEVtaXRUaW1lcyA9PT0gMSkge1xuICAgICAgbGV0IGkgPSB0aGlzLnJhdGUuZ2V0VmFsdWUoOTk5OTkpO1xuXG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgdGhpcy5jSUQgPSBpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b3RhbEVtaXRUaW1lcyA9IDA7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRFbWl0VGltZSArPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudEVtaXRUaW1lIDwgdGhpcy50b3RhbEVtaXRUaW1lcykge1xuICAgICAgbGV0IGkgPSB0aGlzLnJhdGUuZ2V0VmFsdWUodGltZSk7XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICB0aGlzLmNJRCA9IGk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBLaWxscyB0aGUgZW1pdHRlci5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSAtMTtcblxuICAgIGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5pc0VtaXR0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUFsbEluaXRpYWxpemVycygpO1xuICAgICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XG4gICAgICB0aGlzLmRpc3BhdGNoKGAke3RoaXMuaWR9XyR7RU1JVFRFUl9ERUFEfWApO1xuXG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5yZW1vdmVFbWl0dGVyKHRoaXMpO1xuICAgIH1cbiAgfVxufVxuIl19