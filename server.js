var app = require('express')();

var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./config/database.js');

mongoose.connect(db.url);

require('./config/passport')(passport);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');


app.use(session({secret : 'ilovecodingilovecoding'}));

app.use(passport.initialize());
app.use(flash());

require('./app/routes.js')(app, passport); 

app.listen(port,(err,res)=>{
	if(err)
		console.log("error occured in connecting to port");
	else
		console.log('listening to port : '+ port);
});