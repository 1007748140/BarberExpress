module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^Modules/(.*)$': '<rootDir>/src/modules/$1',
    },
  };