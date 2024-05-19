import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { FPSMesh } from './FPSMesh'
import { GlobalLoadingManager } from './GlobalLoadingManager'

export class LoadableMesh {
  protected path!: string
  public key!: string
  public mesh!: THREE.Mesh
  constructor(path: string, key: string) {
    this.path = path
    this.key = key
  }
  public async load(): Promise<void> {
    console.log(this.path)
    const mesh = await GlobalLoadingManager.loadMesh(this.path)
    this.setMesh(mesh as unknown as THREE.Mesh)
    this.init()
  }
  public register(loadableMeshs: Map<string, LoadableMesh>): void {
    loadableMeshs.set(this.key, this)
  }

  public setMesh(mesh: THREE.Mesh): void {
    this.mesh = mesh
  }

  public cloneMesh(): THREE.Mesh {
    const original: THREE.Mesh = this.mesh
    const cloned = <THREE.Mesh>SkeletonUtils.clone(original)
    // SkeletonUtils.clone doesnt seem to keep the animations.
    cloned.animations = original.animations
    return cloned
  }

  public init(): void {
    const mesh: any = this.mesh
    mesh.traverse((child: any) => {
      child.castShadow = true
      child.receiveShadow = true
    })
  }

  public clone(): LoadableMesh {
    const loadableMesh = new LoadableMesh(this.path, this.key)
    loadableMesh.setMesh(this.cloneMesh())
    return loadableMesh
  }
}
