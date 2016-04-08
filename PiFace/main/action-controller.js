pf.ActionController = function() {
  // this.foos = 'ball';
  this.actions = [];
  this.groupIndex = -1;   // these indexes represent a position within the two-dimensional array of actions
  this.actionIndex = -1;  // init these values at -1 so that "next" incrementing will get them to 0
  this.row = null;
  this.grid = null;
};

// pf.ActionController.prototype.property = value;
// pf.ActionController.prototype.func = function() {};

pf.ActionController.prototype.getGroup = function(groupIndex) {
  if ( ! common.isArray(this.actions) || ! common.isNumber(groupIndex) || ! common.arrayContainsIndex(this.actions, groupIndex) )
    return null;

  return this.actions[groupIndex];
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
    return return group[actionIndex];

  return null;
};

pf.ActionController.prototype.hasActionWithIndexes = function(groupIndex, actionIndex) {
  return pf.utils.actionIsSet( this.getActionWithIndexes(groupIndex, actionIndex) );
};

// TODO all the functions below
// pf.ActionController.prototype.incrementAction = function() {};
// pf.ActionController.prototype.decrementAction = function() {};
// pf.ActionController.prototype.incrementGroup = function() {};
// pf.ActionController.prototype.decrementGroup = function() {};

// pf.ActionController.prototype.next = function() {};
// pf.ActionController.prototype.prev = function() {};
// pf.ActionController.prototype.ff = function() {};
// pf.ActionController.prototype.rew = function() {};
// pf.ActionController.prototype.solve = function() {};

pf.ActionController.prototype.hasNext = function() {
  return this.hasActionWithIndexes(groupIndex, actionIndex + 1) || this.hasActionWithIndexes(groupIndex + 1, 0);
};

// current indexes point to the "previous" action performed
pf.ActionController.prototype.hasPrev = function() {
  return this.hasActionWithIndexes(groupIndex, actionIndex);
};

// TODO superfluous? since it essentially is always the same state as hasNext()
pf.ActionController.prototype.hasFf = function() {
  /*
    has FastForward if...
    - hasNext()
    - -- which is true of hasNext(): if no more in this group, then has next group?
    - -- which is true of hasNext(): else yes
  */
  // return this.hasActionWithIndexes(groupIndex, actionIndex + 1) || this.hasActionWithIndexes(groupIndex + 1, 0);
  return this.hasNext();
};

// TODO superfluous? since it essentially is always the same state as hasPrev()
pf.ActionController.prototype.hasRew = function() {
  return this.hasPrev();
};

pf.ActionController.prototype.hasSolve = function() {
  return this.hasNext();
};
