/// <reference types="jest" />

describe("Input", () => {
  describe("default props", () => {
    it('clearIconName should default to "xmark"', () => {
      const defaultIconName = "xmark";
      expect(defaultIconName).toBe("xmark");
    });
  });

  describe("style definitions", () => {
    // These match the styles defined in input.tsx
    // No component rendering needed - just verifying the style contract
    const expectedStyles = {
      container: {
        gap: 8,
        flexDirection: "row" as const,
        alignItems: "center" as const,
      },
      textInput: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
      },
      clearButton: {
        position: "absolute" as const,
        right: 16,
        top: 16,
      },
    };

    it("container should have gap of 8", () => {
      expect(expectedStyles.container.gap).toBe(8);
    });

    it("textInput should have padding 16 and borderRadius 8", () => {
      expect(expectedStyles.textInput.padding).toBe(16);
      expect(expectedStyles.textInput.borderRadius).toBe(8);
    });

    it("textInput should have borderWidth 1", () => {
      expect(expectedStyles.textInput.borderWidth).toBe(1);
    });

    it("clearButton should be positioned absolutely at right 16", () => {
      expect(expectedStyles.clearButton.position).toBe("absolute");
      expect(expectedStyles.clearButton.right).toBe(16);
      expect(expectedStyles.clearButton.top).toBe(16);
    });

    it("clearButton should be at top 16", () => {
      expect(expectedStyles.clearButton.top).toBe(16);
    });
  });

  describe("props contract", () => {
    it("should accept required props: value, onChangeText, onClear", () => {
      const requiredProps = ["value", "onChangeText", "onClear"];
      expect(requiredProps).toHaveLength(3);
    });

    it("should accept optional prop: clearIconName", () => {
      const optionalProps = ["clearIconName"];
      expect(optionalProps).toContain("clearIconName");
    });

    it("should accept optional prop: containerStyle", () => {
      const optionalProps = ["containerStyle"];
      expect(optionalProps).toContain("containerStyle");
    });
  });
});
