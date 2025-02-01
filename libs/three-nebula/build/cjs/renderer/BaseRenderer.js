"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _constants = require("../events/constants");

var _types = require("./types");

var _constants2 = require("../constants");

var BaseRenderer = /*#__PURE__*/function () {
  function BaseRenderer() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.RENDERER_TYPE_BASE;
    (0, _classCallCheck2["default"])(this, BaseRenderer);

    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
  }

  (0, _createClass2["default"])(BaseRenderer, [{
    key: "init",
    value: function init(system) {
      var self = this;
      this.system = system;
      this.system.eventDispatcher.addEventListener(_constants.SYSTEM_UPDATE, function (system) {
        self.onSystemUpdate.call(self, system);
      });
      this.system.eventDispatcher.addEventListener(_constants.PARTICLE_CREATED, function (particle) {
        self.onParticleCreated.call(self, particle);
      });
      this.system.eventDispatcher.addEventListener(_constants.PARTICLE_UPDATE, function (particle) {
        self.onParticleUpdate.call(self, particle);
      });
      this.system.eventDispatcher.addEventListener(_constants.PARTICLE_DEAD, function (particle) {
        self.onParticleDead.call(self, particle);
      });
      this.logRendererType();
    }
  }, {
    key: "remove",
    value: function remove() {
      this.system = null;
    }
    /**
     * @abstract
     */

  }, {
    key: "onParticleCreated",
    value: function onParticleCreated(particle) {} // eslint-disable-line

    /**
     * @abstract
     */

  }, {
    key: "onParticleUpdate",
    value: function onParticleUpdate(particle) {} // eslint-disable-line

    /**
     * @abstract
     */

  }, {
    key: "onParticleDead",
    value: function onParticleDead(particle) {} // eslint-disable-line

    /**
     * @abstract
     */

  }, {
    key: "onSystemUpdate",
    value: function onSystemUpdate(system) {} // eslint-disable-line

    /**
     * Logs the renderer type being used when in development mode.
     *
     * @return void
     */

  }, {
    key: "logRendererType",
    value: function logRendererType() {
      if (!_constants2.__DEV__) {
        return;
      }

      console.log("".concat(this.type));
    }
  }]);
  return BaseRenderer;
}();

