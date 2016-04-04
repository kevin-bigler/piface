pf.approach = pf.approach || {};

pf.approach.SolvedButIncomplete = function() {
  // this.foos = ball;
};

// pf.approach.SolvedButIncomplete.prototype.property = value;
// pf.approach.SolvedButIncomplete.prototype.func = function() {};

pf.approach.SolvedButIncomplete.prototype.solve = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return false;

  if (row.isSolved(definition) && ! row.isComplete()) {
    row.exVacantSquares();

    return true;
  }

  return false;
};

pf.approach.SolvedButIncomplete.prototype.getSolvingActions = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return [];

  var rowCopy = row.copy();
  var definitionCopy = definition.copy();

  if ( this.solve(rowCopy, definitionCopy) )
    return pf.utils.getRowTransformationActions(row, rowCopy);

  return [];
};
