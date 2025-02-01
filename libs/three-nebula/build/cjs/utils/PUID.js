"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  _id: 0,
  _uids: new Map(),
  getNewId: function getNewId() {
    return "PUID_".concat(++this._id);
  },
  id: function id(functionOrObject) {
    if (this._uids.has(functionOrObject)) {
      return this._uids.get(functionOrObject);
    }

    var newId = this.getNewId();

    this._uids.set(functionOrObject, newId);

    return newId;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9QVUlELmpzIl0sIm5hbWVzIjpbIl9pZCIsIl91aWRzIiwiTWFwIiwiZ2V0TmV3SWQiLCJpZCIsImZ1bmN0aW9uT3JPYmplY3QiLCJoYXMiLCJnZXQiLCJuZXdJZCIsInNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2VBQWU7QUFDYkEsRUFBQUEsR0FBRyxFQUFFLENBRFE7QUFFYkMsRUFBQUEsS0FBSyxFQUFFLElBQUlDLEdBQUosRUFGTTtBQUdiQyxFQUFBQSxRQUFRLEVBQUUsb0JBQVc7QUFDbkIsMEJBQWUsRUFBRSxLQUFLSCxHQUF0QjtBQUNELEdBTFk7QUFNYkksRUFBQUEsRUFBRSxFQUFFLFlBQVNDLGdCQUFULEVBQTJCO0FBQzdCLFFBQUksS0FBS0osS0FBTCxDQUFXSyxHQUFYLENBQWVELGdCQUFmLENBQUosRUFBc0M7QUFDcEMsYUFBTyxLQUFLSixLQUFMLENBQVdNLEdBQVgsQ0FBZUYsZ0JBQWYsQ0FBUDtBQUNEOztBQUVELFFBQU1HLEtBQUssR0FBRyxLQUFLTCxRQUFMLEVBQWQ7O0FBRUEsU0FBS0YsS0FBTCxDQUFXUSxHQUFYLENBQWVKLGdCQUFmLEVBQWlDRyxLQUFqQzs7QUFFQSxXQUFPQSxLQUFQO0FBQ0Q7QUFoQlksQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgX2lkOiAwLFxuICBfdWlkczogbmV3IE1hcCgpLFxuICBnZXROZXdJZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGBQVUlEXyR7Kyt0aGlzLl9pZH1gO1xuICB9LFxuICBpZDogZnVuY3Rpb24oZnVuY3Rpb25Pck9iamVjdCkge1xuICAgIGlmICh0aGlzLl91aWRzLmhhcyhmdW5jdGlvbk9yT2JqZWN0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3VpZHMuZ2V0KGZ1bmN0aW9uT3JPYmplY3QpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0lkID0gdGhpcy5nZXROZXdJZCgpO1xuXG4gICAgdGhpcy5fdWlkcy5zZXQoZnVuY3Rpb25Pck9iamVjdCwgbmV3SWQpO1xuXG4gICAgcmV0dXJuIG5ld0lkO1xuICB9LFxufTtcbiJdfQ==