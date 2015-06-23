'use strict';
var Express = require('express'),
    React   = require('react'),
    Jade    = require('jade'),
    Router      = require('react-router');

require('node-jsx').install({ harmony: true });

//
var avatar  = require('./avatar');

var app     = Express();

// Use jade template
app.set('views', './');
app.set('view engine', 'Jade');
app.use(Express.static(__dirname + '/'));

//app.get('/', function(req, res){
//    res.render('index', {
//      //initialData: JSON.stringify(data),
//      //Render a ReactElement to its initial HTML. 
//      //This should only be used on the server. 
//      //React will return an HTML string. 
//      //You can use this method to generate HTML on the server 
//      //and send the markup down on the initial request for 
//      //faster page loads and to allow search engines to crawl your pages for SEO purposes.
//      markup: React.renderToString(React.createElement(avatar))
//  })
//});
//var routes = require('./routes')();

var routes = avatar.routes;


app.use(function (req, res) {
  Router.run(routes, req.path, function(Root) {
    res.render('index', {
      markup: React.renderToString(React.createElement(Root))
  })
  })
});

var server = app.listen(5000, function(){
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('App listening at http://localhost:%s', host, port);
})