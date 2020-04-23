require("dotenv").config();
const mongoose = require("mongoose");


console.log(process.env)
//connect mongodb
//=================
mongoose.connect(

  process.env.MONGODB,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    console.log(`mongodb connected!`);
  }
);

module.exports = mongoose;