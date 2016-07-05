import React from "react";


var effectIconPaths = [
	"/dist/resources/icons/other/damage.png",
	"/dist/resources/icons/other/damage_bw.png",
	"/dist/resources/icons/other/health.png",
	"/dist/resources/icons/other/health_bw.png"
];

export default class EffectSelector extends React.Component {
	constructor(){
		super();
	}

	render(){
		return (
			<div className="wrapper-effect-select">
				<div
					className = "effect-button"
					onClick={this.props.setEffectDamage}>
					<div className="wrapper-effect-image">
						<img
							src={this.props.selectedEffect == 0 ? effectIconPaths[0] : effectIconPaths[1] }
							className="effect-button">
						</img>
					</div>
					<div
						className="effect-text"
						data-selected={this.props.selectedEffect == 0}>
						Damage
					</div>
				</div>
				<div
					className = "effect-button"
					onClick={this.props.setEffectSurvival}>
					<div className="wrapper-effect-image">
						<img
							src={this.props.selectedEffect == 1 ? effectIconPaths[2] : effectIconPaths[3] }
							className="effect-button">
						</img>
					</div>
					<div
						className="effect-text"
						data-selected={this.props.selectedEffect == 1}>
						Survival
					</div>
				</div>
			</div>
		);
	}
}