import { CardRank, CardSuit } from "../deck/deck";

export interface ICard {
    suit: CardSuit;
    rank: CardRank;
}

export class Card implements ICard{
    suit: CardSuit;
    rank: CardRank;

    constructor(suit: number, rank: CardRank) {
        this.suit = suit;
        this.rank = rank;
    }
}
