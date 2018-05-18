const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  express = require('express'),
  app = express();

app.get('/', (req, res) => res.send('Test aplikacji!'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Solitary82:Altergothic1@ds227740.mlab.com:27740/nodeappdatabase', {
    useMongoClient: true
});

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

userSchema.methods.manify = function(next) {
  this.name = this.name + '-boy';
  return next(null, this.name);
};

userSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const User = mongoose.model('User', userSchema),
  kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
  });

kenny.manify(function(err, name) {
  if (err) throw err;
  console.log('Twoje nowe imię to: ' + name);
});