const express = require('express');
const routes = require('./src/routes/routes');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use(routes)


app.listen(5000);


console.log(`API Be the Hero running at port 5000`)