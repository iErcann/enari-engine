import * as THREE from 'three'
import { TQuaternion } from '../../Core/Quaternion'
import { Vector2D, Vector3D } from '../../Core/Vector'
import { Game } from '../../Game'
import { CubeCollider } from '../../Physics/Collider/CubeCollider'
import { TrimeshCollider } from '../../Physics/Collider/TrimeshCollider'
import { CubeRenderer } from '../Renderer/CubeRenderer'
import { TrimeshRenderer } from '../Renderer/TrimeshRenderer'
import { FakeSpotLight } from './FakeSpotLight'
import { LoadableMesh } from './LoadableMesh'

export class MapMesh extends LoadableMesh {
  constructor() {
    super(`pool_day_baked.glb`, 'Map')
  }

  public init() {
    super.init()
  }
  public addPhysics(game: Game): void {
    const removedMeshs: Array<THREE.Object3D> = new Array<THREE.Object3D>()
    this.mesh.traverse((child) => {
      if (child.name.substr(0, 4) === 'Spot') {
        const pos = child.position.clone()
        const height = 32
        pos.y -= height / 2

        const faker = new FakeSpotLight({
          color1: new THREE.Color(0x512578),
          position: pos as Vector3D,
          rotation: child.rotation,
          height: height,
          radius: 20,
          attenuation: 35,
        })
        game.renderer.addToRenderer(faker)
      } else if ((child as any).isMesh) {
        let mesh = child as THREE.Mesh
        let mat = mesh.material as THREE.MeshStandardMaterial
        //mat.normalScale = new Vector2D(220, 220);
        const quat: THREE.Quaternion = mesh.getWorldQuaternion(mesh.quaternion)
        const rotation = new TQuaternion(quat.x, quat.y, quat.z, quat.w).toVector3D()
        const pos = mesh.getWorldPosition(mesh.position.clone()) as Vector3D
        const scale = mesh.getWorldScale(mesh.scale).clone().multiplyScalar(1) as Vector3D
        //const mass = 0; Math.random() > 0.5 ? Math.random() * 10 : 0;
        const isDynamic = false //= mass != 0;
        let cube: TrimeshCollider | undefined = undefined
        // If a child is dynamic, remove it from the mesh and create its own renderer.
        if (isDynamic) {
          cube = new TrimeshRenderer(mesh.clone(), pos, rotation, scale, 100)
          game.addToRenderer((cube as TrimeshRenderer).mesh)
          removedMeshs.push(mesh)
        } else {
          cube = new TrimeshCollider(mesh, pos, rotation, scale, 0)
        }
        game.actors.push(cube)
        game.addToWorld(cube)
      }
    })
    for (let i = 0; i < removedMeshs.length; i++) {
      this.mesh.remove(removedMeshs[i])
    }
  }
  /*   public addPhysics(game: Game): void {
    const removedMeshs: Array<THREE.Object3D> = new Array<THREE.Object3D>()
    this.mesh.traverse((child) => {
      if ((child as any).isMesh) {
        let mesh = child as THREE.Mesh
        mesh.position.y -= 2
        let mat = mesh.material as THREE.MeshStandardMaterial
        //mat.normalScale = new Vector2D(220, 220);
        const quat: THREE.Quaternion = mesh.getWorldQuaternion(mesh.quaternion)
        const rotation = new TQuaternion(quat.x, quat.y, quat.z, quat.w).toVector3D()
        const pos = mesh.getWorldPosition(mesh.position.clone()) as Vector3D
        const scale = mesh.getWorldScale(mesh.scale).clone().multiplyScalar(2) as Vector3D
        const mass = 0
        Math.random() > 0.5 ? Math.random() * 10 : 0
        const isDynamic = false //= mass != 0;
        let cube: CubeCollider | undefined = undefined
        // If a child is dynamic, remove it from the mesh and create its own renderer.
        if (isDynamic) {
          cube = new CubeRenderer(pos, rotation, scale, 100, mesh.material)
          game.addToRenderer((cube as CubeRenderer).mesh)
          removedMeshs.push(mesh)
        } else {
          cube = new CubeCollider(pos, rotation, scale, 0)
        }
        game.actors.push(cube)
        game.addToWorld(cube)
      }
    })
    for (let i = 0; i < removedMeshs.length; i++) {
      this.mesh.remove(removedMeshs[i])
    }
  } */
  public clone(): MapMesh {
    const loadableMesh = new MapMesh()
    loadableMesh.setMesh(this.cloneMesh())
    return loadableMesh
  }
}
