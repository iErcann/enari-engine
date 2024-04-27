import * as THREE from 'three'
import { Player } from '../../Core/Player'
import { Vector2D } from '../../Core/Vector'
import { IUpdatable } from '../../Interface/IUpdatable'

export abstract class CameraManager implements IUpdatable {
  public camera: THREE.PerspectiveCamera
  public player: Player
  public isRotating = false
  private rotationAccumulator = 0
  public rotationDelta = new Vector2D(0, 0)

  constructor(player: Player, camera: THREE.PerspectiveCamera) {
    this.player = player
    this.camera = camera
  }
  private updateRotationState(dt: number): void {
    if (this.isRotating) {
      if (this.rotationAccumulator >= 300) {
        this.isRotating = false
        this.rotationAccumulator = 0
      } else {
        this.rotationAccumulator += dt * 1000
      }
    }
  }

  public update(dt: number): void {
    this.updateRotationState(dt)
  }

  public onMouseMove(event: any): void {
    this.isRotating = true
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
    this.rotationDelta.set(movementX, movementY)
  }
}
