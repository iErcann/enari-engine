"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Behaviour = _interopRequireWildcard(require("../behaviour"));

var Initializer = _interopRequireWildcard(require("../initializer"));

var _constants = require("../constants");

var _constants2 = require("./constants");

var _Rate = _interopRequireDefault(require("../initializer/Rate"));

var _Texture = _interopRequireDefault(require("../initializer/Texture"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_OPTIONS = {
  shouldAutoEmit: true
};
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
  return new Promise(function (resolve, reject) {
    if (!items.length) {
      return resolve([]);
    }

    var numberOfInitializers = items.length;
    var madeInitializers = [];
    var doNotRequireTextureLoading = items.filter(function (_ref) {
      var properties = _ref.properties;
      return !properties.texture;
    });
    var doRequireTextureLoading = items.filter(function (_ref2) {
      var properties = _ref2.properties;
      return properties.texture;
    });
    doNotRequireTextureLoading.forEach(function (data) {
      var type = data.type,
          properties = data.properties;

      if (!_constants2.SUPPORTED_JSON_INITIALIZER_TYPES.includes(type)) {
        return reject("The initializer type ".concat(type, " is invalid or not yet supported"));
      }

      if (_constants2.INITIALIZER_TYPES_THAT_REQUIRE_THREE.includes(type)) {
        madeInitializers.push(Initializer[type].fromJSON(properties, THREE));
      } else {
        madeInitializers.push(Initializer[type].fromJSON(properties));
      }

      if (madeInitializers.length === numberOfInitializers) {
        return resolve(madeInitializers);
      }
    });
    doRequireTextureLoading.forEach(function (data) {
      var type = data.type,
          properties = data.properties,
          texture = data.properties.texture;
      var textureLoader = new THREE.TextureLoader();

      if (!_constants2.SUPPORTED_JSON_INITIALIZER_TYPES.includes(type)) {
        return reject("The initializer type ".concat(type, " is invalid or not yet supported"));
      }

      textureLoader.load(texture, function (loadedTexture) {
        madeInitializers.push(_Texture["default"].fromJSON(_objectSpread(_objectSpread({}, properties), {}, {
          loadedTexture: loadedTexture
        }), THREE));

        if (madeInitializers.length === numberOfInitializers) {
          return resolve(madeInitializers);
        }
      }, undefined, reject);
    });
  });
};
/**
 * Makes behaviours from json items.
 *
 * @param {array<object>} items - An array of objects which provide behaviour constructor params
 * @return {Promise<array>}
 */


var makeBehaviours = function makeBehaviours(items) {
  return new Promise(function (resolve, reject) {
    if (!items.length) {
      return resolve([]);
    }

    var numberOfBehaviours = items.length;
    var madeBehaviours = [];
    items.forEach(function (data) {
      var type = data.type,
          properties = data.properties;

      if (!_constants2.SUPPORTED_JSON_BEHAVIOUR_TYPES.includes(type)) {
        return reject("The behaviour type ".concat(type, " is invalid or not yet supported"));
      }

      madeBehaviours.push(Behaviour[type].fromJSON(properties));

      if (madeBehaviours.length === numberOfBehaviours) {
        return resolve(madeBehaviours);
      }
    });
  });
};

var makeEmitters = function makeEmitters(emitters, Emitter, THREE, shouldAutoEmit) {
  return new Promise(function (resolve, reject) {
    if (!emitters.length) {
      return resolve([]);
    }

    var madeEmitters = [];
    var numberOfEmitters = emitters.length;

    if (!numberOfEmitters) {
      return resolve(madeEmitters);
    }

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
      emitter.setRate(makeRate(rate)).setRotation(rotation).setPosition(position);
      makeInitializers(initializers, THREE).then(function (madeInitializers) {
        emitter.setInitializers(madeInitializers);
        return makeBehaviours(behaviours);
      }).then(function (madeBehaviours) {
        emitter.setBehaviours(madeBehaviours);
        return makeBehaviours(emitterBehaviours);
      }).then(function (madeEmitterBehaviours) {
        emitter.setEmitterBehaviours(madeEmitterBehaviours);
        return Promise.resolve(emitter);
      }).then(function (emitter) {
        madeEmitters.push(shouldAutoEmit ? emitter.emit(totalEmitTimes, life) : emitter.setTotalEmitTimes(totalEmitTimes).setLife(life));

        if (madeEmitters.length === numberOfEmitters) {
          return resolve(madeEmitters);
        }
      })["catch"](reject);
    });
  });
};
/**
 * Creates a System instance from a JSON object.
 *
 * @param {object} json - The JSON to create the System instance from
 * @param {number} json.preParticles - The predetermined number of particles
 * @param {string} json.integrationType - The integration algorithm to use
 * @param {array<object>} json.emitters - The emitters for the system instance
 * @param {object} THREE - The Web GL Api to use
 * @param {function} System - The system class
 * @param {function} Emitter - The emitter class
 * @param {object} [options={}] - Optional config options
 * @return {Promise<System>}
 */


