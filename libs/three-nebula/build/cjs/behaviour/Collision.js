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

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _math = require("../math");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Behaviour that causes particles to move away from other particles they collide with.
 */
var Collision = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Collision, _Behaviour);

  var _super = _createSuper(Collision);

  /**
   * Constructs a Collision behaviour instance.
   *
   * @param {Emitter} emitter - The emitter containing the particles to detect collisions against
   * @param {boolean} useMass - Determiens whether to use mass or not
   * @param {function} onCollide - Function to call when particles collide
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Collision(emitter, useMass, onCollide, life, easing) {
    var _this;

    var isEnabled = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    (0, _classCallCheck2["default"])(this, Collision);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_COLLISION, isEnabled);

    _this.reset(emitter, useMass, onCollide);

    return _this;
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Emitter} emitter - The emitter containing the particles to detect collisions against
   * @param {boolean} useMass - Determiens whether to use mass or not
   * @param {function} onCollide - Function to call when particles collide
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */


  (0, _createClass2["default"])(Collision, [{
    key: "reset",
    value: function reset(emitter, useMass, onCollide, life, easing) {
      this.emitter = emitter;
      this.useMass = useMass;
      this.onCollide = onCollide;
      this.particles = [];
      this.delta = new _math.Vector3D();
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(Collision.prototype), "reset", this).call(this, life, easing);
    }
    /**
     * Detects collisions with other particles and calls the
     * onCollide function on colliding particles.
     *
     * @param {Particle} particle - the particle to apply the behaviour to
     * @param {number} time - particle engine time
     * @param {integer} index - the particle index
     * @return void
     */

  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      var particles = this.emitter ? this.emitter.particles.slice(index) : this.particles.slice(index);
      var otherParticle, lengthSq, overlap, distance, averageMass1, averageMass2;
      var i = particles.length;

      while (i--) {
        otherParticle = particles[i];

        if (otherParticle == particle) {
          continue;
        }

        this.delta.copy(otherParticle.position).sub(particle.position);
        lengthSq = this.delta.lengthSq();
        distance = particle.radius + otherParticle.radius;

        if (lengthSq <= distance * distance) {
          overlap = distance - Math.sqrt(lengthSq);
          overlap += 0.5;
          averageMass1 = this._getAverageMass(particle, otherParticle);
          averageMass2 = this._getAverageMass(otherParticle, particle);
          particle.position.add(this.delta.clone().normalize().scalar(overlap * -averageMass1));
          otherParticle.position.add(this.delta.normalize().scalar(overlap * averageMass2));
          this.onCollide && this.onCollide(particle, otherParticle);
        }
      }
    }
    /**
     * Gets the average mass of both particles.
     *
     * @param {Particle} particleA - The first particle
     * @param {Particle} particleB - The second particle
     * @return {number}
     */

  }, {
    key: "_getAverageMass",
    value: function _getAverageMass(particleA, particleB) {
      return this.useMass ? particleB.mass / (particleA.mass + particleB.mass) : 0.5;
    } // TODO

  }, {
    key: "fromJSON",
    value: function fromJSON(json) {} // eslint-disable-line

  }]);
  return Collision;
}(_Behaviour2["default"]);

