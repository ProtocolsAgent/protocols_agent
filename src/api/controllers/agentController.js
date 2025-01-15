const agent = require('../../core/agent');
const { responseFormatter } = require('../../utils/responseFormatter');
const logger = require('../../utils/logger');

class AgentController {
    async chat(req, res) {
        try {
            const { message } = req.body;
            const userId = req.user?.id || 'anonymous';

            if (!message) {
                return res.status(400).json(
                    responseFormatter.error('Message is required')
                );
            }

            const response = await agent.processMessage(message, userId);
            
            return res.json(
                responseFormatter.success(response)
            );
        } catch (error) {
            logger.error('Chat error:', error);
            return res.status(500).json(
                responseFormatter.error('Internal server error')
            );
        }
    }
}

module.exports = new AgentController();
