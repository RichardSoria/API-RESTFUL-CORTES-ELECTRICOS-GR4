export default {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!node-fetch)',
    ],
    extensionsToTreatAsEsm: ['.js'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    }
  };

  module.exports = {
    testPathIgnorePatterns: [
      "/node_modules/",
      "/test/load-tests/" 
    ],
  };
  