module.exports = {
  projects: [
    {
      displayName: "lib",
      testMatch: ["<rootDir>/src/lib/__tests__/**/*.test.ts"],
      testEnvironment: "node",
      preset: "ts-jest",
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
    {
      displayName: "hooks",
      testMatch: ["<rootDir>/src/hooks/__tests__/**/*.test.ts"],
      preset: "jest-expo",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.components.ts"],
      transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*)",
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
    {
      displayName: "components",
      testMatch: [
        "<rootDir>/src/components/**/__tests__/**/*.test.ts?(x)",
        "<rootDir>/src/features/**/__tests__/**/*.test.ts?(x)",
      ],
      preset: "jest-expo",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.components.ts"],
      transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*)",
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  ],
  // Coverage config at root level — uses jest-expo transform for all files
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/__tests__/**",
  ],
  coverageProvider: "v8",
};