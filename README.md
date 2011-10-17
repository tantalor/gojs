# gojs

**gojs** is an implementation of Go-flavored JavaScript

## Functions

### go

```javascript
  function fn () { ... };
  go(fn);
```

The `go` function calls `fn` in a separate thread of control (i.e., as soon as the event loop has a chance).

##* chan

```javascript
  c = chan();
  c.write("foo", function (r) { ... });
  c.read(function (r) { ... });
```

The `chan` function returns a channel. A channel has two methods, `read` and `write`.

The `write` method takes two arguments, a value and a callback. When a `read` consumes the `write`, the callback is called with the original value.

The `read` method takes one argument, a callback. When a `write` produces a value for the `read` to consume, the callback is called with the value of the `write`.

Multiple `read` or `write` calls may be queued, and they will be called first-in-first-out.

Callbacks for `read` are called before the `write` callbacks. All callbacks are called in the same thread of control as the `read` or `write` call.s

## Example

### Prime-Sieve

The first 10 primes,

    $ node examples/sieve/node/main.js | head -10
    2
    3
    5
    7
    11
    13
    17
    19
    23
    29

## Licence

    (The MIT License)

    Copyright © 2011 John Tantalo

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the ‘Software’), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
