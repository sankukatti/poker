import { ICard } from "../card/card";
import { CardRank, CardSuit } from "../deck/deck";
import { sortBy } from "lodash";

export enum HandRanks {
    royalFlush = 1,
    straightFlush = 2,
    fourOfKind = 3,
    fullHouse = 4,
    flush = 5,
    straight = 6,
    threeOfKind = 7,
    twoPairs = 8,
    onePair = 9,
    nothing = 10,
    default = 100
}

export interface IHand {
    cards: Array<ICard>;
    rank: HandRanks;
    handCapacity: number;
    cardCountBySuit: {[suitIndexAsKey: number]: number};
    cardCountByRank: {[rankIndexAsKey: number]: number};
    highestRank: CardRank;
    setHand: (handValue: Array<ICard>) => void;
    getHand: () => Array<ICard>;
    addCard: (card: ICard) => void;
    setRank: () => void;
    getRank: () => HandRanks;
    resetHand: () => void;
    updateCardCountForSuiteAndRank: (card: ICard) => void;
}
export class Hand implements IHand {
    cards: Array<ICard>;
    rank: HandRanks;
    handCapacity: number;
    cardCountBySuit: {[suitIndexAsKey: number]: number};
    cardCountByRank: {[rankIndexAsKey: number]: number; };
    highestRank: CardRank;

    constructor(handCapacity: number) {
        this.cards = [];
        this.rank = HandRanks.default;
        this.handCapacity = handCapacity;
        this.cardCountBySuit = {
            [CardSuit.club]: 0,
            [CardSuit.diamond]: 0,
            [CardSuit.heart]: 0,
            [CardSuit.spade]: 0
        };
        this.cardCountByRank = {};
        this.highestRank = CardRank.A;
    }

    public setHand = (cards: Array<ICard>): void => {
        if (cards.length === this.handCapacity) {
            this.cards = cards;
            
            cards.forEach((card: ICard) => {
                this.updateCardCountForSuiteAndRank(card);
            });
        }
    }

    public addCard = (card: ICard): void => {
        if (this.cards.length < this.handCapacity) {
            this.cards.push(card);
            if (this.highestRank < card.rank) {
                this.highestRank = card.rank;
            }
            this.updateCardCountForSuiteAndRank(card);
        }
    }

    public getHand = (): Array<ICard> => {
        return this.cards;
    }

    public setRank = () => {
        //
    };

    public getRank = (): HandRanks => {
        return this.rank;
    };

    public resetHand = (): void => {
        this.cards = [];
    }

    updateCardCountForSuiteAndRank = (card: ICard): void => {
        ++ this.cardCountBySuit[card.suit];
        if (!this.cardCountByRank?.hasOwnProperty(card.rank)) {
            this.cardCountByRank[card.rank] = 0;
        }
        ++ this.cardCountByRank[card.rank];
    }
}


export class HandOf5 extends Hand implements IHand {
    sequence5 = false;
    sequence5SameSuit = false;
    isJAKQ10: {[key: number]: {[key: number | string]: boolean}} = {
        [CardSuit.club]: {
            13: false,
            12: false,
            11: false,
            10: false,
            1: false,
            haveAll: false
        },
        [CardSuit.diamond]: {
            13: false,
            12: false,
            11: false,
            10: false,
            1: false,
            haveAll: false
        },
        [CardSuit.heart]: {
            13: false,
            12: false,
            11: false,
            10: false,
            1: false,
            haveAll: false
        },
        [CardSuit.spade]: {
            13: false,
            12: false,
            11: false,
            10: false,
            1: false,
            haveAll: false
        }
    }
    constructor() {
        super(5);
    }
    public addCard = (card: ICard): void => {
        if (this.cards.length < this.handCapacity) {
            this.cards.push(card);
            if (this.highestRank < card.rank) {
                this.highestRank = card.rank;
            }
            this.updateCardCountForSuiteAndRank(card);
            this.analyzeAndCollectData(card);
        }
    }
    analyzeAndCollectData = (card: ICard) => {
        if (this.isJAKQ10[card.suit].hasOwnProperty(card.rank)) {
            this.isJAKQ10[card.suit][card.rank] = true;
        }

        if (this.cards.length === 5) {
            // Does have all same cards with AKQJ and 10?
            if (
                this.isJAKQ10[card.suit][CardRank.A] &&
                this.isJAKQ10[card.suit][CardRank.king] &&
                this.isJAKQ10[card.suit][CardRank.queen] &&
                this.isJAKQ10[card.suit][CardRank.jack] &&
                this.isJAKQ10[card.suit][CardRank.ten]
            ) {
                this.isJAKQ10[card.suit].haveAll = true;
                this.rank = HandRanks.royalFlush;
                return;
            }

            let allCards = this.cards.slice(0);
            allCards = sortBy(allCards, ['rank']);
            if (
                allCards[4].rank === (allCards[3].rank  + 1) &&
                allCards[3].rank === (allCards[2].rank  + 1) &&
                allCards[2].rank === (allCards[1].rank  + 1) &&
                allCards[1].rank === (allCards[0].rank  + 1)
            ) {
                if (
                    this.cardCountBySuit[CardSuit.club] === 5||
                    this.cardCountBySuit[CardSuit.diamond] === 5||
                    this.cardCountBySuit[CardSuit.heart] === 5||
                    this.cardCountBySuit[CardSuit.spade] === 5
                ) {
                    this.sequence5SameSuit = true;
                    this.rank = HandRanks.straightFlush;
                    return;
                } else {
                    this.sequence5 = true;
                    this.rank = HandRanks.straight;
                    return;
                }
            }

            let foundFourOfKind = false;
            let foundThreeOfKind = false;
            let foundTwoOfKind = false;
            let twoOfKindCount = 0;
            Object.keys(this.cardCountByRank).forEach((value) => {
                if (this.cardCountByRank[Number(value)] === 4) {
                    foundFourOfKind = true;
                }
                if (this.cardCountByRank[Number(value)] === 3) {
                    foundThreeOfKind = true;
                }
                if (this.cardCountByRank[Number(value)] === 2) {
                    foundTwoOfKind = true;
                    ++ twoOfKindCount;
                }
            });

            if (foundFourOfKind) {
                this.rank = HandRanks.fourOfKind;
                return;
            }

            if (foundThreeOfKind && foundTwoOfKind) {
                this.rank = HandRanks.fullHouse;
                return;
            }

            if (
                this.cardCountBySuit[CardSuit.club] === 5||
                this.cardCountBySuit[CardSuit.diamond] === 5||
                this.cardCountBySuit[CardSuit.heart] === 5||
                this.cardCountBySuit[CardSuit.spade] === 5
            ) {
                this.rank = HandRanks.flush;
                return;
            }

            if (foundThreeOfKind) {
                this.rank = HandRanks.threeOfKind;
                return;
            }

            if (twoOfKindCount === 2) {
                this.rank = HandRanks.twoPairs;
                return;
            }

            if (foundTwoOfKind) {
                this.rank = HandRanks.onePair;
                return;
            }
            this.rank = HandRanks.nothing;
        }
    }
}
