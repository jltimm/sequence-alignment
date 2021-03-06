module.exports = {
  nw,
  sw
};

/**
 * Needleman–Wunsch algorithm.
 * 
 * Takes two sequences in string form and aligns them.
 * 
 * @param {string} seq1 The first sequence
 * @param {string} seq2 The second sequence
 */
function nw(seq1, seq2) {
  const seq1Length = seq1.length + 1;
  const seq2Length = seq2.length + 1;
  var nwMatrix = initializeNWMatrix(seq1Length, seq2Length);
  for (var i = 1; i < seq1Length; i++) {
    for (var j = 1; j < seq2Length; j++) {
      const diag = nwMatrix[i - 1][j - 1].value + getScore(seq1.charAt(i - 1), seq2.charAt(j - 1));
      const above = nwMatrix[i - 1][j].value - 2;
      const left = nwMatrix[i][j - 1].value - 2;
      nwMatrix[i][j] = getMax(diag, above, left);
    }
  }
  const score = nwMatrix[seq1Length - 1][seq2Length - 1].value;
  const directions = traceback(nwMatrix, seq1Length - 1, seq2Length - 1);
  const alignedSequences = parseDirections(directions, seq1, seq2);
  return {
    seq1: alignedSequences[0],
    seq2: alignedSequences[1],
    score
  }
}

/**
 * Swith-Waterman algorithm.
 * 
 * Performs local alignment, which finds the segments in two sequences that
 * have similaries.
 * 
 * @param {string} seq1 The first sequence 
 * @param {string} seq2 The second sequence
 */
function sw(seq1, seq2) {
  const seq1Length = seq1.length + 1;
  const seq2Length = seq2.length + 1;
  var scoreMatrix = createScoringMatrix(seq1, seq2, seq1Length, seq2Length);
  console.log(scoreMatrix);
}

/**
 * Creates the scoring matrix for Smith-Waterman
 * 
 * @param {string} seq1 The first sequence 
 * @param {string} seq2 The second sequence
 * @param {number} len1 Length of the first sequence
 * @param {number} len2 Length of the second sequence
 */
function createScoringMatrix(seq1, seq2, len1, len2) {
  var swMatrix = initializeSWMatrix(len1, len2);
  var maxScore = 0;
  var maxPos;
  for (var i = 1; i < len1; i++) {
    for (var j = 1; j < len2; j++) {
      score = calculateScore(swMatrix, i, j);
      if (maxScore < score) {
        maxScore = score;
        maxPos = [i, j];
      }
      swMatrix[i][j] = score;
    }
  }
  return {
    swMatrix,
    maxPos
  };
}

/**
 * Calculates the score of the current position
 * 
 * @param {2d array} swMatrix The sw matrix
 * @param {number} i The row position
 * @param {number} j The column position
 */
function calculateScore(swMatrix, i, j) {
  const similarity = swMatrix[i - 1] == swMatrix[j - 1] ? 2 : -1;
  const diag = swMatrix[i - 1][j - 1] + similarity;
  const up = swMatrix[i - 1][j] - 1;
  const left = swMatrix[i][j - 1] - 1;
  return Math.max(0, diag, up, left);
}

/**
 * Parses the directions array, return the two aligned sequences
 * 
 * @param {array} directions The directions array
 * @param {string} seq1 The first sequence 
 * @param {string} seq2 The second sequences
 */
function parseDirections(directions, seq1, seq2) {
  var seq1Index = 0;
  var seq2Index = 0;
  var seq1Aligned = '';
  var seq2Aligned = '';
  for (var i = 0; i < directions.length; i++) {
    if (directions[i] === 0) {
      seq1Aligned += seq1.charAt(seq1Index);
      seq1Index++;
      seq2Aligned += seq2.charAt(seq2Index);
      seq2Index++;
    } else if (directions[i] === 1) {
      seq1Aligned += seq1.charAt(seq1Index);
      seq1Index++;
      seq2Aligned += '-';
    } else {
      seq1Aligned += '-';
      seq2Aligned += seq2.charAt(seq2Index);
      seq2Index++;
    }
  }
  return [seq1Aligned, seq2Aligned];
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
  var entry = nwMatrix[seq1Length][seq2Length];
  var position = [seq1Length, seq2Length];
  while (position[0] !== 0 && position[1] !== 0) {
    if (entry.direction === 0) {
      position = [position[0] - 1, position[1] - 1];
    }
    else if (entry.direction === 1) {
      position = [position[0] - 1, position[1]];
    }
    else {
      position = [position[0], position[1] - 1];
    }
    values.push(entry.direction);
    entry = nwMatrix[position[0]][position[1]];
  }
  return values.reverse();
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
    return entry(0, diag)
  } else if (maxValue === above) {
    return entry(1, above)
  } else {
    return entry(2, left)
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
 * Initializes the scoring matrix for Smith-Waterman
 * 
 * @param {number} len1 Length of the first sequence 
 * @param {number} len2 Length of the second sequence
 */
function initializeSWMatrix(len1, len2) {
  var matrix = new Array(len1);
  for (var i = 0; i < len1; i++) {
    matrix[i] = new Array(len2);
    if (i === 0) {
      for (var j = 0; j < len2; j++) {
        matrix[i][j] = 0;
      }
    } else {
      matrix[i][0] = 0;
    }
  }
  return matrix;
}

/**
 * Initializes the matrix needed for the Needleman-Wunsch algorithm
 * 
 * @param {number} len1 The length (plus one) of the first sequence 
 * @param {number} len2 The length (plus one) of the second sequence 
 */
function initializeNWMatrix(len1, len2) {
  var matrix = new Array(len1);
  for (var i = 0; i < len1; i++) {
    matrix[i] = new Array(len2);
    if (i === 0) {
      matrix[0][0] = entry(-1, 0);
      for (var x = 1; x < len1; x++) {
        matrix[0][x] = entry(2, matrix[0][x - 1].value - 2);
      }
    } else {
      matrix[i][0] = entry(1, matrix[i - 1][0].value - 2);
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

// TODO: add matrices for comparisons
// TODO: split this file into multiple segments