import { GroundCollider } from "../../Physics/Collider/GroundCollider";
import * as THREE from "three";
import { IUpdatable } from "../../Interface/IUpdatable";
import { Vector3D } from "../../Core/Vector";

export class GroundRenderer extends GroundCollider implements IUpdatable {
  public mesh: THREE.Mesh;
  constructor() {
    super();
    const texture = new THREE.TextureLoader().load("ground_grid.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(400, 400);
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(
      this.size.x,
      this.size.y,
      this.size.z
    );
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      map: texture,
    });
    const cube: THREE.Mesh = new THREE.Mesh(geometry, material);

    cube.castShadow = true;
    cube.receiveShadow = true;
    this.mesh = cube;
  }
  update(dt: number): void {
    super.update(dt);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.setFromVector3(this.rotation);
  }
}
