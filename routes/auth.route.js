const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const isLoggedIn = require("../config/config");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require('crypto');


// api/auth/register
router.post("/register", async (req, res) => {
  let { firstname, lastname, email, password } = req.body;

  try {
    let user = new User({ firstname, lastname, email, password });

    user.password = await bcrypt.hash(password, 10);
    let userSaved = await user.save();
    res.json({ user: userSaved }).status(200);
  } catch (error) {
    res.json({ message: "unable to register" }).status(400);
  }
});


// change the name 

/*
user.password = await bcrypt.hash(password, 10);
let userSaved = await user.save();
res.json({ user: userSaved }).status(200);
*/
router.post("/changeProfile", async (req, res) => {
  let { name, id } = req.body;

  try {

    let user = await User.findOneAndUpdate({ _id: id }, { $set: { first_name: name } })
    let nameSaved = await user.save();
    res.json({ name: nameSaved }).status(401)



  } catch{

    res.status(400).json({ message: "You are not Found!" });

  }
})
// api/auth/login
router.post("/login", async (req, res) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(loginUser)
  User.findOne({ email: loginUser.email })
    .then(user => {
      //if email exist
      if (user) {
        // if password is correct 
        console.log(bcrypt.compareSync(loginUser.password, user.password))
        if (bcrypt.compareSync(loginUser.password, user.password)) {

          user.password = undefined
          let payload = { user }
          let token = jwt.sign(payload, "SECRET", { expiresIn: 1500 })

          res.json({ token, login: true })

          // if password is not correct 
        } else {
          res.json({ msg: 'password is not correct' })
        }
        //if email not exist
      } else {

        res.json({ msg: 'email is not found' })
      }

    }).catch(err => res.json(err))
});

router.get("/user", isLoggedIn, async (req, res) => {
  // console.log(req.user);

  try {
    let user = await User.findById(req.user.id, "-password");

    if (!user) throw error;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
  //
});
router.get("/profile", async (req, res) => {
  let { firstname, lastname, email } = req.body;

  try {
    let user = User({ firstname, lastname, email, password });

    if (!user) throw error;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
  //
});


// router post for does not match password. 
router.post("/change", (req, res) => {
  // check if password and confirm password match
  if (req.body.password == req.body.confirmPassword) {
    let newPass = req.body.password;
    // encrypt pass
    var hashedPass = bcrypt.hashSync(newPass, 10);
    // find the user and update password
    User.findByIdAndUpdate(req.user._id, { password: hashedPass }, (err, updatedModel) => {
      res.status(200).json({ message: "Password updated Successfully" });

    });
  }
  // password does not match...
  else {
    res.status(400).json({ message: "something went wrong!" });
  }
});

// router to forget password
router.post("/forget", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(201).json({ message: "Email is not registered" });
      }
      // console.log(user)
      user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
      // console.log(req.body.host)

      user.save()
        .then(() => {
          const msg = {
            to: user.email,
            from: process.env.FROM_EMAIL,
            subject: 'Request Reset Password',
            text: 'and easy to do anywhere, even with Node.js',
            html: `This is the reset.
        <a href="http://${req.body.host}/reset/${user.resetPasswordToken}">Reset Password link </a>`,
          };
          sgMail.send(msg)
            .then(() => {
              return res.status(200).json({ message: "Link has been sent!" });
            })

        })

    })
})
let variable = new Date(Date.now())
console.log(variable.toString())

router.post("/reset/:token", (req, res) => {
  
  //console.log(req.params.token)
  //resetPasswordExpires: { $gt: (Date.now()) }
  User.findOne({ resetPasswordToken: req.params.token  })
    .then((user) => {
      if (!user) {
        return res.status(201).json({ message: "It is either token is not working or expired!!" });

      }
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) return next(err);
        // console.log(user)
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save()
          .then(() => {
            return res.status(200).json({ message: "Password reset successfully!!!" });
          })
      })
    })
})

router.put("/favbooks/:id", (request, response) => {
  console.log(request.body)
  User.findById(request.body._id).populate("favoritePost")
  .then(book => {
    console.log(book)
    let post = book.favoritePost 
    response.json({favoritePost: post})
  })
  .catch(err => {
      console.log(err);
  });
})
// add book to favorite list

// router.post("/favbook/:id", (req, res) => {
//   let favPost = req.params.id

//   User.findById(req.user._id).then((res) => {
//     console.log(res)
//     const found = res.favoritePost.find(
//       element => element == favPost
//     )
//     console.log(found)
//     if (found != undefined) {
//       return res.status(200).json({ message: "Post Is Already In Favorite List" });
//     } else {
//       User.findByIdAndUpdate(req.user._id, { $push: { favoritePost: favPost } })
//         .then(() => {
//           return res.status(200).json({ message: "Post Is Added!!!" });

//         })

//     }

//   }).catch((err) => {
//     console.log(err)

//   })

// })

router.post("/favbooks/:id", (req, res) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.body._id, {$push:{favoritePost:req.params.id}})
  .then((user)=>{
    console.log(user)
    res.json({message:"its working",user})
  }).catch((err) => {
    res.json({message:err})
    
      })
})

// delete book from favorite book
router.delete("/delete/:id", (request, response) => {
  request.body._id.findByIdAndDelete(request.params.id).then(() => {
    response.status(200).json({ message: "Post deleted Successfully" });

  });
})

module.exports = router;