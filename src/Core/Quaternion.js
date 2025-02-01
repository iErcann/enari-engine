import * as THREE from "three"
import { Vector3D } from "./Vector.js";
import { AmmoInstance } from "../Physics/Ammo.js";
export class TQuaternion extends THREE.Quaternion {
  static ZERO() {
    return new TQuaternion(0, 0, 0, 1);
  }
  constructor(x, y, z, w) {
    super(x, y, z, w);
  }
  static fromAmmo(quat) {
    return new TQuaternion(quat.x(), quat.y(), quat.z(), quat.w());
  }
  toAmmo() {
    return new AmmoInstance.btQuaternion(this.x, this.y, this.z, this.w);
  }
  static setFromEuler(euler) {
    const quat = new THREE.Quaternion().setFromEuler(euler);
    return new TQuaternion(quat.x, quat.y, quat.z, quat.w);
  }
  static setFromVector3D(rotation) {
    return TQuaternion.setFromEuler(new THREE.Euler().setFromVector3(rotation));
  }
  toVector3D() {
    const euler = new THREE.Euler().setFromQuaternion(this, "XYZ");
    return new Vector3D(euler.x, euler.y, euler.z);
  }
}
new THREE.Vector3().applyQuaternion(new THREE.Quaternion());

