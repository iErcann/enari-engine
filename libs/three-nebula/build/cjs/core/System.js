"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _events = _interopRequireWildcard(require("../events"));

var _constants = require("./constants");

var _Emitter = _interopRequireDefault(require("../emitter/Emitter"));

var _constants2 = require("../math/constants");

var _constants3 = require("../constants");

var _Pool = _interopRequireDefault(require("./Pool"));

var _fromJSON2 = _interopRequireDefault(require("./fromJSON"));

var _fromJSONAsync2 = _interopRequireDefault(require("./fromJSONAsync"));

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The core of the three-system particle engine.
 * A System instance can contain multiple emitters, each with their own initializers
 * and behaviours.
 *
 */
var System = /*#__PURE__*/function () {
  /**
   * Constructs a System instance.
   *
   * @param {object} THREE - ThreeJs
   * @param {number} [preParticles=POOL_MAX] - The number of particles to start with
   * @param {string} [integrationType=INTEGRATION_TYPE_EULER] - The integration type to use
   * @return void
   */
  function System() {
    var preParticles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants3.POOL_MAX;
    var integrationType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants2.INTEGRATION_TYPE_EULER;
    (0, _classCallCheck2["default"])(this, System);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = _types.CORE_TYPE_SYSTEM;
    /**
     * @desc Determines if the system can update or not. Set to false when destroying
     * to ensure that external calls to update do not throw errors.
     * @type {boolean}
     */

    this.canUpdate = true;
    /**
     * @desc The number of particles to start with.
     * @type {number}
     */

    this.preParticles = preParticles;
    /**
     * @desc The integration algorithm type to use.
     * @param {string}
     */

    this.integrationType = integrationType;
    /**
     * @desc The emitters in the particle system.
     * @type {array<Emitter>}
     */

    this.emitters = [];
    /**
     * @desc The renderers for the system.
     * @type {array<Renderer>}
     */

    this.renderers = [];
    /**
     * @desc A pool used to manage the internal system cache of objects
     * @type {Pool}
     */

    this.pool = new _Pool["default"]();
    /**
     * @desc Internal event dispatcher
     * @type {EventDispatcher}
     */

    this.eventDispatcher = new _events["default"]();
  }
  /**
   * Creates a System instance from a JSON object.
   *
   * @param {object} json - The JSON to create the System instance from
   * @param {object} THREE - The Web GL Api to use eg., THREE
   * @return {System}
   *
   * @deprecated use fromJSONAsync instead
   */


  (0, _createClass2["default"])(System, [{
    key: "dispatch",

    /**
     * Proxy method for the internal event dispatcher's dispatchEvent method.
     *
     * @param {string} event - The event to dispatch
     * @param {object<System|Emitter|Particle>} [target=this] - The event target
     */
    value: function dispatch(event) {
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      this.eventDispatcher.dispatchEvent(event, target);
    }
    /**
     * Adds a renderer to the System instance and initializes it.
     *
     * @param {Renderer} renderer - The renderer to add
     * @return {System}
     */

  }, {
    key: "addRenderer",
    value: function addRenderer(renderer) {
      this.renderers.push(renderer);
      renderer.init(this);
      return this;
    }
    /**
     * Removes a renderer from the System instance.
     *
     * @param {Renderer} renderer
     * @return {System}
     */

  }, {
    key: "removeRenderer",
    value: function removeRenderer(renderer) {
      this.renderers.splice(this.renderers.indexOf(renderer), 1);
      renderer.remove(this);
      return this;
    }
    /**
     * Adds an emitter to the System instance.
     * Dispatches the EMITTER_ADDED event.
     *
     * @param {Emitter} emitter - The emitter to add
     * @return {System}
     */

  }, {
    key: "addEmitter",
    value: function addEmitter(emitter) {
      var index = this.emitters.length;
      emitter.parent = this;
      emitter.index = index;
      this.emitters.push(emitter);
      this.dispatch(_events.EMITTER_ADDED, emitter);
      return this;
    }
    /**
     * Removes an emitter from the System instance.
     * Dispatches the EMITTER_REMOVED event.
     *
     * @param {Emitter} emitter - The emitter to remove
     * @return {System}
     */

  }, {
    key: "removeEmitter",
    value: function removeEmitter(emitter) {
      if (emitter.parent !== this) {
        return this;
      }

      emitter.parent = null;
      emitter.index = undefined;
      this.emitters.splice(this.emitters.indexOf(emitter), 1);
      this.dispatch(_events.EMITTER_REMOVED, emitter);
      return this;
    }
    /**
     * Wires up life cycle methods and causes a system's emitters to emit particles.
     * Expects emitters to have their totalEmitTimes and life set already.
     * Inifnite systems will resolve immediately.
     *
     * @param {object} hooks - Functions to hook into the life cycle API
     * @param {function} hooks.onStart - Called when the system starts to emit particles
     * @param {function} hooks.onUpdate - Called each time the system updates
     * @param {function} hooks.onEnd - Called when the system's emitters have all died
     * @return {Promise}
     */

  }, {
    key: "emit",
    value: function emit(_ref) {
      var onStart = _ref.onStart,
          onUpdate = _ref.onUpdate,
          onEnd = _ref.onEnd;

      if (onStart) {
        onStart();
      }

      if (onUpdate) {
        this.eventDispatcher.addEventListener(_events.SYSTEM_UPDATE, onUpdate);
      }

      var emitters = this.emitters.map(function (emitter) {
        var life = emitter.life;

        if (life === Infinity) {
          if (onEnd) {
            onEnd();
          }

          emitter.experimental_emit();
          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          emitter.addOnEmitterDeadEventListener(function () {
            if (onEnd) {
              onEnd();
            }

            resolve();
          });
          emitter.experimental_emit();
        });
      });

      try {
        return Promise.all(emitters);
      } catch (e) {
        console.warn(e);
      }
    }
    /**
     * Updates the particle system based on the delta passed.
     *
     * @example
     * animate = () => {
     *   threeRenderer.render(threeScene, threeCamera);
     *   system.update();
     *   requestAnimationFrame(animate);
     * }
     * animate();
     *
     * @param {number} delta - Delta time
     * @return {Promise}
     */

  }, {
    key: "update",
    value: function update() {
      var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_SYSTEM_DELTA;
      var d = delta || _constants.DEFAULT_SYSTEM_DELTA;

      if (this.canUpdate) {
        if (d > 0) {
          var i = this.emitters.length;

          while (i--) {
            var emitter = this.emitters[i];
            emitter.update(d);
            emitter.isEmitting && this.dispatch(_events.SYSTEM_UPDATE);
          }
        }

        this.dispatch(_events.SYSTEM_UPDATE_AFTER);
      }

      return Promise.resolve();
    }
    /**
     * Gets a count of the total number of particles in the system.
     *
     * @return {integer}
     */

  }, {
    key: "getCount",
    value: function getCount() {
      var length = this.emitters.length;
      var total = 0;
      var i;

      for (i = 0; i < length; i++) {
        total += this.emitters[i].particles.length;
      }

      return total;
    }
    /**
     * Destroys all emitters, renderers and the Nebula pool.
     * Ensures that this.update will not perform any operations while the system
     * is being destroyed.
     *
     * @return void
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var length = this.emitters.length;
      this.canUpdate = false;

      for (var e = 0; e < length; e++) {
        this.emitters[e] && this.emitters[e].destroy();
        delete this.emitters[e];
      }

      for (var r = 0; r < length; r++) {
        if (this.renderers[r] && this.renderers[r].destroy) {
          this.renderers[r].destroy();
          delete this.renderers[r];
        }
      }

      this.emitters.length = 0;
      this.pool.destroy();
      this.canUpdate = true;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json, THREE) {
      return (0, _fromJSON2["default"])(json, THREE, System, _Emitter["default"]);
    }
    /**
     * Loads a System instance from JSON asynchronously. Ensures all textures are
     * fully loaded before resolving with the instantiated System instance.
     *
     * @param {object} json - The JSON to create the System instance from
     * @param {object} THREE - The Web GL Api to use eg., THREE
     * @param {?object} options - Optional config options
     * @return {Promise<System>}
     */

  }, {
    key: "fromJSONAsync",
    value: function fromJSONAsync(json, THREE, options) {
      return (0, _fromJSONAsync2["default"])(json, THREE, System, _Emitter["default"], options);
    }
  }]);
  return System;
}();

