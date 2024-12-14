module.exports = {
  moduleNameMapper: {
    "^../services/api$": "<rootDir>/src/__mocks__/api.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
