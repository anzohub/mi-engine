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

type Vector3Like = Readonly<Pick<Vector3, "x" | "y" | "z">>;

class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector3: Vector3Like): void {
    this.x += vector3.x;
    this.y += vector3.y;
    this.z += vector3.z;
  }
}

// const newVector = new Vector3(3, 2, 3);
// newVector.add(new Vector3(2, 2, 2));

// console.log(newVector);