exports["default"] = System;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1N5c3RlbS5qcyJdLCJuYW1lcyI6WyJTeXN0ZW0iLCJwcmVQYXJ0aWNsZXMiLCJQT09MX01BWCIsImludGVncmF0aW9uVHlwZSIsIklOVEVHUkFUSU9OX1RZUEVfRVVMRVIiLCJ0eXBlIiwiY2FuVXBkYXRlIiwiZW1pdHRlcnMiLCJyZW5kZXJlcnMiLCJwb29sIiwiUG9vbCIsImV2ZW50RGlzcGF0Y2hlciIsIkV2ZW50RGlzcGF0Y2hlciIsImV2ZW50IiwidGFyZ2V0IiwiZGlzcGF0Y2hFdmVudCIsInJlbmRlcmVyIiwicHVzaCIsImluaXQiLCJzcGxpY2UiLCJpbmRleE9mIiwicmVtb3ZlIiwiZW1pdHRlciIsImluZGV4IiwibGVuZ3RoIiwicGFyZW50IiwiZGlzcGF0Y2giLCJFTUlUVEVSX0FEREVEIiwidW5kZWZpbmVkIiwiRU1JVFRFUl9SRU1PVkVEIiwib25TdGFydCIsIm9uVXBkYXRlIiwib25FbmQiLCJhZGRFdmVudExpc3RlbmVyIiwiU1lTVEVNX1VQREFURSIsIm1hcCIsImxpZmUiLCJJbmZpbml0eSIsImV4cGVyaW1lbnRhbF9lbWl0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJhZGRPbkVtaXR0ZXJEZWFkRXZlbnRMaXN0ZW5lciIsImFsbCIsImUiLCJjb25zb2xlIiwid2FybiIsImRlbHRhIiwiREVGQVVMVF9TWVNURU1fREVMVEEiLCJkIiwiaSIsInVwZGF0ZSIsImlzRW1pdHRpbmciLCJTWVNURU1fVVBEQVRFX0FGVEVSIiwidG90YWwiLCJwYXJ0aWNsZXMiLCJkZXN0cm95IiwiciIsImpzb24iLCJUSFJFRSIsIkVtaXR0ZXIiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxNO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FB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bUIsQ0FBQyxFQUE3QixFQUFpQztBQUMvQixhQUFLcEMsUUFBTCxDQUFjb0MsQ0FBZCxLQUFvQixLQUFLcEMsUUFBTCxDQUFjb0MsQ0FBZCxFQUFpQlksT0FBakIsRUFBcEI7QUFDQSxlQUFPLEtBQUtoRCxRQUFMLENBQWNvQyxDQUFkLENBQVA7QUFDRDs7QUFFRCxXQUFLLElBQUlhLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdoQyxNQUFwQixFQUE0QmdDLENBQUMsRUFBN0IsRUFBaUM7QUFDL0IsWUFBSSxLQUFLaEQsU0FBTCxDQUFlZ0QsQ0FBZixLQUFxQixLQUFLaEQsU0FBTCxDQUFlZ0QsQ0FBZixFQUFrQkQsT0FBM0MsRUFBb0Q7QUFDbEQsZUFBSy9DLFNBQUwsQ0FBZWdELENBQWYsRUFBa0JELE9BQWxCO0FBQ0EsaUJBQU8sS0FBSy9DLFNBQUwsQ0FBZWdELENBQWYsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsV0FBS2pELFFBQUwsQ0FBY2lCLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxXQUFLZixJQUFMLENBQVU4QyxPQUFWO0FBQ0EsV0FBS2pELFNBQUwsR0FBaUIsSUFBakI7QUFDRDs7OzZCQW5PZW1ELEksRUFBTUMsSyxFQUFPO0FBQzNCLGFBQU8sMkJBQVNELElBQVQsRUFBZUMsS0FBZixFQUFzQjFELE1BQXRCLEVBQThCMkQsbUJBQTlCLENBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztrQ0FDdUJGLEksRUFBTUMsSyxFQUFPRSxPLEVBQVM7QUFDekMsYUFBTyxnQ0FBY0gsSUFBZCxFQUFvQkMsS0FBcEIsRUFBMkIxRCxNQUEzQixFQUFtQzJELG1CQUFuQyxFQUE0Q0MsT0FBNUMsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciwge1xuICBFTUlUVEVSX0FEREVELFxuICBFTUlUVEVSX1JFTU9WRUQsXG4gIFNZU1RFTV9VUERBVEUsXG4gIFNZU1RFTV9VUERBVEVfQUZURVIsXG59IGZyb20gJy4uL2V2ZW50cyc7XG5cbmltcG9ydCB7IERFRkFVTFRfU1lTVEVNX0RFTFRBIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnLi4vZW1pdHRlci9FbWl0dGVyJztcbmltcG9ydCB7IElOVEVHUkFUSU9OX1RZUEVfRVVMRVIgfSBmcm9tICcuLi9tYXRoL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBQT09MX01BWCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgUG9vbCBmcm9tICcuL1Bvb2wnO1xuaW1wb3J0IGZyb21KU09OIGZyb20gJy4vZnJvbUpTT04nO1xuaW1wb3J0IGZyb21KU09OQXN5bmMgZnJvbSAnLi9mcm9tSlNPTkFzeW5jJztcbmltcG9ydCB7IENPUkVfVFlQRV9TWVNURU0gYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFRoZSBjb3JlIG9mIHRoZSB0aHJlZS1zeXN0ZW0gcGFydGljbGUgZW5naW5lLlxuICogQSBTeXN0ZW0gaW5zdGFuY2UgY2FuIGNvbnRhaW4gbXVsdGlwbGUgZW1pdHRlcnMsIGVhY2ggd2l0aCB0aGVpciBvd24gaW5pdGlhbGl6ZXJzXG4gKiBhbmQgYmVoYXZpb3Vycy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgU3lzdGVtIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gVEhSRUUgLSBUaHJlZUpzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcHJlUGFydGljbGVzPVBPT0xfTUFYXSAtIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIHN0YXJ0IHdpdGhcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpbnRlZ3JhdGlvblR5cGU9SU5URUdSQVRJT05fVFlQRV9FVUxFUl0gLSBUaGUgaW50ZWdyYXRpb24gdHlwZSB0byB1c2VcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcmVQYXJ0aWNsZXMgPSBQT09MX01BWCxcbiAgICBpbnRlZ3JhdGlvblR5cGUgPSBJTlRFR1JBVElPTl9UWVBFX0VVTEVSXG4gICkge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIERldGVybWluZXMgaWYgdGhlIHN5c3RlbSBjYW4gdXBkYXRlIG9yIG5vdC4gU2V0IHRvIGZhbHNlIHdoZW4gZGVzdHJveWluZ1xuICAgICAqIHRvIGVuc3VyZSB0aGF0IGV4dGVybmFsIGNhbGxzIHRvIHVwZGF0ZSBkbyBub3QgdGhyb3cgZXJyb3JzLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuY2FuVXBkYXRlID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIHN0YXJ0IHdpdGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnByZVBhcnRpY2xlcyA9IHByZVBhcnRpY2xlcztcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBpbnRlZ3JhdGlvbiBhbGdvcml0aG0gdHlwZSB0byB1c2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5pbnRlZ3JhdGlvblR5cGUgPSBpbnRlZ3JhdGlvblR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgZW1pdHRlcnMgaW4gdGhlIHBhcnRpY2xlIHN5c3RlbS5cbiAgICAgKiBAdHlwZSB7YXJyYXk8RW1pdHRlcj59XG4gICAgICovXG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHJlbmRlcmVycyBmb3IgdGhlIHN5c3RlbS5cbiAgICAgKiBAdHlwZSB7YXJyYXk8UmVuZGVyZXI+fVxuICAgICAqL1xuICAgIHRoaXMucmVuZGVyZXJzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBBIHBvb2wgdXNlZCB0byBtYW5hZ2UgdGhlIGludGVybmFsIHN5c3RlbSBjYWNoZSBvZiBvYmplY3RzXG4gICAgICogQHR5cGUge1Bvb2x9XG4gICAgICovXG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIEludGVybmFsIGV2ZW50IGRpc3BhdGNoZXJcbiAgICAgKiBAdHlwZSB7RXZlbnREaXNwYXRjaGVyfVxuICAgICAqL1xuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBTeXN0ZW0gaW5zdGFuY2UgZnJvbSBhIEpTT04gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNyZWF0ZSB0aGUgU3lzdGVtIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtvYmplY3R9IFRIUkVFIC0gVGhlIFdlYiBHTCBBcGkgdG8gdXNlIGVnLiwgVEhSRUVcbiAgICogQHJldHVybiB7U3lzdGVtfVxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgZnJvbUpTT05Bc3luYyBpbnN0ZWFkXG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbiwgVEhSRUUpIHtcbiAgICByZXR1cm4gZnJvbUpTT04oanNvbiwgVEhSRUUsIFN5c3RlbSwgRW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBTeXN0ZW0gaW5zdGFuY2UgZnJvbSBKU09OIGFzeW5jaHJvbm91c2x5LiBFbnN1cmVzIGFsbCB0ZXh0dXJlcyBhcmVcbiAgICogZnVsbHkgbG9hZGVkIGJlZm9yZSByZXNvbHZpbmcgd2l0aCB0aGUgaW5zdGFudGlhdGVkIFN5c3RlbSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjcmVhdGUgdGhlIFN5c3RlbSBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRoZSBXZWIgR0wgQXBpIHRvIHVzZSBlZy4sIFRIUkVFXG4gICAqIEBwYXJhbSB7P29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbmFsIGNvbmZpZyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8U3lzdGVtPn1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTkFzeW5jKGpzb24sIFRIUkVFLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZyb21KU09OQXN5bmMoanNvbiwgVEhSRUUsIFN5c3RlbSwgRW1pdHRlciwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUHJveHkgbWV0aG9kIGZvciB0aGUgaW50ZXJuYWwgZXZlbnQgZGlzcGF0Y2hlcidzIGRpc3BhdGNoRXZlbnQgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBUaGUgZXZlbnQgdG8gZGlzcGF0Y2hcbiAgICogQHBhcmFtIHtvYmplY3Q8U3lzdGVtfEVtaXR0ZXJ8UGFydGljbGU+fSBbdGFyZ2V0PXRoaXNdIC0gVGhlIGV2ZW50IHRhcmdldFxuICAgKi9cbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCA9IHRoaXMpIHtcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByZW5kZXJlciB0byB0aGUgU3lzdGVtIGluc3RhbmNlIGFuZCBpbml0aWFsaXplcyBpdC5cbiAgICpcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIgdG8gYWRkXG4gICAqIEByZXR1cm4ge1N5c3RlbX1cbiAgICovXG4gIGFkZFJlbmRlcmVyKHJlbmRlcmVyKSB7XG4gICAgdGhpcy5yZW5kZXJlcnMucHVzaChyZW5kZXJlcik7XG4gICAgcmVuZGVyZXIuaW5pdCh0aGlzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSByZW5kZXJlciBmcm9tIHRoZSBTeXN0ZW0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVuZGVyZXJ9IHJlbmRlcmVyXG4gICAqIEByZXR1cm4ge1N5c3RlbX1cbiAgICovXG4gIHJlbW92ZVJlbmRlcmVyKHJlbmRlcmVyKSB7XG4gICAgdGhpcy5yZW5kZXJlcnMuc3BsaWNlKHRoaXMucmVuZGVyZXJzLmluZGV4T2YocmVuZGVyZXIpLCAxKTtcbiAgICByZW5kZXJlci5yZW1vdmUodGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVtaXR0ZXIgdG8gdGhlIFN5c3RlbSBpbnN0YW5jZS5cbiAgICogRGlzcGF0Y2hlcyB0aGUgRU1JVFRFUl9BRERFRCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyIC0gVGhlIGVtaXR0ZXIgdG8gYWRkXG4gICAqIEByZXR1cm4ge1N5c3RlbX1cbiAgICovXG4gIGFkZEVtaXR0ZXIoZW1pdHRlcikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICBlbWl0dGVyLnBhcmVudCA9IHRoaXM7XG4gICAgZW1pdHRlci5pbmRleCA9IGluZGV4O1xuXG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xuICAgIHRoaXMuZGlzcGF0Y2goRU1JVFRFUl9BRERFRCwgZW1pdHRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGVtaXR0ZXIgZnJvbSB0aGUgU3lzdGVtIGluc3RhbmNlLlxuICAgKiBEaXNwYXRjaGVzIHRoZSBFTUlUVEVSX1JFTU9WRUQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlciAtIFRoZSBlbWl0dGVyIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJuIHtTeXN0ZW19XG4gICAqL1xuICByZW1vdmVFbWl0dGVyKGVtaXR0ZXIpIHtcbiAgICBpZiAoZW1pdHRlci5wYXJlbnQgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVtaXR0ZXIucGFyZW50ID0gbnVsbDtcbiAgICBlbWl0dGVyLmluZGV4ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5lbWl0dGVycy5zcGxpY2UodGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpLCAxKTtcbiAgICB0aGlzLmRpc3BhdGNoKEVNSVRURVJfUkVNT1ZFRCwgZW1pdHRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBXaXJlcyB1cCBsaWZlIGN5Y2xlIG1ldGhvZHMgYW5kIGNhdXNlcyBhIHN5c3RlbSdzIGVtaXR0ZXJzIHRvIGVtaXQgcGFydGljbGVzLlxuICAgKiBFeHBlY3RzIGVtaXR0ZXJzIHRvIGhhdmUgdGhlaXIgdG90YWxFbWl0VGltZXMgYW5kIGxpZmUgc2V0IGFscmVhZHkuXG4gICAqIEluaWZuaXRlIHN5c3RlbXMgd2lsbCByZXNvbHZlIGltbWVkaWF0ZWx5LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaG9va3MgLSBGdW5jdGlvbnMgdG8gaG9vayBpbnRvIHRoZSBsaWZlIGN5Y2xlIEFQSVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBob29rcy5vblN0YXJ0IC0gQ2FsbGVkIHdoZW4gdGhlIHN5c3RlbSBzdGFydHMgdG8gZW1pdCBwYXJ0aWNsZXNcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaG9va3Mub25VcGRhdGUgLSBDYWxsZWQgZWFjaCB0aW1lIHRoZSBzeXN0ZW0gdXBkYXRlc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBob29rcy5vbkVuZCAtIENhbGxlZCB3aGVuIHRoZSBzeXN0ZW0ncyBlbWl0dGVycyBoYXZlIGFsbCBkaWVkXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBlbWl0KHsgb25TdGFydCwgb25VcGRhdGUsIG9uRW5kIH0pIHtcbiAgICBpZiAob25TdGFydCkge1xuICAgICAgb25TdGFydCgpO1xuICAgIH1cblxuICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgdGhpcy5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihTWVNURU1fVVBEQVRFLCBvblVwZGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZW1pdHRlcnMgPSB0aGlzLmVtaXR0ZXJzLm1hcChlbWl0dGVyID0+IHtcbiAgICAgIGNvbnN0IHsgbGlmZSB9ID0gZW1pdHRlcjtcblxuICAgICAgaWYgKGxpZmUgPT09IEluZmluaXR5KSB7XG4gICAgICAgIGlmIChvbkVuZCkge1xuICAgICAgICAgIG9uRW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLmV4cGVyaW1lbnRhbF9lbWl0KCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGVtaXR0ZXIuYWRkT25FbWl0dGVyRGVhZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgIGlmIChvbkVuZCkge1xuICAgICAgICAgICAgb25FbmQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVtaXR0ZXIuZXhwZXJpbWVudGFsX2VtaXQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChlbWl0dGVycyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gYmFzZWQgb24gdGhlIGRlbHRhIHBhc3NlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYW5pbWF0ZSA9ICgpID0+IHtcbiAgICogICB0aHJlZVJlbmRlcmVyLnJlbmRlcih0aHJlZVNjZW5lLCB0aHJlZUNhbWVyYSk7XG4gICAqICAgc3lzdGVtLnVwZGF0ZSgpO1xuICAgKiAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICogfVxuICAgKiBhbmltYXRlKCk7XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YSAtIERlbHRhIHRpbWVcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIHVwZGF0ZShkZWx0YSA9IERFRkFVTFRfU1lTVEVNX0RFTFRBKSB7XG4gICAgY29uc3QgZCA9IGRlbHRhIHx8IERFRkFVTFRfU1lTVEVNX0RFTFRBO1xuXG4gICAgaWYgKHRoaXMuY2FuVXBkYXRlKSB7XG4gICAgICBpZiAoZCA+IDApIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZW1pdHRlcnNbaV07XG5cbiAgICAgICAgICBlbWl0dGVyLnVwZGF0ZShkKTtcbiAgICAgICAgICBlbWl0dGVyLmlzRW1pdHRpbmcgJiYgdGhpcy5kaXNwYXRjaChTWVNURU1fVVBEQVRFKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoKFNZU1RFTV9VUERBVEVfQUZURVIpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgY291bnQgb2YgdGhlIHRvdGFsIG51bWJlciBvZiBwYXJ0aWNsZXMgaW4gdGhlIHN5c3RlbS5cbiAgICpcbiAgICogQHJldHVybiB7aW50ZWdlcn1cbiAgICovXG4gIGdldENvdW50KCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgbGV0IHRvdGFsID0gMDtcblxuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbCArPSB0aGlzLmVtaXR0ZXJzW2ldLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFsbCBlbWl0dGVycywgcmVuZGVyZXJzIGFuZCB0aGUgTmVidWxhIHBvb2wuXG4gICAqIEVuc3VyZXMgdGhhdCB0aGlzLnVwZGF0ZSB3aWxsIG5vdCBwZXJmb3JtIGFueSBvcGVyYXRpb25zIHdoaWxlIHRoZSBzeXN0ZW1cbiAgICogaXMgYmVpbmcgZGVzdHJveWVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XG5cbiAgICB0aGlzLmNhblVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgZm9yIChsZXQgZSA9IDA7IGUgPCBsZW5ndGg7IGUrKykge1xuICAgICAgdGhpcy5lbWl0dGVyc1tlXSAmJiB0aGlzLmVtaXR0ZXJzW2VdLmRlc3Ryb3koKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmVtaXR0ZXJzW2VdO1xuICAgIH1cblxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuZ3RoOyByKyspIHtcbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyc1tyXSAmJiB0aGlzLnJlbmRlcmVyc1tyXS5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXJzW3JdLmRlc3Ryb3koKTtcbiAgICAgICAgZGVsZXRlIHRoaXMucmVuZGVyZXJzW3JdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZW1pdHRlcnMubGVuZ3RoID0gMDtcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xuICAgIHRoaXMuY2FuVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIl19