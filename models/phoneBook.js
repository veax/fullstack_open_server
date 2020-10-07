const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

// connection to Mongo DB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// DB SCHEMA
const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

// IGNORE ID FIELDS WHILE TRANSFORM TO JSON
phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

phoneBookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Phonebook', phoneBookSchema);
