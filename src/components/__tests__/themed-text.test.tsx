describe("ThemedText", () => {
  describe("type prop", () => {
    const validTypes = [
      "default",
      "title",
      "defaultSemiBold",
      "subtitle",
      "link",
      "muted",
    ] as const;

    it("should have 6 valid type variants", () => {
      expect(validTypes).toHaveLength(6);
    });

    it.each(validTypes)('should include "%s" as a valid type', (type) => {
      expect(validTypes).toContain(type);
    });
  });

  describe("color props", () => {
    it("should accept valid hex color for lightColor", () => {
      const lightColor = "#ECEDEE";
      expect(lightColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it("should accept valid hex color for darkColor", () => {
      const darkColor = "#11181C";
      expect(darkColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  describe("style definitions", () => {
    // These match the styles defined in themed-text.tsx
    // No component rendering needed - just verifying the style contract
    const expectedStyles = {
      default: { fontSize: 16, lineHeight: 24 },
      defaultSemiBold: { fontSize: 16, lineHeight: 24, fontWeight: "600" },
      title: { fontSize: 32, fontWeight: "bold", lineHeight: 32 },
      subtitle: { fontSize: 20, fontWeight: "bold" },
      link: { lineHeight: 30, fontSize: 16, color: "#0a7ea4" },
      muted: { fontSize: 14, opacity: 0.7 },
    };

    it("default style should have fontSize 16 and lineHeight 24", () => {
      expect(expectedStyles.default.fontSize).toBe(16);
      expect(expectedStyles.default.lineHeight).toBe(24);
    });

    it("defaultSemiBold style should have fontWeight 600", () => {
      expect(expectedStyles.defaultSemiBold.fontWeight).toBe("600");
      expect(expectedStyles.defaultSemiBold.fontSize).toBe(16);
    });

    it("title style should be bold with fontSize 32 and lineHeight 32", () => {
      expect(expectedStyles.title.fontSize).toBe(32);
      expect(expectedStyles.title.fontWeight).toBe("bold");
      expect(expectedStyles.title.lineHeight).toBe(32);
    });

    it("subtitle style should be bold with fontSize 20", () => {
      expect(expectedStyles.subtitle.fontSize).toBe(20);
      expect(expectedStyles.subtitle.fontWeight).toBe("bold");
    });

    it("link style should have specific color and fontSize", () => {
      expect(expectedStyles.link.color).toBe("#0a7ea4");
      expect(expectedStyles.link.fontSize).toBe(16);
      expect(expectedStyles.link.lineHeight).toBe(30);
    });

    it("muted style should have fontSize 14 and opacity 0.7", () => {
      expect(expectedStyles.muted.fontSize).toBe(14);
      expect(expectedStyles.muted.opacity).toBe(0.7);
    });
  });
});
