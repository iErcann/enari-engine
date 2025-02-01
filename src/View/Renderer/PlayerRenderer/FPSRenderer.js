import * as THREE from "three";
const {
  Alpha,
  Color,
  Emitter,
  Life,
  Gravity,
  ease,
  Mass,
  RadialVelocity,
  RandomDrift,
  Radius,
  Rate,
  Rotate,
  NebulaVector3D = window.Nebula.Vector3D
}  = window.Nebula;
import { PlayerRenderer } from "../../../View/Renderer/PlayerRenderer/PlayerRenderer.js";
import { Vector2D, Vector3D } from "../../../Core/Vector.js";
import { Game } from "../../../Game.js";
import { lerp } from "../../../Core/MathUtils.js";
class SimpleNoise {
  x;
  y;
  z;
  constructor(seed) {
    this.x = Math.sin(seed++) * 1e4;
    this.y = Math.cos(seed++) * 1e4;
    this.z = Math.tan(seed++) * 1e4;
  }
  // Simple pseudo-random noise function
  noise() {
    this.x += 0.1;
    this.y += 0.1;
    this.z += 0.1;
    const value = Math.sin(this.x) * Math.cos(this.y) * Math.sin(this.z);
    return value - Math.floor(value);
  }
}
export class FPSRenderer extends PlayerRenderer {
  handleJump() {
  }
  removeMesh() {
    this.viewmodelCamera.children = [];
  }
  show() {
    this.fpsMesh.mesh.visible = true;
  }
  hide() {
    this.fpsMesh.mesh.visible = false;
  }
  handleWeaponSwitch() {
    this.switchVelocity = 0.05;
    this.fpsMesh.playAnimation("Switch");
  }
  handleReload() {
    this.fpsMesh.playAnimation("Reload");
  }
  switchVelocity = 0;
  viewmodelCamera;
  legacyViewmodel = true;
  fpsMesh;
  recoilEffect = 0;
  bobbingAmount = 8e-4;
  bobbingRestitutionSpeed = 15;
  moveEffect = Vector3D.ZERO();
  tempEmitter;
  weaponOffset = Vector3D.ZERO();
  weaponRotation = Vector3D.ZERO();
  playerLight;
  weaponBobbingAcc = Vector3D.ZERO();
  constructor(player) {
    super(player);
    this.viewmodelCamera = this.legacyViewmodel ? this.camera : this.game.renderer.viewmodelRenderer.camera;
    this.playerLight = new THREE.PointLight(14754081, 10, 100);
    this.playerLight.position.add(new Vector3D(3.565, -5, 1));
    this.playerLight.castShadow = true;
    const fpsMesh = Game.getInstance().globalLoadingManager.loadableMeshs.get("AK47").clone();
    this.initParticleEmitter();
    this.setMesh(fpsMesh);
    this.setFov(this.baseFov);
    if (this.showDebug) {
      const debugUI = this.game.renderer.debugUI;
      const positionFolder = debugUI.addVector(this.weaponOffset, "Viewmodel Offset", new Vector3D(2, 4, 2), 0.01);
      const rotationFolder = debugUI.addVector(
        this.weaponRotation,
        "Viewmodel Rotation",
        new Vector3D(Math.PI, Math.PI, Math.PI)
      );
      const bobbingAmount = debugUI.addInput(this, "bobbingAmount", {
        min: 1e-4,
        max: 0.01
      });
      const bobbingRestitution = debugUI.addInput(this, "bobbingRestitutionSpeed", {
        min: 0.1,
        max: 100
      });
      debugUI.viewmodelFolder.add(positionFolder);
      debugUI.viewmodelFolder.add(rotationFolder);
      debugUI.viewmodelFolder.add(bobbingAmount);
      debugUI.viewmodelFolder.add(bobbingRestitution);
      const pointLightMesh = debugUI.addMesh(this.playerLight, "Player PointLight");
      const pointLightColor = debugUI.addObject(this.playerLight.color, "Player PointLight Color");
      debugUI.playerFolder.add(pointLightMesh);
      debugUI.playerFolder.add(pointLightColor);
    }
  }
  setMesh(mesh) {
    this.removeMesh();
    this.fpsMesh = mesh;
    this.fpsMesh.addLight(this.playerLight);
    this.fpsMesh.init();
    this.addToRenderer();
    this.initViewmodelPosition();
    this.handleWeaponSwitch();
  }
  initViewmodelPosition() {
    this.fpsMesh.mesh.position.add(this.weaponOffset);
  }
  update(dt) {
    super.update(dt);
    if (!this.game.renderer.renderingConfig.updateViewmodel) return;
    this.fpsMesh.update(dt);
    const fpsCameraManager = this.playerCameraManager;
    if (fpsCameraManager.isRotating) {
      const rotationBobbing = new Vector2D(
        fpsCameraManager.rotationDelta.x,
        fpsCameraManager.rotationDelta.y
      ).multiplyScalar(this.bobbingAmount);
      this.weaponBobbingAcc.add(new Vector3D(rotationBobbing.y, rotationBobbing.x, 0));
    }
    const bobbingLerpAmount = Math.min(1, this.bobbingRestitutionSpeed * dt);
    this.weaponBobbingAcc.x = lerp(this.weaponBobbingAcc.x, 0, bobbingLerpAmount);
    this.weaponBobbingAcc.y = lerp(this.weaponBobbingAcc.y, 0, bobbingLerpAmount);
    this.weaponBobbingAcc.z = lerp(this.weaponBobbingAcc.z, 0, bobbingLerpAmount);
    this.fpsMesh.mesh.rotation.x = -this.weaponBobbingAcc.x + this.weaponRotation.x;
    this.fpsMesh.mesh.rotation.y = -this.weaponBobbingAcc.y + this.weaponRotation.y;
    this.fpsMesh.mesh.rotation.z = -this.weaponBobbingAcc.z + this.weaponRotation.z;
    let jumpBobbing = this.player.velocity.y / 2500;
    jumpBobbing = Math.max(-Math.PI / 128, jumpBobbing);
    this.weaponBobbingAcc.x += jumpBobbing;
    const bobbingAmount = Math.sin(this.moveEffect.y) * this.bobbingAmount;
    this.fpsMesh.mesh.position.x = this.weaponOffset.x + this.fpsMesh.viewmodelOffset.x;
    this.fpsMesh.mesh.position.y = this.weaponOffset.y + this.fpsMesh.viewmodelOffset.y + bobbingAmount + Math.sin(this.moveEffect.y) / 50;
    this.fpsMesh.mesh.position.z = this.weaponOffset.z + this.fpsMesh.viewmodelOffset.z + this.recoilEffect;
    if (this.recoilEffect > 0) this.recoilEffect -= dt / 2;
    this.switchVelocity += dt * 4;
    if (this.switchVelocity >= -this.weaponOffset.y / 2) {
      this.switchVelocity -= dt * 4;
      this.switchVelocity = Math.max(0, this.switchVelocity);
    }
  }
  // Left click given by InputManager
  handleShoot(hitscanResult) {
    super.handleShoot(hitscanResult);
    this.fpsMesh.playAnimation("Shoot");
    this.recoilEffect = 0.1;
    this.playerCameraManager.createRecoil();
    this.tempEmitter.setRate(new Rate(1, this.playerCameraManager.player.rateOfFire / 1e3));
    this.tempEmitter.emit();
    setTimeout(() => {
      this.tempEmitter.setRate(new Rate(0, 0));
    }, this.playerCameraManager.player.rateOfFire);
  }
  shakeStrength = 0;
  // Initial shake strength
  shakeFrequency = 10;
  // Frequency of the shaking
  acc = 0;
  // Accumulated time for Perlin noise
  noiseGenerator = new SimpleNoise(0);
  handleMove(moveVector, dt) {
    this.moveEffect = new Vector3D(moveVector.x, this.moveEffect.y + 16 * dt, moveVector.z);
    this.acc += this.shakeFrequency * dt;
    const noise = this.noiseGenerator.noise();
    this.shakeStrength = noise * 2e-3;
    this.camera.rotation.x += Math.cos(this.acc) * this.shakeStrength;
    this.camera.rotation.y += Math.sin(this.acc) * this.shakeStrength;
  }
  initParticleEmitter() {
    const createSprite = () => {
      var map = new THREE.TextureLoader().load("dot.png");
      var material = new THREE.SpriteMaterial({
        map,
        color: 16711680,
        blending: THREE.AdditiveBlending,
        fog: true
      });
      return new THREE.Sprite(material);
    };
    this.tempEmitter = new Emitter();
    this.tempEmitter.addInitializers([
      new Mass(1),
      new Radius(80),
      new Life(2),
      new RadialVelocity(1, new NebulaVector3D(4, 1, 0), 0)
    ]).addBehaviours([
      new RandomDrift(1, 0, 1, 0.05),
      new Alpha(0.1, 0),
      new Rotate("random", "random"),
      new Gravity(0.1),
      new Color(16777215, "random", Infinity, ease.easeOutQuart)
    ]);
    this.game.renderer.particleManager.addParticleEmitter(this.tempEmitter);
  }
  handleZoom() {
    let fov = this.camera.fov;
    const zoom = [20, 50];
    if (fov === zoom[0]) {
      fov = this.baseFov;
    } else if (fov === zoom[1]) {
      fov = zoom[0];
    } else {
      fov = zoom[1];
    }
    this.setFov(fov);
    this.viewmodelCamera.fov = fov;
  }
  addToRenderer() {
    this.viewmodelCamera.add(this.fpsMesh.mesh);
  }
}