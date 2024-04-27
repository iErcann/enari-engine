import * as THREE from "three";
import { IUpdatable } from "../../Interface/IUpdatable";
import { Vector3D } from "../../Core/Vector";
import { CubeCollider } from "../../Physics/Collider/CubeCollider";
import { SphereCollider } from "../../Physics/Collider/SphereCollider";

export class SphereRenderer extends SphereCollider implements IUpdatable {
  public mesh: THREE.Mesh;
  constructor(
    position: Vector3D,
    rotation: Vector3D,
    size: Vector3D,
    mass: number,
    material?: THREE.Material | THREE.Material[]
  ) {
    super(position, rotation, size, mass);

    const texture = new THREE.TextureLoader().load("ground_grid.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const normal = new THREE.TextureLoader().load("NormalMap (1).png");

    const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(
      size.x,
      20,
      20
    );
    let _material: THREE.Material | THREE.Material[];

    if (!material) {
      _material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      });
    } else {
      _material = material;
    }

    const sphere: THREE.Mesh = new THREE.Mesh(geometry, _material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    texture.repeat.set(10 - size.x, 10 - size.y);
    sphere.position.copy(position);
    sphere.rotation.setFromVector3(rotation);
    this.mesh = sphere;
    //this.mesh.add(new THREE.PointLight(0xFFFFFF, 10, 10))
  }
  update(dt: number): void {
    super.update(dt);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.setFromVector3(this.rotation);
  }
}
