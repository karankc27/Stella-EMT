const crypto= require("crypto");
var mongoose=require("mongoose");
const bcrypt= require('bcryptjs');
const nodemailer=require('nodemailer');
const sendgridTransport=require("nodemailer-sendgrid-transport");

const Movie=require("../models/movie");
const Tv=require("../models/tv");
const Edevice=require("../models/edevice");
mongoose.Promise = require('bluebird');



var myQuery = Movie.find({})
.sort({
  rating: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    topratedmovies=results;
});

var myQuery = Movie.find({})
.sort({
  year: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    latestmovies=results;
});


var myQuery = Movie.find({})
.sort({
  quantity: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    popularmovies=results;
});



var myQuery = Tv.find({})
.sort({
  rating: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    topratedtvs=results;
});

var myQuery = Tv.find({})
.sort({
  start_year: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    latesttvs=results;
});


var myQuery = Tv.find({})
.sort({
  quantity: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    populartvs=results;
});





var myQuery = Edevice.find({})
.sort({
  rating: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    toprateddevices=results;
});

var myQuery = Edevice.find({})
.sort({
  start_year: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    latestdevices=results;
});


var myQuery = Edevice.find({})
.sort({
  quantity: "descending"
})
.limit(4)
.exec()
.then(function(results) {
    populardevices=results;
});




const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: '<api_key>'
  }
}));

const User=require("../models/user");


exports.getIndex=(req,res,next)=>{

  let message=req.flash('error');
  if(message.length>0){
    message=message[1];
  }
  else{
    message=null;
  }
  res.render("shop/index",{
  errorMessage: message,
  topratedmovies:topratedmovies,
  popularmovies: popularmovies,
  latestmovies: latestmovies,
  topratedtvs:topratedtvs,
  populartvs: populartvs,
  latesttvs: latesttvs,
  toprateddevices:toprateddevices,
  populardevices: populardevices,
  latestdevices: latestdevices,
  page_title: null
  });
  }

exports.postSignup= (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  const name =req.body.username;

 console.log(email);
   crypto.randomBytes(32, (err, buffer) => {
     const token = buffer.toString('hex');
     User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error','E-Mail exists already, please pick a different one.');
        res.render('shop/index',{
          errorMessage:'E-Mail exists already, please pick a different one.',
          page_title: null
        });
        console.log("User exists");
      }
      return bcrypt.hash(password, 12);
    })

    .then(hashedPassword => {

        transporter.sendMail({
          to: email,
          from: 'Stella-emt',
          subject: 'Signup Succeeded',
          html: `<h1> Welcome!</h1>
                <h1> Click this <a href="https://stella-emt.herokuapp.com/activate?token=${token}&email=${email}&pwd=${hashedPassword}&name=${name}">link</a> to activate. </h1>
          `
        })

            res.render("shop/index",{
              errorMessage: "Activation link sent to your mail",
              page_title: null
            });



    })
  });
};

exports.getActivate=(req,res,next) =>{
  let email=req.query.email;
  let pwd=req.query.pwd;
  let name=req.query.name;
  const user= new User({
    email:  email,
    password: pwd,
    name: name
  });
  user.save()
  .then(result => {
        console.log(result);

        res.render('shop/index',{
        errorMessage: "Welcome!!!",
        page_title: null
        });
});
};

exports.postLogin=(req,res,next) =>{

  const email=req.body.email;
  const password=req.body.password;

  User.findOne({email: email})
  .then(user => {
    if(!user){
      console.log("Email Not Registered");
      req.flash('error',"Email Not Registered");
      return res.render("shop/index",{
        errorMessage: "Email Not Registered",
        page_title: null
      });
    }
    bcrypt.compare(password, user.password)
    .then(doMatch =>{
      if(doMatch){
        req.session.isLoggedIn=true;
        req.session.user=user;
        return req.session.save(err =>{

          console.log("Logged In");
          return res.redirect("/");

        });

      }

      return res.render("shop/index",{
        errorMessage:"Incorrect Password",
        page_title: null
      //  oldemail: email
      });

    })
    .catch(err =>{
      console.log(err);
      res.redirect("/");
    })
  })

};

exports.getLogout=(req,res,next) =>{
  //provided by session package to delete the session
  req.session.destroy(err =>{
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    page_title: "Reset Password",
    errorMessage: message
  });
};


exports.postReset = (req, res, next) => {
  let email=req.body.email;
  crypto.randomBytes(32, (err, buffer) => {
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
            req.flash("error",'No account with that email found.');
            res.render('shop/index',{
              errorMessage:'No account with that email found.',
              page_title: null
            });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        console.log(email);
        transporter.sendMail({
          to: email,
          from: 'Stella-emt',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `
        })
        res.render("shop/index",{
          errorMessage: "Password Reset Link has been sent to your mail",
          page_title: null
        })

      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
     let uid= user.email;
      res.render('auth/new-password', {
        path: '/new-password',
        page_title: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let email;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      email=user.email;
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      transporter.sendMail({
        to: email,
        from: 'Stella-emt',
        subject: 'Password reset',
        html: `
          <p>Your Password has been Updated.</p>
        `
      })
      res.render('shop/index',{
        errorMessage: "Password Updated Successfully",
        page_title: null
      });
    })
    .catch(err => {
      console.log(err);
    });
};
