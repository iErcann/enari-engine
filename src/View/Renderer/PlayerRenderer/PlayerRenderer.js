import * as THREE from "three";
import { Vector3D } from "../../../Core/Vector.js";
import { Game } from "../../../Game.js";
export class PlayerRenderer {
  playerCameraManager;
  camera;
  debugCollisionLine;
  debugCollisionMesh;
  player;
  game;
  showDebug = false;
  showDebugHitscan = false;
  baseFov = 90;
  setCameraManager(cameraManager) {
    this.playerCameraManager = cameraManager;
  }
  static createDefaultCamera() {
    return this.createCamera(100);
  }
  static createCamera(fov) {
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1e3);
    return camera;
  }
  constructor(player) {
    this.camera = PlayerRenderer.createDefaultCamera();
    this.player = player;
    this.game = Game.getInstance();
    if (this.showDebug) {
      this.createDebugMeshs();
      const debugUI = this.game.renderer.debugUI;
      debugUI.addSeparator();
      const folder = debugUI.playerFolder.addFolder({ title: "Player position" });
      const x = debugUI.addMonitor(this.player.position, "x", {
        multiline: true,
        lineCount: 1
      });
      const y = debugUI.addMonitor(this.player.position, "y", {
        multiline: true,
        lineCount: 1
      });
      const z = debugUI.addMonitor(this.player.position, "z", {
        multiline: true,
        lineCount: 1
      });
      const magn = debugUI.addMonitor(this.player, "currentSpeedMagnitude", {
        title: "Player current speed magnitude"
      });
      const deceleration = debugUI.addVector(this.player.deceleration, "Player deceleration", new Vector3D(2, 2, 2));
      folder.add(x);
      folder.add(y);
      folder.add(z);
      folder.add(magn);
      folder.add(deceleration);
      debugUI.addSeparator();
    }
  }
  createHitscanLine() {
    const points = [];
    const { from, to } = this.player.createHitscanPoints();
    points.push(from);
    points.push(to);
    const material = new THREE.LineBasicMaterial({
      color: 255,
      linewidth: 100
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    this.game.addToRenderer(line);
  }
  createDebugMeshs() {
    let { initialLocalPos, size } = this.player.getGroundRaycastProperties();
    const points = [];
    points.push(new Vector3D(initialLocalPos.x, initialLocalPos.y, initialLocalPos.z));
    points.push(new Vector3D(initialLocalPos.x, initialLocalPos.y - size, initialLocalPos.z));
    const material = new THREE.LineBasicMaterial({
      color: 2302975,
      linewidth: 1e3
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.debugCollisionLine = new THREE.Line(geometry, material);
    this.game.addToRenderer(this.debugCollisionLine);
    {
      const geometry2 = new THREE.BoxGeometry(
        this.player.capsuleDimension.x,
        this.player.capsuleDimension.y * 2,
        this.player.capsuleDimension.x
      );
      const material2 = new THREE.MeshPhongMaterial({
        color: "#123121",
        wireframe: false
      });
      this.debugCollisionMesh = new THREE.Mesh(geometry2, material2);
      this.debugCollisionMesh.receiveShadow = true;
      this.game.addToRenderer(this.debugCollisionMesh);
    }
  }
  updateDebugMeshs() {
    this.debugCollisionLine.position.copy(this.player.position);
    this.debugCollisionMesh.position.copy(this.player.position);
  }
  update(dt) {
    if (this.showDebug) {
      this.updateDebugMeshs();
    }
  }
  handleShoot(hitscanResult) {
    if (this.showDebugHitscan) {
      this.createHitscanLine();
      if (hitscanResult.hasHit) {
        var dotGeometry = new THREE.BufferGeometry();
        dotGeometry.setAttribute("position", new THREE.Float32BufferAttribute(hitscanResult.hitPosition.toArray(), 3));
        var dotMaterial = new THREE.PointsMaterial({
          size: 0.1,
          color: 251826946
        });
        var dot = new THREE.Points(dotGeometry, dotMaterial);
        Game.getInstance().addToRenderer(dot);
      }
    }
  }
  onEnabled(otherCamera) {
    if (otherCamera) {
      this.camera.rotation.copy(otherCamera.rotation);
    }
    this.show();
  }
  onDisabled() {
    this.hide();
  }
  setFov(fov) {
    ;
    this.camera.fov = fov;
    console.log(this.camera.fov);
  }
  showVariables() {
    const debugUI = Game.getInstance().renderer.debugUI;
  }
}