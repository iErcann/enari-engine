import * as THREE from "three";
import Ammo from "ammojs-typed";
import { AmmoInstance } from "../Physics/Ammo";

export class Vector2D extends THREE.Vector2 {
  public static ZERO: Vector2D = new Vector2D(0, 0);
  constructor(x?: number, y?: number) {
    super(x, y);
  }
}

export class Vector3D extends THREE.Vector3 {
  public static ZERO(): Vector3D {
    return new Vector3D(0, 0, 0);
  }
  constructor(x?: number, y?: number, z?: number) {
    super(x, y, z);
  }
  public toAmmo(): Ammo.btVector3 {
    return new AmmoInstance!.btVector3(this.x, this.y, this.z);
  }
  static fromAmmo(vec3: Ammo.btVector3): Vector3D {
    return new Vector3D(vec3.x(), vec3.y(), vec3.z());
  }
  public fuzzyZero(): boolean {
    return (
      Math.abs(this.x) < 0.01 &&
      Math.abs(this.y) < 0.01 &&
      Math.abs(this.z) < 0.01
    );
  }
  static fromThree(vec3: THREE.Vector3): Vector3D {
    return new Vector3D(vec3.x, vec3.y, vec3.z);
  }
  setFromAmmo(vec3: Ammo.btVector3): void {
    this.x = vec3.x();
    this.y = vec3.y();
    this.z = vec3.z();
  }
  public toEuler(): THREE.Euler {
    return new THREE.Euler().setFromVector3(this as any as THREE.Vector3);
  }
  public _multiplyScalar(scalar: number): Vector3D {
    // Do this better
    return Vector3D.fromThree(super.multiplyScalar(scalar));
  }
  public dot(other: Vector3D): number {
    return super.dot(other);
  }
}
