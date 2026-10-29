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

export class Matrix4 {
  public readonly elements: Float32Array;

  constructor() {
    this.elements = new Float32Array(16);
  }
}

// const matrix4 = new Matrix4();

// console.log(matrix4);
