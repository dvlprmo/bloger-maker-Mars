const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,  
      required: true
    },
    poster: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },
    overview: { 
       type: String, 
       required: true
    },
    content: {
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 5000
    },
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true } //means createdAt and updatedAt
);
const Post = mongoose.model("Post", postSchema);
//export to be used on other pages
module.exports = Post;