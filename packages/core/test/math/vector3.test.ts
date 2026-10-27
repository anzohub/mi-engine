import { describe, expect, it } from "vite-plus/test";
import { Vector3 } from "../../src/math/vector3.ts";

describe("constructor", () => {
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
});

describe("set()", () => {
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

describe("copy()", () => {
  it("copies components from another vector", () => {
    const source = new Vector3(4, -2, 7);
    const target = new Vector3(1, 2, 3);

    target.copy(source);

    expect(target.x).toBe(4);
    expect(target.y).toBe(-2);
    expect(target.z).toBe(7);
  });
});

describe("clone()", () => {
  it("creates an independent copy with the same components", () => {
    const original = new Vector3(4, -2, 7);
    const clone = original.clone();

    expect(original).not.toBe(clone);

    expect(clone.x).toBe(4);
    expect(clone.y).toBe(-2);
    expect(clone.z).toBe(7);
  });

  it("does not modify the original when the clone is changed", () => {
    const original = new Vector3(4, -2, 7);
    const clone = original.clone();

    clone.set(1, 2, 3);

    expect(original.x).toBe(4);
    expect(original.y).toBe(-2);
    expect(original.z).toBe(7);
  });
});
