import React from "react";

var formatIconPaths = [
	"/dist/resources/icons/formats/format_standard_kraken.png",
	"/dist/resources/icons/formats/format_standard_kraken_bw.png",
	"/dist/resources/icons/formats/format_wild.png",
	"/dist/resources/icons/formats/format_wild_bw.png"
];

export default class FormatSelector extends React.Component {
	constructor(){
		super();
	}

	render(){
		return (
			<div className="wrapper-format-select">
				<input
					type="image"
					src={this.props.selectedFormat == 0 ? formatIconPaths[0] : formatIconPaths[1] }
					className="format-button"
					onClick={this.props.setFormatStandard}
					>
				</input>
				<input
					type="image"
					src={this.props.selectedFormat == 1 ? formatIconPaths[2] : formatIconPaths[3] }
					className="format-button"
					onClick={this.props.setFormatWild}
					>
				</input>
			</div>
		);
	}
}