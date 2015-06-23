'use strict';
var React = require('react'),
    Router = require('react-router')
    //routes = require('./routes')()
;
var Avatar = require('./avatar');
var routes = Avatar.routes;
//React.render(<Avatar />, document.body);

Router.run(routes, Router.HistoryLocation, function(Root){
  React.render(<Root />, document.body);
});

