pf.approach = pf.approach || {};

pf.approach.RunEqualsMaxDefinition = function() {
  // this.foos = ball;
};

// pf.approach.RunEqualsMaxDefinition.prototype.property = value;
// pf.approach.RunEqualsMaxDefinition.prototype.func = function() {};

pf.approach.RunEqualsMaxDefinition.prototype.solve = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return false;

  var isExedOrOob = function(i) { return ! common.isNumber(i) || ! row.getSquare(i) || row.getSquare(i).isExed();  };

  var maxDefinitionRun = definition.getMaxRun();

  var success = false;

  // get indexes of row's runs
  // -- need this so that we can say for certain whether the surrounding squares are already exed
  var rowRunsAsIndexes = row.getRunsAsIndexes();
  if ( ! common.isArray(rowRunsAsIndexes) )
    return false;

  $.each(rowRunsAsIndexes, function(i, e) {

    if ( common.isArray(e) && e.length > 0 && e.length === maxDefinitionRun ) {
      // conditions met, if at least one of the surrounding squares is blocked (x or off the row)

      // get the indexes that surround this run
      var beforeIndex = e[0] - 1;
      var afterIndex = e[e.length - 1] + 1;

      if ( ! isExedOrOob(beforeIndex) ) {
        success = true;
        row.getSquare(beforeIndex).setExed();
      }

      if ( ! isExedOrOob(afterIndex) ) {
        success = true;
        row.getSquare(afterIndex).setExed();
      }
    }

  });

  return success;
};

// TODO this function is always the same in all Approaches -- how to centralize?
pf.approach.RunEqualsMaxDefinition.prototype.getSolvingActions = function(row, definition) {
  if ( ! pf.utils.rowIsSet(row) || ! pf.utils.definitionIsSet(definition) )
    return [];

  var rowCopy = row.copy();
  var definitionCopy = definition.copy();

  if ( this.solve(rowCopy, definitionCopy) )
    return pf.utils.getRowTransformationActions(row, rowCopy);

  return [];
};
