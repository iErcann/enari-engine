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
 * GPURenderer for mobile devices that do not support floating point textures.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 */

var MobileGPURenderer = /*#__PURE__*/function (_BaseRenderer) {
  (0, _inherits2["default"])(MobileGPURenderer, _BaseRenderer);

  var _super = _createSuper(MobileGPURenderer);

  function MobileGPURenderer(container, three) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_RENDERER_OPTIONS;
    (0, _classCallCheck2["default"])(this, MobileGPURenderer);
    _this = _super.call(this, _types.RENDERER_TYPE_GPU_MOBILE);
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
        FFatlasIndex: {
          value: null
        },
        atlasDim: {
          value: new THREE.Vector2()
        }
      },
      vertexShader: (0, _shaders.vertexShader)(),
      fragmentShader: (0, _shaders.fragmentShader)(),
      blending: THREE[blending],
      depthTest: depthTest,
      depthWrite: depthWrite,
      transparent: transparent
    });
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
    container.add(_this.points);
    return _this;
  }

  (0, _createClass2["default"])(MobileGPURenderer, [{
    key: "onSystemUpdate",
    value: function onSystemUpdate(system) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(MobileGPURenderer.prototype), "onSystemUpdate", this).call(this, system);
      this.buffer.needsUpdate = true;
      var textureAtlas = this.textureAtlas;

      if (textureAtlas) {
        textureAtlas.update();
        this.material.uniforms.atlasDim.value.set(textureAtlas.atlasTexture.image.width, textureAtlas.atlasTexture.image.height);
      }
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
     * @return {GPURenderer}
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
     * @return {GPURenderer}
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
     * @return {GPURenderer}
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
     * @return {GPURenderer}
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
     * @return {GPURenderer}
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
     * @return {GPURenderer}
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
     * @return {GPURenderer}
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
      var id = target.index * stride + offset + 0; // eslint-disable-next-line

      if (false) {
        buffer.array[id] = target.textureIndex;
      } else {
        var ti = target.textureIndex * 4;
        var ta = this.textureAtlas;
        var ida = ta.indexData;
        var nx = ida[ti++];
        var ny = ida[ti++];
        var px = ida[ti++];
        var py = ida[ti++];
        buffer.array[id] = (nx * ta.atlasTexture.image.width | 0) + px;
        buffer.array[id + 1] = (ny * ta.atlasTexture.image.height | 0) + py;
      }

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
  return MobileGPURenderer;
}(_BaseRenderer2["default"]);

exports["default"] = MobileGPURenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9Nb2JpbGUvaW5kZXguanMiXSwibmFtZXMiOlsiVEhSRUUiLCJNb2JpbGVHUFVSZW5kZXJlciIsImNvbnRhaW5lciIsInRocmVlIiwib3B0aW9ucyIsIkRFRkFVTFRfUkVOREVSRVJfT1BUSU9OUyIsIlJFTkRFUkVSX1RZUEVfR1BVX01PQklMRSIsInByb3BzIiwiY2FtZXJhIiwibWF4UGFydGljbGVzIiwiYmFzZUNvbG9yIiwiYmxlbmRpbmciLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwidHJhbnNwYXJlbnQiLCJzaG91bGREZWJ1Z1RleHR1cmVBdGxhcyIsInBhcnRpY2xlQnVmZmVyIiwiUGFydGljbGVCdWZmZXIiLCJtYXRlcmlhbCIsIlNoYWRlck1hdGVyaWFsIiwidW5pZm9ybXMiLCJ2YWx1ZSIsIkNvbG9yIiwidVRleHR1cmUiLCJGRmF0bGFzSW5kZXgiLCJhdGxhc0RpbSIsIlZlY3RvcjIiLCJ2ZXJ0ZXhTaGFkZXIiLCJmcmFnbWVudFNoYWRlciIsInRhcmdldFBvb2wiLCJQb29sIiwidW5pcXVlTGlzdCIsIlVuaXF1ZUxpc3QiLCJidWZmZXIiLCJzdHJpZGUiLCJnZW9tZXRyeSIsInBvaW50cyIsIlBvaW50cyIsImZydXN0dW1DdWxsZWQiLCJhZGQiLCJzeXN0ZW0iLCJuZWVkc1VwZGF0ZSIsInRleHR1cmVBdGxhcyIsInVwZGF0ZSIsInNldCIsImF0bGFzVGV4dHVyZSIsImltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJwYXJ0aWNsZSIsInRhcmdldCIsImdldCIsIlRhcmdldCIsImlkIiwidXBkYXRlVGFyZ2V0IiwibWFwUGFydGljbGVUYXJnZXRQcm9wc1RvUG9pbnQiLCJyZXNldCIsInBvc2l0aW9uIiwic2NhbGUiLCJyYWRpdXMiLCJjb2xvciIsImFscGhhIiwiYm9keSIsInIiLCJnIiwiYiIsImNvcHkiLCJzaXplIiwic2V0UkdCIiwiaW5kZXgiLCJmaW5kIiwiU3ByaXRlIiwibWFwIiwidGV4dHVyZSIsInRleHR1cmVJbmRleCIsImdldFRleHR1cmVJRCIsInVwZGF0ZVBvaW50UG9zaXRpb24iLCJ1cGRhdGVQb2ludFNpemUiLCJ1cGRhdGVQb2ludENvbG9yIiwidXBkYXRlUG9pbnRBbHBoYSIsInVwZGF0ZVBvaW50VGV4dHVyZUluZGV4IiwiYXR0cmlidXRlIiwib2Zmc2V0IiwiYXR0cmlidXRlcyIsImFycmF5IiwieCIsInkiLCJ6IiwidGkiLCJ0YSIsImlkYSIsImluZGV4RGF0YSIsIm54IiwibnkiLCJweCIsInB5IiwiZGVidWciLCJ1bmRlZmluZWQiLCJUZXh0dXJlQXRsYXMiLCJhZGRUZXh0dXJlIiwicmVtb3ZlIiwiZGVzdHJveSIsIkJhc2VSZW5kZXJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUlBLEtBQUo7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ3FCQyxpQjs7Ozs7QUFDbkIsNkJBQVlDLFNBQVosRUFBdUJDLEtBQXZCLEVBQWtFO0FBQUE7O0FBQUEsUUFBcENDLE9BQW9DLHVFQUExQkMsbUNBQTBCO0FBQUE7QUFDaEUsOEJBQU1DLCtCQUFOO0FBRUFOLElBQUFBLEtBQUssR0FBRyxNQUFLRyxLQUFMLEdBQWFBLEtBQXJCOztBQUNBLFFBQU1JLEtBQUssbUNBQVFGLG1DQUFSLEdBQXFDRCxPQUFyQyxDQUFYOztBQUpnRSxRQU05REksTUFOOEQsR0FjNURELEtBZDRELENBTTlEQyxNQU44RDtBQUFBLFFBTzlEQyxZQVA4RCxHQWM1REYsS0FkNEQsQ0FPOURFLFlBUDhEO0FBQUEsUUFROURDLFNBUjhELEdBYzVESCxLQWQ0RCxDQVE5REcsU0FSOEQ7QUFBQSxRQVM5REMsUUFUOEQsR0FjNURKLEtBZDRELENBUzlESSxRQVQ4RDtBQUFBLFFBVTlEQyxTQVY4RCxHQWM1REwsS0FkNEQsQ0FVOURLLFNBVjhEO0FBQUEs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VixFQUF3QjtBQUN0QixlQUFLQSxZQUFMLEdBQW9CLElBQUl3RCxvQkFBSixDQUFpQixJQUFqQixFQUF1QkYsS0FBdkIsQ0FBcEI7QUFDRDs7QUFFRCxhQUFLdEQsWUFBTCxDQUFrQnlELFVBQWxCLENBQTZCMUIsT0FBN0I7QUFDRDs7QUFFRCxhQUFPQSxPQUFPLENBQUNDLFlBQWY7QUFDRDs7OzhCQUVTO0FBQUEsVUFDQXhFLFNBREEsR0FDZ0QsSUFEaEQsQ0FDQUEsU0FEQTtBQUFBLFVBQ1drQyxNQURYLEdBQ2dELElBRGhELENBQ1dBLE1BRFg7QUFBQSxVQUNtQk0sWUFEbkIsR0FDZ0QsSUFEaEQsQ0FDbUJBLFlBRG5CO0FBQUEsVUFDaUNYLFVBRGpDLEdBQ2dELElBRGhELENBQ2lDQSxVQURqQztBQUdSN0IsTUFBQUEsU0FBUyxDQUFDa0csTUFBVixDQUFpQmhFLE1BQWpCO0FBQ0FMLE1BQUFBLFVBQVUsQ0FBQ3NFLE9BQVg7QUFDQTNELE1BQUFBLFlBQVksSUFBSUEsWUFBWSxDQUFDMkQsT0FBYixFQUFoQjtBQUNEOzs7RUFsUjRDQyx5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhcnRpY2xlQnVmZmVyLCBUYXJnZXQsIFRleHR1cmVBdGxhcywgVW5pcXVlTGlzdCB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBmcmFnbWVudFNoYWRlciwgdmVydGV4U2hhZGVyIH0gZnJvbSAnLi9zaGFkZXJzJztcblxuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tICcuLi8uLi9CYXNlUmVuZGVyZXInO1xuaW1wb3J0IHsgREVGQVVMVF9SRU5ERVJFUl9PUFRJT05TIH0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBQb29sIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5pbXBvcnQgeyBSRU5ERVJFUl9UWVBFX0dQVV9NT0JJTEUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmxldCBUSFJFRTtcblxuLyoqXG4gKiBHUFVSZW5kZXJlciBmb3IgbW9iaWxlIGRldmljZXMgdGhhdCBkbyBub3Qgc3VwcG9ydCBmbG9hdGluZyBwb2ludCB0ZXh0dXJlcy5cbiAqXG4gKiBAYXV0aG9yIHRocmF4IDxtYW50aHJheEBnbWFpbC5jb20+XG4gKiBAYXV0aG9yIHJvaGFuLWRlc2hwYW5kZSA8cm9oYW5AY3JlYXRpdmVsaWZlZm9ybS5jb20+XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYmlsZUdQVVJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyLCB0aHJlZSwgb3B0aW9ucyA9IERFRkFVTFRfUkVOREVSRVJfT1BUSU9OUykge1xuICAgIHN1cGVyKFJFTkRFUkVSX1RZUEVfR1BVX01PQklMRSk7XG5cbiAgICBUSFJFRSA9IHRoaXMudGhyZWUgPSB0aHJlZTtcbiAgICBjb25zdCBwcm9wcyA9IHsgLi4uREVGQVVMVF9SRU5ERVJFUl9PUFRJT05TLCAuLi5vcHRpb25zIH07XG4gICAgY29uc3Qge1xuICAgICAgY2FtZXJhLFxuICAgICAgbWF4UGFydGljbGVzLFxuICAgICAgYmFzZUNvbG9yLFxuICAgICAgYmxlbmRpbmcsXG4gICAgICBkZXB0aFRlc3QsXG4gICAgICBkZXB0aFdyaXRlLFxuICAgICAgdHJhbnNwYXJlbnQsXG4gICAgICBzaG91bGREZWJ1Z1RleHR1cmVBdGxhcyxcbiAgICB9ID0gcHJvcHM7XG4gICAgY29uc3QgcGFydGljbGVCdWZmZXIgPSBuZXcgUGFydGljbGVCdWZmZXIobWF4UGFydGljbGVzLCBUSFJFRSk7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgYmFzZUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoYmFzZUNvbG9yKSB9LFxuICAgICAgICB1VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBGRmF0bGFzSW5kZXg6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgYXRsYXNEaW06IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKCkgfSxcbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhTaGFkZXI6IHZlcnRleFNoYWRlcigpLFxuICAgICAgZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50U2hhZGVyKCksXG4gICAgICBibGVuZGluZzogVEhSRUVbYmxlbmRpbmddLFxuICAgICAgZGVwdGhUZXN0LFxuICAgICAgZGVwdGhXcml0ZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy50YXJnZXRQb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLnVuaXF1ZUxpc3QgPSBuZXcgVW5pcXVlTGlzdChtYXhQYXJ0aWNsZXMpO1xuICAgIHRoaXMucGFydGljbGVCdWZmZXIgPSBwYXJ0aWNsZUJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlciA9IHBhcnRpY2xlQnVmZmVyLmJ1ZmZlcjtcbiAgICB0aGlzLnN0cmlkZSA9IHBhcnRpY2xlQnVmZmVyLnN0cmlkZTtcbiAgICB0aGlzLmdlb21ldHJ5ID0gcGFydGljbGVCdWZmZXIuZ2VvbWV0cnk7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMucG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcbiAgICB0aGlzLnBvaW50cy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5zaG91bGREZWJ1Z1RleHR1cmVBdGxhcyA9IHNob3VsZERlYnVnVGV4dHVyZUF0bGFzO1xuXG4gICAgY29udGFpbmVyLmFkZCh0aGlzLnBvaW50cyk7XG4gIH1cblxuICBvblN5c3RlbVVwZGF0ZShzeXN0ZW0pIHtcbiAgICBzdXBlci5vblN5c3RlbVVwZGF0ZShzeXN0ZW0pO1xuXG4gICAgdGhpcy5idWZmZXIubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgY29uc3QgeyB0ZXh0dXJlQXRsYXMgfSA9IHRoaXM7XG5cbiAgICBpZiAodGV4dHVyZUF0bGFzKSB7XG4gICAgICB0ZXh0dXJlQXRsYXMudXBkYXRlKCk7XG4gICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLmF0bGFzRGltLnZhbHVlLnNldChcbiAgICAgICAgdGV4dHVyZUF0bGFzLmF0bGFzVGV4dHVyZS5pbWFnZS53aWR0aCxcbiAgICAgICAgdGV4dHVyZUF0bGFzLmF0bGFzVGV4dHVyZS5pbWFnZS5oZWlnaHRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBvb2xzIHRoZSBwYXJ0aWNsZSB0YXJnZXQgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gICAqIFVwZGF0ZXMgdGhlIHRhcmdldCBhbmQgbWFwcyBwYXJ0aWNsZSBwcm9wZXJ0aWVzIHRvIHRoZSBwb2ludC5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX1cbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS50YXJnZXQpIHtcbiAgICAgIHBhcnRpY2xlLnRhcmdldCA9IHRoaXMudGFyZ2V0UG9vbC5nZXQoVGFyZ2V0LCBUSFJFRSk7XG4gICAgICB0aGlzLnVuaXF1ZUxpc3QuYWRkKHBhcnRpY2xlLmlkKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVRhcmdldChwYXJ0aWNsZSkubWFwUGFydGljbGVUYXJnZXRQcm9wc1RvUG9pbnQocGFydGljbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcHMgcGFydGljbGUgcHJvcGVydGllcyB0byB0aGUgcG9pbnQgaWYgdGhlIHBhcnRpY2xlIGhhcyBhIHRhcmdldC5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX1cbiAgICovXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAoIXBhcnRpY2xlLnRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVGFyZ2V0KHBhcnRpY2xlKS5tYXBQYXJ0aWNsZVRhcmdldFByb3BzVG9Qb2ludChwYXJ0aWNsZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIGFuZCBjbGVhcnMgdGhlIHBhcnRpY2xlIHRhcmdldC5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX1cbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKCFwYXJ0aWNsZS50YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS50YXJnZXQucmVzZXQoKTtcbiAgICB0aGlzLm1hcFBhcnRpY2xlVGFyZ2V0UHJvcHNUb1BvaW50KHBhcnRpY2xlKTtcblxuICAgIHBhcnRpY2xlLnRhcmdldCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTWFwcyBhbGwgbXV0YWJsZSBwcm9wZXJ0aWVzIGZyb20gdGhlIHBhcnRpY2xlIHRvIHRoZSB0YXJnZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9XG4gICAqIEByZXR1cm4ge0dQVVJlbmRlcmVyfVxuICAgKi9cbiAgdXBkYXRlVGFyZ2V0KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgeyBwb3NpdGlvbiwgc2NhbGUsIHJhZGl1cywgY29sb3IsIGFscGhhLCBib2R5LCBpZCB9ID0gcGFydGljbGU7XG4gICAgY29uc3QgeyByLCBnLCBiIH0gPSBjb2xvcjtcblxuICAgIHBhcnRpY2xlLnRhcmdldC5wb3NpdGlvbi5jb3B5KHBvc2l0aW9uKTtcbiAgICBwYXJ0aWNsZS50YXJnZXQuc2l6ZSA9IHNjYWxlICogcmFkaXVzO1xuICAgIHBhcnRpY2xlLnRhcmdldC5jb2xvci5zZXRSR0IociwgZywgYik7XG4gICAgcGFydGljbGUudGFyZ2V0LmFscGhhID0gYWxwaGE7XG4gICAgcGFydGljbGUudGFyZ2V0LmluZGV4ID0gdGhpcy51bmlxdWVMaXN0LmZpbmQoaWQpO1xuXG4gICAgaWYgKGJvZHkgJiYgYm9keSBpbnN0YW5jZW9mIFRIUkVFLlNwcml0ZSkge1xuICAgICAgY29uc3QgeyBtYXAgfSA9IGJvZHkubWF0ZXJpYWw7XG5cbiAgICAgIHBhcnRpY2xlLnRhcmdldC50ZXh0dXJlID0gbWFwO1xuICAgICAgcGFydGljbGUudGFyZ2V0LnRleHR1cmVJbmRleCA9IHRoaXMuZ2V0VGV4dHVyZUlEKFxuICAgICAgICBtYXAsXG4gICAgICAgIHRoaXMuc2hvdWxkRGVidWdUZXh0dXJlQXRsYXNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRW50cnkgcG9pbnQgZm9yIG1hcHBpbmcgcGFydGljbGUgcHJvcGVydGllcyB0byBidWZmZXIgZ2VvbWV0cnkgcG9pbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSBjb250YWluaW5nIHRoZSBwcm9wZXJ0aWVzIHRvIG1hcFxuICAgKiBAcmV0dXJuIHtHUFVSZW5kZXJlcn1cbiAgICovXG4gIG1hcFBhcnRpY2xlVGFyZ2V0UHJvcHNUb1BvaW50KHBhcnRpY2xlKSB7XG4gICAgdGhpcy51cGRhdGVQb2ludFBvc2l0aW9uKHBhcnRpY2xlKVxuICAgICAgLnVwZGF0ZVBvaW50U2l6ZShwYXJ0aWNsZSlcbiAgICAgIC51cGRhdGVQb2ludENvbG9yKHBhcnRpY2xlKVxuICAgICAgLnVwZGF0ZVBvaW50QWxwaGEocGFydGljbGUpXG4gICAgICAudXBkYXRlUG9pbnRUZXh0dXJlSW5kZXgocGFydGljbGUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcG9pbnQncyBwb3NpdGlvbiBhY2NvcmRpbmcgdG8gdGhlIHBhcnRpY2xlJ3MgdGFyZ2V0IHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSBjb250YWluaW5nIHRoZSB0YXJnZXQgcG9zaXRpb24uXG4gICAqIEByZXR1cm4ge0dQVVJlbmRlcmVyfVxuICAgKi9cbiAgdXBkYXRlUG9pbnRQb3NpdGlvbihwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9ICdwb3NpdGlvbic7XG4gICAgY29uc3QgeyBnZW9tZXRyeSwgc3RyaWRlLCBidWZmZXIgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IHBhcnRpY2xlO1xuICAgIGNvbnN0IHsgb2Zmc2V0IH0gPSBnZW9tZXRyeS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG5cbiAgICBidWZmZXIuYXJyYXlbdGFyZ2V0LmluZGV4ICogc3RyaWRlICsgb2Zmc2V0ICsgMF0gPSB0YXJnZXQucG9zaXRpb24ueDtcbiAgICBidWZmZXIuYXJyYXlbdGFyZ2V0LmluZGV4ICogc3RyaWRlICsgb2Zmc2V0ICsgMV0gPSB0YXJnZXQucG9zaXRpb24ueTtcbiAgICBidWZmZXIuYXJyYXlbdGFyZ2V0LmluZGV4ICogc3RyaWRlICsgb2Zmc2V0ICsgMl0gPSB0YXJnZXQucG9zaXRpb24uejtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBvaW50J3Mgc2l6ZSByZWxhdGl2ZSB0byB0aGUgcGFydGljbGUncyB0YXJnZXQgc2NhbGUgYW5kIHJhZGl1cy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgY29udGFpbmluZyB0aGUgdGFyZ2V0IHNjYWxlLlxuICAgKiBAcmV0dXJuIHtHUFVSZW5kZXJlcn1cbiAgICovXG4gIHVwZGF0ZVBvaW50U2l6ZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9ICdzaXplJztcbiAgICBjb25zdCB7IGdlb21ldHJ5LCBzdHJpZGUsIGJ1ZmZlciB9ID0gdGhpcztcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gcGFydGljbGU7XG4gICAgY29uc3QgeyBvZmZzZXQgfSA9IGdlb21ldHJ5LmF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcblxuICAgIGJ1ZmZlci5hcnJheVt0YXJnZXQuaW5kZXggKiBzdHJpZGUgKyBvZmZzZXQgKyAwXSA9IHRhcmdldC5zaXplO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcG9pbnQncyBjb2xvciBhdHRyaWJ1dGUgYWNjb3JkaW5nIHdpdGggdGhlIHBhcnRpY2xlJ3MgdGFyZ2V0IGNvbG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSBjb250YWluaW5nIHRoZSB0YXJnZXQgY29sb3IgYW5kIGFscGhhLlxuICAgKiBAcmV0dXJuIHtHUFVSZW5kZXJlcn1cbiAgICovXG4gIHVwZGF0ZVBvaW50Q29sb3IocGFydGljbGUpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSAnY29sb3InO1xuICAgIGNvbnN0IHsgZ2VvbWV0cnksIHN0cmlkZSwgYnVmZmVyIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBwYXJ0aWNsZTtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gZ2VvbWV0cnkuYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuXG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDBdID0gdGFyZ2V0LmNvbG9yLnI7XG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDFdID0gdGFyZ2V0LmNvbG9yLmc7XG4gICAgYnVmZmVyLmFycmF5W3RhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDJdID0gdGFyZ2V0LmNvbG9yLmI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb2ludCBhbHBoYSBhdHRyaWJ1dGUgd2l0aCB0aGUgcGFydGljbGUncyB0YXJnZXQgYWxwaGEuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIGNvbnRhaW5pbmcgdGhlIHRhcmdldCBhbHBoYS5cbiAgICogQHJldHVybiB7R1BVUmVuZGVyZXJ9XG4gICAqL1xuICB1cGRhdGVQb2ludEFscGhhKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gJ2FscGhhJztcbiAgICBjb25zdCB7IGdlb21ldHJ5LCBzdHJpZGUsIGJ1ZmZlciB9ID0gdGhpcztcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gcGFydGljbGU7XG4gICAgY29uc3QgeyBvZmZzZXQgfSA9IGdlb21ldHJ5LmF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcblxuICAgIGJ1ZmZlci5hcnJheVt0YXJnZXQuaW5kZXggKiBzdHJpZGUgKyBvZmZzZXQgKyAwXSA9IHRhcmdldC5hbHBoYTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBvaW50IHRleHR1cmUgYXR0cmlidXRlIHdpdGggdGhlIHBhcnRpY2xlJ3MgdGFyZ2V0IHRleHR1cmUuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIGNvbnRhaW5pbmcgdGhlIHRhcmdldCB0ZXh0dXJlLlxuICAgKiBAcmV0dXJuIHtHUFVSZW5kZXJlcn1cbiAgICovXG4gIHVwZGF0ZVBvaW50VGV4dHVyZUluZGV4KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gJ3RleElEJztcbiAgICBjb25zdCB7IGdlb21ldHJ5LCBzdHJpZGUsIGJ1ZmZlciB9ID0gdGhpcztcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gcGFydGljbGU7XG4gICAgY29uc3QgeyBvZmZzZXQgfSA9IGdlb21ldHJ5LmF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICBjb25zdCBpZCA9IHRhcmdldC5pbmRleCAqIHN0cmlkZSArIG9mZnNldCArIDA7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIGJ1ZmZlci5hcnJheVtpZF0gPSB0YXJnZXQudGV4dHVyZUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGkgPSB0YXJnZXQudGV4dHVyZUluZGV4ICogNDtcbiAgICAgIGNvbnN0IHRhID0gdGhpcy50ZXh0dXJlQXRsYXM7XG4gICAgICBjb25zdCBpZGEgPSB0YS5pbmRleERhdGE7XG4gICAgICBjb25zdCBueCA9IGlkYVt0aSsrXTtcbiAgICAgIGNvbnN0IG55ID0gaWRhW3RpKytdO1xuICAgICAgY29uc3QgcHggPSBpZGFbdGkrK107XG4gICAgICBjb25zdCBweSA9IGlkYVt0aSsrXTtcblxuICAgICAgYnVmZmVyLmFycmF5W2lkXSA9ICgobnggKiB0YS5hdGxhc1RleHR1cmUuaW1hZ2Uud2lkdGgpIHwgMCkgKyBweDtcbiAgICAgIGJ1ZmZlci5hcnJheVtpZCArIDFdID0gKChueSAqIHRhLmF0bGFzVGV4dHVyZS5pbWFnZS5oZWlnaHQpIHwgMCkgKyBweTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFRleHR1cmVJRCh0ZXh0dXJlLCBkZWJ1Zykge1xuICAgIGlmICh0ZXh0dXJlLnRleHR1cmVJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIXRoaXMudGV4dHVyZUF0bGFzKSB7XG4gICAgICAgIHRoaXMudGV4dHVyZUF0bGFzID0gbmV3IFRleHR1cmVBdGxhcyh0aGlzLCBkZWJ1Zyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGV4dHVyZUF0bGFzLmFkZFRleHR1cmUodGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHR1cmUudGV4dHVyZUluZGV4O1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lciwgcG9pbnRzLCB0ZXh0dXJlQXRsYXMsIHVuaXF1ZUxpc3QgfSA9IHRoaXM7XG5cbiAgICBjb250YWluZXIucmVtb3ZlKHBvaW50cyk7XG4gICAgdW5pcXVlTGlzdC5kZXN0cm95KCk7XG4gICAgdGV4dHVyZUF0bGFzICYmIHRleHR1cmVBdGxhcy5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==