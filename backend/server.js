const mongoose = require('mongoose');
const dbInit = require('./Database/dbInit');
const express = require('express');

const app = express();
const port = 6969;

dbInit();

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
