pf.Main = function() {
  common.log('pf.Main()');
}

pf.Main.prototype.main = function() {
  common.log('pf.Main.main()');

  common.log();
  // this.modelTests();

  // this.d3Tests();

  // this.drawTests();

  this.moreDrawTests();

  // this.gridSquaresFlatTest();

  // this.conversionTests();

  // this.approachTestsSolvedButIncomplete();
  //
  // this.approachTestsFullyExed();
  //
  // this.approachTestsFullyFilled();
  //
  // this.approachTestRunEqualsMaxDefinition();

  // this.rowRunsAsIndexesTest();

  // TODO create tests for ActionController
  // probably easiest to do if paired with some UI buttons with visual indication of has<method> (ie hasNext and hasPrev) or something
}

pf.Main.prototype.moreDrawTests = function() {

  var row = new pf.Row();
  row.initWithLength(5);
  row.fillSquare(1);
  row.fillSquare(2);
  drawTestsData = row.squares;
  // drawTestsData = [new pf.Square(), new pf.Square(), new pf.Square(), new pf.Square()];
  rowLength = row.length;
  common.log('rowLength: ' );
  common.log(rowLength);
  draw = new pf.Draw();
  draw.drawSquares(drawTestsData, rowLength);

  var actions = [];
  actions.push( this.approachTestRunEqualsMaxDefinition() );
  actions.push( this.approachTestsSolvedButIncomplete() );

  common.log();
  common.log('actions:');
  common.log(actions);

  var actionController = new pf.ActionController();
  actionController.initWithActions(actions);
  actionController.subject = row;

  var drawTests = new pf.DrawTests();
  drawTests.actionController = actionController;
  drawTests.onUpdate = function() {
    common.log('onUpdate()');
    draw.drawSquares(drawTestsData, rowLength);
  };
  drawTests.initButtons();
  // drawTests.idAndClassElements();


};

pf.Main.prototype.drawVcrTest = function() {

};

pf.Main.prototype.rowRunsAsIndexesTest = function() {
  var row = new pf.Row();
  row.initWithLength(5);
  row.fillSquare(0);
  row.fillSquare(1);
  row.fillSquare(4);

  var rowRuns = row.getRuns();
  var rowRunsAsIndexes = row.getRunsAsIndexes();

  common.log('rowRuns: ');
  common.log(rowRuns);

  common.log('rowRunsAsIndexes: ');
  common.log(rowRunsAsIndexes);

};

pf.Main.prototype.approachTestRunEqualsMaxDefinition = function() {
  common.log();
  common.log('approachTestRunEqualsMaxDefinition()');

  var definition = new pf.Definition();
  // definition.initWithRuns([2,1]);
  definition.initWithRuns([2]);
  common.log('definition: ' + definition.toString());

  var row = new pf.Row();
  row.initWithLength(5);
  row.fillSquare(1);
  row.fillSquare(2);
  common.log('row before solving:' + row.toString());

  var approach = new pf.approach.RunEqualsMaxDefinition();
  // approach.solve(row, definition);
  var solvingActions = approach.getSolvingActions(row, definition);

  // common.log('solvingActions:' );
  // common.log(solvingActions);

  pf.utils.doActionsToRow(solvingActions, row);

  common.log('row after solving:' + row.toString());

  // pf.utils.undoActionsToRow(solvingActions, row, true);
  //
  // common.log('row after undoing:' + row.toString());

  return solvingActions;
};

pf.Main.prototype.approachTestsFullyFilled = function() {
  common.log();
  common.log('approachTestsFullyFilled()');

  var definition = new pf.Definition();
  definition.initWithRuns([5]);
  common.log('definition: ' + definition.toString());

  var row = new pf.Row();
  row.initWithLength(5);
  common.log('row before solving:' + row.toString());

  var approach = new pf.approach.FullyFilled();
  approach.solve(row, definition);

  common.log('row after solving:' + row.toString());

};

