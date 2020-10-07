require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// connection to mongoDb and db schema
const PhonebookSchema = require('./models/phoneBook');

// instance of server
const app = express();

// middlewares
app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));

// START SERVER ON PORT
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// =============================================
// PERSONS API

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

const getAllPersons = () =>
  new Promise((resolve) => {
    PhonebookSchema.find({}).then((phones) => resolve(phones));
  });

// GET ALL PERSONS
app.get('/api/persons', (req, res) => {
  getAllPersons().then((phones) => {
    res.json(phones);
  });
});

app.get('/info', (req, res) => {
  getAllPersons().then((persons) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>`;
    const reqTime = `<p>${new Date()}</p>`;
    res.send(info + reqTime);
  });
});

// GET PERSON BY ID
app.get('/api/persons/:id', (req, res, next) => {
  PhonebookSchema.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE PERSON
app.delete('/api/persons/:id', (req, res, next) => {
  PhonebookSchema.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// CREATE PERSON
app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const newPerson = new PhonebookSchema({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// UPDATE PERSON
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    number: body.number,
  };
  PhonebookSchema.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  console.log('error name:', error.name);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);
