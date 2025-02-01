"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var Zone = _interopRequireWildcard(require("../zone"));

var _Initializer2 = _interopRequireDefault(require("./Initializer"));

var _constants = require("../core/constants");

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the starting position property for initialized particles.
 * This is derived from a zone randomly chosen from those supplied to the constructor.
 *
 */
var Position = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Position, _Initializer);

  var _super = _createSuper(Position);

  /**
   * Constructs a Position initializer instance.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */
  function Position() {
    var _this;

    (0, _classCallCheck2["default"])(this, Position);
    _this = _super.call(this, _types.INITIALIZER_TYPE_POSITION);

    _this.reset.apply((0, _assertThisInitialized2["default"])(_this), arguments);

    return _this;
  }
  /**
   * Resets the initializer properties.
   * Clears all previously set zones and resets the zones according to args passed.
   *
   * @param {Zone|array<Zone>}
   * @return void
   */


  (0, _createClass2["default"])(Position, [{
    key: "reset",
    value: function reset() {
      if (!this.zones) {
        this.zones = [];
      } else {
        this.zones.length = 0;
      }
      /**
       * @desc The zones to use as bounds for calculating the particle's starting position.
       * @type {array<Zone>}
       */


      this.zones = this.zones.concat(Array.prototype.slice.call(arguments));
    }
    /**
     * Adds a zone or zones to this.zones.
     *
     * @param {Zone|array<Zone>}
     * @return void
     */

  }, {
    key: "addZone",
    value: function addZone() {
      this.zones = this.zones.concat(Array.prototype.slice.call(arguments));
    }
    /**
     * Creates a Position initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @param {string} json.zoneType - The type of zone to use for initial position
     * @return {Position}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var zoneType = json.zoneType,
          params = (0, _objectWithoutProperties2["default"])(json, ["zoneType"]);

      if (!_constants.SUPPORTED_JSON_ZONE_TYPES.includes(zoneType)) {
        throw new Error("The zone type ".concat(zoneType, " is invalid or not yet supported"));
      }

      return new Position((0, _construct2["default"])(Zone[zoneType], (0, _toConsumableArray2["default"])(Object.values(params))));
    }
  }]);
  return Position;
}(_Initializer2["default"]);
/**
 * Sets the particle's initial position.
 *
 * @param {Particle} particle - the particle to initialize the property on
 * @return void
 */


exports["default"] = Position;

Position.prototype.initialize = function () {
  var zone;
  return function (target) {
    zone = this.zones[Math.random() * this.zones.length >> 0];
    zone.getPosition();
    target.position.x = zone.vector.x;
    target.position.y = zone.vector.y;
    target.position.z = zone.vector.z;
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Qb3NpdGlvbi5qcyJdLCJuYW1lcyI6WyJQb3NpdGlvbiIsInR5cGUiLCJyZXNldCIsImFwcGx5IiwiYXJndW1lbnRzIiwiem9uZXMiLCJsZW5ndGgiLCJjb25jYXQiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImpzb24iLCJ6b25lVHlwZSIsInBhcmFtcyIsIlNVUFBPUlRFRF9KU09OX1pPTkVfVFlQRVMiLCJpbmNsdWRlcyIsIkVycm9yIiwiWm9uZSIsIk9iamVjdCIsInZhbHVlcyIsIkluaXRpYWxpemVyIiwiaW5pdGlhbGl6ZSIsInpvbmUiLCJ0YXJnZXQiLCJNYXRoIiwicmFuZG9tIiwiZ2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJ2ZWN0b3IiLCJ5IiwieiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLFE7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHNCQUFjO0FBQUE7O0FBQUE7QUFDWiw4QkFBTUMsZ0NBQU47O0FBRUEsVUFBS0MsS0FBTCxDQUFXQyxLQUFYLGlEQUF1QkMsU0FBdkI7O0FBSFk7QUFJYjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs0QkFDVTtBQUNOLFVBQUksQ0FBQyxLQUFLQyxLQUFWLEVBQWlCO0FBQ2YsYUFBS0EsS0FBTCxHQUFhLEVBQWI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQSxLQUFMLENBQVdDLE1BQVgsR0FBb0IsQ0FBcEI7QUFDRDtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7QUFDSSxXQUFLRCxLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXRSxNQUFYLENBQWtCQyxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQlAsU0FBM0IsQ0FBbEIsQ0FBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzhCQUNZO0FBQ1IsV0FBS0MsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV0UsTUFBWCxDQUFrQkMsS0FBSyxDQUFDQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJQLFNBQTNCLENBQWxCLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNrQlEsSSxFQUFNO0FBQUEsVUFDWkMsUUFEWSxHQUNZRCxJQURaLENBQ1pDLFFBRFk7QUFBQSxVQUNDQyxNQURELDZDQUNZRixJQURaOztBQUdwQixVQUFJLENBQUNHLHFDQUEwQkMsUUFBMUIsQ0FBbUNILFFBQW5DLENBQUwsRUFBbUQ7QUFDakQsY0FBTSxJQUFJSSxLQUFKLHlCQUNhSixRQURiLHNDQUFOO0FBR0Q7O0FBRUQsYUFBTyxJQUFJYixRQUFKLDZCQUFpQmtCLElBQUksQ0FBQ0wsUUFBRCxDQUFyQixzQ0FBbUNNLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjTixNQUFkLENBQW5DLEdBQVA7QUFDRDs7O0VBN0RtQ08sd0I7QUFnRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQXJCLFFBQVEsQ0FBQ1MsU0FBVCxDQUFtQmEsVUFBbkIsR0FBaUMsWUFBVztBQUMxQyxNQUFJQyxJQUFKO0FBRUEsU0FBTyxVQUFTQyxNQUFULEVBQWlCO0FBQ3RCRCxJQUFBQSxJQUFJLEdBQUcsS0FBS2xCLEtBQUwsQ0FBWW9CLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixLQUFLckIsS0FBTCxDQUFXQyxNQUE1QixJQUF1QyxDQUFsRCxDQUFQO0FBRUFpQixJQUFBQSxJQUFJLENBQUNJLFdBQUw7QUFFQUgsSUFBQUEsTUFBTSxDQUFDSSxRQUFQLENBQWdCQyxDQUFoQixHQUFvQk4sSUFBSSxDQUFDTyxNQUFMLENBQVlELENBQWhDO0FBQ0FMLElBQUFBLE1BQU0sQ0FBQ0ksUUFBUCxDQUFnQkcsQ0FBaEIsR0FBb0JSLElBQUksQ0FBQ08sTUFBTCxDQUFZQyxDQUFoQztBQUNBUCxJQUFBQSxNQUFNLENBQUNJLFFBQVAsQ0FBZ0JJLENBQWhCLEdBQW9CVCxJQUFJLENBQUNPLE1BQUwsQ0FBWUUsQ0FBaEM7QUFDRCxHQVJEO0FBU0QsQ0FaK0IsRUFBaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBab25lIGZyb20gJy4uL3pvbmUnO1xuXG5pbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XG5pbXBvcnQgeyBTVVBQT1JURURfSlNPTl9aT05FX1RZUEVTIH0gZnJvbSAnLi4vY29yZS9jb25zdGFudHMnO1xuaW1wb3J0IHsgSU5JVElBTElaRVJfVFlQRV9QT1NJVElPTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhcnRpbmcgcG9zaXRpb24gcHJvcGVydHkgZm9yIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqIFRoaXMgaXMgZGVyaXZlZCBmcm9tIGEgem9uZSByYW5kb21seSBjaG9zZW4gZnJvbSB0aG9zZSBzdXBwbGllZCB0byB0aGUgY29uc3RydWN0b3IuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbiBleHRlbmRzIEluaXRpYWxpemVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBQb3NpdGlvbiBpbml0aWFsaXplciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtab25lfGFycmF5PFpvbmU+fVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgdGhpcy5yZXNldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgaW5pdGlhbGl6ZXIgcHJvcGVydGllcy5cbiAgICogQ2xlYXJzIGFsbCBwcmV2aW91c2x5IHNldCB6b25lcyBhbmQgcmVzZXRzIHRoZSB6b25lcyBhY2NvcmRpbmcgdG8gYXJncyBwYXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZXxhcnJheTxab25lPn1cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNldCgpIHtcbiAgICBpZiAoIXRoaXMuem9uZXMpIHtcbiAgICAgIHRoaXMuem9uZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy56b25lcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSB6b25lcyB0byB1c2UgYXMgYm91bmRzIGZvciBjYWxjdWxhdGluZyB0aGUgcGFydGljbGUncyBzdGFydGluZyBwb3NpdGlvbi5cbiAgICAgKiBAdHlwZSB7YXJyYXk8Wm9uZT59XG4gICAgICovXG4gICAgdGhpcy56b25lcyA9IHRoaXMuem9uZXMuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB6b25lIG9yIHpvbmVzIHRvIHRoaXMuem9uZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZXxhcnJheTxab25lPn1cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBhZGRab25lKCkge1xuICAgIHRoaXMuem9uZXMgPSB0aGlzLnpvbmVzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUG9zaXRpb24gaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGpzb24uem9uZVR5cGUgLSBUaGUgdHlwZSBvZiB6b25lIHRvIHVzZSBmb3IgaW5pdGlhbCBwb3NpdGlvblxuICAgKiBAcmV0dXJuIHtQb3NpdGlvbn1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyB6b25lVHlwZSwgLi4ucGFyYW1zIH0gPSBqc29uO1xuXG4gICAgaWYgKCFTVVBQT1JURURfSlNPTl9aT05FX1RZUEVTLmluY2x1ZGVzKHpvbmVUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhlIHpvbmUgdHlwZSAke3pvbmVUeXBlfSBpcyBpbnZhbGlkIG9yIG5vdCB5ZXQgc3VwcG9ydGVkYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKG5ldyBab25lW3pvbmVUeXBlXSguLi5PYmplY3QudmFsdWVzKHBhcmFtcykpKTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBwcm9wZXJ0eSBvblxuICogQHJldHVybiB2b2lkXG4gKi9cblBvc2l0aW9uLnByb3RvdHlwZS5pbml0aWFsaXplID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgem9uZTtcblxuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgem9uZSA9IHRoaXMuem9uZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnpvbmVzLmxlbmd0aCkgPj4gMF07XG5cbiAgICB6b25lLmdldFBvc2l0aW9uKCk7XG5cbiAgICB0YXJnZXQucG9zaXRpb24ueCA9IHpvbmUudmVjdG9yLng7XG4gICAgdGFyZ2V0LnBvc2l0aW9uLnkgPSB6b25lLnZlY3Rvci55O1xuICAgIHRhcmdldC5wb3NpdGlvbi56ID0gem9uZS52ZWN0b3IuejtcbiAgfTtcbn0pKCk7XG4iXX0=