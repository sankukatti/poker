import { CardRank, CardSuit } from "../deck/deck";
import { Card, ICard } from "./card";

export abstract class CardGenerator {
    static getCard  = (cardSuit: CardSuit, cardRank: CardRank, cardType = null): ICard => {
        return new Card(cardSuit, cardRank);
    }
}