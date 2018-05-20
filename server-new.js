const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  PORT = process.env.PORT || 5000,
  express = require('express'),
  app = express();

app.get('/', (req, res) => res.send('Test aplikacji wyświetlającej użytkowników. Jest to pierwsza próba hostowania aplikacji na Heroku razem z podłączoną bazą danych'));

app.get('/benny', (req, res) => res.send(benny));
app.get('/kenny', (req, res) => res.send(kenny));

app.listen(PORT, () => console.log('Example app listening on port ' + PORT));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Solitary82:Altergothic1@ds227740.mlab.com:27740/nodeappdatabase');

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
