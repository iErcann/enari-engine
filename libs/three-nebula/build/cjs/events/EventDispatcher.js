"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 **/
var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    (0, _classCallCheck2["default"])(this, EventDispatcher);
    this.listeners = null;
  }

  (0, _createClass2["default"])(EventDispatcher, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      if (!this.listeners) {
        this.listeners = {};
      } else {
        this.removeEventListener(type, listener);
      }

      if (!this.listeners[type]) this.listeners[type] = [];
      this.listeners[type].push(listener);
      return listener;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      if (!this.listeners) return;
      if (!this.listeners[type]) return;
      var arr = this.listeners[type];

      for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] == listener) {
          if (l == 1) {
            delete this.listeners[type];
          } // allows for faster checks.
          else {
            arr.splice(i, 1);
          }

          break;
        }
      }
    }
  }, {
    key: "removeAllEventListeners",
    value: function removeAllEventListeners(type) {
      if (!type) this.listeners = null;else if (this.listeners) delete this.listeners[type];
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(eventName, eventTarget) {
      var ret = false,
          listeners = this.listeners;

      if (eventName && listeners) {
        var arr = listeners[eventName];
        if (!arr) return ret;
        arr = arr.slice(); //Should use a copy into a temporary here instead...
        // to avoid issues with items being removed or added during the dispatch

        var handler,
            i = arr.length;

        while (i--) {
          handler = arr[i];
          ret = ret || handler(eventTarget);
        }
      }

      return !!ret;
    }
  }, {
    key: "hasEventListener",
    value: function hasEventListener(type) {
      var listeners = this.listeners;
      return !!(listeners && listeners[type]);
    }
  }, {
    key: "listeners",
    set: function set(listeners) {
      this._listeners = listeners;
    },
    get: function get() {
      return this._listeners;
    }
  }]);
  return EventDispatcher;
}();

