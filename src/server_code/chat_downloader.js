const axios = require('axios');
const fs = require('fs');

//returns array of comments from given video ID and pagination cursor()
async function getComments(video_id, pagination, client, token) {
	axios.defaults.headers.common['Client-ID'] = client;
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	let comments = [];
	let url = 'https://api.twitch.tv/v5/videos/' + video_id + '/comments?cursor=' + pagination;
	let res = await axios.get(url);
	return [res.data.comments, res.data._next];
}

//gets all comments for video with given id, saves data from all comments to JSON file
async function downloadChat(video_id, client, token) {
	let chat = [];
	let counter = 0;
	pag = '';
	while (typeof pag !== 'undefined') {
		counter = counter + 1;
		output = await getComments(video_id, pag, client, token);
		output[0].forEach(c => chat.push(new Comment(c.commenter.name, c.content_offset_seconds, c.message.body, c.message.user_color)));
		console.log("API CALL #" + counter + ' ' + output[0][0].content_offset_seconds);
		pag = output[1];
	}
	console.log("done!");
	fs.writeFileSync('./video_data/' + video_id + '.json', JSON.stringify(chat));
	return;
}

//data structure to hold relevent data for a given comment
class Comment {
	constructor(username, time, message, user_color) {
		this.username = username;
		this.time = time;
		this.message = message;
		this.user_color = user_color
	}

	get_username() {
		return this.username;
	}

	get_time() {
		return this.time;
	}

	get_message() {
		return this.message;
	}

	get_user_color() {
		return this.user_color;
	}
}

module.exports.Comment = Comment;
module.exports.downloadChat = downloadChat;
module.exports.getComments = getComments;