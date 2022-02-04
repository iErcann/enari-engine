import * as THREE from "three";
import { IUpdatable } from "../../Interface/IUpdatable";
import { Vector3D } from "../../Core/Vector";
import { CubeCollider } from "../../Physics/Collider/CubeCollider";
import { TrimeshCollider } from "../../Physics/Collider/TrimeshCollider";

export class TrimeshRenderer extends TrimeshCollider implements IUpdatable {
    constructor(mesh: THREE.Mesh, pos: Vector3D = Vector3D.ZERO(), rotation: Vector3D = Vector3D.ZERO(), size: Vector3D = new Vector3D(1, 1, 1), mass: number = 1) {
        super(mesh, pos, rotation, size, mass);
        this.mesh.position.copy(pos);
        this.mesh.rotation.setFromVector3(rotation);
    }
    update(dt: number): void {
        super.update(dt);
        this.mesh.position.copy(this.position);
        this.mesh.rotation.setFromVector3(this.rotation);
    }
}