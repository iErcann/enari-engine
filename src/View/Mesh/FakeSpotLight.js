import * as THREE from "three";
import { Vector3D } from "../../Core/Vector.js";
export class FakeSpotLight extends THREE.Object3D {
  static defaultParameter = {
    radius: 10,
    height: 16,
    color1: new THREE.Color(16766625),
    color2: new THREE.Color(15573826),
    position: Vector3D.ZERO(),
    rotation: Vector3D.ZERO().toEuler(),
    anglePower: 1,
    attenuation: 2
  };
  attenuation;
  anglePower;
  radius;
  height;
  uniforms;
  constructor(params = FakeSpotLight.defaultParameter) {
    super();
    params = { ...FakeSpotLight.defaultParameter, ...params };
    const {
      radius,
      height,
      color1,
      color2,
      position,
      rotation,
      anglePower,
      attenuation
    } = params;
    this.attenuation = attenuation;
    this.anglePower = anglePower;
    this.radius = radius;
    this.height = height;
    const geometry = new THREE.CylinderGeometry(
      0.1,
      radius,
      height,
      32 * 2,
      20,
      false
    );
    this.uniforms = {
      color1: {
        value: color1
      },
      color2: {
        value: color2
      },
      anglePower: {
        value: anglePower
      },
      attenuation: {
        value: attenuation
      },
      spotPosition: {
        value: Vector3D.ZERO()
      }
    };
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
                varying vec3 vNormal;
                uniform float attenuation;
                varying vec3 vWorldPosition;
                varying float distance;

                void main(){
                    vNormal = normalize( normalMatrix * normal ); 
                    distance = position.y/attenuation;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0)  ;
                }
            `,
      fragmentShader: `
                varying float distance;
                varying vec3 vNormal;
                uniform vec3 color1;
                uniform float anglePower;

                void main(){
                    float intensity = distance;
                    vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));  
                    float angleIntensity = pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower ); 
                    intensity =  intensity * angleIntensity; 
                    gl_FragColor = vec4( color1, intensity); 

                }
            `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      depthTest: true
    });
    const cone = new THREE.Mesh(geometry, material);
    material.side = THREE.DoubleSide;
    this.attach(cone);
    this.position.copy(position);
    this.rotation.copy(rotation);
  }
  addToDebugUI(debugUI) {
    const spot = debugUI.addFolder({ title: "Fake SpotLight" });
    const att = debugUI.addInput(this, "attenuation").on("change", () => {
      this.uniforms["attenuation"].value = this.attenuation;
    });
    const anglePower = debugUI.addInput(this, "anglePower").on("change", () => {
      this.uniforms["anglePower"].value = this.anglePower;
    });
    const rad = debugUI.addInput(this, "radius").on("change", () => {
      this.children[0].geometry = new THREE.CylinderGeometry(
        0.1,
        this.radius,
        this.height,
        32 * 2,
        20,
        false
      );
    });
    const height = debugUI.addInput(this, "height").on("change", () => {
      this.children[0].geometry = new THREE.CylinderGeometry(
        0.1,
        this.radius,
        this.height,
        32 * 2,
        20,
        false
      );
    });
    debugUI.addMesh(this);
    spot.add(rad);
    spot.add(height);
    spot.add(att);
    spot.add(anglePower);
  }
}

