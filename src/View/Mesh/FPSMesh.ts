import * as THREE from 'three'
import { Vector3D } from '../../Core/Vector'
import { IUpdatable } from '../../Interface/IUpdatable'
import { AnimatedLoadableMesh } from './AnimatedLoadableMesh'
import { LoadableMesh } from './LoadableMesh'

export class FPSMesh extends AnimatedLoadableMesh implements IUpdatable {
  private hasLight = false
  public viewmodelOffset: Vector3D
  constructor(path: string, key: string, viewmodelOffset = Vector3D.ZERO()) {
    super(path, key)
    this.viewmodelOffset = viewmodelOffset
  }
  update(dt: number): void {
    super.update(dt)
  }

  private initMesh(): void {
    // To fix the wall clipping without 2 layers try to merge the entire mesh and then change zindex
    this.mesh.scale.multiplyScalar(-1)
    this.mesh.traverse((child) => {
      child.castShadow = false
      child.receiveShadow = true
      child.frustumCulled = false
    })
  }

  private setHandMaterial() {}

  public init(): void {
    super.init()
    this.initMesh()
  }

  public addLight(light: THREE.Light) {
    if (!this.hasLight) {
      this.hasLight = true
      this.mesh.add(light)
    }
  }

  public clone(): FPSMesh {
    const clone = new FPSMesh(this.path, this.key, this.viewmodelOffset)
    clone.setMesh(this.cloneMesh())
    clone.setAnimations(this.animations)
    return clone
  }
}
