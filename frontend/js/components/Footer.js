import React from "react";

export default class FormatSelector extends React.Component {
	constructor(){
		super();
	}

	render(){
		return (
			<div className="footer">
				<p>Created by Øyvind Byhring</p>
				<p>See any mistakes? <a href="mailto:oyvindbyhring@gmail.com">Email me!</a></p>
				<p>Code available on <a href="https://github.com/byhringo/hearthstone-discovery" target="_blank">Github</a></p>
			</div>
		);
	}
}