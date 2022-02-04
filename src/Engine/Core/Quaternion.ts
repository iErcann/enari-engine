import * as THREE from "three"
import Ammo from "ammojs-typed";
import { Vector3D } from "./Vector";

export class TQuaternion extends THREE.Quaternion {
    public static ZERO(): TQuaternion { return new TQuaternion(0, 0, 0, 1) };
    constructor(x: number, y: number, z: number, w) {
        super(x, y, z, w);
    }
    static fromAmmo(quat: Ammo.btQuaternion): TQuaternion {
        return new TQuaternion(quat.x(), quat.y(), quat.z(), quat.w());
    }
    public toAmmo(): Ammo.btQuaternion {
        return new Ammo.btQuaternion(this.x, this.y, this.z, this.w);
    }
    static setFromEuler(euler: THREE.Euler): TQuaternion {
        const quat = new THREE.Quaternion().setFromEuler(euler);
        return new TQuaternion(quat.x, quat.y, quat.z, quat.w);
    }
    static setFromVector3D(rotation: Vector3D): TQuaternion {
        return TQuaternion.setFromEuler(new THREE.Euler().setFromVector3(rotation));
    }

    public toVector3D(): Vector3D {
        const vec3 = new THREE.Euler().setFromQuaternion(this).toVector3();
        return new Vector3D(vec3.x, vec3.y, vec3.z);
    }
}

new THREE.Vector3().applyQuaternion(new THREE.Quaternion())