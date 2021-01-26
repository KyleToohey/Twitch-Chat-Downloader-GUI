import React from 'react';
import Comment from './Comment';

class CommentList extends React.Component {
	constructor() {
		super()
	}

	render() {
		const output = this.props.data.map((d, index) => {
				return <Comment username={d['username']} time={d['time']} message={d['message']} user_color={d['user_color']} key={index} />;
		})
		return (
			<div>
				{output}
			</div>
		)
	}

}

//



export default CommentList;