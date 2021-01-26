import React from 'react';
import Video from './Video';
import VideoBlock from './VideoBlock';

class SearchList extends React.Component {
	constructor(props) {
		super(props);
		//this.state = {loading: true, data: [[],[],[],[],[]], pag: null, canDownload: true}
		this.state = {loading: true, data: [], pag: null, canDownload: true}
		this.getData = this.getData.bind(this);
		this.handleVideoClick = this.handleVideoClick.bind(this);
	}

	componentDidMount() {
		this.getData('');
	}

	getData(pag) {
		if (pag == undefined) {
			return;
		}
		this.setState({loading: true});
		fetch(`https://api.twitch.tv/helix/videos?user_id=${this.props.user_id}&after=${pag}`, {headers: {'Client-ID': `${this.props.client_id}`, 'Authorization': `Bearer ${this.props.client_token}`}})
		.then(r => r.json()).then(data => 
			{
				var newData = this.state.data;
				data.data.forEach(d => newData.push(<Video id={d.id} title={d.title} user_name={d.user_name} created={d.created_at} duration={d.duration} thumbnail={d.thumbnail_url} handleClick={this.handleVideoClick}/>));
				this.setState({loading: false, data: newData, pag: data.pagination.cursor});
				this.forceUpdate();
			}
		);
	}

	handleVideoClick(id) {
		if (this.state.canDownload) {
			this.props.toggleSearch();
			this.setState({canDownload: false});
			fetch('/api/download', { headers: {'video_id': id, 'client_id': `${this.props.client_id}`, 'client_token': `${this.props.client_token}`}}).then(r => {this.setState({canDownload: true}); this.props.toggleSearch();});
		}
	}

	render() {
		if (this.state.loading) {
			return <h1> Loading </h1>
		}
		else if (!this.state.canDownload) {
			return <h1> Downloading </h1>
		}
		else {
			return (
				<div>
					<VideoBlock list={this.state.data} />
					<button onClick={(e) => {e.preventDefault(); this.getData(this.state.pag)}}> next </button>
				</div> 
			)
		}
	}
}

export default SearchList;