exports["default"] = Collision;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQ29sbGlzaW9uLmpzIl0sIm5hbWVzIjpbIkNvbGxpc2lvbiIsImVtaXR0ZXIiLCJ1c2VNYXNzIiwib25Db2xsaWRlIiwibGlmZSIsImVhc2luZyIsImlzRW5hYmxlZCIsInR5cGUiLCJyZXNldCIsInBhcnRpY2xlcyIsImRlbHRhIiwiVmVjdG9yM0QiLCJwYXJ0aWNsZSIsInRpbWUiLCJpbmRleCIsInNsaWNlIiwib3RoZXJQYXJ0aWNsZSIsImxlbmd0aFNxIiwib3ZlcmxhcCIsImRpc3RhbmNlIiwiYXZlcmFnZU1hc3MxIiwiYXZlcmFnZU1hc3MyIiwiaSIsImxlbmd0aCIsImNvcHkiLCJwb3NpdGlvbiIsInN1YiIsInJhZGl1cyIsIk1hdGgiLCJzcXJ0IiwiX2dldEF2ZXJhZ2VNYXNzIiwiYWRkIiwiY2xvbmUiLCJub3JtYWxpemUiLCJzY2FsYXIiLCJwYXJ0aWNsZUEiLCJwYXJ0aWNsZUIiLCJtYXNzIiwianNvbiIsIkJlaGF2aW91ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtJQUNxQkEsUzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixFQUE4QkMsU0FBOUIsRUFBeUNDLElBQXpDLEVBQStDQyxNQUEvQyxFQUF5RTtBQUFBOztBQUFBLFFBQWxCQyxTQUFrQix1RUFBTixJQUFNO0FBQUE7QUFDdkUsOEJBQU1GLElBQU4sRUFBWUMsTUFBWixFQUFvQkUsK0JBQXBCLEVBQTBCRCxTQUExQjs7QUFFQSxVQUFLRSxLQUFMLENBQVdQLE9BQVgsRUFBb0JDLE9BQXBCLEVBQTZCQyxTQUE3Qjs7QUFIdUU7QUFJeEU7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7MEJBQ1FGLE8sRUFBU0MsTyxFQUFTQyxTLEVBQVdDLEksRUFBTUMsTSxFQUFRO0FBQy9DLFdBQUtKLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFdBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFdBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsV0FBS00sU0FBTCxHQUFpQixFQUFqQjtBQUNBLFdBQUtDLEtBQUwsR0FBYSxJQUFJQyxjQUFKLEVBQWI7QUFFQVAsTUFBQUEsSUFBSSwyR0FBZ0JBLElBQWhCLEVBQXNCQyxNQUF0QixDQUFKO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7MkJBQ1NPLFEsRUFBVUMsSSxFQUFNQyxLLEVBQU87QUFDNUIsVUFBTUwsU0FBUyxHQUFHLEtBQUtSLE9BQUwsR0FDZCxLQUFLQSxPQUFMLENBQWFRLFNBQWIsQ0FBdUJNLEtBQXZCLENBQTZCRCxLQUE3QixDQURjLEdBRWQsS0FBS0wsU0FBTCxDQUFlTSxLQUFmLENBQXFCRCxLQUFyQixDQUZKO0FBSUEsVUFBSUUsYUFBSixFQUFtQkMsUUFBbkIsRUFBNkJDLE9BQTdCLEVBQXNDQyxRQUF0QyxFQUFnREMsWUFBaEQsRUFBOERDLFlBQTlEO0FBRUEsVUFBSUMsQ0FBQyxHQUFHYixTQUFTLENBQUNjLE1BQWxCOztBQUVBLGFBQU9ELENBQUMsRUFBUixFQUFZO0FBQ1ZOLFFBQUFBLGFBQWEsR0FBR1AsU0FBUyxDQUFDYSxDQUFELENBQXpCOztBQUVBLFlBQUlOLGFBQWEsSUFBSUosUUFBckIsRUFBK0I7QUFDN0I7QUFDRDs7QUFFRCxhQUFLRixLQUFMLENBQVdjLElBQVgsQ0FBZ0JSLGFBQWEsQ0FBQ1MsUUFBOUIsRUFBd0NDLEdBQXhDLENBQTRDZCxRQUFRLENBQUNhLFFBQXJEO0FBRUFSLFFBQUFBLFFBQVEsR0FBRyxLQUFLUCxLQUFMLENBQVdPLFFBQVgsRUFBWDtBQUNBRSxRQUFBQSxRQUFRLEdBQUdQLFFBQVEsQ0FBQ2UsTUFBVCxHQUFrQlgsYUFBYSxDQUFDVyxNQUEzQzs7QUFFQSxZQUFJVixRQUFRLElBQUlFLFFBQVEsR0FBR0EsUUFBM0IsRUFBcUM7QUFDbkNELFVBQUFBLE9BQU8sR0FBR0MsUUFBUSxHQUFHUyxJQUFJLENBQUNDLElBQUwsQ0FBVVosUUFBVixDQUFyQjtBQUNBQyxVQUFBQSxPQUFPLElBQUksR0FBWDtBQUVBRSxVQUFBQSxZQUFZLEdBQUcsS0FBS1UsZUFBTCxDQUFxQmxCLFFBQXJCLEVBQStCSSxhQUEvQixDQUFmO0FBQ0FLLFVBQUFBLFlBQVksR0FBRyxLQUFLUyxlQUFMLENBQXFCZCxhQUFyQixFQUFvQ0osUUFBcEMsQ0FBZjtBQUVBQSxVQUFBQSxRQUFRLENBQUNhLFFBQVQsQ0FBa0JNLEdBQWxCLENBQ0UsS0FBS3JCLEtBQUwsQ0FDR3NCLEtBREgsR0FFR0MsU0FGSCxHQUdHQyxNQUhILENBR1VoQixPQUFPLEdBQUcsQ0FBQ0UsWUFIckIsQ0FERjtBQU9BSixVQUFBQSxhQUFhLENBQUNTLFFBQWQsQ0FBdUJNLEdBQXZCLENBQ0UsS0FBS3JCLEtBQUwsQ0FBV3VCLFNBQVgsR0FBdUJDLE1BQXZCLENBQThCaEIsT0FBTyxHQUFHRyxZQUF4QyxDQURGO0FBSUEsZUFBS2xCLFNBQUwsSUFBa0IsS0FBS0EsU0FBTCxDQUFlUyxRQUFmLEVBQXlCSSxhQUF6QixDQUFsQjtBQUNEO0FBQ0Y7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O29DQUNrQm1CLFMsRUFBV0MsUyxFQUFXO0FBQ3BDLGFBQU8sS0FBS2xDLE9BQUwsR0FDSGtDLFNBQVMsQ0FBQ0MsSUFBVixJQUFrQkYsU0FBUyxDQUFDRSxJQUFWLEdBQWlCRCxTQUFTLENBQUNDLElBQTdDLENBREcsR0FFSCxHQUZKO0FBR0QsSyxDQUVEOzs7OzZCQUNTQyxJLEVBQU0sQ0FBRSxDLENBQUM7Ozs7RUF6R21CQyxzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgVmVjdG9yM0QgfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX0NPTExJU0lPTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQmVoYXZpb3VyIHRoYXQgY2F1c2VzIHBhcnRpY2xlcyB0byBtb3ZlIGF3YXkgZnJvbSBvdGhlciBwYXJ0aWNsZXMgdGhleSBjb2xsaWRlIHdpdGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbiBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgQ29sbGlzaW9uIGJlaGF2aW91ciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyIC0gVGhlIGVtaXR0ZXIgY29udGFpbmluZyB0aGUgcGFydGljbGVzIHRvIGRldGVjdCBjb2xsaXNpb25zIGFnYWluc3RcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VNYXNzIC0gRGV0ZXJtaWVucyB3aGV0aGVyIHRvIHVzZSBtYXNzIG9yIG5vdFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbkNvbGxpZGUgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gcGFydGljbGVzIGNvbGxpZGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgdXNlTWFzcywgb25Db2xsaWRlLCBsaWZlLCBlYXNpbmcsIGlzRW5hYmxlZCA9IHRydWUpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICB0aGlzLnJlc2V0KGVtaXR0ZXIsIHVzZU1hc3MsIG9uQ29sbGlkZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyIC0gVGhlIGVtaXR0ZXIgY29udGFpbmluZyB0aGUgcGFydGljbGVzIHRvIGRldGVjdCBjb2xsaXNpb25zIGFnYWluc3RcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VNYXNzIC0gRGV0ZXJtaWVucyB3aGV0aGVyIHRvIHVzZSBtYXNzIG9yIG5vdFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbkNvbGxpZGUgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gcGFydGljbGVzIGNvbGxpZGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVzZXQoZW1pdHRlciwgdXNlTWFzcywgb25Db2xsaWRlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBlbWl0dGVyO1xuICAgIHRoaXMudXNlTWFzcyA9IHVzZU1hc3M7XG4gICAgdGhpcy5vbkNvbGxpZGUgPSBvbkNvbGxpZGU7XG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcbiAgICB0aGlzLmRlbHRhID0gbmV3IFZlY3RvcjNEKCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0cyBjb2xsaXNpb25zIHdpdGggb3RoZXIgcGFydGljbGVzIGFuZCBjYWxscyB0aGVcbiAgICogb25Db2xsaWRlIGZ1bmN0aW9uIG9uIGNvbGxpZGluZyBwYXJ0aWNsZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gdGhlIHBhcnRpY2xlIHRvIGFwcGx5IHRoZSBiZWhhdmlvdXIgdG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBwYXJ0aWNsZSBlbmdpbmUgdGltZVxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgbXV0YXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IHBhcnRpY2xlcyA9IHRoaXMuZW1pdHRlclxuICAgICAgPyB0aGlzLmVtaXR0ZXIucGFydGljbGVzLnNsaWNlKGluZGV4KVxuICAgICAgOiB0aGlzLnBhcnRpY2xlcy5zbGljZShpbmRleCk7XG5cbiAgICBsZXQgb3RoZXJQYXJ0aWNsZSwgbGVuZ3RoU3EsIG92ZXJsYXAsIGRpc3RhbmNlLCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcblxuICAgIGxldCBpID0gcGFydGljbGVzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIG90aGVyUGFydGljbGUgPSBwYXJ0aWNsZXNbaV07XG5cbiAgICAgIGlmIChvdGhlclBhcnRpY2xlID09IHBhcnRpY2xlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRlbHRhLmNvcHkob3RoZXJQYXJ0aWNsZS5wb3NpdGlvbikuc3ViKHBhcnRpY2xlLnBvc2l0aW9uKTtcblxuICAgICAgbGVuZ3RoU3EgPSB0aGlzLmRlbHRhLmxlbmd0aFNxKCk7XG4gICAgICBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICBpZiAobGVuZ3RoU3EgPD0gZGlzdGFuY2UgKiBkaXN0YW5jZSkge1xuICAgICAgICBvdmVybGFwID0gZGlzdGFuY2UgLSBNYXRoLnNxcnQobGVuZ3RoU3EpO1xuICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICBhdmVyYWdlTWFzczEgPSB0aGlzLl9nZXRBdmVyYWdlTWFzcyhwYXJ0aWNsZSwgb3RoZXJQYXJ0aWNsZSk7XG4gICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMuX2dldEF2ZXJhZ2VNYXNzKG90aGVyUGFydGljbGUsIHBhcnRpY2xlKTtcblxuICAgICAgICBwYXJ0aWNsZS5wb3NpdGlvbi5hZGQoXG4gICAgICAgICAgdGhpcy5kZWx0YVxuICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgICAgLnNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgKTtcblxuICAgICAgICBvdGhlclBhcnRpY2xlLnBvc2l0aW9uLmFkZChcbiAgICAgICAgICB0aGlzLmRlbHRhLm5vcm1hbGl6ZSgpLnNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMub25Db2xsaWRlICYmIHRoaXMub25Db2xsaWRlKHBhcnRpY2xlLCBvdGhlclBhcnRpY2xlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYXZlcmFnZSBtYXNzIG9mIGJvdGggcGFydGljbGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZUEgLSBUaGUgZmlyc3QgcGFydGljbGVcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGVCIC0gVGhlIHNlY29uZCBwYXJ0aWNsZVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBfZ2V0QXZlcmFnZU1hc3MocGFydGljbGVBLCBwYXJ0aWNsZUIpIHtcbiAgICByZXR1cm4gdGhpcy51c2VNYXNzXG4gICAgICA/IHBhcnRpY2xlQi5tYXNzIC8gKHBhcnRpY2xlQS5tYXNzICsgcGFydGljbGVCLm1hc3MpXG4gICAgICA6IDAuNTtcbiAgfVxuXG4gIC8vIFRPRE9cbiAgZnJvbUpTT04oanNvbikge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxufVxuIl19