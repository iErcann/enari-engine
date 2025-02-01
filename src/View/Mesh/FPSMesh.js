import { Vector3D } from "../../Core/Vector.js";
import { AnimatedLoadableMesh } from "../../View/Mesh/AnimatedLoadableMesh.js";
export class FPSMesh extends AnimatedLoadableMesh {
  hasLight = false;
  viewmodelOffset;
  constructor(path, key, viewmodelOffset = Vector3D.ZERO()) {
    super(path, key);
    this.viewmodelOffset = viewmodelOffset;
  }
  update(dt) {
    super.update(dt);
  }
  initMesh() {
    this.mesh.scale.multiplyScalar(-1);
    this.mesh.traverse((child) => {
      child.castShadow = false;
      child.receiveShadow = true;
      child.frustumCulled = false;
    });
  }
  setHandMaterial() {
  }
  init() {
    super.init();
    this.initMesh();
  }
  addLight(light) {
    if (!this.hasLight) {
      this.hasLight = true;
      this.mesh.add(light);
    }
  }
  clone() {
    const clone = new FPSMesh(this.path, this.key, this.viewmodelOffset);
    clone.setMesh(this.cloneMesh());
    clone.setAnimations(this.animations);
    return clone;
  }
}

