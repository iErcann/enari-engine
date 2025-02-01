import * as THREE from "three";
import { ParticleManager } from "../../View/Particle/ParticleManager.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { Vector3D } from "../../Core/Vector.js";
import { SceneLighting } from "../../View/Renderer/SceneLighting.js";
import { ViewmodelRenderer } from "../../View/Renderer/ViewmodelRenderer.js";
import { PeriodicUpdater } from "../../Core/PeriodicUpdater.js";
import { DebugUI } from "../../View/DebugUI.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { SAOPass } from "three/addons/postprocessing/SAOPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { Pass, FullScreenQuad } from "three/addons/postprocessing/Pass.js";
import { LensDistortionPassGen } from "../../../libs/three-lens-distortion/LensDistortionPassGen.js";
export class Renderer extends THREE.WebGLRenderer {
  scene;
  fps;
  camera;
  viewmodelRenderer;
  currentPlayer;
  particleManager;
  debugUI;
  renderingConfig;
  composer;
  players;
  debugCamera;
  debugCameraPosition;
  sky;
  sceneLighting;
  constructor(players) {
    super({ antialias: false });
    this.autoClear = false;
    this.shadowMap.autoUpdate = false;
    this.players = players;
    this.scene = new THREE.Scene();
    this.viewmodelRenderer = new ViewmodelRenderer();
    this.particleManager = new ParticleManager(this.scene);
    this.debugUI = new DebugUI();
    this.debugUI.addMonitor(this.info.render, "calls");
    this.setSize(window.innerWidth, window.innerHeight);
    this.setRenderingConfig();
    this.onWindowResize = this.onWindowResize.bind(this);
    this.setPixelRatio(this.renderingConfig.resolution);
    this.fpsUpdater = new PeriodicUpdater(
      1e3,
      (dt) => {
        this.updateFpsScreenText(dt);
      },
      this
    );
    window.addEventListener("resize", this.onWindowResize, false);
    document.body.appendChild(this.domElement);
  }
  createDebugCamera() {
    this.debugCamera = new THREE.PerspectiveCamera(90);
    this.debugCamera.aspect = window.innerWidth / window.innerHeight;
    this.debugCamera.updateProjectionMatrix();
    this.debugCameraPosition = new Vector3D(-5.4, 1, 0);
    this.debugUI.addVector(this.debugCameraPosition, "Second Camera", new Vector3D(10, 10, 10));
  }
  setCurrentPlayer(player) {
    this.setCamera(player.renderer.camera);
    if (this.renderingConfig.hasPostProcess) {
      this.addPostProcess();
    }
    if (!this.currentPlayer) {
      this.sceneLighting = new SceneLighting(this);
      if (this.renderingConfig.debugCamera) {
        this.createDebugCamera();
      }
    }
    this.currentPlayer = player;
  }
  createScissor(viewleft, viewbottom, viewwidth, viewheight) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const left = Math.floor(windowWidth * viewleft);
    const bottom = Math.floor(windowHeight * viewbottom);
    const width = Math.floor(windowWidth * viewwidth);
    const height = Math.floor(windowHeight * viewheight);
    this.setViewport(left, bottom, width, height);
    this.setScissor(left, bottom, width, height);
    this.setScissorTest(true);
  }
  addPostProcess() {
    this.composer = new EffectComposer(this);
    const postProcessFolder = this.debugUI.addFolder({ title: "Post Process" });
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloomFolder = postProcessFolder.addFolder({ title: "Bloom" });
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.71;
    bloomPass.strength = 0.2;
    bloomPass.radius = 0.3;
    bloomFolder.addInput(bloomPass, "threshold", { min: 0.2, max: 1.5, step: 0.01 });
    bloomFolder.addInput(bloomPass, "strength", { min: 0, max: 3 });
    bloomFolder.addInput(bloomPass, "radius", { min: 0, max: 1 });
    this.composer.addPass(bloomPass);
    const dofParams = {
      focus: 0.4,
      aperture: 0.125,
      maxblur: 1e-3
    };
    const bokehPass = new BokehPass(this.scene, this.camera, dofParams);
    const ssaoFolder = postProcessFolder.addFolder({ title: "SSAO" });
    const ssaoPass = new SAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
    ssaoPass.kernelRadius = 0.5;
    ssaoPass.minDistance = 1e-3;
    ssaoPass.maxDistance = 0.081;
    ssaoFolder.addInput(ssaoPass, "kernelRadius", { min: 0, max: 32 });
    ssaoFolder.addInput(ssaoPass, "minDistance", { min: 1e-3, max: 0.02 });
    ssaoFolder.addInput(ssaoPass, "maxDistance", { min: 0.01, max: 0.3 });
    this.composer.addPass(ssaoPass);
    const lensDistortionFolder = postProcessFolder.addFolder({ title: "Lens Distortion" });
    const LensDistortionPass = new LensDistortionPassGen({ THREE, Pass, FullScreenQuad });
    const params = {
      distortion: new THREE.Vector2(0.24, 0.24),
      principalPoint: new THREE.Vector2(0, 0),
      focalLength: new THREE.Vector2(0.64, 0.64),
      skew: 0
    };
    const lensDistortionPass = new LensDistortionPass(params);
    lensDistortionFolder.addInput(params, "distortion", {
      x: { min: -1, max: 1 },
      y: { min: -1, max: 1, inverted: true }
    });
    lensDistortionFolder.addInput(params, "principalPoint", {
      x: { min: -0.5, max: 0.5 },
      y: { min: -0.5, max: 0.5, inverted: true }
    });
    lensDistortionFolder.addInput(params, "focalLength", {
      x: { min: -1, max: 1 },
      y: { min: -1, max: 1, inverted: true }
    });
    lensDistortionFolder.addInput(params, "skew", { min: -Math.PI / 2, max: Math.PI / 2 });
    this.debugUI.on("change", () => lensDistortionPass.skew = params.skew);
    this.composer.addPass(lensDistortionPass);
  }
  setSkybox() {
    const loader = new THREE.TextureLoader();
    const texture = loader.load("skybox - Copy.png", () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(this, texture);
      this.scene.background = rt.texture;
    });
  }
  setRenderingConfig() {
    this.renderingConfig = {
      resolution: 1,
      hasParticle: true,
      hasPostProcess: false,
      hasLight: true,
      hasShadow: true,
      debugCamera: false,
      updateViewmodel: true,
      showViewmodel: true,
      legacyViewmodel: true
    };
    const folder = this.debugUI.addFolder({ title: "Rendering config" });
    const particles = this.debugUI.addInput(this.renderingConfig, "hasParticle").on("change", () => {
      this.sceneLighting.applyRenderingConfig();
    });
    const process = this.debugUI.addInput(this.renderingConfig, "hasPostProcess").on("change", () => {
      if (this.renderingConfig.hasPostProcess && !this.composer) {
        this.addPostProcess();
      }
    });
    const shadow = this.debugUI.addInput(this.renderingConfig, "hasShadow").on("change", () => {
      this.sceneLighting.enableShadow(this.renderingConfig.hasShadow);
    });
    const light = this.debugUI.addInput(this.renderingConfig, "hasLight").on("change", () => {
      if (this.renderingConfig.hasLight && !this.sceneLighting.sunLight) {
      }
    });
    const debugCam = this.debugUI.addInput(this.renderingConfig, "debugCamera").on("change", () => {
      if (this.renderingConfig.debugCamera && !this.debugCamera) {
        this.createDebugCamera();
      }
    });
    const viewmodel = this.debugUI.addInput(this.renderingConfig, "updateViewmodel");
    const viewmodel2 = this.debugUI.addInput(this.renderingConfig, "showViewmodel");
    folder.add(particles);
    folder.add(process);
    folder.add(light);
    folder.add(shadow);
    folder.add(debugCam);
    folder.add(viewmodel);
    folder.add(viewmodel2);
  }
  setCamera(camera) {
    this.camera = camera;
    this.scene.add(camera);
  }
  onWindowResize() {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.setPixelRatio(this.renderingConfig.resolution);
      this.camera.updateProjectionMatrix();
      this.viewmodelRenderer.camera.aspect = width / height;
      this.viewmodelRenderer.camera.updateProjectionMatrix();
      this.setSize(width, height);
      this.update();
    }
  }
  addToRenderer(gameObject, viewmodel = false) {
    if (!viewmodel) this.scene.add(gameObject);
    else this.viewmodelRenderer.scene.add(gameObject);
  }
  fpsUpdater;
  updateFps(dt) {
    this.fps = Math.floor(1 / dt);
  }
  updateFpsScreenText(dt) {
    this.updateFps(dt);
    document.getElementById("fps").innerText = this.fps + " FPS";
  }
  update(dt = 1 / 60) {
    if (!this.camera) {
      throw new Error("No camera to render to!");
    }
    this.currentPlayer.cameraManager.update(dt);
    this.fpsUpdater.update(dt);
    if (this.renderingConfig.hasParticle) {
      this.particleManager.update(dt);
    }
    this.sceneLighting.update(dt);
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].renderer) {
        this.players[i].renderer?.update(dt);
      } else {
        console.log(this.players[i] + "doesn't have a PlayerRenderer");
      }
    }
    if (this.renderingConfig.debugCamera) {
      this.createScissor(0, 0, 1, 1);
    }
    if (this.renderingConfig.hasPostProcess) {
      this.composer.render();
    } else {
      this.render(this.scene, this.camera);
    }
    if (this.renderingConfig.showViewmodel && !this.renderingConfig.legacyViewmodel) {
      this.viewmodelRenderer.render(this, dt);
    }
    if (this.renderingConfig.debugCamera) {
      this.createScissor(0, 0.5, 0.2, 0.2);
      this.debugCamera.position.copy(this.currentPlayer.player.position).add(this.debugCameraPosition);
      this.debugCamera.lookAt(this.currentPlayer.player.position);
      this.render(this.scene, this.debugCamera);
    }
  }
}