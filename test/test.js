var SeqAlign = require('../index.js');

function runTests() {
  var sa = new SeqAlign();
  const seq1 = 'CSTPAGNDEQHRKMILVFYFLDK:KLFDKL:KLF:W';
  const seq2 = 'CSTPAGNDEQHRKMILVFYKLFDJKLDFKJLW';
  const ret = sa.nw(seq1, seq2);
  console.log("Sequence 1: " + ret.seq1);
  console.log("Sequence 2: " + ret.seq2);
  console.log("Score: " + ret.score);
}

runTests();