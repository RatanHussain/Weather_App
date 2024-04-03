/** @format */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.static('public'))

const Port = process.env.PORT || 4444;

app.listen(Port, () => {
	console.log('App is running on port' + Port);
});
