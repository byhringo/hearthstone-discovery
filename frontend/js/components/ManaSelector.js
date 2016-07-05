import React from "react";

var manaIconsPath = "dist/resources/icons/manacrystals/";
var manaIconsprefix = ".png"

export default class ManaSelector extends React.Component {
	constructor(){
		super();
	}

	getFilename(crystalNumber, active){
		return active ? (manaIconsPath + crystalNumber + manaIconsprefix) : (manaIconsPath + crystalNumber + "_bw" + manaIconsprefix);
	}

	createManaButton(crystalNumber){
		return (<input
					key={"manacrystal_btn_" + crystalNumber}
					type="image"
					src={this.props.selectedMana >= crystalNumber ? this.getFilename(crystalNumber, true) : this.getFilename(crystalNumber, false) }
					className="class-button"
					onClick={this.props.setManaCrystals.bind(this.props.layoutObj, crystalNumber)}
					>
				</input>);
	}

	render(){
		var manaCrystalButtons = [];

		for(var i = 0; i < 11; i++){
			manaCrystalButtons.push(this.createManaButton(i));
		}

		return (
			<div className="wrapper-mana-select">
				{manaCrystalButtons}
			</div>
		);
	}
}