//import { Renderer } from "./View/Renderer/Renderer.js";
import { Renderer } from "./View/Renderer/Renderer.js";
import { PlayerWrapper } from "./Core/PlayerWrapper.js";
import { InputManager } from "./Input/InputManager.js";
import { GlobalLoadingManager } from "./View/Mesh/GlobalLoadingManager.js";
import { Physics } from "./Physics/Physics.js";
import { Vector3D } from "./Core/Vector.js";
import { CubeRenderer } from "./View/Renderer/CubeRenderer.js";
import { AudioManager } from "./View/Audio/AudioManager.js";
export class Game {
  static game;
  renderer;
  globalLoadingManager;
  players;
  currentPlayer;
  inputManager;
  physics;
  lastUpdateTS;
  actors;
  audioManager;
  mapName = "collision-world";
  constructor() {
    this.players = new Array();
    this.globalLoadingManager = GlobalLoadingManager.getInstance();
    this.physics = Physics.createDefault();
    this.inputManager = new InputManager();
    this.update = this.update.bind(this);
    this.audioManager = new AudioManager();
  }
  onLoad() {
    this.renderer = new Renderer(this.players);
    const playerWrapper = PlayerWrapper.default();
    this.setCurrentPlayer(playerWrapper);
    this.addPlayer(playerWrapper);
    this.setPhysicsObjects();
  }
  setPhysicsObjects() {
    this.actors = new Array();
    for (let j = 1; j < 10; j++) {
      const cube = new CubeRenderer(new Vector3D(10 + j * 2.5, 5, 46), new Vector3D(0, 0, 0), new Vector3D(2, 2, 2), 25);
      this.actors.push(cube);
      cube.addToWorld(this.physics);
      this.addToRenderer(cube.mesh);
    }
    const mapMesh = this.globalLoadingManager.loadableMeshs.get("Map");
    mapMesh.init();
    mapMesh.addPhysics(this);
    this.addToRenderer(mapMesh.mesh);
  }
  static getInstance() {
    if (!Game.game) {
      Game.game = new Game();
    }
    return Game.game;
  }
  addToRenderer(gameObject) {
    this.renderer.scene.add(gameObject);
  }
  addToWorld(actor) {
    if (actor.body) {
      this.physics.add(actor.body);
    } else {
      throw new Error("This actor doesn't have a body!");
    }
  }
  setCurrentPlayer(player) {
    if (!this.renderer) {
      throw new Error("No renderer!");
    }
    if (this.currentPlayer) {
      this.currentPlayer.player.isCurrentPlayer = false;
    }
    this.currentPlayer = player;
    this.currentPlayer.player.isCurrentPlayer = true;
    this.renderer.setCurrentPlayer(this.currentPlayer);
    this.inputManager.setCurrentPlayer(this.currentPlayer);
  }
  update() {
    const now = performance.now();
    let dt = (now - this.lastUpdateTS) / 1e3;
    dt = Math.min(20 / 1e3, dt);
    this.currentPlayer.player.prestep(dt);
    this.inputManager.update(dt);
    for (let i = 0; i < this.actors.length; i++) {
      this.actors[i].update(dt);
    }
    this.currentPlayer.player.update(dt);
    this.physics.update(dt);
    this.renderer.update(dt);
    this.lastUpdateTS = now;
    requestAnimationFrame(this.update);
  }
  startUpdateLoop() {
    this.lastUpdateTS = performance.now();
    this.update();
  }
  addPlayer(playerWrapper) {
    this.players.push(playerWrapper);
    playerWrapper.player.addToWorld(this.physics);
  }
}

