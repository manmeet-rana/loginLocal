var localStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport){
	passport.serializeUser(function(user,done){
		//console.log("serializeUser=>" + user);
		done(null,user.id);
	});

	passport.deserializeUser(function(id,done){
		console.log("deserializeUser=>" + id);
		 User.findById(id, function(err, user) {
            done(err, user);
        });
	});


	passport.use('local-signup', new localStrategy({
		 usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
	},
	function(req,email,password,done){
		process.nextTick(function(){
			User.findOne({'local.email' : email},function(err,user){
				if(err)
					return done(err);
				if(user)
					return done(null,false,req.flash('signupMessage' , 'That email is already taken'));
				else
				{
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null,newUser);
					});
				}
			});
		});
	}
	));




	//Login local Strategy
	passport.use('local-login',new localStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req,email,password,done){
		process.nextTick(function(){
			User.findOne({'local.email' : email},function(err,user){
				if(err)
					return done(err);
				if(!user)
					return done(null,false,req.flash('loginMessage', 'User Does not exist'));
				if(!user.validPassword(password))
					return done(null,false,req.flash('loginMessage', 'Oops! Wrong Password'));
				return done(null,user);
			});
		});
	}
	));
};