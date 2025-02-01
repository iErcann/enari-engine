import * as THREE from "three";
import { CubeCollider } from "../../Physics/Collider/CubeCollider.js";
export class CubeRenderer extends CubeCollider {
  mesh;
  constructor(position, rotation, size, mass, material) {
    super(position, rotation, size, mass);
    const texture = new THREE.TextureLoader().load("./assets/CubeTexture.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const normal = new THREE.TextureLoader().load("./assets/CubeNormal.png");
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    let _material;
    if (!material) {
      _material = new THREE.MeshStandardMaterial({
        normalMap: normal,
        map: texture,
        emissive: 0,
        metalness: 0,
        roughness: 1
      });
    } else {
      _material = material;
    }
    const cube = new THREE.Mesh(geometry, _material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.copy(position);
    cube.rotation.setFromVector3(rotation);
    this.mesh = cube;
  }
  update(dt) {
    super.update(dt);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.setFromVector3(this.rotation);
  }
}

