import * as THREE from "three";
import { Vector3D } from "../../Core/Vector.js";
import { PlayerRenderer } from "../../View/Renderer/PlayerRenderer/PlayerRenderer.js";
export class ViewmodelRenderer {
  camera;
  ambientLight;
  scene;
  spotLight;
  constructor() {
    this.ambientLight = new THREE.AmbientLight();
    this.scene = new THREE.Scene();
    this.scene.add(this.ambientLight);
    this.spotLight = new THREE.SpotLight(16777215, 1);
    this.spotLight.castShadow = true;
    this.spotLight.position.setY(1);
    this.spotLight.lookAt(Vector3D.ZERO());
    this.scene.add(this.spotLight);
    this.camera = PlayerRenderer.createCamera(60);
    this.scene.add(this.camera);
  }
  addDebugUI(renderer) {
    renderer.debugUI.addMesh(this.camera);
  }
  render(renderer, dt) {
    renderer.clearDepth();
    renderer.render(this.scene, this.camera);
    renderer.camera.updateProjectionMatrix();
    this.spotLight.target.rotation.z += dt * 100;
  }
}