function SeqAlign() { }

module.exports = SeqAlign;

/**
 * Needleman–Wunsch algorithm.
 * 
 * Takes two sequences in string form and aligns them.
 * 
 * @param {string} seq1 The first sequence
 * @param {string} seq2 The second sequence
 */
SeqAlign.prototype.nw = function (seq1, seq2) {
  var nwMatrix = initializeMatrix(seq1.length + 1, seq2.length + 1);
  console.log(nwMatrix);
}

/**
 * Initializes the matrix needed for the Needleman-Wunsch algorithm
 * 
 * @param {number} len1 The length (plus one) of the first sequence 
 * @param {number} len2 The length (plus one) of the second sequence 
 */
function initializeMatrix(len1, len2) {
  var matrix = new Array(len1);
  for (var i = 0; i < len1; i++) {
    matrix[i] = new Array(len2);
    if (i === 0) {
      matrix[0][0] = entry('none', 0);
      for (var x = 1; x < len1; x++) {
        matrix[0][x] = entry('right', matrix[0][x - 1].value);
      }
    } else {
      matrix[i][0] = entry('down', matrix[i - 1][0].value);
    }
  }
  return matrix;
}

/**
 * Creates an 'entry' object used in the matrix
 * 
 * @param {string} direction The direction of where the entry is going
 * @param {number} value The value of the score
 */
function entry(direction, value) {
  return {
    direction,
    value
  }
}