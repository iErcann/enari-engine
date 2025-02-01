import { PlayerRenderer } from "../../../View/Renderer/PlayerRenderer/PlayerRenderer.js";
import { Vector3D } from "../../../Core/Vector.js";
import { Game } from "../../../Game.js";
export class ThirdPersonRenderer extends PlayerRenderer {
  handleJump() {
    this.tpsMesh.playAnimation("Jump");
  }
  removeMesh() {
    throw new Error("Method not implemented.");
  }
  show() {
    this.tpsMesh.mesh.visible = true;
  }
  hide() {
    this.tpsMesh.mesh.visible = false;
  }
  handleReload() {
  }
  handleWeaponSwitch() {
  }
  setMesh(mesh) {
    this.tpsMesh = mesh;
    this.tpsMesh.init();
    this.addToRenderer();
  }
  tpsMesh;
  handleZoom() {
    let fov = this.playerCameraManager.camera.fov;
    const zoom = [20, 50];
    if (fov === zoom[0]) {
      fov = this.baseFov;
    } else if (fov === zoom[1]) {
      fov = zoom[0];
    } else {
      fov = zoom[1];
    }
    this.setFov(fov);
  }
  handleShoot(hitscanResult) {
    super.handleShoot(hitscanResult);
  }
  handleMove(moveVector) {
    this.tpsMesh.playAnimation("Walking", true);
  }
  update(dt) {
    this.tpsMesh.mesh.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
    this.tpsMesh.mesh.rotation.y = Math.atan2(this.player.lookingDirection.x, this.player.lookingDirection.z);
    this.tpsMesh.update(dt);
    if (this.player.velocity.distanceTo(Vector3D.ZERO()) < 0.1) {
      this.tpsMesh.playAnimation("Wave", true);
    }
  }
  constructor(player) {
    super(player);
    const mesh = Game.getInstance().globalLoadingManager.loadableMeshs.get("ThirdPersonMesh").clone();
    this.setMesh(mesh);
  }
  addToRenderer() {
    this.game.addToRenderer(this.tpsMesh.mesh);
  }
}

