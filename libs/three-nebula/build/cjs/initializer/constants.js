"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_RATE_TIME_PAN = exports.DEFAULT_RATE_NUM_PAN = exports.DEFAULT_JSON_MATERIAL_PROPERTIES = exports.DEFAULT_MATERIAL_PROPERTIES = exports.SUPPORTED_MATERIAL_BLENDING_MODES = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _three = require("../core/three/");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SUPPORTED_MATERIAL_BLENDING_MODES = {
  AdditiveBlending: _three.AdditiveBlending,
  CustomBlending: _three.CustomBlending,
  MultiplyBlending: _three.MultiplyBlending,
  NoBlending: _three.NoBlending,
  NormalBlending: _three.NormalBlending,
  SubtractiveBlending: _three.SubtractiveBlending
};
exports.SUPPORTED_MATERIAL_BLENDING_MODES = SUPPORTED_MATERIAL_BLENDING_MODES;
var DEFAULT_MATERIAL_PROPERTIES = {
  color: 0xff0000,
  blending: _three.AdditiveBlending,
  fog: true
};
exports.DEFAULT_MATERIAL_PROPERTIES = DEFAULT_MATERIAL_PROPERTIES;

var DEFAULT_JSON_MATERIAL_PROPERTIES = _objectSpread(_objectSpread({}, DEFAULT_MATERIAL_PROPERTIES), {}, {
  blending: 'AdditiveBlending'
});

exports.DEFAULT_JSON_MATERIAL_PROPERTIES = DEFAULT_JSON_MATERIAL_PROPERTIES;
var DEFAULT_RATE_NUM_PAN = 1;
exports.DEFAULT_RATE_NUM_PAN = DEFAULT_RATE_NUM_PAN;
var DEFAULT_RATE_TIME_PAN = 1;
exports.DEFAULT_RATE_TIME_PAN = DEFAULT_RATE_TIME_PAN;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9jb25zdGFudHMuanMiXSwibmFtZXMiOlsiU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTIiwiQWRkaXRpdmVCbGVuZGluZyIsIkN1c3RvbUJsZW5kaW5nIiwiTXVsdGlwbHlCbGVuZGluZyIsIk5vQmxlbmRpbmciLCJOb3JtYWxCbGVuZGluZyIsIlN1YnRyYWN0aXZlQmxlbmRpbmciLCJERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMiLCJjb2xvciIsImJsZW5kaW5nIiwiZm9nIiwiREVGQVVMVF9KU09OX01BVEVSSUFMX1BST1BFUlRJRVMiLCJERUZBVUxUX1JBVEVfTlVNX1BBTiIsIkRFRkFVTFRfUkFURV9USU1FX1BBTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBU08sSUFBTUEsaUNBQWlDLEdBQUc7QUFDL0NDLEVBQUFBLGdCQUFnQixFQUFoQkEsdUJBRCtDO0FBRS9DQyxFQUFBQSxjQUFjLEVBQWRBLHFCQUYrQztBQUcvQ0MsRUFBQUEsZ0JBQWdCLEVBQWhCQSx1QkFIK0M7QUFJL0NDLEVBQUFBLFVBQVUsRUFBVkEsaUJBSitDO0FBSy9DQyxFQUFBQSxjQUFjLEVBQWRBLHFCQUwrQztBQU0vQ0MsRUFBQUEsbUJBQW1CLEVBQW5CQTtBQU4rQyxDQUExQzs7QUFTQSxJQUFNQywyQkFBMkIsR0FBRztBQUN6Q0MsRUFBQUEsS0FBSyxFQUFFLFFBRGtDO0FBRXpDQyxFQUFBQSxRQUFRLEVBQUVSLHVCQUYrQjtBQUd6Q1MsRUFBQUEsR0FBRyxFQUFFO0FBSG9DLENBQXBDOzs7QUFLQSxJQUFNQyxnQ0FBZ0MsbUNBQ3hDSiwyQkFEd0M7QUFFM0NFLEVBQUFBLFFBQVEsRUFBRTtBQUZpQyxFQUF0Qzs7O0FBSUEsSUFBTUcsb0JBQW9CLEdBQUcsQ0FBN0I7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsQ0FBOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZGRpdGl2ZUJsZW5kaW5nLFxuICBDdXN0b21CbGVuZGluZyxcbiAgTXVsdGlwbHlCbGVuZGluZyxcbiAgTm9CbGVuZGluZyxcbiAgTm9ybWFsQmxlbmRpbmcsXG4gIFN1YnRyYWN0aXZlQmxlbmRpbmcsXG59IGZyb20gJy4uL2NvcmUvdGhyZWUvJztcblxuZXhwb3J0IGNvbnN0IFNVUFBPUlRFRF9NQVRFUklBTF9CTEVORElOR19NT0RFUyA9IHtcbiAgQWRkaXRpdmVCbGVuZGluZyxcbiAgQ3VzdG9tQmxlbmRpbmcsXG4gIE11bHRpcGx5QmxlbmRpbmcsXG4gIE5vQmxlbmRpbmcsXG4gIE5vcm1hbEJsZW5kaW5nLFxuICBTdWJ0cmFjdGl2ZUJsZW5kaW5nLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFURVJJQUxfUFJPUEVSVElFUyA9IHtcbiAgY29sb3I6IDB4ZmYwMDAwLFxuICBibGVuZGluZzogQWRkaXRpdmVCbGVuZGluZyxcbiAgZm9nOiB0cnVlLFxufTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0pTT05fTUFURVJJQUxfUFJPUEVSVElFUyA9IHtcbiAgLi4uREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTLFxuICBibGVuZGluZzogJ0FkZGl0aXZlQmxlbmRpbmcnLFxufTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1JBVEVfTlVNX1BBTiA9IDE7XG5leHBvcnQgY29uc3QgREVGQVVMVF9SQVRFX1RJTUVfUEFOID0gMTtcbiJdfQ==