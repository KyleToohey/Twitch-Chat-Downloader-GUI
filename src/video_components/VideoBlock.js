import React from 'react'
import Video from './Video';

class VideoBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: [[],[],[],[],[]]}
	}

	componentDidMount() {
		this.props.list.forEach((video, index) =>  this.state.data[index % 5].push(video));
		this.forceUpdate();
	}

	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<td>
								{this.state.data[0]}
							</td>
							<td>
								{this.state.data[1]}
							</td>
							<td>
								{this.state.data[2]}
							</td>
							<td>
								{this.state.data[3]}
							</td>
							<td>
								{this.state.data[4]}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default VideoBlock;