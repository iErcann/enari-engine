"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _math = require("../math");

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that forces particles along a specific axis.
 *
 */
var Force = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Force, _Behaviour);

  var _super = _createSuper(Force);

  /**
   * Constructs a Force behaviour instance.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Force(fx, fy, fz, life, easing) {
    var _this;

    var isEnabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    (0, _classCallCheck2["default"])(this, Force);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_FORCE, isEnabled);

    _this.reset(fx, fy, fz);

    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} fx - the x axis force
   * @param {number} fy - the y axis force
   * @param {number} fz - the z axis force
   */


  (0, _createClass2["default"])(Force, [{
    key: "reset",
    value: function reset(fx, fy, fz) {
      /**
       * @desc The normalized force to exert on the particle in
       * @type {Vector3D}
       */
      this.force = this.normalizeForce(new _math.Vector3D(fx, fy, fz));
      /**
       * @desc The id of the force vector
       * @property {number} this.force.id
       */

      this.force.id = Math.random();
    }
    /**
     * Mutates the particle.acceleration property.
     *
     * @param {object} particle - the particle to apply the behaviour to
     * @param {number} time - engine time
     * @param {integer} index - the particle index
     * @return void
     */

  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      this.energize(particle, time, index);
      particle.acceleration.add(this.force);
    }
    /**
     * Creates a Force initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @return {Force}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var fx = json.fx,
          fy = json.fy,
          fz = json.fz,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Force(fx, fy, fz, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Force;
}(_Behaviour2["default"]);

exports["default"] = Force;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiXSwibmFtZXMiOlsiRm9yY2UiLCJmeCIsImZ5IiwiZnoiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwidHlwZSIsInJlc2V0IiwiZm9yY2UiLCJub3JtYWxpemVGb3JjZSIsIlZlY3RvcjNEIiwiaWQiLCJNYXRoIiwicmFuZG9tIiwicGFydGljbGUiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsImFjY2VsZXJhdGlvbiIsImFkZCIsImpzb24iLCJCZWhhdmlvdXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLEs7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxpQkFBWUMsRUFBWixFQUFnQkMsRUFBaEIsRUFBb0JDLEVBQXBCLEVBQXdCQyxJQUF4QixFQUE4QkMsTUFBOUIsRUFBd0Q7QUFBQTs7QUFBQSxRQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTtBQUFBO0FBQ3RELDhCQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JFLDJCQUFwQixFQUEwQkQsU0FBMUI7O0FBRUEsVUFBS0UsS0FBTCxDQUFXUCxFQUFYLEVBQWVDLEVBQWYsRUFBbUJDLEVBQW5COztBQUhzRDtBQUl2RDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzswQkFDUUYsRSxFQUFJQyxFLEVBQUlDLEUsRUFBSTtBQUNoQjtBQUNKO0FBQ0E7QUFDQTtBQUNJLFdBQUtNLEtBQUwsR0FBYSxLQUFLQyxjQUFMLENBQW9CLElBQUlDLGNBQUosQ0FBYVYsRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLEVBQXJCLENBQXBCLENBQWI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxXQUFLTSxLQUFMLENBQVdHLEVBQVgsR0FBZ0JDLElBQUksQ0FBQ0MsTUFBTCxFQUFoQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU0MsUSxFQUFVQyxJLEVBQU1DLEssRUFBTztBQUM1QixXQUFLQyxRQUFMLENBQWNILFFBQWQsRUFBd0JDLElBQXhCLEVBQThCQyxLQUE5QjtBQUVBRixNQUFBQSxRQUFRLENBQUNJLFlBQVQsQ0FBc0JDLEdBQXRCLENBQTBCLEtBQUtYLEtBQS9CO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NkJBQ2tCWSxJLEVBQU07QUFBQSxVQUNacEIsRUFEWSxHQUNtQ29CLElBRG5DLENBQ1pwQixFQURZO0FBQUEsVUFDUkMsRUFEUSxHQUNtQ21CLElBRG5DLENBQ1JuQixFQURRO0FBQUEsVUFDSkMsRUFESSxHQUNtQ2tCLElBRG5DLENBQ0psQixFQURJO0FBQUEsVUFDQUMsSUFEQSxHQUNtQ2lCLElBRG5DLENBQ0FqQixJQURBO0FBQUEsVUFDTUMsTUFETixHQUNtQ2dCLElBRG5DLENBQ01oQixNQUROO0FBQUEsNEJBQ21DZ0IsSUFEbkMsQ0FDY2YsU0FEZDtBQUFBLFVBQ2NBLFNBRGQsZ0NBQzBCLElBRDFCO0FBR3BCLGFBQU8sSUFBSU4sS0FBSixDQUFVQyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEVBQWxCLEVBQXNCQyxJQUF0QixFQUE0QiwyQkFBZ0JDLE1BQWhCLENBQTVCLEVBQXFEQyxTQUFyRCxDQUFQO0FBQ0Q7OztFQS9EZ0NnQixzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgVmVjdG9yM0QgfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfRk9SQ0UgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBmb3JjZXMgcGFydGljbGVzIGFsb25nIGEgc3BlY2lmaWMgYXhpcy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBGb3JjZSBiZWhhdmlvdXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmeCAtIHRoZSB4IGF4aXMgZm9yY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZ5IC0gdGhlIHkgYXhpcyBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZnogLSB0aGUgeiBheGlzIGZvcmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gdGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBiZWhhdmlvdXIncyBkZWNheWluZyB0cmVuZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZ4LCBmeSwgZnosIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcblxuICAgIHRoaXMucmVzZXQoZngsIGZ5LCBmeik7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZ4IC0gdGhlIHggYXhpcyBmb3JjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZnkgLSB0aGUgeSBheGlzIGZvcmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmeiAtIHRoZSB6IGF4aXMgZm9yY2VcbiAgICovXG4gIHJlc2V0KGZ4LCBmeSwgZnopIHtcbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgbm9ybWFsaXplZCBmb3JjZSB0byBleGVydCBvbiB0aGUgcGFydGljbGUgaW5cbiAgICAgKiBAdHlwZSB7VmVjdG9yM0R9XG4gICAgICovXG4gICAgdGhpcy5mb3JjZSA9IHRoaXMubm9ybWFsaXplRm9yY2UobmV3IFZlY3RvcjNEKGZ4LCBmeSwgZnopKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBpZCBvZiB0aGUgZm9yY2UgdmVjdG9yXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHRoaXMuZm9yY2UuaWRcbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlLmlkID0gTWF0aC5yYW5kb20oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdXRhdGVzIHRoZSBwYXJ0aWNsZS5hY2NlbGVyYXRpb24gcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gZW5naW5lIHRpbWVcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleCAtIHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBwYXJ0aWNsZS5hY2NlbGVyYXRpb24uYWRkKHRoaXMuZm9yY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBGb3JjZSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tLlxuICAgKiBAcmV0dXJuIHtGb3JjZX1cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBmeCwgZnksIGZ6LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IEZvcmNlKGZ4LCBmeSwgZnosIGxpZmUsIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=