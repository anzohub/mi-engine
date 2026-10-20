/*
 * Vector3 — Initial Methods
 *
 * Initialization and Copying
 * - constructor(x = 0, y = 0, z = 0): Creates a vector with the given components.
 * - set(x, y, z): Sets the vector's components.
 * - copy(vector): Copies another vector's components into this vector.
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

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector3: Vector3Like): this {
    this.x += vector3.x;
    this.y += vector3.y;
    this.z += vector3.z;

    return this;
  }

  subtract(vector3: Vector3Like): this {
    this.x -= vector3.x;
    this.y -= vector3.y;
    this.z -= vector3.z;

    return this;
  }

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
