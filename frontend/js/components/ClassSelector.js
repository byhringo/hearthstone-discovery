import React from "react";

var classIconPaths = [
	"/dist/resources/icons/classes/druid.png",
	"/dist/resources/icons/classes/druid_bw.png",
	"/dist/resources/icons/classes/hunter.png",
	"/dist/resources/icons/classes/hunter_bw.png",
	"/dist/resources/icons/classes/mage.png",
	"/dist/resources/icons/classes/mage_bw.png",
	"/dist/resources/icons/classes/paladin.png",
	"/dist/resources/icons/classes/paladin_bw.png",
	"/dist/resources/icons/classes/priest.png",
	"/dist/resources/icons/classes/priest_bw.png",
	"/dist/resources/icons/classes/rogue.png",
	"/dist/resources/icons/classes/rogue_bw.png",
	"/dist/resources/icons/classes/shaman.png",
	"/dist/resources/icons/classes/shaman_bw.png",
	"/dist/resources/icons/classes/warlock.png",
	"/dist/resources/icons/classes/warlock_bw.png",
	"/dist/resources/icons/classes/warrior.png",
	"/dist/resources/icons/classes/warrior_bw.png"
];

export default class ClassSelector extends React.Component {
	constructor(){
		super();
	}

	createClassButton(classID){
		return (<input
					key={"class_btn_" + classID}
					type="image"
					src={this.props.selectedClass == classID ? classIconPaths[classID*2] : classIconPaths[(classID*2) + 1] }
					className="class-button"
					onClick={this.props.setClass.bind(this.props.layoutObj, classID)}
					>
				</input>);
	}

	render(){
		var classButtons = [];

		for(var i = 0; i < classIconPaths.length/2; i++){
			classButtons.push(this.createClassButton(i));
		}

		return (
			<div className="wrapper-class-select">
				{classButtons}
			</div>
		);
	}
}