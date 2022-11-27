import { Player } from "../player/player";
import { Deck } from "./deck"

describe('Poker Deck', () => {
    it ('Should initialize', () => {
        const deck = new Deck();
        expect(deck.cards.length).toBe(52);
        expect(deck.getCards().length).toBe(52);
    });

    it ('Should throw error if more no of players', async () => {
        const player1 = new Player('p1');
        const player2 = new Player('p1');
        const player3 = new Player('p1');
        const player4 = new Player('p1');
        const player5 = new Player('p1');
        const player6 = new Player('p1');
        const player7 = new Player('p1');
        const player8 = new Player('p1');
        const player9 = new Player('p1');
        const player10 = new Player('p1');
        const player11 = new Player('p1');
        const deck = new Deck();

        try {
            await deck.deal([
                player1,player2, player3, player4,player5,player6,player7,player8,player9, player10, player11
            ], 5);
            expect(false).toBe(true);
        } catch(e) {
            expect(e['message']).toBe('Too many players')
        }
    })
})