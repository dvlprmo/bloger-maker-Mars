const express = require('express');
const moment = require('moment');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const router = express.Router();

const Comment = require('../models/comment.model');
const Question = require('../models/question.model'); 

router.use(methodOverride('_method'));
router.use(expressLayouts);

router.use(express.urlencoded({ extended: true}));


// get 
router.get("/:id", (req, res) => {
    Question.findById(req.params.id).populate('comment')
        .then(question => {
          let comments = question.comment; //populated list in user model
          console.log(comments)
         // res.send(experiments)
          res.render("questions/show", { comments, question });
        })
        .catch(err => {
          console.log(err);
      });
  });

// Post for comments
router.post("/:id", (req, res) => {
    // console.log(request.body);
    let comment = new Comment(req.body);
  
    comment
      .save()
      .then((comment) => {
          Question.findByIdAndUpdate(req.params.id, {$push: {comment: comment}}).then( () => {
            res.redirect(`/comments/${req.params.id}`);
          })
        
      })
      .catch(err => {
        console.log(err);
        res.send("Error!!!!!");
      });
  });

  module.exports = router;