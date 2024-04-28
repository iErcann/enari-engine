import CSM from '../LightExtra/CSM.js'
import { Renderer } from './Renderer.js'
import * as THREE from 'three'
import { IUpdatable } from '../../Interface/IUpdatable'
import { SkyLight } from './SkyLight.js'
import { FallingParticle } from '../Mesh/FallingParticle.js'
import { Vector3D } from '../../Core/Vector'
import { PeriodicUpdater } from '../../Core/PeriodicUpdater'

export class SceneLighting implements IUpdatable {
  public renderer: Renderer
  public sunLight!: CSM
  public sky: SkyLight
  public particle!: FallingParticle
  private shadowUpdater: PeriodicUpdater
  constructor(renderer: Renderer) {
    this.renderer = renderer
    this.renderer.toneMapping = THREE.NoToneMapping
    this.renderer.debugUI.addInput(this.renderer, 'toneMapping', {
      view: 'list',
      label: 'ToneMapping',
      options: [
        { text: 'None', value: THREE.NoToneMapping },
        { text: 'Linear', value: THREE.LinearToneMapping },
        { text: 'Reinhard', value: THREE.ReinhardToneMapping },
        { text: 'Cineon', value: THREE.CineonToneMapping },
      ],
    })
    this.renderer.toneMappingExposure = 1.1
    this.renderer.setClearColor(0xcccccc)
    this.shadowUpdater = new PeriodicUpdater(
      1000,
      () => {
        this.renderer.shadowMap.needsUpdate = true
      },
      this
    )
    this.enableShadow(this.renderer.renderingConfig.hasShadow)
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.debugUI.addInput(this.renderer, 'outputColorSpace', {
      view: 'list',
      label: 'Encoding',
      options: [
        { text: 'LinearEncoding', value: THREE.LinearSRGBColorSpace },
        { text: 'BasicDepthPacking', value: THREE.BasicDepthPacking },
        { text: 'RGBADepthPacking', value: THREE.RGBADepthPacking },
      ],
      value: THREE.SRGBColorSpace,
    })
    this.renderer.debugUI.addInput(this.renderer, 'toneMappingExposure')
    this.sky = new SkyLight(renderer)
    this.applyRenderingConfig()
    for (let i = 0; i < 1; i++) {
      const p = new THREE.SpotLight(0xffffff, 3)
      p.position.copy(new Vector3D(0, 0, 0))
      this.renderer.addToRenderer(p)
    }
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
        })
        //this.renderer.addToRenderer(this.particle)
      }
    }
    if (this.particle) {
      this.particle.setEnabled(this.renderer.renderingConfig.hasParticle)
    }
  }
  public enableShadow(enabled: boolean) {
    this.renderer.shadowMap.enabled = enabled
    this.renderer.scene.traverse((child: any) => {
      if (child.material) {
        child.material.needsUpdate = true
      }
    })
  }
  update(dt: number): void {
    this.sky.update(dt)
    if (this.renderer.renderingConfig.hasParticle) {
      this.particle.update(dt)
    }
    if (this.renderer.renderingConfig.hasLight) {
      if (this.renderer.renderingConfig.hasShadow) {
        this.shadowUpdater.update(dt)
      }
    }
  }
}
