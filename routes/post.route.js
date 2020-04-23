const router = require("express").Router();
const Post = require("../models/post.model");
const  multer = require('multer')
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var formidable = require('formidable');



const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
     
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage })

router.post('/user-profile', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    console.log(req.file)
    let postdata = JSON.parse(req.body.post)
    
    
    const post = new Post(postdata);
    post.image = req.file.filename;
    
    post.save().then(result => {
        return res.json({ post })
    }).catch(err => {
        return res.json({ message: "Error"})
        
            
    })
    
})

router.get("/user-profile", (req, res) => {
    Post.find(req.body)
        .then(post => res.json(post))
        .catch(error => res.status(400).json('Error: ' + error))

})

router.post("/Timeline", async (req, res) => {
    let { title, poster, image, overview, content } = req.body;
    try {
        let post = new Post({ title, poster, image, overview, content });
        let postSaved = await post.save();
        res.json({ post: postSaved, moment }).status(200);
    } catch (error) {
        res.json({ message: "unable to add a post" }).status(400);
    }

});

//const post = require("../models/post.model");

//gets form data


/*
  var form = new formidable.IncomingForm();
  form.parse(request, function (err, fields, files) {
    var oldPath = files.filetoupload.path;
    var imagePath = '/dbimg/' + files.filetoupload.name; //display image in our index.ejs file
    var uploadPath = './public/dbimg/' + files.filetoupload.name;

    fs.rename(oldPath, uploadPath, function (err) {
      if (err) throw err;
      else {
        fields.image = imagePath;
        let book = new Book(fields);
        book
          .save()
          .then(() => {
            let category = fields.category;
            Category.findById(category, (err, category) => {
              category.book.push(book);
              category.save();
              });

            request.flash("success", "New Book added Successfully");
            response.redirect("/addbook");
          })
          .catch(err => {
            console.log(err);
            response.send("There's an error with adding the book.")
          })
      }
    });
  });


*/

/*
router.post("/post", (request, response) => {
    let { title, poster, image, overview, content } = request.body
    let post = new Post({ title, poster, fields, overview, content });
    //save post
    post
        .save()
        .then(() => {
            //   response.send("Post worked!!");
            response.status(201).json({ message: "Post added Successfully" });
        })
        .catch(err => {
            console.log(err)
            response.status(401).json({ message: "Post is not added" });
        })
})
*/
/*
router.post("/post", (request, response) => {
    
    let { title, poster, image, overview, content } = request.body

    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
        var oldPath = files.filetoupload.path;
        var imagePath = '/dbimg/' + files.filetoupload.name; //display image in our index.ejs file
        var uploadPath = './public/dbimg/' + files.filetoupload.name;

        fs.rename(oldPath, uploadPath, function (err) {
            if (err) throw err;
            else {
                fields.image = imagePath;
                let post = new Post({ title, poster, fields, overview, content });
                //save post
                post
                    .save()
                    .then(() => {
                        //   response.send("Post worked!!");
                        response.status(201).json({ message: "Post added Successfully" });
                    })
                    .catch(err => {
                        console.log(err)
                        response.status(401).json({ message: "Post is not added" });
                    })
            }
        });
    });
});
*/
router.post("/post/update/:id", (request, response) => {
    post.findByIdAndUpdate(request.params.id, request.body, (err, updatedModel) => {
        updatePost = request.params.id;
    });
});

router.route('/timeline').get((req, res) => {
    Post.find(req.body)
        .then(post => res.json(post))
        .catch(error => res.status(400).json('Error: ' + error))
});

// to get a specefic post
// router.route('/Comment/:id').get((req, res) => {
//     Post.findById(req.params.id)
//         .then(post => res.json(post))
//         .catch(error => res.status(400).json('Error: ' + error))
// });

router.get("/Comment/:id", async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
  
      return res.json({ post }).status(200);
    } catch (error) {
      return res.json({ message: "no post" }).status(400);
    }
  });

// delete picked post
router.delete("/post/:id/delete", (request, response) => {
    post.findById(request.post._id)
        .populate("post")
        .then(post => {
            let index = 0;
            post.post.forEach((post, i) => {
                if (post._id == request.params.id) {
                    index = i;
                }
            });
            post.post.splice(index, 1);
            post.save();
            post.findByIdAndDelete(request.params.id).then(() => {
                res.status(200).json({ message: "Post deleted Successfully" });

            });
        })
})

// router for comments 
router.post("/:id", (req, res) => {
    // console.log(request.body);
    let comment = new Comment(req.body);

    comment
        .save()
        .then((comment) => {
            Question.findByIdAndUpdate(req.params.id, { $push: { comment: comment } }).then(() => {
                res.status(200).json({ message: "Comment added Successfully" });

            })
        })
        .catch(err => {
            res.status(400).json({ message: "Comment is not added!!!" });
        });
});
//jawajer test delete
router.delete("/delete/:id", (request, response) => {
    Post.findByIdAndDelete(request.params.id).then(() => {
        res.status(200).json({ message: "Post deleted Successfully" });

    });
})

module.exports = router;
