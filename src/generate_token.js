const fs = require('fs');
const axios = require('axios');

var data = require('./client_info.json');

async function getToken() {
	let url = 'https://id.twitch.tv/oauth2/token?client_id=' + data["id"] + '&client_secret=' + data["secret"] + '&grant_type=client_credentials'
	let res = await axios.post(url);
	console.log("Token generated successfully");
	data["token"] = res.data.access_token;
	fs.writeFileSync('./client_info.json', JSON.stringify(data));
}

getToken().then(result => console.log(result));