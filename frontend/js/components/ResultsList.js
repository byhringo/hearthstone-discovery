import React from "react";

var standardsets = [
	"CORE",
	"EXPERT1",
	"BRM",
	"TGT",
	"LOE",
	"OG"
];

var classNames = [
	"DRUID",
	"HUNTER",
	"MAGE",
	"PALADIN",
	"PRIEST",
	"ROGUE",
	"SHAMAN",
	"WARLOCK",
	"WARRIOR"
]

export default class ResultsList extends React.Component {
	constructor(){
		super();

		var request = new XMLHttpRequest();
		request.open("GET", "dist/cards.json", false);
		request.send(null)
		var cards = JSON.parse(request.responseText);
		
		var sortResults = (prop, asc)=>{
		    cards = cards.sort(function(a, b) {
		        if (asc) {
		            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		        } else {
		            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
		        }
		    });
		}

		sortResults('cost', true);

		this.state = {
			cards: cards,
		}
	}

	isValidInFormat(card){
		if(this.props.format == 0){
			return standardsets.indexOf(card.set) >= 0;
		}
		//Wild format
		return true;
	}

	isClassCard(card){
		return card.hasOwnProperty("playerClass");
	}

	isDiscoverableByClass(card){
		if(this.isClassCard(card)){
			return card.playerClass == classNames[this.props.class];
		}
		//Not bound by class
		return true;
	}

	isDiscoverableByCard(card){
		var validationFunctions = [
			this.isDiscoverableByALID,
			this.isDiscoverableByDP,
			this.isDiscoverableByEC,
			this.isDiscoverableByGA,
			this.isDiscoverableByJS,
			this.isDiscoverableByJB,
			this.isDiscoverableByMC,
			this.isDiscoverableByRIM,
			this.isDiscoverableByRIS,
			this.isDiscoverableByTS
		];

		return validationFunctions[this.props.discovery](card);
	}

	isDiscoverableByALID(card){
		return card.type == "MINION";
	}

	isDiscoverableByDP(card){
		return card.cost == 1;
	}
	
	isDiscoverableByEC(card){
		return card.type == "SPELL";
	}
	
	isDiscoverableByGA(card){
		return card.race == "MECHANICAL"
	}
	
	isDiscoverableByJS(card){
		return card.cost == 3;
	}
	
	isDiscoverableByJB(card){
		if(card.hasOwnProperty("mechanics")){
			return card.mechanics.indexOf("DEATHRATTLE") >= 0;
		}
		return false;
	}
	
	isDiscoverableByMC(card){
		if(card.hasOwnProperty("mechanics")){
			return card.mechanics.indexOf("DEATHRATTLE") >= 0;
		}
		return false;
	}
	
	isDiscoverableByRIM(card){
		return card.type == "MINION";
	}

	isDiscoverableByRIS(card){
		return card.type == "SPELL";
	}
	
	isDiscoverableByTS(card){
		return card.race == "BEAST";
	}

	isCastable(card){
		return Math.min(10, card.cost) <= this.props.mana;
	}

	notExcluded(card){
		return this.props.excluded.indexOf(card.id) == -1;
	}

