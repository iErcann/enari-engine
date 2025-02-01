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

var _math = require("../math");

var _Behaviour2 = _interopRequireDefault(require("./Behaviour"));

var _utils = require("../utils");

var _ease = require("../ease");

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * A behaviour which mutates the color of a particle over time.
 *
 */
var Color = /*#__PURE__*/function (_Behaviour) {
  (0, _inherits2["default"])(Color, _Behaviour);

  var _super = _createSuper(Color);

  /**
   * Constructs a Color behaviour instance.
   *
   * @param {number|string} colorA - the starting color
   * @param {number|string} colorB - the ending color
   * @param {number} life - the life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  function Color(colorA, colorB, life, easing) {
    var _this;

    var isEnabled = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    (0, _classCallCheck2["default"])(this, Color);
    _this = _super.call(this, life, easing, _types.BEHAVIOUR_TYPE_COLOR, isEnabled);

    _this.reset(colorA, colorB);

    return _this;
  }
  /**
   * Gets the _same property which determines if the alpha are the same.
   *
   * @return {boolean}
   */


  (0, _createClass2["default"])(Color, [{
    key: "reset",
    value: function reset(colorA, colorB, life, easing) {
      this.same = colorB === null || colorB === undefined ? true : false;
      this.colorA = (0, _math.createColorSpan)(colorA);
      this.colorB = (0, _math.createColorSpan)(colorB);
      life && (0, _get2["default"])((0, _getPrototypeOf2["default"])(Color.prototype), "reset", this).call(this, life, easing);
    }
  }, {
    key: "initialize",
    value: function initialize(particle) {
      particle.transform.colorA = _utils.ColorUtil.getRGB(this.colorA.getValue());
      particle.useColor = true;
      particle.transform.colorB = this.same ? particle.transform.colorA : _utils.ColorUtil.getRGB(this.colorB.getValue());
    }
  }, {
    key: "mutate",
    value: function mutate(particle, time, index) {
      this.energize(particle, time, index);

      if (!this._same) {
        particle.color.r = _math.MathUtils.lerp(particle.transform.colorA.r, particle.transform.colorB.r, this.energy);
        particle.color.g = _math.MathUtils.lerp(particle.transform.colorA.g, particle.transform.colorB.g, this.energy);
        particle.color.b = _math.MathUtils.lerp(particle.transform.colorA.b, particle.transform.colorB.b, this.energy);
      } else {
        particle.color.r = particle.transform.colorA.r;
        particle.color.g = particle.transform.colorA.g;
        particle.color.b = particle.transform.colorA.b;
      }
    }
    /**
     * Creates a Color initializer from JSON.
     *
     * @param {object} json - The JSON to construct the instance from.
     * @property {number} json.colorA - The starting color
     * @property {number} json.colorB - The ending color
     * @property {number} json.life - The life of the particle
     * @property {string} json.easing - The behaviour's decaying trend
     * @return {Color}
     */

  }, {
    key: "same",
    get: function get() {
      return this._same;
    }
    /**
     * Sets the _same property which determines if the alpha are the same.
     *
     * @param {boolean} same
     * @return {boolean}
     */
    ,
    set: function set(same) {
      /**
       * @type {boolean}
       */
      this._same = same;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var colorA = json.colorA,
          colorB = json.colorB,
          life = json.life,
          easing = json.easing,
          _json$isEnabled = json.isEnabled,
          isEnabled = _json$isEnabled === void 0 ? true : _json$isEnabled;
      return new Color(colorA, colorB, life, (0, _ease.getEasingByName)(easing), isEnabled);
    }
  }]);
  return Color;
}(_Behaviour2["default"]);

