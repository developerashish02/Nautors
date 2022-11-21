const donenv = require('dotenv');
donenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port);
