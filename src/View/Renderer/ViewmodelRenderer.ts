import * as THREE from 'three'
import { Vector3D } from '../../Core/Vector'
import { PlayerRenderer } from './PlayerRenderer/PlayerRenderer'
import { Renderer } from './Renderer'

export class ViewmodelRenderer {
  public camera: THREE.PerspectiveCamera
  private ambientLight: THREE.AmbientLight
  public scene: THREE.Scene
  private spotLight: THREE.SpotLight

  constructor() {
    this.ambientLight = new THREE.AmbientLight()
    this.scene = new THREE.Scene()
    this.scene.add(this.ambientLight)

    this.spotLight = new THREE.SpotLight(0xffffff, 1)
    this.spotLight.castShadow = true
    this.spotLight.position.setY(1)
    this.spotLight.lookAt(Vector3D.ZERO())
    this.scene.add(this.spotLight)

    this.camera = PlayerRenderer.createCamera(60)
    this.scene.add(this.camera)
  }

  public addDebugUI(renderer: Renderer) {
    renderer.debugUI.addMesh(this.camera)
  }

  public render(renderer: Renderer, dt: number) {
    renderer.clearDepth()
    renderer.render(this.scene, this.camera)
    renderer.camera.updateProjectionMatrix()
    this.spotLight.target.rotation.z += dt * 100
  }
}
