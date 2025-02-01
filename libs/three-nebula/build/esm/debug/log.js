/**
 * You can use this emit particles.
 *
 * This method will console.log the fixed number of your info  in updata or requestAnimationFrame
 *
 * use like this log('+12',mc); log 12 times
 *
 * @return void
 */
export default function () {
  let once = 0;

  if (window.console && window.console.trace) {
    var arg = Array.prototype.slice.call(arguments);
    var s1 = arguments[0] + '';

    if (s1.indexOf('+') == 0) {
      var n = parseInt(arguments[0]);

      if (once < n) {
        arg.shift();
        console.trace.apply(console, arg);
        once++;
      }
    } else {
      arg.unshift('+15');
      this.apply(console, arg);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWJ1Zy9sb2cuanMiXSwibmFtZXMiOlsib25jZSIsIndpbmRvdyIsImNvbnNvbGUiLCJ0cmFjZSIsImFyZyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiczEiLCJpbmRleE9mIiwibiIsInBhcnNlSW50Iiwic2hpZnQiLCJhcHBseSIsInVuc2hpZnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBVztBQUN4QixNQUFJQSxJQUFJLEdBQUcsQ0FBWDs7QUFFQSxNQUFJQyxNQUFNLENBQUNDLE9BQVAsSUFBa0JELE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxLQUFyQyxFQUE0QztBQUMxQyxRQUFJQyxHQUFHLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixDQUFWO0FBQ0EsUUFBSUMsRUFBRSxHQUFHRCxTQUFTLENBQUMsQ0FBRCxDQUFULEdBQWUsRUFBeEI7O0FBRUEsUUFBSUMsRUFBRSxDQUFDQyxPQUFILENBQVcsR0FBWCxLQUFtQixDQUF2QixFQUEwQjtBQUN4QixVQUFJQyxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0osU0FBUyxDQUFDLENBQUQsQ0FBVixDQUFoQjs7QUFFQSxVQUFJVCxJQUFJLEdBQUdZLENBQVgsRUFBYztBQUNaUixRQUFBQSxHQUFHLENBQUNVLEtBQUo7QUFDQVosUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNZLEtBQWQsQ0FBb0JiLE9BQXBCLEVBQTZCRSxHQUE3QjtBQUNBSixRQUFBQSxJQUFJO0FBQ0w7QUFDRixLQVJELE1BUU87QUFDTEksTUFBQUEsR0FBRyxDQUFDWSxPQUFKLENBQVksS0FBWjtBQUNBLFdBQUtELEtBQUwsQ0FBV2IsT0FBWCxFQUFvQkUsR0FBcEI7QUFDRDtBQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFlvdSBjYW4gdXNlIHRoaXMgZW1pdCBwYXJ0aWNsZXMuXG4gKlxuICogVGhpcyBtZXRob2Qgd2lsbCBjb25zb2xlLmxvZyB0aGUgZml4ZWQgbnVtYmVyIG9mIHlvdXIgaW5mbyAgaW4gdXBkYXRhIG9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICpcbiAqIHVzZSBsaWtlIHRoaXMgbG9nKCcrMTInLG1jKTsgbG9nIDEyIHRpbWVzXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBsZXQgb25jZSA9IDA7XG5cbiAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRyYWNlKSB7XG4gICAgdmFyIGFyZyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIHMxID0gYXJndW1lbnRzWzBdICsgJyc7XG5cbiAgICBpZiAoczEuaW5kZXhPZignKycpID09IDApIHtcbiAgICAgIHZhciBuID0gcGFyc2VJbnQoYXJndW1lbnRzWzBdKTtcblxuICAgICAgaWYgKG9uY2UgPCBuKSB7XG4gICAgICAgIGFyZy5zaGlmdCgpO1xuICAgICAgICBjb25zb2xlLnRyYWNlLmFwcGx5KGNvbnNvbGUsIGFyZyk7XG4gICAgICAgIG9uY2UrKztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJnLnVuc2hpZnQoJysxNScpO1xuICAgICAgdGhpcy5hcHBseShjb25zb2xlLCBhcmcpO1xuICAgIH1cbiAgfVxufVxuIl19