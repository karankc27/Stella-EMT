var http=require('http');
const bodyParser=require("body-parser");
const path=require("path");
const express=require("express");
const app=express();
const mongoose=require('mongoose');
const session= require("express-session");
const MongoDBStore=require('connect-mongodb-session')(session);
const flash=require("connect-flash");
const csrf=require('csurf');


const errorController = require('./controllers/error');

const User = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));
var $ = require("jquery");

const speech=require("speech-to-text");

const MONGODB_URI= "mongodb+srv://karankc27:Karijitmongo@demo-nwqqd.mongodb.net/test?retryWrites=true&w=majority";

const store= new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection=csrf();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to mongo")
    // console.log(moment().format('h:mm:ss a')-moment().format('h:mm:ss a')  )
});


app.set("view engine","ejs");
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false,store: store}));
//session will not be saved on every request for resave: false

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

//To use this in all the render functions
app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLoggedIn;

  res.locals.csrfToken=req.csrfToken();
  if(req.session.isLoggedIn) {
    res.locals.name=req.session.user.name;
    res.locals.email=req.session.user.email;
    if(req.session.user.email==="karankaramchandani5@gmail.com"){
    console.log("Admin");
    res.locals.isAdmin=true;
  }
  else{
    res.locals.name=null;
    res.locals.email=null;
    res.locals.isAdmin=false;
  }
  }
  else{
    res.locals.isAdmin=false;
  }
  //res.locals.oldemail=req.body.email;
  next();
});

const adminRoutes=require("./routes/admin");
app.use(adminRoutes);
const shopRoutes=require("./routes/shop");
const authRoutes = require('./routes/auth');
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    page_title: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});



mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
  })
  .catch(err => {
    console.log(err);
  });
 app.listen(process.env.PORT||3000);
