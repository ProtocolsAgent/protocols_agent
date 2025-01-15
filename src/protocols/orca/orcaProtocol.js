const { PublicKey } = require('@solana/web3.js');
const { getOrca } = require('@orca-so/sdk');
const { SolanaService } = require('../../services/blockchain/solanaService');
const logger = require('../../utils/logger');

class OrcaProtocol {
    constructor() {
        this.solanaService = new SolanaService();
        this.orca = getOrca(this.solanaService.connection);
    }

    async getPoolInfo(poolAddress) {
        try {
            const pool = await this.orca.getPool(new PublicKey(poolAddress));
            const poolData = await pool.getAccountInfo();
            
            return {
                liquidity: poolData.liquidity.toString(),
                tokenABalance: poolData.tokenABalance.toString(),
                tokenBBalance: poolData.tokenBBalance.toString(),
                fees: poolData.fees
            };
        } catch (error) {
            logger.error('Error getting Orca pool info:', error);
            throw error;
        }
    }

    async getSwapQuote(params) {
        try {
            const { inputToken, outputToken, amount } = params;
            const pool = await this.orca.getPool(inputToken, outputToken);
            const quote = await pool.getQuote(amount);
            
            return {
                expectedOutputAmount: quote.getExpectedOutputAmount(),
                minimumOutputAmount: quote.getMinOutputAmount(),
                fee: quote.getFee()
            };
        } catch (error) {
            logger.error('Error getting Orca swap quote:', error);
            throw error;
        }
    }
}

module.exports = { OrcaProtocol };
