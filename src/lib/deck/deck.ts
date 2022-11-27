import { ICard } from "../card/card";
import { CardGenerator } from "../card/cardGenerator";
import { HandGenerator } from "../hand/handGenerator";
import { IPlayer } from "../player/player";

export enum CardSuit {
    diamond = 1,
    club = 2,
    heart = 3,
    spade = 4
}

export enum CardRank {
    A = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9,
    ten = 10,
    jack = 11,
    queen = 12,
    king = 13
}
export interface IDeck {
    cards: ICard[];
    shuffle: (noOfShuffles: number) => void;
    getCards: () => ICard[];
    deal: (players: IPlayer[], cardsPerHand: number) => void; 
}
export class Deck implements IDeck{
    cards: Array<ICard>;

    constructor() {
        this.cards = [];
        for(let i = 1; i <= 13; i++) {
            const cardDiamond = CardGenerator.getCard(CardSuit.diamond, i);
            const cardClub = CardGenerator.getCard(CardSuit.club, i);
            const cardHeart = CardGenerator.getCard(CardSuit.heart, i);
            const cardSpade = CardGenerator.getCard(CardSuit.spade, i);

            this.cards.push(cardDiamond);
            this.cards.push(cardClub);
            this.cards.push(cardHeart);
            this.cards.push(cardSpade);
        }
    }

    public shuffle = (noOfShuffles: number) => {
        const basicShuffle = (cards: ICard[]): ICard[] => {
            for (let i = 0; i < (noOfShuffles | 5); i ++) {
                // SomeThing between 5 and 50
                const shuffleIndex = Math.floor((Math.random() * 40) + 5);
                const cardsPart1: ICard[] = cards.slice(0, shuffleIndex);
                const cardsPart2: ICard[] = cards.slice(shuffleIndex);
                cards = cardsPart2.concat(cardsPart1);
            }
            return cards;
        }
        const advancedShuffle = (cards: ICard[]): ICard[] => {
            const cardsPart1: ICard[] = cards.slice(0, cards.length/2);
            const cardsPart2: ICard[] = cards.slice(cards.length/2);
            const advancedShuffledCards = [];
            for (let i = 0; i <= (cards.length/2 + 1); i ++) {
                if (cardsPart1[i]) {
                    advancedShuffledCards.push(cardsPart1[i]);
                }
                if (cardsPart2[i]) {
                    advancedShuffledCards.push(cardsPart2[i]);
                }
            }
            return advancedShuffledCards;
        }
        if (this.cards && this.cards.length) {
            let shuffledCards: Array<ICard> = this.cards;
            shuffledCards = basicShuffle(shuffledCards);
            shuffledCards = advancedShuffle(shuffledCards)
            shuffledCards = basicShuffle(shuffledCards);
            this.cards = shuffledCards;

        }
    }

    public getCards = (): Array<ICard> => {
        return this.cards;
    }

    public deal(players: IPlayer[], cardsPerHand: number) {
        const noOfPlayers = players.length;
        if (
            noOfPlayers > 0 &&
            (noOfPlayers * cardsPerHand) <= this.cards.length
        ) {
            for (let cardsDealt = 0; cardsDealt < cardsPerHand; cardsDealt++) {
                for (let playerIndex = 0; playerIndex < noOfPlayers; playerIndex++ ) {
                    if (players[playerIndex].hand === null) {
                        players[playerIndex].hand = HandGenerator.getHand(cardsPerHand);
                    }
                    
                    players[playerIndex].addCard(this.cards[
                        // Arithmetic progression
                        playerIndex + (noOfPlayers * cardsDealt)
                    ]);
                }
            }
        } else {
            throw new Error('Too many players');
        }
    }
}
