// load environment variables
//=========================
require("dotenv").config();
//grab our dependencies
//=================
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path")


//connect mongodb
//=================
require("./config/db");

// middlewares npm i cors
// ===============
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "build")))

// => = > == = =
// Routes for API
//===================
app.use("/api/user", require("./routes/auth.route"));
app.use("/api/post", require("./routes/post.route"));



// 404 Routes
//===================
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
const msg = {
  to: "mohammad.aljagthmi95@gmail.com",
  from: process.env.FROM_EMAIL,
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
*/
