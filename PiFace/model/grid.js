pf.Grid = function() {
  this.width = 0;
  this.height = 0;
  // this.squares = [][];
  this.squares = [];

};

// pf.Grid.prototype.property = value;
// pf.Grid.prototype.func = function() {};

// TODO copy many of the functions from pf.Row (row.js) into here

pf.Grid.prototype.initWithSize = function(width, height) {
  // common.log('initWithSize(width, height), width: ' + width + ', height: ' + height);

  this.width = width;
  this.height = height;

  // common.log('grid squares before:');
  // common.log(this.squares);

  this.squares = [];

  // go through each column (~width)
  for (var i = 0; i < width; i++) {
    // go through each row (square) in the column (~height)
    var columnSquares = [];
    for (var j = 0; j < height; j++) {
      // placeholder new Square in each spot
      columnSquares.push(new pf.Square());
    }
    this.squares.push(columnSquares);
  }

  // common.log('grid squares now:');
  // common.log(this.squares);
};

pf.Grid.prototype.getSquare = function(x, y) {
  // common.log('getSquare(x,y), x: ' + x + ', y: ' + y);

  // common.log('grid squares for lookup:');
  // common.log(this.squares);

  if ( common.arrayContainsIndex(this.squares, x) && common.arrayContainsIndex(this.squares[x], y) ) {
    // common.log('we can get x, y');
    return this.squares[x][y];
  } else {
    common.log('we cannot get x, y');
  }

  return null;
};

pf.Grid.prototype.getRow = function(y) {
  if ( ! common.isArray(this.squares) )
    return null;

  var rowSquares = [];

  // go through each column (~width)
  for (var x = 0; x < this.squares.length; x++) {
    // go through the row (square) in the column (~height = y)
    if ( common.isArray(this.squares[x]) && common.arrayContainsIndex(this.squares[x], y) && this.squares[x][y] instanceof pf.Square )
      rowSquares.push(this.squares[x][y]);
  }

  var row = new pf.Row();
  row.initWithSquares(rowSquares);

  return row;
};

pf.Grid.prototype.getColumn = function(x) {
  if ( ! common.isArray(this.squares) )
    return null;

  var rowSquares = [];

  if ( common.isArray(this.squares) && common.arrayContainsIndex(this.squares, x) )
    rowSquares = this.squares[x];

  var row = new pf.Row();
  row.initWithSquares(rowSquares);

  return row;
};

pf.Grid.prototype.getSquaresFlatArray = function() {
  if ( ! common.isArray(this.squares) || ! this.width || ! this.height || ! common.isNumber(this.width) || ! common.isNumber(this.height) )
    return [];

  var flatArray = [];
  var totalSquares = this.width * this.height;
  for (var i = 0; i < totalSquares; i++) {
    var x = common.conversions.iToX(i, this.width);
    var y = common.conversions.iToY(i, this.width);
    var square = this.getSquare(x, y);
    if (square)
      flatArray.push(square);
  }

  // I'm not sure if this is better, but I could also do getRow() for this.height times, concatenating all row squares arrays.
  // this way I don't have to mess with instantiating pf.Row at all, though, which is probably ideal
  // so probably don't change this

  return flatArray;
};

pf.Grid.prototype.toString = function() {
  // TODO this method could use more checks, or at the very least a try-catch
  if ( ! common.isArray(this.squares) )
    return '?grid?';

  var rows = [];

  // go through each row (~height)
  for (var y = 0; y < this.height; y++) {
    var rowSquares = [];
    // go through the column (square) per row (~width)
    for (var x = 0; x < this.width; x++) {
      rowSquares.push(this.squares[x][y]);
    }

    var row = new pf.Row();
    row.initWithSquares(rowSquares);

    rows.push(row.toString());
  }

  var linebreak = '<br>\n';
  var bookendTop = linebreak + '/' + new Array(this.width * 2).join('-') + '\\' + linebreak;
  var bookendBottom = linebreak + '\\' + new Array(this.width * 2).join('-') + '/' + linebreak;

  var str = bookendTop + rows.join(linebreak) + bookendBottom;

  return str;
}
