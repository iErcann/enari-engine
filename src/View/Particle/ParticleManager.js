import * as THREE from "three";

import ParticleSystem, { CustomRenderer } from 'https://cdn.jsdelivr.net/npm/three-nebula@10.0.3/+esm';


import { Game } from "../../Game.js";
export class ParticleManager extends ParticleSystem {
  constructor(scene) {
    super();
    this.addScene(scene);
  }
  addScene(scene) {

    const renderer = new CustomRenderer();
    // const createSprite = () => {
    //   var map = new THREE.TextureLoader().load("muzzle.png");
    //   var material = new THREE.SpriteMaterial({
    //     map,
    //     color: 573785173,
    //     blending: THREE.AdditiveBlending,
    //     fog: true
    //   });
    //   return new THREE.Sprite(material);
    // };
    // const sprite = createSprite();

    renderer.onParticleCreated = function(p) {
      const game = Game.getInstance();
      const bulletMesh = game.globalLoadingManager.loadableMeshs.get("Bullet").mesh;
      const fpsRenderer = game.currentPlayer.renderer;
      const fpsMesh = fpsRenderer.fpsMesh;
      const offset = fpsRenderer.weaponOffset;
      p.target = this.targetPool.get(bulletMesh);
      p.target.position.set(1, -1, -2);
      p.target.scale.set(0.04, 0.04, 0.04);
      fpsMesh.mesh.add(p.target);
    };
    renderer.onParticleUpdate = function(p) {
      p.target.position.add(p.position);
      p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
    };
    renderer.onParticleDead = function(p) {
      const game = Game.getInstance();
      this.targetPool.expire(p.target);
      const mesh = game.currentPlayer.renderer.fpsMesh.mesh;
      mesh.remove(p.target);
      p.target = null;
    };
    super.addRenderer(renderer);
  }
  addParticleEmitter(emitter) {
    super.addEmitter(emitter);
  }
  update(dt) {
    super.update(dt);
  }
}

