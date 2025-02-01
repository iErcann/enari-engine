"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentShader = void 0;

var fragmentShader = function fragmentShader() {
  return "\n    uniform vec3 baseColor;\n    uniform sampler2D uTexture;\n    uniform sampler2D atlasIndex;\n\n    varying vec3 targetColor;\n    varying float targetAlpha;\n    varying vec4 tileRect;\n    varying float tileID;\n\n    void main() {\n      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);\n\n      vec2 uv = gl_PointCoord;\n      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);\n\n      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);\n\n    }\n";
};

exports.fragmentShader = fragmentShader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL3NoYWRlcnMvZnJhZ21lbnRTaGFkZXIuanMiXSwibmFtZXMiOlsiZnJhZ21lbnRTaGFkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDbEM7QUFvQkQsQ0FyQk0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gICAgdW5pZm9ybSB2ZWMzIGJhc2VDb2xvcjtcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB1VGV4dHVyZTtcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCBhdGxhc0luZGV4O1xuXG4gICAgdmFyeWluZyB2ZWMzIHRhcmdldENvbG9yO1xuICAgIHZhcnlpbmcgZmxvYXQgdGFyZ2V0QWxwaGE7XG4gICAgdmFyeWluZyB2ZWM0IHRpbGVSZWN0O1xuICAgIHZhcnlpbmcgZmxvYXQgdGlsZUlEO1xuXG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChiYXNlQ29sb3IgKiB0YXJnZXRDb2xvciwgdGFyZ2V0QWxwaGEpO1xuXG4gICAgICB2ZWMyIHV2ID0gZ2xfUG9pbnRDb29yZDtcbiAgICAgIHV2ID0gbWl4KHRpbGVSZWN0Lnh5LCB0aWxlUmVjdC56dywgZ2xfUG9pbnRDb29yZCk7XG5cbiAgICAgIGdsX0ZyYWdDb2xvciA9IGdsX0ZyYWdDb2xvciAqIHRleHR1cmUyRCh1VGV4dHVyZSwgdXYpO1xuXG4gICAgfVxuYDtcbn07XG4iXX0=