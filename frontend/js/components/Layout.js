import React from "react";

import FormatSelector from "./FormatSelector.js";
import ClassSelector from "./ClassSelector.js";
import DiscoverSelector from "./DiscoverSelector.js";
//Not currently in use
//import EffectSelector from "./EffectSelector.js";
import ManaSelector from "./ManaSelector.js";
import ResultsList from "./ResultsList.js";

export default class Layout extends React.Component {
	constructor(){
		super();
		this.state={
			format:0,
			class:-1,
			discovery:-1,
			effect:-1,
			mana:10,
			excluded: []
		};
	}

	setFormat(newFormat){
		this.setState({format: newFormat, excluded: []});
	}

	setClass(newClass){
		this.setState({class: newClass, excluded: []});
	}

	setDiscoverCard(newCard){
		this.setState({discovery: newCard, excluded: []});
	}
/* Currently not in use
	setEffect(newEffect){
		this.setState({effect: newEffect});
	}
*/
	setMana(newMana){
		this.setState({mana: newMana, excluded: []});
	}

	excludeCard(id){
		var ex = this.state.excluded;
		ex.push(id);
		this.setState({excluded: ex});
	}

	render(){
		return (
			<div className="wrapper-all">
				<FormatSelector 
					selectedFormat={this.state.format}
					setFormatStandard={this.setFormat.bind(this, 0)}
					setFormatWild={this.setFormat.bind(this, 1)}
				/>
				<div className="question-label">Who are you?</div>
				<ClassSelector 
					selectedClass={this.state.class}
					setClass={this.setClass}
					layoutObj={this}
				/>
				<div className="question-label">How are you discovering?</div>
				<DiscoverSelector 
					selectedDiscoverCard={this.state.discovery}
					setDiscoverCard={this.setDiscoverCard}
					layoutObj={this}
				/>
				<div className="question-label">How much mana can you use?</div>
				<ManaSelector 
					selectedMana={this.state.mana}
					setManaCrystals={this.setMana}
					layoutObj={this}
				/>
				<ResultsList 
					format={this.state.format}
					class={this.state.class}
					discovery={this.state.discovery}
					mana={this.state.mana}
					excluded={this.state.excluded}
					layoutObj={this}
					excludeCard={this.excludeCard}
				/>
			</div>
		);
	}
}