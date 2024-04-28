import * as THREE from 'three'
import { Vector3D } from '../../Core/Vector'
import { IUpdatable } from '../../Interface/IUpdatable'
import { Renderer } from '../Renderer/Renderer'

export interface FallingParticleParameter {
  count?: number
  size?: number
  sizeVariation?: boolean
  fallDirection?: Vector3D
  spawnRadius?: number
  speed?: number
}

export class FallingParticle extends THREE.Object3D implements IUpdatable {
  private geometry: THREE.BufferGeometry
  private material: THREE.Material
  private particleSystem: THREE.Points
  private count: number
  private size: number
  private speed: number
  private spawnRadius: number
  private sizeVariation: boolean
  private fallDirectionArr: Array<number>
  static defaultParameter: FallingParticleParameter = {
    count: 2000,
    size: 2,
    sizeVariation: true,
    fallDirection: new Vector3D(-1, -1, -1),
    spawnRadius: 200,
    speed: 10000,
  }
  constructor(params: FallingParticleParameter = FallingParticle.defaultParameter) {
    super()
    params = { ...FallingParticle.defaultParameter, ...params }
    this.fallDirectionArr = [params.fallDirection!.x, params.fallDirection!.y, params.fallDirection!.z]
    this.count = params.count!
    this.size = params.size!
    this.spawnRadius = params.spawnRadius!
    this.sizeVariation = params.sizeVariation!
    this.speed = params.speed!

    this.geometry = new THREE.BufferGeometry()
    const uniforms = {
      pointTexture: { value: new THREE.TextureLoader().load('particle.png') },
    }

    const vertexShader = `
			attribute float size;
			varying vec3 vColor;
			void main() {
				vColor = color;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = size * ( 300.0 / -mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}
        `

    const fragmentShader = `
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4( vColor, 1.0 );
                gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

            }
        `

    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
      vertexColors: true,
    })

    const positions = Array<number>()
    const colors = Array<number>()
    const sizes = Array<number>()
    const color = new THREE.Color()
    const radius = this.spawnRadius

    for (let i = 0; i < this.count; i++) {
      positions.push((Math.random() * 2 - 1) * radius)
      positions.push((Math.random() * 2 - 1) * radius)
      positions.push((Math.random() * 2 - 1) * radius)
      colors.push(i, i, i)
      sizes.push(1)
    }
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage))
    this.particleSystem = new THREE.Points(this.geometry, this.material)
    this.attach(this.particleSystem)
  }

  update(dt: number): void {
    const time = Date.now() * 0.01

    const positions: any = this.geometry.attributes.position.array
    for (let i = 0; i < this.count * 3; i += 3) {
      for (let j = 0; j < 3; j++) {
        //const moveSign = i < (this.count * 3) / 2 ? -1 : 1;
        const isY = j == 2
        positions[i + j] += dt * this.fallDirectionArr[j] * this.speed

        const newSpawnPos = isY ? this.spawnRadius / 2 : this.spawnRadius
        if (positions[i + j] > this.spawnRadius) {
          positions[i + j] = -newSpawnPos
        } else if (positions[i + j] < -this.spawnRadius) {
          positions[i + j] = newSpawnPos
        }
      }
    }
    this.geometry.attributes.position.needsUpdate = true

    if (this.sizeVariation) {
      const sizes: any = this.geometry.attributes.size.array

      for (let i = 0; i < this.count; i++) {
        sizes[i] = this.size * (1 + Math.sin(0.1 * i + time * 0.1))
      }
      this.geometry.attributes.size.needsUpdate = true
    }
  }

  public setEnabled(bool: boolean) {
    this.particleSystem.visible = bool
    this.particleSystem.traverse((obj) => (obj.visible = bool))
  }
}