exports["default"] = BaseRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXJlci9CYXNlUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiQmFzZVJlbmRlcmVyIiwidHlwZSIsIlJFTkRFUkVSX1RZUEVfQkFTRSIsInN5c3RlbSIsInNlbGYiLCJldmVudERpc3BhdGNoZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiU1lTVEVNX1VQREFURSIsIm9uU3lzdGVtVXBkYXRlIiwiY2FsbCIsIlBBUlRJQ0xFX0NSRUFURUQiLCJwYXJ0aWNsZSIsIm9uUGFydGljbGVDcmVhdGVkIiwiUEFSVElDTEVfVVBEQVRFIiwib25QYXJ0aWNsZVVwZGF0ZSIsIlBBUlRJQ0xFX0RFQUQiLCJvblBhcnRpY2xlRGVhZCIsImxvZ1JlbmRlcmVyVHlwZSIsIl9fREVWX18iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7O0lBRXFCQSxZO0FBQ25CLDBCQUF1QztBQUFBLFFBQTNCQyxJQUEyQix1RUFBcEJDLHlCQUFvQjtBQUFBOztBQUNyQztBQUNKO0FBQ0E7QUFDQTtBQUNJLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNEOzs7O3lCQUVJRSxNLEVBQVE7QUFDWCxVQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUVBLFdBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLFdBQUtBLE1BQUwsQ0FBWUUsZUFBWixDQUE0QkMsZ0JBQTVCLENBQTZDQyx3QkFBN0MsRUFBNEQsVUFDMURKLE1BRDBELEVBRTFEO0FBQ0FDLFFBQUFBLElBQUksQ0FBQ0ksY0FBTCxDQUFvQkMsSUFBcEIsQ0FBeUJMLElBQXpCLEVBQStCRCxNQUEvQjtBQUNELE9BSkQ7QUFNQSxXQUFLQSxNQUFMLENBQVlFLGVBQVosQ0FBNEJDLGdCQUE1QixDQUE2Q0ksMkJBQTdDLEVBQStELFVBQzdEQyxRQUQ2RCxFQUU3RDtBQUNBUCxRQUFBQSxJQUFJLENBQUNRLGlCQUFMLENBQXVCSCxJQUF2QixDQUE0QkwsSUFBNUIsRUFBa0NPLFFBQWxDO0FBQ0QsT0FKRDtBQU1BLFdBQUtSLE1BQUwsQ0FBWUUsZUFBWixDQUE0QkMsZ0JBQTVCLENBQTZDTywwQkFBN0MsRUFBOEQsVUFDNURGLFFBRDRELEVBRTVEO0FBQ0FQLFFBQUFBLElBQUksQ0FBQ1UsZ0JBQUwsQ0FBc0JMLElBQXRCLENBQTJCTCxJQUEzQixFQUFpQ08sUUFBakM7QUFDRCxPQUpEO0FBTUEsV0FBS1IsTUFBTCxDQUFZRSxlQUFaLENBQTRCQyxnQkFBNUIsQ0FBNkNTLHdCQUE3QyxFQUE0RCxVQUMxREosUUFEMEQsRUFFMUQ7QUFDQVAsUUFBQUEsSUFBSSxDQUFDWSxjQUFMLENBQW9CUCxJQUFwQixDQUF5QkwsSUFBekIsRUFBK0JPLFFBQS9CO0FBQ0QsT0FKRDtBQU1BLFdBQUtNLGVBQUw7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBS2QsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7OztzQ0FDb0JRLFEsRUFBVSxDQUFFLEMsQ0FBQzs7QUFFL0I7QUFDRjtBQUNBOzs7O3FDQUNtQkEsUSxFQUFVLENBQUUsQyxDQUFDOztBQUU5QjtBQUNGO0FBQ0E7Ozs7bUNBQ2lCQSxRLEVBQVUsQ0FBRSxDLENBQUM7O0FBRTVCO0FBQ0Y7QUFDQTs7OzttQ0FDaUJSLE0sRUFBUSxDQUFFLEMsQ0FBQzs7QUFFMUI7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztzQ0FDb0I7QUFDaEIsVUFBSSxDQUFDZSxtQkFBTCxFQUFjO0FBQ1o7QUFDRDs7QUFFREMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLFdBQWUsS0FBS25CLElBQXBCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQQVJUSUNMRV9DUkVBVEVELFxuICBQQVJUSUNMRV9ERUFELFxuICBQQVJUSUNMRV9VUERBVEUsXG4gIFNZU1RFTV9VUERBVEUsXG59IGZyb20gJy4uL2V2ZW50cy9jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBSRU5ERVJFUl9UWVBFX0JBU0UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IF9fREVWX18gfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcih0eXBlID0gUkVOREVSRVJfVFlQRV9CQVNFKSB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgaW5pdChzeXN0ZW0pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnN5c3RlbSA9IHN5c3RlbTtcblxuICAgIHRoaXMuc3lzdGVtLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKFNZU1RFTV9VUERBVEUsIGZ1bmN0aW9uKFxuICAgICAgc3lzdGVtXG4gICAgKSB7XG4gICAgICBzZWxmLm9uU3lzdGVtVXBkYXRlLmNhbGwoc2VsZiwgc3lzdGVtKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3lzdGVtLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKFBBUlRJQ0xFX0NSRUFURUQsIGZ1bmN0aW9uKFxuICAgICAgcGFydGljbGVcbiAgICApIHtcbiAgICAgIHNlbGYub25QYXJ0aWNsZUNyZWF0ZWQuY2FsbChzZWxmLCBwYXJ0aWNsZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN5c3RlbS5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihQQVJUSUNMRV9VUERBVEUsIGZ1bmN0aW9uKFxuICAgICAgcGFydGljbGVcbiAgICApIHtcbiAgICAgIHNlbGYub25QYXJ0aWNsZVVwZGF0ZS5jYWxsKHNlbGYsIHBhcnRpY2xlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3lzdGVtLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKFBBUlRJQ0xFX0RFQUQsIGZ1bmN0aW9uKFxuICAgICAgcGFydGljbGVcbiAgICApIHtcbiAgICAgIHNlbGYub25QYXJ0aWNsZURlYWQuY2FsbChzZWxmLCBwYXJ0aWNsZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvZ1JlbmRlcmVyVHlwZSgpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3lzdGVtID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIG9uUGFydGljbGVEZWFkKHBhcnRpY2xlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgb25TeXN0ZW1VcGRhdGUoc3lzdGVtKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLyoqXG4gICAqIExvZ3MgdGhlIHJlbmRlcmVyIHR5cGUgYmVpbmcgdXNlZCB3aGVuIGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgbG9nUmVuZGVyZXJUeXBlKCkge1xuICAgIGlmICghX19ERVZfXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGAke3RoaXMudHlwZX1gKTtcbiAgfVxufVxuIl19