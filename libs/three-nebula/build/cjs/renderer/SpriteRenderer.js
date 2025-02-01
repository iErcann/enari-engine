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

var _MeshRenderer2 = _interopRequireDefault(require("./MeshRenderer"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @requires THREE - { Mesh, BoxGeometry, MeshLambertMaterial, Sprite, SpriteMaterial }
 */
var SpriteRenderer = /*#__PURE__*/function (_MeshRenderer) {
  (0, _inherits2["default"])(SpriteRenderer, _MeshRenderer);

  var _super = _createSuper(SpriteRenderer);

  function SpriteRenderer(container, THREE) {
    var _this;

    (0, _classCallCheck2["default"])(this, SpriteRenderer);
    _this = _super.call(this, container, THREE);
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.RENDERER_TYPE_SPRITE;
    _this._body = new THREE.Sprite(new THREE.SpriteMaterial({
      color: 0xffffff
    }));
    return _this;
  }

  (0, _createClass2["default"])(SpriteRenderer, [{
    key: "scale",
    value: function scale(particle) {
      particle.target.scale.set(particle.scale * particle.radius, particle.scale * particle.radius, 1);
    }
  }]);
  return SpriteRenderer;
}(_MeshRenderer2["default"]);

exports["default"] = SpriteRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXJlci9TcHJpdGVSZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJTcHJpdGVSZW5kZXJlciIsImNvbnRhaW5lciIsIlRIUkVFIiwidHlwZSIsIl9ib2R5IiwiU3ByaXRlIiwiU3ByaXRlTWF0ZXJpYWwiLCJjb2xvciIsInBhcnRpY2xlIiwidGFyZ2V0Iiwic2NhbGUiLCJzZXQiLCJyYWRpdXMiLCJNZXNoUmVuZGVyZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0lBQ3FCQSxjOzs7OztBQUNuQiwwQkFBWUMsU0FBWixFQUF1QkMsS0FBdkIsRUFBOEI7QUFBQTs7QUFBQTtBQUM1Qiw4QkFBTUQsU0FBTixFQUFpQkMsS0FBakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxJQUFMLEdBQVlBLDJCQUFaO0FBQ0EsVUFBS0MsS0FBTCxHQUFhLElBQUlGLEtBQUssQ0FBQ0csTUFBVixDQUNYLElBQUlILEtBQUssQ0FBQ0ksY0FBVixDQUF5QjtBQUFFQyxNQUFBQSxLQUFLLEVBQUU7QUFBVCxLQUF6QixDQURXLENBQWI7QUFSNEI7QUFXN0I7Ozs7MEJBRUtDLFEsRUFBVTtBQUNkQSxNQUFBQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLEtBQWhCLENBQXNCQyxHQUF0QixDQUNFSCxRQUFRLENBQUNFLEtBQVQsR0FBaUJGLFFBQVEsQ0FBQ0ksTUFENUIsRUFFRUosUUFBUSxDQUFDRSxLQUFULEdBQWlCRixRQUFRLENBQUNJLE1BRjVCLEVBR0UsQ0FIRjtBQUtEOzs7RUFwQnlDQyx5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNZXNoUmVuZGVyZXIgZnJvbSAnLi9NZXNoUmVuZGVyZXInO1xuaW1wb3J0IHsgUkVOREVSRVJfVFlQRV9TUFJJVEUgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEByZXF1aXJlcyBUSFJFRSAtIHsgTWVzaCwgQm94R2VvbWV0cnksIE1lc2hMYW1iZXJ0TWF0ZXJpYWwsIFNwcml0ZSwgU3ByaXRlTWF0ZXJpYWwgfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVSZW5kZXJlciBleHRlbmRzIE1lc2hSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgVEhSRUUpIHtcbiAgICBzdXBlcihjb250YWluZXIsIFRIUkVFKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLl9ib2R5ID0gbmV3IFRIUkVFLlNwcml0ZShcbiAgICAgIG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KVxuICAgICk7XG4gIH1cblxuICBzY2FsZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnRhcmdldC5zY2FsZS5zZXQoXG4gICAgICBwYXJ0aWNsZS5zY2FsZSAqIHBhcnRpY2xlLnJhZGl1cyxcbiAgICAgIHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUucmFkaXVzLFxuICAgICAgMVxuICAgICk7XG4gIH1cbn1cbiJdfQ==