import { Vector3D } from "./Vector.js";
import { TQuaternion } from "./Quaternion.js";
export class Actor {
  position;
  rotation;
  body;
  transform;
  //    protected abstract createBody(pos: Vector3D, rotation?: Vector3D, size?: Vector3D, mass?: number): Ammo.btRigidBody;
  constructor(position = Vector3D.ZERO(), rotation = Vector3D.ZERO()) {
    this.position = position;
    this.rotation = rotation;
  }
  setBody(body) {
    this.body = body;
  }
  update(dt, updatePosition = true, updateRotation = true) {
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