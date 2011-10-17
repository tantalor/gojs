(function () {
  // imports
  if (typeof(window) !== 'undefined') {
    // browser
    var go = window.go;
    var chan = window.chan;
  } if (typeof(require) !== 'undefined') {
    // commonjs
    var gojs = require('../../lib/go');
    var go = gojs.go;
    var chan = gojs.chan;
  }
  
  function integers () {
    var ch = new chan();
    go(function () {
      var producer = function (i) {
        ch.write(i + 1, producer);
      };
      ch.write(2, producer);
    });
    return ch;
  };

  function filter_multiples (ch, prime) {
    var out = new chan();
    go(function () {
        var consumer = function (i) {
          if (i % prime != 0) {
            out.write(i, function () {
              ch.read(consumer);
            });
          } else {
            ch.read(consumer);
          }
        };
        ch.read(consumer);
    });
    return out; 
  };

  function sieve () {
     var out = new chan();
     go(function () {
        var ch = integers();
        function iteration () {
          ch.read(function (prime) {
            out.write(prime, function () {
              ch = filter_multiples(ch, prime);
              iteration();
            });
          });
        };
        iteration();
     });
     return out;
  };
  
  // add to global scope
  if (typeof(window) !== 'undefined') {
    // browser
    window.sieve = sieve;
  } else if (typeof(require) !== 'undefined') {
    // commonjs
    exports.sieve = sieve;
  } else if (typeof(load) !== 'undefined') {
    // jsc
    return {
      "sieve": sieve
    };
  }
})();

