import { Controller } from '../Controller/Controller'
import { PlayerController } from '../Controller/PlayerController'
import { Game } from '../Game'
import { CameraManager } from '../View/CameraManager/CameraManager'
import { FPSCameraManager } from '../View/CameraManager/FPSCameraManager'
import { TPSCameraManager } from '../View/CameraManager/TPSCameraManager'
import { FPSMesh } from '../View/Mesh/FPSMesh'
import { FPSRenderer } from '../View/Renderer/PlayerRenderer/FPSRenderer'
import { PlayerRenderer } from '../View/Renderer/PlayerRenderer/PlayerRenderer'
import { ThirdPersonRenderer } from '../View/Renderer/PlayerRenderer/ThirdPersonRenderer'
import { Player } from './Player'
import { Vector3D } from './Vector'

export class PlayerWrapper {
  public player: Player
  public controller!: Controller
  public renderer: PlayerRenderer | undefined
  public fpsRenderer!: FPSRenderer
  public tpsRenderer!: ThirdPersonRenderer

  public cameraManager!: CameraManager | undefined
  constructor(
    player: Player,
    controller: PlayerController,
    renderer: PlayerRenderer | undefined,
    cameraManager: CameraManager | undefined
  ) {
    this.player = player
    this.controller = controller
    if (renderer) {
      this.setRenderer(renderer)
    }
    this.cameraManager = cameraManager
  }
  public setRenderer(renderer: PlayerRenderer) {
    this.renderer = renderer
    if (renderer instanceof FPSRenderer) {
      this.fpsRenderer = renderer as FPSRenderer
    } else {
      this.tpsRenderer = renderer as ThirdPersonRenderer
    }
  }
  public switchToFpsView(): boolean {
    if (this.fpsRenderer === this.renderer && this.renderer) {
      console.log('Already in fps view!')
      return false
    }

    this.renderer!.onDisabled()

    // Fps renderer already exist
    if (this.fpsRenderer) {
      this.setRenderer(this.fpsRenderer)
    } else {
      const fpsRenderer = new FPSRenderer(this.player)
      this.setRenderer(fpsRenderer)
    }

    const cameraManager = new FPSCameraManager(this.player, this.renderer!.camera)
    this.renderer!.setCameraManager(cameraManager)
    this.renderer!.onEnabled(this.tpsRenderer ? this.tpsRenderer.camera : undefined)
    return true
  }

  public switchToTpsView(): boolean {
    if (this.tpsRenderer === this.renderer && this.renderer) {
      console.log('Already in tps view!')
      return false
    }

    this.renderer?.onDisabled()

    // Tps renderer already exist
    if (this.tpsRenderer) {
      this.setRenderer(this.tpsRenderer)
    } else {
      const tpsRenderer = new ThirdPersonRenderer(this.player)
      this.setRenderer(tpsRenderer)
    }

    const cameraManager = new TPSCameraManager(this.player, this.renderer!.camera)
    this.renderer!.setCameraManager(cameraManager)
    this.renderer!.onEnabled(this.fpsRenderer ? this.fpsRenderer.camera : undefined)

    return true
  }

  static default(): PlayerWrapper {
    const player = new Player(new Vector3D(0, 5, 8))
    const controller = new PlayerController(player)
    const fpsRenderer = new FPSRenderer(player)
    const cameraManager = new FPSCameraManager(player, fpsRenderer.camera)
    fpsRenderer.setCameraManager(cameraManager)
    return new PlayerWrapper(player, controller, fpsRenderer, cameraManager)
  }
  static defaultNoRenderer(): PlayerWrapper {
    const player = new Player(new Vector3D(53, 2, 10.59))
    const controller = new PlayerController(player)
    return new PlayerWrapper(player, controller, undefined, undefined)
  }
}
