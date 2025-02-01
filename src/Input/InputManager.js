import { Game } from "../Game.js";
import { Key, KeyBinding } from "../Input/KeyBinding.js";
import { PlayerWrapper } from "../Core/PlayerWrapper.js";
import { Vector3D } from "../Core/Vector.js";
import { TPSCameraManager } from "../View/CameraManager/TPSCameraManager.js";
import { FPSCameraManager } from "../View/CameraManager/FPSCameraManager.js";
export class InputManager {
  keys = /* @__PURE__ */ new Map();
  boundOnKeyDown;
  boundOnKeyUp;
  boundOnMouseDown;
  boundOnMouseUp;
  boundOnMouseMove;
  boundOnPointerlockChange;
  boundOnPointerlockError;
  boundOnPointerlock;
  isLocked = false;
  lastLeftClick = /* @__PURE__ */ new Date();
  playerWrapper;
  constructor() {
    for (let k in Key) {
      if (isNaN(Number(k))) {
        const key = Key[k];
        this.keys.set(key, new KeyBinding(key));
      }
    }
    this.boundOnKeyDown = (evt) => this.onKeyDown(evt);
    this.boundOnKeyUp = (evt) => this.onKeyUp(evt);
    this.boundOnMouseDown = (evt) => this.onMouseDown(evt);
    this.boundOnMouseUp = (evt) => this.onMouseUp(evt);
    this.boundOnMouseMove = (evt) => this.onMouseMove(evt);
    this.boundOnPointerlockChange = (evt) => this.onPointerlockChange(evt);
    this.boundOnPointerlockError = (evt) => this.onPointerlockError(evt);
    this.boundOnPointerlock = (evt) => this.onLock();
    document.body.ownerDocument.addEventListener("keydown", this.boundOnKeyDown, false);
    document.body.ownerDocument.addEventListener("keyup", this.boundOnKeyUp, false);
    document.body.ownerDocument.addEventListener("mousedown", this.boundOnMouseDown, false);
    document.body.ownerDocument.addEventListener("mouseup", this.boundOnMouseUp, false);
    document.body.ownerDocument.addEventListener("mousemove", this.boundOnMouseMove, false);
    document.body.ownerDocument.addEventListener("pointerlockchange", this.boundOnPointerlockChange, false);
    document.body.ownerDocument.addEventListener("pointerlockerror", this.boundOnPointerlockError, false);
    document.body.ownerDocument.addEventListener("click", this.boundOnPointerlock, false);
  }
  onLock() {
    document.body.requestPointerLock();
  }
  unlock() {
    document.body.ownerDocument.exitPointerLock();
  }
  onPointerlockError(evt) {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }
  onPointerlockChange(evt) {
    if (document.body.ownerDocument.pointerLockElement === document.body) {
      this.isLocked = true;
    } else {
      this.isLocked = false;
    }
  }
  onMouseMove(evt) {
    if (this.isLocked === false || !this.playerWrapper.player.isCurrentPlayer) return;
    this.playerWrapper.cameraManager.onMouseMove(evt);
  }
  cams = [];
  update(dt) {
    const playerController = this.playerWrapper.controller;
    const playerRenderer = this.playerWrapper.renderer;
    const speed = (this.keys.get(Key.Shift)?.isPressed ? 30 : this.playerWrapper.player.speed) * dt;
    if (this.keys.get(Key.Jump)?.isPressed) {
      if (playerController.jump()) {
        playerRenderer.handleJump();
      }
    }
    if (this.keys.get(Key.Forward)?.isPressed) {
      playerController.moveForward(speed, dt);
      playerRenderer?.handleMove(new Vector3D(0, 0, -1), dt);
    }
    if (this.keys.get(Key.Backward)?.isPressed) {
      playerController.moveBackward(speed, dt);
      playerRenderer?.handleMove(new Vector3D(0, 0, 1), dt);
    }
    if (this.keys.get(Key.Left)?.isPressed) {
      playerController.moveLeft(speed, dt);
      playerRenderer?.handleMove(new Vector3D(-1, 0, 0), dt);
    }
    if (this.keys.get(Key.Right)?.isPressed) {
      playerController.moveRight(speed, dt);
      playerRenderer?.handleMove(new Vector3D(1, 0, 0), dt);
    }
    if (this.keys.get(Key.One)?.justReleased) {
      const ak47 = Game.getInstance().globalLoadingManager.loadableMeshs.get("AK47");
      if (ak47) playerRenderer?.setMesh(ak47.clone());
    }
    if (this.keys.get(Key.Two)?.justReleased) {
      const usp = Game.getInstance().globalLoadingManager.loadableMeshs.get("Usp");
      if (usp) playerRenderer?.setMesh(usp.clone());
    }
    if (this.keys.get(Key.Three)?.justReleased) {
      const knife = Game.getInstance().globalLoadingManager.loadableMeshs.get("Knife");
      if (knife) playerRenderer?.setMesh(knife.clone());
    }
    if (this.keys.get(Key.Four)?.justReleased) {
      if (this.playerWrapper.switchToFpsView()) {
        this.playerWrapper.cameraManager = new FPSCameraManager(
          this.playerWrapper.player,
          this.playerWrapper.renderer.camera
        );
        Game.getInstance().renderer.setCamera(this.playerWrapper.cameraManager.camera);
        this.playerWrapper.renderer?.setCameraManager(this.playerWrapper.cameraManager);
      }
    }
    if (this.keys.get(Key.Five)?.justReleased) {
      if (this.playerWrapper.switchToTpsView()) {
        this.playerWrapper.cameraManager = new TPSCameraManager(
          this.playerWrapper.player,
          this.playerWrapper.renderer.camera
        );
        Game.getInstance().renderer.setCamera(this.playerWrapper.cameraManager.camera);
        this.playerWrapper.renderer?.setCameraManager(this.playerWrapper.cameraManager);
      }
    }
    if (this.keys.get(Key.Use)?.justReleased) {
      const game = Game.getInstance();
      const playerWrapper2 = PlayerWrapper.default();
      game.setCurrentPlayer(playerWrapper2);
      game.addPlayer(playerWrapper2);
      game.renderer.debugUI.addButton({
        title: "Player",
        label: "Player"
      }).on("click", () => {
        game.setCurrentPlayer(playerWrapper2);
      });
    }
    if (this.keys.get(Key.Left_Click)?.isPressed) {
      let hitScanResult = playerController.shoot();
      if (hitScanResult) {
        playerRenderer?.handleShoot(hitScanResult);
      }
    }
    if (this.keys.get(Key.Reload)?.justReleased) {
      playerRenderer?.handleReload();
    }
    if (this.keys.get(Key.Right_Click)?.justReleased) {
      playerRenderer?.handleZoom();
    }
    for (let k in Key) {
      if (isNaN(Number(k))) {
        const key = Key[k];
        const keyBinding = this.keys.get(key);
        keyBinding?.resetRelease();
      }
    }
  }
  onKeyDown(event) {
    if (event.key.toLowerCase() === " ") this.keys.get(Key.Jump)?.setPressed(true);
    if (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "w") this.keys.get(Key.Forward)?.setPressed(true);
    if (event.key.toLowerCase() === "q" || event.key.toLowerCase() === "a") this.keys.get(Key.Left)?.setPressed(true);
    if (event.key.toLowerCase() === "s") this.keys.get(Key.Backward)?.setPressed(true);
    if (event.key.toLowerCase() === "d") this.keys.get(Key.Right)?.setPressed(true);
    if (event.key.toLowerCase() === "r") this.keys.get(Key.Reload)?.setPressed(true);
    if (event.key.toLowerCase() === "shift") this.keys.get(Key.Shift)?.setPressed(true);
    if (event.key.toLowerCase() === "e") this.keys.get(Key.Use)?.setPressed(true);
    if (event.key.toLowerCase() === "&" || event.key.toLowerCase() === "1") this.keys.get(Key.One)?.setPressed(true);
    if (event.key.toLowerCase() === "é" || event.key.toLowerCase() === "2") this.keys.get(Key.Two)?.setPressed(true);
    if (event.key.toLowerCase() === '"' || event.key.toLowerCase() === "3") this.keys.get(Key.Three)?.setPressed(true);
    if (event.key.toLowerCase() === "'" || event.key.toLowerCase() === "4") this.keys.get(Key.Four)?.setPressed(true);
    if (event.key.toLowerCase() === "(" || event.key.toLowerCase() === "5") this.keys.get(Key.Five)?.setPressed(true);
  }
  onKeyUp(event) {
    if (event.key.toLowerCase() === " ") this.keys.get(Key.Jump)?.onKeyUp();
    if (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "w") this.keys.get(Key.Forward)?.onKeyUp();
    if (event.key.toLowerCase() === "q" || event.key.toLowerCase() === "a") this.keys.get(Key.Left)?.onKeyUp();
    if (event.key.toLowerCase() === "s") this.keys.get(Key.Backward)?.onKeyUp();
    if (event.key.toLowerCase() === "d") this.keys.get(Key.Right)?.onKeyUp();
    if (event.key.toLowerCase() === "r") this.keys.get(Key.Reload)?.onKeyUp();
    if (event.key.toLowerCase() === "shift") this.keys.get(Key.Shift)?.onKeyUp();
    if (event.key.toLowerCase() === "e") this.keys.get(Key.Use)?.onKeyUp();
    if (event.key.toLowerCase() === "&" || event.key.toLowerCase() === "1") this.keys.get(Key.One)?.onKeyUp();
    if (event.key.toLowerCase() === "é" || event.key.toLowerCase() === "2") this.keys.get(Key.Two)?.onKeyUp();
    if (event.key.toLowerCase() === '"' || event.key.toLowerCase() === "3") this.keys.get(Key.Three)?.onKeyUp();
    if (event.key.toLowerCase() === "'" || event.key.toLowerCase() === "4") this.keys.get(Key.Four)?.onKeyUp();
    if (event.key.toLowerCase() === "(" || event.key.toLowerCase() === "5") this.keys.get(Key.Five)?.onKeyUp();
  }
  clickedOnHud(event) {
    return event.target.nodeName !== "BODY";
  }
  onMouseDown(event) {
    if (this.clickedOnHud(event)) return;
    if (event.button === 0) this.keys.get(Key.Left_Click)?.setPressed(true);
    if (event.button === 2) this.keys.get(Key.Right_Click)?.setPressed(true);
  }
  onMouseUp(event) {
    if (this.clickedOnHud(event)) return;
    if (event.button === 0) this.keys.get(Key.Left_Click)?.onKeyUp();
    if (event.button === 2) this.keys.get(Key.Right_Click)?.onKeyUp();
  }
  setCurrentPlayer(playerWrapper) {
    this.playerWrapper = playerWrapper;
  }
}