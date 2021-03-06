/*********************************************************#
# @@ScriptName: app.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:44:48
# @@Modify Date: 2013-07-20 16:02:21
# @@Function:
#*********************************************************/

/* jshint laxcomma:true */

var express = require('express')
  , config = require('./config')
  , mongoose = require('mongoose')
  , path = require('path');

var app = module.exports = express.createServer();

// Connect to mongo db
mongoose.connect(config.database.connectionString);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Include api routes
require('./routes/api')(app);

// Include web site
require('./routes/pages')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
