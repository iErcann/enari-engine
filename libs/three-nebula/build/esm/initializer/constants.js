import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { AdditiveBlending, CustomBlending, MultiplyBlending, NoBlending, NormalBlending, SubtractiveBlending } from '../core/three/';
export const SUPPORTED_MATERIAL_BLENDING_MODES = {
  AdditiveBlending,
  CustomBlending,
  MultiplyBlending,
  NoBlending,
  NormalBlending,
  SubtractiveBlending
};
export const DEFAULT_MATERIAL_PROPERTIES = {
  color: 0xff0000,
  blending: AdditiveBlending,
  fog: true
};
export const DEFAULT_JSON_MATERIAL_PROPERTIES = _objectSpread(_objectSpread({}, DEFAULT_MATERIAL_PROPERTIES), {}, {
  blending: 'AdditiveBlending'
});
export const DEFAULT_RATE_NUM_PAN = 1;
export const DEFAULT_RATE_TIME_PAN = 1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9jb25zdGFudHMuanMiXSwibmFtZXMiOlsiQWRkaXRpdmVCbGVuZGluZyIsIkN1c3RvbUJsZW5kaW5nIiwiTXVsdGlwbHlCbGVuZGluZyIsIk5vQmxlbmRpbmciLCJOb3JtYWxCbGVuZGluZyIsIlN1YnRyYWN0aXZlQmxlbmRpbmciLCJTVVBQT1JURURfTUFURVJJQUxfQkxFTkRJTkdfTU9ERVMiLCJERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMiLCJjb2xvciIsImJsZW5kaW5nIiwiZm9nIiwiREVGQVVMVF9KU09OX01BVEVSSUFMX1BST1BFUlRJRVMiLCJERUZBVUxUX1JBVEVfTlVNX1BBTiIsIkRFRkFVTFRfUkFURV9USU1FX1BBTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsU0FDRUEsZ0JBREYsRUFFRUMsY0FGRixFQUdFQyxnQkFIRixFQUlFQyxVQUpGLEVBS0VDLGNBTEYsRUFNRUMsbUJBTkYsUUFPTyxnQkFQUDtBQVNBLE9BQU8sTUFBTUMsaUNBQWlDLEdBQUc7QUFDL0NOLEVBQUFBLGdCQUQrQztBQUUvQ0MsRUFBQUEsY0FGK0M7QUFHL0NDLEVBQUFBLGdCQUgrQztBQUkvQ0MsRUFBQUEsVUFKK0M7QUFLL0NDLEVBQUFBLGNBTCtDO0FBTS9DQyxFQUFBQTtBQU4rQyxDQUExQztBQVNQLE9BQU8sTUFBTUUsMkJBQTJCLEdBQUc7QUFDekNDLEVBQUFBLEtBQUssRUFBRSxRQURrQztBQUV6Q0MsRUFBQUEsUUFBUSxFQUFFVCxnQkFGK0I7QUFHekNVLEVBQUFBLEdBQUcsRUFBRTtBQUhvQyxDQUFwQztBQUtQLE9BQU8sTUFBTUMsZ0NBQWdDLG1DQUN4Q0osMkJBRHdDO0FBRTNDRSxFQUFBQSxRQUFRLEVBQUU7QUFGaUMsRUFBdEM7QUFJUCxPQUFPLE1BQU1HLG9CQUFvQixHQUFHLENBQTdCO0FBQ1AsT0FBTyxNQUFNQyxxQkFBcUIsR0FBRyxDQUE5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFkZGl0aXZlQmxlbmRpbmcsXG4gIEN1c3RvbUJsZW5kaW5nLFxuICBNdWx0aXBseUJsZW5kaW5nLFxuICBOb0JsZW5kaW5nLFxuICBOb3JtYWxCbGVuZGluZyxcbiAgU3VidHJhY3RpdmVCbGVuZGluZyxcbn0gZnJvbSAnLi4vY29yZS90aHJlZS8nO1xuXG5leHBvcnQgY29uc3QgU1VQUE9SVEVEX01BVEVSSUFMX0JMRU5ESU5HX01PREVTID0ge1xuICBBZGRpdGl2ZUJsZW5kaW5nLFxuICBDdXN0b21CbGVuZGluZyxcbiAgTXVsdGlwbHlCbGVuZGluZyxcbiAgTm9CbGVuZGluZyxcbiAgTm9ybWFsQmxlbmRpbmcsXG4gIFN1YnRyYWN0aXZlQmxlbmRpbmcsXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVRFUklBTF9QUk9QRVJUSUVTID0ge1xuICBjb2xvcjogMHhmZjAwMDAsXG4gIGJsZW5kaW5nOiBBZGRpdGl2ZUJsZW5kaW5nLFxuICBmb2c6IHRydWUsXG59O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSlNPTl9NQVRFUklBTF9QUk9QRVJUSUVTID0ge1xuICAuLi5ERUZBVUxUX01BVEVSSUFMX1BST1BFUlRJRVMsXG4gIGJsZW5kaW5nOiAnQWRkaXRpdmVCbGVuZGluZycsXG59O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkFURV9OVU1fUEFOID0gMTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1JBVEVfVElNRV9QQU4gPSAxO1xuIl19