pf.Main.prototype.approachTestsFullyExed = function() {
  common.log();
  common.log('approachTestsFullyExed()');

  var definition = new pf.Definition();
  definition.initWithRuns([0]);
  common.log('definition: ' + definition.toString());

  var row = new pf.Row();
  row.initWithLength(5);
  common.log('row before solving:' + row.toString());

  var approach = new pf.approach.FullyExed();
  approach.solve(row, definition);

  common.log('row after solving:' + row.toString());
};

pf.Main.prototype.approachTestsSolvedButIncomplete = function() {
  common.log();
  common.log('approachTestsSolvedButIncomplete()');

  var definition = new pf.Definition();
  // definition.initWithRuns([2, 1]);
  definition.initWithRuns([2]);
  common.log('definition: ' + definition.toString());

  var row = new pf.Row();
  row.initWithLength(5);
  row.exSquare(0);
  row.fillSquare(1);
  row.fillSquare(2);
  row.exSquare(3);
  common.log('row before solving:' + row.toString());

  var approach = new pf.approach.SolvedButIncomplete();
  var solvingActions = approach.getSolvingActions(row, definition);
  approach.solve(row, definition);

  common.log('row after solving:' + row.toString());

  return solvingActions;
};

pf.Main.prototype.conversionTests = function() {
  common.log('conversionTests()');

  var rowLength = 3;
  var i = 5;

  var x = common.conversions.iToX(i, rowLength);
  var y = common.conversions.iToY(i, rowLength);
  var xy = common.conversions.iToXy(i, rowLength);
  var iComputed = common.conversions.xyToI(x, y, rowLength);

  common.log('let rowLength = ' + rowLength + ', i = ' + i);
  common.log('x: ' + x);
  common.log('y: ' + y);
  common.log('xy: ');
  common.log(xy);

  common.log('iComputed: ' + iComputed);
};

pf.Main.prototype.gridSquaresFlatTest = function() {
  common.log('gridSquaresFlatTest()');

  var grid = new pf.Grid();
  grid.initWithSize(2, 2);

  grid.getSquare(0, 1).setFilled();

  var gridSquaresFlatArray = grid.getSquaresFlatArray();
  common.log('gridSquaresFlatArray:');
  common.log(gridSquaresFlatArray);

  var col0 = grid.getColumn(0);
  common.log('col0:');
  common.log(col0);
  common.log(col0.toString());

  var row1 = grid.getRow(1);
  common.log('row1:');
  common.log(row1);
  common.log(row1.toString());
};

// pf.Main.prototype.drawTests = function() {
//   var drawTests = new pf.DrawTests();
// };

var drawTestsData = [];
var rowLength = null;
var draw = null;
pf.Main.prototype.drawTests = function() {
  var grid = new pf.Grid();
  grid.initWithSize(5, 5);
  drawTestsData = grid.getSquaresFlatArray();
  // drawTestsData = [new pf.Square(), new pf.Square(), new pf.Square(), new pf.Square()];
  rowLength = grid.width;
  draw = new pf.Draw();
  draw.drawSquares(drawTestsData, rowLength);
};

var testData = [];
var testData1 = {'color':'red'};

pf.Main.prototype.d3Update = function() {
  var canvas = d3.select('body').select('svg');

  var circles = canvas.selectAll('circle').data(testData);

  // enter selection
  circles.enter().append('circle');

  // update selection
  circles.attr('r', 100)
          .attr('cx', function(d, i) { return 100 + (i * 200); })
          .attr('cy', 100)
          // .attr('fill', 'blue');
          .attr('fill', function(d, i) { return d.color; } );

  // exit selection
  circles.exit().remove();
};

