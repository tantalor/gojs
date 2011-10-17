#!/usr/bin/env node

var sys = require('sys');
var sieve = require('../sieve');

var primes = sieve.sieve();

function step (n) {
  sys.puts(n);
  primes.read(step);
};

primes.read(step);
