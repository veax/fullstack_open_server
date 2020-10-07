const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log('Please provide the name and phone number of person to add in phonebook');
  process.exit(1);
}

// db connection
const password = process.argv[2];
const dbName = 'phonebook-app';
const url = `mongodb+srv://fullstack-course-user:${password}@cluster0.zjfnj.mongodb.net/${dbName}?retryWrites=true&w=majority
`;
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// db schema
const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
const Phonebook = mongoose.model('Phonebook', phoneBookSchema);

if (process.argv.length === 3) {
  Phonebook.find({}).then((result) => {
    console.log('phonebook: ');
    result.forEach((person) => {
      console.log(person.name + ' ' + person.number);
    });
    mongoose.connection.close();
  });
} else {
  const personName = process.argv[3];
  const personPhone = process.argv[4];

  const phoneEntry = new Phonebook({
    name: personName,
    number: personPhone,
  });

  phoneEntry.save().then((result) => {
    console.log(`added ${phoneEntry.name} number ${phoneEntry.number} to phonebook`);
    mongoose.connection.close();
  });
}