pf.Main.prototype.d3Tests = function() {
  var canvas = d3.select('body').append('svg').attr('width', 500).attr('height', 500);

  testData = [testData1, {'color':'blue'}];

  var circle = canvas.selectAll('circle').data(testData).enter().append('circle')
          .attr('r', 100)
          .attr('cx', function(d, i) { return 100 + (i * 200); })
          .attr('cy', 100)
          // .attr('fill', 'blue');
          .attr('fill', function(d, i) { return d.color; } );

  var rect = canvas.append('rect')
          .attr('x', 250)
          .attr('y', 250)
          .attr('width', 50)
          .attr('height', 50)
          .on('mouseover', function(d, i) {
            d3.select(this).transition()
              .ease('cubic-out')
              // .ease('cubic-in')
              .ease('linear')
              .duration('200')
              .style("fill-opacity", 1)
              .style("fill", "red");
          })
          .on('mouseout', function(d, i) {
            d3.select(this).transition()
              // .ease('cubic-out')
              .ease('cubic-in')
              // .ease('linear')
              .duration('200')
              .style("fill-opacity", 1)
              .style("fill", "black");
          })
          .on('click', function(d, i) {
            d3.select(this).transition()
              .ease('linear')
              .duration('200')
              .style('fill-opacity', 1)
              .style('fill', 'white');
          });
};

pf.Main.prototype.modelTests = function() {

  var puzzle = new pf.Puzzle();
  puzzle.grid.initWithSize(10, 10);
  //
  // var theSquare = puzzle.grid.getSquare(2, 3);
  //
  // common.log('grid:');
  // common.log(puzzle.grid.toString());
  //
  // common.log('theSquare at 2,3:');
  // // common.log(theSquare);
  // common.log(theSquare.toString());
  //
  // theSquare.setExed();
  // common.log('exed the square at 2,3');
  //
  // common.log('grid now:');
  // common.log(puzzle.grid.toString());
  //
  // common.log('theSquare at 2,3 now:');
  // // common.log(theSquare);
  // common.log(theSquare.toString());

  var testRow = new pf.Row();
  // testRow.squares = [new pf.Square, new pf.Square, new pf.Square];
  testRow.initWithLength(5);

  // common.log('testRow.squares:');
  // common.log(testRow.squares);

  common.log();
  common.log('testRow:');
  common.log(testRow.toString());

  common.log('isSolved? ' + (testRow.isSolved() ? 'yes' : 'no'));
  common.log('isComplete? ' + (testRow.isComplete() ? 'yes' : 'no'));

  testRow.exSquare(0);
  testRow.fillSquare(1);
  testRow.getSquare(2).setFilled();
  testRow.exVacantSquares();
  testRow.vacateSquare(4);
  testRow.fillVacantSquares();

  common.log();
  common.log('testRow now:');
  common.log(testRow.toString());

  common.log('isSolved? ' + (testRow.isSolved() ? 'yes' : 'no'));
  common.log('isComplete? ' + (testRow.isComplete() ? 'yes' : 'no'));

  common.log();
  common.log('testRow runs:');
  common.log(testRow.getRuns());

  var rowFromPuzzle = puzzle.grid.getRow(1);

  common.log();
  common.log('rowFromPuzzle:');
  common.log(rowFromPuzzle.toString());

  rowFromPuzzle.exSquare(0);
  rowFromPuzzle.fillSquare(1);
  rowFromPuzzle.getSquare(2).setFilled();
  rowFromPuzzle.exVacantSquares();
  rowFromPuzzle.vacateSquare(4);
  rowFromPuzzle.fillSquare(7);
  rowFromPuzzle.fillSquare(8);
  rowFromPuzzle.fillSquare(9);
  rowFromPuzzle.fillVacantSquares();

  common.log();
  common.log('rowFromPuzzle now:');
  common.log(rowFromPuzzle.toString());

  common.log();
  common.log('rowFromPuzzle runs:');
  common.log(rowFromPuzzle.getRuns());

  puzzle.grid.getSquare(6, 6).setFilled();
  puzzle.grid.getSquare(7, 7).setFilled();

  common.log();
  common.log('grid now:');
  common.log(puzzle.grid.toString());

  var defTest = new pf.Definition();
  defTest.initWithRuns([1, 3, 1, 2]);

  common.log();
  common.log('defTest:');
  common.log(defTest.toString());
  common.log('totalFilled: ' + defTest.getTotalFilled());
  common.log('minSquares: ' + defTest.getMinSquares());
  common.log('minRun: ' + defTest.getMinRun());
  common.log('maxRun: ' + defTest.getMaxRun());
};
