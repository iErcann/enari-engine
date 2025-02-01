"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _common = require("../common");

var _shaders = require("./shaders");

var _BaseRenderer2 = _interopRequireDefault(require("../../BaseRenderer"));

var _constants = require("../common/constants");

var _core = require("../../../core");

var _types = require("../../types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var THREE;
/**
 * GPURenderer for devices that support floating point textures.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 */

var DesktopGPURenderer = /*#__PURE__*/function (_BaseRenderer) {
  (0, _inherits2["default"])(DesktopGPURenderer, _BaseRenderer);

  var _super = _createSuper(DesktopGPURenderer);

  function DesktopGPURenderer(container, three) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_RENDERER_OPTIONS;
    (0, _classCallCheck2["default"])(this, DesktopGPURenderer);
    _this = _super.call(this, _types.RENDERER_TYPE_GPU_DESKTOP);
    THREE = _this.three = three;

    var props = _objectSpread(_objectSpread({}, _constants.DEFAULT_RENDERER_OPTIONS), options);

    var camera = props.camera,
        maxParticles = props.maxParticles,
        baseColor = props.baseColor,
        blending = props.blending,
        depthTest = props.depthTest,
        depthWrite = props.depthWrite,
        transparent = props.transparent,
        shouldDebugTextureAtlas = props.shouldDebugTextureAtlas;
    var particleBuffer = new _common.ParticleBuffer(maxParticles, THREE);
    var material = new THREE.ShaderMaterial({
      uniforms: {
        baseColor: {
          value: new THREE.Color(baseColor)
        },
        uTexture: {
          value: null
        },
        atlasIndex: {
          value: null
        }
      },
      vertexShader: (0, _shaders.vertexShader)(),
      fragmentShader: (0, _shaders.fragmentShader)(),
      blending: THREE[blending],
      depthTest: depthTest,
      depthWrite: depthWrite,
      transparent: transparent
    });
    _this.container = container;
    _this.camera = camera;
    _this.targetPool = new _core.Pool();
    _this.uniqueList = new _common.UniqueList(maxParticles);
    _this.particleBuffer = particleBuffer;
    _this.buffer = particleBuffer.buffer;
    _this.stride = particleBuffer.stride;
    _this.geometry = particleBuffer.geometry;
    _this.material = material;
    _this.points = new THREE.Points(_this.geometry, _this.material);
    _this.points.frustumCulled = false;
    _this.shouldDebugTextureAtlas = shouldDebugTextureAtlas;

    _this.container.add(_this.points);

    return _this;
  }

  (0, _createClass2["default"])(DesktopGPURenderer, [{
    key: "onSystemUpdate",
    value: function onSystemUpdate(system) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(DesktopGPURenderer.prototype), "onSystemUpdate", this).call(this, system);
      this.buffer.needsUpdate = true;
      this.textureAtlas && this.textureAtlas.update();
    }
    /**
     * Pools the particle target if it does not exist.
     * Updates the target and maps particle properties to the point.
     *
     * @param {Particle}
     */

  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      if (!particle.target) {
        particle.target = this.targetPool.get(_common.Target, THREE);
        this.uniqueList.add(particle.id);
      }

      this.updateTarget(particle).mapParticleTargetPropsToPoint(particle);
    }
    /**
     * Maps particle properties to the point if the particle has a target.
     *
     * @param {Particle}
     */

  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      if (!particle.target) {
        return;
      }

      this.updateTarget(particle).mapParticleTargetPropsToPoint(particle);
    }
    /**
     * Resets and clears the particle target.
     *
     * @param {Particle}
     */

  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {
      if (!particle.target) {
        return;
      }

      particle.target.reset();
      this.mapParticleTargetPropsToPoint(particle);
      particle.target = null;
    }
    /**
     * Maps all mutable properties from the particle to the target.
     *
     * @param {Particle}
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "updateTarget",
    value: function updateTarget(particle) {
      var position = particle.position,
          scale = particle.scale,
          radius = particle.radius,
          color = particle.color,
          alpha = particle.alpha,
          body = particle.body,
          id = particle.id;
      var r = color.r,
          g = color.g,
          b = color.b;
      particle.target.position.copy(position);
      particle.target.size = scale * radius;
      particle.target.color.setRGB(r, g, b);
      particle.target.alpha = alpha;
      particle.target.index = this.uniqueList.find(id);

      if (body && body instanceof THREE.Sprite) {
        var map = body.material.map;
        particle.target.texture = map;
        particle.target.textureIndex = this.getTextureID(map, this.shouldDebugTextureAtlas);
      }

      return this;
    }
    /**
     * Entry point for mapping particle properties to buffer geometry points.
     *
     * @param {Particle} particle - The particle containing the properties to map
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "mapParticleTargetPropsToPoint",
    value: function mapParticleTargetPropsToPoint(particle) {
      this.updatePointPosition(particle).updatePointSize(particle).updatePointColor(particle).updatePointAlpha(particle).updatePointTextureIndex(particle);
      return this;
    }
    /**
     * Updates the point's position according to the particle's target position.
     *
     * @param {Particle} particle - The particle containing the target position.
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "updatePointPosition",
    value: function updatePointPosition(particle) {
      var attribute = 'position';
      var geometry = this.geometry,
          stride = this.stride,
          buffer = this.buffer;
      var target = particle.target;
      var offset = geometry.attributes[attribute].offset;
      buffer.array[target.index * stride + offset + 0] = target.position.x;
      buffer.array[target.index * stride + offset + 1] = target.position.y;
      buffer.array[target.index * stride + offset + 2] = target.position.z;
      return this;
    }
    /**
     * Updates the point's size relative to the particle's target scale and radius.
     *
     * @param {Particle} particle - The particle containing the target scale.
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "updatePointSize",
    value: function updatePointSize(particle) {
      var attribute = 'size';
      var geometry = this.geometry,
          stride = this.stride,
          buffer = this.buffer;
      var target = particle.target;
      var offset = geometry.attributes[attribute].offset;
      buffer.array[target.index * stride + offset + 0] = target.size;
      return this;
    }
    /**
     * Updates the point's color attribute according with the particle's target color.
     *
     * @param {Particle} particle - The particle containing the target color and alpha.
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "updatePointColor",
    value: function updatePointColor(particle) {
      var attribute = 'color';
      var geometry = this.geometry,
          stride = this.stride,
          buffer = this.buffer;
      var target = particle.target;
      var offset = geometry.attributes[attribute].offset;
      buffer.array[target.index * stride + offset + 0] = target.color.r;
      buffer.array[target.index * stride + offset + 1] = target.color.g;
      buffer.array[target.index * stride + offset + 2] = target.color.b;
      return this;
    }
    /**
     * Updates the point alpha attribute with the particle's target alpha.
     *
     * @param {Particle} particle - The particle containing the target alpha.
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "updatePointAlpha",
    value: function updatePointAlpha(particle) {
      var attribute = 'alpha';
      var geometry = this.geometry,
          stride = this.stride,
          buffer = this.buffer;
      var target = particle.target;
      var offset = geometry.attributes[attribute].offset;
      buffer.array[target.index * stride + offset + 0] = target.alpha;
      return this;
    }
    /**
     * Updates the point texture attribute with the particle's target texture.
     *
     * @param {Particle} particle - The particle containing the target texture.
     * @return {DesktopGPURenderer}
     */

  }, {
    key: "updatePointTextureIndex",
    value: function updatePointTextureIndex(particle) {
      var attribute = 'texID';
      var geometry = this.geometry,
          stride = this.stride,
          buffer = this.buffer;
      var target = particle.target;
      var offset = geometry.attributes[attribute].offset;
      buffer.array[target.index * stride + offset + 0] = target.textureIndex;
      return this;
    }
  }, {
    key: "getTextureID",
    value: function getTextureID(texture, debug) {
      if (texture.textureIndex === undefined) {
        if (!this.textureAtlas) {
          this.textureAtlas = new _common.TextureAtlas(this, debug);
        }

        this.textureAtlas.addTexture(texture);
      }

      return texture.textureIndex;
    }
    /**
     * Tears down the GPURenderer.
     *
     * @return void
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var container = this.container,
          points = this.points,
          textureAtlas = this.textureAtlas,
          uniqueList = this.uniqueList;
      container.remove(points);
      uniqueList.destroy();
      textureAtlas && textureAtlas.destroy();
    }
  }]);
  return DesktopGPURenderer;
}(_BaseRenderer2["default"]);

exports["default"] = DesktopGPURenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRIUkVFIiwiRGVza3RvcEdQVVJlbmRlcmVyIiwiY29udGFpbmVyIiwidGhyZWUiLCJvcHRpb25zIiwiREVGQVVMVF9SRU5ERVJFUl9PUFRJT05TIiwiUkVOREVSRVJfVFlQRV9HUFVfREVTS1RPUCIsInByb3BzIiwiY2FtZXJhIiwibWF4UGFydGljbGVzIiwiYmFzZUNvbG9yIiwiYmxlbmRpbmciLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwidHJhbnNwYXJlbnQiLCJzaG91bGREZWJ1Z1RleHR1cmVBdGxhcyIsInBhcnRpY2xlQnVmZmVyIiwiUGFydGljbGVCdWZmZXIiLCJtYXRlcmlhbCIsIlNoYWRlck1hdGVyaWFsIiwidW5pZm9ybXMiLCJ2YWx1ZSIsIkNvbG9yIiwidVRleHR1cmUiLCJhdGxhc0luZGV4IiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJ0YXJnZXRQb29sIiwiUG9vbCIsInVuaXF1ZUxpc3QiLCJVbmlxdWVMaXN0IiwiYnVmZmVyIiwic3RyaWRlIiwiZ2VvbWV0cnkiLCJwb2ludHMiLCJQb2ludHMiLCJmcnVzdHVtQ3VsbGVkIiwiYWRkIiwic3lzdGVtIiwibmVlZHNVcGRhdGUiLCJ0ZXh0dXJlQXRsYXMiLCJ1cGRhdGUiLCJwYXJ0aWNsZSIsInRhcmdldCIsImdldCIsIlRhcmdldCIsImlkIiwidXBkYXRlVGFyZ2V0IiwibWFwUGFydGljbGVUYXJnZXRQcm9wc1RvUG9pbnQiLCJyZXNldCIsInBvc2l0aW9uIiwic2NhbGUiLCJyYWRpdXMiLCJjb2xvciIsImFscGhhIiwiYm9keSIsInIiLCJnIiwiYiIsImNvcHkiLCJzaXplIiwic2V0UkdCIiwiaW5kZXgiLCJmaW5kIiwiU3ByaXRlIiwibWFwIiwidGV4dHVyZSIsInRleHR1cmVJbmRleCIsImdldFRleHR1cmVJRCIsInVwZGF0ZVBvaW50UG9zaXRpb24iLCJ1cGRhdGVQb2ludFNpemUiLCJ1cGRhdGVQb2ludENvbG9yIiwidXBkYXRlUG9pbnRBbHBoYSIsInVwZGF0ZVBvaW50VGV4dHVyZUluZGV4IiwiYXR0cmlidXRlIiwib2Zmc2V0IiwiYXR0cmlidXRlcyIsImFycmF5IiwieCIsInkiLCJ6IiwiZGVidWciLCJ1bmRlZmluZWQiLCJUZXh0dXJlQXRsYXMiLCJhZGRUZXh0dXJlIiwicmVtb3ZlIiwiZGVzdHJveSIsIkJhc2VSZW5kZXJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUlBLEtBQUo7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ3FCQyxrQjs7Ozs7QUFDbkIsOEJBQVlDLFNBQVosRUFBdUJDLEtBQXZCLEVBQWtFO0FBQUE7O0FBQUEsUUFBcENDLE9BQW9DLHVFQUExQkMsbUNBQTBCO0FBQUE7QUFDaEUsOEJBQU1DLGdDQUFOO0FBRUFOLElBQUFBLEtBQUssR0FBRyxNQUFLRyxLQUFMLEdBQWFBLEtBQXJCOztBQUNBLFFBQU1JLEtBQUssbUNBQVFGLG1DQUFSLEdBQXFDRCxPQUFyQyxDQUFYOztBQUpnRSxRQU05REksTUFOOEQsR0FjNURELEtBZDRELENBTTlEQyxNQU44RDtBQUFBLFFBTzlEQyxZQVA4RCxHQWM1REYsS0FkNEQsQ0FPOURFLFlBUDhEO0FBQUEsUUFROURDLFNBUjhELEdBYzVESCxLQWQ0RCxDQVE5REcsU0FSOEQ7QUFBQSxRQVM5REMsUUFUOEQsR0FjNURKLEtBZDRELENBUzlESSxRQVQ4RDtBQUFBLFFBVTlEQyxTQVY4RCxHQWM1REwsS0FkNEQsQ0FVOURLLFNBVjhEO0FBQUEsUUFXOURDLFVBWDhELEdBYzVETixLQWQ0RCxDQVc5RE0sVUFYOEQ7QUFBQSxRQVk5REMsV0FaOEQsR0FjNURQLEtBZDRELENBWTlETyxXQVo4RDtBQUFBLFFBYTlEQyx1QkFiOEQsR0FjNURSLEtBZDRE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O0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs4QkFDWTtBQUFBLFVBQ0FqRSxTQURBLEdBQ2dELElBRGhELENBQ0FBLFNBREE7QUFBQSxVQUNXZ0MsTUFEWCxHQUNnRCxJQURoRCxDQUNXQSxNQURYO0FBQUEsVUFDbUJNLFlBRG5CLEdBQ2dELElBRGhELENBQ21CQSxZQURuQjtBQUFBLFVBQ2lDWCxVQURqQyxHQUNnRCxJQURoRCxDQUNpQ0EsVUFEakM7QUFHUjNCLE1BQUFBLFNBQVMsQ0FBQ21GLE1BQVYsQ0FBaUJuRCxNQUFqQjtBQUNBTCxNQUFBQSxVQUFVLENBQUN5RCxPQUFYO0FBQ0E5QyxNQUFBQSxZQUFZLElBQUlBLFlBQVksQ0FBQzhDLE9BQWIsRUFBaEI7QUFDRDs7O0VBaFE2Q0MseUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJ0aWNsZUJ1ZmZlciwgVGFyZ2V0LCBUZXh0dXJlQXRsYXMsIFVuaXF1ZUxpc3QgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgZnJhZ21lbnRTaGFkZXIsIHZlcnRleFNoYWRlciB9IGZyb20gJy4vc2hhZGVycyc7XG5cbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSAnLi4vLi4vQmFzZVJlbmRlcmVyJztcbmltcG9ydCB7IERFRkFVTFRfUkVOREVSRVJfT1BUSU9OUyB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUG9vbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuaW1wb3J0IHsgUkVOREVSRVJfVFlQRV9HUFVfREVTS1RPUCB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxubGV0IFRIUkVFO1xuXG4vKipcbiAqIEdQVVJlbmRlcmVyIGZvciBkZXZpY2VzIHRoYXQgc3VwcG9ydCBmbG9hdGluZyBwb2ludCB0ZXh0dXJlcy5cbiAqXG4gKiBAYXV0aG9yIHRocmF4IDxtYW50aHJheEBnbWFpbC5jb20+XG4gKiBAYXV0aG9yIHJvaGFuLWRlc2hwYW5kZSA8cm9oYW5AY3JlYXRpdmVsaWZlZm9ybS5jb20+XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlc2t0b3BHUFVSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgdGhyZWUsIG9wdGlvbnMgPSBERUZBVUxUX1JFTkRFUkVSX09QVElPTlMpIHtcbiAgICBzdXBlcihSRU5ERVJFUl9UWVBFX0dQVV9ERVNLVE9QKTtcblxuICAgIFRIUkVFID0gdGhpcy50aHJlZSA9IHRocmVlO1xuICAgIGNvbnN0IHByb3BzID0geyAuLi5ERUZBVUxUX1JFTkRFUkVSX09QVElPTlMsIC4uLm9wdGlvbnMgfTtcbiAgICBjb25zdCB7XG4gICAgICBjYW1lcmEsXG4gICAgICBtYXhQYXJ0aWNsZXMsXG4gICAgICBiYXNlQ29sb3IsXG4gICAgICBibGVuZGluZyxcbiAgICAgIGRlcHRoVGVzdCxcbiAgICAgIGRlcHRoV3JpdGUsXG4gICAgICB0cmFuc3BhcmVudCxcbiAgICAgIHNob3VsZERlYnVnVGV4dHVyZUF0bGFzLFxuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCBwYXJ0aWNsZUJ1ZmZlciA9IG5ldyBQYXJ0aWNsZUJ1ZmZlcihtYXhQYXJ0aWNsZXMsIFRIUkVFKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICBiYXNlQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcihiYXNlQ29sb3IpIH0sXG4gICAgICAgIHVUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIGF0bGFzSW5kZXg6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhTaGFkZXI6IHZlcnRleFNoYWRlcigpLFxuICAgICAgZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50U2hhZGVyKCksXG4gICAgICBibGVuZGluZzogVEhSRUVbYmxlbmRpbmddLFxuICAgICAgZGVwdGhUZXN0LFxuICAgICAgZGVwdGhXcml0ZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgIH0pO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy50YXJnZXRQb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLnVuaXF1ZUxpc3QgPSBuZXcgVW5pcXVlTGlzdChtYXhQYXJ0aWNsZXMpO1xuICAgIHRoaXMucGFydGljbGVCdWZmZXIgPSBwYXJ0aWNsZUJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlciA9IHBhcnRpY2xlQnVmZmVyLmJ1ZmZlcjtcbiAgICB0aGlzLnN0cmlkZSA9IHBhcnRpY2xlQnVmZmVyLnN0cmlkZTtcbiAgICB0aGlzLmdlb21ldHJ5ID0gcGFydGljbGVCdWZmZXIuZ2VvbWV0cnk7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMucG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcbiAgICB0aGlzLnBvaW50cy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5zaG91bGREZWJ1Z1RleHR1cmVBdGxhcyA9IHNob3VsZERlYnVnVGV4dHVyZUF0bGFzO1xuXG4gICAgdGhpcy5jb250YWluZXIuYWRkKHRoaXMucG9pbnRzKTtcbiAgfVxuXG4gIG9uU3lzdGVtVXBkYXRlKHN5c3RlbSkge1xuICAgIHN1cGVyLm9uU3lzdGVtVXBkYXRlKHN5c3RlbSk7XG5cbiAgICB0aGlzLmJ1ZmZlci5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICB0aGlzLnRleHR1cmVBdGxhcyAmJiB0aGlzLnRleHR1cmVBdGxhcy51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb29scyB0aGUgcGFydGljbGUgdGFyZ2V0IGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICAgKiBVcGRhdGVzIHRoZSB0YXJnZXQgYW5kIG1hcHMgcGFydGljbGUgcHJvcGVydGllcyB0byB0aGUgcG9pbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9XG4gICAqL1xuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmICghcGFydGljbGUudGFyZ2V0KSB7XG4gICAgICBwYXJ0aWNsZS50YXJnZXQgPSB0aGlzLnRhcmdldFBvb2wuZ2V0KFRhcmdldCwgVEhSRUUpO1xuICAgICAgdGhpcy51bmlxdWVMaXN0LmFkZChwYXJ0aWNsZS5pZCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVUYXJnZXQocGFydGljbGUpLm1hcFBhcnRpY2xlVGFyZ2V0UHJvcHNUb1BvaW50KHBhcnRpY2xlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXBzIHBhcnRpY2xlIHByb3BlcnRpZXMgdG8gdGhlIHBvaW50IGlmIHRoZSBwYXJ0aWNsZSBoYXMgYSB0YXJnZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9XG4gICAqL1xuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS50YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVRhcmdldChwYXJ0aWNsZSkubWFwUGFydGljbGVUYXJnZXRQcm9wc1RvUG9pbnQocGFydGljbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBhbmQgY2xlYXJzIHRoZSBwYXJ0aWNsZSB0YXJnZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9XG4gICAqL1xuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmICghcGFydGljbGUudGFyZ2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGFydGljbGUudGFyZ2V0LnJlc2V0KCk7XG4gICAgdGhpcy5tYXBQYXJ0aWNsZVRhcmdldFByb3BzVG9Qb2ludChwYXJ0aWNsZSk7XG5cbiAgICBwYXJ0aWNsZS50YXJnZXQgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcHMgYWxsIG11dGFibGUgcHJvcGVydGllcyBmcm9tIHRoZSBwYXJ0aWNsZSB0byB0aGUgdGFyZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfVxuICAgKiBAcmV0dXJuIHtEZXNrdG9wR1BVUmVuZGVyZXJ9XG4gICAqL1xuICB1cGRhdGVUYXJnZXQocGFydGljbGUpIHtcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBzY2FsZSwgcmFkaXVzLCBjb2xvciwgYWxwaGEsIGJvZHksIGlkIH0gPSBwYXJ0aWNsZTtcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IGNvbG9yO1xuXG4gICAgcGFydGljbGUudGFyZ2V0LnBvc2l0aW9uLmNvcHkocG9zaXRpb24pO1xuICAgIHBhcnRpY2xlLnRhcmdldC5zaXplID0gc2NhbGUgKiByYWRpdXM7XG4gICAgcGFydGljbGUudGFyZ2V0LmNvbG9yLnNldFJHQihyLCBnLCBiKTtcbiAgICBwYXJ0aWNsZS50YXJnZXQuYWxwaGEgPSBhbHBoYTtcbiAgICBwYXJ0aWNsZS50YXJnZXQuaW5kZXggPSB0aGlzLnVuaXF1ZUxpc3QuZmluZChpZCk7XG5cbiAgICBpZiAoYm9keSAmJiBib2R5IGluc3RhbmNlb2YgVEhSRUUuU3ByaXRlKSB7XG4gICAgICBjb25zdCB7IG1hcCB9ID0gYm9keS5tYXRlcmlhbDtcblxuICAgICAgcGFydGljbGUudGFyZ2V0LnRleHR1cmUgPSBtYXA7XG4gICAgICBwYXJ0aWNsZS50YXJnZXQudGV4dHVyZUluZGV4ID0gdGhpcy5nZXRUZXh0dXJlSUQoXG4gICAgICAgIG1hcCxcbiAgICAgICAgdGhpcy5zaG91bGREZWJ1Z1RleHR1cmVBdGxhc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnRyeSBwb2ludCBmb3IgbWFwcGluZyBwYXJ0aWNsZSBwcm9wZXJ0aWVzIHRvIGJ1ZmZlciBnZW9tZXRyeSBwb2ludHMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIGNvbnRhaW5pbmcgdGhlIHByb3BlcnRpZXMgdG8gbWFwXG4gICAqIEByZXR1cm4ge0Rlc2t0b3BHUFVSZW5kZXJlcn1cbiAgICovXG4gIG1hcFBhcnRpY2xlVGFyZ2V0UHJvcHNUb1BvaW50KHBhcnRpY2xlKSB7XG4gICAgdGhpcy51cGRhdGVQb2ludFBvc2l0aW9uKHBhcnRpY2xlKVxuICAgICAgLnVwZGF0ZVBvaW50U2l6ZShwYXJ0aWNsZSlcbiAgICAgIC51cGRhdGVQb2ludENvbG9yKHBhcnRpY2xlKVxuICAgICAgLnVwZGF0ZVBvaW50QWxwaGEocGFydGljbGUpXG4gICAgICAudXBkYXRlUG9pbnRUZXh0dXJlSW5kZXgocGFydGljbGUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcG9pbnQncyBwb3NpdGlvbiBhY2NvcmRpbmcgdG8gdGhlIHBhcnRpY2xlJ3MgdGFyZ2V0IHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSBjb250YWluaW5nIHRoZSB0YXJnZXQgcG9zaXRpb24uXG4gICAqIEByZXR1cm4ge0Rlc2t0b3BHUFVSZW5kZXJlcn1cbiAgICovXG4gIHVwZGF0ZVBvaW50UG9zaXRpb24ocGFydGljbGUpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSAncG9zaXRpb24nO1xuICAgIGNvbnN0IHsgZ2VvbWV0cnksIHN0cmlkZSwgYnVmZmVyIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBwYXJ0aWNsZTtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gZ2VvbWV0cnkuYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuXG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDBdID0gdGFyZ2V0LnBvc2l0aW9uLng7XG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDFdID0gdGFyZ2V0LnBvc2l0aW9uLnk7XG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDJdID0gdGFyZ2V0LnBvc2l0aW9uLno7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb2ludCdzIHNpemUgcmVsYXRpdmUgdG8gdGhlIHBhcnRpY2xlJ3MgdGFyZ2V0IHNjYWxlIGFuZCByYWRpdXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIGNvbnRhaW5pbmcgdGhlIHRhcmdldCBzY2FsZS5cbiAgICogQHJldHVybiB7RGVza3RvcEdQVVJlbmRlcmVyfVxuICAgKi9cbiAgdXBkYXRlUG9pbnRTaXplKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gJ3NpemUnO1xuICAgIGNvbnN0IHsgZ2VvbWV0cnksIHN0cmlkZSwgYnVmZmVyIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBwYXJ0aWNsZTtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gZ2VvbWV0cnkuYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuXG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDBdID0gdGFyZ2V0LnNpemU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb2ludCdzIGNvbG9yIGF0dHJpYnV0ZSBhY2NvcmRpbmcgd2l0aCB0aGUgcGFydGljbGUncyB0YXJnZXQgY29sb3IuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIGNvbnRhaW5pbmcgdGhlIHRhcmdldCBjb2xvciBhbmQgYWxwaGEuXG4gICAqIEByZXR1cm4ge0Rlc2t0b3BHUFVSZW5kZXJlcn1cbiAgICovXG4gIHVwZGF0ZVBvaW50Q29sb3IocGFydGljbGUpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSAnY29sb3InO1xuICAgIGNvbnN0IHsgZ2VvbWV0cnksIHN0cmlkZSwgYnVmZmVyIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBwYXJ0aWNsZTtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gZ2VvbWV0cnkuYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuXG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDBdID0gdGFyZ2V0LmNvbG9yLnI7XG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDFdID0gdGFyZ2V0LmNvbG9yLmc7XG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDJdID0gdGFyZ2V0LmNvbG9yLmI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb2ludCBhbHBoYSBhdHRyaWJ1dGUgd2l0aCB0aGUgcGFydGljbGUncyB0YXJnZXQgYWxwaGEuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIGNvbnRhaW5pbmcgdGhlIHRhcmdldCBhbHBoYS5cbiAgICogQHJldHVybiB7RGVza3RvcEdQVVJlbmRlcmVyfVxuICAgKi9cbiAgdXBkYXRlUG9pbnRBbHBoYShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9ICdhbHBoYSc7XG4gICAgY29uc3QgeyBnZW9tZXRyeSwgc3RyaWRlLCBidWZmZXIgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IHBhcnRpY2xlO1xuICAgIGNvbnN0IHsgb2Zmc2V0IH0gPSBnZW9tZXRyeS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG5cbiAgICBidWZmZXIuYXJyYXlbdGFyZ2V0LmluZGV4ICogc3RyaWRlICsgb2Zmc2V0ICsgMF0gPSB0YXJnZXQuYWxwaGE7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb2ludCB0ZXh0dXJlIGF0dHJpYnV0ZSB3aXRoIHRoZSBwYXJ0aWNsZSdzIHRhcmdldCB0ZXh0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSBjb250YWluaW5nIHRoZSB0YXJnZXQgdGV4dHVyZS5cbiAgICogQHJldHVybiB7RGVza3RvcEdQVVJlbmRlcmVyfVxuICAgKi9cbiAgdXBkYXRlUG9pbnRUZXh0dXJlSW5kZXgocGFydGljbGUpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSAndGV4SUQnO1xuICAgIGNvbnN0IHsgZ2VvbWV0cnksIHN0cmlkZSwgYnVmZmVyIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBwYXJ0aWNsZTtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gZ2VvbWV0cnkuYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuXG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDBdID0gdGFyZ2V0LnRleHR1cmVJbmRleDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0VGV4dHVyZUlEKHRleHR1cmUsIGRlYnVnKSB7XG4gICAgaWYgKHRleHR1cmUudGV4dHVyZUluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghdGhpcy50ZXh0dXJlQXRsYXMpIHtcbiAgICAgICAgdGhpcy50ZXh0dXJlQXRsYXMgPSBuZXcgVGV4dHVyZUF0bGFzKHRoaXMsIGRlYnVnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50ZXh0dXJlQXRsYXMuYWRkVGV4dHVyZSh0ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dHVyZS50ZXh0dXJlSW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogVGVhcnMgZG93biB0aGUgR1BVUmVuZGVyZXIuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lciwgcG9pbnRzLCB0ZXh0dXJlQXRsYXMsIHVuaXF1ZUxpc3QgfSA9IHRoaXM7XG5cbiAgICBjb250YWluZXIucmVtb3ZlKHBvaW50cyk7XG4gICAgdW5pcXVlTGlzdC5kZXN0cm95KCk7XG4gICAgdGV4dHVyZUF0bGFzICYmIHRleHR1cmVBdGxhcy5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==