exports["default"] = EventDispatcher;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ldmVudHMvRXZlbnREaXNwYXRjaGVyLmpzIl0sIm5hbWVzIjpbIkV2ZW50RGlzcGF0Y2hlciIsImxpc3RlbmVycyIsInR5cGUiLCJsaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwdXNoIiwiYXJyIiwiaSIsImwiLCJsZW5ndGgiLCJzcGxpY2UiLCJldmVudE5hbWUiLCJldmVudFRhcmdldCIsInJldCIsInNsaWNlIiwiaGFuZGxlciIsIl9saXN0ZW5lcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBRXFCQSxlO0FBQ25CLDZCQUFjO0FBQUE7QUFDWixTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7Ozs7cUNBVWdCQyxJLEVBQU1DLFEsRUFBVTtBQUMvQixVQUFJLENBQUMsS0FBS0YsU0FBVixFQUFxQjtBQUNuQixhQUFLQSxTQUFMLEdBQWlCLEVBQWpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0csbUJBQUwsQ0FBeUJGLElBQXpCLEVBQStCQyxRQUEvQjtBQUNEOztBQUVELFVBQUksQ0FBQyxLQUFLRixTQUFMLENBQWVDLElBQWYsQ0FBTCxFQUEyQixLQUFLRCxTQUFMLENBQWVDLElBQWYsSUFBdUIsRUFBdkI7QUFDM0IsV0FBS0QsU0FBTCxDQUFlQyxJQUFmLEVBQXFCRyxJQUFyQixDQUEwQkYsUUFBMUI7QUFFQSxhQUFPQSxRQUFQO0FBQ0Q7Ozt3Q0FFbUJELEksRUFBTUMsUSxFQUFVO0FBQ2xDLFVBQUksQ0FBQyxLQUFLRixTQUFWLEVBQXFCO0FBQ3JCLFVBQUksQ0FBQyxLQUFLQSxTQUFMLENBQWVDLElBQWYsQ0FBTCxFQUEyQjtBQUUzQixVQUFJSSxHQUFHLEdBQUcsS0FBS0wsU0FBTCxDQUFlQyxJQUFmLENBQVY7O0FBRUEsV0FBSyxJQUFJSyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdGLEdBQUcsQ0FBQ0csTUFBeEIsRUFBZ0NGLENBQUMsR0FBR0MsQ0FBcEMsRUFBdUNELENBQUMsRUFBeEMsRUFBNEM7QUFDMUMsWUFBSUQsR0FBRyxDQUFDQyxDQUFELENBQUgsSUFBVUosUUFBZCxFQUF3QjtBQUN0QixjQUFJSyxDQUFDLElBQUksQ0FBVCxFQUFZO0FBQ1YsbUJBQU8sS0FBS1AsU0FBTCxDQUFlQyxJQUFmLENBQVA7QUFDRCxXQUZELENBR0E7QUFIQSxlQUlLO0FBQ0hJLFlBQUFBLEdBQUcsQ0FBQ0ksTUFBSixDQUFXSCxDQUFYLEVBQWMsQ0FBZDtBQUNEOztBQUNEO0FBQ0Q7QUFDRjtBQUNGOzs7NENBRXVCTCxJLEVBQU07QUFDNUIsVUFBSSxDQUFDQSxJQUFMLEVBQVcsS0FBS0QsU0FBTCxHQUFpQixJQUFqQixDQUFYLEtBQ0ssSUFBSSxLQUFLQSxTQUFULEVBQW9CLE9BQU8sS0FBS0EsU0FBTCxDQUFlQyxJQUFmLENBQVA7QUFDMUI7OztrQ0FFYVMsUyxFQUFXQyxXLEVBQWE7QUFDcEMsVUFBSUMsR0FBRyxHQUFHLEtBQVY7QUFBQSxVQUNFWixTQUFTLEdBQUcsS0FBS0EsU0FEbkI7O0FBR0EsVUFBSVUsU0FBUyxJQUFJVixTQUFqQixFQUE0QjtBQUMxQixZQUFJSyxHQUFHLEdBQUdMLFNBQVMsQ0FBQ1UsU0FBRCxDQUFuQjtBQUVBLFlBQUksQ0FBQ0wsR0FBTCxFQUFVLE9BQU9PLEdBQVA7QUFFVlAsUUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNRLEtBQUosRUFBTixDQUwwQixDQUtBO0FBQzFCOztBQUVBLFlBQUlDLE9BQUo7QUFBQSxZQUNFUixDQUFDLEdBQUdELEdBQUcsQ0FBQ0csTUFEVjs7QUFHQSxlQUFPRixDQUFDLEVBQVIsRUFBWTtBQUNWUSxVQUFBQSxPQUFPLEdBQUdULEdBQUcsQ0FBQ0MsQ0FBRCxDQUFiO0FBRUFNLFVBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJRSxPQUFPLENBQUNILFdBQUQsQ0FBcEI7QUFDRDtBQUNGOztBQUVELGFBQU8sQ0FBQyxDQUFDQyxHQUFUO0FBQ0Q7OztxQ0FFZ0JYLEksRUFBTTtBQUNyQixVQUFJRCxTQUFTLEdBQUcsS0FBS0EsU0FBckI7QUFFQSxhQUFPLENBQUMsRUFBRUEsU0FBUyxJQUFJQSxTQUFTLENBQUNDLElBQUQsQ0FBeEIsQ0FBUjtBQUNEOzs7c0JBM0VhRCxTLEVBQVc7QUFDdkIsV0FBS2UsVUFBTCxHQUFrQmYsU0FBbEI7QUFDRCxLO3dCQUVlO0FBQ2QsYUFBTyxLQUFLZSxVQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogRXZlbnREaXNwYXRjaGVyXG4gKiBWaXNpdCBodHRwOi8vY3JlYXRlanMuY29tLyBmb3IgZG9jdW1lbnRhdGlvbiwgdXBkYXRlcyBhbmQgZXhhbXBsZXMuXG4gKlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG51bGw7XG4gIH1cblxuICBzZXQgbGlzdGVuZXJzKGxpc3RlbmVycykge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgfVxuXG4gIGdldCBsaXN0ZW5lcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVycztcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbdHlwZV0pIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gbGlzdGVuZXI7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycykgcmV0dXJuO1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbdHlwZV0pIHJldHVybjtcblxuICAgIHZhciBhcnIgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobCA9PSAxKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFsbG93cyBmb3IgZmFzdGVyIGNoZWNrcy5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVBbGxFdmVudExpc3RlbmVycyh0eXBlKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLmxpc3RlbmVycyA9IG51bGw7XG4gICAgZWxzZSBpZiAodGhpcy5saXN0ZW5lcnMpIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnROYW1lLCBldmVudFRhcmdldCkge1xuICAgIHZhciByZXQgPSBmYWxzZSxcbiAgICAgIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzO1xuXG4gICAgaWYgKGV2ZW50TmFtZSAmJiBsaXN0ZW5lcnMpIHtcbiAgICAgIHZhciBhcnIgPSBsaXN0ZW5lcnNbZXZlbnROYW1lXTtcblxuICAgICAgaWYgKCFhcnIpIHJldHVybiByZXQ7XG5cbiAgICAgIGFyciA9IGFyci5zbGljZSgpOyAgICAgICAgLy9TaG91bGQgdXNlIGEgY29weSBpbnRvIGEgdGVtcG9yYXJ5IGhlcmUgaW5zdGVhZC4uLlxuICAgICAgLy8gdG8gYXZvaWQgaXNzdWVzIHdpdGggaXRlbXMgYmVpbmcgcmVtb3ZlZCBvciBhZGRlZCBkdXJpbmcgdGhlIGRpc3BhdGNoXG5cbiAgICAgIHZhciBoYW5kbGVyLFxuICAgICAgICBpID0gYXJyLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBoYW5kbGVyID0gYXJyW2ldO1xuXG4gICAgICAgIHJldCA9IHJldCB8fCBoYW5kbGVyKGV2ZW50VGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gISFyZXQ7XG4gIH1cblxuICBoYXNFdmVudExpc3RlbmVyKHR5cGUpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnM7XG5cbiAgICByZXR1cm4gISEobGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0eXBlXSk7XG4gIH1cbn1cbiJdfQ==