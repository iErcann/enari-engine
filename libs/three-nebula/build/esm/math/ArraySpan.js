import Span from './Span';
import sample from 'lodash/sample';
import { MATH_TYPE_ARRAY_SPAN as type } from './types';
/**
 * Class for storing items of mixed type and fetching a randomised
 * value from these items.
 *
 */

export default class ArraySpan extends Span {
  /**
   * Constructs an ArraySpan instance.
   *
   * @param {mixed|array<mixed>} items - Items
   * @return void
   */
  constructor(items) {
    super();
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc An array of colors
     * @type {array}
     */

    this.items = Array.isArray(items) ? items : [items];
  }
  /**
   * Gets a random item.
   *
   * @return {mixed}
   */


  getValue() {
    return sample(this.items);
  }

}
/**
 * Attempts to create an ArraySpan from the items provided.
 *
 * @param {mixed} items - Items to try and create an ArraySpan from
 * @return {?ArraySpan}
 */

export const createArraySpan = items => {
  if (!items) {
    return null;
  }

  if (items instanceof ArraySpan) {
    return items;
  }

  return new ArraySpan(items);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyJdLCJuYW1lcyI6WyJTcGFuIiwic2FtcGxlIiwiTUFUSF9UWVBFX0FSUkFZX1NQQU4iLCJ0eXBlIiwiQXJyYXlTcGFuIiwiY29uc3RydWN0b3IiLCJpdGVtcyIsIkFycmF5IiwiaXNBcnJheSIsImdldFZhbHVlIiwiY3JlYXRlQXJyYXlTcGFuIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixlQUFuQjtBQUNBLFNBQVNDLG9CQUFvQixJQUFJQyxJQUFqQyxRQUE2QyxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZSxNQUFNQyxTQUFOLFNBQXdCSixJQUF4QixDQUE2QjtBQUMxQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVE7QUFDakI7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTs7QUFDSSxTQUFLRyxLQUFMLEdBQWFDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixLQUFkLElBQXVCQSxLQUF2QixHQUErQixDQUFDQSxLQUFELENBQTVDO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUcsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsV0FBT1IsTUFBTSxDQUFDLEtBQUtLLEtBQU4sQ0FBYjtBQUNEOztBQTlCeUM7QUFpQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxPQUFPLE1BQU1JLGVBQWUsR0FBR0osS0FBSyxJQUFJO0FBQ3RDLE1BQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSUEsS0FBSyxZQUFZRixTQUFyQixFQUFnQztBQUM5QixXQUFPRSxLQUFQO0FBQ0Q7O0FBRUQsU0FBTyxJQUFJRixTQUFKLENBQWNFLEtBQWQsQ0FBUDtBQUNELENBVk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3BhbiBmcm9tICcuL1NwYW4nO1xuaW1wb3J0IHNhbXBsZSBmcm9tICdsb2Rhc2gvc2FtcGxlJztcbmltcG9ydCB7IE1BVEhfVFlQRV9BUlJBWV9TUEFOIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBDbGFzcyBmb3Igc3RvcmluZyBpdGVtcyBvZiBtaXhlZCB0eXBlIGFuZCBmZXRjaGluZyBhIHJhbmRvbWlzZWRcbiAqIHZhbHVlIGZyb20gdGhlc2UgaXRlbXMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVNwYW4gZXh0ZW5kcyBTcGFuIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYW4gQXJyYXlTcGFuIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge21peGVkfGFycmF5PG1peGVkPn0gaXRlbXMgLSBJdGVtc1xuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGl0ZW1zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjIEFuIGFycmF5IG9mIGNvbG9yc1xuICAgICAqIEB0eXBlIHthcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLml0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHJhbmRvbSBpdGVtLlxuICAgKlxuICAgKiBAcmV0dXJuIHttaXhlZH1cbiAgICovXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiBzYW1wbGUodGhpcy5pdGVtcyk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBjcmVhdGUgYW4gQXJyYXlTcGFuIGZyb20gdGhlIGl0ZW1zIHByb3ZpZGVkLlxuICpcbiAqIEBwYXJhbSB7bWl4ZWR9IGl0ZW1zIC0gSXRlbXMgdG8gdHJ5IGFuZCBjcmVhdGUgYW4gQXJyYXlTcGFuIGZyb21cbiAqIEByZXR1cm4gez9BcnJheVNwYW59XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBcnJheVNwYW4gPSBpdGVtcyA9PiB7XG4gIGlmICghaXRlbXMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpdGVtcyBpbnN0YW5jZW9mIEFycmF5U3Bhbikge1xuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIHJldHVybiBuZXcgQXJyYXlTcGFuKGl0ZW1zKTtcbn07XG4iXX0=