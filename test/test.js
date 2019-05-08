var SeqAlign = require('../index.js');

function runTests() {
  var sa = new SeqAlign();
  const seq1 = 'CSTPAGNDEQHRKMILVFYFLDK:KLFDKL:KLF:W';
  const seq2 = 'CSTPAGNDEQHRKMILVFYKLFDJKLDFKJLW';
  sa.nw(seq1, seq2);
}

runTests();