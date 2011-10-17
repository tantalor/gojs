(function () {
  if (typeof(process) !== 'undefined') {
    function go (fn) {
      process.nextTick(fn);
    };
  } else {
    function go (fn) {
      setTimeout(fn, 0);
    };
  }
  
  function chan () {
    var writers = new Array();
    var readers = new Array();
    
    return {
      read: function (cb) {
        if (writers.length) {
          // consume a writer
          var writer = writers.shift();
          cb(writer[0]);
          writer[1](writer[0]);
        } else {
          // queue the reader
          readers.push(cb);
        }
      },
      write: function (value, cb) {
        if (readers.length) {
          // consumer a reader
          var reader = readers.shift();
          reader(value);
          cb(value);
        } else {
          // queue the writer
          writers.push([value, cb]);
        }
      }
    };
  };
  
  // add to global scope
  if (typeof(window) !== 'undefined') {
    // browser
    window.chan = chan;
    window.go   = go;
  } else if (typeof(require) !== 'undefined') {
    // commonjs
    exports.chan = chan;
    exports.go   = go;
  } else if (typeof(load) !== 'undefined') {
    // jsc
    return {
      "chan": chan,
      "go":   go
    };
  }
})();
