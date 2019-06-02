var seqalign = require('../index.js');

function runTests() {
  const seq1 = 'CSTPAGNDEQHRKMILVFYFLDK:KLFDKL:KLF:W';
  const seq2 = 'CSTPAGNDEQHRKMILVFYKLFDJKLDFKJLW';
  const ret = seqalign.nw(seq1, seq2);
  console.log("Sequence 1: " + ret.seq1);
  console.log("Sequence 2: " + ret.seq2);
  console.log("Score: " + ret.score);

  seqalign.sw(seq1, seq2);
}

runTests();