import "@testing-library/jest-native/extend-expect";

jest.mock("expo-constants", () => ({ expoConfig: { name: "test" } }));
jest.mock("expo-image", () => ({ Image: "Image" }));
jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));
jest.mock("expo-splash-screen", () => ({
  hideAsync: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}));
jest.mock("expo-haptics", () => ({ impactAsync: jest.fn() }));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

jest.mock("react-native-toast-message", () => ({
  __esModule: true,
  default: () => null,
}));
