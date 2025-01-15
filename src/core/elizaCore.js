class ElizaCore {
    constructor() {
        this.keywords = [
            { word: 'defi', weight: 10 },
            { word: 'swap', weight: 9 },
            { word: 'liquidity', weight: 8 },
            { word: 'protocol', weight: 7 },
            { word: 'price', weight: 6 }
        ];
        
        this.responses = {
            defi: [
                "Let's explore the DeFi opportunities on Solana.",
                "I can help you understand various DeFi protocols.",
                "What specific DeFi service are you interested in?"
            ],
            swap: [
                "Would you like to know about swap rates?",
                "I can help you understand the trading pairs.",
                "Let me check the current swap conditions."
            ],
            default: [
                "Could you tell me more about what you're looking to do?",
                "How can I help you with Solana DeFi today?",
                "Would you like to know about specific protocols?"
            ]
        };
    }

    processInput(input) {
        const tokens = input.toLowerCase().split(' ');
        let highestWeight = 0;
        let bestMatch = 'default';

        for (const token of tokens) {
            for (const keyword of this.keywords) {
                if (token.includes(keyword.word) && keyword.weight > highestWeight) {
                    highestWeight = keyword.weight;
                    bestMatch = keyword.word;
                }
            }
        }

        const possibleResponses = this.responses[bestMatch] || this.responses.default;
        return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    }
}

module.exports = { ElizaCore };
