pf.DrawTests = function() {
  // this.testData = ['red', 'blue', 'green'];

  this.actionController = null;

  this.buttonsStartX = 300;
  this.buttonsStartY = 100;
  this.buttonWidth = 75;
  this.buttonHeight = 50;
  this.buttonMarginX = 5;
  this.buttonMarginY = 5;

  this.canvas = this.initCanvas();
  this.buttons = this.initButtons();
  this.squares = this.initSquares();

};

// var rerun = function() { var dt = new pf.DrawTests(); dt.idAndClassElements(); };

pf.DrawTests.prototype.initCanvas = function() {
  var canvas = d3.select('body')
    .selectAll('svg#main-canvas')
    .data([0]);

  canvas.enter()
    .append('svg')
    .attr('id', 'main-canvas');

  canvas.exit().remove();

  canvas.attr('width', 2000)
    .attr('height', 1500);

  return canvas;
};

pf.DrawTests.prototype.initSquares = function() {
  // TODO I think - Sazed
};

pf.DrawTests.prototype.onButtonClick = function() {
  common.log('onButtonClick()');

  this.initButtons();
  if ( common.isFunction(this.onUpdate) )
    this.onUpdate();
}

pf.DrawTests.prototype.initButtons = function() {
  var self = this;

  var isActionControllerSet = function(actionController) {
    // common.log('isActionControllerSet() ? ' + (actionController && actionController instanceof pf.ActionController ? 'yes' : 'no'));
    return actionController && actionController instanceof pf.ActionController;
  };

  var buttonsData = [
    {
      title: 'Unsolve',
      x: 0,
      y: 2,
      isEnabled: function() {
        return isActionControllerSet(self.actionController) && self.actionController.hasUnsolve();
      },
      onClick: function() {
        if ( isActionControllerSet(self.actionController) ) {
          self.actionController.unsolve();
          self.onButtonClick();
        }
      }
    },
    {
      title: '<<',
      x: 0,
      y: 1,
      isEnabled: function() {
        return isActionControllerSet(self.actionController) && self.actionController.hasRew();
      },
      onClick: function() {
        if ( isActionControllerSet(self.actionController) ) {
          self.actionController.rew();
          self.onButtonClick();
        }
      }
    },
    {
      title: '<',
      x: 0,
      y: 0,
      isEnabled: function() {
        return isActionControllerSet(self.actionController) && self.actionController.hasPrev();
      },
      onClick: function() {
        if ( isActionControllerSet(self.actionController) ) {
          self.actionController.prev();
          self.onButtonClick();
        }
      }
    },
    {
      title: '>',
      x: 1,
      y: 0,
      isEnabled: function() {
        return isActionControllerSet(self.actionController) && self.actionController.hasNext();
      },
      onClick: function() {
        if ( isActionControllerSet(self.actionController) ) {
          self.actionController.next();
          self.onButtonClick();
        }
      }
    },
    {
      title: '>>',
      x: 1,
      y: 1,
      isEnabled: function() {
        return isActionControllerSet(self.actionController) && self.actionController.hasFf();
      },
      onClick: function() {
        if ( isActionControllerSet(self.actionController) ) {
          self.actionController.ff();
          self.onButtonClick();
        }
      }
    },
    {
      title: 'Solve',
      x: 1,
      y: 2,
      isEnabled: function() {
        return isActionControllerSet(self.actionController) && self.actionController.hasSolve();
      },
      onClick: function() {
        if ( isActionControllerSet(self.actionController) ) {
          self.actionController.solve();
          self.onButtonClick();
        }
      }
    }
  ];

  var buttons = this.canvas.selectAll('g.button')
    .data(buttonsData);

  buttons.enter()
    .append('g')
    .classed('button', true)
    .on('click', function(d, i) {
        common.log('on button click');

        d.onClick();
    });

  buttons.exit().remove();

  buttons.attr("transform", function(d, i) {
    // return "translate(" + (self.buttonsStartX + self.buttonWidth * i + self.buttonMarginX * i) + "," + self.buttonsStartY + ")";
    return "translate(" + (self.buttonsStartX + self.buttonWidth * d.x + self.buttonMarginX * d.x) + "," + (self.buttonsStartY + self.buttonHeight * d.y + self.buttonMarginY * d.y) + ")";
  });

  // TODO use buttons.each(function(g, i) { d3.select(this).selectAll('rect').data(d) ... }) INSTEAD OF append()
  // -- do this for both rect and text
  buttons.append('rect').classed('button', true)
    // .text(function(d, i) { return d.title; })
    .attr('width', this.buttonWidth)
    .attr('height', this.buttonHeight)
    .attr('rx', this.buttonHeight / 2) //15)
    .attr('ry', this.buttonHeight / 2) //15)
    // .attr('x', function(d, i) {
    //   return self.buttonsStartX + self.buttonWidth * i + self.buttonMarginX * i;
    // })
    // .attr('y', function(d, i) {
    //   return self.buttonsStartY;
    // })
    .style('stroke-width', 2)
    .style('stroke', 'black')
    .attr('fill', function(d, i) {
      return d.isEnabled() ? 'white' : 'lightgray';
      // return i % 2 ? 'white' : 'lightgray';
    })
    .on('mouseover', function(d, i) {
      if ( ! d.isEnabled() )
        return;

      d3.select(this).transition()
        .ease('cubic-out')
        // .ease('linear')
        .duration('200')
        // .style("fill-opacity", 1)
        // .style("fill", "red");
        .style('stroke', 'gray');
    })
    .on('mouseout', function(d, i) {
      d3.select(this).transition()
        .ease('cubic-in')
        // .ease('linear')
        .duration('200')
        // .style("fill-opacity", 1)
        // .style("fill", "black");
        .style('stroke', 'black');
    });

  buttons.append('text')
    .style("text-anchor", "middle")
    // .style("alignment-baseline", "middle")
    .attr("x", self.buttonWidth / 2)
    .attr("y", self.buttonHeight / 2)
    .attr("dy", ".35em")
    .text(function(d, i) { return d.title; });

  return buttons;
};

// pf.DrawTests.prototype.idAndClassElements = function() {
//   common.log('idAndClassElements()');
//
//
//
//   // var rectWithClass = this.canvas.append('rect')//.append('rect.some-class-thingy')
//   //                                 .attr('width', 50)
//   //                                 .attr('height', 50)
//   //                                 .attr('x', 75)
//   //                                 .attr('y', 75)
//   //                                 .style('fill', 'red');
//
//   var rectsWithClass = this.canvas.selectAll('rect.some-class-thingy')
//                                   .data(this.testData);
//
//                                   rectsWithClass.enter()
//                                     .append('rect')
//                                     .classed('some-class-thingy', true);
//
//                                   rectsWithClass.attr('width', 50)
//                                     .attr('height', 50)
//                                     .attr('x', function(d, i) { return i * 55; })
//                                     .attr('y', 75)
//                                     .style('fill', function(d, i) { return d; });
//
//                                   rectsWithClass.exit().remove();
//
//   // this.squareRects = this.canvas.selectAll('rect');   // TODO probably select <g> elements (groups), and either way with a more defined selector (e.g. 'rect.pf-square') or something
//   //
//   // this.vcrControls = this.canvas.append('g').attr('id', 'vcr-controls').attr('width', 50).attr('height', 50).attr('transform', 'translate(15, 15)').style('fill', 'gray').append('rect').attr('width', 35).attr('height', 35);
//   // this.vcrControls.style('fill', 'red');
// };
