const { Market } = require('@project-serum/serum');
const { SolanaService } = require('../../services/blockchain/solanaService');
const logger = require('../../utils/logger');

class RayProtocol {
    constructor() {
        this.solanaService = new SolanaService();
    }

    async getMarketInfo(marketAddress) {
        try {
            const market = await Market.load(
                this.solanaService.connection,
                marketAddress,
                {},
                this.solanaService.programId
            );

            const bids = await market.loadBids(this.solanaService.connection);
            const asks = await market.loadAsks(this.solanaService.connection);

            return {
                baseMint: market.baseMintAddress.toString(),
                quoteMint: market.quoteMintAddress.toString(),
                bids: bids.getL2(20),
                asks: asks.getL2(20)
            };
        } catch (error) {
            logger.error('Error getting Raydium market info:', error);
            throw error;
        }
    }

    async getLiquidityPool(poolAddress) {
        try {
            // Implementation for getting Raydium liquidity pool info
            return {
                // Pool information
            };
        } catch (error) {
            logger.error('Error getting Raydium liquidity pool:', error);
            throw error;
        }
    }
}

module.exports = { RayProtocol };
