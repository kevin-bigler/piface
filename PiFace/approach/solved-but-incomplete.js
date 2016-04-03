pf.approach = pf.approach || {};

pf.approach.SolvedButIncomplete = function() {
  // this.foos = ball;
};

// pf.approach.SolvedButIncomplete.prototype.property = value;
// pf.approach.SolvedButIncomplete.prototype.func = function() {};

pf.approach.SolvedButIncomplete.prototype.getSolvingActions = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return [];

  var rowCopy = row.copy();
  var definitionCopy = definition.copy();

  rowCopy.definition = definitionCopy;

  if (rowCopy.isSolved() && ! rowCopy.isComplete()) {
    rowCopy.exVacantSquares();

    return pf.utils.getRowTransformationActions(row, rowCopy);
  }

  return [];

  // if (row.isSolved() && ! row.isComplete()) {
  //   // TODO get all vacant indexes
  //   var vacantIndexes = [];
  //   var actions = [];
  //   $.each(vacantIndexes, function(i, e) {
  //     var action = new pf.Action();
  //     action.fromState = pf.SquareState.VACANT;
  //     action.toState = pf.SquareState.EXED;
  //   });
  // }
};
