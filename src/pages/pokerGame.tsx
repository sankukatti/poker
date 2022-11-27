import * as React from "react";
import { ICard } from "../lib/card/card";
import { CardSuit, IDeck, Deck, CardRank } from "../lib/deck/deck";
import { HandRanks } from "../lib/hand/hand";
import { IPlayer, Player } from "../lib/player/player";
import './pokerGame.scss';

interface IPokerState {
    deck: IDeck;
    players: IPlayer[];
    winner: IPlayer | null;
}

export class Poker extends React.Component<{}, IPokerState> {
	private noOfPlayers = 5;

	constructor(props: {}) {
        super(props);
		const deck = new Deck();
        const players: IPlayer[] = []
        for (let i = 0; i < this.noOfPlayers; i ++) {
            const player = new Player('P' + (i + 1));
            players.push(player);
        }
        this.state = {deck, players, winner: null};
	}

    render(): React.ReactNode {
        return (
            <div className="game">
                <div className="deck">
                    {
                        this.state.deck.cards.map((card: ICard, index: number) => 
                            <div className="card" key={index} style={{
                                marginLeft: index > 25 ? 40*(index-26) : 40*index,
                                marginTop: index > 25 ? 160 : 0
                            }}>
                                {
                                    this.getCardShapeIconBySuite(card.suit)
                                }
                                <br></br>
                                {this.getCardRankToShow(card.rank)}
                            </div>
                        )
                    }
                    <button className="shuffle-button" onClick={() => this.deal()}>Deal</button>
                    {/* <button className="shuffle-button" onClick={() => this.shuffle()}>Shuffle</button> */}
                    
                </div>
                <div className="players">
                    {
                        this.state.players.map((player: IPlayer, index: number) => 
                            <div className="player" key={index}>
                                Name - {player.name} &nbsp;
                                {player === this.state.winner ? <span className="winner">WINNER</span> : ''}
                                <div className="player-cards">{
                                    player.hand?.getHand().map((card: ICard, index: number) => 
                                    <div className="card" key={index} style={{
                                        marginLeft: 40*index
                                    }}>
                                        {
                                            this.getCardShapeIconBySuite(card.suit)
                                        }
                                        <br></br>
                                        {this.getCardRankToShow(card.rank)}
                                    </div>
                                )
                                }</div>
                                {
                                    player.hand &&
                                    <div className="player-hand-details">
                                        <p>{
                                        'Rank is ' + this.getPlayerGameRankToShow(player.hand?.rank)
                                        }</p>
                                        <p>{
                                            ' Highest rank is ' + this.getCardRankToShow(player.hand?.highestRank)
                                        }</p>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    getCardShapeIconBySuite = (cardSuite: CardSuit): string => {
        let icon = "";
        switch (cardSuite) {
            case CardSuit.club:
                icon = "♣";
                break;
            case CardSuit.diamond:
                icon = "♦";
                break;
            case CardSuit.heart:
                icon = "♥";
                break;
            case CardSuit.spade:
                icon = "♠";
                break;
        }
        return icon;
    }

    getCardRankToShow = (cardRank: number): string => {
        let rankValue = '';
        switch(cardRank) {
            case 13:
                rankValue = 'K';
                break;
            case 12:
                rankValue = 'Q';
                break;
            case 11:
                rankValue = 'J';
                break;
            case 1:
                rankValue = 'A';
                break;
            default:
                rankValue = cardRank + '';
                break;
        }
        return rankValue;
    }

    getPlayerGameRankToShow = (playerRank: number): string => {
        let gameRankToDisplay = 'Nothing';
        switch(playerRank) {
            case 1: gameRankToDisplay = 'Royal Flush'; break;
            case 2: gameRankToDisplay = 'Straight Flush'; break;
            case 3: gameRankToDisplay = 'Four of a Kind'; break;
            case 4: gameRankToDisplay = 'Full House'; break;
            case 5: gameRankToDisplay = 'Flush'; break;
            case 6: gameRankToDisplay = 'Straight'; break;
            case 7: gameRankToDisplay = 'Three of a Kind'; break;
            case 8: gameRankToDisplay = 'Two Pairs'; break;
            case 9: gameRankToDisplay = 'One Pair'; break;
        }
        return gameRankToDisplay;
    }

    shuffle = () => {
        const deck = this.state.deck;
        deck.shuffle(200);
        this.setState({deck});
    }

    deal = () => {
        const deck = this.state.deck;
        deck.shuffle(53000);
        const players = this.state.players.slice(0);
        players.forEach((players: IPlayer) => {
            players.discardHand();
        });
        deck.deal(players, 5);
        this.setState({deck, players}, () => {
            this.findWinner();
        });
    }

    findWinner = () => {
        const winners = this.state.players.reduce((winners: IPlayer[], player: IPlayer) => {
            if (player.hand?.rank) {
                if (!winners.length) {
                    winners.push(player);
                } else {
                    if (
                        winners[winners.length - 1].hand?.rank &&
                        winners[winners.length - 1].hand?.rank > player.hand.rank
                    ) {
                        winners = [player];
                    } else if (winners[winners.length - 1].hand?.rank === player.hand.rank) {
                        winners.push(player);
                    }
                }
            }
            return winners;
        }, []);
        if (winners.length === 1) {
            this.setState({
                winner: winners[0]
            });
        } else {
            winners.reduce((winner: IPlayer | null, player: IPlayer) => {
                if (!winner) {
                    winner = player;
                } else {
                    if (winner.hand?.highestRank < player.hand?.highestRank) {
                        winner = player;
                    }
                }
                return winner;
            }, null)
        }

    }
}
