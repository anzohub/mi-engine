/*
 * Matrix4 — Initial Methods
 *
 * Initialization and Data Access
 * - constructor(): Creates a 4x4 identity matrix.
 * - identity(): Resets the matrix to the identity matrix.
 *
 * Copying
 * - copy(matrix): Copies another matrix's elements into this matrix.
 * - clone(): Creates a new matrix with the same elements.
 *
 * Matrix Operations
 * - multiply(matrix): Multiplies this matrix by another matrix (this = this * matrix).
 *
 * Transformations
 * - setTranslation(x, y, z): Sets the translation components without changing the other elements.
 *
 * Storage
 * - elements: Stores the 16 matrix elements in a Float32Array using column-major order.
 */

/**
 * Represents a read-only object exposing numeric elements compatible with a Matrix4.
 *
 * Allows matrix operations to read elements without requiring a Matrix4 instance.
 *
 * @remarks
 * This type defines a Matrix4-specific compatibility contract. A shared
 * deep-readonly utility can be considered if the same pattern becomes common
 * across multiple core types.
 */
export type Matrix4Like = Readonly<{
  elements: ArrayLike<number>;
}>;

/**
 * Represents a four-by-four matrix used to express three-dimensional transformations.
 *
 * The 16 elements are stored in a Float32Array using column-major order.
 * Methods that modify this matrix update its elements in place and return
 * `this`, allowing method chaining.
 *
 * Use `identity()` to reset the matrix to the identity matrix and `copy()`
 * to copy the elements of another compatible matrix.
 *
 * @example
 * const matrix = new Matrix4();
 *
 * // The matrix is initialized to the identity matrix.
 */
export class Matrix4 {
  /**
   * Stores the 16 matrix elements in column-major order.
   *
   * The property reference cannot be reassigned, but its elements remain mutable.
   */
  public readonly elements: Float32Array;

  /**
   * Creates a 4x4 identity matrix.
   */
  constructor() {
    this.elements = new Float32Array(16);
    this.identity();
  }

  /**
   * Resets this matrix to the identity matrix.
   *
   * @returns This matrix, allowing method chaining.
   */
  identity(): this {
    this.elements.fill(0);

    this.elements[0] = 1;
    this.elements[5] = 1;
    this.elements[10] = 1;
    this.elements[15] = 1;

    return this;
  }

  /**
   * Copies the elements of another matrix into this matrix.
   *
   * @param matrix4 - A matrix-compatible object containing exactly 16 elements.
   * @returns This matrix, allowing method chaining.
   * @throws {RangeError} If the source does not contain exactly 16 elements.
   *
   * @remarks
   * The source matrix is not modified. The existing elements array of this
   * matrix is preserved.
   */
  copy(matrix4: Matrix4Like): this {
    if (matrix4.elements.length !== this.elements.length) {
      throw new RangeError("Matrix4 source must contain exactly 16 elements.");
    }

    this.elements.set(matrix4.elements);

    return this;
  }
}
