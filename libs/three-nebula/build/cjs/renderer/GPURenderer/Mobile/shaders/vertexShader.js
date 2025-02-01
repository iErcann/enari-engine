"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vertexShader = void 0;

var _constants = require("../../common/shaders/constants");

var vertexShader = function vertexShader() {
  return "\n    uniform sampler2D uTexture;\n    uniform vec2 atlasDim;\n\n    attribute float size;\n    attribute vec3 color;\n    attribute float alpha;\n    attribute vec2 texID;\n\n    varying vec3 targetColor;\n    varying float targetAlpha;\n    varying vec4 tileRect;\n\n    void main() {\n      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n      targetColor = color;\n      targetAlpha = alpha;\n\n      vec2 tmin = floor(texID) / atlasDim;\n      vec2 tmax = fract(texID);\n      tileRect = vec4(tmin,tmax);\n\n      gl_PointSize = ((size * ".concat(_constants.SIZE_ATTENUATION_FACTOR, ") / -mvPosition.z);\n      gl_Position = projectionMatrix * mvPosition;\n    }\n");
};

exports.vertexShader = vertexShader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9Nb2JpbGUvc2hhZGVycy92ZXJ0ZXhTaGFkZXIuanMiXSwibmFtZXMiOlsidmVydGV4U2hhZGVyIiwiU0laRV9BVFRFTlVBVElPTl9GQUNUT1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFTyxJQUFNQSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ2hDLDZqQkFzQjhCQyxrQ0F0QjlCO0FBMEJELENBM0JNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0laRV9BVFRFTlVBVElPTl9GQUNUT1IgfSBmcm9tICcuLi8uLi9jb21tb24vc2hhZGVycy9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgdmVydGV4U2hhZGVyID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1xuICAgIHVuaWZvcm0gdmVjMiBhdGxhc0RpbTtcblxuICAgIGF0dHJpYnV0ZSBmbG9hdCBzaXplO1xuICAgIGF0dHJpYnV0ZSB2ZWMzIGNvbG9yO1xuICAgIGF0dHJpYnV0ZSBmbG9hdCBhbHBoYTtcbiAgICBhdHRyaWJ1dGUgdmVjMiB0ZXhJRDtcblxuICAgIHZhcnlpbmcgdmVjMyB0YXJnZXRDb2xvcjtcbiAgICB2YXJ5aW5nIGZsb2F0IHRhcmdldEFscGhhO1xuICAgIHZhcnlpbmcgdmVjNCB0aWxlUmVjdDtcblxuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIHZlYzQgbXZQb3NpdGlvbiA9IG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XG4gICAgICB0YXJnZXRDb2xvciA9IGNvbG9yO1xuICAgICAgdGFyZ2V0QWxwaGEgPSBhbHBoYTtcblxuICAgICAgdmVjMiB0bWluID0gZmxvb3IodGV4SUQpIC8gYXRsYXNEaW07XG4gICAgICB2ZWMyIHRtYXggPSBmcmFjdCh0ZXhJRCk7XG4gICAgICB0aWxlUmVjdCA9IHZlYzQodG1pbix0bWF4KTtcblxuICAgICAgZ2xfUG9pbnRTaXplID0gKChzaXplICogJHtTSVpFX0FUVEVOVUFUSU9OX0ZBQ1RPUn0pIC8gLW12UG9zaXRpb24ueik7XG4gICAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtdlBvc2l0aW9uO1xuICAgIH1cbmA7XG59O1xuIl19