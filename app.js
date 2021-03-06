
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon(__dirname + '/public/favicon.ico', {
    maxAge: 2592000000
  }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.get('/task', routes.list);
app.post('/task', routes.add);
app.put('/task/:id', routes.update);
app.del('/task/:id', routes.del);

app.get('/task/:id/complete', routes.complete);
app.get('/sync', routes.sync);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
