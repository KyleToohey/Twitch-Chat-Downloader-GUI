import React from 'react';
import ReactDOM from 'react-dom';

import Video from '../video_components/Video'
import VideoBlock from '../video_components/VideoBlock'
import CommentList from '../chat_components/CommentList'
class ChatSearch extends React.Component {
	constructor() {
		super()
		this.state = {loading: true, onChat: false, data: [], chat_data: []};
		this.handleVideoClick = this.handleVideoClick.bind(this);
	}

	componentDidMount() {
		let ids = []
		let videos = []
		fetch('/api/get_downloads').then(response => response.json()).then(data => {
			data.forEach(d => ids.push(d.slice(0, -5))) 
			var api_params = "?"
			ids.forEach(s => api_params = api_params + 'id=' + s + '&')
			fetch(`https://api.twitch.tv/helix/videos/${api_params}`, {headers: {'Client-ID': `${this.props.client_id}`, 'Authorization': `Bearer ${this.props.client_token}`}}).then(response => response.json()).then(data => {
				data.data.forEach(d => videos.push(<Video id={d.id} title={d.title} user_name={d.user_name} created={d.created_at} duration={d.duration} thumbnail={d.thumbnail_url} handleClick={this.handleVideoClick}/>));
				this.setState({loading: false, data: videos});
			});
		});
	}

	handleVideoClick(id) {
		fetch('/api/get_chat', { headers : {'video_id': id}}).then(response => response.json()).then(data => this.setState({onChat: true, chat_data: data}));
	}

	render() { 
		if (this.state.loading) {
			return <h1> loading </h1>
		}
		else if (!this.state.onChat) {
			return (
				<div> 
					<VideoBlock list={this.state.data} />
				</div>
			);
		}
		else {
			return (
				<div>
					<button onClick={(e) => {e.preventDefault(); this.setState({onChat: false});}}> Return to Videos </button>
					<CommentList data={this.state.chat_data} />;
				</div>
			);
		}
	}
}

export default ChatSearch;