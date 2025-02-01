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

var _Initializer2 = _interopRequireDefault(require("./Initializer"));

var _math = require("../math");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the body property on initialized particles.
 *
 */
var Body = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Body, _Initializer);

  var _super = _createSuper(Body);

  /**
   * Constructs a Body initalizer instance.
   *
   * @param {string|number|object} body - The content for the particle body, can
   * be a color or an object (mesh)
   * @param {?number} w - The width of the particle body
   * @param {?number} h - The height of the particle body
   * @return void
   */
  function Body(body, w, h) {
    var _this;

    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Body);
    _this = _super.call(this, _types.INITIALIZER_TYPE_BODY, isEnabled);
    /**
     * @desc The content for the particle body
     * @type {ArraySpan}
     */

    _this.body = (0, _math.createArraySpan)(body);
    /**
     * @desc The width of the particle Body
     * @type {number}
     */

    _this.w = w;
    /**
     * @desc The height of the particle Body
     * @type {number}
     */

    _this.h = h || w;
    return _this;
  }
  /**
   * Sets the particle's initial body.
   *
   * @param {Particle} particle - the particle to initialize the property on
   * @return void
   */


  (0, _createClass2["default"])(Body, [{
    key: "initialize",
    value: function initialize(particle) {
      var body = this.body.getValue();

      if (this.w) {
        particle.body = {
          width: this.w,
          height: this.h,
          body: body
        };
      } else {
        particle.body = body;
      }
    }
    /**
     * Creates a Body initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.body - The color for the particle body
     * @property {number} json.width - The width of the particle body
     * @property {number} json.height - The height of the particle body
     * @return {Body}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var body = json.body,
          width = json.width,
          height = json.height,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Body(body, width, height, isEnabled);
    }
  }]);
  return Body;
}(_Initializer2["default"]);

exports["default"] = Body;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Cb2R5LmpzIl0sIm5hbWVzIjpbIkJvZHkiLCJib2R5IiwidyIsImgiLCJpc0VuYWJsZWQiLCJ0eXBlIiwicGFydGljbGUiLCJnZXRWYWx1ZSIsIndpZHRoIiwiaGVpZ2h0IiwianNvbiIsIkluaXRpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQSxJOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxnQkFBWUMsSUFBWixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQTBDO0FBQUE7O0FBQUEsUUFBbEJDLFNBQWtCLHVFQUFOLElBQU07QUFBQTtBQUN4Qyw4QkFBTUMsNEJBQU4sRUFBWUQsU0FBWjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtILElBQUwsR0FBWSwyQkFBZ0JBLElBQWhCLENBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxVQUFLQyxDQUFMLEdBQVNBLENBQUMsSUFBSUQsQ0FBZDtBQW5Cd0M7QUFvQnpDO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzsrQkFDYUksUSxFQUFVO0FBQ25CLFVBQUlMLElBQUksR0FBRyxLQUFLQSxJQUFMLENBQVVNLFFBQVYsRUFBWDs7QUFFQSxVQUFJLEtBQUtMLENBQVQsRUFBWTtBQUNWSSxRQUFBQSxRQUFRLENBQUNMLElBQVQsR0FBZ0I7QUFDZE8sVUFBQUEsS0FBSyxFQUFFLEtBQUtOLENBREU7QUFFZE8sVUFBQUEsTUFBTSxFQUFFLEtBQUtOLENBRkM7QUFHZEYsVUFBQUEsSUFBSSxFQUFFQTtBQUhRLFNBQWhCO0FBS0QsT0FORCxNQU1PO0FBQ0xLLFFBQUFBLFFBQVEsQ0FBQ0wsSUFBVCxHQUFnQkEsSUFBaEI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNrQlMsSSxFQUFNO0FBQUEsVUFDWlQsSUFEWSxHQUM4QlMsSUFEOUIsQ0FDWlQsSUFEWTtBQUFBLFVBQ05PLEtBRE0sR0FDOEJFLElBRDlCLENBQ05GLEtBRE07QUFBQSxVQUNDQyxNQURELEdBQzhCQyxJQUQ5QixDQUNDRCxNQUREO0FBQUEsNEJBQzhCQyxJQUQ5QixDQUNTTixTQURUO0FBQUEsVUFDU0EsU0FEVCxnQ0FDcUIsSUFEckI7QUFHcEIsYUFBTyxJQUFJSixJQUFKLENBQVNDLElBQVQsRUFBZU8sS0FBZixFQUFzQkMsTUFBdEIsRUFBOEJMLFNBQTlCLENBQVA7QUFDRDs7O0VBakUrQk8sd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XG5pbXBvcnQgeyBjcmVhdGVBcnJheVNwYW4gfSBmcm9tICcuLi9tYXRoJztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfQk9EWSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG4vKipcbiAqIFNldHMgdGhlIGJvZHkgcHJvcGVydHkgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSBleHRlbmRzIEluaXRpYWxpemVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBCb2R5IGluaXRhbGl6ZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxvYmplY3R9IGJvZHkgLSBUaGUgY29udGVudCBmb3IgdGhlIHBhcnRpY2xlIGJvZHksIGNhblxuICAgKiBiZSBhIGNvbG9yIG9yIGFuIG9iamVjdCAobWVzaClcbiAgICogQHBhcmFtIHs/bnVtYmVyfSB3IC0gVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSBib2R5XG4gICAqIEBwYXJhbSB7P251bWJlcn0gaCAtIFRoZSBoZWlnaHQgb2YgdGhlIHBhcnRpY2xlIGJvZHlcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihib2R5LCB3LCBoLCBpc0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjb250ZW50IGZvciB0aGUgcGFydGljbGUgYm9keVxuICAgICAqIEB0eXBlIHtBcnJheVNwYW59XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gY3JlYXRlQXJyYXlTcGFuKGJvZHkpO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIHdpZHRoIG9mIHRoZSBwYXJ0aWNsZSBCb2R5XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLncgPSB3O1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgQm9keVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5oID0gaCB8fCB3O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCBib2R5LlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBpbml0aWFsaXplIHRoZSBwcm9wZXJ0eSBvblxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICB2YXIgYm9keSA9IHRoaXMuYm9keS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHRoaXMudykge1xuICAgICAgcGFydGljbGUuYm9keSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMudyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmgsXG4gICAgICAgIGJvZHk6IGJvZHksXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gYm9keTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIEJvZHkgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uYm9keSAtIFRoZSBjb2xvciBmb3IgdGhlIHBhcnRpY2xlIGJvZHlcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ud2lkdGggLSBUaGUgd2lkdGggb2YgdGhlIHBhcnRpY2xlIGJvZHlcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uaGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgcGFydGljbGUgYm9keVxuICAgKiBAcmV0dXJuIHtCb2R5fVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB7IGJvZHksIHdpZHRoLCBoZWlnaHQsIGlzRW5hYmxlZCA9IHRydWUgfSA9IGpzb247XG5cbiAgICByZXR1cm4gbmV3IEJvZHkoYm9keSwgd2lkdGgsIGhlaWdodCwgaXNFbmFibGVkKTtcbiAgfVxufVxuIl19