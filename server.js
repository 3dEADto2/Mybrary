const PORT = 3000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.set('strictQuery', true); //to supress warning
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server runs on port: ${PORT}`);
});
