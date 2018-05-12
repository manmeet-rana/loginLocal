module.exports = function (app , passsport) {
	app.get('/',(req,res)=>{
		res.render('index.ejs');
	});

	app.get('/login',(req,res)=>{
		res.render('login.ejs',{message : req.flash('loginMessage')});
	});

	app.get('/signup',(req,res)=>{
		res.render('signup.ejs',{message : req.flash('signupMessage')});
	});
	
	 app.get('/profile', isLoggedIn, function(req, res) {
	 	
        res.render('profile.ejs', {
            user : req.user 
        });
    });

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

	app.post('/signup',passsport.authenticate('local-signup',{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.post('/login' , passsport.authenticate('local-login',{
		successRedirect : '/profile',
		failureRedirect : '/login' , 
		failureFlash : true
	}));


};

function isLoggedIn(req, res, next) {
	console.log(req.user);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
