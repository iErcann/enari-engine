import * as THREE from "three";
import { AmmoInstance } from "../Physics/Ammo.js";
export class Vector2D extends THREE.Vector2 {
  static ZERO = new Vector2D(0, 0);
  constructor(x, y) {
    super(x, y);
  }
}
export class Vector3D extends THREE.Vector3 {
  static ZERO() {
    return new Vector3D(0, 0, 0);
  }
  constructor(x, y, z) {
    super(x, y, z);
  }
  toAmmo() {
    return new AmmoInstance.btVector3(this.x, this.y, this.z);
  }
  static fromAmmo(vec3) {
    return new Vector3D(vec3.x(), vec3.y(), vec3.z());
  }
  fuzzyZero() {
    return Math.abs(this.x) < 0.01 && Math.abs(this.y) < 0.01 && Math.abs(this.z) < 0.01;
  }
  static fromThree(vec3) {
    return new Vector3D(vec3.x, vec3.y, vec3.z);
  }
  setFromAmmo(vec3) {
    this.x = vec3.x();
    this.y = vec3.y();
    this.z = vec3.z();
  }
  toEuler() {
    return new THREE.Euler().setFromVector3(this);
  }
  _multiplyScalar(scalar) {
    return Vector3D.fromThree(super.multiplyScalar(scalar));
  }
  dot(other) {
    return super.dot(other);
  }
}

