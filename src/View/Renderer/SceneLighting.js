import * as THREE from "three";
import { SkyLight } from "../../View/Renderer/SkyLight.js";
import { FallingParticle } from "../../View/Mesh/FallingParticle.js";
import { Vector3D } from "../../Core/Vector.js";
import { PeriodicUpdater } from "../../Core/PeriodicUpdater.js";
export class SceneLighting {
  renderer;
  sunLight;
  sky;
  particle;
  shadowUpdater;
  constructor(renderer) {
    this.renderer = renderer;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.debugUI.addInput(this.renderer, "toneMapping", {
      view: "list",
      label: "ToneMapping",
      options: [
        { text: "None", value: THREE.NoToneMapping },
        { text: "Linear", value: THREE.LinearToneMapping },
        { text: "Reinhard", value: THREE.ReinhardToneMapping },
        { text: "Cineon", value: THREE.CineonToneMapping }
      ]
    });
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.setClearColor(13421772);
    this.shadowUpdater = new PeriodicUpdater(
      1e3,
      () => {
        this.renderer.shadowMap.needsUpdate = true;
      },
      this
    );
    this.enableShadow(this.renderer.renderingConfig.hasShadow);
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.debugUI.addInput(this.renderer, "outputColorSpace", {
      view: "list",
      label: "Encoding",
      options: [
        { text: "LinearEncoding", value: THREE.LinearSRGBColorSpace },
        { text: "BasicDepthPacking", value: THREE.BasicDepthPacking },
        { text: "RGBADepthPacking", value: THREE.RGBADepthPacking }
      ],
      value: THREE.SRGBColorSpace
    });
    this.renderer.debugUI.addInput(this.renderer, "toneMappingExposure");
    this.sky = new SkyLight(renderer);
    this.applyRenderingConfig();
    for (let i = 0; i < 1; i++) {
      const p = new THREE.SpotLight(16777215, 3);
      p.position.copy(new Vector3D(0, 0, 0));
      this.renderer.addToRenderer(p);
    }
  }
  applyRenderingConfig() {
    if (this.renderer.renderingConfig.hasParticle) {
      if (!this.particle) {
        this.particle = new FallingParticle({
          count: 1e4,
          size: 3,
          sizeVariation: false,
          fallDirection: new Vector3D(-0.1, -0.4, -0.1),
          spawnRadius: 500,
          speed: 100
        });
      }
    }
    if (this.particle) {
      this.particle.setEnabled(this.renderer.renderingConfig.hasParticle);
    }
  }
  enableShadow(enabled) {
    this.renderer.shadowMap.enabled = enabled;
    this.renderer.scene.traverse((child) => {
      if (child.material) {
        child.material.needsUpdate = true;
      }
    });
  }
  update(dt) {
    this.sky.update(dt);
    if (this.renderer.renderingConfig.hasParticle) {
      this.particle.update(dt);
    }
    if (this.renderer.renderingConfig.hasLight) {
      if (this.renderer.renderingConfig.hasShadow) {
        this.shadowUpdater.update(dt);
      }
    }
  }
}