var _default = function _default(json, THREE, System, Emitter) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return new Promise(function (resolve, reject) {
    var _json$preParticles = json.preParticles,
        preParticles = _json$preParticles === void 0 ? _constants.POOL_MAX : _json$preParticles,
        _json$integrationType = json.integrationType,
        integrationType = _json$integrationType === void 0 ? _constants.EULER : _json$integrationType,
        _json$emitters = json.emitters,
        emitters = _json$emitters === void 0 ? [] : _json$emitters;
    var system = new System(preParticles, integrationType);

    var _DEFAULT_OPTIONS$opti = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options),
        shouldAutoEmit = _DEFAULT_OPTIONS$opti.shouldAutoEmit;

    makeEmitters(emitters, Emitter, THREE, shouldAutoEmit).then(function (madeEmitters) {
      var numberOfEmitters = madeEmitters.length;

      if (!numberOfEmitters) {
        return resolve(system);
      }

      madeEmitters.forEach(function (madeEmitter) {
        system.addEmitter(madeEmitter);

        if (system.emitters.length === numberOfEmitters) {
          resolve(system);
        }
      });
    })["catch"](reject);
  });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2Zyb21KU09OQXN5bmMuanMiXSwibmFtZXMiOlsiREVGQVVMVF9PUFRJT05TIiwic2hvdWxkQXV0b0VtaXQiLCJtYWtlUmF0ZSIsImpzb24iLCJSYXRlIiwiZnJvbUpTT04iLCJtYWtlSW5pdGlhbGl6ZXJzIiwiaXRlbXMiLCJUSFJFRSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibGVuZ3RoIiwibnVtYmVyT2ZJbml0aWFsaXplcnMiLCJtYWRlSW5pdGlhbGl6ZXJzIiwiZG9Ob3RSZXF1aXJlVGV4dHVyZUxvYWRpbmciLCJmaWx0ZXIiLCJwcm9wZXJ0aWVzIiwidGV4dHVyZSIsImRvUmVxdWlyZVRleHR1cmVMb2FkaW5nIiwiZm9yRWFjaCIsImRhdGEiLCJ0eXBlIiwiU1VQUE9SVEVEX0pTT05fSU5JVElBTElaRVJfVFlQRVMiLCJpbmNsdWRlcyIsIklOSVRJQUxJWkVSX1RZUEVTX1RIQVRfUkVRVUlSRV9USFJFRSIsInB1c2giLCJJbml0aWFsaXplciIsInRleHR1cmVMb2FkZXIiLCJUZXh0dXJlTG9hZGVyIiwibG9hZCIsImxvYWRlZFRleHR1cmUiLCJUZXh0dXJlSW5pdGlhbGl6ZXIiLCJ1bmRlZmluZWQiLCJtYWtlQmVoYXZpb3VycyIsIm51bWJlck9mQmVoYXZpb3VycyIsIm1hZGVCZWhhdmlvdXJzIiwiU1VQUE9SVEVEX0pTT05fQkVIQVZJT1VSX1RZUEVTIiwiQmVoYXZpb3VyIiwibWFrZUVtaXR0ZXJzIiwiZW1pdHRlcnMiLCJFbWl0dGVyIiwibWFkZUVtaXR0ZXJzIiwibnVtYmVyT2ZFbWl0dGVycyIsImVtaXR0ZXIiLCJyYXRlIiwicm90YXRpb24iLCJpbml0aWFsaXplcnMiLCJiZWhhdmlvdXJzIiwiZW1pdHRlckJlaGF2aW91cnMiLCJwb3NpdGlvbiIsInRvdGFsRW1pdFRpbWVzIiwiSW5maW5pdHkiLCJsaWZlIiwic2V0UmF0ZSIsInNldFJvdGF0aW9uIiwic2V0UG9zaXRpb24iLCJ0aGVuIiwic2V0SW5pdGlhbGl6ZXJzIiwic2V0QmVoYXZpb3VycyIsIm1hZGVFbWl0dGVyQmVoYXZpb3VycyIsInNldEVtaXR0ZXJCZWhhdmlvdXJzIiwiZW1pdCIsInNldFRvdGFsRW1pdFRpbWVzIiwic2V0TGlmZSIsIlN5c3RlbSIsIm9wdGlvbnMiLCJwcmVQYXJ0aWNsZXMiLCJQT09MX01BWCIsImludGVncmF0aW9uVHlwZSIsIkVVTEVSIiwic3lzdGVtIiwibWFkZUVtaXR0ZXIiLCJhZGRFbWl0dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBTUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlLEdBQUc7QUFBRUMsRUFBQUEsY0FBYyxFQUFFO0FBQWxCLENBQXhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUFDLElBQUk7QUFBQSxTQUFJQyxpQkFBS0MsUUFBTCxDQUFjRixJQUFkLENBQUo7QUFBQSxDQUFyQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFNRyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNDLEtBQUQsRUFBUUMsS0FBUjtBQUFBLFNBQ3ZCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDL0IsUUFBSSxDQUFDSixLQUFLLENBQUNLLE1BQVgsRUFBbUI7QUFDakIsYUFBT0YsT0FBTyxDQUFDLEVBQUQsQ0FBZDtBQUNEOztBQUVELFFBQU1HLG9CQUFvQixHQUFHTixLQUFLLENBQUNLLE1BQW5DO0FBQ0EsUUFBTUUsZ0JBQWdCLEdBQUcsRUFBekI7QUFDQSxRQUFNQywwQkFBMEIsR0FBR1IsS0FBSyxDQUFDUyxNQUFOLENBQ2pDO0FBQUEsVUFBR0MsVUFBSCxRQUFHQSxVQUFIO0FBQUEsYUFBb0IsQ0FBQ0EsVUFBVSxDQUFDQyxPQUFoQztBQUFBLEtBRGlDLENBQW5DO0FBR0Es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QUNHd0QsSUFESCxDQUNRLFVBQUFmLFlBQVksRUFBSTtBQUNwQixVQUFNQyxnQkFBZ0IsR0FBR0QsWUFBWSxDQUFDOUIsTUFBdEM7O0FBRUEsVUFBSSxDQUFDK0IsZ0JBQUwsRUFBdUI7QUFDckIsZUFBT2pDLE9BQU8sQ0FBQzZELE1BQUQsQ0FBZDtBQUNEOztBQUVEN0IsTUFBQUEsWUFBWSxDQUFDdEIsT0FBYixDQUFxQixVQUFBb0QsV0FBVyxFQUFJO0FBQ2xDRCxRQUFBQSxNQUFNLENBQUNFLFVBQVAsQ0FBa0JELFdBQWxCOztBQUVBLFlBQUlELE1BQU0sQ0FBQy9CLFFBQVAsQ0FBZ0I1QixNQUFoQixLQUEyQitCLGdCQUEvQixFQUFpRDtBQUMvQ2pDLFVBQUFBLE9BQU8sQ0FBQzZELE1BQUQsQ0FBUDtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBZkgsV0FnQlM1RCxNQWhCVDtBQWlCRCxHQTFCRCxDQURhO0FBQUEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEJlaGF2aW91ciBmcm9tICcuLi9iZWhhdmlvdXInO1xuaW1wb3J0ICogYXMgSW5pdGlhbGl6ZXIgZnJvbSAnLi4vaW5pdGlhbGl6ZXInO1xuXG5pbXBvcnQgeyBFVUxFUiwgUE9PTF9NQVggfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgSU5JVElBTElaRVJfVFlQRVNfVEhBVF9SRVFVSVJFX1RIUkVFLFxuICBTVVBQT1JURURfSlNPTl9CRUhBVklPVVJfVFlQRVMsXG4gIFNVUFBPUlRFRF9KU09OX0lOSVRJQUxJWkVSX1RZUEVTLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmltcG9ydCBSYXRlIGZyb20gJy4uL2luaXRpYWxpemVyL1JhdGUnO1xuaW1wb3J0IFRleHR1cmVJbml0aWFsaXplciBmcm9tICcuLi9pbml0aWFsaXplci9UZXh0dXJlJztcblxuY29uc3QgREVGQVVMVF9PUFRJT05TID0geyBzaG91bGRBdXRvRW1pdDogdHJ1ZSB9O1xuXG4vKipcbiAqIE1ha2VzIGEgcmF0ZSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBkYXRhIHJlcXVpcmVkIHRvIGNvbnN0cnVjdCBhIFJhdGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge1JhdGV9XG4gKi9cbmNvbnN0IG1ha2VSYXRlID0ganNvbiA9PiBSYXRlLmZyb21KU09OKGpzb24pO1xuXG4vKipcbiAqIE1ha2VzIGluaXRpYWxpemVycyBmcm9tIGpzb24gaXRlbXMuXG4gKlxuICogQHBhcmFtIHthcnJheTxvYmplY3Q+fSBpdGVtcyAtIEFuIGFycmF5IG9mIG9iamVjdHMgd2hpY2ggcHJvdmlkZSBpbml0aWFsaXplciBjb25zdHJ1Y3RvciBwYXJhbXNcbiAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRoZSBXZWIgR0wgQXBpIHRvIHVzZVxuICogQHJldHVybiB7YXJyYXk8SW5pdGlhbGl6ZXI+fVxuICovXG5jb25zdCBtYWtlSW5pdGlhbGl6ZXJzID0gKGl0ZW1zLCBUSFJFRSkgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtYmVyT2ZJbml0aWFsaXplcnMgPSBpdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgbWFkZUluaXRpYWxpemVycyA9IFtdO1xuICAgIGNvbnN0IGRvTm90UmVxdWlyZVRleHR1cmVMb2FkaW5nID0gaXRlbXMuZmlsdGVyKFxuICAgICAgKHsgcHJvcGVydGllcyB9KSA9PiAhcHJvcGVydGllcy50ZXh0dXJlXG4gICAgKTtcbiAgICBjb25zdCBkb1JlcXVpcmVUZXh0dXJlTG9hZGluZyA9IGl0ZW1zLmZpbHRlcihcbiAgICAgICh7IHByb3BlcnRpZXMgfSkgPT4gcHJvcGVydGllcy50ZXh0dXJlXG4gICAgKTtcblxuICAgIGRvTm90UmVxdWlyZVRleHR1cmVMb2FkaW5nLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICBjb25zdCB7IHR5cGUsIHByb3BlcnRpZXMgfSA9IGRhdGE7XG5cbiAgICAgIGlmICghU1VQUE9SVEVEX0pTT05fSU5JVElBTElaRVJfVFlQRVMuaW5jbHVkZXModHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChcbiAgICAgICAgICBgVGhlIGluaXRpYWxpemVyIHR5cGUgJHt0eXBlfSBpcyBpbnZhbGlkIG9yIG5vdCB5ZXQgc3VwcG9ydGVkYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoSU5JVElBTElaRVJfVFlQRVNfVEhBVF9SRVFVSVJFX1RIUkVFLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICAgIG1hZGVJbml0aWFsaXplcnMucHVzaChJbml0aWFsaXplclt0eXBlXS5mcm9tSlNPTihwcm9wZXJ0aWVzLCBUSFJFRSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFkZUluaXRpYWxpemVycy5wdXNoKEluaXRpYWxpemVyW3R5cGVdLmZyb21KU09OKHByb3BlcnRpZXMpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hZGVJbml0aWFsaXplcnMubGVuZ3RoID09PSBudW1iZXJPZkluaXRpYWxpemVycykge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShtYWRlSW5pdGlhbGl6ZXJzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvUmVxdWlyZVRleHR1cmVMb2FkaW5nLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIHByb3BlcnRpZXM6IHsgdGV4dHVyZSB9LFxuICAgICAgfSA9IGRhdGE7XG4gICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcblxuICAgICAgaWYgKCFTVVBQT1JURURfSlNPTl9JTklUSUFMSVpFUl9UWVBFUy5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KFxuICAgICAgICAgIGBUaGUgaW5pdGlhbGl6ZXIgdHlwZSAke3R5cGV9IGlzIGludmFsaWQgb3Igbm90IHlldCBzdXBwb3J0ZWRgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZChcbiAgICAgICAgdGV4dHVyZSxcbiAgICAgICAgbG9hZGVkVGV4dHVyZSA9PiB7XG4gICAgICAgICAgbWFkZUluaXRpYWxpemVycy5wdXNoKFxuICAgICAgICAgICAgVGV4dHVyZUluaXRpYWxpemVyLmZyb21KU09OKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBsb2FkZWRUZXh0dXJlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBUSFJFRVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAobWFkZUluaXRpYWxpemVycy5sZW5ndGggPT09IG51bWJlck9mSW5pdGlhbGl6ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShtYWRlSW5pdGlhbGl6ZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuLyoqXG4gKiBNYWtlcyBiZWhhdmlvdXJzIGZyb20ganNvbiBpdGVtcy5cbiAqXG4gKiBAcGFyYW0ge2FycmF5PG9iamVjdD59IGl0ZW1zIC0gQW4gYXJyYXkgb2Ygb2JqZWN0cyB3aGljaCBwcm92aWRlIGJlaGF2aW91ciBjb25zdHJ1Y3RvciBwYXJhbXNcbiAqIEByZXR1cm4ge1Byb21pc2U8YXJyYXk+fVxuICovXG5jb25zdCBtYWtlQmVoYXZpb3VycyA9IGl0ZW1zID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgIH1cblxuICAgIGNvbnN0IG51bWJlck9mQmVoYXZpb3VycyA9IGl0ZW1zLmxlbmd0aDtcbiAgICBjb25zdCBtYWRlQmVoYXZpb3VycyA9IFtdO1xuXG4gICAgaXRlbXMuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgcHJvcGVydGllcyB9ID0gZGF0YTtcblxuICAgICAgaWYgKCFTVVBQT1JURURfSlNPTl9CRUhBVklPVVJfVFlQRVMuaW5jbHVkZXModHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChcbiAgICAgICAgICBgVGhlIGJlaGF2aW91ciB0eXBlICR7dHlwZX0gaXMgaW52YWxpZCBvciBub3QgeWV0IHN1cHBvcnRlZGBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbWFkZUJlaGF2aW91cnMucHVzaChCZWhhdmlvdXJbdHlwZV0uZnJvbUpTT04ocHJvcGVydGllcykpO1xuXG4gICAgICBpZiAobWFkZUJlaGF2aW91cnMubGVuZ3RoID09PSBudW1iZXJPZkJlaGF2aW91cnMpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUobWFkZUJlaGF2aW91cnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuY29uc3QgbWFrZUVtaXR0ZXJzID0gKGVtaXR0ZXJzLCBFbWl0dGVyLCBUSFJFRSwgc2hvdWxkQXV0b0VtaXQpID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoIWVtaXR0ZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgIH1cblxuICAgIGNvbnN0IG1hZGVFbWl0dGVycyA9IFtdO1xuICAgIGNvbnN0IG51bWJlck9mRW1pdHRlcnMgPSBlbWl0dGVycy5sZW5ndGg7XG5cbiAgICBpZiAoIW51bWJlck9mRW1pdHRlcnMpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKG1hZGVFbWl0dGVycyk7XG4gICAgfVxuXG4gICAgZW1pdHRlcnMuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgY29uc3Qge1xuICAgICAgICByYXRlLFxuICAgICAgICByb3RhdGlvbixcbiAgICAgICAgaW5pdGlhbGl6ZXJzLFxuICAgICAgICBiZWhhdmlvdXJzLFxuICAgICAgICBlbWl0dGVyQmVoYXZpb3VycyA9IFtdLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgdG90YWxFbWl0VGltZXMgPSBJbmZpbml0eSxcbiAgICAgICAgbGlmZSA9IEluZmluaXR5LFxuICAgICAgfSA9IGRhdGE7XG5cbiAgICAgIGVtaXR0ZXJcbiAgICAgICAgLnNldFJhdGUobWFrZVJhdGUocmF0ZSkpXG4gICAgICAgIC5zZXRSb3RhdGlvbihyb3RhdGlvbilcbiAgICAgICAgLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcblxuICAgICAgbWFrZUluaXRpYWxpemVycyhpbml0aWFsaXplcnMsIFRIUkVFKVxuICAgICAgICAudGhlbihtYWRlSW5pdGlhbGl6ZXJzID0+IHtcbiAgICAgICAgICBlbWl0dGVyLnNldEluaXRpYWxpemVycyhtYWRlSW5pdGlhbGl6ZXJzKTtcblxuICAgICAgICAgIHJldHVybiBtYWtlQmVoYXZpb3VycyhiZWhhdmlvdXJzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4obWFkZUJlaGF2aW91cnMgPT4ge1xuICAgICAgICAgIGVtaXR0ZXIuc2V0QmVoYXZpb3VycyhtYWRlQmVoYXZpb3Vycyk7XG5cbiAgICAgICAgICByZXR1cm4gbWFrZUJlaGF2aW91cnMoZW1pdHRlckJlaGF2aW91cnMpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihtYWRlRW1pdHRlckJlaGF2aW91cnMgPT4ge1xuICAgICAgICAgIGVtaXR0ZXIuc2V0RW1pdHRlckJlaGF2aW91cnMobWFkZUVtaXR0ZXJCZWhhdmlvdXJzKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW1pdHRlcik7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGVtaXR0ZXIgPT4ge1xuICAgICAgICAgIG1hZGVFbWl0dGVycy5wdXNoKFxuICAgICAgICAgICAgc2hvdWxkQXV0b0VtaXRcbiAgICAgICAgICAgICAgPyBlbWl0dGVyLmVtaXQodG90YWxFbWl0VGltZXMsIGxpZmUpXG4gICAgICAgICAgICAgIDogZW1pdHRlci5zZXRUb3RhbEVtaXRUaW1lcyh0b3RhbEVtaXRUaW1lcykuc2V0TGlmZShsaWZlKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAobWFkZUVtaXR0ZXJzLmxlbmd0aCA9PT0gbnVtYmVyT2ZFbWl0dGVycykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobWFkZUVtaXR0ZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9KTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgU3lzdGVtIGluc3RhbmNlIGZyb20gYSBKU09OIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNyZWF0ZSB0aGUgU3lzdGVtIGluc3RhbmNlIGZyb21cbiAqIEBwYXJhbSB7bnVtYmVyfSBqc29uLnByZVBhcnRpY2xlcyAtIFRoZSBwcmVkZXRlcm1pbmVkIG51bWJlciBvZiBwYXJ0aWNsZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBqc29uLmludGVncmF0aW9uVHlwZSAtIFRoZSBpbnRlZ3JhdGlvbiBhbGdvcml0aG0gdG8gdXNlXG4gKiBAcGFyYW0ge2FycmF5PG9iamVjdD59IGpzb24uZW1pdHRlcnMgLSBUaGUgZW1pdHRlcnMgZm9yIHRoZSBzeXN0ZW0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRoZSBXZWIgR0wgQXBpIHRvIHVzZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gU3lzdGVtIC0gVGhlIHN5c3RlbSBjbGFzc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gRW1pdHRlciAtIFRoZSBlbWl0dGVyIGNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dIC0gT3B0aW9uYWwgY29uZmlnIG9wdGlvbnNcbiAqIEByZXR1cm4ge1Byb21pc2U8U3lzdGVtPn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGpzb24sIFRIUkVFLCBTeXN0ZW0sIEVtaXR0ZXIsIG9wdGlvbnMgPSB7fSkgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHByZVBhcnRpY2xlcyA9IFBPT0xfTUFYLFxuICAgICAgaW50ZWdyYXRpb25UeXBlID0gRVVMRVIsXG4gICAgICBlbWl0dGVycyA9IFtdLFxuICAgIH0gPSBqc29uO1xuICAgIGNvbnN0IHN5c3RlbSA9IG5ldyBTeXN0ZW0ocHJlUGFydGljbGVzLCBpbnRlZ3JhdGlvblR5cGUpO1xuICAgIGNvbnN0IHsgc2hvdWxkQXV0b0VtaXQgfSA9IHsgLi4uREVGQVVMVF9PUFRJT05TLCAuLi5vcHRpb25zIH07XG5cbiAgICBtYWtlRW1pdHRlcnMoZW1pdHRlcnMsIEVtaXR0ZXIsIFRIUkVFLCBzaG91bGRBdXRvRW1pdClcbiAgICAgIC50aGVuKG1hZGVFbWl0dGVycyA9PiB7XG4gICAgICAgIGNvbnN0IG51bWJlck9mRW1pdHRlcnMgPSBtYWRlRW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgICAgIGlmICghbnVtYmVyT2ZFbWl0dGVycykge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKHN5c3RlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYWRlRW1pdHRlcnMuZm9yRWFjaChtYWRlRW1pdHRlciA9PiB7XG4gICAgICAgICAgc3lzdGVtLmFkZEVtaXR0ZXIobWFkZUVtaXR0ZXIpO1xuXG4gICAgICAgICAgaWYgKHN5c3RlbS5lbWl0dGVycy5sZW5ndGggPT09IG51bWJlck9mRW1pdHRlcnMpIHtcbiAgICAgICAgICAgIHJlc29sdmUoc3lzdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KTtcbiJdfQ==