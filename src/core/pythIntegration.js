const { Client } = require('@pythnetwork/client');
const { Connection } = require('@solana/web3.js');
const logger = require('../utils/logger');

class PythIntegration {
    constructor() {
        this.connection = new Connection(process.env.SOLANA_RPC_URL);
        this.pythClient = new Client(this.connection);
        this.priceFeeds = new Map();
    }

    async initialize() {
        try {
            await this.pythClient.start();
            logger.info('Pyth client initialized successfully');
        } catch (error) {
            logger.error('Failed to initialize Pyth client:', error);
            throw error;
        }
    }

    async getPrice(symbol) {
        try {
            const priceFeed = this.priceFeeds.get(symbol) || 
                            await this.pythClient.getPriceFeed(symbol);
            
            const price = await priceFeed.getPrice();
            return {
                price: price.price,
                confidence: price.confidence,
                timestamp: price.publishTime
            };
        } catch (error) {
            logger.error(`Failed to get price for ${symbol}:`, error);
            throw error;
        }
    }

    async subscribeToPriceFeed(symbol, callback) {
        try {
            const priceFeed = await this.pythClient.getPriceFeed(symbol);
            priceFeed.onPrice(callback);
            this.priceFeeds.set(symbol, priceFeed);
        } catch (error) {
            logger.error(`Failed to subscribe to price feed for ${symbol}:`, error);
            throw error;
        }
    }
}

module.exports = { PythIntegration };