exports["default"] = Color;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQ29sb3IuanMiXSwibmFtZXMiOlsiQ29sb3IiLCJjb2xvckEiLCJjb2xvckIiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwidHlwZSIsInJlc2V0Iiwic2FtZSIsInVuZGVmaW5lZCIsInBhcnRpY2xlIiwidHJhbnNmb3JtIiwiQ29sb3JVdGlsIiwiZ2V0UkdCIiwiZ2V0VmFsdWUiLCJ1c2VDb2xvciIsInRpbWUiLCJpbmRleCIsImVuZXJnaXplIiwiX3NhbWUiLCJjb2xvciIsInIiLCJNYXRoVXRpbHMiLCJsZXJwIiwiZW5lcmd5IiwiZyIsImIiLCJqc29uIiwiQmVoYXZpb3VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLEs7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsaUJBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxJQUE1QixFQUFrQ0MsTUFBbEMsRUFBNEQ7QUFBQTs7QUFBQSxRQUFsQkMsU0FBa0IsdUVBQU4sSUFBTTtBQUFBO0FBQzFELDhCQUFNRixJQUFOLEVBQVlDLE1BQVosRUFBb0JFLDJCQUFwQixFQUEwQkQsU0FBMUI7O0FBRUEsVUFBS0UsS0FBTCxDQUFXTixNQUFYLEVBQW1CQyxNQUFuQjs7QUFIMEQ7QUFJM0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OzswQkFrQlFELE0sRUFBUUMsTSxFQUFRQyxJLEVBQU1DLE0sRUFBUTtBQUNsQyxXQUFLSSxJQUFMLEdBQVlOLE1BQU0sS0FBSyxJQUFYLElBQW1CQSxNQUFNLEtBQUtPLFNBQTlCLEdBQTBDLElBQTFDLEdBQWlELEtBQTdEO0FBRUEsV0FBS1IsTUFBTCxHQUFjLDJCQUFnQkEsTUFBaEIsQ0FBZDtBQUNBLFdBQUtDLE1BQUwsR0FBYywyQkFBZ0JBLE1BQWhCLENBQWQ7QUFDQUMsTUFBQUEsSUFBSSx1R0FBZ0JBLElBQWhCLEVBQXNCQyxNQUF0QixDQUFKO0FBQ0Q7OzsrQkFFVU0sUSxFQUFVO0FBQ25CQSxNQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJWLE1BQW5CLEdBQTRCVyxpQkFBVUMsTUFBVixDQUFpQixLQUFLWixNQUFMLENBQVlhLFFBQVosRUFBakIsQ0FBNUI7QUFFQUosTUFBQUEsUUFBUSxDQUFDSyxRQUFULEdBQW9CLElBQXBCO0FBQ0FMLE1BQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlQsTUFBbkIsR0FBNEIsS0FBS00sSUFBTCxHQUN4QkUsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQURLLEdBRXhCVyxpQkFBVUMsTUFBVixDQUFpQixLQUFLWCxNQUFMLENBQVlZLFFBQVosRUFBakIsQ0FGSjtBQUdEOzs7MkJBRU1KLFEsRUFBVU0sSSxFQUFNQyxLLEVBQU87QUFDNUIsV0FBS0MsUUFBTCxDQUFjUixRQUFkLEVBQXdCTSxJQUF4QixFQUE4QkMsS0FBOUI7O0FBRUEsVUFBSSxDQUFDLEtBQUtFLEtBQVYsRUFBaUI7QUFDZlQsUUFBQUEsUUFBUSxDQUFDVSxLQUFULENBQWVDLENBQWYsR0FBbUJDLGdCQUFVQyxJQUFWLENBQ2pCYixRQUFRLENBQUNDLFNBQVQsQ0FBbUJWLE1BQW5CLENBQTBCb0IsQ0FEVCxFQUVqQlgsUUFBUSxDQUFDQyxTQUFULENBQW1CVCxNQUFuQixDQUEwQm1CLENBRlQsRUFHakIsS0FBS0csTUFIWSxDQUFuQjtBQUtBZCxRQUFBQSxRQUFRLENBQUNVLEtBQVQsQ0FBZUssQ0FBZixHQUFtQkgsZ0JBQVVDLElBQVYsQ0FDakJiLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlYsTUFBbkIsQ0FBMEJ3QixDQURULEVBRWpCZixRQUFRLENBQUNDLFNBQVQsQ0FBbUJULE1BQW5CLENBQTBCdUIsQ0FGVCxFQUdqQixLQUFLRCxNQUhZLENBQW5CO0FBS0FkLFFBQUFBLFFBQVEsQ0FBQ1UsS0FBVCxDQUFlTSxDQUFmLEdBQW1CSixnQkFBVUMsSUFBVixDQUNqQmIsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQUFuQixDQUEwQnlCLENBRFQsRUFFakJoQixRQUFRLENBQUNDLFNBQVQsQ0FBbUJULE1BQW5CLENBQTBCd0IsQ0FGVCxFQUdqQixLQUFLRixNQUhZLENBQW5CO0FBS0QsT0FoQkQsTUFnQk87QUFDTGQsUUFBQUEsUUFBUSxDQUFDVSxLQUFULENBQWVDLENBQWYsR0FBbUJYLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQlYsTUFBbkIsQ0FBMEJvQixDQUE3QztBQUNBWCxRQUFBQSxRQUFRLENBQUNVLEtBQVQsQ0FBZUssQ0FBZixHQUFtQmYsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQUFuQixDQUEwQndCLENBQTdDO0FBQ0FmLFFBQUFBLFFBQVEsQ0FBQ1UsS0FBVCxDQUFlTSxDQUFmLEdBQW1CaEIsUUFBUSxDQUFDQyxTQUFULENBQW1CVixNQUFuQixDQUEwQnlCLENBQTdDO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O3dCQXJFYTtBQUNULGFBQU8sS0FBS1AsS0FBWjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztzQkFDV1gsSSxFQUFNO0FBQ2I7QUFDSjtBQUNBO0FBQ0ksV0FBS1csS0FBTCxHQUFhWCxJQUFiO0FBQ0Q7Ozs2QkF1RGVtQixJLEVBQU07QUFBQSxVQUNaMUIsTUFEWSxHQUN1QzBCLElBRHZDLENBQ1oxQixNQURZO0FBQUEsVUFDSkMsTUFESSxHQUN1Q3lCLElBRHZDLENBQ0p6QixNQURJO0FBQUEsVUFDSUMsSUFESixHQUN1Q3dCLElBRHZDLENBQ0l4QixJQURKO0FBQUEsVUFDVUMsTUFEVixHQUN1Q3VCLElBRHZDLENBQ1V2QixNQURWO0FBQUEsNEJBQ3VDdUIsSUFEdkMsQ0FDa0J0QixTQURsQjtBQUFBLFVBQ2tCQSxTQURsQixnQ0FDOEIsSUFEOUI7QUFHcEIsYUFBTyxJQUFJTCxLQUFKLENBQVVDLE1BQVYsRUFBa0JDLE1BQWxCLEVBQTBCQyxJQUExQixFQUFnQywyQkFBZ0JDLE1BQWhCLENBQWhDLEVBQXlEQyxTQUF6RCxDQUFQO0FBQ0Q7OztFQWhHZ0N1QixzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdGhVdGlscywgY3JlYXRlQ29sb3JTcGFuIH0gZnJvbSAnLi4vbWF0aCc7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSAnLi9CZWhhdmlvdXInO1xuaW1wb3J0IHsgQ29sb3JVdGlsIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0RWFzaW5nQnlOYW1lIH0gZnJvbSAnLi4vZWFzZSc7XG5pbXBvcnQgeyBCRUhBVklPVVJfVFlQRV9DT0xPUiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQSBiZWhhdmlvdXIgd2hpY2ggbXV0YXRlcyB0aGUgY29sb3Igb2YgYSBwYXJ0aWNsZSBvdmVyIHRpbWUuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgQ29sb3IgYmVoYXZpb3VyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGNvbG9yQSAtIHRoZSBzdGFydGluZyBjb2xvclxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGNvbG9yQiAtIHRoZSBlbmRpbmcgY29sb3JcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSB0aGUgbGlmZSBvZiB0aGUgcGFydGljbGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRW5hYmxlZD10cnVlXSAtIERldGVybWluZXMgaWYgdGhlIGJlaGF2aW91ciB3aWxsIGJlIGFwcGxpZWQgb3Igbm90XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoY29sb3JBLCBjb2xvckIsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSkge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZywgdHlwZSwgaXNFbmFibGVkKTtcblxuICAgIHRoaXMucmVzZXQoY29sb3JBLCBjb2xvckIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBzYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9zYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIF9zYW1lIHByb3BlcnR5IHdoaWNoIGRldGVybWluZXMgaWYgdGhlIGFscGhhIGFyZSB0aGUgc2FtZS5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzZXQgc2FtZShzYW1lKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fc2FtZSA9IHNhbWU7XG4gIH1cblxuICByZXNldChjb2xvckEsIGNvbG9yQiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gY29sb3JCID09PSBudWxsIHx8IGNvbG9yQiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xvckEgPSBjcmVhdGVDb2xvclNwYW4oY29sb3JBKTtcbiAgICB0aGlzLmNvbG9yQiA9IGNyZWF0ZUNvbG9yU3Bhbihjb2xvckIpO1xuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBID0gQ29sb3JVdGlsLmdldFJHQih0aGlzLmNvbG9yQS5nZXRWYWx1ZSgpKTtcblxuICAgIHBhcnRpY2xlLnVzZUNvbG9yID0gdHJ1ZTtcbiAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JCID0gdGhpcy5zYW1lXG4gICAgICA/IHBhcnRpY2xlLnRyYW5zZm9ybS5jb2xvckFcbiAgICAgIDogQ29sb3JVdGlsLmdldFJHQih0aGlzLmNvbG9yQi5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIG11dGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmVuZXJnaXplKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuX3NhbWUpIHtcbiAgICAgIHBhcnRpY2xlLmNvbG9yLnIgPSBNYXRoVXRpbHMubGVycChcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQS5yLFxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JCLnIsXG4gICAgICAgIHRoaXMuZW5lcmd5XG4gICAgICApO1xuICAgICAgcGFydGljbGUuY29sb3IuZyA9IE1hdGhVdGlscy5sZXJwKFxuICAgICAgICBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBLmcsXG4gICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5jb2xvckIuZyxcbiAgICAgICAgdGhpcy5lbmVyZ3lcbiAgICAgICk7XG4gICAgICBwYXJ0aWNsZS5jb2xvci5iID0gTWF0aFV0aWxzLmxlcnAoXG4gICAgICAgIHBhcnRpY2xlLnRyYW5zZm9ybS5jb2xvckEuYixcbiAgICAgICAgcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQi5iLFxuICAgICAgICB0aGlzLmVuZXJneVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuY29sb3IuciA9IHBhcnRpY2xlLnRyYW5zZm9ybS5jb2xvckEucjtcbiAgICAgIHBhcnRpY2xlLmNvbG9yLmcgPSBwYXJ0aWNsZS50cmFuc2Zvcm0uY29sb3JBLmc7XG4gICAgICBwYXJ0aWNsZS5jb2xvci5iID0gcGFydGljbGUudHJhbnNmb3JtLmNvbG9yQS5iO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ29sb3IgaW5pdGlhbGl6ZXIgZnJvbSBKU09OLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNvbnN0cnVjdCB0aGUgaW5zdGFuY2UgZnJvbS5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24uY29sb3JBIC0gVGhlIHN0YXJ0aW5nIGNvbG9yXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBqc29uLmNvbG9yQiAtIFRoZSBlbmRpbmcgY29sb3JcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGpzb24ubGlmZSAtIFRoZSBsaWZlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKiBAcHJvcGVydHkge3N0cmluZ30ganNvbi5lYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcbiAgICogQHJldHVybiB7Q29sb3J9XG4gICAqL1xuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHsgY29sb3JBLCBjb2xvckIsIGxpZmUsIGVhc2luZywgaXNFbmFibGVkID0gdHJ1ZSB9ID0ganNvbjtcblxuICAgIHJldHVybiBuZXcgQ29sb3IoY29sb3JBLCBjb2xvckIsIGxpZmUsIGdldEVhc2luZ0J5TmFtZShlYXNpbmcpLCBpc0VuYWJsZWQpO1xuICB9XG59XG4iXX0=