/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Cover all first-party runtime code so untested files are visible in the
  // report rather than hidden. Excluded: type-only decls, the test suite
  // itself, the episode dialogue data (scripts/ — data, not code under test),
  // and the client (a separate Vite app that needs its own test runner).
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.d.ts',
    '!**/__tests__/**',
    '!**/dist/**',
    '!packages/scripts/**',
    '!apps/web/**',
  ],
  coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
  // The covered packages are held at 100%; `npm test` fails if that regresses.
  coverageThreshold: {
    global: {statements: 100, branches: 100, functions: 100, lines: 100},
  },
};
