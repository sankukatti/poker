import { ICard } from '../card/card';
import { IHand } from '../hand/hand';

export interface IPlayer {
    name: string;
    hand: IHand | null;
    setHand: (handValue: IHand) => void;
    getHand: () => IHand | null;
    addCard: (card: ICard) => void;
    discardHand: () => void;
}

export class Player implements IPlayer {
    name: string;
    hand: IHand | null;

    constructor(name: string) {
        this.name = name;
        this.hand = null;
    }

    setHand = (handValue: IHand): void => {
        this.hand = handValue;
    }

    addCard = (card: ICard): void => {
        this.hand?.addCard(card);
    }

    getHand = (): IHand | null => {
        return this.hand;
    }

    discardHand = (): void => {
        this.hand = null;
    }
}