pf.ActionController = function() {
  // this.foos = 'ball';
  this.actions = [];
  this.groupIndex = 0;
  this.actionIndex = 0;
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

// pf.ActionController.prototype.hasNext = function() {};
// pf.ActionController.prototype.hasPrev = function() {};
// pf.ActionController.prototype.hasFf = function() {};
// pf.ActionController.prototype.hasRew = function() {};
// pf.ActionController.prototype.hasSolve = function() {};
