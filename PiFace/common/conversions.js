var common = common || {};

common.conversions = {
  iToX: function(i, rowLength) {
    if ( ! common.isNumber(i) || ! common.isNumber(rowLength) )
      return -1;

    i = parseInt(i);
    rowLength = parseInt(rowLength);

    return i % rowLength;
  },
  iToY: function(i, rowLength) {
    if ( ! common.isNumber(i) || ! common.isNumber(rowLength) )
      return -1;

    i = parseInt(i);
    rowLength = parseInt(rowLength);

    return Math.floor( i / rowLength );
  },
  iToXy: function(i, rowLength) {
    return {
      x: common.conversions.iToX(i, rowLength),
      y: common.conversions.iToY(i, rowLength)
    }
  },
  xyToI: function(x, y, rowLength) {
    if ( ! common.isNumber(x) || ! common.isNumber(y) || ! common.isNumber(rowLength) )
      return -1;

    x = parseInt(x);
    y = parseInt(y);
    rowLength = parseInt(rowLength);

    return y * rowLength + x;
  }
}



pf.Conversions = function() {
  this.width = 0;
  this.height = 0;
  // this.squares = [][];
  this.squares = [];

};

// pf.Conversions.prototype.property = value;
// pf.Conversions.prototype.func = function() {};
