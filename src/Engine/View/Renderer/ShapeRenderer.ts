// import { Cube } from "../Core/Cube";
// import * as THREE from "three";
// import * as CANNON from 'cannon-es'
// import { IUpdatable } from "../Interface/IUpdatable";
// import { Vector3D } from "../Core/Vector";
// import { Shape } from "../Core/Shape";

// export class ShapeRenderer extends Shape implements IUpdatable {
//     public mesh: THREE.Mesh;
//     constructor(body: CANNON.Body, shape: CANNON.Shape, mesh: THREE.Mesh) {
//         super(body, shape);
//         this.mesh = mesh;
//     }
//     update(dt: number): void { 
//         const pos = Vector3D.fromCannon(this.body.position);
//         const quat = this.body.quaternion;
//         this.mesh.position.copy(pos);
//         if (quat.x != NaN) {
//             this.mesh.rotation.setFromQuaternion(new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w));
//         }

//     }
// }