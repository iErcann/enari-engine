import Ammo from 'ammojs-typed';
import { BufferGeometry } from 'three';
import { Actor } from '../../Core/Actor';
import { TQuaternion } from '../../Core/Quaternion';
import { Vector3D } from '../../Core/Vector';
import { IUpdatable } from '../../Interface/IUpdatable';
import { Physics } from '../Physics';

export class GroundCollider extends Actor implements IUpdatable {
    protected createShape(size: Vector3D): Ammo.btCollisionShape {
        const sizeAmmo = size.toAmmo();
        const shape = new Ammo.btBoxShape(sizeAmmo);
        Ammo.destroy(sizeAmmo);
        return shape;
    }

    protected createBody(shape: Ammo.btCollisionShape, pos: Vector3D = Vector3D.ZERO(), rotation: Vector3D = Vector3D.ZERO(), mass: number = 0): Ammo.btRigidBody {
        this.transform = new Ammo.btTransform();
        const position = pos.toAmmo();
        const quat = TQuaternion.setFromVector3D(rotation).toAmmo();

        this.transform.setOrigin(position);
        this.transform.setRotation(quat);

        const sizeVec = new Ammo.btVector3(this.size.x / 2, this.size.y / 2, this.size.z / 2);
        const myMotionState = new Ammo.btDefaultMotionState(this.transform);
        //shape.setMargin(.05);

        const localInertia = new Ammo.btVector3(0, 0, 0);
        const rbInfo = new Ammo.btRigidBodyConstructionInfo(
            mass,
            myMotionState,
            shape,
            localInertia
        );

        const body = new Ammo.btRigidBody(rbInfo);
        
        //body.setAngularFactor(Vector3D.ZERO().toAmmo()); // TODO: use the same ammo.vector3
        Ammo.destroy(sizeVec);
        Ammo.destroy(position);
        return body;

    }
    protected size: Vector3D = new Vector3D(2000, 1, 2000);
    public addToWorld(physics: Physics): void {
        physics.add(this.body);
    }
    constructor() {
        super(new Vector3D(0, -5, 0));
        const shape = this.createShape(this.size);
        const body = this.createBody(shape, this.position);
        this.setBody(body);
    }
    update(dt: number): void {
        super.update(dt, true, true)
    }
}