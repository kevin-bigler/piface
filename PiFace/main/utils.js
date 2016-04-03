pf.utils = {
  puzzleIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Puzzle; },
  gridIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Grid; },
  rowIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Row; },
  squareIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Square; },
  definitionIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Definition; },
  copySquares: function(variables) {
    // TODO
  },
  // TODO all other copy Xs functions for each model (Puzzle, Grid, Row, Definition)
  getRowTransformationActions: function(rowA, rowB) {
    // TODO
    // get actions necessary to transform rowA into rowB
  },
  getGridTransformationActions: function(gridA, gridB) {
    // TODO
    // get actions necessary to transform gridA into gridB
  }
};