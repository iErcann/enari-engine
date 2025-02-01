const Ammo = window.Amma;
import { Actor } from '../../Core/Actor';
import { TQuaternion } from '../../Core/Quaternion';
import { Vector3D } from '../../Core/Vector';

export class GroundCollider extends Actor {
    constructor() {
        super(new Vector3D(0, -5, 0));
        this.size = new Vector3D(2000, 1, 2000);
        const shape = this.createShape(this.size);
        const body = this.createBody(shape, this.position);
        this.setBody(body);
    }

    createShape(size) {
        const sizeAmmo = size.toAmmo();
        const shape = new Ammo.btBoxShape(sizeAmmo);
        Ammo.destroy(sizeAmmo);
        return shape;
    }

    pcreateBody(shape, pos = Vector3D.ZERO(), rotation = Vector3D.ZERO(), mass = 0) {
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

    addToWorld(physics) {
        physics.add(this.body);
    }

    update(dt) {
        super.update(dt, true, true)
    }
}