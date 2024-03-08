import { IUpdatable } from "../../Interface/IUpdatable";
import * as THREE from "three";
import ParticleSystem, { CustomRenderer, Emitter } from "three-nebula";
import { Game } from "../../Game";
import { FPSRenderer } from "../Renderer/PlayerRenderer/FPSRenderer";

export class ParticleManager extends ParticleSystem implements IUpdatable {
  constructor(scene: THREE.Scene) {
    super();
    this.addScene(scene);
  }
  addScene(scene: THREE.Scene) {
    const renderer = new CustomRenderer();
    const createSprite = () => {
      var map = new THREE.TextureLoader().load("muzzle.png");
      var material = new THREE.SpriteMaterial({
        map: map,
        color: 0x22334455,
        blending: THREE.AdditiveBlending,
        fog: true,
      });
      return new THREE.Sprite(material);
    };
    const sprite = createSprite();
    renderer.onParticleCreated = function (p) {
      const game = Game.getInstance();
      const bulletMesh =
        game.globalLoadingManager.loadableMeshs.get("Bullet")!.mesh;
      const fpsRenderer = game.currentPlayer.renderer as FPSRenderer;
      const fpsMesh = fpsRenderer.fpsMesh;
      const offset = fpsRenderer.weaponOffset;
      p.target = this.targetPool.get(bulletMesh);
      p.target.position.set(1, -1, -2);
      p.target.scale.set(0.04, 0.04, 0.04);
      // TODO: fix heap size memory
      fpsMesh.mesh.add(p.target);
    };

    renderer.onParticleUpdate = function (p) {
      //p.target.position.copy(pos.add(player.lookingDirection.clone().multiplyScalar(4)).add(p.position));
      p.target.position.add(p.position);
      p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
    };

    renderer.onParticleDead = function (p) {
      const game = Game.getInstance();
      this.targetPool.expire(p.target);
      //scene.remove(p.target);
      const mesh = (game.currentPlayer.renderer as FPSRenderer).fpsMesh.mesh;
      mesh.remove(p.target);
      p.target = null;
    };
    super.addRenderer(renderer);
  }
  public addParticleEmitter(emitter: Emitter) {
    super.addEmitter(emitter);
  }
  update(dt: number): void {
    super.update(dt);
  }
}
