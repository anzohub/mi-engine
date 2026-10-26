import { describe, expect, it } from "vite-plus/test";
import { Vector3 } from "../../src/math/vector3.ts";

describe("Vector3", () => {
  it("initializes components to zero by default", () => {
    const vector = new Vector3();

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(0);
  });
});
