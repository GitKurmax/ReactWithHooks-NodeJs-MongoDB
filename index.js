const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

require('./person.model');

const Person = mongoose.model('persons');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://alex:XY31TQGX9CA4FRtt@cluster0-mzhck.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => console.log('mongodb has started'))
    .catch((err) => console.log('connection error' + err));

app.get('/api/getAll', function (req, res) {
    Person.find()
        .then(users => res.json(users))
        .catch(error => console.log(error));
});


app.post('/api/add', function (req, res) {
    console.log(req.body)
    const person = new Person ({
        name: req.body.name,
        age: req.body.age
    });

    person.save()
     .then(user => {
        console.log(user)
        res.json(user)})
     .catch(error => console.log(error));
});

app.post('/api/removeUser', function (req, res) {
    Person.findOneAndRemove({_id: req.body.id}, (err, todo) => {
    console.log(todo);
    if (err) return res.status(500).send(err);
    return res.status(200).send({'message':'User successfully deleted'});
    });
});

app.put('/api/editUser', function (req, res) {
    Person.findOneAndUpdate({_id: req.body.id},
         {name: req.body.name, age: req.body.age},
         (err, todo) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({'message':'User successfully updated'});
    });
});


app.listen(3100, function () {
  console.log('Server listening on port 3100!');
});


