"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Behaviour = _interopRequireWildcard(require("../behaviour"));

var Initializer = _interopRequireWildcard(require("../initializer"));

var _constants = require("../constants");

var _constants2 = require("./constants");

var _Rate = _interopRequireDefault(require("../initializer/Rate"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Makes a rate instance.
 *
 * @param {object} json - The data required to construct a Rate instance
 * @return {Rate}
 */
var makeRate = function makeRate(json) {
  return _Rate["default"].fromJSON(json);
};
/**
 * Makes initializers from json items.
 *
 * @param {array<object>} items - An array of objects which provide initializer constructor params
 * @param {object} THREE - The Web GL Api to use
 * @return {array<Initializer>}
 */


var makeInitializers = function makeInitializers(items, THREE) {
  var initializers = [];
  items.forEach(function (data) {
    var type = data.type,
        properties = data.properties;

    if (!_constants2.SUPPORTED_JSON_INITIALIZER_TYPES.includes(type)) {
      throw new Error("The initializer type ".concat(type, " is invalid or not yet supported"));
    }

    if (_constants2.INITIALIZER_TYPES_THAT_REQUIRE_THREE.includes(type)) {
      initializers.push(Initializer[type].fromJSON(properties, THREE));
    } else {
      initializers.push(Initializer[type].fromJSON(properties));
    }
  });
  return initializers;
};
/**
 * Makes behaviours from json items.
 *
 * @param {array<object>} items - An array of objects which provide behaviour constructor params
 * @return {array<Behaviour>}
 */


var makeBehaviours = function makeBehaviours(items) {
  var behaviours = [];
  items.forEach(function (data) {
    var type = data.type,
        properties = data.properties;

    if (!_constants2.SUPPORTED_JSON_BEHAVIOUR_TYPES.includes(type)) {
      throw new Error("The behaviour type ".concat(type, " is invalid or not yet supported"));
    }

    behaviours.push(Behaviour[type].fromJSON(properties));
  });
  return behaviours;
};
/**
 * Creates a System instance from a JSON object.
 *
 * @deprecated Use fromJSONAsync instead.
 *
 * @param {object} json - The JSON to create the System instance from
 * @param {object} THREE - The Web GL Api to use
 * @param {function} System - The system class
 * @param {function} Emitter - The emitter class
 * @param {number} json.preParticles - The predetermined number of particles
 * @param {string} json.integrationType - The integration algorithm to use
 * @param {array<object>} json.emitters - The emitters for the system instance
 * @return {System}
 */


var _default = function _default(json, THREE, System, Emitter) {
  var _json$preParticles = json.preParticles,
      preParticles = _json$preParticles === void 0 ? _constants.POOL_MAX : _json$preParticles,
      _json$integrationType = json.integrationType,
      integrationType = _json$integrationType === void 0 ? _constants.EULER : _json$integrationType,
      _json$emitters = json.emitters,
      emitters = _json$emitters === void 0 ? [] : _json$emitters;
  var system = new System(THREE, preParticles, integrationType);
  emitters.forEach(function (data) {
    var emitter = new Emitter();
    var rate = data.rate,
        rotation = data.rotation,
        initializers = data.initializers,
        behaviours = data.behaviours,
        _data$emitterBehaviou = data.emitterBehaviours,
        emitterBehaviours = _data$emitterBehaviou === void 0 ? [] : _data$emitterBehaviou,
        position = data.position,
        _data$totalEmitTimes = data.totalEmitTimes,
        totalEmitTimes = _data$totalEmitTimes === void 0 ? Infinity : _data$totalEmitTimes,
        _data$life = data.life,
        life = _data$life === void 0 ? Infinity : _data$life;
    emitter.setRate(makeRate(rate)).setRotation(rotation).setInitializers(makeInitializers(initializers, THREE)).setBehaviours(makeBehaviours(behaviours)).setEmitterBehaviours(makeBehaviours(emitterBehaviours)).setPosition(position).emit(totalEmitTimes, life);
    system.addEmitter(emitter);
  });
  return system;
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2Zyb21KU09OLmpzIl0sIm5hbWVzIjpbIm1ha2VSYXRlIiwianNvbiIsIlJhdGUiLCJmcm9tSlNPTiIsIm1ha2VJbml0aWFsaXplcnMiLCJpdGVtcyIsIlRIUkVFIiwiaW5pdGlhbGl6ZXJzIiwiZm9yRWFjaCIsImRhdGEiLCJ0eXBlIiwicHJvcGVydGllcyIsIlNVUFBPUlRFRF9KU09OX0lOSVRJQUxJWkVSX1RZUEVTIiwiaW5jbHVkZXMiLCJFcnJvciIsIklOSVRJQUxJWkVSX1RZUEVTX1RIQVRfUkVRVUlSRV9USFJFRSIsInB1c2giLCJJbml0aWFsaXplciIsIm1ha2VCZWhhdmlvdXJzIiwiYmVoYXZpb3VycyIsIlNVUFBPUlRFRF9KU09OX0JFSEFWSU9VUl9UWVBFUyIsIkJlaGF2aW91ciIsIlN5c3RlbSIsIkVtaXR0ZXIiLCJwcmVQYXJ0aWNsZXMiLCJQT09MX01BWCIsImludGVncmF0aW9uVHlwZSIsIkVVTEVSIiwiZW1pdHRlcnMiLCJzeXN0ZW0iLCJlbWl0dGVyIiwicmF0ZSIsInJvdGF0aW9uIiwiZW1pdHRlckJlaGF2aW91cnMiLCJwb3NpdGlvbiIsInRvdGFsRW1pdFRpbWVzIiwiSW5maW5pdHkiLCJsaWZlIiwic2V0UmF0ZSIsInNldFJvdGF0aW9uIiwic2V0SW5pdGlhbGl6ZXJzIiwic2V0QmVoYXZpb3VycyIsInNldEVtaXR0ZXJCZWhhdmlvdXJzIiwic2V0UG9zaXRpb24iLCJlbWl0IiwiYWRkRW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFNQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUMsSUFBSTtBQUFBLFNBQUlDLGlCQUFLQyxRQUFMLENBQWNGLElBQWQsQ0FBSjtBQUFBLENBQXJCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNB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LFFBT3JCQSxpQkFQcUIsc0NBT0QsRUFQQztBQUFBLFFBUXJCQyxRQVJxQixHQVduQnpCLElBWG1CLENBUXJCeUIsUUFScUI7QUFBQSwrQkFXbkJ6QixJQVhtQixDQVNyQjBCLGNBVHFCO0FBQUEsUUFTckJBLGNBVHFCLHFDQVNKQyxRQVRJO0FBQUEscUJBV25CM0IsSUFYbUIsQ0FVckI0QixJQVZxQjtBQUFBLFFBVXJCQSxJQVZxQiwyQkFVZEQsUUFWYztBQWF2Qk4sSUFBQUEsT0FBTyxDQUNKUSxPQURILENBQ1d0QyxRQUFRLENBQUMrQixJQUFELENBRG5CLEVBRUdRLFdBRkgsQ0FFZVAsUUFGZixFQUdHUSxlQUhILENBR21CcEMsZ0JBQWdCLENBQUNHLFlBQUQsRUFBZUQsS0FBZixDQUhuQyxFQUlHbUMsYUFKSCxDQUlpQnZCLGNBQWMsQ0FBQ0MsVUFBRCxDQUovQixFQUtHdUIsb0JBTEgsQ0FLd0J4QixjQUFjLENBQUNlLGlCQUFELENBTHRDLEVBTUdVLFdBTkgsQ0FNZVQsUUFOZixFQU9HVSxJQVBILENBT1FULGNBUFIsRUFPd0JFLElBUHhCO0FBU0FSLElBQUFBLE1BQU0sQ0FBQ2dCLFVBQVAsQ0FBa0JmLE9BQWxCO0FBQ0QsR0F2QkQ7QUF5QkEsU0FBT0QsTUFBUDtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCZWhhdmlvdXIgZnJvbSAnLi4vYmVoYXZpb3VyJztcbmltcG9ydCAqIGFzIEluaXRpYWxpemVyIGZyb20gJy4uL2luaXRpYWxpemVyJztcblxuaW1wb3J0IHsgRVVMRVIsIFBPT0xfTUFYIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIElOSVRJQUxJWkVSX1RZUEVTX1RIQVRfUkVRVUlSRV9USFJFRSxcbiAgU1VQUE9SVEVEX0pTT05fQkVIQVZJT1VSX1RZUEVTLFxuICBTVVBQT1JURURfSlNPTl9JTklUSUFMSVpFUl9UWVBFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5pbXBvcnQgUmF0ZSBmcm9tICcuLi9pbml0aWFsaXplci9SYXRlJztcblxuLyoqXG4gKiBNYWtlcyBhIHJhdGUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgZGF0YSByZXF1aXJlZCB0byBjb25zdHJ1Y3QgYSBSYXRlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtSYXRlfVxuICovXG5jb25zdCBtYWtlUmF0ZSA9IGpzb24gPT4gUmF0ZS5mcm9tSlNPTihqc29uKTtcblxuLyoqXG4gKiBNYWtlcyBpbml0aWFsaXplcnMgZnJvbSBqc29uIGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7YXJyYXk8b2JqZWN0Pn0gaXRlbXMgLSBBbiBhcnJheSBvZiBvYmplY3RzIHdoaWNoIHByb3ZpZGUgaW5pdGlhbGl6ZXIgY29uc3RydWN0b3IgcGFyYW1zXG4gKiBAcGFyYW0ge29iamVjdH0gVEhSRUUgLSBUaGUgV2ViIEdMIEFwaSB0byB1c2VcbiAqIEByZXR1cm4ge2FycmF5PEluaXRpYWxpemVyPn1cbiAqL1xuY29uc3QgbWFrZUluaXRpYWxpemVycyA9IChpdGVtcywgVEhSRUUpID0+IHtcbiAgY29uc3QgaW5pdGlhbGl6ZXJzID0gW107XG5cbiAgaXRlbXMuZm9yRWFjaChkYXRhID0+IHtcbiAgICBjb25zdCB7IHR5cGUsIHByb3BlcnRpZXMgfSA9IGRhdGE7XG5cbiAgICBpZiAoIVNVUFBPUlRFRF9KU09OX0lOSVRJQUxJWkVSX1RZUEVTLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUaGUgaW5pdGlhbGl6ZXIgdHlwZSAke3R5cGV9IGlzIGludmFsaWQgb3Igbm90IHlldCBzdXBwb3J0ZWRgXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChJTklUSUFMSVpFUl9UWVBFU19USEFUX1JFUVVJUkVfVEhSRUUuaW5jbHVkZXModHlwZSkpIHtcbiAgICAgIGluaXRpYWxpemVycy5wdXNoKEluaXRpYWxpemVyW3R5cGVdLmZyb21KU09OKHByb3BlcnRpZXMsIFRIUkVFKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxpemVycy5wdXNoKEluaXRpYWxpemVyW3R5cGVdLmZyb21KU09OKHByb3BlcnRpZXMpKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbml0aWFsaXplcnM7XG59O1xuXG4vKipcbiAqIE1ha2VzIGJlaGF2aW91cnMgZnJvbSBqc29uIGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7YXJyYXk8b2JqZWN0Pn0gaXRlbXMgLSBBbiBhcnJheSBvZiBvYmplY3RzIHdoaWNoIHByb3ZpZGUgYmVoYXZpb3VyIGNvbnN0cnVjdG9yIHBhcmFtc1xuICogQHJldHVybiB7YXJyYXk8QmVoYXZpb3VyPn1cbiAqL1xuY29uc3QgbWFrZUJlaGF2aW91cnMgPSBpdGVtcyA9PiB7XG4gIGNvbnN0IGJlaGF2aW91cnMgPSBbXTtcblxuICBpdGVtcy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSwgcHJvcGVydGllcyB9ID0gZGF0YTtcblxuICAgIGlmICghU1VQUE9SVEVEX0pTT05fQkVIQVZJT1VSX1RZUEVTLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUaGUgYmVoYXZpb3VyIHR5cGUgJHt0eXBlfSBpcyBpbnZhbGlkIG9yIG5vdCB5ZXQgc3VwcG9ydGVkYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBiZWhhdmlvdXJzLnB1c2goQmVoYXZpb3VyW3R5cGVdLmZyb21KU09OKHByb3BlcnRpZXMpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJlaGF2aW91cnM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBTeXN0ZW0gaW5zdGFuY2UgZnJvbSBhIEpTT04gb2JqZWN0LlxuICpcbiAqIEBkZXByZWNhdGVkIFVzZSBmcm9tSlNPTkFzeW5jIGluc3RlYWQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjcmVhdGUgdGhlIFN5c3RlbSBpbnN0YW5jZSBmcm9tXG4gKiBAcGFyYW0ge29iamVjdH0gVEhSRUUgLSBUaGUgV2ViIEdMIEFwaSB0byB1c2VcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFN5c3RlbSAtIFRoZSBzeXN0ZW0gY2xhc3NcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IEVtaXR0ZXIgLSBUaGUgZW1pdHRlciBjbGFzc1xuICogQHBhcmFtIHtudW1iZXJ9IGpzb24ucHJlUGFydGljbGVzIC0gVGhlIHByZWRldGVybWluZWQgbnVtYmVyIG9mIHBhcnRpY2xlc1xuICogQHBhcmFtIHtzdHJpbmd9IGpzb24uaW50ZWdyYXRpb25UeXBlIC0gVGhlIGludGVncmF0aW9uIGFsZ29yaXRobSB0byB1c2VcbiAqIEBwYXJhbSB7YXJyYXk8b2JqZWN0Pn0ganNvbi5lbWl0dGVycyAtIFRoZSBlbWl0dGVycyBmb3IgdGhlIHN5c3RlbSBpbnN0YW5jZVxuICogQHJldHVybiB7U3lzdGVtfVxuICovXG5leHBvcnQgZGVmYXVsdCAoanNvbiwgVEhSRUUsIFN5c3RlbSwgRW1pdHRlcikgPT4ge1xuICBjb25zdCB7XG4gICAgcHJlUGFydGljbGVzID0gUE9PTF9NQVgsXG4gICAgaW50ZWdyYXRpb25UeXBlID0gRVVMRVIsXG4gICAgZW1pdHRlcnMgPSBbXSxcbiAgfSA9IGpzb247XG4gIGNvbnN0IHN5c3RlbSA9IG5ldyBTeXN0ZW0oVEhSRUUsIHByZVBhcnRpY2xlcywgaW50ZWdyYXRpb25UeXBlKTtcblxuICBlbWl0dGVycy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgIGNvbnN0IHtcbiAgICAgIHJhdGUsXG4gICAgICByb3RhdGlvbixcbiAgICAgIGluaXRpYWxpemVycyxcbiAgICAgIGJlaGF2aW91cnMsXG4gICAgICBlbWl0dGVyQmVoYXZpb3VycyA9IFtdLFxuICAgICAgcG9zaXRpb24sXG4gICAgICB0b3RhbEVtaXRUaW1lcyA9IEluZmluaXR5LFxuICAgICAgbGlmZSA9IEluZmluaXR5LFxuICAgIH0gPSBkYXRhO1xuXG4gICAgZW1pdHRlclxuICAgICAgLnNldFJhdGUobWFrZVJhdGUocmF0ZSkpXG4gICAgICAuc2V0Um90YXRpb24ocm90YXRpb24pXG4gICAgICAuc2V0SW5pdGlhbGl6ZXJzKG1ha2VJbml0aWFsaXplcnMoaW5pdGlhbGl6ZXJzLCBUSFJFRSkpXG4gICAgICAuc2V0QmVoYXZpb3VycyhtYWtlQmVoYXZpb3VycyhiZWhhdmlvdXJzKSlcbiAgICAgIC5zZXRFbWl0dGVyQmVoYXZpb3VycyhtYWtlQmVoYXZpb3VycyhlbWl0dGVyQmVoYXZpb3VycykpXG4gICAgICAuc2V0UG9zaXRpb24ocG9zaXRpb24pXG4gICAgICAuZW1pdCh0b3RhbEVtaXRUaW1lcywgbGlmZSk7XG5cbiAgICBzeXN0ZW0uYWRkRW1pdHRlcihlbWl0dGVyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHN5c3RlbTtcbn07XG4iXX0=