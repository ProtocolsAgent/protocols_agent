module.exports = {
    mockPoolData: {
        poolAddress: 'test-pool-address',
        liquidity: '1000000',
        tokenABalance: '500000',
        tokenBBalance: '500000',
        fees: {
            tradeFee: 0.003,
            withdrawFee: 0.001
        }
    },
    mockMarketData: {
        marketAddress: 'test-market-address',
        baseMint: 'SOL',
        quoteMint: 'USDC',
        currentPrice: '100.50'
    },
    mockUserData: {
        id: 'test-user-id',
        preferences: {
            defaultProtocol: 'orca',
            riskLevel: 'moderate'
        }
    }
};

// tests/helpers/testSetup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

module.exports = {
    setupTestDB: async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
    },

    closeTestDB: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    }
};
