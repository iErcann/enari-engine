import MathUtils from './MathUtils';
import Span from './Span';
import sample from 'lodash/sample';
import { MATH_TYPE_COLOR_SPAN as type } from './types';
/**
 * Class for storing and interacting with an array of colours.
 *
 */

export default class ColorSpan extends Span {
  /**
   * Constructs a ColorSpan instance.
   *
   * @param {string|array<string>} colors - A color or array of colors. If the
   * string 'random' is provided, a random color will be returned from getValue
   * @return void
   */
  constructor(colors) {
    super();
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc Determines if a random color should be returned from the getValue method.
     * @type {boolean}
     */

    this.shouldRandomize = colors === 'random' ? true : false;
    /**
     * @desc An array of colors to select from
     * @type {array<string>}
     */

    this.colors = Array.isArray(colors) ? colors : [colors];
  }
  /**
   * Gets a color from the color array
   * or a random color if this.shouldRandomize is true.
   *
   * @return {string} a hex color
   */


  getValue() {
    return this.shouldRandomize ? MathUtils.randomColor() : sample(this.colors);
  }

}
/**
 * Attempts to create an ArraySpan from the colors provided.
 *
 * @param {mixed} colors - colors to try and create an ArraySpan from
 * @return {?ColorSpan}
 */

export const createColorSpan = colors => {
  if (!colors) {
    console.warn(`Invalid colors argument ${colors} passed to createColorSpan. Defaulting to 'random'.`);
    colors = 'random';
  }

  if (colors instanceof ColorSpan) {
    return colors;
  }

  return new ColorSpan(colors);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0NvbG9yU3Bhbi5qcyJdLCJuYW1lcyI6WyJNYXRoVXRpbHMiLCJTcGFuIiwic2FtcGxlIiwiTUFUSF9UWVBFX0NPTE9SX1NQQU4iLCJ0eXBlIiwiQ29sb3JTcGFuIiwiY29uc3RydWN0b3IiLCJjb2xvcnMiLCJzaG91bGRSYW5kb21pemUiLCJBcnJheSIsImlzQXJyYXkiLCJnZXRWYWx1ZSIsInJhbmRvbUNvbG9yIiwiY3JlYXRlQ29sb3JTcGFuIiwiY29uc29sZSIsIndhcm4iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixlQUFuQjtBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkosSUFBeEIsQ0FBNkI7QUFDMUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQVM7QUFDbEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSSxlQUFMLEdBQXVCRCxNQUFNLEtBQUssUUFBWCxHQUFzQixJQUF0QixHQUE2QixLQUFwRDtBQUVBO0FBQ0o7QUFDQTtBQUNBOztBQUNJLFNBQUtBLE1BQUwsR0FBY0UsS0FBSyxDQUFDQyxPQUFOLENBQWNILE1BQWQsSUFBd0JBLE1BQXhCLEdBQWlDLENBQUNBLE1BQUQsQ0FBL0M7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VJLEVBQUFBLFFBQVEsR0FBRztBQUNULFdBQU8sS0FBS0gsZUFBTCxHQUF1QlIsU0FBUyxDQUFDWSxXQUFWLEVBQXZCLEdBQWlEVixNQUFNLENBQUMsS0FBS0ssTUFBTixDQUE5RDtBQUNEOztBQXRDeUM7QUF5QzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxPQUFPLE1BQU1NLGVBQWUsR0FBR04sTUFBTSxJQUFJO0FBQ3ZDLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1hPLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNHLDJCQUEwQlIsTUFBTyxxREFEcEM7QUFJQUEsSUFBQUEsTUFBTSxHQUFHLFFBQVQ7QUFDRDs7QUFFRCxNQUFJQSxNQUFNLFlBQVlGLFNBQXRCLEVBQWlDO0FBQy9CLFdBQU9FLE1BQVA7QUFDRDs7QUFFRCxTQUFPLElBQUlGLFNBQUosQ0FBY0UsTUFBZCxDQUFQO0FBQ0QsQ0FkTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRoVXRpbHMgZnJvbSAnLi9NYXRoVXRpbHMnO1xuaW1wb3J0IFNwYW4gZnJvbSAnLi9TcGFuJztcbmltcG9ydCBzYW1wbGUgZnJvbSAnbG9kYXNoL3NhbXBsZSc7XG5pbXBvcnQgeyBNQVRIX1RZUEVfQ09MT1JfU1BBTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHN0b3JpbmcgYW5kIGludGVyYWN0aW5nIHdpdGggYW4gYXJyYXkgb2YgY29sb3Vycy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU3BhbiBleHRlbmRzIFNwYW4ge1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIENvbG9yU3BhbiBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8YXJyYXk8c3RyaW5nPn0gY29sb3JzIC0gQSBjb2xvciBvciBhcnJheSBvZiBjb2xvcnMuIElmIHRoZVxuICAgKiBzdHJpbmcgJ3JhbmRvbScgaXMgcHJvdmlkZWQsIGEgcmFuZG9tIGNvbG9yIHdpbGwgYmUgcmV0dXJuZWQgZnJvbSBnZXRWYWx1ZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbG9ycykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIGEgcmFuZG9tIGNvbG9yIHNob3VsZCBiZSByZXR1cm5lZCBmcm9tIHRoZSBnZXRWYWx1ZSBtZXRob2QuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zaG91bGRSYW5kb21pemUgPSBjb2xvcnMgPT09ICdyYW5kb20nID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2MgQW4gYXJyYXkgb2YgY29sb3JzIHRvIHNlbGVjdCBmcm9tXG4gICAgICogQHR5cGUge2FycmF5PHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5jb2xvcnMgPSBBcnJheS5pc0FycmF5KGNvbG9ycykgPyBjb2xvcnMgOiBbY29sb3JzXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgY29sb3IgZnJvbSB0aGUgY29sb3IgYXJyYXlcbiAgICogb3IgYSByYW5kb20gY29sb3IgaWYgdGhpcy5zaG91bGRSYW5kb21pemUgaXMgdHJ1ZS5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBhIGhleCBjb2xvclxuICAgKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hvdWxkUmFuZG9taXplID8gTWF0aFV0aWxzLnJhbmRvbUNvbG9yKCkgOiBzYW1wbGUodGhpcy5jb2xvcnMpO1xuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gY3JlYXRlIGFuIEFycmF5U3BhbiBmcm9tIHRoZSBjb2xvcnMgcHJvdmlkZWQuXG4gKlxuICogQHBhcmFtIHttaXhlZH0gY29sb3JzIC0gY29sb3JzIHRvIHRyeSBhbmQgY3JlYXRlIGFuIEFycmF5U3BhbiBmcm9tXG4gKiBAcmV0dXJuIHs/Q29sb3JTcGFufVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ29sb3JTcGFuID0gY29sb3JzID0+IHtcbiAgaWYgKCFjb2xvcnMpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgSW52YWxpZCBjb2xvcnMgYXJndW1lbnQgJHtjb2xvcnN9IHBhc3NlZCB0byBjcmVhdGVDb2xvclNwYW4uIERlZmF1bHRpbmcgdG8gJ3JhbmRvbScuYFxuICAgICk7XG5cbiAgICBjb2xvcnMgPSAncmFuZG9tJztcbiAgfVxuXG4gIGlmIChjb2xvcnMgaW5zdGFuY2VvZiBDb2xvclNwYW4pIHtcbiAgICByZXR1cm4gY29sb3JzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBDb2xvclNwYW4oY29sb3JzKTtcbn07XG4iXX0=