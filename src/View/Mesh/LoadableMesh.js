import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { GlobalLoadingManager } from "../../View/Mesh/GlobalLoadingManager.js";
export class LoadableMesh {
  path;
  key;
  mesh;
  constructor(path, key) {
    this.path = path;
    this.key = key;
  }
  async load() {
    console.log(this.path);
    const mesh = await GlobalLoadingManager.loadMesh(this.path);
    this.setMesh(mesh);
    this.init();
  }
  register(loadableMeshs) {
    loadableMeshs.set(this.key, this);
  }
  setMesh(mesh) {
    this.mesh = mesh;
  }
  cloneMesh() {
    const original = this.mesh;
    const cloned = SkeletonUtils.clone(original);
    cloned.animations = original.animations;
    return cloned;
  }
  init() {
    const mesh = this.mesh;
    mesh.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }
  clone() {
    const loadableMesh = new LoadableMesh(this.path, this.key);
    loadableMesh.setMesh(this.cloneMesh());
    return loadableMesh;
  }
}