import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import CommentList from './chat_components/CommentList';
import SearchList from './video_components/SearchList';
import VideoSearch from './ui_components/VideoSearch';
import ChatSearch from './ui_components/ChatSearch';

import data from './client_info.json'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {onDownloadPage: true, canSwitch: true};
		this.toggleChangePageButton = this.toggleChangePageButton.bind(this);
	}

	toggleChangePageButton() {
		this.setState({canSwitch: !this.state.canSwitch})
		this.forceUpdate();
	}

	render() {
		if (this.state.onDownloadPage) {
			return (
				<div>
					<fieldset disabled={this.state.canSwitch ? "" : "disabled"} >
						<button onClick={(e) => {e.preventDefault(); this.setState({onDownloadPage: false});}}> View Downloaded Videos </button>
					</fieldset>
					<VideoSearch client_id={data.id} client_token={data.token} toggleChangePageButton={this.toggleChangePageButton}/>
				</div>
			) 
		}
		else {
			return (
				<div>
					<button onClick={(e) => {e.preventDefault(); this.setState({onDownloadPage: true});}}> Download Videos </button>
					<ChatSearch client_id={data.id} client_token={data.token}/>
				</div>
			)
		}
	}
}

//
ReactDOM.render( 
	<App />,
  document.getElementById('root')
);