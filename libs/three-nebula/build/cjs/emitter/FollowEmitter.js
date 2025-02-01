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

var _Emitter2 = _interopRequireDefault(require("./Emitter"));

var _THREEUtil = _interopRequireDefault(require("../utils/THREEUtil"));

var _Util = _interopRequireDefault(require("../utils/Util"));

var _types = require("./types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FollowEmitter = /*#__PURE__*/function (_Emitter) {
  (0, _inherits2["default"])(FollowEmitter, _Emitter);

  var _super = _createSuper(FollowEmitter);

  /**
   * The FollowEmitter class inherits from System.Emitter
   *
   * use the FollowEmitter will emit particle when mousemoving
   *
   * @class System.FollowEmitter
   * @constructor
   * @param {Element} mouseTarget mouseevent's target;
   * @param {Number} ease the easing of following speed;
   * @default 0.7
   * @param {Object} pObj the parameters object;
   */
  function FollowEmitter(mouseTarget, ease, pObj) {
    var _this;

    (0, _classCallCheck2["default"])(this, FollowEmitter);
    _this = _super.call(this, pObj);
    /**
     * @desc The class type.
     * @type {string}
     */

    _this.type = _types.EMITTER_TYPE_FOLLOW;
    _this.mouseTarget = _Util["default"].initValue(mouseTarget, window);
    _this.ease = _Util["default"].initValue(ease, 0.7);
    _this._allowEmitting = false;

    _this.initEventHandler();

    return _this;
  }

  (0, _createClass2["default"])(FollowEmitter, [{
    key: "initEventHandler",
    value: function initEventHandler() {
      var self = this;

      this.mousemoveHandler = function (e) {
        self.mousemove.call(self, e);
      };

      this.mousedownHandler = function (e) {
        self.mousedown.call(self, e);
      };

      this.mouseupHandler = function (e) {
        self.mouseup.call(self, e);
      };

      this.mouseTarget.addEventListener('mousemove', this.mousemoveHandler, false);
    }
    /**
     * start emit particle
     * @method emit
     */

  }, {
    key: "emit",
    value: function emit() {
      this._allowEmitting = true;
    }
    /**
     * stop emiting
     * @method stopEmit
     */

  }, {
    key: "stopEmit",
    value: function stopEmit() {
      this._allowEmitting = false;
    }
  }, {
    key: "setCameraAndCanvas",
    value: function setCameraAndCanvas(camera, canvas) {
      this.camera = camera;
      this.canvas = canvas;
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      if (e.layerX || e.layerX == 0) {
        this.position.x += (e.layerX - this.position.x) * this.ease;
        this.position.y += (e.layerY - this.position.y) * this.ease;
      } else if (e.offsetX || e.offsetX == 0) {
        this.position.x += (e.offsetX - this.position.x) * this.ease;
        this.position.y += (e.offsetY - this.position.y) * this.ease;
      }

      this.position.copy(_THREEUtil["default"].toSpacePos(this.position, this.camera, this.canvas));
      if (this._allowEmitting) (0, _get2["default"])((0, _getPrototypeOf2["default"])(FollowEmitter.prototype), "emit", this).call(this, 'once');
    }
    /**
     * Destory this Emitter
     * @method destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(FollowEmitter.prototype), "destroy", this).call(this);
      this.mouseTarget.removeEventListener('mousemove', this.mousemoveHandler, false);
    }
  }]);
  return FollowEmitter;
}(_Emitter2["default"]);

exports["default"] = FollowEmitter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiXSwibmFtZXMiOlsiRm9sbG93RW1pdHRlciIsIm1vdXNlVGFyZ2V0IiwiZWFzZSIsInBPYmoiLCJ0eXBlIiwiVXRpbCIsImluaXRWYWx1ZSIsIndpbmRvdyIsIl9hbGxvd0VtaXR0aW5nIiwiaW5pdEV2ZW50SGFuZGxlciIsInNlbGYiLCJtb3VzZW1vdmVIYW5kbGVyIiwiZSIsIm1vdXNlbW92ZSIsImNhbGwiLCJtb3VzZWRvd25IYW5kbGVyIiwibW91c2Vkb3duIiwibW91c2V1cEhhbmRsZXIiLCJtb3VzZXVwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbWVyYSIsImNhbnZhcyIsImxheWVyWCIsInBvc2l0aW9uIiwieCIsInkiLCJsYXllclkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImNvcHkiLCJUSFJFRVV0aWwiLCJ0b1NwYWNlUG9zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkVtaXR0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7SUFFcUJBLGE7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHlCQUFZQyxXQUFaLEVBQXlCQyxJQUF6QixFQUErQkMsSUFBL0IsRUFBcUM7QUFBQTs7QUFBQTtBQUNuQyw4QkFBTUEsSUFBTjtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFVBQUtDLElBQUwsR0FBWUEsMEJBQVo7QUFDQSxVQUFLSCxXQUFMLEdBQW1CSSxpQkFBS0MsU0FBTCxDQUFlTCxXQUFmLEVBQTRCTSxNQUE1QixDQUFuQjtBQUNBLFVBQUtMLElBQUwsR0FBWUcsaUJBQUtDLFNBQUwsQ0FBZUosSUFBZixFQUFxQixHQUFyQixDQUFaO0FBQ0EsVUFBS00sY0FBTCxHQUFzQixLQUF0Qjs7QUFDQSxVQUFLQyxnQkFBTDs7QUFYbUM7QUFZcEM7Ozs7dUNBRWtCO0FBQ2pCLFVBQUlDLElBQUksR0FBRyxJQUFYOztBQUVBLFdBQUtDLGdCQUFMLEdBQXdCLFVBQVNDLENBQVQsRUFBWTtBQUNsQ0YsUUFBQUEsSUFBSSxDQUFDRyxTQUFMLENBQWVDLElBQWYsQ0FBb0JKLElBQXBCLEVBQTBCRSxDQUExQjtBQUNELE9BRkQ7O0FBSUEsV0FBS0csZ0JBQUwsR0FBd0IsVUFBU0gsQ0FBVCxFQUFZO0FBQ2xDRixRQUFBQSxJQUFJLENBQUNNLFNBQUwsQ0FBZUYsSUFBZixDQUFvQkosSUFBcEIsRUFBMEJFLENBQTFCO0FBQ0QsT0FGRDs7QUFJQSxXQUFLSyxjQUFMLEdBQXNCLFVBQVNMLENBQVQsRUFBWTtBQUNoQ0YsUUFBQUEsSUFBSSxDQUFDUSxPQUFMLENBQWFKLElBQWIsQ0FBa0JKLElBQWxCLEVBQXdCRSxDQUF4QjtBQUNELE9BRkQ7O0FBSUEsV0FBS1gsV0FBTCxDQUFpQmtCLGdCQUFqQixDQUNFLFdBREYsRUFFRSxLQUFLUixnQkFGUCxFQUdFLEtBSEY7QUFLRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7OzJCQUNTO0FBQ0wsV0FBS0gsY0FBTCxHQUFzQixJQUF0QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7K0JBQ2E7QUFDVCxXQUFLQSxjQUFMLEdBQXNCLEtBQXRCO0FBQ0Q7Ozt1Q0FFa0JZLE0sRUFBUUMsTSxFQUFRO0FBQ2pDLFdBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFdBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7OEJBRVNULEMsRUFBRztBQUNYLFVBQUlBLENBQUMsQ0FBQ1UsTUFBRixJQUFZVixDQUFDLENBQUNVLE1BQUYsSUFBWSxDQUE1QixFQUErQjtBQUM3QixhQUFLQyxRQUFMLENBQWNDLENBQWQsSUFBbUIsQ0FBQ1osQ0FBQyxDQUFDVSxNQUFGLEdBQVcsS0FBS0MsUUFBTCxDQUFjQyxDQUExQixJQUErQixLQUFLdEIsSUFBdkQ7QUFDQSxhQUFLcUIsUUFBTCxDQUFjRSxDQUFkLElBQW1CLENBQUNiLENBQUMsQ0FBQ2MsTUFBRixHQUFXLEtBQUtILFFBQUwsQ0FBY0UsQ0FBMUIsSUFBK0IsS0FBS3ZCLElBQXZEO0FBQ0QsT0FIRCxNQUdPLElBQUlVLENBQUMsQ0FBQ2UsT0FBRixJQUFhZixDQUFDLENBQUNlLE9BQUYsSUFBYSxDQUE5QixFQUFpQztBQUN0QyxhQUFLSixRQUFMLENBQWNDLENBQWQsSUFBbUIsQ0FBQ1osQ0FBQyxDQUFDZSxPQUFGLEdBQVksS0FBS0osUUFBTCxDQUFjQyxDQUEzQixJQUFnQyxLQUFLdEIsSUFBeEQ7QUFDQSxhQUFLcUIsUUFBTCxDQUFjRSxDQUFkLElBQW1CLENBQUNiLENBQUMsQ0FBQ2dCLE9BQUYsR0FBWSxLQUFLTCxRQUFMLENBQWNFLENBQTNCLElBQWdDLEtBQUt2QixJQUF4RDtBQUNEOztBQUVELFdBQUtxQixRQUFMLENBQWNNLElBQWQsQ0FDRUMsc0JBQVVDLFVBQVYsQ0FBcUIsS0FBS1IsUUFBMUIsRUFBb0MsS0FBS0gsTUFBekMsRUFBaUQsS0FBS0MsTUFBdEQsQ0FERjtBQUlBLFVBQUksS0FBS2IsY0FBVCxFQUF5QiwwR0FBVyxNQUFYO0FBQzFCO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7OEJBQ1k7QUFDUjtBQUNBLFdBQUtQLFdBQUwsQ0FBaUIrQixtQkFBakIsQ0FDRSxXQURGLEVBRUUsS0FBS3JCLGdCQUZQLEVBR0UsS0FIRjtBQUtEOzs7RUFqR3dDc0Isb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW1pdHRlciBmcm9tICcuL0VtaXR0ZXInO1xuaW1wb3J0IFRIUkVFVXRpbCBmcm9tICcuLi91dGlscy9USFJFRVV0aWwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vdXRpbHMvVXRpbCc7XG5pbXBvcnQgeyBFTUlUVEVSX1RZUEVfRk9MTE9XIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9sbG93RW1pdHRlciBleHRlbmRzIEVtaXR0ZXIge1xuICAvKipcbiAgICogVGhlIEZvbGxvd0VtaXR0ZXIgY2xhc3MgaW5oZXJpdHMgZnJvbSBTeXN0ZW0uRW1pdHRlclxuICAgKlxuICAgKiB1c2UgdGhlIEZvbGxvd0VtaXR0ZXIgd2lsbCBlbWl0IHBhcnRpY2xlIHdoZW4gbW91c2Vtb3ZpbmdcbiAgICpcbiAgICogQGNsYXNzIFN5c3RlbS5Gb2xsb3dFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG1vdXNlVGFyZ2V0IG1vdXNlZXZlbnQncyB0YXJnZXQ7XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlYXNlIHRoZSBlYXNpbmcgb2YgZm9sbG93aW5nIHNwZWVkO1xuICAgKiBAZGVmYXVsdCAwLjdcbiAgICogQHBhcmFtIHtPYmplY3R9IHBPYmogdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKi9cbiAgY29uc3RydWN0b3IobW91c2VUYXJnZXQsIGVhc2UsIHBPYmopIHtcbiAgICBzdXBlcihwT2JqKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1vdXNlVGFyZ2V0ID0gVXRpbC5pbml0VmFsdWUobW91c2VUYXJnZXQsIHdpbmRvdyk7XG4gICAgdGhpcy5lYXNlID0gVXRpbC5pbml0VmFsdWUoZWFzZSwgMC43KTtcbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNlbGYubW91c2Vtb3ZlLmNhbGwoc2VsZiwgZSk7XG4gICAgfTtcblxuICAgIHRoaXMubW91c2Vkb3duSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNlbGYubW91c2Vkb3duLmNhbGwoc2VsZiwgZSk7XG4gICAgfTtcblxuICAgIHRoaXMubW91c2V1cEhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICBzZWxmLm1vdXNldXAuY2FsbChzZWxmLCBlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tb3VzZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnQgZW1pdCBwYXJ0aWNsZVxuICAgKiBAbWV0aG9kIGVtaXRcbiAgICovXG4gIGVtaXQoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogc3RvcCBlbWl0aW5nXG4gICAqIEBtZXRob2Qgc3RvcEVtaXRcbiAgICovXG4gIHN0b3BFbWl0KCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHNldENhbWVyYUFuZENhbnZhcyhjYW1lcmEsIGNhbnZhcykge1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBpZiAoZS5sYXllclggfHwgZS5sYXllclggPT0gMCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IChlLmxheWVyWCAtIHRoaXMucG9zaXRpb24ueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gKGUubGF5ZXJZIC0gdGhpcy5wb3NpdGlvbi55KSAqIHRoaXMuZWFzZTtcbiAgICB9IGVsc2UgaWYgKGUub2Zmc2V0WCB8fCBlLm9mZnNldFggPT0gMCkge1xuICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IChlLm9mZnNldFggLSB0aGlzLnBvc2l0aW9uLngpICogdGhpcy5lYXNlO1xuICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IChlLm9mZnNldFkgLSB0aGlzLnBvc2l0aW9uLnkpICogdGhpcy5lYXNlO1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb24uY29weShcbiAgICAgIFRIUkVFVXRpbC50b1NwYWNlUG9zKHRoaXMucG9zaXRpb24sIHRoaXMuY2FtZXJhLCB0aGlzLmNhbnZhcylcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuX2FsbG93RW1pdHRpbmcpIHN1cGVyLmVtaXQoJ29uY2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMubW91c2VUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG59XG4iXX0=