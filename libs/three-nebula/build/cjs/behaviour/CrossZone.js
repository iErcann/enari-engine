"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var Zone = _interopRequireWildcard(require("../zone"));

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _constants = require("./constants");

var _ease = require("../ease");

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that allows for specific functions to be called on particles when
 * they interact with a zone.
 *
 */
var CrossZone = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(CrossZone, _Behaviour);

  var _super = _createSuper(CrossZone);

  /**
   * Constructs a CrossZone behaviour instance.
   *
   * @param {Zone} zone - the zone used to apply to particles with this behaviour
   * @param {string} [crossType=DEFAULT_CROSS_TYPE] - enum of cross types, valid strings include 'dead', 'bound', 'cross'
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   */
  function CrossZone(zone, crossType, life, easing, isEnabled) {
    var _this;

    (0, _classCallCheck2["default"])(this, CrossZone);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_CROSS_ZONE, isEnabled);

    _this.reset(zone, crossType);

    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Zone} zone - the zone used to apply to particles with this behaviour
   * @param {string} [crossType=DEFAULT_CROSS_TYPE] - enum of cross types, valid strings include 'dead', 'bound', 'cross'
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   */


  (0, _createClass2["default"])(CrossZone, [{
    key: "reset",
    value: function reset(zone) {
      var crossType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_CROSS_TYPE;
      var life = arguments.length > 2 ? arguments[2] : undefined;
      var easing = arguments.length > 3 ? arguments[3] : undefined;

      /**
       * @desc The zone used to apply to particles with this behaviour
       * @type {Zone}
       */
      this.zone = zone;
      this.zone.crossType = crossType;
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(CrossZone.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Applies the behaviour to the particle.
     *
     * @see {@link '../zone/Zone.js'} crossing
     * @param {object} particle - the particle to apply the behaviour to
     * @param {number} time - engine time
     * @param {integer} index - the particle index
     * @return void
     */

  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      this.energize(particle, time, index);
      this.zone.crossing.call(this.zone, particle);
    }
    /**
     * Creates a CrossZone initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @return {CrossZone}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var zoneType = json.zoneType,
          zoneParams = json.zoneParams,
          crossType = json.crossType,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      var zone = (0, _construct2["default"])(Zone[zoneType], (0, _toConsumableArray2["default"])(Object.values(zoneParams)));
      return new CrossZone(zone, crossType, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return CrossZone;
}(_Behaviour2["default"]);

exports["default"] = CrossZone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQ3Jvc3Nab25lLmpzIl0sIm5hbWVzIjpbIkNyb3NzWm9uZSIsInpvbmUiLCJjcm9zc1R5cGUiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwidHlwZSIsInJlc2V0IiwiREVGQVVMVF9DUk9TU19UWVBFIiwicGFydGljbGUiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsImNyb3NzaW5nIiwiY2FsbCIsImpzb24iLCJ6b25lVHlwZSIsInpvbmVQYXJhbXMiLCJab25lIiwiT2JqZWN0IiwidmFsdWVzIiwiQmVoYXZpb3VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLFM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZQyxJQUFaLEVBQWtCQyxTQUFsQixFQUE2QkMsSUFBN0IsRUFBbUNDLE1BQW5DLEVBQTJDQyxTQUEzQyxFQUFzRDtBQUFBOztBQUFBO0FBQ3BELDhCQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JFLGdDQUFwQixFQUEwQkQsU0FBMUI7O0FBRUEsVUFBS0UsS0FBTCxDQUFXTixJQUFYLEVBQWlCQyxTQUFqQjs7QUFIb0Q7QUFJckQ7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzswQkFDUUQsSSxFQUFvRDtBQUFBLFVBQTlDQyxTQUE4Qyx1RUFBbENNLDZCQUFrQztBQUFBLFVBQWRMLElBQWM7QUFBQSxVQUFSQyxNQUFROztBQUN4RDtBQUNKO0FBQ0E7QUFDQTtBQUNJLFdBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLFdBQUtBLElBQUwsQ0FBVUMsU0FBVixHQUFzQkEsU0FBdEI7QUFFQUMsTUFBQUEsSUFBSSwyR0FBZ0JBLElBQWhCLEVBQXNCQyxNQUF0QixDQUFKO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7MkJBQ1NLLFEsRUFBVUMsSSxFQUFNQyxLLEVBQU87QUFDNUIsV0FBS0MsUUFBTCxDQUFjSCxRQUFkLEVBQXdCQyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQSxXQUFLVixJQUFMLENBQVVZLFFBQVYsQ0FBbUJDLElBQW5CLENBQXdCLEtBQUtiLElBQTdCLEVBQW1DUSxRQUFuQztBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNrQk0sSSxFQUFNO0FBQUEsVUFFbEJDLFFBRmtCLEdBUWhCRCxJQVJnQixDQUVsQkMsUUFGa0I7QUFBQSxVQUdsQkMsVUFIa0IsR0FRaEJGLElBUmdCLENBR2xCRSxVQUhrQjtBQUFBLFVBSWxCZixTQUprQixHQVFoQmEsSUFSZ0IsQ0FJbEJiLFNBSmtCO0FBQUEsVUFLbEJDLElBTGtCLEdBUWhCWSxJQVJnQixDQUtsQlosSUFMa0I7QUFBQSxVQU1sQkMsTUFOa0IsR0FRaEJXLElBUmdCLENBTWxCWCxNQU5rQjtBQUFBLDRCQVFoQlcsSUFSZ0IsQ0FPbEJWLFNBUGtCO0FBQUEsVUFPbEJBLFNBUGtCLGdDQU9OLElBUE07QUFVcEIsVUFBTUosSUFBSSwrQkFBT2lCLElBQUksQ0FBQ0YsUUFBRCxDQUFYLHNDQUF5QkcsTUFBTSxDQUFDQyxNQUFQLENBQWNILFVBQWQsQ0FBekIsRUFBVjtBQUVBLGFBQU8sSUFBSWpCLFNBQUosQ0FDTEMsSUFESyxFQUVMQyxTQUZLLEVBR0xDLElBSEssRUFJTCwyQkFBZ0JDLE1BQWhCLENBSkssRUFLTEMsU0FMSyxDQUFQO0FBT0Q7OztFQTNFb0NnQixzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFpvbmUgZnJvbSAnLi4vem9uZSc7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgREVGQVVMVF9DUk9TU19UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9DUk9TU19aT05FIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBhbGxvd3MgZm9yIHNwZWNpZmljIGZ1bmN0aW9ucyB0byBiZSBjYWxsZWQgb24gcGFydGljbGVzIHdoZW5cbiAqIHRoZXkgaW50ZXJhY3Qgd2l0aCBhIHpvbmUuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm9zc1pvbmUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIENyb3NzWm9uZSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZX0gem9uZSAtIHRoZSB6b25lIHVzZWQgdG8gYXBwbHkgdG8gcGFydGljbGVzIHdpdGggdGhpcyBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjcm9zc1R5cGU9REVGQVVMVF9DUk9TU19UWVBFXSAtIGVudW0gb2YgY3Jvc3MgdHlwZXMsIHZhbGlkIHN0cmluZ3MgaW5jbHVkZSAnZGVhZCcsICdib3VuZCcsICdjcm9zcydcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqL1xuICBjb25zdHJ1Y3Rvcih6b25lLCBjcm9zc1R5cGUsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nLCB0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZX0gem9uZSAtIHRoZSB6b25lIHVzZWQgdG8gYXBwbHkgdG8gcGFydGljbGVzIHdpdGggdGhpcyBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjcm9zc1R5cGU9REVGQVVMVF9DUk9TU19UWVBFXSAtIGVudW0gb2YgY3Jvc3MgdHlwZXMsIHZhbGlkIHN0cmluZ3MgaW5jbHVkZSAnZGVhZCcsICdib3VuZCcsICdjcm9zcydcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqL1xuICByZXNldCh6b25lLCBjcm9zc1R5cGUgPSBERUZBVUxUX0NST1NTX1RZUEUsIGxpZmUsIGVhc2luZykge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSB6b25lIHVzZWQgdG8gYXBwbHkgdG8gcGFydGljbGVzIHdpdGggdGhpcyBiZWhhdmlvdXJcbiAgICAgKiBAdHlwZSB7Wm9uZX1cbiAgICAgKi9cbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBjcm9zc1R5cGU7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgJy4uL3pvbmUvWm9uZS5qcyd9IGNyb3NzaW5nXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICB0aGlzLnpvbmUuY3Jvc3NpbmcuY2FsbCh0aGlzLnpvbmUsIHBhcnRpY2xlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ3Jvc3Nab25lIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEByZXR1cm4ge0Nyb3NzWm9uZX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qge1xuICAgICAgem9uZVR5cGUsXG4gICAgICB6b25lUGFyYW1zLFxuICAgICAgY3Jvc3NUeXBlLFxuICAgICAgbGlmZSxcbiAgICAgIGVhc2luZyxcbiAgICAgIGlzRW5hYmxlZCA9IHRydWUsXG4gICAgfSA9IGpzb247XG5cbiAgICBjb25zdCB6b25lID0gbmV3IFpvbmVbem9uZVR5cGVdKC4uLk9iamVjdC52YWx1ZXMoem9uZVBhcmFtcykpO1xuXG4gICAgcmV0dXJuIG5ldyBDcm9zc1pvbmUoXG4gICAgICB6b25lLFxuICAgICAgY3Jvc3NUeXBlLFxuICAgICAgbGlmZSxcbiAgICAgIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19