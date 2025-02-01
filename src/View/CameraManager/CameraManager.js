import { Vector2D } from "../../Core/Vector.js";
export class CameraManager {
  camera;
  player;
  isRotating = false;
  rotationAccumulator = 0;
  rotationDelta = new Vector2D(0, 0);
  constructor(player, camera) {
    this.player = player;
    this.camera = camera;
  }
  updateRotationState(dt) {
    if (this.isRotating) {
      if (this.rotationAccumulator >= 300) {
        this.isRotating = false;
        this.rotationAccumulator = 0;
      } else {
        this.rotationAccumulator += dt * 1e3;
      }
    }
  }
  update(dt) {
    this.updateRotationState(dt);
  }
  onMouseMove(event) {
    this.isRotating = true;
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    this.rotationDelta.set(movementX, movementY);
  }
}