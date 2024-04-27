import * as THREE from "three";
import { Player } from "../../Core/Player";
import { Vector2D, Vector3D } from "../../Core/Vector";
import { Game } from "../../Game";
import { CameraManager } from "./CameraManager";

const PI_2 = Math.PI / 2;
const minPolarAngle = 0; // radians
const maxPolarAngle = Math.PI; // radians
export class FPSCameraManager extends CameraManager {
  private euler = new THREE.Euler(0, 0, 0, "YXZ");
  constructor(player: Player, camera: THREE.PerspectiveCamera) {
    super(player, camera);
    //   this.showDebug()
  }

  public showDebug(): void {
    const helper = new THREE.CameraHelper(this.camera);
    Game.getInstance().addToRenderer(helper);
  }

  public update(dt: number) {
    super.update(dt);
    this.camera.position.set(
      this.player.position.x,
      this.player.position.y + this.player.eyeOffsetY,
      this.player.position.z
    );
    this.player.lookingDirection = this.getDirection();

    // TODO: move the recoil stuff to player and just apply it visually here
    if (this.player.canResetRecoil() && this.recoilIndex > 1) {
      this.recoilIndex--;
    }
  }

  public onMouseMove(event) {
    super.onMouseMove(event);
    var movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    this.euler.setFromQuaternion(this.camera.quaternion);
    this.euler.y -= movementX * 0.0015;
    this.euler.x -= movementY * 0.0015;

    this.euler.x = Math.max(
      PI_2 - maxPolarAngle,
      Math.min(PI_2 - minPolarAngle, this.euler.x)
    );
    this.camera.quaternion.setFromEuler(this.euler);
  }

  public getObject() {
    return this.camera;
  }
  public getDirection(): Vector3D {
    var direction = new Vector3D(0, 0, -1);
    return new THREE.Vector3(0, 0, 0)
      .copy(direction)
      .applyQuaternion(this.camera.quaternion) as Vector3D;
  }
  private yawDirection = -1;
  private recoilIndex = 1;
  private recoilAccumulation = Vector3D.ZERO();
  // f\left(x\right)=cx\exp\left(1-cx\right)
  //https://www.desmos.com/calculator/l9wr4aamzc?lang=fr
  public createRecoil(): void {
    this.yawDirection =
      Math.random() <= 0.1 ? -this.yawDirection : this.yawDirection;

    const pitchDampingFunction = (x): number => {
      const c = 1.2;
      return c * x * Math.exp(1 - c * x);
    };
    const yawDampingFunction = (x): number => {
      const c = 0.6;
      let x2 = 5 - (x % 5);
      return c * x2 * Math.exp(1 - c * x2);
    };
    const pitch = pitchDampingFunction(this.recoilIndex / 2) / 30;
    const yaw = (yawDampingFunction(this.recoilIndex) / 50) * this.yawDirection;
    const recoil = new Vector3D(pitch, yaw, 0);
    this.recoilAccumulation.add(recoil);

    this.camera.rotateX(recoil.x);
    this.camera.rotateY(recoil.y);
    this.recoilIndex++;
    /*     this.camera.rotateX(Math.PI / 100)
    this.camera.rotateY((Math.random() - 1 / 2) * Math.PI / 50) */
  }
}
