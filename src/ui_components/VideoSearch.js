import React from 'react';
import ReactDOM from 'react-dom';
import SearchList from '../video_components/SearchList';

class VideoSearch extends React.Component {
	constructor() {
		super()
		this.state = {done: false, username: "", data: null, canSearch: true};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
	}

	componentDidMount() {

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value, done: false});
	}

	async handleSubmit(e) {
		e.preventDefault();
		await fetch(`https://api.twitch.tv/helix/users?login=${this.state.username}`, {headers: {'Client-ID': `${this.props.client_id}`, 'Authorization': `Bearer ${this.props.client_token}`}})
		.then(r => r.json()).then(d => this.setState({done: true, data: d.data[0].id}));
	}

	toggleSearch() {
		this.state.canSearch = !this.state.canSearch;
		this.props.toggleChangePageButton();
		this.forceUpdate();
	}

	render() {
		if (this.state.done) {
			return (
				<div> 
					<form onSubmit={this.handleSubmit}> 
						<fieldset disabled={this.state.canSearch ? "" : "disabled"}>
							Username: <input type="text" name="username" onChange={this.handleChange}/>
							<br />
							<button> Submit </button>
						</fieldset>
			 		</form>
					<SearchList user_id={this.state.data} client_id={this.props.client_id} client_token={this.props.client_token}  toggleSearch={this.toggleSearch}/>
				</div>
			)
		}
		else {
		return (
			<div>
				<form onSubmit={this.handleSubmit}> 
					<fieldset disabled={this.state.canSearch ? "" : "disabled"}>
						Username: <input type="text" name="username" onChange={this.handleChange}/>
						<br />
						<button> Submit </button>
					</fieldset>
			 	</form>
			</div>
		)
	}	
	}
}

export default VideoSearch;