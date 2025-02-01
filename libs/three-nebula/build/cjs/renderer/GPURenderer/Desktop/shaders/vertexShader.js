"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vertexShader = void 0;

var _constants = require("../../common/TextureAtlas/constants");

var _constants2 = require("../../common/shaders/constants");

var vertexShader = function vertexShader() {
  return "\n    uniform sampler2D uTexture;\n    //atlasIndex is a 256x1 float texture of tile rectangles as r=minx g=miny b=maxx a=maxy\n    uniform sampler2D atlasIndex;\n\n    attribute float size;\n    attribute vec3 color;\n    attribute float alpha;\n    attribute float texID;\n\n    varying vec3 targetColor;\n    varying float targetAlpha;\n    varying vec4 tileRect;\n    varying float tileID;\n\n    void main() {\n      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n      targetColor = color;\n      targetAlpha = alpha;\n\n      tileID = texID;\n      //get the tile rectangle from the atlasIndex texture..\n      tileRect = texture2D(atlasIndex, vec2((tileID + 0.5) / ".concat(_constants.DATA_TEXTURE_SIZE, ".0, 0.5));\n\n      gl_PointSize = ((size * ").concat(_constants2.SIZE_ATTENUATION_FACTOR, ") / -mvPosition.z);\n      gl_Position = projectionMatrix * mvPosition;\n    }\n");
};

exports.vertexShader = vertexShader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIl0sIm5hbWVzIjpbInZlcnRleFNoYWRlciIsIkRBVEFfVEVYVFVSRV9TSVpFIiwiU0laRV9BVFRFTlVBVElPTl9GQUNUT1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFTyxJQUFNQSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ2hDLCtyQkFzQjZEQyw0QkF0QjdELHlEQXdCOEJDLG1DQXhCOUI7QUE0QkQsQ0E3Qk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEQVRBX1RFWFRVUkVfU0laRSB9IGZyb20gJy4uLy4uL2NvbW1vbi9UZXh0dXJlQXRsYXMvY29uc3RhbnRzJztcbmltcG9ydCB7IFNJWkVfQVRURU5VQVRJT05fRkFDVE9SIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NoYWRlcnMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHZlcnRleFNoYWRlciA9ICgpID0+IHtcbiAgcmV0dXJuIGBcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB1VGV4dHVyZTtcbiAgICAvL2F0bGFzSW5kZXggaXMgYSAyNTZ4MSBmbG9hdCB0ZXh0dXJlIG9mIHRpbGUgcmVjdGFuZ2xlcyBhcyByPW1pbnggZz1taW55IGI9bWF4eCBhPW1heHlcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCBhdGxhc0luZGV4O1xuXG4gICAgYXR0cmlidXRlIGZsb2F0IHNpemU7XG4gICAgYXR0cmlidXRlIHZlYzMgY29sb3I7XG4gICAgYXR0cmlidXRlIGZsb2F0IGFscGhhO1xuICAgIGF0dHJpYnV0ZSBmbG9hdCB0ZXhJRDtcblxuICAgIHZhcnlpbmcgdmVjMyB0YXJnZXRDb2xvcjtcbiAgICB2YXJ5aW5nIGZsb2F0IHRhcmdldEFscGhhO1xuICAgIHZhcnlpbmcgdmVjNCB0aWxlUmVjdDtcbiAgICB2YXJ5aW5nIGZsb2F0IHRpbGVJRDtcblxuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIHZlYzQgbXZQb3NpdGlvbiA9IG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7XG4gICAgICB0YXJnZXRDb2xvciA9IGNvbG9yO1xuICAgICAgdGFyZ2V0QWxwaGEgPSBhbHBoYTtcblxuICAgICAgdGlsZUlEID0gdGV4SUQ7XG4gICAgICAvL2dldCB0aGUgdGlsZSByZWN0YW5nbGUgZnJvbSB0aGUgYXRsYXNJbmRleCB0ZXh0dXJlLi5cbiAgICAgIHRpbGVSZWN0ID0gdGV4dHVyZTJEKGF0bGFzSW5kZXgsIHZlYzIoKHRpbGVJRCArIDAuNSkgLyAke0RBVEFfVEVYVFVSRV9TSVpFfS4wLCAwLjUpKTtcblxuICAgICAgZ2xfUG9pbnRTaXplID0gKChzaXplICogJHtTSVpFX0FUVEVOVUFUSU9OX0ZBQ1RPUn0pIC8gLW12UG9zaXRpb24ueik7XG4gICAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtdlBvc2l0aW9uO1xuICAgIH1cbmA7XG59O1xuIl19