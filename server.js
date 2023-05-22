const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/foodApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
     required:true,
    },
    message:{
      type:String,
      required:true
    }
  });

  const Person = mongoose.model("Person", personSchema);


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

   Person.inserOne(
    {name:name, email:email, message:message, phone:phone}
   )


    res.send('<script>alert("Form submitted successfully!"); window.location.href="http://localhost:5500";</script>');

    });
 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});