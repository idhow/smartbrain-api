const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'ido',
      password: 'blyat',
      email: 'ido@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '456',
      name: 'ryan',
      password: "hiya",
      email: 'ryan@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '321',
      has: '',
      email: 'ido@gmail.com'
    }
  ]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
})

// /signin --> POST = success/fail
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logging in')
  }
})

// /register --> POST = user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '789',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

// /profile:id --> GET = user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})

// /image --> PUT = user
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})



app.listen(3000, () => {
  console.log('heyy its running on port 3000')
})
