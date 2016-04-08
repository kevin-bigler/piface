pf.Action = function() {
  // this.foos = ball;
  this.fromState = null; // pf.SquareState.UNDEFINED;
  this.toState = null;   // pf.SquareState.UNDEFINED;
  this.i = -1;
  this.x = -1;
  this.y = -1;

  /*
    fromState
    toState
    i
    (or x,y?)   <-- if we want to also use attempts & actions on entire grids. so maybe i, x, and y
  */
};

// pf.Action.prototype.property = value;
// pf.Action.prototype.func = function() {};

/**
  @param obj - any of either square, row, or grid
*/
pf.Action.prototype.do = function(obj) {
  if (pf.utils.squareIsSet(obj)) {
    obj.state = this.toState;

  } else if (pf.utils.rowIsSet(obj)) {
    var square = obj.getSquare(this.i);
    this.do(square);

  } else if (pf.utils.gridIsSet(obj)) {
    var square = obj.getSquare(this.x, this.y);
    this.do(square);

  }
};

/**
  @param obj - any of either square, row, or grid
*/
pf.Action.prototype.undo = function(obj) {
  if (pf.utils.squareIsSet(obj)) {
    obj.state = this.fromState;

  } else if (pf.utils.rowIsSet(obj)) {
    var square = obj.getSquare(this.i);
    this.undo(square);

  } else if (pf.utils.gridIsSet(obj)) {
    var square = obj.getSquare(this.x, this.y);
    this.undo(square);

  }
};
