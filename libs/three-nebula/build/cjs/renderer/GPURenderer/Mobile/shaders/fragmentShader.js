"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentShader = void 0;

var fragmentShader = function fragmentShader() {
  return "\n    uniform vec3 baseColor;\n    uniform sampler2D uTexture;\n\n    varying vec3 targetColor;\n    varying float targetAlpha;\n    varying vec4 tileRect;\n\n    void main() {\n      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);\n\n      vec2 uv = gl_PointCoord;\n      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);\n\n      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);\n    }\n";
};

exports.fragmentShader = fragmentShader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9Nb2JpbGUvc2hhZGVycy9mcmFnbWVudFNoYWRlci5qcyJdLCJuYW1lcyI6WyJmcmFnbWVudFNoYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUNsQztBQWlCRCxDQWxCTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmcmFnbWVudFNoYWRlciA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgICB1bmlmb3JtIHZlYzMgYmFzZUNvbG9yO1xuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1xuXG4gICAgdmFyeWluZyB2ZWMzIHRhcmdldENvbG9yO1xuICAgIHZhcnlpbmcgZmxvYXQgdGFyZ2V0QWxwaGE7XG4gICAgdmFyeWluZyB2ZWM0IHRpbGVSZWN0O1xuXG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChiYXNlQ29sb3IgKiB0YXJnZXRDb2xvciwgdGFyZ2V0QWxwaGEpO1xuXG4gICAgICB2ZWMyIHV2ID0gZ2xfUG9pbnRDb29yZDtcbiAgICAgIHV2ID0gbWl4KHRpbGVSZWN0Lnh5LCB0aWxlUmVjdC56dywgZ2xfUG9pbnRDb29yZCk7XG5cbiAgICAgIGdsX0ZyYWdDb2xvciA9IGdsX0ZyYWdDb2xvciAqIHRleHR1cmUyRCh1VGV4dHVyZSwgdXYpO1xuICAgIH1cbmA7XG59O1xuIl19