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

var _math = require("../math");

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that scales particles.
 *
 */
var Scale = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Scale, _Behaviour);

  var _super = _createSuper(Scale);

  /**
   * Constructs a Scale behaviour instance.
   *
   * @param {number} scaleA - the starting scale value
   * @param {?number} scaleB - the ending scale value
   * @param {number} life - the life of the behaviour
   * @param {function} easing - the easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Scale(scaleA, scaleB, life, easing) {
    var _this;

    var isEnabled = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    (0, _classCallCheck2["default"])(this, Scale);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_SCALE, isEnabled);

    _this.reset(scaleA, scaleB);

    return _this;
  }
  /**
   * Gets the _same property which determines if the scale props are the same.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(Scale, [{
    key: "reset",

    /**
     * Resets the behaviour properties.
     *
     * @param {number} scaleA - the starting scale value
     * @param {?number} scaleB - the ending scale value
     * @param {number} life - the life of the behaviour
     * @param {function} easing - the easing equation to use for transforms
     * @return void
     */
    value: function reset(scaleA, scaleB, life, easing) {
      this.same = scaleB === null || scaleB === undefined ? true : false;
      /**
       * @desc The starting scale.
       * @type {Span}
       */

      this.scaleA = (0, _math.createSpan)(scaleA || 1);
      /**
       * @desc The ending scale.
       * @type {Span}
       */

      this.scaleB = (0, _math.createSpan)(scaleB);
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(Scale.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Initializes the behaviour on a particle.
     * Stores initial values for comparison and mutation in the applyBehaviour method.
     *
     * @param {object} particle - the particle to initialize the behaviour on
     * @return void
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.transform.scaleA = this.scaleA.getValue();
      particle.transform.oldRadius = particle.radius;
      particle.transform.scaleB = this.same ? particle.transform.scaleA : this.scaleB.getValue();
    }
    /**
     * Applies the behaviour to the particle.
     * Mutates the particle's scale and its radius according to this scale.
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
      particle.scale = _math.MathUtils.lerp(particle.transform.scaleA, particle.transform.scaleB, this.energy);

      if (particle.scale < 0.0005) {
        particle.scale = 0;
      }

      particle.radius = particle.transform.oldRadius * particle.scale;
    }
    /**
     * Returns a new instance of the behaviour from the JSON object passed.
     *
     * @param {object} json - JSON object containing the required constructor properties
     * @return {Spring}
     */

  }, {
    key: "same",
    get: function get() {
      return this._same;
    }
    /**
     * Sets the _same property which determines if the scale props are the same.
     *
     * @param {boolean} same
     * @return {boolean}
     */
    ,
    set: function set(same) {
      /**
       * @type {boolean}
       */
      this._same = same;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var scaleA = json.scaleA,
          scaleB = json.scaleB,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Scale(scaleA, scaleB, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Scale;
}(_Behaviour2["default"]);

exports["default"] = Scale;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvU2NhbGUuanMiXSwibmFtZXMiOlsiU2NhbGUiLCJzY2FsZUEiLCJzY2FsZUIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwidHlwZSIsInJlc2V0Iiwic2FtZSIsInVuZGVmaW5lZCIsInBhcnRpY2xlIiwidHJhbnNmb3JtIiwiZ2V0VmFsdWUiLCJvbGRSYWRpdXMiLCJyYWRpdXMiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsInNjYWxlIiwiTWF0aFV0aWxzIiwibGVycCIsImVuZXJneSIsIl9zYW1lIiwianNvbiIsIkJlaGF2aW91ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxLOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGlCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsSUFBNUIsRUFBa0NDLE1BQWxDLEVBQTREO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUMxRCw4QkFBTUYsSUFBTixFQUFZQyxNQUFaLEVBQW9CRSwyQkFBcEIsRUFBMEJELFNBQTFCOztBQUVBLFVBQUtFLEtBQUwsQ0FBV04sTUFBWCxFQUFtQkMsTUFBbkI7O0FBSDBEO0FBSTNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBa0JFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTswQkFDUUQsTSxFQUFRQyxNLEVBQVFDLEksRUFBTUMsTSxFQUFRO0FBQ2xDLFdBQUtJLElBQUwsR0FBWU4sTUFBTSxLQUFLLElBQVgsSUFBbUJBLE1BQU0sS0FBS08sU0FBOUIsR0FBMEMsSUFBMUMsR0FBaUQsS0FBN0Q7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxXQUFLUixNQUFMLEdBQWMsc0JBQVdBLE1BQU0sSUFBSSxDQUFyQixDQUFkO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksV0FBS0MsTUFBTCxHQUFjLHNCQUFXQSxNQUFYLENBQWQ7QUFFQUMsTUFBQUEsSUFBSSx1R0FBZ0JBLElBQWhCLEVBQXNCQyxNQUF0QixDQUFKO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsrQkFDYU0sUSxFQUFVO0FBQ25CQSxNQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJWLE1BQW5CLEdBQTRCLEtBQUtBLE1BQUwsQ0FBWVcsUUFBWixFQUE1QjtBQUNBRixNQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJFLFNBQW5CLEdBQStCSCxRQUFRLENBQUNJLE1BQXhDO0FBRUFKLE1BQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlQsTUFBbkIsR0FBNEIsS0FBS00sSUFBTCxHQUN4QkUsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQURLLEdBRXhCLEtBQUtDLE1BQUwsQ0FBWVUsUUFBWixFQUZKO0FBR0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7MkJBQ1NGLFEsRUFBVUssSSxFQUFNQyxLLEVBQU87QUFDNUIsV0FBS0MsUUFBTCxDQUFjUCxRQUFkLEVBQXdCSyxJQUF4QixFQUE4QkMsS0FBOUI7QUFFQU4sTUFBQUEsUUFBUSxDQUFDUSxLQUFULEdBQWlCQyxnQkFBVUMsSUFBVixDQUNmVixRQUFRLENBQUNDLFNBQVQsQ0FBbUJWLE1BREosRUFFZlMsUUFBUSxDQUFDQyxTQUFULENBQW1CVCxNQUZKLEVBR2YsS0FBS21CLE1BSFUsQ0FBakI7O0FBTUEsVUFBSVgsUUFBUSxDQUFDUSxLQUFULEdBQWlCLE1BQXJCLEVBQTZCO0FBQzNCUixRQUFBQSxRQUFRLENBQUNRLEtBQVQsR0FBaUIsQ0FBakI7QUFDRDs7QUFFRFIsTUFBQUEsUUFBUSxDQUFDSSxNQUFULEdBQWtCSixRQUFRLENBQUNDLFNBQVQsQ0FBbUJFLFNBQW5CLEdBQStCSCxRQUFRLENBQUNRLEtBQTFEO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBMUZhO0FBQ1QsYUFBTyxLQUFLSSxLQUFaO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O3NCQUNXZCxJLEVBQU07QUFDYjtBQUNKO0FBQ0E7QUFDSSxXQUFLYyxLQUFMLEdBQWFkLElBQWI7QUFDRDs7OzZCQTRFZWUsSSxFQUFNO0FBQUEsVUFDWnRCLE1BRFksR0FDdUNzQixJQUR2QyxDQUNadEIsTUFEWTtBQUFBLFVBQ0pDLE1BREksR0FDdUNxQixJQUR2QyxDQUNKckIsTUFESTtBQUFBLFVBQ0lDLElBREosR0FDdUNvQixJQUR2QyxDQUNJcEIsSUFESjtBQUFBLFVBQ1VDLE1BRFYsR0FDdUNtQixJQUR2QyxDQUNVbkIsTUFEVjtBQUFBLDRCQUN1Q21CLElBRHZDLENBQ2tCbEIsU0FEbEI7QUFBQSxVQUNrQkEsU0FEbEIsZ0NBQzhCLElBRDlCO0FBR3BCLGFBQU8sSUFBSUwsS0FBSixDQUFVQyxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQkMsSUFBMUIsRUFBZ0MsMkJBQWdCQyxNQUFoQixDQUFoQyxFQUF5REMsU0FBekQsQ0FBUDtBQUNEOzs7RUFySGdDbUIsc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXRoVXRpbHMsIGNyZWF0ZVNwYW4gfSBmcm9tICcuLi9tYXRoJztcblxuaW1wb3J0IEJlaGF2aW91ciBmcm9tICcuL0JlaGF2aW91cic7XG5pbXBvcnQgeyBnZXRFYXNpbmdCeU5hbWUgfSBmcm9tICcuLi9lYXNlJztcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX1NDQUxFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCBzY2FsZXMgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIFNjYWxlIGJlaGF2aW91ciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlQSAtIHRoZSBzdGFydGluZyBzY2FsZSB2YWx1ZVxuICAgKiBAcGFyYW0gez9udW1iZXJ9IHNjYWxlQiAtIHRoZSBlbmRpbmcgc2NhbGUgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc2NhbGVBLCBzY2FsZUIsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcblxuICAgIHRoaXMucmVzZXQoc2NhbGVBLCBzY2FsZUIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIHNjYWxlIHByb3BzIGFyZSB0aGUgc2FtZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBzYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9zYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIHNjYWxlIHByb3BzIGFyZSB0aGUgc2FtZS5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzZXQgc2FtZShzYW1lKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fc2FtZSA9IHNhbWU7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlQSAtIHRoZSBzdGFydGluZyBzY2FsZSB2YWx1ZVxuICAgKiBAcGFyYW0gez9udW1iZXJ9IHNjYWxlQiAtIHRoZSBlbmRpbmcgc2NhbGUgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVzZXQoc2NhbGVBLCBzY2FsZUIsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IHNjYWxlQiA9PT0gbnVsbCB8fCBzY2FsZUIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBzdGFydGluZyBzY2FsZS5cbiAgICAgKiBAdHlwZSB7U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLnNjYWxlQSA9IGNyZWF0ZVNwYW4oc2NhbGVBIHx8IDEpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGVuZGluZyBzY2FsZS5cbiAgICAgKiBAdHlwZSB7U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLnNjYWxlQiA9IGNyZWF0ZVNwYW4oc2NhbGVCKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYmVoYXZpb3VyIG9uIGEgcGFydGljbGUuXG4gICAqIFN0b3JlcyBpbml0aWFsIHZhbHVlcyBmb3IgY29tcGFyaXNvbiBhbmQgbXV0YXRpb24gaW4gdGhlIGFwcGx5QmVoYXZpb3VyIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGluaXRpYWxpemUgdGhlIGJlaGF2aW91ciBvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uc2NhbGVBID0gdGhpcy5zY2FsZUEuZ2V0VmFsdWUoKTtcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0ub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuXG4gICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQiA9IHRoaXMuc2FtZVxuICAgICAgPyBwYXJ0aWNsZS50cmFuc2Zvcm0uc2NhbGVBXG4gICAgICA6IHRoaXMuc2NhbGVCLmdldFZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogTXV0YXRlcyB0aGUgcGFydGljbGUncyBzY2FsZSBhbmQgaXRzIHJhZGl1cyBhY2NvcmRpbmcgdG8gdGhpcyBzY2FsZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBlbmdpbmUgdGltZVxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgbXV0YXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuZW5lcmdpemUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIHBhcnRpY2xlLnNjYWxlID0gTWF0aFV0aWxzLmxlcnAoXG4gICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uc2NhbGVBLFxuICAgICAgcGFydGljbGUudHJhbnNmb3JtLnNjYWxlQixcbiAgICAgIHRoaXMuZW5lcmd5XG4gICAgKTtcblxuICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA8IDAuMDAwNSkge1xuICAgICAgcGFydGljbGUuc2NhbGUgPSAwO1xuICAgIH1cblxuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHBhcnRpY2xlLnRyYW5zZm9ybS5vbGRSYWRpdXMgKiBwYXJ0aWNsZS5zY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBiZWhhdmlvdXIgZnJvbSB0aGUgSlNPTiBvYmplY3QgcGFzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIEpTT04gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlcXVpcmVkIGNvbnN0cnVjdG9yIHByb3BlcnRpZXNcbiAgICogQHJldHVybiB7U3ByaW5nfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IHNjYWxlQSwgc2NhbGVCLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFNjYWxlKHNjYWxlQSwgc2NhbGVCLCBsaWZlLCBnZXRFYXNpbmdCeU5hbWUoZWFzaW5nKSwgaXNFbmFibGVkKTtcbiAgfVxufVxuIl19