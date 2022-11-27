import { HandOf5 } from "./hand"

export abstract class HandGenerator {
    static getHand = (noCardsInHand: number) => {
        return new HandOf5();
    }
}
