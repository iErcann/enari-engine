import CSM from "../LightExtra/CSM.js";
import { Renderer } from "./Renderer.js";
import * as THREE from "three";
import { IUpdatable } from "../../Interface/IUpdatable";
import { SkyLight } from "./SkyLight.js";
import { FallingParticle } from "../Mesh/FallingParticle.js";
import { Vector3D } from "../../Core/Vector";
import { PeriodicUpdater } from "../../Core/PeriodicUpdater";

export class SceneLighting implements IUpdatable {
  public renderer: Renderer;
  public sunLight!: CSM;
  public sky: SkyLight;
  public particle!: FallingParticle;
  private shadowUpdater: PeriodicUpdater;
  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // THREE.ACESFilmicToneMapping; // No tonemap
    this.renderer.toneMappingExposure = 1;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.setClearColor(0xcccccc);
    this.shadowUpdater = new PeriodicUpdater(
      1000,
      () => {
        this.renderer.shadowMap.needsUpdate = true;
      },
      this
    );
    this.enableShadow(this.renderer.renderingConfig.hasShadow);
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.debugUI.addInput(this.renderer, "outputEncoding", {
      view: "list",
      label: "Encoding",
      options: [
        { text: "LinearEncoding", value: THREE.LinearEncoding },
        { text: "sRGBEncoding", value: THREE.sRGBEncoding },
        { text: "GammaEncoding", value: THREE.GammaEncoding },
        { text: "RGBEEncoding", value: THREE.RGBEEncoding },
        { text: "LogLuvEncoding", value: THREE.LogLuvEncoding },
        { text: "RGBM7Encoding", value: THREE.RGBM7Encoding },
        { text: "RGBDEncoding", value: THREE.RGBDEncoding },
        { text: "BasicDepthPacking", value: THREE.BasicDepthPacking },
        { text: "RGBADepthPacking", value: THREE.RGBADepthPacking },
      ],
      value: THREE.LinearEncoding,
    });
    this.renderer.debugUI.addInput(this.renderer, "toneMappingExposure");
    this.sky = new SkyLight(renderer);
    this.applyRenderingConfig();
    this.renderer.debugUI.addInput(this.renderer, "gammaFactor");
    for (let i = 0; i < 1; i++) {
      const p = new THREE.SpotLight(0xffffff, 3);
      p.position.copy(new Vector3D(0, 0, 0));
      this.renderer.addToRenderer(p);
    }
    /*
        for (let i = 0; i < 11; i++) {
            const fakeSpot = new FakeSpotLight({
                position: new Vector3D(Math.random() * 500, Math.random() * 10, Math.random() * 500),
                rotation: new Vector3D(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI).toEuler(),
                radius: Math.random() * 10 + 10,
                height: Math.random() * 16 + 10,

            });
            this.renderer.addToRenderer(fakeSpot)
        }

          const fakeSpot = new FakeSpotLight({
            position: Vector3D.ZERO(),
            radius: Math.random() * 10 + 10,
            height: Math.random() * 16 + 10,

        });
        this.renderer.addToRenderer(fakeSpot);
        fakeSpot.addToDebugUI(this.renderer.debugUI);
 */
  }
  public applyRenderingConfig() {
    if (this.renderer.renderingConfig.hasParticle) {
      if (!this.particle) {
        this.particle = new FallingParticle({
          count: 10000,
          size: 3,
          sizeVariation: false,
          fallDirection: new Vector3D(-0.1, -0.4, -0.1),
          spawnRadius: 500,
          speed: 100,
        });
        this.renderer.addToRenderer(this.particle);
      }
    }
    if (this.particle) {
      this.particle.setEnabled(this.renderer.renderingConfig.hasParticle);
    }
  }
  public enableShadow(enabled: boolean) {
    this.renderer.shadowMap.enabled = enabled;
    this.renderer.scene.traverse((child: any) => {
      if (child.material) {
        child.material.needsUpdate = true;
      }
    });
  }
  update(dt: number): void {
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