	getImagePath(cardname){
		//Remove commas, colons, semicolons and apostrophes, make lower case and put underscores instead of spaces
		return "dist/resources/cards/" + cardname.split(/[,':;]/).join("").split(" ").join("_").toLowerCase() + ".png";
	}

	createCard(card){
		return (<img
					key={"result_card_" + card.id}
					src={this.getImagePath(card.name)}
					className="results-card-button"
					>
				</img>);
	}

	//Courtesy of: https://www.reddit.com/r/hearthstone/comments/3tc2qm/discover_probabilities_cheat_sheet/
	markovNeutral(C, N){
		return 1/(4*C+N)+(N-1)/(4*C+N)/(4*C+N-1)+(N-1)*(N-2)/(4*C+N)/(4*C+N-1)/(4*C+N-2)+(N-1)*4*C/(4*C+N)/(4*C+N-1)/(4*C+N-5)+4*C/(4*C+N)/(4*C+N-4)+4*C*(N-1)/(4*C+N)/(4*C+N-4)/(4*C+N-5)+(4*C)*(4*C-4)/(4*C+N)/(4*C+N-4)/(4*C+N-8);
	}

	markovClass(C, N){
		return 4/(4*C+N)+4*N/(4*C+N)/(4*C+N-1)+4*(4*C-4)/(4*C+N)/(4*C+N-4)+4*N*(N-1)/(4*C+N)/(4*C+N-1)/(4*C+N-2)+4*N*(4*C-4)/(4*C+N)/(4*C+N-1)/(4*C+N-5)+4*N*(4*C-4)/(4*C+N)/(4*C+N-4)/(4*C+N-5)+4*(4*C-4)*(4*C-8)/(4*C+N)/(4*C+N-4)/(4*C+N-8);
	}

	render(){
		var resultsInfo;
		var discoverablecards = [];

		//We should show some results
		if(this.props.class != -1 && this.props.discovery != -1){
			var discoverableAll = 0;
			var discoverableClassCards = 0;
			var castableAll = 0;
			var castableClassCards = 0;

			//Add all the results to our list
			for(var i = 0; i < this.state.cards.length; i++){
				var c = this.state.cards[i];

				if(this.isValidInFormat(c) && this.isDiscoverableByClass(c) && this.isDiscoverableByCard(c)){
					discoverableAll++;
					if(this.isClassCard(c)){
						discoverableClassCards++;
					}

					if(this.isCastable(c) && this.notExcluded(c)){
						castableAll++;
						if(this.isClassCard(c)){
							castableClassCards++;
						}
						discoverablecards.push(this.createCard(c));
					}
				}
			}

			//Class cards have a 4x chance of showing up. add 3 fake copies for each class card to get real percentages
			var adjustedDiscoverable = discoverableAll + (3 * discoverableClassCards);
			var adjustedCastable = castableAll + (3 * castableClassCards);

			var percentSingle = Math.round(this.markovNeutral(discoverableClassCards, discoverableAll - discoverableClassCards)*10000)/100;
			var percentSingleClass = Math.round(this.markovClass(discoverableClassCards, discoverableAll - discoverableClassCards)*10000)/100;
			var percentAll = percentSingle * (castableAll - castableClassCards) + percentSingleClass * castableClassCards;
			//var percentSingle = this.wnhb(0.25, 3, discoverableClassCards, discoverableAll);
			//var percentSingleClass = this.wnhb(4, 3, discoverableClassCards, discoverableAll);

			var resultsInfo;
			//Create the info-text
			if(discoverablecards.length > 0){
				var singleCardPercentages;
			
				var resultsSingleBoth = (<p>You have a <span className="redtext">{percentSingle}%</span> chance of getting a specific one of them. <span className="redtext">{percentSingleClass}%</span> for class-cards.</p>);
				var resultsSingleNoNeutral = (<p>You have a <span className="redtext">{percentSingleClass}%</span> chance of getting a specific one of them.</p>);
				var resultsSingleNoClass = (<p>You have a <span className="redtext">{percentSingle}%</span> chance of getting a specific one of them.</p>);

				var resultsSingle;

				if(discoverableAll == discoverableClassCards){
					resultsSingle = resultsSingleNoNeutral;
				}
				else if(discoverableClassCards == 0){
					resultsSingle = resultsSingleNoClass;
				}
				else{
					resultsSingle = resultsSingleBoth;
				}


				resultsInfo = (
					<div className="results-info">
						<p>You have a <span className="redtext">{percentAll}%</span> chance of getting one of these cards.</p>
						{resultsSingle}
						<p><span className="redtext">Click</span> the cards that don't help you win.</p>
					</div>);
			}
			else {
				resultsInfo = (
					<div className="results-info">
						<p>I'm afraid there's nothing here.</p>
					</div>);
			}
		}

		return (
			<div className="wrapper-results">
				{/*resultsInfo  removed until I figure out how to calculate the percentages correctly*/}
				<div className="results-cards">
					{discoverablecards}
				</div>
			</div>
		);
	}
}