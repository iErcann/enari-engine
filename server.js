const express = require('express')
const app = express()
 
var compression = require('compression');

app.use(express.static('dist2'));
app.use(compression());

const PORT = process.env.PORT || 9090;

app.listen(PORT)