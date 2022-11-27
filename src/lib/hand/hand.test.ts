import { CardGenerator } from "../card/cardGenerator";
import { CardRank, CardSuit } from "../deck/deck";
import { HandRanks } from "./hand";
import { HandGenerator } from "./handGenerator";

describe('Testing Hand functionalities', () => {
	it('Should not take more than 5 cards', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.king);
		const card2 = CardGenerator.getCard(CardSuit.club, CardRank.queen);
		const card3 = CardGenerator.getCard(CardSuit.club, CardRank.jack);
		const card4 = CardGenerator.getCard(CardSuit.club, CardRank.ten);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.A);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		hand.addCard(card5);
		expect(hand.cards.length).toBe(5);

	});
	it('Should be able to detect Royal Flush', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.king);
		const card2 = CardGenerator.getCard(CardSuit.club, CardRank.queen);
		const card3 = CardGenerator.getCard(CardSuit.club, CardRank.jack);
		const card4 = CardGenerator.getCard(CardSuit.club, CardRank.ten);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.A);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.royalFlush);
	});

	it('Should be able to detect Straight flush', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.club, CardRank.three);
		const card3 = CardGenerator.getCard(CardSuit.club, CardRank.two);
		const card4 = CardGenerator.getCard(CardSuit.club, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.straightFlush);
	});

	it('Should be able to detect Four of a Kind', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.five);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.five);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.five);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.A);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.fourOfKind);
	});

	it('Should be able to detect Full House', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.five);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.five);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.four);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.fullHouse);
	});

	it('Should be able to detect Flush', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.club, CardRank.king);
		const card3 = CardGenerator.getCard(CardSuit.club, CardRank.eight);
		const card4 = CardGenerator.getCard(CardSuit.club, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.flush);
	});

	it('Should be able to detect Straight', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.three);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.two);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.straight);
	});

	it('Should be able to detect Three of a Kind', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.five);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.five);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.threeOfKind);
	});

	it('Should be able to detect Two Pairs', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.five);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.four);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.twoPairs);
	});

	it('Should be able to detect One Pair', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.five);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.three);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.onePair);
	});

	it('Should be able to detect Nothing', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.A);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.nine);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.four);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.six);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);
		hand.addCard(card4);
		hand.addCard(card5);
		expect(hand.rank).toBe(HandRanks.nothing);
	});

	it('Should be able to detect Highest Rank', () => {
		const card1 = CardGenerator.getCard(CardSuit.club, CardRank.five);
		const card2 = CardGenerator.getCard(CardSuit.diamond, CardRank.A);
		const card3 = CardGenerator.getCard(CardSuit.heart, CardRank.queen);
		const card4 = CardGenerator.getCard(CardSuit.spade, CardRank.jack);
		const card5 = CardGenerator.getCard(CardSuit.club, CardRank.king);

		const hand = HandGenerator.getHand(5);

		hand.addCard(card1);
		expect(hand.highestRank).toBe(CardRank.five);
		hand.addCard(card2);
		expect(hand.highestRank).toBe(CardRank.five);
		hand.addCard(card3);
		expect(hand.highestRank).toBe(CardRank.queen);
		hand.addCard(card4);
		expect(hand.highestRank).toBe(CardRank.queen);
		hand.addCard(card5);
		expect(hand.highestRank).toBe(CardRank.king);
	});
});


