const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

const tempdataBase = {
  users: [
    {
      id: 1,
      name: "Pepe",
      email: "pepe@dummy.com",
      password: "dummy1",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 2,
      name: "Ramon",
      email: "ramon@dummy.com",
      password: "dummy2",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 3,
      name: "Juan",
      email: "juan@dummy.com",
      password: "dummy3",
      entries: 0,
      joined: new Date(),
    },
  ]
}

app.get('/', (req, res) => {
  res.send(tempdataBase.users);
})

/*
 * API ENDPOINTS PLAN
 *      /register | post -> success/fail
 *      /signing  | post -> success/
 *
 * */

app.post('/signing', (req, res) => {
   const { email, password } = req.body;
  
  console.log(req.body);
   tempdataBase.users.forEach(user => {
      if (email == user.email && password == user.password)
      { 
        console.log("Backend coincidence");
        res.json("true");
      }
      console.log("Email: ", email ,email == user.email);
      console.log("Password: ", password, password == user.password);
   });


   
})

app.post('/register', (req, res) => {
  if ((req.body.email === null) || (req.body.password = null)) {
    res.send("Lo siento. Ha habido un error");
  }

  const { email, name, password } = req.body;

  const user = {
    id: 3,
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
    entries: 0,

    joined: new Date(),
  }
  tempdataBase.users.push(user);

  res.json(user);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  tempdataBase.users.forEach((user) => {
    if (user.id == id) {
      return res.json(user);
    }
  })
  res.status(404).send('No such user');
})

app.put('/image', (req,res) => {
  const { id } = req.body;
  
  console.log(id);
  let found = false;
  tempdataBase.users.forEach(user => {
    if (user.id === id)
    {
      found = true;
      user.entries++;
      return res.json('hola');
    }
  });

  if (!found)
  {
    res.status(400).json('not found');
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


