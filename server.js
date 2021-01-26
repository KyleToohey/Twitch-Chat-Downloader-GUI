const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const chatDownloader = require('./src/server_code/chat_downloader.js');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));


//takes video id, client id and token as headers
app.get('/api/download', async function (req, res) {
 	let output = chatDownloader.downloadChat(req.headers.video_id, req.headers.client_id, req.headers.client_token);
 	output.then(r => res.send("done")); 		
 });

//gets all corresponding video id of downloaded files, no headers
app.get('/api/get_downloads', function (req, res) {
	fs.readdir('./video_data/', (err, files) => {res.send(files); } );
});


//takes video id as header, returns JSON with chat data
app.get('/api/get_chat', function (req, res) {
	video_id = req.headers.video_id;
	res.sendFile(__dirname + '/video_data/' + video_id + '.json');
});

app.get('./', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(process.env.PORT || 8080);
