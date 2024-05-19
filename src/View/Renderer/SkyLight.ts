import { Sky } from 'three/examples/jsm/objects/Sky.js'
import * as THREE from 'three'
import { Vector3D } from '../../Core/Vector'
import { IUpdatable } from '../../Interface/IUpdatable.js'
import { Renderer } from './Renderer.js'
import { PeriodicUpdater } from '../../Core/PeriodicUpdater.js'

export class SkyLight extends THREE.Object3D implements IUpdatable {
  public sunPosition: Vector3D = Vector3D.ZERO()
  private directionalLight: THREE.DirectionalLight
  private hemiLight: THREE.HemisphereLight
  private renderer: Renderer
  private sky!: Sky

  constructor(renderer: Renderer) {
    super()
    this.renderer = renderer
    const ambientLight = new THREE.AmbientLight()
    ambientLight.intensity = 0.78
    this.renderer.addToRenderer(ambientLight)

    // Ambient light
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
    this.hemiLight.color.setHSL(0.59, 0.4, 0.6)
    this.hemiLight.groundColor.setHSL(0.095, 0.2, 0.75)
    this.renderer.addToRenderer(this.hemiLight)

    const lightInput = this.renderer.debugUI.addInput(this.hemiLight, 'intensity', {
      min: 0,
      max: 10,
    })
    this.renderer.debugUI.lightFolder.add(lightInput)

    this.directionalLight = new THREE.DirectionalLight(0xfeaaee, 6.2)
    this.directionalLight.shadow.camera.near = 0.1
    this.directionalLight.shadow.camera.far = 500
    this.directionalLight.shadow.camera.right = 150
    this.directionalLight.shadow.camera.left = -150
    this.directionalLight.shadow.camera.top = 150
    this.directionalLight.shadow.camera.bottom = -150
    this.directionalLight.shadow.mapSize.width = 1024
    this.directionalLight.shadow.mapSize.height = 1024
    this.directionalLight.shadow.radius = 1
    this.directionalLight.shadow.bias = -0.001
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.autoUpdate = false
    const dirLight = this.renderer.debugUI.addInput(this.directionalLight, 'intensity', {
      min: 0,
      max: 10,
    })
    this.renderer.debugUI.lightFolder.add(dirLight)

    this.renderer.addToRenderer(this.directionalLight)
    this.renderer.addToRenderer(this.directionalLight.target)

    this.lightUpdater = new PeriodicUpdater(
      1000,
      () => {
        this.lightUpdate()
      },
      this
    )
    this.setSky()
  }

  private setSky(): void {
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_sky.html
    this.sky = new Sky()

    this.sky.scale.setScalar(450000)

    this.renderer.addToRenderer(this.sky)

    const effectController = {
      turbidity: 1,
      rayleigh: 0.09,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 64,
      azimuth: 180,
      exposure: this.renderer.toneMappingExposure,
    }
    const sun = new Vector3D()
    const guiChanged = (): void => {
      const uniforms = this.sky.material.uniforms
      uniforms['turbidity'].value = effectController.turbidity
      uniforms['rayleigh'].value = effectController.rayleigh
      uniforms['mieCoefficient'].value = effectController.mieCoefficient
      uniforms['mieDirectionalG'].value = effectController.mieDirectionalG

      const degToRad = (degrees) => {
        var pi = Math.PI
        return degrees * (pi / 180)
      }

      const phi = degToRad(90 - effectController.elevation)
      const theta = degToRad(effectController.azimuth)

      sun.setFromSphericalCoords(1, phi, theta)

      uniforms['sunPosition'].value.copy(sun)

      this.renderer.toneMappingExposure = effectController.exposure
      //this.render(this.scene, this.camera);
    }

    const folder = this.renderer.debugUI.addFolder({ title: 'Sky shader' })
    folder
      .addInput(effectController, 'turbidity', {
        min: 0,
        max: 20,
      })
      .on('change', guiChanged)
    folder
      .addInput(effectController, 'rayleigh', {
        min: 0,
        max: 4,
      })
      .on('change', guiChanged)
    folder
      .addInput(effectController, 'mieCoefficient', {
        min: 0,
        max: 0.1,
      })
      .on('change', guiChanged)
    folder
      .addInput(effectController, 'mieDirectionalG', {
        min: 0,
        max: 1,
      })
      .on('change', guiChanged)
    folder
      .addInput(effectController, 'elevation', {
        min: 0,
        max: 90,
      })
      .on('change', guiChanged)
    folder
      .addInput(effectController, 'azimuth', {
        min: -180,
        max: 180,
      })
      .on('change', guiChanged)
    folder
      .addInput(effectController, 'exposure', {
        min: 0,
        max: 1,
      })
      .on('change', guiChanged)
    guiChanged()
  }
  private lightUpdater: PeriodicUpdater

  private lightUpdate(): void {
    this.directionalLight.shadow.needsUpdate = true
    this.position.copy(this.renderer.camera.position)
    const pos = this.renderer.camera.position.clone()
    this.directionalLight.position.set(pos.x, pos.y + 100, pos.z)
    this.directionalLight.position.add(new Vector3D(-40, 0, -40))
    this.directionalLight.target.position.set(pos.x, pos.y, pos.z)
  }
  public update(dt: number): void {
    this.lightUpdater.update(dt)
  }
}
