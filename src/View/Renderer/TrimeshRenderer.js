import { Vector3D } from "../../Core/Vector.js";
import { TrimeshCollider } from "../../Physics/Collider/TrimeshCollider.js";
export class TrimeshRenderer extends TrimeshCollider {
  constructor(mesh, pos = Vector3D.ZERO(), rotation = Vector3D.ZERO(), size = new Vector3D(1, 1, 1), mass = 1) {
    super(mesh, pos, rotation, size, mass);
    this.mesh.position.copy(pos);
    this.mesh.rotation.setFromVector3(rotation);
  }
  update(dt) {
    super.update(dt);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.setFromVector3(this.rotation);
  }
}