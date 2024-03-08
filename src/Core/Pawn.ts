import Ammo from 'ammojs-typed';
import { BufferGeometry, Material, Mesh } from 'three';
import { Physics } from '../Physics/Physics';
import { Actor } from './Actor';
import { Vector3D } from './Vector';
export class Pawn extends Actor {
    protected createShape(size?: Vector3D, mesh?: Mesh<BufferGeometry, Material | Material[]>): Ammo.btCollisionShape {
        throw new Error('Method not implemented.');
    }
    protected createBody(shape: Ammo.btCollisionShape, pos?: Vector3D, rotation?: Vector3D, mass?: number): Ammo.btRigidBody {
        throw new Error('Method not implemented.');
    }

    public addToWorld(physics: Physics): void {
        throw new Error('Method not implemented.');
    }
    constructor(position: Vector3D, rotation: Vector3D) {
        super(position, rotation);
    }
}