import { PlayerController } from "../Controller/PlayerController.js";
import { FPSCameraManager } from "../View/CameraManager/FPSCameraManager.js";
import { TPSCameraManager } from "../View/CameraManager/TPSCameraManager.js";
import { FPSRenderer } from "../View/Renderer/PlayerRenderer/FPSRenderer.js";
import { ThirdPersonRenderer } from "../View/Renderer/PlayerRenderer/ThirdPersonRenderer.js";
import { Player } from "../Core/Player.js";
import { Vector3D } from "../Core/Vector.js";
export class PlayerWrapper {
  player;
  controller;
  renderer;
  fpsRenderer;
  tpsRenderer;
  cameraManager;
  constructor(player, controller, renderer, cameraManager) {
    this.player = player;
    this.controller = controller;
    if (renderer) {
      this.setRenderer(renderer);
    }
    this.cameraManager = cameraManager;
  }
  setRenderer(renderer) {
    this.renderer = renderer;
    if (renderer instanceof FPSRenderer) {
      this.fpsRenderer = renderer;
    } else {
      this.tpsRenderer = renderer;
    }
  }
  switchToFpsView() {
    if (this.fpsRenderer === this.renderer && this.renderer) {
      console.log("Already in fps view!");
      return false;
    }
    this.renderer.onDisabled();
    if (this.fpsRenderer) {
      this.setRenderer(this.fpsRenderer);
    } else {
      const fpsRenderer = new FPSRenderer(this.player);
      this.setRenderer(fpsRenderer);
    }
    const cameraManager = new FPSCameraManager(this.player, this.renderer.camera);
    this.renderer.setCameraManager(cameraManager);
    this.renderer.onEnabled(this.tpsRenderer ? this.tpsRenderer.camera : void 0);
    return true;
  }
  switchToTpsView() {
    if (this.tpsRenderer === this.renderer && this.renderer) {
      console.log("Already in tps view!");
      return false;
    }
    this.renderer?.onDisabled();
    if (this.tpsRenderer) {
      this.setRenderer(this.tpsRenderer);
    } else {
      const tpsRenderer = new ThirdPersonRenderer(this.player);
      this.setRenderer(tpsRenderer);
    }
    const cameraManager = new TPSCameraManager(this.player, this.renderer.camera);
    this.renderer.setCameraManager(cameraManager);
    this.renderer.onEnabled(this.fpsRenderer ? this.fpsRenderer.camera : void 0);
    return true;
  }
  static default() {
    const player = new Player(new Vector3D(0, 5, 8));
    const controller = new PlayerController(player);
    const fpsRenderer = new FPSRenderer(player);
    const cameraManager = new FPSCameraManager(player, fpsRenderer.camera);
    fpsRenderer.setCameraManager(cameraManager);
    return new PlayerWrapper(player, controller, fpsRenderer, cameraManager);
  }
  static defaultNoRenderer() {
    const player = new Player(new Vector3D(53, 2, 10.59));
    const controller = new PlayerController(player);
    return new PlayerWrapper(player, controller, void 0, void 0);
  }
}