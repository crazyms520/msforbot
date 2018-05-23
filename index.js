const express = require('express');
express().get ('/', function (req, res) {
	res.send('Hello world');
}).listen(3000);
