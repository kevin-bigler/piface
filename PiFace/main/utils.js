pf.utils = {
  puzzleIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Puzzle; },
  gridIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Grid; },
  rowIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Row; },
  squareIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Square; },
  definitionIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Definition; },
  actionIsSet: function(variable) { return variable !== null && variable !== undefined && variable instanceof pf.Action; },
  copySquares: function(variables) {
    if ( ! common.isArray(variables) )
      return variables;

    var copy = [];
    $.each(variables, function(i, e) {
      if ( pf.utils.squareIsSet(e) )
        copy.push(e.copy());
    });

    return copy;
  },
  // TODO all other copy Xs functions for each model (Puzzle, Grid, Row, Definition)
  getSquareTransformationAction: function(squareA, squareB) {
    if ( ! pf.utils.squareIsSet(squareA) || ! pf.utils.squareIsSet(squareB) )
      return null;

    // squareA = "before"; squareB = "after"
    var action = new pf.Action();
    action.fromState = squareA.state;
    action.toState = squareB.state;

    return action;
  },
  getRowTransformationActions: function(rowA, rowB) {
    // get actions necessary to transform rowA into rowB
    if ( ! pf.utils.rowIsSet(rowA) || ! pf.utils.rowIsSet(rowB) || ! common.isArray(rowA.squares) || ! common.isArray(rowB.squares) )
      return [];

    var actions = [];

    // the two rows should be the same length, but if they're not, let's just use the shorter row for matching
    var rowALength = rowA.squares.length;
    var rowBLength = rowB.squares.length;
    // get the smaller length, or either length if they're equal
    var length = rowALength <= rowBLength ? rowALength : rowBLength;

    for (var i = 0; i < length; i++) {
      var squareA = rowA.getSquare(i);
      var squareB = rowB.getSquare(i);

      var action = pf.utils.getSquareTransformationAction(squareA, squareB);
      if ( pf.utils.actionIsSet(action) ) {
        action.i = i;
        actions.push(action);
      }
    }

    return actions;
  },
  getGridTransformationActions: function(gridA, gridB) {
    // TODO
    // get actions necessary to transform gridA into gridB
    // -- could do it row by row, utilizing pf.utils.getRowTransformationActions(rowA, rowB) on each
    // -- just not sure how that would work out with the action.x/y instead of action.i
  },
  doActionsToRow: function(actions, row) {
    if ( ! common.isArray(actions) || ! pf.utils.rowIsSet(row) )
      return;

    $.each(actions, function(i, e) {
      if ( pf.utils.actionIsSet(e) ) {
        e.do(row.getSquare(e.i));
      }
    });
  },
  doActionsToGrid: function(actions, grid) {
    if ( ! common.isArray(actions) || ! pf.utils.gridIsSet(grid) )
      return;

    $.each(actions, function(i, e) {
      if ( pf.utils.actionIsSet(e) ) {
        e.do(grid.getSquare(e.x, e.y));
      }
    });
  },
  undoActionsToRow: function(actions, row) {
    if ( ! common.isArray(actions) || ! pf.utils.rowIsSet(row) )
      return;

    $.each(actions, function(i, e) {
      if ( pf.utils.actionIsSet(e) ) {
        e.undo(row.getSquare(e.i));
      }
    });
  },
  undoActionsToGrid: function(actions, grid) {
    if ( ! common.isArray(actions) || ! pf.utils.gridIsSet(grid) )
      return;

    $.each(actions, function(i, e) {
      if ( pf.utils.actionIsSet(e) ) {
        e.undo(grid.getSquare(e.x, e.y));
      }
    });
  }
};
