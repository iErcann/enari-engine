import { GameObject } from './GameObject';
import { Vector3D } from './Vector';
import * as THREE from 'three';
import Ammo from 'ammojs-typed';
import { Physics } from '../Physics/Physics';
import { TQuaternion } from './Quaternion';
import { IUpdatable } from '../Interface/IUpdatable';
export abstract class Actor implements IUpdatable {
    public position: Vector3D;
    public rotation: Vector3D;
    public body!: Ammo.btRigidBody;
    protected transform!: Ammo.btTransform;

    protected abstract createShape(size?: Vector3D, mesh?: THREE.Mesh): Ammo.btCollisionShape  
    protected abstract createBody(shape: Ammo.btCollisionShape, pos?: Vector3D, rotation?: Vector3D, mass?: number): Ammo.btRigidBody;
//    protected abstract createBody(pos: Vector3D, rotation?: Vector3D, size?: Vector3D, mass?: number): Ammo.btRigidBody;
    constructor(position: Vector3D = Vector3D.ZERO(), rotation: Vector3D = Vector3D.ZERO()) {
        this.position = position;
        this.rotation = rotation;
    }
    protected setBody(body: Ammo.btRigidBody) {
        this.body = body;
    }
    public abstract addToWorld(physics: Physics): void;

    update(dt: number, updatePosition: boolean = true, updateRotation: boolean = true): void {
        if (!updatePosition && !updateRotation) {
            return;
        }
        let ms = this.body.getMotionState();
        if (ms) {
            ms.getWorldTransform(this.transform);
            if (updatePosition) {
                let pos = this.transform.getOrigin();
                this.position.set(pos.x(), pos.y(), pos.z());
            }
            if (updateRotation) {
                let quat = this.transform.getRotation();
                this.rotation.copy(TQuaternion.fromAmmo(quat).toVector3D());
            }
        }
    }
}
