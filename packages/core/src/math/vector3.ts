/*
 * Vector3 — Initial Methods
 *
 * Initialization and Assignment
 * - constructor(x = 0, y = 0, z = 0): Creates a vector with the given components.
 * - set(x, y, z): Sets the components from numeric values.
 * - copy(vector3): Sets the components from a vector-like object.
 * - clone(): Creates a new vector with the same components.
 *
 * Arithmetic Operations
 * - add(vector): Adds another vector to this vector.
 * - subtract(vector): Subtracts another vector from this vector.
 * - multiplyScalar(scalar): Multiplies each component by a scalar.
 * - divideScalar(scalar): Divides each component by a scalar.
 *
 * Vector Products
 * - dot(vector): Calculates the dot product of this vector and another vector.
 * - cross(vector): Calculates the cross product of this vector and another vector.
 *
 * Magnitude and Normalization
 * - length(): Returns the vector's magnitude.
 * - lengthSquared(): Returns the square of the vector's magnitude.
 * - normalize(): Scales the vector to have a magnitude of one.
 *
 * Distance
 * - distanceTo(vector): Returns the distance between this vector and another vector.
 * - distanceToSquared(vector): Returns the squared distance between two vectors.
 *
 * Comparison and Interpolation
 * - equals(vector): Checks whether this vector has the same components as another vector.
 * - lerp(vector, alpha): Interpolates between this vector and another vector by the given factor.
 */

export type Vector3Like = Readonly<Pick<Vector3, "x" | "y" | "z">>;

/**
 * Represents a three-component vector used for positions, directions, scales,
 * and other values in 3D space.
 *
 * Methods that modify its components update the current instance and return
 * `this`, allowing calls to be chained.
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
}

// const newVector = new Vector3(6, 2, 6);
// newVector.divideScalar(0);

// console.log(newVector);
