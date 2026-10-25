/**
 * Represents a read-only object with x, y, and z components compatible with a Vector3.
 *
 * Allows methods to accept vector-like objects without requiring a Vector3 instance.
 */
export type Vector3Like = Readonly<Pick<Vector3, "x" | "y" | "z">>;

/**
 * Represents a three-dimensional vector with x, y, and z components.
 *
 * Vectors can represent positions, directions, scales, displacements,
 * and other three-dimensional values, depending on the context.
 *
 * Methods that modify this vector update its components in place and return
 * `this`, allowing method chaining. Methods that calculate measurements or
 * compare values return their result without modifying this vector.
 *
 * Use `clone()` to create an independent copy when you need to preserve
 * the original vector before applying modifying operations.
 *
 * @example
 * const position = new Vector3(1, 2, 3);
 * const offset = new Vector3(0, 0, -5);
 *
 * position.add(offset);
 * // position is now (1, 2, -2)
 *
 * const distance = position.length();
 */
export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  /**
   * Creates a vector from its components, which default to zero.
   *
   * @param x - The x component.
   * @param y - The y component.
   * @param z - The z component.
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /** Sets this vector's components from numeric values.
   *
   * @param x - The x component.
   * @param y - The y component.
   * @param z - The z component.
   * @returns This vector, allowing method chaining.
   */
  set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /** Copies the components from a vector-like object into this vector.
   *
   * @param vector3 - An object with numeric x, y, and z components.
   * @returns This vector, allowing method chaining.
   * @remarks The object does not need to be a Vector3 instance.
   */
  copy(vector3: Vector3Like): this {
    this.x = vector3.x;
    this.y = vector3.y;
    this.z = vector3.z;

    return this;
  }

  /** Creates an independent vector with the same components as this one.
   *
   * @returns A new vector with the same x, y, and z components.
   */
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /** Adds another vector to this one, modifying its components.
   *
   * @param vector3 - The vector to add.
   * @returns This vector, allowing method chaining.
   */
  add(vector3: Vector3Like): this {
    this.x += vector3.x;
    this.y += vector3.y;
    this.z += vector3.z;

    return this;
  }

  /** Subtracts another vector from this one, modifying its components.
   *
   * @param vector3 - The vector to subtract.
   * @returns This vector, allowing method chaining.
   */
  subtract(vector3: Vector3Like): this {
    this.x -= vector3.x;
    this.y -= vector3.y;
    this.z -= vector3.z;

    return this;
  }

  /** Multiplies each component by a scalar, modifying this vector.
   *
   * @param scalar - The factor applied to each component.
   * @returns This vector, allowing method chaining.
   */
  multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;
  }

  /**
   * Divides each component of this vector by a scalar, modifying this vector.
   *
   * @param scalar - The divisor applied to each component.
   * @returns This vector, allowing method chaining.
   *
   * @remarks
   * A zero divisor is not handled specially. The resulting components follow
   * JavaScript's numeric arithmetic and may be `NaN` or infinite.
   */
  divideScalar(scalar: number): this {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;

    return this;
  }

  /**
   * Computes the dot product of this vector and another vector.
   *
   * @param vector3 - The vector to calculate the dot product with.
   * @returns The dot product of the two vectors.
   */
  dot(vector3: Vector3Like): number {
    const x = this.x * vector3.x;
    const y = this.y * vector3.y;
    const z = this.z * vector3.z;

    return x + y + z;
  }

  /**
   * Computes the cross product of this vector and another vector, updating this vector with the result.
   *
   * @param vector3 - The vector to calculate the cross product with.
   * @returns This vector, allowing method chaining.
   */
  cross(vector3: Vector3Like): this {
    const x = this.y * vector3.z - this.z * vector3.y;
    const y = this.z * vector3.x - this.x * vector3.z;
    const z = this.x * vector3.y - this.y * vector3.x;

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /**
   * Calculates the magnitude of this vector.
   *
   * @returns The length of this vector.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Calculates the squared magnitude of this vector.
   *
   * @returns The squared length of this vector.
   */
  lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Normalizes this vector to unit length.
   *
   * If this vector has zero length, it remains unchanged.
   *
   * @returns This vector, allowing method chaining.
   */
  normalize(): this {
    const length = this.length();

    if (length === 0) return this;

    return this.divideScalar(length);
  }

  /**
   * Calculates the distance between this vector and another vector.
   *
   * @param vector3 - The vector to measure the distance to.
   * @returns The distance between the two vectors.
   */
  distanceTo(vector3: Vector3Like): number {
    return Math.sqrt(this.distanceToSquared(vector3));
  }

  /**
   * Calculates the squared distance between this vector and another vector.
   *
   * @param vector3 - The vector to calculate the squared distance to.
   * @returns The squared distance between the two vectors.
   */
  distanceToSquared(vector3: Vector3Like): number {
    const x = vector3.x - this.x;
    const y = vector3.y - this.y;
    const z = vector3.z - this.z;

    return x * x + y * y + z * z;
  }

  /**
   * Checks whether this vector has the same components as another vector.
   *
   * @param vector3 - The vector to compare with.
   * @returns `true` if all components are equal; otherwise, `false`.
   */
  equals(vector3: Vector3Like): boolean {
    return this.x === vector3.x && this.y === vector3.y && this.z === vector3.z;
  }

  /**
   * Linearly interpolates this vector toward another vector.
   *
   * @param vector3 - The target vector.
   * @param alpha - The interpolation factor, typically between 0 and 1.
   *                0 keeps this vector unchanged; 1 sets it to the target.
   *                Values outside this range extrapolate beyond the target.
   * @returns This vector, allowing method chaining.
   */
  lerp(vector3: Vector3Like, alpha: number): this {
    this.x += (vector3.x - this.x) * alpha;
    this.y += (vector3.y - this.y) * alpha;
    this.z += (vector3.z - this.z) * alpha;

    return this;
  }
}
