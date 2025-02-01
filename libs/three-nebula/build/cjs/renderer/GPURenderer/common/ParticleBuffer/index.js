"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _constants = require("./constants");

var THREE;
/**
 * Creates and provides performant buffers for mapping particle properties to geometry vertices.
 *
 * @author thrax <manthrax@gmail.com>
 * @author rohan-deshpande <rohan@creativelifeform.com>
 * @see https://threejs.org/examples/?q=buffe#webgl_buffergeometry_points_interleaved
 * @see https://threejs.org/examples/?q=points#webgl_custom_attributes_points
 */

var ParticleBuffer = /*#__PURE__*/function () {
  function ParticleBuffer() {
    var maxParticles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.DEFAULT_MAX_PARTICLES;
    var three = arguments.length > 1 ? arguments[1] : undefined;
    (0, _classCallCheck2["default"])(this, ParticleBuffer);
    THREE = three;
    this.maxParticles = maxParticles;
    this.createInterleavedBuffer().createBufferGeometry();
  }
  /**
   * Creates the interleaved buffer that will be used to write data to the GPU.
   *
   * @return {ParticleBuffer}
   */


  (0, _createClass2["default"])(ParticleBuffer, [{
    key: "createInterleavedBuffer",
    value: function createInterleavedBuffer() {
      var arrayBuffer = new ArrayBuffer(this.maxParticles * _constants.PARTICLE_BYTE_SIZE);
      this.interleavedBuffer = new THREE.InterleavedBuffer(new Float32Array(arrayBuffer), _constants.PARTICLE_BYTE_SIZE); // this.interleavedBuffer.usage = THREE.DynamicDrawUsage;

      return this;
    }
    /**
     * Sets the geometry's buffer attributes.
     *
     * NOTE Each attribute needs to be set at the right index in the buffer right after the previous
     * attribute that occupies a set amount of size in the buffer.
     *
     * @return {ParticleBufferGeometry}
     */

  }, {
    key: "createBufferGeometry",
    value: function createBufferGeometry() {
      this.geometry = new THREE.BufferGeometry();
      var interleavedBuffer = this.interleavedBuffer,
          geometry = this.geometry;
      Object.keys(_constants.ATTRIBUTE_TO_SIZE_MAP).reduce(function (offset, attribute) {
        var size = _constants.ATTRIBUTE_TO_SIZE_MAP[attribute];
        geometry.setAttribute(attribute, new THREE.InterleavedBufferAttribute(interleavedBuffer, size, offset));
        return offset += size;
      }, 0);
      return this;
    }
    /**
     * Gets the publicly accessible interleaved buffer.
     *
     * @return {THREE.InterleavedBuffer} buffers - The interleaved buffer
     */

  }, {
    key: "buffer",
    get: function get() {
      return this.interleavedBuffer;
    }
  }, {
    key: "stride",
    get: function get() {
      return _constants.PARTICLE_BYTE_SIZE;
    }
  }]);
  return ParticleBuffer;
}();

