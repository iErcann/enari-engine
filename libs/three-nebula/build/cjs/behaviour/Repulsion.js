"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Attraction2 = _interopRequireDefault(require("./Attraction"));

var _math = require("../math");

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that causes particles to be repelled from a target position.
 *
 */
var Repulsion = /*#__PURE__*/function (_Attraction) {
  (0, _inherits2["default"])(Repulsion, _Attraction);

  var _super = _createSuper(Repulsion);

  /**
   * Constructs an Repulsion behaviour instance.
   *
   * @param {Vector3D} targetPosition - The position the particles will be repelled from
   * @param {number} force - The repulsion force scalar multiplier
   * @param {number} radius - The repulsion radius
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */
  function Repulsion(targetPosition, force, radius, life, easing) {
    var _this;

    var isEnabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    (0, _classCallCheck2["default"])(this, Repulsion);
    _this = _super.call(this, targetPosition, force, radius, life, easing, isEnabled);
    /**
     * @desc Repulsion is attraction with negative force.
     * @type {number}
     */

    _this.force *= -1;
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.BEHAVIOUR_TYPE_REPULSION;
    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Vector3D} targetPosition - the position the particles will be attracted to
   * @param {number} force - the attraction force multiplier
   * @param {number} radius - the attraction radius
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */


  (0, _createClass2["default"])(Repulsion, [{
    key: "reset",
    value: function reset(targetPosition, force, radius, life, easing) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Repulsion.prototype), "reset", this).call(this, targetPosition, force, radius, life, easing);
      this.force *= -1;
    }
    /**
     * Creates a Body initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.x - The target position x value
     * @property {number} json.y - The target position y value
     * @property {number} json.z - The target position z value
     * @property {number} json.force - The attraction force scalar multiplier
     * @property {number} json.life - The life of the particle
     * @property {string} json.easing - The behaviour's decaying trend
     * @return {Body}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var x = json.x,
          y = json.y,
          z = json.z,
          force = json.force,
          radius = json.radius,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Repulsion(new _math.Vector3D(x, y, z), force, radius, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Repulsion;
}(_Attraction2["default"]);

exports["default"] = Repulsion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUmVwdWxzaW9uLmpzIl0sIm5hbWVzIjpbIlJlcHVsc2lvbiIsInRhcmdldFBvc2l0aW9uIiwiZm9yY2UiLCJyYWRpdXMiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwidHlwZSIsImpzb24iLCJ4IiwieSIsInoiLCJWZWN0b3IzRCIsIkF0dHJhY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsUzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWUMsY0FBWixFQUE0QkMsS0FBNUIsRUFBbUNDLE1BQW5DLEVBQTJDQyxJQUEzQyxFQUFpREMsTUFBakQsRUFBMkU7QUFBQTs7QUFBQSxRQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTtBQUFBO0FBQ3pFLDhCQUFNTCxjQUFOLEVBQXNCQyxLQUF0QixFQUE2QkMsTUFBN0IsRUFBcUNDLElBQXJDLEVBQTJDQyxNQUEzQyxFQUFtREMsU0FBbkQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLSixLQUFMLElBQWMsQ0FBQyxDQUFmO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0ssSUFBTCxHQUFZQSwrQkFBWjtBQWJ5RTtBQWMxRTtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzswQkFDUU4sYyxFQUFnQkMsSyxFQUFPQyxNLEVBQVFDLEksRUFBTUMsTSxFQUFRO0FBQ2pELDZHQUFZSixjQUFaLEVBQTRCQyxLQUE1QixFQUFtQ0MsTUFBbkMsRUFBMkNDLElBQTNDLEVBQWlEQyxNQUFqRDtBQUNBLFdBQUtILEtBQUwsSUFBYyxDQUFDLENBQWY7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDa0JNLEksRUFBTTtBQUFBLFVBQ1pDLENBRFksR0FDK0NELElBRC9DLENBQ1pDLENBRFk7QUFBQSxVQUNUQyxDQURTLEdBQytDRixJQUQvQyxDQUNURSxDQURTO0FBQUEsVUFDTkMsQ0FETSxHQUMrQ0gsSUFEL0MsQ0FDTkcsQ0FETTtBQUFBLFVBQ0hULEtBREcsR0FDK0NNLElBRC9DLENBQ0hOLEtBREc7QUFBQSxVQUNJQyxNQURKLEdBQytDSyxJQUQvQyxDQUNJTCxNQURKO0FBQUEsVUFDWUMsSUFEWixHQUMrQ0ksSUFEL0MsQ0FDWUosSUFEWjtBQUFBLFVBQ2tCQyxNQURsQixHQUMrQ0csSUFEL0MsQ0FDa0JILE1BRGxCO0FBQUEsNEJBQytDRyxJQUQvQyxDQUMwQkYsU0FEMUI7QUFBQSxVQUMwQkEsU0FEMUIsZ0NBQ3NDLElBRHRDO0FBR3BCLGFBQU8sSUFBSU4sU0FBSixDQUNMLElBQUlZLGNBQUosQ0FBYUgsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLENBREssRUFFTFQsS0FGSyxFQUdMQyxNQUhLLEVBSUxDLElBSkssRUFLTCwyQkFBZ0JDLE1BQWhCLENBTEssRUFNTEMsU0FOSyxDQUFQO0FBUUQ7OztFQWpFb0NPLHVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSAnLi9BdHRyYWN0aW9uJztcbmltcG9ydCB7IFZlY3RvcjNEIH0gZnJvbSAnLi4vbWF0aCc7XG5pbXBvcnQgeyBnZXRFYXNpbmdCeU5hbWUgfSBmcm9tICcuLi9lYXNlJztcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1JFUFVMU0lPTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG4vKipcbiAqIEJlaGF2aW91ciB0aGF0IGNhdXNlcyBwYXJ0aWNsZXMgdG8gYmUgcmVwZWxsZWQgZnJvbSBhIHRhcmdldCBwb3NpdGlvbi5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcHVsc2lvbiBleHRlbmRzIEF0dHJhY3Rpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhbiBSZXB1bHNpb24gYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZlY3RvcjNEfSB0YXJnZXRQb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiB0aGUgcGFydGljbGVzIHdpbGwgYmUgcmVwZWxsZWQgZnJvbVxuICAgKiBAcGFyYW0ge251bWJlcn0gZm9yY2UgLSBUaGUgcmVwdWxzaW9uIGZvcmNlIHNjYWxhciBtdWx0aXBsaWVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXMgLSBUaGUgcmVwdWxzaW9uIHJhZGl1c1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFJlcHVsc2lvbiBpcyBhdHRyYWN0aW9uIHdpdGggbmVnYXRpdmUgZm9yY2UuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYmVoYXZpb3VyIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yM0R9IHRhcmdldFBvc2l0aW9uIC0gdGhlIHBvc2l0aW9uIHRoZSBwYXJ0aWNsZXMgd2lsbCBiZSBhdHRyYWN0ZWQgdG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZvcmNlIC0gdGhlIGF0dHJhY3Rpb24gZm9yY2UgbXVsdGlwbGllclxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzIC0gdGhlIGF0dHJhY3Rpb24gcmFkaXVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBCb2R5IGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb20uXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLnggLSBUaGUgdGFyZ2V0IHBvc2l0aW9uIHggdmFsdWVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ueSAtIFRoZSB0YXJnZXQgcG9zaXRpb24geSB2YWx1ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0ganNvbi56IC0gVGhlIHRhcmdldCBwb3NpdGlvbiB6IHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmZvcmNlIC0gVGhlIGF0dHJhY3Rpb24gZm9yY2Ugc2NhbGFyIG11bHRpcGxpZXJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ubGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcHJvcGVydHkge3N0cmluZ30ganNvbi5lYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHJldHVybiB7Qm9keX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyB4LCB5LCB6LCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFJlcHVsc2lvbihcbiAgICAgIG5ldyBWZWN0b3IzRCh4LCB5LCB6KSxcbiAgICAgIGZvcmNlLFxuICAgICAgcmFkaXVzLFxuICAgICAgbGlmZSxcbiAgICAgIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19