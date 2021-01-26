import React from 'react';
import './Video.css';
class Video extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let url = this.props.thumbnail.replace("%{width}", "180");
		url = url.replace("%{height}", "120");
		return (
			<div className="Video" onClick={() => this.props.handleClick(this.props.id)}>
				<img className="thumbnail" src={url} />
				<p className = "title"> {this.props.title} </p>
				<p className ="user_name"> {this.props.user_name} </p>
				<p className = "created_at"> {this.props.created} </p>
				<p className = "duration"> {this.props.duration} </p> 
			</div>
		)
	}
}

export default Video;