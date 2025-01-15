const { OrcaProtocol } = require('../../protocols/orca/orcaProtocol');
const { RayProtocol } = require('../../protocols/ray/rayProtocol');
const { responseFormatter } = require('../../utils/responseFormatter');
const logger = require('../../utils/logger');

class ProtocolController {
    constructor() {
        this.orcaProtocol = new OrcaProtocol();
        this.rayProtocol = new RayProtocol();
    }

    async getOrcaInfo(req, res) {
        try {
            const { poolAddress } = req.query;
            const poolInfo = await this.orcaProtocol.getPoolInfo(poolAddress);
            
            return res.json(
                responseFormatter.success(poolInfo)
            );
        } catch (error) {
            logger.error('Orca info error:', error);
            return res.status(500).json(
                responseFormatter.error('Failed to fetch Orca information')
            );
        }
    }

    async getRayInfo(req, res) {
        try {
            const { marketAddress } = req.query;
            const marketInfo = await this.rayProtocol.getMarketInfo(marketAddress);
            
            return res.json(
                responseFormatter.success(marketInfo)
            );
        } catch (error) {
            logger.error('Ray info error:', error);
            return res.status(500).json(
                responseFormatter.error('Failed to fetch Raydium information')
            );
        }
    }
}

module.exports = new ProtocolController();
