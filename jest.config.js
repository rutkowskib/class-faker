/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 30000,
    collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
    coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
    collectCoverage: true,
};
