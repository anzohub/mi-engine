import { describe, expect, it } from "vite-plus/test";
import { Matrix4 } from "../../src/math/matrix4.ts";

describe("constructor", () => {
  it("creates a Float32Array with 16 elements", () => {
    const matrix = new Matrix4();

    expect(matrix.elements).toBeInstanceOf(Float32Array);
    expect(matrix.elements.length).toBe(16);
  });

  it("initializes the matrix to the identity matrix", () => {
    const matrix = new Matrix4();

    // oxfmt-ignore
    const expected = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    expect(matrix.elements).toEqual(expected);
  });
});

describe("identity()", () => {
  it("resets the matrix to the identity matrix", () => {
    const matrix = new Matrix4();

    matrix.elements.fill(2);
    matrix.identity();

    // oxfmt-ignore
    const expected = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    expect(matrix.elements).toEqual(expected);
  });

  it("returns the current matrix instance", () => {
    const matrix = new Matrix4();
    const result = matrix.identity();

    expect(matrix).toBe(result);
  });
});

describe("copy()", () => {
  it("copies all elements from another matrix", () => {
    // TODO
  });

  it("accepts a matrix-like object", () => {
    // TODO
  });

  it("does not modify the source matrix", () => {
    // TODO
  });

  it("preserves the existing elements array", () => {
    // TODO
  });

  it("returns the current matrix instance", () => {
    // TODO
  });
});

describe("clone()", () => {
  it("creates an independent copy with the same elements", () => {
    // TODO
  });

  it("does not modify the original when the clone is changed", () => {
    // TODO
  });
});

describe("multiply()", () => {
  it("leaves the matrix unchanged when multiplied by the identity matrix", () => {
    // TODO
  });

  it("produces the other matrix when the identity matrix is multiplied by it", () => {
    // TODO
  });

  it("multiplies two matrices using the correct multiplication order", () => {
    // TODO
  });

  it("handles multiplication with the same matrix instance", () => {
    // TODO
  });

  it("modifies the current matrix in place", () => {
    // TODO
  });

  it("returns the current matrix instance", () => {
    // TODO
  });
});

describe("setTranslation()", () => {
  it("sets the translation components to the provided values", () => {
    // TODO
  });

  it("replaces the existing translation components", () => {
    // TODO
  });

  it("preserves the other matrix elements", () => {
    // TODO
  });

  it("preserves the homogeneous component", () => {
    // TODO
  });

  it("accepts negative translation values", () => {
    // TODO
  });

  it("returns the current matrix instance", () => {
    // TODO
  });
});
