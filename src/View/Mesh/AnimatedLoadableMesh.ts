import * as THREE from "three";
import { IUpdatable } from "../../Interface/IUpdatable";
import {
  AnimationMarker,
  AnimationMarkerDelimiter,
} from "../../Interface/utils";
import { GlobalLoadingManager } from "./GlobalLoadingManager";
import { LoadableMesh } from "./LoadableMesh";

export class AnimatedLoadableMesh extends LoadableMesh implements IUpdatable {
  public mixer!: THREE.AnimationMixer;
  protected lastAnimationDuration!: number;
  public animations = new Map<string, AnimationMarkerDelimiter>();
  private currentAnimIsLoop = false;
  private currentAnimIsInterrompable = false;
  private currentAnim!: AnimationMarkerDelimiter;
  constructor(path: string, key: string) {
    super(path, key);
  }
  update(dt: number): void {
    if (
      this.lastAnimationDuration &&
      this.mixer.time < this.lastAnimationDuration
    ) {
      this.mixer.update(dt);
    } else if (this.currentAnimIsLoop) {
      console.log("Play animation delimiter");
      this.playAnimationDelimiter(this.currentAnim);
    }
  }
  protected setAnimations(markers: Map<string, AnimationMarkerDelimiter>) {
    this.animations = markers;
  }
  public async load(): Promise<void> {
    await super.load();
    const fileName = this.path.split(".")[0];
    const json: any = await GlobalLoadingManager.loadJson(`${fileName}.json`);
    if (!json) return;
    const markers: Array<AnimationMarker> = json.markers;
    const animationMarkers = new Map<string, AnimationMarkerDelimiter>();
    for (let i = 0; i < markers.length; i++) {
      const marker: AnimationMarker = markers[i];
      const rawName = marker.name;
      // Name should be like this:
      // Reload_Start
      // Reload_End
      const content = rawName.split("_");
      const name = content[0];
      const state = content[1];
      if (this.animations.has(name)) {
        const animationDelimiter: AnimationMarkerDelimiter | undefined =
          this.animations.get(name);
        animationDelimiter![state] = marker;
      } else {
        const animationDelimiter: AnimationMarkerDelimiter = {
          name: name,
          Start: undefined,
          End: undefined,
        };
        animationDelimiter[state] = marker;

        this.animations.set(name, animationDelimiter);
      }
    }
  }

  public clone(): AnimatedLoadableMesh {
    const loadableMesh = new AnimatedLoadableMesh(this.path, this.key);
    loadableMesh.setMesh(this.cloneMesh());
    loadableMesh.setAnimations(this.animations);
    return loadableMesh;
  }

  // Loop: repeat
  // selfInterrompable: Possibility of the animation to stop itself to play again from 0
  public playAnimation(
    animationName: string,
    loop = false,
    selfInterrompable = true
  ) {
    const animationMarker: AnimationMarkerDelimiter =
      this.animations.get(animationName)!;

    if (!animationMarker) {
      console.log(`${animationName} animation doesn't exist on ${this.key}`);
      return;
    }
    if (!selfInterrompable && animationMarker.name === this.currentAnim.name) {
      return;
    }

    this.mixer.stopAllAction();
    this.currentAnimIsLoop = loop;
    this.currentAnimIsInterrompable = selfInterrompable;

    this.playAnimationDelimiter(animationMarker);
  }
  public playAnimationDelimiter(animationMarker: AnimationMarkerDelimiter) {
    this.currentAnim = animationMarker;

    const clips = this.mesh.animations;
    this.lastAnimationDuration =
      animationMarker!["End"]!.time - animationMarker!["Start"]!.time;
    const start = Math.abs(animationMarker!["Start"]!.time);
    this.mixer.time = 0;
    this.mixer.timeScale = 1.5;
    for (let i = 0; i < clips.length; i++) {
      const action = this.mixer.clipAction(clips[i]);
      action.loop = THREE.LoopOnce;
      action.time = start;
      action.clampWhenFinished = true;
      action.play();
    }
  }

  public init() {
    super.init();
    this.initAnimation();
  }
  public initAnimation() {
    this.mixer = new THREE.AnimationMixer(this.mesh);
  }
  public playAllAnimation() {
    const clips = this.mesh.animations;
    this.mixer.stopAllAction();
    clips.forEach((clip) => {
      const action = this.mixer.clipAction(clip);
      action.loop = THREE.LoopOnce;
      action.play();
    });
  }
}
