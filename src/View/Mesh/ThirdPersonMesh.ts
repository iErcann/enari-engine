import { LoadableMesh } from "./LoadableMesh";
import * as THREE from "three";

export class ThirdPersonMesh extends LoadableMesh {
  private baseActions = {
    idle: { weight: 1 },
    walk: { weight: 0 },
    run: { weight: 0 }
  };
  private additiveActions = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 }
  };

  public mixer!: THREE.AnimationMixer;

  constructor() { super("RobotExpressive.glb", "ThirdPersonMesh"); }

  public initAnimation() {
    this.mixer = new THREE.AnimationMixer(this.mesh);
    const animations = this.mesh.animations;
    const numAnimations = animations.length;
    console.log(animations)

    /*     for ( let i = 0; i !== numAnimations; ++ i ) {
          let clip = animations[i];
          console.log(clip.name)
        } */
  }

  public init(): void {
    super.init();
    this.initMesh();
    this.initAnimation();

    /*     const mesh = this.mesh;
    mesh.position.y = 20;
    mesh.scale.set(0.2, 0.2, 0.2);
    mesh.traverse(child => {
      if ((child as any).material) (child as any).material.metalness = 0;
      if ((child as any).isMesh) { child.castShadow = true; }
    }); */
  }
  private initMesh(): void {
    // To fix the wall clipping without 2 layers try to merge the entire mesh and then change zindex
    //this.mesh.scale.set(0.2, 0.2, 0.2);
     this.mesh.scale.set(0.6, 0.6, 0.6);
    
    this.mesh.traverse(child => {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    });
  }

  public async load(): Promise<void> {
    await super.load();

  }
  private lastAnimName!: string;
  public playAnimation(anim: string, repeat: boolean = false): void {
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
  update(dt: number): void {
    this.mixer.update(dt);
  }
  public clone(): ThirdPersonMesh {
    const loadableMesh = new ThirdPersonMesh();
    loadableMesh.setMesh(this.cloneMesh());
    return loadableMesh;
  }
}



