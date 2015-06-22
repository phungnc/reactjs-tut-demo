'use strict';
var React   = require('react');
//    Avatar = require('./avatar');
//React.render(<Avatar />, document.body);

Router.run(routes, Router.HistoryLocation, function(Handler){
  React.render(<Handler />, document.body);
});