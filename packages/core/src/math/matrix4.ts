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
 * Represents a read-only view of a Matrix4-compatible data source.
 *
 * Allows matrix operations to read elements without requiring a Matrix4 instance.
 *
 * @remarks
 * The source must contain exactly 16 numeric elements in column-major order.
 * The caller is responsible for providing a valid matrix.
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
 * Use `identity()` to reset the matrix to the identity matrix,
 * `copy()` to copy another matrix and `clone()` to create an independent copy.
 *
 * @example
 * const matrix = new Matrix4();
 *
 * // The matrix is initialized to the identity matrix.
 */
export class Matrix4 implements Matrix4Like {
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
   *
   * @remarks
   * The source matrix is not modified. The existing elements array of this
   * matrix is preserved.
   */
  copy(matrix4: Matrix4Like): this {
    this.elements.set(matrix4.elements);

    return this;
  }

  /**
   * Creates a new matrix with the same elements as this matrix.
   *
   * @returns A new independent matrix.
   */
  clone(): Matrix4 {
    return new Matrix4().copy(this);
  }

  /**
   * Multiplies this matrix by another 4x4 matrix (this = this * matrix4).
   *
   * @param matrix4 - A matrix-compatible object containing exactly 16 elements.
   * @returns This matrix, allowing method chaining.
   *
   * @remarks
   * This operation updates this matrix in place.
   * The input elements are cached before writing the result, allowing
   * multiplication with the same matrix instance.
   */
  // Intentionally unrolled to keep the fixed-size 4x4 operation explicit.
  // oxlint-disable-next-line max-lines-per-function
  multiply(matrix4: Matrix4Like): this {
    const a11 = this.elements[0]!;
    const a12 = this.elements[4]!;
    const a13 = this.elements[8]!;
    const a14 = this.elements[12]!;

    const a21 = this.elements[1]!;
    const a22 = this.elements[5]!;
    const a23 = this.elements[9]!;
    const a24 = this.elements[13]!;

    const a31 = this.elements[2]!;
    const a32 = this.elements[6]!;
    const a33 = this.elements[10]!;
    const a34 = this.elements[14]!;

    const a41 = this.elements[3]!;
    const a42 = this.elements[7]!;
    const a43 = this.elements[11]!;
    const a44 = this.elements[15]!;

    const b11 = matrix4.elements[0]!;
    const b12 = matrix4.elements[4]!;
    const b13 = matrix4.elements[8]!;
    const b14 = matrix4.elements[12]!;

    const b21 = matrix4.elements[1]!;
    const b22 = matrix4.elements[5]!;
    const b23 = matrix4.elements[9]!;
    const b24 = matrix4.elements[13]!;

    const b31 = matrix4.elements[2]!;
    const b32 = matrix4.elements[6]!;
    const b33 = matrix4.elements[10]!;
    const b34 = matrix4.elements[14]!;

    const b41 = matrix4.elements[3]!;
    const b42 = matrix4.elements[7]!;
    const b43 = matrix4.elements[11]!;
    const b44 = matrix4.elements[15]!;

    const c11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    const c12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    const c13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    const c14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    const c21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    const c22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    const c23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    const c24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    const c31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    const c32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    const c33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    const c34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    const c41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    const c42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    const c43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    const c44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    this.elements[0] = c11;
    this.elements[1] = c21;
    this.elements[2] = c31;
    this.elements[3] = c41;

    this.elements[4] = c12;
    this.elements[5] = c22;
    this.elements[6] = c32;
    this.elements[7] = c42;

    this.elements[8] = c13;
    this.elements[9] = c23;
    this.elements[10] = c33;
    this.elements[11] = c43;

    this.elements[12] = c14;
    this.elements[13] = c24;
    this.elements[14] = c34;
    this.elements[15] = c44;

    return this;
  }

  /**
   * Sets the translation components of this matrix.
   *
   * @param x - The x translation.
   * @param y - The y translation.
   * @param z - The z translation.
   * @returns This matrix, allowing method chaining.
   *
   * @remarks
   * Only the translation components are modified. The remaining elements
   * are preserved.
   */
  setTranslation(x: number, y: number, z: number): this {
    this.elements[12] = x;
    this.elements[13] = y;
    this.elements[14] = z;

    return this;
  }
}
