import * as THREE from "three";
import { Vector3D } from "../../Core/Vector.js";
export class FallingParticle extends THREE.Object3D {
  geometry;
  material;
  particleSystem;
  count;
  size;
  speed;
  spawnRadius;
  sizeVariation;
  fallDirectionArr;
  static defaultParameter = {
    count: 2e3,
    size: 2,
    sizeVariation: true,
    fallDirection: new Vector3D(-1, -1, -1),
    spawnRadius: 200,
    speed: 1e4
  };
  constructor(params = FallingParticle.defaultParameter) {
    super();
    params = { ...FallingParticle.defaultParameter, ...params };
    this.fallDirectionArr = [params.fallDirection.x, params.fallDirection.y, params.fallDirection.z];
    this.count = params.count;
    this.size = params.size;
    this.spawnRadius = params.spawnRadius;
    this.sizeVariation = params.sizeVariation;
    this.speed = params.speed;
    this.geometry = new THREE.BufferGeometry();
    const uniforms = {
      pointTexture: { value: new THREE.TextureLoader().load("./assets/particle.png") }
    };
    const vertexShader = `
			attribute float size;
			varying vec3 vColor;
			void main() {
				vColor = color;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = size * ( 300.0 / -mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}
        `;
    const fragmentShader = `
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4( vColor, 1.0 );
                gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

            }
        `;
    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
      vertexColors: true
    });
    const positions = Array();
    const colors = Array();
    const sizes = Array();
    const color = new THREE.Color();
    const radius = this.spawnRadius;
    for (let i = 0; i < this.count; i++) {
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      colors.push(i, i, i);
      sizes.push(1);
    }
    this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    this.geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
    this.particleSystem = new THREE.Points(this.geometry, this.material);
    this.attach(this.particleSystem);
  }
  update(dt) {
    const time = Date.now() * 0.01;
    const positions = this.geometry.attributes.position.array;
    for (let i = 0; i < this.count * 3; i += 3) {
      for (let j = 0; j < 3; j++) {
        const isY = j == 2;
        positions[i + j] += dt * this.fallDirectionArr[j] * this.speed;
        const newSpawnPos = isY ? this.spawnRadius / 2 : this.spawnRadius;
        if (positions[i + j] > this.spawnRadius) {
          positions[i + j] = -newSpawnPos;
        } else if (positions[i + j] < -this.spawnRadius) {
          positions[i + j] = newSpawnPos;
        }
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
    if (this.sizeVariation) {
      const sizes = this.geometry.attributes.size.array;
      for (let i = 0; i < this.count; i++) {
        sizes[i] = this.size * (1 + Math.sin(0.1 * i + time * 0.1));
      }
      this.geometry.attributes.size.needsUpdate = true;
    }
  }
  setEnabled(bool) {
    this.particleSystem.visible = bool;
    this.particleSystem.traverse((obj) => obj.visible = bool);
  }
}

