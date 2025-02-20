import * as THREE from 'three'
import { Player } from '../../../Core/Player'
import { Vector3D } from '../../../Core/Vector'
import { Game } from '../../../Game'
import { IUpdatable } from '../../../Interface/IUpdatable'
import { HitscanResult } from '../../../Interface/utils'
import { CameraManager } from '../../CameraManager/CameraManager'
import { DebugUI } from '../../DebugUI'
import { LoadableMesh } from '../../Mesh/LoadableMesh'

export abstract class PlayerRenderer implements IUpdatable {
  playerCameraManager!: CameraManager
  public camera: THREE.PerspectiveCamera
  private debugCollisionLine!: THREE.Line
  protected debugCollisionMesh!: THREE.Mesh
  protected player: Player
  protected game: Game
  protected showDebug = true
  protected showDebugHitscan = false
  protected baseFov = 80

  abstract hide(): void
  abstract show(): void

  public setCameraManager(cameraManager: CameraManager) {
    this.playerCameraManager = cameraManager
  }

  static createDefaultCamera(): THREE.PerspectiveCamera {
    return this.createCamera(100)
  }

  static createCamera(fov: number): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000)
    return camera
  }

  constructor(player: Player) {
    this.camera = PlayerRenderer.createCamera(this.baseFov)
    this.player = player
    this.game = Game.getInstance()
    if (this.showDebug) {
      this.createDebugMeshs()
      const debugUI = this.game.renderer.debugUI
      debugUI.addSeparator()
      const folder = debugUI.playerFolder.addFolder({ title: 'Player position' })
      //const fov = debugUI.addInput(this, 'baseFov' as any).on('change', () => this.setFov(this.baseFov))
      const x = debugUI.addMonitor(this.player.position, 'x', {
        multiline: true,
        lineCount: 1,
      })
      const y = debugUI.addMonitor(this.player.position, 'y', {
        multiline: true,
        lineCount: 1,
      })
      const z = debugUI.addMonitor(this.player.position, 'z', {
        multiline: true,
        lineCount: 1,
      })
      const magn = debugUI.addMonitor(this.player, 'currentSpeedMagnitude', {
        title: 'Player current speed magnitude',
      })
      const deceleration = debugUI.addVector(this.player.deceleration, 'Player deceleration', new Vector3D(2, 2, 2))
      //folder.add(fov)
      folder.add(x)
      folder.add(y)
      folder.add(z)
      folder.add(magn)
      folder.add(deceleration)
      debugUI.addSeparator()
    }
  }

  protected createHitscanLine() {
    const points: Array<THREE.Vector3> = []
    const { from, to } = this.player.createHitscanPoints()
    points.push(from)
    points.push(to)
    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 100,
    })
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const line = new THREE.Line(geometry, material)
    this.game.addToRenderer(line)
  }

  protected createDebugMeshs(): void {
    let { initialLocalPos, size } = this.player.getGroundRaycastProperties()

    const points: Array<THREE.Vector3> = []
    points.push(new Vector3D(initialLocalPos.x, initialLocalPos.y, initialLocalPos.z))
    points.push(new Vector3D(initialLocalPos.x, initialLocalPos.y - size, initialLocalPos.z))
    const material = new THREE.LineBasicMaterial({
      color: 0x2323ff,
      linewidth: 1000,
    })
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    this.debugCollisionLine = new THREE.Line(geometry, material)
    //this.playerCameraManager.camera.add(this.debugCollisionLine)
    this.game.addToRenderer(this.debugCollisionLine)
    {
      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(
        this.player.capsuleDimension.x,
        this.player.capsuleDimension.y * 2,
        this.player.capsuleDimension.x
      )
      const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
        color: '#123121',
        wireframe: false,
      })
      this.debugCollisionMesh = new THREE.Mesh(geometry, material)
      this.debugCollisionMesh.receiveShadow = true

      this.game.addToRenderer(this.debugCollisionMesh)
    }
  }
  protected updateDebugMeshs(): void {
    this.debugCollisionLine.position.copy(this.player.position)
    this.debugCollisionMesh.position.copy(this.player.position)
  }

  public update(dt: number): void {
    if (this.showDebug) {
      this.updateDebugMeshs()
    }
  }
  public handleShoot(hitscanResult: HitscanResult): void {
    // this.game.audioManager.playShot();
    if (this.showDebugHitscan) {
      this.createHitscanLine()
      if (hitscanResult.hasHit) {
        var dotGeometry = new THREE.BufferGeometry()
        dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(hitscanResult.hitPosition!.toArray(), 3))
        var dotMaterial = new THREE.PointsMaterial({
          size: 0.1,
          color: 0xf029302,
        })
        var dot = new THREE.Points(dotGeometry, dotMaterial)
        Game.getInstance().addToRenderer(dot)
      }
    }
  }
  public abstract setMesh(mesh: LoadableMesh): void
  public abstract handleMove(moveVector: Vector3D, dt: number): void
  public abstract handleZoom(): void
  public abstract handleReload(): void
  public abstract handleWeaponSwitch(): void
  public abstract handleJump(): void
  protected abstract removeMesh(): void

  public onEnabled(otherCamera?: THREE.Camera): void {
    if (otherCamera) {
      // Copying the other renderer camera position so the camera doesn't flick when switching the views
      this.camera.rotation.copy(otherCamera.rotation)
    }
    this.show()
  }
  public onDisabled(): void {
    this.hide()
  }

  abstract addToRenderer(): void
  public setFov(fov: number): void {
    ;(<THREE.PerspectiveCamera>this.camera).fov = fov
    console.log((<THREE.PerspectiveCamera>this.camera).fov)
  }
  public showVariables() {
    const debugUI = Game.getInstance().renderer.debugUI
  }
}
