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

var _BaseRenderer2 = _interopRequireDefault(require("./BaseRenderer"));

var _utils = require("../utils");

var _core = require("../core");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @requires THREE - { Mesh, BoxGeometry, MeshLambertMaterial }
 */
var MeshRenderer = /*#__PURE__*/function (_BaseRenderer) {
  (0, _inherits2["default"])(MeshRenderer, _BaseRenderer);

  var _super = _createSuper(MeshRenderer);

  /**
   * @param {object} container - An Object3D container, usually a THREE.Scene
   * @param {object} THREE - THREE Api
   */
  function MeshRenderer(container, THREE) {
    var _this;

    (0, _classCallCheck2["default"])(this, MeshRenderer);
    _this = _super.call(this, _types.RENDERER_TYPE_MESH);
    _this.container = container;
    _this._targetPool = new _core.Pool();
    _this._materialPool = new _core.Pool();
    _this._body = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshLambertMaterial({
      color: '#ff0000'
    }));
    return _this;
  }

  (0, _createClass2["default"])(MeshRenderer, [{
    key: "isThreeSprite",
    value: function isThreeSprite(particle) {
      return particle.target.isSprite;
    }
  }, {
    key: "onSystemUpdate",
    value: function onSystemUpdate() {}
  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {
      if (!particle.target) {
        //set target
        if (!particle.body) particle.body = this._body;
        particle.target = this._targetPool.get(particle.body); //set material

        if (particle.useAlpha || particle.useColor) {
          particle.target.material.__puid = _utils.PUID.id(particle.body.material);
          particle.target.material = this._materialPool.get(particle.target.material);
        }
      }

      if (particle.target) {
        particle.target.position.copy(particle.position);
        this.container.add(particle.target);
      }
    }
  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {
      var target = particle.target,
          useAlpha = particle.useAlpha,
          useColor = particle.useColor,
          rotation = particle.rotation;

      if (!target) {
        return;
      }

      target.position.copy(particle.position);

      if (!this.isThreeSprite(particle)) {
        target.rotation.set(rotation.x, rotation.y, rotation.z);
      }

      this.scale(particle);

      if (useAlpha) {
        target.material.opacity = particle.alpha;
        target.material.transparent = true;
      }

      if (useColor) {
        target.material.color.copy(particle.color);
      }
    }
  }, {
    key: "scale",
    value: function scale(particle) {
      particle.target.scale.set(particle.scale, particle.scale, particle.scale);
    }
  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {
      if (particle.target) {
        if (particle.useAlpha || particle.useColor) this._materialPool.expire(particle.target.material);

        this._targetPool.expire(particle.target);

        this.container.remove(particle.target);
        particle.target = null;
      }
    }
  }]);
  return MeshRenderer;
}(_BaseRenderer2["default"]);

