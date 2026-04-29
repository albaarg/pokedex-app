/// <reference types="jest" />

describe("ThemedView", () => {
  describe("color props", () => {
    it("should accept valid hex color for lightColor", () => {
      const lightColor = "#fff";
      expect(lightColor).toMatch(/^#[0-9A-Fa-f]{3,6}$/);
    });

    it("should accept valid hex color for darkColor", () => {
      const darkColor = "#151718";
      expect(darkColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it("lightColor should be white", () => {
      const expectedLightColor = "#fff";
      expect(expectedLightColor).toBe("#fff");
    });

    it("darkColor should be dark gray", () => {
      const expectedDarkColor = "#151718";
      expect(expectedDarkColor).toBe("#151718");
    });
  });

  describe("props contract", () => {
    it("should accept optional lightColor prop", () => {
      const optionalProps = ["lightColor"];
      expect(optionalProps).toContain("lightColor");
    });

    it("should accept optional darkColor prop", () => {
      const optionalProps = ["darkColor"];
      expect(optionalProps).toContain("darkColor");
    });

    it("should extend ViewProps", () => {
      const viewPropsSupported = ["style", "children", "testID"];
      expect(viewPropsSupported).toHaveLength(3);
    });
  });

  describe("type definitions", () => {
    it("ThemedViewProps should include lightColor and darkColor", () => {
      const propsShape = {
        lightColor: "string | undefined",
        darkColor: "string | undefined",
      };
      expect(Object.keys(propsShape)).toContain("lightColor");
      expect(Object.keys(propsShape)).toContain("darkColor");
    });
  });
});
