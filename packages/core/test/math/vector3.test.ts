// This test suite is intentionally kept in a single file because it covers the cohesive public API of Vector3.
// Splitting it solely to satisfy the line limit would make related tests harder to find.
/* oxlint-disable max-lines */

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

  it("accepts a vector-like object", () => {
    const source = { x: 4, y: -2, z: 7 };
    const target = new Vector3();

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

describe("add()", () => {
  it("adds another vector to this vector", () => {
    const vector = new Vector3(4, -2, 7);
    const vectorToAdd = new Vector3(1, 2, 3);

    vector.add(vectorToAdd);

    expect(vector.x).toBe(5);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(10);
  });
});

describe("subtract()", () => {
  it("subtracts another vector from this vector", () => {
    const vector = new Vector3(4, -2, 7);
    const vectorToSubtract = new Vector3(1, 2, 3);

    vector.subtract(vectorToSubtract);

    expect(vector.x).toBe(3);
    expect(vector.y).toBe(-4);
    expect(vector.z).toBe(4);
  });
});

describe("multiplyScalar()", () => {
  it("multiplies each component by the scalar", () => {
    const vector = new Vector3(4, -2, 7);

    vector.multiplyScalar(-2);

    expect(vector.x).toBe(-8);
    expect(vector.y).toBe(4);
    expect(vector.z).toBe(-14);
  });
});

describe("divideScalar()", () => {
  it("divides each component by the scalar", () => {
    const vector = new Vector3(4, -2, 8);

    vector.divideScalar(2);

    expect(vector.x).toBe(2);
    expect(vector.y).toBe(-1);
    expect(vector.z).toBe(4);
  });

  it("follows JavaScript numeric behavior when dividing by zero", () => {
    const vector = new Vector3(0, -2, 4);

    vector.divideScalar(0);

    expect(vector.x).toBeNaN();
    expect(vector.y).toBe(-Infinity);
    expect(vector.z).toBe(Infinity);
  });
});

describe("dot()", () => {
  it("calculates the dot product of two vectors", () => {
    const vector = new Vector3(1, 2, 3);
    const otherVector = new Vector3(4, 5, 6);

    expect(vector.dot(otherVector)).toBe(32);
  });

  it("returns zero for perpendicular vectors", () => {
    const vector = new Vector3(1, 0, 0);
    const otherVector = new Vector3(0, 1, 0);

    expect(vector.dot(otherVector)).toBe(0);
  });

  it("returns a negative value for vectors pointing in opposite directions", () => {
    const vector = new Vector3(1, 0, 0);
    const otherVector = new Vector3(-1, 0, 0);

    expect(vector.dot(otherVector)).toBe(-1);
  });
});

describe("cross()", () => {
  it("calculates the cross product of two perpendicular vectors", () => {
    const vector = new Vector3(1, 0, 0);
    const otherVector = new Vector3(0, 1, 0);

    vector.cross(otherVector);

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(1);
  });

  it("reverses the result direction when the operand order is reversed", () => {
    const vector = new Vector3(0, 1, 0);
    const otherVector = new Vector3(1, 0, 0);

    vector.cross(otherVector);

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(-1);
  });

  it("returns the zero vector when crossed with itself", () => {
    const vector = new Vector3(1, 2, 3);

    vector.cross(vector);

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(0);
  });
});

describe("length()", () => {
  it("calculates the magnitude of the vector", () => {
    const vector = new Vector3(-3, 4, 12);

    expect(vector.length()).toBe(13);
  });
});

describe("lengthSquared()", () => {
  it("calculates the squared magnitude of the vector", () => {
    const vector = new Vector3(-3, 4, 12);

    expect(vector.lengthSquared()).toBe(169);
  });
});

describe("normalize()", () => {
  it("normalizes the vector to unit length", () => {
    const vector = new Vector3(3, 4, 0);

    vector.normalize();

    expect(vector.x).toBeCloseTo(0.6);
    expect(vector.y).toBeCloseTo(0.8);
    expect(vector.z).toBe(0);
    expect(vector.length()).toBeCloseTo(1);
  });

  it("leaves the zero vector unchanged", () => {
    const vector = new Vector3();

    vector.normalize();

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(0);
  });
});

describe("distanceTo()", () => {
  it("calculates the distance between two vectors", () => {
    const vector = new Vector3(1, 2, 3);
    const target = new Vector3(4, 6, 3);

    expect(vector.distanceTo(target)).toBe(5);
  });

  it("does not modify either vector", () => {
    const vector = new Vector3(1, 2, 3);
    const target = new Vector3(4, 6, 3);

    vector.distanceTo(target);

    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);

    expect(target.x).toBe(4);
    expect(target.y).toBe(6);
    expect(target.z).toBe(3);
  });
});

describe("distanceToSquared()", () => {
  it("calculates the squared distance between two vectors", () => {
    const vector = new Vector3(1, 2, 3);
    const target = new Vector3(4, 6, 3);

    expect(vector.distanceToSquared(target)).toBe(25);
  });
});

describe("equals()", () => {
  it("returns true when all components are equal", () => {
    const vector = new Vector3(1, 2, 3);
    const otherVector = new Vector3(1, 2, 3);

    expect(vector.equals(otherVector)).toBe(true);
  });

  it("returns false when any component differs", () => {
    const vector = new Vector3(1, 2, 3);
    const otherVector = new Vector3(1, 2, 3.0000001);

    expect(vector.equals(otherVector)).toBe(false);
  });
});

describe("lerp()", () => {
  it("keeps this vector unchanged when alpha is zero", () => {
    const vector = new Vector3(2, 0, 0);
    const target = new Vector3(10, 4, 0);

    vector.lerp(target, 0);

    expect(vector.x).toBe(2);
    expect(vector.y).toBe(0);
    expect(vector.z).toBe(0);
  });

  it("moves halfway toward the target when alpha is 0.5", () => {
    const vector = new Vector3(2, 0, 0);
    const target = new Vector3(10, 4, 0);

    vector.lerp(target, 0.5);

    expect(vector.x).toBe(6);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(0);
  });

  it("reaches the target when alpha is one", () => {
    const vector = new Vector3(2, 0, 0);
    const target = new Vector3(10, 4, 0);

    vector.lerp(target, 1);

    expect(vector.x).toBe(10);
    expect(vector.y).toBe(4);
    expect(vector.z).toBe(0);
  });

  it("extrapolates beyond the target when alpha exceeds one", () => {
    const vector = new Vector3(2, 0, 0);
    const target = new Vector3(10, 4, 0);

    vector.lerp(target, 1.5);

    expect(vector.x).toBe(14);
    expect(vector.y).toBe(6);
    expect(vector.z).toBe(0);
  });
});
