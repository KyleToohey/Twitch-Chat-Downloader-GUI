import React from 'react';
import './Comment.css';

class Comment extends React.Component {
	constructor(props) {
		super(props);
	}

	convertTime(time) {
		time = Math.floor(time);
		let hours = Math.floor(time / 3600);
		if (hours < 10) {
			hours = "0" + hours;
		}
		time %= 3600;
		let minutes = Math.floor(time / 60);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		time %= 60;
		let seconds = time;
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		let output = hours + ":" + minutes + ":" + seconds;
		return output;
	}

	render() {
		return (
			<div className="Comment">
				<p className="time"> {this.convertTime(this.props.time)} </p>
				<p className="username" style={{color: this.props.user_color}}> {this.props.username} : </p>
				<p className="message"> {this.props.message}</p>			
			</div>
		)
	}
}

//
export default Comment;