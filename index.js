const express = require('express');
const PORT = process.env.PORT || 3000;
express().get ('/', function (req, res) {
	res.send('Hello world');
}).listen(PORT);
