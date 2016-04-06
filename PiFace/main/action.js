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

pf.Action.prototype.do = function(square) {
  if (pf.utils.squareIsSet(square))
    square.state = this.toState;
};

pf.Action.prototype.undo = function(square) {
  if (pf.utils.squareIsSet(square))
    square.state = this.fromState;
};

// TODO maybe do/undo functions for row & grid? not sure if that's ideal though (b/c of how the index and x,y are maintained etc)