exports["default"] = MeshRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXJlci9NZXNoUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiTWVzaFJlbmRlcmVyIiwiY29udGFpbmVyIiwiVEhSRUUiLCJ0eXBlIiwiX3RhcmdldFBvb2wiLCJQb29sIiwiX21hdGVyaWFsUG9vbCIsIl9ib2R5IiwiTWVzaCIsIkJveEdlb21ldHJ5IiwiTWVzaExhbWJlcnRNYXRlcmlhbCIsImNvbG9yIiwicGFydGljbGUiLCJ0YXJnZXQiLCJpc1Nwcml0ZSIsImJvZHkiLCJnZXQiLCJ1c2VBbHBoYSIsInVzZUNvbG9yIiwibWF0ZXJpYWwiLCJfX3B1aWQiLCJQVUlEIiwiaWQiLCJwb3NpdGlvbiIsImNvcHkiLCJhZGQiLCJyb3RhdGlvbiIsImlzVGhyZWVTcHJpdGUiLCJzZXQiLCJ4IiwieSIsInoiLCJzY2FsZSIsIm9wYWNpdHkiLCJhbHBoYSIsInRyYW5zcGFyZW50IiwiZXhwaXJlIiwicmVtb3ZlIiwiQmFzZVJlbmRlcmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7QUFDQTtJQUNxQkEsWTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDRSx3QkFBWUMsU0FBWixFQUF1QkMsS0FBdkIsRUFBOEI7QUFBQTs7QUFBQTtBQUM1Qiw4QkFBTUMseUJBQU47QUFFQSxVQUFLRixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFVBQUtHLFdBQUwsR0FBbUIsSUFBSUMsVUFBSixFQUFuQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUIsSUFBSUQsVUFBSixFQUFyQjtBQUNBLFVBQUtFLEtBQUwsR0FBYSxJQUFJTCxLQUFLLENBQUNNLElBQVYsQ0FDWCxJQUFJTixLQUFLLENBQUNPLFdBQVYsQ0FBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsQ0FEVyxFQUVYLElBQUlQLEtBQUssQ0FBQ1EsbUJBQVYsQ0FBOEI7QUFBRUMsTUFBQUEsS0FBSyxFQUFF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QUFRLENBQUNNLFFBQWxDLEVBQ0UsS0FBS1osYUFBTCxDQUFtQjhCLE1BQW5CLENBQTBCeEIsUUFBUSxDQUFDQyxNQUFULENBQWdCTSxRQUExQzs7QUFFRixhQUFLZixXQUFMLENBQWlCZ0MsTUFBakIsQ0FBd0J4QixRQUFRLENBQUNDLE1BQWpDOztBQUNBLGFBQUtaLFNBQUwsQ0FBZW9DLE1BQWYsQ0FBc0J6QixRQUFRLENBQUNDLE1BQS9CO0FBQ0FELFFBQUFBLFFBQVEsQ0FBQ0MsTUFBVCxHQUFrQixJQUFsQjtBQUNEO0FBQ0Y7OztFQWxGdUN5Qix5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSAnLi9CYXNlUmVuZGVyZXInO1xuaW1wb3J0IHsgUFVJRCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFBvb2wgfSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7IFJFTkRFUkVSX1RZUEVfTUVTSCBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQHJlcXVpcmVzIFRIUkVFIC0geyBNZXNoLCBCb3hHZW9tZXRyeSwgTWVzaExhbWJlcnRNYXRlcmlhbCB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc2hSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGFpbmVyIC0gQW4gT2JqZWN0M0QgY29udGFpbmVyLCB1c3VhbGx5IGEgVEhSRUUuU2NlbmVcbiAgICogQHBhcmFtIHtvYmplY3R9IFRIUkVFIC0gVEhSRUUgQXBpXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIFRIUkVFKSB7XG4gICAgc3VwZXIodHlwZSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLl90YXJnZXRQb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLl9tYXRlcmlhbFBvb2wgPSBuZXcgUG9vbCgpO1xuICAgIHRoaXMuX2JvZHkgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1MCwgNTAsIDUwKSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6ICcjZmYwMDAwJyB9KVxuICAgICk7XG4gIH1cblxuICBpc1RocmVlU3ByaXRlKHBhcnRpY2xlKSB7XG4gICAgcmV0dXJuIHBhcnRpY2xlLnRhcmdldC5pc1Nwcml0ZTtcbiAgfVxuXG4gIG9uU3lzdGVtVXBkYXRlKCkge31cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmICghcGFydGljbGUudGFyZ2V0KSB7XG4gICAgICAvL3NldCB0YXJnZXRcbiAgICAgIGlmICghcGFydGljbGUuYm9keSkgcGFydGljbGUuYm9keSA9IHRoaXMuX2JvZHk7XG4gICAgICBwYXJ0aWNsZS50YXJnZXQgPSB0aGlzLl90YXJnZXRQb29sLmdldChwYXJ0aWNsZS5ib2R5KTtcblxuICAgICAgLy9zZXQgbWF0ZXJpYWxcbiAgICAgIGlmIChwYXJ0aWNsZS51c2VBbHBoYSB8fCBwYXJ0aWNsZS51c2VDb2xvcikge1xuICAgICAgICBwYXJ0aWNsZS50YXJnZXQubWF0ZXJpYWwuX19wdWlkID0gUFVJRC5pZChwYXJ0aWNsZS5ib2R5Lm1hdGVyaWFsKTtcbiAgICAgICAgcGFydGljbGUudGFyZ2V0Lm1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWxQb29sLmdldChcbiAgICAgICAgICBwYXJ0aWNsZS50YXJnZXQubWF0ZXJpYWxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFydGljbGUudGFyZ2V0KSB7XG4gICAgICBwYXJ0aWNsZS50YXJnZXQucG9zaXRpb24uY29weShwYXJ0aWNsZS5wb3NpdGlvbik7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGQocGFydGljbGUudGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgeyB0YXJnZXQsIHVzZUFscGhhLCB1c2VDb2xvciwgcm90YXRpb24gfSA9IHBhcnRpY2xlO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0YXJnZXQucG9zaXRpb24uY29weShwYXJ0aWNsZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoIXRoaXMuaXNUaHJlZVNwcml0ZShwYXJ0aWNsZSkpIHtcbiAgICAgIHRhcmdldC5yb3RhdGlvbi5zZXQocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueik7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZShwYXJ0aWNsZSk7XG5cbiAgICBpZiAodXNlQWxwaGEpIHtcbiAgICAgIHRhcmdldC5tYXRlcmlhbC5vcGFjaXR5ID0gcGFydGljbGUuYWxwaGE7XG4gICAgICB0YXJnZXQubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh1c2VDb2xvcikge1xuICAgICAgdGFyZ2V0Lm1hdGVyaWFsLmNvbG9yLmNvcHkocGFydGljbGUuY29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIHNjYWxlKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUudGFyZ2V0LnNjYWxlLnNldChwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnNjYWxlKTtcbiAgfVxuXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLnRhcmdldCkge1xuICAgICAgaWYgKHBhcnRpY2xlLnVzZUFscGhhIHx8IHBhcnRpY2xlLnVzZUNvbG9yKVxuICAgICAgICB0aGlzLl9tYXRlcmlhbFBvb2wuZXhwaXJlKHBhcnRpY2xlLnRhcmdldC5tYXRlcmlhbCk7XG5cbiAgICAgIHRoaXMuX3RhcmdldFBvb2wuZXhwaXJlKHBhcnRpY2xlLnRhcmdldCk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmUocGFydGljbGUudGFyZ2V0KTtcbiAgICAgIHBhcnRpY2xlLnRhcmdldCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=