require('dotenv').config();
const express = require('express');
const path = require('path');
const controller = require('./controllers.js');
const app = express();
const port = process.env.port || 8080;

const publicUrl = path.join(__dirname, '..', 'public');

app.use(express.static(publicUrl));
app.use(express.json());

app.get('/', controller.sendHtml);

app.listen(port, () => console.log('Server listening on port: ', port));