exports["default"] = ParticleBuffer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9jb21tb24vUGFydGljbGVCdWZmZXIvaW5kZXguanMiXSwibmFtZXMiOlsiVEhSRUUiLCJQYXJ0aWNsZUJ1ZmZlciIsIm1heFBhcnRpY2xlcyIsIkRFRkFVTFRfTUFYX1BBUlRJQ0xFUyIsInRocmVlIiwiY3JlYXRlSW50ZXJsZWF2ZWRCdWZmZXIiLCJjcmVhdGVCdWZmZXJHZW9tZXRyeSIsImFycmF5QnVmZmVyIiwiQXJyYXlCdWZmZXIiLCJQQVJUSUNMRV9CWVRFX1NJWkUiLCJpbnRlcmxlYXZlZEJ1ZmZlciIsIkludGVybGVhdmVkQnVmZmVyIiwiRmxvYXQzMkFycmF5IiwiZ2VvbWV0cnkiLCJCdWZmZXJHZW9tZXRyeSIsIk9iamVjdCIsImtleXMiLCJBVFRSSUJVVEVfVE9fU0laRV9NQVAiLCJyZWR1Y2UiLCJvZmZzZXQiLCJhdHRyaWJ1dGUiLCJzaXplIiwic2V0QXR0cmlidXRlIiwiSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFNQSxJQUFJQSxLQUFKO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFDcUJDLGM7QUFDbkIsNEJBQXlEO0FBQUEsUUFBN0NDLFlBQTZDLHVFQUE5QkMsZ0NBQThCO0FBQUEsUUFBUEMsS0FBTztBQUFBO0FBQ3ZESixJQUFBQSxLQUFLLEdBQUdJLEtBQVI7QUFDQSxTQUFLRixZQUFMLEdBQW9CQSxZQUFwQjtBQUVBLFNBQUtHLHVCQUFMLEdBQStCQyxvQkFBL0I7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7OzhDQUM0QjtBQUN4QixVQUFNQyxXQUFXLEdBQUcsSUFBSUMsV0FBSixDQUFnQixLQUFLTixZQUFMLEdBQW9CTyw2QkFBcEMsQ0FBcEI7QUFFQSxXQUFLQyxpQkFBTCxHQUF5QixJQUFJVixLQUFLLENBQUNXLGlCQUFWLENBQ3ZCLElBQUlDLFlBQUosQ0FBaUJMLFdBQWpCLENBRHVCLEVBRXZCRSw2QkFGdUIsQ0FBekIsQ0FId0IsQ0FPeEI7O0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzJDQUN5QjtBQUNyQixXQUFLSSxRQUFMLEdBQWdCLElBQUliLEtBQUssQ0FBQ2MsY0FBVixFQUFoQjtBQURxQixVQUdiSixpQkFIYSxHQUdtQixJQUhuQixDQUdiQSxpQkFIYTtBQUFBLFVBR01HLFFBSE4sR0FHbUIsSUFIbkIsQ0FHTUEsUUFITjtBQUtyQkUsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlDLGdDQUFaLEVBQW1DQyxNQUFuQyxDQUEwQyxVQUFDQyxNQUFELEVBQVNDLFNBQVQsRUFBdUI7QUFDL0QsWUFBTUMsSUFBSSxHQUFHSixpQ0FBc0JHLFNBQXRCLENBQWI7QUFFQVAsUUFBQUEsUUFBUSxDQUFDUyxZQUFULENBQ0VGLFNBREYsRUFFRSxJQUFJcEIsS0FBSyxDQUFDdUIsMEJBQVYsQ0FBcUNiLGlCQUFyQyxFQUF3RFcsSUFBeEQsRUFBOERGLE1BQTlELENBRkY7QUFLQSxlQUFRQSxNQUFNLElBQUlFLElBQWxCO0FBQ0QsT0FURCxFQVNHLENBVEg7QUFXQSxhQUFPLElBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7d0JBQ2U7QUFDWCxhQUFPLEtBQUtYLGlCQUFaO0FBQ0Q7Ozt3QkFFWTtBQUNYLGFBQU9ELDZCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBVFRSSUJVVEVfVE9fU0laRV9NQVAsXG4gIERFRkFVTFRfTUFYX1BBUlRJQ0xFUyxcbiAgUEFSVElDTEVfQllURV9TSVpFLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmxldCBUSFJFRTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBwcm92aWRlcyBwZXJmb3JtYW50IGJ1ZmZlcnMgZm9yIG1hcHBpbmcgcGFydGljbGUgcHJvcGVydGllcyB0byBnZW9tZXRyeSB2ZXJ0aWNlcy5cbiAqXG4gKiBAYXV0aG9yIHRocmF4IDxtYW50aHJheEBnbWFpbC5jb20+XG4gKiBAYXV0aG9yIHJvaGFuLWRlc2hwYW5kZSA8cm9oYW5AY3JlYXRpdmVsaWZlZm9ybS5jb20+XG4gKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9YnVmZmUjd2ViZ2xfYnVmZmVyZ2VvbWV0cnlfcG9pbnRzX2ludGVybGVhdmVkXG4gKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9cG9pbnRzI3dlYmdsX2N1c3RvbV9hdHRyaWJ1dGVzX3BvaW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZUJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yKG1heFBhcnRpY2xlcyA9IERFRkFVTFRfTUFYX1BBUlRJQ0xFUywgdGhyZWUpIHtcbiAgICBUSFJFRSA9IHRocmVlO1xuICAgIHRoaXMubWF4UGFydGljbGVzID0gbWF4UGFydGljbGVzO1xuXG4gICAgdGhpcy5jcmVhdGVJbnRlcmxlYXZlZEJ1ZmZlcigpLmNyZWF0ZUJ1ZmZlckdlb21ldHJ5KCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgaW50ZXJsZWF2ZWQgYnVmZmVyIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHdyaXRlIGRhdGEgdG8gdGhlIEdQVS5cbiAgICpcbiAgICogQHJldHVybiB7UGFydGljbGVCdWZmZXJ9XG4gICAqL1xuICBjcmVhdGVJbnRlcmxlYXZlZEJ1ZmZlcigpIHtcbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLm1heFBhcnRpY2xlcyAqIFBBUlRJQ0xFX0JZVEVfU0laRSk7XG5cbiAgICB0aGlzLmludGVybGVhdmVkQnVmZmVyID0gbmV3IFRIUkVFLkludGVybGVhdmVkQnVmZmVyKFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShhcnJheUJ1ZmZlciksXG4gICAgICBQQVJUSUNMRV9CWVRFX1NJWkVcbiAgICApO1xuICAgIC8vIHRoaXMuaW50ZXJsZWF2ZWRCdWZmZXIudXNhZ2UgPSBUSFJFRS5EeW5hbWljRHJhd1VzYWdlO1xuICAgIFxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGdlb21ldHJ5J3MgYnVmZmVyIGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIE5PVEUgRWFjaCBhdHRyaWJ1dGUgbmVlZHMgdG8gYmUgc2V0IGF0IHRoZSByaWdodCBpbmRleCBpbiB0aGUgYnVmZmVyIHJpZ2h0IGFmdGVyIHRoZSBwcmV2aW91c1xuICAgKiBhdHRyaWJ1dGUgdGhhdCBvY2N1cGllcyBhIHNldCBhbW91bnQgb2Ygc2l6ZSBpbiB0aGUgYnVmZmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtQYXJ0aWNsZUJ1ZmZlckdlb21ldHJ5fVxuICAgKi9cbiAgY3JlYXRlQnVmZmVyR2VvbWV0cnkoKSB7XG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG4gICAgY29uc3QgeyBpbnRlcmxlYXZlZEJ1ZmZlciwgZ2VvbWV0cnkgfSA9IHRoaXM7XG5cbiAgICBPYmplY3Qua2V5cyhBVFRSSUJVVEVfVE9fU0laRV9NQVApLnJlZHVjZSgob2Zmc2V0LCBhdHRyaWJ1dGUpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBBVFRSSUJVVEVfVE9fU0laRV9NQVBbYXR0cmlidXRlXTtcblxuICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKFxuICAgICAgICBhdHRyaWJ1dGUsXG4gICAgICAgIG5ldyBUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZShpbnRlcmxlYXZlZEJ1ZmZlciwgc2l6ZSwgb2Zmc2V0KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIChvZmZzZXQgKz0gc2l6ZSk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwdWJsaWNseSBhY2Nlc3NpYmxlIGludGVybGVhdmVkIGJ1ZmZlci5cbiAgICpcbiAgICogQHJldHVybiB7VEhSRUUuSW50ZXJsZWF2ZWRCdWZmZXJ9IGJ1ZmZlcnMgLSBUaGUgaW50ZXJsZWF2ZWQgYnVmZmVyXG4gICAqL1xuICBnZXQgYnVmZmVyKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybGVhdmVkQnVmZmVyO1xuICB9XG5cbiAgZ2V0IHN0cmlkZSgpIHtcbiAgICByZXR1cm4gUEFSVElDTEVfQllURV9TSVpFO1xuICB9XG59XG4iXX0=