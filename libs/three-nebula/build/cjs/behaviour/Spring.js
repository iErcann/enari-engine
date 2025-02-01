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
 * Behaviour that causes particles to spring.
 *
 */
var Spring = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Spring, _Behaviour);

  var _super = _createSuper(Spring);

  /**
   * Constructs a Spring behaviour instance.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @param {number} life - The life of the behaviour
   * @param {function} easing - The easing equation to use for transforms
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Spring(x, y, z, spring, friction, life, easing) {
    var _this;

    var isEnabled = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
    (0, _classCallCheck2["default"])(this, Spring);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_SPRING, isEnabled);

    _this.reset(x, y, z, spring, friction);

    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {number} x - X axis spring
   * @param {number} y - Y axis spring
   * @param {number} z - Z axis spring
   * @param {number} spring - Spring factor
   * @param {number} friction - Spring friction
   * @return void
   */


  (0, _createClass2["default"])(Spring, [{
    key: "reset",
    value: function reset(x, y, z, spring, friction) {
      if (!this.pos) {
        this.pos = new _math.Vector3D(x, y, z);
      } else {
        this.pos.set(x, y, z);
      }

      this.spring = spring || 0.1;
      this.friction = friction || 0.98;
    }
    /**
     * Applies the behaviour to the particle.
     * Mutates the particle's velocity according to this.pos and this.spring.
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
      particle.velocity.x += (this.pos.x - particle.position.x) * this.spring;
      particle.velocity.y += (this.pos.y - particle.position.y) * this.spring;
      particle.velocity.z += (this.pos.z - particle.position.z) * this.spring;
    }
    /**
     * Returns a new instance of the behaviour from the JSON object passed.
     *
     * @param {object} json - JSON object containing the required constructor properties
     * @return {Spring}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var x = json.x,
          y = json.y,
          z = json.z,
          spring = json.spring,
          friction = json.friction,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Spring(x, y, z, spring, friction, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Spring;
}(_Behaviour2["default"]);

exports["default"] = Spring;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvU3ByaW5nLmpzIl0sIm5hbWVzIjpbIlNwcmluZyIsIngiLCJ5IiwieiIsInNwcmluZyIsImZyaWN0aW9uIiwibGlmZSIsImVhc2luZyIsImlzRW5hYmxlZCIsInR5cGUiLCJyZXNldCIsInBvcyIsIlZlY3RvcjNEIiwic2V0IiwicGFydGljbGUiLCJ0aW1lIiwiaW5kZXgiLCJlbmVyZ2l6ZSIsInZlbG9jaXR5IiwicG9zaXRpb24iLCJqc29uIiwiQmVoYXZpb3VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxNOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGtCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxNQUFyQixFQUE2QkMsUUFBN0IsRUFBdUNDLElBQXZDLEVBQTZDQyxNQUE3QyxFQUF1RTtBQUFBOztBQUFBLFFBQWxCQyxTQUFrQix1RUFBTixJQUFNO0FBQUE7QUFDckUsOEJBQU1GLElBQU4sRUFBWUMsTUFBWixFQUFvQkUsNEJBQXBCLEVBQTBCRCxTQUExQjs7QUFFQSxVQUFLRSxLQUFMLENBQVdULENBQVgsRUFBY0MsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLE1BQXBCLEVBQTRCQyxRQUE1Qjs7QUFIcUU7QUFJdEU7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7MEJBQ1FKLEMsRUFBR0MsQyxFQUFHQyxDLEVBQUdDLE0sRUFBUUMsUSxFQUFVO0FBQy9CLFVBQUksQ0FBQyxLQUFLTSxHQUFWLEVBQWU7QUFDYixhQUFLQSxHQUFMLEdBQVcsSUFBSUMsY0FBSixDQUFhWCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkIsQ0FBWDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtRLEdBQUwsQ0FBU0UsR0FBVCxDQUFhWixDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkMsQ0FBbkI7QUFDRDs7QUFFRCxXQUFLQyxNQUFMLEdBQWNBLE1BQU0sSUFBSSxHQUF4QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JBLFFBQVEsSUFBSSxJQUE1QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzJCQUNTUyxRLEVBQVVDLEksRUFBTUMsSyxFQUFPO0FBQzVCLFdBQUtDLFFBQUwsQ0FBY0gsUUFBZCxFQUF3QkMsSUFBeEIsRUFBOEJDLEtBQTlCO0FBRUFGLE1BQUFBLFFBQVEsQ0FBQ0ksUUFBVCxDQUFrQmpCLENBQWxCLElBQXVCLENBQUMsS0FBS1UsR0FBTCxDQUFTVixDQUFULEdBQWFhLFFBQVEsQ0FBQ0ssUUFBVCxDQUFrQmxCLENBQWhDLElBQXFDLEtBQUtHLE1BQWpFO0FBQ0FVLE1BQUFBLFFBQVEsQ0FBQ0ksUUFBVCxDQUFrQmhCLENBQWxCLElBQXVCLENBQUMsS0FBS1MsR0FBTCxDQUFTVCxDQUFULEdBQWFZLFFBQVEsQ0FBQ0ssUUFBVCxDQUFrQmpCLENBQWhDLElBQXFDLEtBQUtFLE1BQWpFO0FBQ0FVLE1BQUFBLFFBQVEsQ0FBQ0ksUUFBVCxDQUFrQmYsQ0FBbEIsSUFBdUIsQ0FBQyxLQUFLUSxHQUFMLENBQVNSLENBQVQsR0FBYVcsUUFBUSxDQUFDSyxRQUFULENBQWtCaEIsQ0FBaEMsSUFBcUMsS0FBS0MsTUFBakU7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDa0JnQixJLEVBQU07QUFBQSxVQUNabkIsQ0FEWSxHQUNrRG1CLElBRGxELENBQ1puQixDQURZO0FBQUEsVUFDVEMsQ0FEUyxHQUNrRGtCLElBRGxELENBQ1RsQixDQURTO0FBQUEsVUFDTkMsQ0FETSxHQUNrRGlCLElBRGxELENBQ05qQixDQURNO0FBQUEsVUFDSEMsTUFERyxHQUNrRGdCLElBRGxELENBQ0hoQixNQURHO0FBQUEsVUFDS0MsUUFETCxHQUNrRGUsSUFEbEQsQ0FDS2YsUUFETDtBQUFBLFVBQ2VDLElBRGYsR0FDa0RjLElBRGxELENBQ2VkLElBRGY7QUFBQSxVQUNxQkMsTUFEckIsR0FDa0RhLElBRGxELENBQ3FCYixNQURyQjtBQUFBLDRCQUNrRGEsSUFEbEQsQ0FDNkJaLFNBRDdCO0FBQUEsVUFDNkJBLFNBRDdCLGdDQUN5QyxJQUR6QztBQUdwQixhQUFPLElBQUlSLE1BQUosQ0FDTEMsQ0FESyxFQUVMQyxDQUZLLEVBR0xDLENBSEssRUFJTEMsTUFKSyxFQUtMQyxRQUxLLEVBTUxDLElBTkssRUFPTCwyQkFBZ0JDLE1BQWhCLENBUEssRUFRTEMsU0FSSyxDQUFQO0FBVUQ7OztFQTdFaUNhLHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJlaGF2aW91ciBmcm9tICcuL0JlaGF2aW91cic7XG5pbXBvcnQgeyBWZWN0b3IzRCB9IGZyb20gJy4uL21hdGgnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9TUFJJTkcgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEJlaGF2aW91ciB0aGF0IGNhdXNlcyBwYXJ0aWNsZXMgdG8gc3ByaW5nLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaW5nIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBTcHJpbmcgYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFggYXhpcyBzcHJpbmdcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGF4aXMgc3ByaW5nXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0gWiBheGlzIHNwcmluZ1xuICAgKiBAcGFyYW0ge251bWJlcn0gc3ByaW5nIC0gU3ByaW5nIGZhY3RvclxuICAgKiBAcGFyYW0ge251bWJlcn0gZnJpY3Rpb24gLSBTcHJpbmcgZnJpY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgYmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVhc2luZyAtIFRoZSBlYXNpbmcgZXF1YXRpb24gdG8gdXNlIGZvciB0cmFuc2Zvcm1zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoeCwgeSwgeiwgc3ByaW5nLCBmcmljdGlvbiwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nLCB0eXBlLCBpc0VuYWJsZWQpO1xuXG4gICAgdGhpcy5yZXNldCh4LCB5LCB6LCBzcHJpbmcsIGZyaWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGJlaGF2aW91ciBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFggYXhpcyBzcHJpbmdcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGF4aXMgc3ByaW5nXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0gWiBheGlzIHNwcmluZ1xuICAgKiBAcGFyYW0ge251bWJlcn0gc3ByaW5nIC0gU3ByaW5nIGZhY3RvclxuICAgKiBAcGFyYW0ge251bWJlcn0gZnJpY3Rpb24gLSBTcHJpbmcgZnJpY3Rpb25cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNldCh4LCB5LCB6LCBzcHJpbmcsIGZyaWN0aW9uKSB7XG4gICAgaWYgKCF0aGlzLnBvcykge1xuICAgICAgdGhpcy5wb3MgPSBuZXcgVmVjdG9yM0QoeCwgeSwgeik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9zLnNldCh4LCB5LCB6KTtcbiAgICB9XG5cbiAgICB0aGlzLnNwcmluZyA9IHNwcmluZyB8fCAwLjE7XG4gICAgdGhpcy5mcmljdGlvbiA9IGZyaWN0aW9uIHx8IDAuOTg7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgYmVoYXZpb3VyIHRvIHRoZSBwYXJ0aWNsZS5cbiAgICogTXV0YXRlcyB0aGUgcGFydGljbGUncyB2ZWxvY2l0eSBhY2NvcmRpbmcgdG8gdGhpcy5wb3MgYW5kIHRoaXMuc3ByaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGljbGUgLSB0aGUgcGFydGljbGUgdG8gYXBwbHkgdGhlIGJlaGF2aW91ciB0b1xuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIGVuZ2luZSB0aW1lXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5lbmVyZ2l6ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUudmVsb2NpdHkueCArPSAodGhpcy5wb3MueCAtIHBhcnRpY2xlLnBvc2l0aW9uLngpICogdGhpcy5zcHJpbmc7XG4gICAgcGFydGljbGUudmVsb2NpdHkueSArPSAodGhpcy5wb3MueSAtIHBhcnRpY2xlLnBvc2l0aW9uLnkpICogdGhpcy5zcHJpbmc7XG4gICAgcGFydGljbGUudmVsb2NpdHkueiArPSAodGhpcy5wb3MueiAtIHBhcnRpY2xlLnBvc2l0aW9uLnopICogdGhpcy5zcHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmVoYXZpb3VyIGZyb20gdGhlIEpTT04gb2JqZWN0IHBhc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBKU09OIG9iamVjdCBjb250YWluaW5nIHRoZSByZXF1aXJlZCBjb25zdHJ1Y3RvciBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm4ge1NwcmluZ31cbiAgICovXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyB4LCB5LCB6LCBzcHJpbmcsIGZyaWN0aW9uLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IFNwcmluZyhcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgeixcbiAgICAgIHNwcmluZyxcbiAgICAgIGZyaWN0aW9uLFxuICAgICAgbGlmZSxcbiAgICAgIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19