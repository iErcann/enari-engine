import { LoadableMesh } from "../../View/Mesh/LoadableMesh.js";
import * as THREE from "three";
export class ThirdPersonMesh extends LoadableMesh {
  baseActions = {
    idle: { weight: 1 },
    walk: { weight: 0 },
    run: { weight: 0 }
  };
  additiveActions = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 }
  };
  mixer;
  constructor() {
    super("./assets/RobotExpressive.glb", "ThirdPersonMesh");
  }
  initAnimation() {
    this.mixer = new THREE.AnimationMixer(this.mesh);
    const animations = this.mesh.animations;
    const numAnimations = animations.length;
    console.log(animations);
  }
  init() {
    super.init();
    this.initMesh();
    this.initAnimation();
  }
  initMesh() {
    this.mesh.scale.set(0.6, 0.6, 0.6);
    this.mesh.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    });
  }
  async load() {
    await super.load();
  }
  lastAnimName;
  playAnimation(anim, repeat = false) {
    const clip = THREE.AnimationClip.findByName(this.mesh.animations, anim);
    const action = this.mixer.clipAction(clip);
    if (this.lastAnimName == anim && repeat) return;
    if (action) {
      action.reset();
      if (!repeat) {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      }
      this.lastAnimName = anim;
      action.play();
    }
  }
  update(dt) {
    this.mixer.update(dt);
  }
  clone() {
    const loadableMesh = new ThirdPersonMesh();
    loadableMesh.setMesh(this.cloneMesh());
    return loadableMesh;
  }
}

