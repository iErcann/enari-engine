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

var _constants = require("../constants");

var _math = require("../math");

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that rotates particles.
 */
var Rotate = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Rotate, _Behaviour);

  var _super = _createSuper(Rotate);

  /**
   * Constructs a Rotate behaviour instance.
   *
   * @param {number} x - X axis rotation
   * @param {number} y - Y axis rotation
   * @param {number} z - Z axis rotation
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Rotate(x, y, z, life, easing) {
    var _this;

    var isEnabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    (0, _classCallCheck2["default"])(this, Rotate);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_ROTATE, isEnabled);

    _this.reset(x, y, z);

    return _this;
  }
  /**
   * Gets the rotation type.
   *
   * @return {string}
   */


  (0, _createClass2["default"])(Rotate, [{
    key: "reset",

    /**
     * Resets the behaviour properties.
     *
     * @param {number} x - X axis rotation
     * @param {number} y - Y axis rotation
     * @param {number} z - Z axis rotation
     * @param {number} life - the life of the behaviour
     * @param {function} easing - the easing equation to use for transforms
     * @return void
     */
    value: function reset(x, y, z, life, easing) {
      /**
       * @desc X axis rotation.
       * @type {number|Span}
       */
      this.x = x || 0;
      /**
       * @desc Y axis rotation.
       * @type {number|Span}
       */

      this.y = y || 0;
      /**
       * @desc Z axis rotation.
       * @type {number|Span}
       */

      this.z = z || 0;

      if (x === undefined || x == 'same') {
        this.rotationType = 'same';
      } else if (y == undefined) {
        this.rotationType = 'set';
      } else if (z === undefined) {
        this.rotationType = 'to';
      } else {
        this.rotationType = 'add';
        this.x = (0, _math.createSpan)(this.x * _constants.DR);
        this.y = (0, _math.createSpan)(this.y * _constants.DR);
        this.z = (0, _math.createSpan)(this.z * _constants.DR);
      }

      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(Rotate.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Initializes the behaviour on a particle.
     *
     * @param {object} particle - the particle to initialize the behaviour on
     * @return void
     */

  }, {
    key: "initialize",
    value: function initialize(particle) {
      switch (this.rotationType) {
        case 'same':
          break;

        case 'set':
          this._setRotation(particle.rotation, this.x);

          break;

        case 'to':
          particle.transform.fR = particle.transform.fR || new _math.Vector3D();
          particle.transform.tR = particle.transform.tR || new _math.Vector3D();

          this._setRotation(particle.transform.fR, this.x);

          this._setRotation(particle.transform.tR, this.y);

          break;

        case 'add':
          particle.transform.addR = new _math.Vector3D(this.x.getValue(), this.y.getValue(), this.z.getValue());
          break;
      }
    }
    /**
     * Sets the particle's rotation prior to the behaviour being applied.
     *
     * NOTE It's hard to see here, but this is mutating the particle's rotation
     * even though the particle is not being passed in directly.
     *
     * NOTE the else if below will never be reached because the value being passed in
     * will never be of type Vector3D.
     *
     * @param {Vector3D} particleRotation - the particle's rotation vector
     * @param {string|number} value - the value to set the rotation value to, if 'random'
     * rotation is randomised
     * @return void
     */

  }, {
    key: "_setRotation",
    value: function _setRotation(particleRotation, value) {
      particleRotation = particleRotation || new _math.Vector3D();

      if (value == 'random') {
        var x = _math.MathUtils.randomAToB(-_constants.PI, _constants.PI);

        var y = _math.MathUtils.randomAToB(-_constants.PI, _constants.PI);

        var z = _math.MathUtils.randomAToB(-_constants.PI, _constants.PI);

        particleRotation.set(x, y, z);
      } // we can't ever get here because value will never be a Vector3D!
      // consider refactoring to
      //  if (value instance of Span) { vec3.add(value.getValue()); }
      else if (value instanceof _math.Vector3D) {
        particleRotation.copy(value);
      }
    }
    /**
     * Mutates the particle.rotation property.
     *
     * @see http://stackoverflow.com/questions/21622956/how-to-convert-direction-vector-to-euler-angles
     * @param {object} particle - the particle to apply the behaviour to
     * @param {number} time - engine time
     * @param {integer} index - the particle index
     * @return void
     */

  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      this.energize(particle, time, index);

      switch (this.rotationType) {
        // orients the particle in the direction it is moving
        case 'same':
          if (!particle.rotation) {
            particle.rotation = new _math.Vector3D();
          }

          particle.rotation.eulerFromDir(particle.velocity);
          break;

        case 'set':
          //
          break;

        case 'to':
          particle.rotation.x = _math.MathUtils.lerp(particle.transform.fR.x, particle.transform.tR.x, this.energy);
          particle.rotation.y = _math.MathUtils.lerp(particle.transform.fR.y, particle.transform.tR.y, this.energy);
          particle.rotation.z = _math.MathUtils.lerp(particle.transform.fR.z, particle.transform.tR.z, this.energy);
          break;

        case 'add':
          particle.rotation.add(particle.transform.addR);
          break;
      }
    }
  }, {
    key: "rotationType",
    get: function get() {
      return this._rotationType;
    }
    /**
     * Sets the rotation type.
     *
     * @param {string}
     * @return void
     */
    ,
    set: function set(rotationType) {
      /**
       * @desc The rotation type. ENUM of ['same', 'set', 'to', 'add'].
       * @type {string}
       */
      this._rotationType = rotationType;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var x = json.x,
          y = json.y,
          z = json.z,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Rotate(x, y, z, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Rotate;
}(_Behaviour2["default"]);

exports["default"] = Rotate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvUm90YXRlLmpzIl0sIm5hbWVzIjpbIlJvdGF0ZSIsIngiLCJ5IiwieiIsImxpZmUiLCJlYXNpbmciLCJpc0VuYWJsZWQiLCJ0eXBlIiwicmVzZXQiLCJ1bmRlZmluZWQiLCJyb3RhdGlvblR5cGUiLCJEUiIsInBhcnRpY2xlIiwiX3NldFJvdGF0aW9uIiwicm90YXRpb24iLCJ0cmFuc2Zvcm0iLCJmUiIsIlZlY3RvcjNEIiwidFIiLCJhZGRSIiwiZ2V0VmFsdWUiLCJwYXJ0aWNsZVJvdGF0aW9uIiwidmFsdWUiLCJNYXRoVXRpbHMiLCJyYW5kb21BVG9CIiwiUEkiLCJzZXQiLCJjb3B5IiwidGltZSIsImluZGV4IiwiZW5lcmdpemUiLCJldWxlckZyb21EaXIiLCJ2ZWxvY2l0eSIsImxlcnAiLCJlbmVyZ3kiLCJhZGQiLCJfcm90YXRpb25UeXBlIiwianNvbiIsIkJlaGF2aW91ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtJQUNxQkEsTTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGtCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxJQUFyQixFQUEyQkMsTUFBM0IsRUFBcUQ7QUFBQTs7QUFBQSxRQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTtBQUFBO0FBQ25ELDhCQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JFLDRCQUFwQixFQUEwQkQsU0FBMUI7O0FBRUEsVUFBS0UsS0FBTCxDQUFXUCxDQUFYLEVBQWNDLENBQWQsRUFBaUJDLENBQWpCOztBQUhtRDtBQUlwRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQW1CRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsw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QUFvQkMsSUFBcEIsRUFBMEIsMkJBQWdCQyxNQUFoQixDQUExQixFQUFtREMsU0FBbkQsQ0FBUDtBQUNEOzs7RUEzTWlDZ0Msc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEUiwgUEkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWF0aFV0aWxzLCBWZWN0b3IzRCwgY3JlYXRlU3BhbiB9IGZyb20gJy4uL21hdGgnO1xuXG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gJy4vQmVoYXZpb3VyJztcbmltcG9ydCB7IGdldEVhc2luZ0J5TmFtZSB9IGZyb20gJy4uL2Vhc2UnO1xuaW1wb3J0IHsgQkVIQVZJT1VSX1RZUEVfUk9UQVRFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBCZWhhdmlvdXIgdGhhdCByb3RhdGVzIHBhcnRpY2xlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBSb3RhdGUgYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFggYXhpcyByb3RhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFkgYXhpcyByb3RhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0geiAtIFogYXhpcyByb3RhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gbGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBiZWhhdmlvdXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGVhc2luZyBlcXVhdGlvbiB0byB1c2UgZm9yIHRyYW5zZm9ybXNcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNFbmFibGVkPXRydWVdIC0gRGV0ZXJtaW5lcyBpZiB0aGUgYmVoYXZpb3VyIHdpbGwgYmUgYXBwbGllZCBvciBub3RcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB6LCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICB0aGlzLnJlc2V0KHgsIHksIHopO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvdGF0aW9uIHR5cGUuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldCByb3RhdGlvblR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uVHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSByb3RhdGlvbiB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ31cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBzZXQgcm90YXRpb25UeXBlKHJvdGF0aW9uVHlwZSkge1xuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSByb3RhdGlvbiB0eXBlLiBFTlVNIG9mIFsnc2FtZScsICdzZXQnLCAndG8nLCAnYWRkJ10uXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLl9yb3RhdGlvblR5cGUgPSByb3RhdGlvblR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGF4aXMgcm90YXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGF4aXMgcm90YXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHogLSBaIGF4aXMgcm90YXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIHRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVzZXQoeCwgeSwgeiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgWCBheGlzIHJvdGF0aW9uLlxuICAgICAqIEB0eXBlIHtudW1iZXJ8U3Bhbn1cbiAgICAgKi9cbiAgICB0aGlzLnggPSB4IHx8IDA7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBZIGF4aXMgcm90YXRpb24uXG4gICAgICogQHR5cGUge251bWJlcnxTcGFufVxuICAgICAqL1xuICAgIHRoaXMueSA9IHkgfHwgMDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFogYXhpcyByb3RhdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfFNwYW59XG4gICAgICovXG4gICAgdGhpcy56ID0geiB8fCAwO1xuXG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCB8fCB4ID09ICdzYW1lJykge1xuICAgICAgdGhpcy5yb3RhdGlvblR5cGUgPSAnc2FtZSc7XG4gICAgfSBlbHNlIGlmICh5ID09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yb3RhdGlvblR5cGUgPSAnc2V0JztcbiAgICB9IGVsc2UgaWYgKHogPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yb3RhdGlvblR5cGUgPSAndG8nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdGF0aW9uVHlwZSA9ICdhZGQnO1xuICAgICAgdGhpcy54ID0gY3JlYXRlU3Bhbih0aGlzLnggKiBEUik7XG4gICAgICB0aGlzLnkgPSBjcmVhdGVTcGFuKHRoaXMueSAqIERSKTtcbiAgICAgIHRoaXMueiA9IGNyZWF0ZVNwYW4odGhpcy56ICogRFIpO1xuICAgIH1cblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYmVoYXZpb3VyIG9uIGEgcGFydGljbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBiZWhhdmlvdXIgb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgc3dpdGNoICh0aGlzLnJvdGF0aW9uVHlwZSkge1xuICAgICAgY2FzZSAnc2FtZSc6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzZXQnOlxuICAgICAgICB0aGlzLl9zZXRSb3RhdGlvbihwYXJ0aWNsZS5yb3RhdGlvbiwgdGhpcy54KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3RvJzpcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmZSID0gcGFydGljbGUudHJhbnNmb3JtLmZSIHx8IG5ldyBWZWN0b3IzRCgpO1xuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0udFIgPSBwYXJ0aWNsZS50cmFuc2Zvcm0udFIgfHwgbmV3IFZlY3RvcjNEKCk7XG4gICAgICAgIHRoaXMuX3NldFJvdGF0aW9uKHBhcnRpY2xlLnRyYW5zZm9ybS5mUiwgdGhpcy54KTtcbiAgICAgICAgdGhpcy5fc2V0Um90YXRpb24ocGFydGljbGUudHJhbnNmb3JtLnRSLCB0aGlzLnkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmFkZFIgPSBuZXcgVmVjdG9yM0QoXG4gICAgICAgICAgdGhpcy54LmdldFZhbHVlKCksXG4gICAgICAgICAgdGhpcy55LmdldFZhbHVlKCksXG4gICAgICAgICAgdGhpcy56LmdldFZhbHVlKClcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3Mgcm90YXRpb24gcHJpb3IgdG8gdGhlIGJlaGF2aW91ciBiZWluZyBhcHBsaWVkLlxuICAgKlxuICAgKiBOT1RFIEl0J3MgaGFyZCB0byBzZWUgaGVyZSwgYnV0IHRoaXMgaXMgbXV0YXRpbmcgdGhlIHBhcnRpY2xlJ3Mgcm90YXRpb25cbiAgICogZXZlbiB0aG91Z2ggdGhlIHBhcnRpY2xlIGlzIG5vdCBiZWluZyBwYXNzZWQgaW4gZGlyZWN0bHkuXG4gICAqXG4gICAqIE5PVEUgdGhlIGVsc2UgaWYgYmVsb3cgd2lsbCBuZXZlciBiZSByZWFjaGVkIGJlY2F1c2UgdGhlIHZhbHVlIGJlaW5nIHBhc3NlZCBpblxuICAgKiB3aWxsIG5ldmVyIGJlIG9mIHR5cGUgVmVjdG9yM0QuXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yM0R9IHBhcnRpY2xlUm90YXRpb24gLSB0aGUgcGFydGljbGUncyByb3RhdGlvbiB2ZWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBzZXQgdGhlIHJvdGF0aW9uIHZhbHVlIHRvLCBpZiAncmFuZG9tJ1xuICAgKiByb3RhdGlvbiBpcyByYW5kb21pc2VkXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgX3NldFJvdGF0aW9uKHBhcnRpY2xlUm90YXRpb24sIHZhbHVlKSB7XG4gICAgcGFydGljbGVSb3RhdGlvbiA9IHBhcnRpY2xlUm90YXRpb24gfHwgbmV3IFZlY3RvcjNEKCk7XG4gICAgaWYgKHZhbHVlID09ICdyYW5kb20nKSB7XG4gICAgICB2YXIgeCA9IE1hdGhVdGlscy5yYW5kb21BVG9CKC1QSSwgUEkpO1xuICAgICAgdmFyIHkgPSBNYXRoVXRpbHMucmFuZG9tQVRvQigtUEksIFBJKTtcbiAgICAgIHZhciB6ID0gTWF0aFV0aWxzLnJhbmRvbUFUb0IoLVBJLCBQSSk7XG5cbiAgICAgIHBhcnRpY2xlUm90YXRpb24uc2V0KHgsIHksIHopO1xuICAgIH1cbiAgICAvLyB3ZSBjYW4ndCBldmVyIGdldCBoZXJlIGJlY2F1c2UgdmFsdWUgd2lsbCBuZXZlciBiZSBhIFZlY3RvcjNEIVxuICAgIC8vIGNvbnNpZGVyIHJlZmFjdG9yaW5nIHRvXG4gICAgLy8gIGlmICh2YWx1ZSBpbnN0YW5jZSBvZiBTcGFuKSB7IHZlYzMuYWRkKHZhbHVlLmdldFZhbHVlKCkpOyB9XG4gICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBWZWN0b3IzRCkge1xuICAgICAgcGFydGljbGVSb3RhdGlvbi5jb3B5KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTXV0YXRlcyB0aGUgcGFydGljbGUucm90YXRpb24gcHJvcGVydHkuXG4gICAqXG4gICAqIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTYyMjk1Ni9ob3ctdG8tY29udmVydC1kaXJlY3Rpb24tdmVjdG9yLXRvLWV1bGVyLWFuZ2xlc1xuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIGVuZ2luZSB0aW1lXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5lbmVyZ2l6ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgc3dpdGNoICh0aGlzLnJvdGF0aW9uVHlwZSkge1xuICAgICAgLy8gb3JpZW50cyB0aGUgcGFydGljbGUgaW4gdGhlIGRpcmVjdGlvbiBpdCBpcyBtb3ZpbmdcbiAgICAgIGNhc2UgJ3NhbWUnOlxuICAgICAgICBpZiAoIXBhcnRpY2xlLnJvdGF0aW9uKSB7XG4gICAgICAgICAgcGFydGljbGUucm90YXRpb24gPSBuZXcgVmVjdG9yM0QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uLmV1bGVyRnJvbURpcihwYXJ0aWNsZS52ZWxvY2l0eSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdzZXQnOlxuICAgICAgICAvL1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAndG8nOlxuICAgICAgICBwYXJ0aWNsZS5yb3RhdGlvbi54ID0gTWF0aFV0aWxzLmxlcnAoXG4gICAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmZSLngsXG4gICAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLnRSLngsXG4gICAgICAgICAgdGhpcy5lbmVyZ3lcbiAgICAgICAgKTtcbiAgICAgICAgcGFydGljbGUucm90YXRpb24ueSA9IE1hdGhVdGlscy5sZXJwKFxuICAgICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5mUi55LFxuICAgICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS50Ui55LFxuICAgICAgICAgIHRoaXMuZW5lcmd5XG4gICAgICAgICk7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uLnogPSBNYXRoVXRpbHMubGVycChcbiAgICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uZlIueixcbiAgICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0udFIueixcbiAgICAgICAgICB0aGlzLmVuZXJneVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgcGFydGljbGUucm90YXRpb24uYWRkKHBhcnRpY2xlLnRyYW5zZm9ybS5hZGRSKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IHgsIHksIHosIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgUm90YXRlKHgsIHksIHosIGxpZmUsIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=