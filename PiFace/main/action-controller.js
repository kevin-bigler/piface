pf.ActionController = function() {
  // this.foos = 'ball';
  this.actions = [];
  this.groupIndex = -1;   // these indexes represent a position within the two-dimensional array of actions
  this.actionIndex = -1;  // init these values at -1 so that "next" incrementing will get them to 0
  // this.row = null;
  // this.grid = null;
  this.subject = null;
};

// pf.ActionController.prototype.property = value;
// pf.ActionController.prototype.func = function() {};

// TODO maybe functions for restart? that just moves indexes?

pf.ActionController.prototype.getCurrentAction = function() {
  return this.getActionWithIndexes(this.groupIndex, this.actionIndex);
};

pf.ActionController.prototype.hasCurrentAction = function() {
  return pf.utils.actionIsSet(this.getCurrentAction());
};

pf.ActionController.prototype.doCurrentAction = function() {
  var currentAction = this.getCurrentAction();
  if ( pf.utils.actionIsSet(this.getCurrentAction()) )
    currentAction.do(this.subject);
};

pf.ActionController.prototype.undoCurrentAction = function() {
  var currentAction = this.getCurrentAction();
  if ( pf.utils.actionIsSet(this.getCurrentAction()) )
    currentAction.undo(this.subject);
};

pf.ActionController.prototype.getGroup = function(groupIndex) {
  if ( ! common.isArray(this.actions) || ! common.isNumber(groupIndex) || ! common.arrayContainsIndex(this.actions, groupIndex) )
    return null;

  return this.actions[groupIndex];
};

pf.ActionController.prototype.currentGroupHasMoreActions = function() {
  return this.hasActionWithIndexes(this.groupIndex, this.actionIndex + 1);
};

pf.ActionController.prototype.currentGroupHasEarlierActions = function() {
  return this.hasActionWithIndexes(this.groupIndex, this.actionIndex - 1);
};

pf.ActionController.prototype.getActionWithIndexes = function(groupIndex, actionIndex) {
  var group = this.getGroup(groupIndex);

  // if the group actually is a single action rather than an array, just return it
  if ( pf.utils.actionIsSet(group) )
    return group;

  if (  common.isArray(group)
        && common.isNumber(actionIndex)
        && common.arrayContainsIndex(group, actionIndex)
        && pf.utils.actionIsSet(group[actionIndex]) )
    return group[actionIndex];

  return null;
};

pf.ActionController.prototype.hasActionWithIndexes = function(groupIndex, actionIndex) {
  return pf.utils.actionIsSet( this.getActionWithIndexes(groupIndex, actionIndex) );
};

// TODO all the functions below
pf.ActionController.prototype.next = function() {
  if ( ! this.hasNext() ) {
    common.log('cannot do next()');
    return;
  }

  this.actionIndex++;

  if ( this.hasCurrentAction() ) {
    this.doCurrentAction();
    return;
  }

  this.groupIndex++;
  this.actionIndex = 0;

  this.doCurrentAction();

};

pf.ActionController.prototype.prev = function() {
  if ( ! this.hasPrev() ) {
    common.log('cannot do prev()');
    return;
  }

  this.undoCurrentAction();

  this.actionIndex--;

  if ( this.hasCurrentAction() )
    return;

  this.groupIndex--;
  if ( common.isNonEmptyArray(this.actions[groupIndex]) )
    this.actionIndex = this.actions[groupIndex].length - 1;
  else
    this.actionIndex = -1;

};

pf.ActionController.prototype.ff = function() {
  if ( ! this.hasFf() ) {
    common.log('cannot do ff()');
    return;
  }

  // 1. if next action is in the same group, then complete remaining actions in current group
  // 2. if next action is in the next group, then complete all actions in the next group

  if ( ! this.currentGroupHasMoreActions() ) {
    this.groupIndex++;
    this.actionIndex = -1;  // set to -1 here so that next() increments and does index 0
  }

  while ( this.currentGroupHasMoreActions() ) {
    this.next();
  }
};

pf.ActionController.prototype.rew = function() {
  if ( ! this.hasRew() ) {
    common.log('cannot do rew()');
    return;
  }

  while ( this.currentGroupHasEarlierActions() ) {
    this.prev();
  }

  // do this one extra time to end up on the last item of the previous group
  this.prev();
};

pf.ActionController.prototype.solve = function() {
  if ( ! this.hasSolve() ) {
    common.log('cannot do solve()');
    return;
  }

  while (this.hasNext()) {
    this.next();
  }
};

pf.ActionController.prototype.unsolve = function() {
  if ( ! this.hasUnsolve() ) {
    common.log('cannot do unsolve()');
    return;
  }

  while (this.hasPrev()) {
    this.prev();
  }
};

pf.ActionController.prototype.hasNext = function() {
  return this.hasActionWithIndexes(this.groupIndex, this.actionIndex + 1) || this.hasActionWithIndexes(this.groupIndex + 1, 0);
};

// current indexes point to the "previous" action performed
pf.ActionController.prototype.hasPrev = function() {
  return this.hasActionWithIndexes(this.groupIndex, this.actionIndex);
};

// essentially is always the same state as hasNext()
pf.ActionController.prototype.hasFf = function() {
  return this.hasNext();
};

// essentially is always the same state as hasPrev()
pf.ActionController.prototype.hasRew = function() {
  return this.hasPrev();
};

// essentially is always the same state as hasNext()
pf.ActionController.prototype.hasSolve = function() {
  return this.hasNext();
};

// essentially is always the same state as hasPrev()
pf.ActionController.prototype.hasUnsolve = function() {
  return this.hasPrev();
};
