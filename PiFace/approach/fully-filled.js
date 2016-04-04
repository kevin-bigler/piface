pf.approach = pf.approach || {};

pf.approach.FullyFilled = function() {
  // this.foos = ball;
};

// pf.approach.FullyFilled.prototype.property = value;
// pf.approach.FullyFilled.prototype.func = function() {};

pf.approach.FullyFilled.prototype.solve = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return false;

  if ( common.isNonEmptyArray(definition.runs) && definition.runs.length === 1 && common.isArray(row.squares) && definition.runs[0] === row.squares.length ) {
    row.fillAllSquares();

    return true;
  }

  return false;
};

pf.approach.FullyFilled.prototype.getSolvingActions = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return [];

  var rowCopy = row.copy();
  var definitionCopy = definition.copy();

  if ( this.solve(rowCopy, definitionCopy) )
    return pf.utils.getRowTransformationActions(row, rowCopy);

  return [];
};
