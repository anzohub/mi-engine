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
    this.identity();
  }

  identity(): this {
    this.elements.fill(0);

    this.elements[0] = 1;
    this.elements[5] = 1;
    this.elements[10] = 1;
    this.elements[15] = 1;

    return this;
  }
}

// const matrix4 = new Matrix4();

// const rows = Array.from({ length: 4 }, (_rowValue, row) =>
//   Array.from({ length: 4 }, (_columnValue, column) => matrix4.elements[column * 4 + row]),
// );

// console.table(rows);
