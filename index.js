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
  const seq1Length = seq1.length + 1;
  const seq2Length = seq2.length + 1;
  var nwMatrix = initializeMatrix(seq1Length, seq2Length);
  for (var i = 1; i < seq1Length; i++) {
    for (var j = 1; j < seq2Length; j++) {
      const diag = nwMatrix[i - 1][j - 1].value + getScore(seq1.charAt(i - 1), seq2.charAt(j - 1));
      const above = nwMatrix[i - 1][j].value - 2;
      const left = nwMatrix[i][j - 1].value - 2;
      nwMatrix[i][j] = getMax(diag, above, left);
    }
  }
  const finalScore = nwMatrix[seq1Length - 1][seq2Length - 1].value;
  const directions = traceback(nwMatrix, seq1Length - 1, seq2Length - 1);
}

/**
 * Traces back through the directions in the array
 * 
 * @param {2d array} nwMatrix The matrix with all the directions and values
 * @param {number} seq1Length Length of the first sequence (plus 1)
 * @param {number} seq2Length Length of the second sequence (plus 1)
 */
function traceback(nwMatrix, seq1Length, seq2Length) {
  var values = [];
  var currentEntry = nwMatrix[seq1Length][seq2Length];
  var currentPosition = [seq1Length, seq2Length];
  var holderEntry = currentEntry;
  var holderPosition = currentPosition;
  while (currentPosition[0] !== 0 && currentPosition[1] !== 0) {
    // TODO
    break;
  }
}

/**
 * Gets the maximum score of the three values, creates an entry
 * based on the result
 * 
 * @param {number} diag Score for the diagonal direction
 * @param {number} above Score for the down direction
 * @param {number} left Score for the right direction
 */
function getMax(diag, above, left) {
  const maxValue = Math.max(diag, above, left);
  if (maxValue === diag) {
    return entry('diag', diag)
  } else if (maxValue === above) {
    return entry('down', above)
  } else {
    return entry('right', left)
  }
}

/**
 * Gets the score of the two characters
 * TODO: allow custom scoring system
 * 
 * @param {char} char1 Character in the first sequence
 * @param {char} char2 Character in the second sequence
 */
function getScore(char1, char2) {
  if (char1 === char2) {
    return 1;
  }
  return -3;
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
        matrix[0][x] = entry('right', matrix[0][x - 1].value - 2);
      }
    } else {
      matrix[i][0] = entry('down', matrix[i - 1][0].value - 2);
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