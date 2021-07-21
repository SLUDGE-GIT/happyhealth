const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// create session that stores login data in connect-mongo
const sess = {
  secret: process.env.SECRET||"secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI||'mongodb://localhost/happyhealth', //YOUR MONGODB URL
      ttl: 14 * 24 * 60 * 60,
       autoRemove: 'native' 
  })
};

app.use(session(sess));

// Add routes, both API and view
app.use(routes);


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/happyhealth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

  
// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
