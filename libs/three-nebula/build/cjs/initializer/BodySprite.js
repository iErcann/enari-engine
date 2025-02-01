"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _constants = require("./constants");

var _Initializer2 = _interopRequireDefault(require("./Initializer"));

var _types = require("./types");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Sets the body property to be a THREE.Sprite on initialized particles.
 *
 * NOTE The texture map MUST be set on the SpriteMaterial in the TextureLoader.load
 * callback. Not doing so will cause WebGL buffer errors.
 */
var BodySprite = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(BodySprite, _Initializer);

  var _super = _createSuper(BodySprite);

  /**
   * Constructs a BodySprite initializer.
   *
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} texture - The sprite texture
   * @param {object} materialProperties - The sprite material properties
   * @throws {Error} If the TextureLoader fails to load the supplied texture
   * @return void
   */
  function BodySprite(THREE, texture) {
    var _this;

    var materialProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_MATERIAL_PROPERTIES;
    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, BodySprite);
    _this = _super.call(this, _types.INITIALIZER_TYPE_BODY_SPRITE, isEnabled);
    var Sprite = THREE.Sprite,
        SpriteMaterial = THREE.SpriteMaterial,
        TextureLoader = THREE.TextureLoader;
    /**
     * @desc The material properties for this object's SpriteMaterial
     * NOTE This is required for testing purposes
     * @type {object}
     */

    _this.materialProperties = (0, _utils.withDefaults)(_constants.DEFAULT_MATERIAL_PROPERTIES, materialProperties);
    new TextureLoader().load(texture, function (map) {
      /**
       * @desc The texture for the THREE.SpriteMaterial map.
       * @type {Texture}
       */
      _this.texture = map;
      /**
       * @desc THREE.SpriteMaterial instance.
       * @type {SpriteMaterial}
       */

      _this.material = new SpriteMaterial(_objectSpread(_objectSpread({}, {
        map: map
      }), _this.materialProperties));
      /**
       * @desc THREE.Sprite instance.
       * @type {Sprite}
       */

      _this.sprite = new Sprite(_this.material);
    }, undefined, function (error) {
      throw new Error(error);
    });
    return _this;
  }
  /**
   * Sets the particle body to the sprite.
   *
   * @param {Particle} particle - The particle to set the body of
   * @return void
   */


  (0, _createClass2["default"])(BodySprite, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.body = this.sprite;
    }
    /**
     * Creates a BodySprite initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from
     * @param {object} THREE - The Web GL API we are using eg., THREE
     * @param {string} json.texture - The sprite texture
     * @param {object} json.materialProperties - The sprite material properties
     * @return {BodySprite}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json, THREE) {
      var texture = json.texture,
          _json$materialPropert = json.materialProperties,
          materialProperties = _json$materialPropert === void 0 ? _constants.DEFAULT_JSON_MATERIAL_PROPERTIES : _json$materialPropert,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;

      var ensureMappedBlendingMode = function ensureMappedBlendingMode(properties) {
        var blending = properties.blending;
        return _objectSpread(_objectSpread({}, properties), {}, {
          blending: blending ? _constants.SUPPORTED_MATERIAL_BLENDING_MODES[blending] : _constants.SUPPORTED_MATERIAL_BLENDING_MODES[_constants.DEFAULT_JSON_MATERIAL_PROPERTIES.blending]
        });
      };

      return new BodySprite(THREE, texture, (0, _utils.withDefaults)(_constants.DEFAULT_JSON_MATERIAL_PROPERTIES, ensureMappedBlendingMode(materialProperties)), isEnabled);
    }
  }]);
  return BodySprite;
}(_Initializer2["default"]);

exports["default"] = BodySprite;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Cb2R5U3ByaXRlLmpzIl0sIm5hbWVzIjpbIkJvZHlTcHJpdGUiLCJUSFJFRSIsInRleHR1cmUiLCJtYXRlcmlhbFByb3BlcnRpZXMiLCJERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMiLCJpc0VuYWJsZWQiLCJ0eXBlIiwiU3ByaXRlIiwiU3ByaXRlTWF0ZXJpYWwiLCJUZXh0dXJlTG9hZGVyIiwibG9hZCIsIm1hcCIsIm1hdGVyaWFsIiwic3ByaXRlIiwidW5kZWZpbmVkIiwiZXJyb3IiLCJFcnJvciIsInBhcnRpY2xlIiwiYm9keSIsImpzb24iLCJERUZBVUxUX0pTT05fTUFURVJJQUxfUFJPUEVSVElFUyIsImVuc3VyZU1hcHBlZEJsZW5kaW5nTW9kZSIsInByb3BlcnRpZXMiLCJibGVuZGluZyIsIlNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFUyIsIkluaXRpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFNQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsVTs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Usc0JBQ0VDLEtBREYsRUFFRUMsT0FGRixFQUtFO0FBQUE7O0FBQUEsUUFGQUMsa0JBRUEsdUVBRnFCQyxzQ0FFckI7QUFBQSxRQURBQyxTQUNBLHVFQURZLElBQ1o7QUFBQTtBQUNBLDhCQUFNQyxtQ0FBTixFQUFZRCxTQUFaO0FBREEsUUFHUUUsTUFIUixHQUdrRE4sS0FIbEQsQ0FHUU0sTUFIUjtBQUFBLFFBR2dCQyxjQUhoQixHQUdrRFAsS0FIbEQsQ0FHZ0JPLGNBSGhCO0FBQUEsUUFHZ0NDLGFBSGhDLEdBR2tEUixLQUhsRCxDQUdnQ1EsYUFIaEM7QUFLQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUNJLFVBQUtOLGtCQUFMLEdBQTBCLHlCQUN4QkMsc0NBRHdCLEVBRXhCRCxrQkFGd0IsQ0FBMUI7QUFLQSxRQUFJTSxhQUFKLEdBQW9CQyxJQUFwQixDQUNFUixPQURGLEVBRUUsVUFBQVMsR0FBRyxFQUFJO0FBQ0w7QUFDUjtBQUNBO0FBQ0E7QUFDUSxZQUFLVCxPQUFMLEdBQWVTLEdBQWY7QUFFQTtBQUNSO0FBQ0E7QUFDQTs7QUFDUSxZQUFLQyxRQUFMLEdBQWdCLElBQUlKLGNBQUosaUNBQ1g7QUFBRUcsUUFBQUEsR0FBRyxFQUFIQTtBQUFGLE9BRFcsR0FFWCxNQUFLUixrQkFGTSxFQUFoQjtBQUtBO0FBQ1I7QUFDQTtBQUNBOztBQUNRLFlBQUtVLE1BQUwsR0FBYyxJQUFJTixNQUFKLENBQVcsTUFBS0ssUUFBaEIsQ0FBZDtBQUNELEtBdkJILEVBd0JFRSxTQXhCRixFQXlCRSxVQUFBQyxLQUFLLEVBQUk7QUFDUCxZQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0QsS0EzQkg7QUFmQTtBQTRDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7K0JBQ2FFLFEsRUFBVTtBQUNuQkEsTUFBQUEsUUFBUSxDQUFDQyxJQUFULEdBQWdCLEtBQUtMLE1BQXJCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NkJBQ2tCTSxJLEVBQU1sQixLLEVBQU87QUFBQSxVQUV6QkMsT0FGeUIsR0FLdkJpQixJQUx1QixDQUV6QmpCLE9BRnlCO0FBQUEsa0NBS3ZCaUIsSUFMdUIsQ0FHekJoQixrQkFIeUI7QUFBQSxVQUd6QkEsa0JBSHlCLHNDQUdKaUIsMkNBSEk7QUFBQSw0QkFLdkJELElBTHVCLENBSXpCZCxTQUp5QjtBQUFBLFVBSXpCQSxTQUp5QixnQ0FJYixJQUphOztBQU8zQixVQUFNZ0Isd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUEyQixDQUFBQyxVQUFVLEVBQUk7QUFBQSxZQUNyQ0MsUUFEcUMsR0FDeEJELFVBRHdCLENBQ3JDQyxRQURxQztBQUc3QywrQ0FDS0QsVUFETDtBQUVFQyxVQUFBQSxRQUFRLEVBQUVBLFFBQVEsR0FDZEMsNkNBQWtDRCxRQUFsQyxDQURjLEdBRWRDLDZDQUNBSiw0Q0FBaUNHLFFBRGpDO0FBSk47QUFRRCxPQVhEOztBQWFBLGFBQU8sSUFBSXZCLFVBQUosQ0FDTEMsS0FESyxFQUVMQyxPQUZLLEVBR0wseUJBQ0VrQiwyQ0FERixFQUVFQyx3QkFBd0IsQ0FBQ2xCLGtCQUFELENBRjFCLENBSEssRUFPTEUsU0FQSyxDQUFQO0FBU0Q7OztFQTdHcUNvQix3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxuICBERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMsXG4gIFNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5pbXBvcnQgSW5pdGlhbGl6ZXIgZnJvbSAnLi9Jbml0aWFsaXplcic7XG5pbXBvcnQgeyBJTklUSUFMSVpFUl9UWVBFX0JPRFlfU1BSSVRFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHdpdGhEZWZhdWx0cyB9IGZyb20gJy4uL3V0aWxzJztcblxuLyoqXG4gKiBTZXRzIHRoZSBib2R5IHByb3BlcnR5IHRvIGJlIGEgVEhSRUUuU3ByaXRlIG9uIGluaXRpYWxpemVkIHBhcnRpY2xlcy5cbiAqXG4gKiBOT1RFIFRoZSB0ZXh0dXJlIG1hcCBNVVNUIGJlIHNldCBvbiB0aGUgU3ByaXRlTWF0ZXJpYWwgaW4gdGhlIFRleHR1cmVMb2FkZXIubG9hZFxuICogY2FsbGJhY2suIE5vdCBkb2luZyBzbyB3aWxsIGNhdXNlIFdlYkdMIGJ1ZmZlciBlcnJvcnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHlTcHJpdGUgZXh0ZW5kcyBJbml0aWFsaXplciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgQm9keVNwcml0ZSBpbml0aWFsaXplci5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFRIUkVFIC0gVGhlIFdlYiBHTCBBUEkgd2UgYXJlIHVzaW5nIGVnLiwgVEhSRUVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHR1cmUgLSBUaGUgc3ByaXRlIHRleHR1cmVcbiAgICogQHBhcmFtIHtvYmplY3R9IG1hdGVyaWFsUHJvcGVydGllcyAtIFRoZSBzcHJpdGUgbWF0ZXJpYWwgcHJvcGVydGllc1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIFRleHR1cmVMb2FkZXIgZmFpbHMgdG8gbG9hZCB0aGUgc3VwcGxpZWQgdGV4dHVyZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIFRIUkVFLFxuICAgIHRleHR1cmUsXG4gICAgbWF0ZXJpYWxQcm9wZXJ0aWVzID0gREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTLFxuICAgIGlzRW5hYmxlZCA9IHRydWVcbiAgKSB7XG4gICAgc3VwZXIodHlwZSwgaXNFbmFibGVkKTtcblxuICAgIGNvbnN0IHsgU3ByaXRlLCBTcHJpdGVNYXRlcmlhbCwgVGV4dHVyZUxvYWRlciB9ID0gVEhSRUU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgbWF0ZXJpYWwgcHJvcGVydGllcyBmb3IgdGhpcyBvYmplY3QncyBTcHJpdGVNYXRlcmlhbFxuICAgICAqIE5PVEUgVGhpcyBpcyByZXF1aXJlZCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5tYXRlcmlhbFByb3BlcnRpZXMgPSB3aXRoRGVmYXVsdHMoXG4gICAgICBERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMsXG4gICAgICBtYXRlcmlhbFByb3BlcnRpZXNcbiAgICApO1xuXG4gICAgbmV3IFRleHR1cmVMb2FkZXIoKS5sb2FkKFxuICAgICAgdGV4dHVyZSxcbiAgICAgIG1hcCA9PiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzYyBUaGUgdGV4dHVyZSBmb3IgdGhlIFRIUkVFLlNwcml0ZU1hdGVyaWFsIG1hcC5cbiAgICAgICAgICogQHR5cGUge1RleHR1cmV9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRleHR1cmUgPSBtYXA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjIFRIUkVFLlNwcml0ZU1hdGVyaWFsIGluc3RhbmNlLlxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlTWF0ZXJpYWx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFNwcml0ZU1hdGVyaWFsKHtcbiAgICAgICAgICAuLi57IG1hcCB9LFxuICAgICAgICAgIC4uLnRoaXMubWF0ZXJpYWxQcm9wZXJ0aWVzLFxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2MgVEhSRUUuU3ByaXRlIGluc3RhbmNlLlxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMubWF0ZXJpYWwpO1xuICAgICAgfSxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBhcnRpY2xlIGJvZHkgdG8gdGhlIHNwcml0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJ0aWNsZX0gcGFydGljbGUgLSBUaGUgcGFydGljbGUgdG8gc2V0IHRoZSBib2R5IG9mXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnNwcml0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQm9keVNwcml0ZSBpbml0aWFsaXplciBmcm9tIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY29uc3RydWN0IHRoZSBpbnN0YW5jZSBmcm9tXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRoZSBXZWIgR0wgQVBJIHdlIGFyZSB1c2luZyBlZy4sIFRIUkVFXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBqc29uLnRleHR1cmUgLSBUaGUgc3ByaXRlIHRleHR1cmVcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24ubWF0ZXJpYWxQcm9wZXJ0aWVzIC0gVGhlIHNwcml0ZSBtYXRlcmlhbCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm4ge0JvZHlTcHJpdGV9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbiwgVEhSRUUpIHtcbiAgICBjb25zdCB7XG4gICAgICB0ZXh0dXJlLFxuICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzID0gREVGQVVMVF9KU09OX01BVEVSSUFMX1BST1BFUlRJRVMsXG4gICAgICBpc0VuYWJsZWQgPSB0cnVlLFxuICAgIH0gPSBqc29uO1xuXG4gICAgY29uc3QgZW5zdXJlTWFwcGVkQmxlbmRpbmdNb2RlID0gcHJvcGVydGllcyA9PiB7XG4gICAgICBjb25zdCB7IGJsZW5kaW5nIH0gPSBwcm9wZXJ0aWVzO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcm9wZXJ0aWVzLFxuICAgICAgICBibGVuZGluZzogYmxlbmRpbmdcbiAgICAgICAgICA/IFNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFU1tibGVuZGluZ11cbiAgICAgICAgICA6IFNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFU1tcbiAgICAgICAgICAgIERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLmJsZW5kaW5nXG4gICAgICAgICAgXSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgQm9keVNwcml0ZShcbiAgICAgIFRIUkVFLFxuICAgICAgdGV4dHVyZSxcbiAgICAgIHdpdGhEZWZhdWx0cyhcbiAgICAgICAgREVGQVVMVF9KU09OX01BVEVSSUFMX1BST1BFUlRJRVMsXG4gICAgICAgIGVuc3VyZU1hcHBlZEJsZW5kaW5nTW9kZShtYXRlcmlhbFByb3BlcnRpZXMpXG4gICAgICApLFxuICAgICAgaXNFbmFibGVkXG4gICAgKTtcbiAgfVxufVxuIl19