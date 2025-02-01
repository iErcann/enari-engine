import { Controller } from "./Controller.js";
export class PlayerController extends Controller {
  update(dt) {
  }
  constructor(controlledPlayer) {
    super(controlledPlayer);
  }
  getPlayer() {
    return this.controlledPawn;
  }
  updateSpeed(speed) {
    const player = this.getPlayer();
    return speed;
  }
  moveForward(speed, dt) {
    const player = this.getPlayer();
    speed = this.updateSpeed(speed);
    player.moveForward();
  }
  moveBackward(speed, dt) {
    const player = this.getPlayer();
    speed = this.updateSpeed(speed);
    player.moveBackward();
  }
  moveLeft(speed, dt) {
    const player = this.getPlayer();
    speed = this.updateSpeed(speed);
    player.moveLeft();
  }
  moveRight(speed, dt) {
    const player = this.getPlayer();
    speed = this.updateSpeed(speed);
    player.moveRight();
  }
  jump() {
    const player = this.getPlayer();
    const canJump = player.canJump();
    if (canJump) {
      player.jump();
    }
    return canJump;
  }
  shoot() {
    const player = this.getPlayer();
    const canShoot = player.canShoot();
    if (canShoot) {
      return player.shoot();
    }
    return void 0;
  }
}