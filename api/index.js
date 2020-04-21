const express = require('express');
const userRoutes = require('./routes/userRoutes');
const incidentsRoutes = require('./routes/incidentsRoutes')

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use(incidentsRoutes)
app.use(userRoutes)


app.listen(5000);


console.log(`API Be the Hero running at port 5000`)