pf.approach = pf.approach || {};

// TODO may not need this, really, since it also gets solved via SolvedButIncomplete
pf.approach.FullyExed = function() {
  // this.foos = ball;
};

// pf.approach.FullyExed.prototype.property = value;
// pf.approach.FullyExed.prototype.func = function() {};

pf.approach.FullyExed.prototype.solve = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return false;

  if ( definition.getTotalFilled() === 0 ) {
    row.exAllSquares();

    return true;
  }

  return false;
};

pf.approach.FullyExed.prototype.getSolvingActions = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return [];

  var rowCopy = row.copy();
  var definitionCopy = definition.copy();

  if ( this.solve(rowCopy, definitionCopy) )
    return pf.utils.getRowTransformationActions(row, rowCopy);

  return [];
};
