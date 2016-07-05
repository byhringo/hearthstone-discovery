import React from "react";

var cardImagePaths = [
	"/dist/resources/cards/a_light_in_the_darkness.png",
	"/dist/resources/cards/a_light_in_the_darkness_bw.png",
	"/dist/resources/cards/dark_peddler.png",
	"/dist/resources/cards/dark_peddler_bw.png",
	"/dist/resources/cards/ethereal_conjurer.png",
	"/dist/resources/cards/ethereal_conjurer_bw.png",
	"/dist/resources/cards/gorillabot_a-3.png",
	"/dist/resources/cards/gorillabot_a-3_bw.png",
	"/dist/resources/cards/jeweled_scarab.png",
	"/dist/resources/cards/jeweled_scarab_bw.png",
	"/dist/resources/cards/journey_below.png",
	"/dist/resources/cards/journey_below_bw.png",
	"/dist/resources/cards/museum_curator.png",
	"/dist/resources/cards/museum_curator_bw.png",
	"/dist/resources/cards/raven_idol_minion.png",
	"/dist/resources/cards/raven_idol_minion_bw.png",
	"/dist/resources/cards/raven_idol_spell.png",
	"/dist/resources/cards/raven_idol_spell_bw.png",
	"/dist/resources/cards/tomb_spider.png",
	"/dist/resources/cards/tomb_spider_bw.png"
];

export default class DiscoverSelector extends React.Component {
	constructor(){
		super();
	}

	createCardButton(cardID){
		return (<input
					key={"discover_card_btn_" + cardID}
					type="image"
					src={this.props.selectedDiscoverCard == cardID ? cardImagePaths[cardID*2] : cardImagePaths[(cardID*2) + 1] }
					className="discover-card-button"
					onClick={this.props.setDiscoverCard.bind(this.props.layoutObj, cardID)}
					>
				</input>);
	}

	render(){
		var classButtons = [];

		for(var i = 0; i < cardImagePaths.length/2; i++){
			classButtons.push(this.createCardButton(i));
		}

		return (
			<div className="wrapper-discover-card-select">
				{classButtons}
			</div>
		);
	}
}