import * as THREE from 'three'
import { IUpdatable } from '../../Interface/IUpdatable'
import { Vector3D } from '../../Core/Vector'
import { CubeCollider } from '../../Physics/Collider/CubeCollider'

export class CubeRenderer extends CubeCollider implements IUpdatable {
  public mesh: THREE.Mesh
  constructor(
    position: Vector3D,
    rotation: Vector3D,
    size: Vector3D,
    mass: number,
    material?: THREE.Material | THREE.Material[]
  ) {
    super(position, rotation, size, mass)
    const texture = new THREE.TextureLoader().load('CubeTexture.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    const normal = new THREE.TextureLoader().load('CubeNormal.png')

    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z)

    let _material: THREE.Material | THREE.Material[]

    if (!material) {
      _material = new THREE.MeshStandardMaterial({
        normalMap: normal,
        map: texture,
        emissive: 0x000000,
        metalness: 0,
        roughness: 1,
      })
    } else {
      _material = material
    }

    const cube: THREE.Mesh = new THREE.Mesh(geometry, _material)
    cube.castShadow = true
    cube.receiveShadow = true

    //texture.repeat.set(10 - size.x, 10 - size.y);
    cube.position.copy(position)
    cube.rotation.setFromVector3(rotation)
    this.mesh = cube
  }
  update(dt: number): void {
    super.update(dt)
    this.mesh.position.copy(this.position)
    this.mesh.rotation.setFromVector3(this.rotation)
  }
}
