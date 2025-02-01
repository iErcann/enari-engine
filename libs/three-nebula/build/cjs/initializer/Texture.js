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
 * Sets the body property to be a THREE.Sprite with a texture map on initialized particles.
 *
 */
var Texture = /*#__PURE__*/function (_Initializer) {
  (0, _inherits2["default"])(Texture, _Initializer);

  var _super = _createSuper(Texture);

  /**
   * Constructs an Texture initializer.
   *
   * @param {object} THREE - The Web GL API we are using eg., THREE
   * @param {string} texture - The sprite texture
   * @param {object|undefined} materialProperties - The sprite material properties
   * @param {?Texture} loadedTexture - Preloaded THREE.Texture instance
   */
  function Texture(THREE, loadedTexture) {
    var _this;

    var materialProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.DEFAULT_MATERIAL_PROPERTIES;
    var isEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classCallCheck2["default"])(this, Texture);
    _this = _super.call(this, _types.INITIALIZER_TYPE_TEXTURE, isEnabled);
    var Sprite = THREE.Sprite,
        SpriteMaterial = THREE.SpriteMaterial;
    /**
     * @desc The material properties for this object's SpriteMaterial
     * NOTE This is required for testing purposes
     * @type {object}
     */

    _this.materialProperties = (0, _utils.withDefaults)(_constants.DEFAULT_MATERIAL_PROPERTIES, materialProperties);
    /**
     * @desc The texture for the THREE.SpriteMaterial map.
     * @type {Texture}
     */

    _this.texture = loadedTexture;
    /**
     * @desc THREE.SpriteMaterial instance.
     * @type {SpriteMaterial}
     */

    _this.material = new SpriteMaterial(_objectSpread(_objectSpread({}, {
      map: loadedTexture
    }), _this.materialProperties));
    /**
     * @desc THREE.Sprite instance.
     * @type {Sprite}
     */

    _this.sprite = new Sprite(_this.material);
    return _this;
  }
  /**
   * Sets the particle body to the sprite.
   *
   * @param {Particle} particle - The particle to set the body of
   * @return void
   */


  (0, _createClass2["default"])(Texture, [{
    key: "initialize",
    value: function initialize(particle) {
      particle.body = this.sprite;
    }
    /**
     * Creates a Texture initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from
     * @param {object} THREE - The Web GL API we are using eg., THREE
     * @param {Texture} json.loadedTexture - The loaded sprite texture
     * @param {object} json.materialProperties - The sprite material properties
     * @return {BodySprite}
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json, THREE) {
      var loadedTexture = json.loadedTexture,
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

      return new Texture(THREE, loadedTexture, (0, _utils.withDefaults)(_constants.DEFAULT_JSON_MATERIAL_PROPERTIES, ensureMappedBlendingMode(materialProperties)), isEnabled);
    }
  }]);
  return Texture;
}(_Initializer2["default"]);

exports["default"] = Texture;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9UZXh0dXJlLmpzIl0sIm5hbWVzIjpbIlRleHR1cmUiLCJUSFJFRSIsImxvYWRlZFRleHR1cmUiLCJtYXRlcmlhbFByb3BlcnRpZXMiLCJERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMiLCJpc0VuYWJsZWQiLCJ0eXBlIiwiU3ByaXRlIiwiU3ByaXRlTWF0ZXJpYWwiLCJ0ZXh0dXJlIiwibWF0ZXJpYWwiLCJtYXAiLCJzcHJpdGUiLCJwYXJ0aWNsZSIsImJvZHkiLCJqc29uIiwiREVGQVVMVF9KU09OX01BVEVSSUFMX1BST1BFUlRJRVMiLCJlbnN1cmVNYXBwZWRCbGVuZGluZ01vZGUiLCJwcm9wZXJ0aWVzIiwiYmxlbmRpbmciLCJTVVBQT1JURURfTUFURVJJQUxfQkxFTkRJTkdfTU9ERVMiLCJJbml0aWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBTUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLG1CQUNFQyxLQURGLEVBRUVDLGFBRkYsRUFLRTtBQUFBOztBQUFBLFFBRkFDLGtCQUVBLHVFQUZxQkMsc0NBRXJCO0FBQUEsUUFEQUMsU0FDQSx1RUFEWSxJQUNaO0FBQUE7QUFDQSw4QkFBTUMsK0JBQU4sRUFBWUQsU0FBWjtBQURBLFFBR1FFLE1BSFIsR0FHbUNOLEtBSG5DLENBR1FNLE1BSFI7QUFBQSxRQUdnQkMsY0FIaEIsR0FHbUNQLEtBSG5DLENBR2dCTyxjQUhoQjtBQUtBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksVUFBS0wsa0JBQUwsR0FBMEIseUJBQ3hCQyxzQ0FEd0IsRUFFeEJELGtCQUZ3QixDQUExQjtBQUtBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtNLE9BQUwsR0FBZVAsYUFBZjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtRLFFBQUwsR0FBZ0IsSUFBSUYsY0FBSixpQ0FDWDtBQUFFRyxNQUFBQSxHQUFHLEVBQUVUO0FBQVAsS0FEVyxHQUVYLE1BQUtDLGtCQUZNLEVBQWhCO0FBS0E7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksVUFBS1MsTUFBTCxHQUFjLElBQUlMLE1BQUosQ0FBVyxNQUFLRyxRQUFoQixDQUFkO0FBbENBO0FBbUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzsrQkFDYUcsUSxFQUFVO0FBQ25CQSxNQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0IsS0FBS0YsTUFBckI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDa0JHLEksRUFBTWQsSyxFQUFPO0FBQUEsVUFFekJDLGFBRnlCLEdBS3ZCYSxJQUx1QixDQUV6QmIsYUFGeUI7QUFBQSxrQ0FLdkJhLElBTHVCLENBR3pCWixrQkFIeUI7QUFBQSxVQUd6QkEsa0JBSHlCLHNDQUdKYSwyQ0FISTtBQUFBLDRCQUt2QkQsSUFMdUIsQ0FJekJWLFNBSnlCO0FBQUEsVUFJekJBLFNBSnlCLGdDQUliLElBSmE7O0FBTzNCLFVBQU1ZLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBQUMsVUFBVSxFQUFJO0FBQUEsWUFDckNDLFFBRHFDLEdBQ3hCRCxVQUR3QixDQUNyQ0MsUUFEcUM7QUFHN0MsK0NBQ0tELFVBREw7QUFFRUMsVUFBQUEsUUFBUSxFQUFFQSxRQUFRLEdBQ2RDLDZDQUFrQ0QsUUFBbEMsQ0FEYyxHQUVkQyw2Q0FDQUosNENBQWlDRyxRQURqQztBQUpOO0FBUUQsT0FYRDs7QUFhQSxhQUFPLElBQUluQixPQUFKLENBQ0xDLEtBREssRUFFTEMsYUFGSyxFQUdMLHlCQUNFYywyQ0FERixFQUVFQyx3QkFBd0IsQ0FBQ2Qsa0JBQUQsQ0FGMUIsQ0FISyxFQU9MRSxTQVBLLENBQVA7QUFTRDs7O0VBbkdrQ2dCLHdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgREVGQVVMVF9KU09OX01BVEVSSUFMX1BST1BFUlRJRVMsXG4gIERFRkFVTFRfTUFURVJJQUxfUFJPUEVSVElFUyxcbiAgU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmltcG9ydCBJbml0aWFsaXplciBmcm9tICcuL0luaXRpYWxpemVyJztcbmltcG9ydCB7IElOSVRJQUxJWkVSX1RZUEVfVEVYVFVSRSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyB3aXRoRGVmYXVsdHMgfSBmcm9tICcuLi91dGlscyc7XG5cbi8qKlxuICogU2V0cyB0aGUgYm9keSBwcm9wZXJ0eSB0byBiZSBhIFRIUkVFLlNwcml0ZSB3aXRoIGEgdGV4dHVyZSBtYXAgb24gaW5pdGlhbGl6ZWQgcGFydGljbGVzLlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dHVyZSBleHRlbmRzIEluaXRpYWxpemVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYW4gVGV4dHVyZSBpbml0aWFsaXplci5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFRIUkVFIC0gVGhlIFdlYiBHTCBBUEkgd2UgYXJlIHVzaW5nIGVnLiwgVEhSRUVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHR1cmUgLSBUaGUgc3ByaXRlIHRleHR1cmVcbiAgICogQHBhcmFtIHtvYmplY3R8dW5kZWZpbmVkfSBtYXRlcmlhbFByb3BlcnRpZXMgLSBUaGUgc3ByaXRlIG1hdGVyaWFsIHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHs/VGV4dHVyZX0gbG9hZGVkVGV4dHVyZSAtIFByZWxvYWRlZCBUSFJFRS5UZXh0dXJlIGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBUSFJFRSxcbiAgICBsb2FkZWRUZXh0dXJlLFxuICAgIG1hdGVyaWFsUHJvcGVydGllcyA9IERFRkFVTFRfTUFURVJJQUxfUFJPUEVSVElFUyxcbiAgICBpc0VuYWJsZWQgPSB0cnVlXG4gICkge1xuICAgIHN1cGVyKHR5cGUsIGlzRW5hYmxlZCk7XG5cbiAgICBjb25zdCB7IFNwcml0ZSwgU3ByaXRlTWF0ZXJpYWwgfSA9IFRIUkVFO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIG1hdGVyaWFsIHByb3BlcnRpZXMgZm9yIHRoaXMgb2JqZWN0J3MgU3ByaXRlTWF0ZXJpYWxcbiAgICAgKiBOT1RFIFRoaXMgaXMgcmVxdWlyZWQgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMubWF0ZXJpYWxQcm9wZXJ0aWVzID0gd2l0aERlZmF1bHRzKFxuICAgICAgREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTLFxuICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSB0ZXh0dXJlIGZvciB0aGUgVEhSRUUuU3ByaXRlTWF0ZXJpYWwgbWFwLlxuICAgICAqIEB0eXBlIHtUZXh0dXJlfVxuICAgICAqL1xuICAgIHRoaXMudGV4dHVyZSA9IGxvYWRlZFRleHR1cmU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUSFJFRS5TcHJpdGVNYXRlcmlhbCBpbnN0YW5jZS5cbiAgICAgKiBAdHlwZSB7U3ByaXRlTWF0ZXJpYWx9XG4gICAgICovXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBTcHJpdGVNYXRlcmlhbCh7XG4gICAgICAuLi57IG1hcDogbG9hZGVkVGV4dHVyZSB9LFxuICAgICAgLi4udGhpcy5tYXRlcmlhbFByb3BlcnRpZXMsXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUSFJFRS5TcHJpdGUgaW5zdGFuY2UuXG4gICAgICogQHR5cGUge1Nwcml0ZX1cbiAgICAgKi9cbiAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUodGhpcy5tYXRlcmlhbCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFydGljbGUgYm9keSB0byB0aGUgc3ByaXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0byBzZXQgdGhlIGJvZHkgb2ZcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMuc3ByaXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBUZXh0dXJlIGluaXRpYWxpemVyIGZyb20gSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGpzb24gLSBUaGUgSlNPTiB0byBjb25zdHJ1Y3QgdGhlIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtvYmplY3R9IFRIUkVFIC0gVGhlIFdlYiBHTCBBUEkgd2UgYXJlIHVzaW5nIGVnLiwgVEhSRUVcbiAgICogQHBhcmFtIHtUZXh0dXJlfSBqc29uLmxvYWRlZFRleHR1cmUgLSBUaGUgbG9hZGVkIHNwcml0ZSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uLm1hdGVyaWFsUHJvcGVydGllcyAtIFRoZSBzcHJpdGUgbWF0ZXJpYWwgcHJvcGVydGllc1xuICAgKiBAcmV0dXJuIHtCb2R5U3ByaXRlfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU09OKGpzb24sIFRIUkVFKSB7XG4gICAgY29uc3Qge1xuICAgICAgbG9hZGVkVGV4dHVyZSxcbiAgICAgIG1hdGVyaWFsUHJvcGVydGllcyA9IERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxuICAgICAgaXNFbmFibGVkID0gdHJ1ZSxcbiAgICB9ID0ganNvbjtcblxuICAgIGNvbnN0IGVuc3VyZU1hcHBlZEJsZW5kaW5nTW9kZSA9IHByb3BlcnRpZXMgPT4ge1xuICAgICAgY29uc3QgeyBibGVuZGluZyB9ID0gcHJvcGVydGllcztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucHJvcGVydGllcyxcbiAgICAgICAgYmxlbmRpbmc6IGJsZW5kaW5nXG4gICAgICAgICAgPyBTVVBQT1JURURfTUFURVJJQUxfQkxFTkRJTkdfTU9ERVNbYmxlbmRpbmddXG4gICAgICAgICAgOiBTVVBQT1JURURfTUFURVJJQUxfQkxFTkRJTkdfTU9ERVNbXG4gICAgICAgICAgICBERUZBVUxUX0pTT05fTUFURVJJQUxfUFJPUEVSVElFUy5ibGVuZGluZ1xuICAgICAgICAgIF0sXG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFRleHR1cmUoXG4gICAgICBUSFJFRSxcbiAgICAgIGxvYWRlZFRleHR1cmUsXG4gICAgICB3aXRoRGVmYXVsdHMoXG4gICAgICAgIERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTLFxuICAgICAgICBlbnN1cmVNYXBwZWRCbGVuZGluZ01vZGUobWF0ZXJpYWxQcm9wZXJ0aWVzKVxuICAgICAgKSxcbiAgICAgIGlzRW5hYmxlZFxuICAgICk7XG4gIH1cbn1cbiJdfQ==