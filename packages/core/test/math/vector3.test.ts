import { describe, expect, it } from "vite-plus/test";
import { Vector3 } from "../../src/math/vector3.ts";

describe("Vector3", () => {
  it("initializes components to zero by default", () => {
    const vector = new Vector3();

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(0);
  });

  it("initializes components with the provided values", () => {
    const vector = new Vector3(2, -3, 5);

    expect(vector.x).toBe(2);
    expect(vector.y).toBe(-3);
    expect(vector.z).toBe(5);
  });

  it("sets components to the provided values", () => {
    const vector = new Vector3(1, 2, 3);

    vector.set(4, -2, 7);

    expect(vector.x).toBe(4);
    expect(vector.y).toBe(-2);
    expect(vector.z).toBe(7);
  });

  it("returns the current vector instance", () => {
    const vector = new Vector3(1, 2, 3);
    const result = vector.set(4, -2, 7);

    expect(vector).toBe(result);
  });
});
