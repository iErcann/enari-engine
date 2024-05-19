import { Renderer } from './View/Renderer/Renderer'
import { GameObject } from './Core/GameObject'
import { PlayerWrapper } from './Core/PlayerWrapper'
import { IUpdatable } from './Interface/IUpdatable'
import { InputManager } from './Input/InputManager'
import { GlobalLoadingManager } from './View/Mesh/GlobalLoadingManager'
import { Physics } from './Physics/Physics'
import { Vector3D } from './Core/Vector'
import { CubeCollider } from './Physics/Collider/CubeCollider'
import { Actor } from './Core/Actor'
import { CubeRenderer } from './View/Renderer/CubeRenderer'
import { MapMesh } from './View/Mesh/MapMesh'
import { SphereRenderer } from './View/Renderer/SphereRenderer'
import { AudioManager } from './View/Audio/AudioManager'

export class Game implements IUpdatable {
  public static game: Game
  public renderer!: Renderer
  public globalLoadingManager: GlobalLoadingManager
  public players: Array<PlayerWrapper>
  public currentPlayer!: PlayerWrapper
  public inputManager: InputManager
  private physics: Physics
  private lastUpdateTS!: number
  public actors!: Array<Actor>
  public audioManager: AudioManager
  public mapName = 'collision-world'
  constructor() {
    this.players = new Array<PlayerWrapper>()
    this.globalLoadingManager = GlobalLoadingManager.getInstance()
    this.physics = Physics.createDefault()
    this.inputManager = new InputManager()
    this.update = this.update.bind(this)
    this.audioManager = new AudioManager()
  }
  public onLoad(): void {
    this.renderer = new Renderer(this.players)
    const playerWrapper = PlayerWrapper.default()
    //playerWrapper.switchToFpsView();
    this.setCurrentPlayer(playerWrapper)
    this.addPlayer(playerWrapper)
    this.setPhysicsObjects()
  }
  public setPhysicsObjects(): void {
    this.actors = new Array<CubeCollider>()
    /*    const ground = new CubeRenderer(new Vector3D(0, -5, 0), new Vector3D(0, 0, 0), new Vector3D(200, 1, 200), 0, new THREE.MeshToonMaterial({ color: 0x323232 }));
          this.actors.push(ground);
          ground.addToWorld(this.physics);
          this.addToRenderer(ground.mesh)   */

    for (let j = 1; j < 10; j++) {
      const cube = new CubeRenderer(new Vector3D(10 + j * 2.5, 5, 46), new Vector3D(0, 0, 0), new Vector3D(2, 2, 2), 25)
      this.actors.push(cube)
      cube.addToWorld(this.physics)
      this.addToRenderer(cube.mesh)
    }

    /*     for (let j = 1; j < 5; j++) {
      const sphere = new SphereRenderer(
        new Vector3D(0 + j * 10, 2, 5 * j),
        new Vector3D(0, 0, 0),
        new Vector3D(j, j, j),
        10
      )
      this.actors.push(sphere)
      sphere.addToWorld(this.physics)
      this.addToRenderer(sphere.mesh)
    } */

    const mapMesh = this.globalLoadingManager.loadableMeshs.get('Map')! as MapMesh // No need to clone, it's unique.
    mapMesh.init()
    mapMesh.addPhysics(this)
    this.addToRenderer(mapMesh.mesh)
  }
  public static getInstance(): Game {
    if (!Game.game) {
      Game.game = new Game()
    }
    return Game.game
  }
  public addToRenderer(gameObject: GameObject) {
    this.renderer.scene.add(gameObject)
  }
  public addToWorld(actor: Actor) {
    if (actor.body) {
      this.physics.add(actor.body)
    } else {
      throw new Error("This actor doesn't have a body!")
    }
  }
  public setCurrentPlayer(player: PlayerWrapper) {
    if (!this.renderer) {
      throw new Error('No renderer!')
    }
    if (this.currentPlayer) {
      this.currentPlayer.player.isCurrentPlayer = false
    }
    this.currentPlayer = player
    this.currentPlayer.player.isCurrentPlayer = true
    this.renderer.setCurrentPlayer(this.currentPlayer)
    this.inputManager.setCurrentPlayer(this.currentPlayer)
  }
  public update() {
    const now: number = performance.now()
    let dt = (now - this.lastUpdateTS) / 1000
    dt = Math.min(20 / 1000, dt)
    this.currentPlayer.player.prestep(dt)
    this.inputManager.update(dt)

    for (let i = 0; i < this.actors.length; i++) {
      this.actors[i].update(dt) // TODO: Put players inside this array
    }

    this.currentPlayer.player.update(dt) // Physics
    this.physics.update(dt)
    this.renderer.update(dt)
    this.lastUpdateTS = now
    requestAnimationFrame(this.update)
  }
  public startUpdateLoop() {
    this.lastUpdateTS = performance.now()
    this.update()
  }
  public addPlayer(playerWrapper: PlayerWrapper) {
    this.players.push(playerWrapper)
    playerWrapper.player.addToWorld(this.physics)
  }
}
