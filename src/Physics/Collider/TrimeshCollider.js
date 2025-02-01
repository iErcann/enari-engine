const Ammo = window.Amma;
import * as THREE from "three";
import { Actor } from "../../Core/Actor.js";
import { TQuaternion } from "../../Core/Quaternion.js";
import { Vector3D } from "../../Core/Vector.js";
import { AmmoInstance } from "../../Physics/Ammo.js";
export class TrimeshCollider extends Actor {
  mesh;
  update(dt) {
    super.update(dt, true, true);
  }
  // No indexing.
  createShape2(size, mesh) {
    const trimesh = new AmmoInstance.btTriangleMesh(true, true);
    const geometry = mesh.geometry;
    const vertexPositionArray = geometry.attributes.position.array;
    for (let i = 0; i < geometry.attributes.position.count / 3; i++) {
      trimesh.addTriangle(
        new Ammo.btVector3(
          vertexPositionArray[i * 9 + 0] * size.x,
          vertexPositionArray[i * 9 + 1] * size.y,
          vertexPositionArray[i * 9 + 2] * size.z
        ),
        new Ammo.btVector3(
          vertexPositionArray[i * 9 + 3] * size.x,
          vertexPositionArray[i * 9 + 4] * size.y,
          vertexPositionArray[i * 9 + 5] * size.z
        ),
        new Ammo.btVector3(
          vertexPositionArray[i * 9 + 6] * size.x,
          vertexPositionArray[i * 9 + 7] * size.y,
          vertexPositionArray[i * 9 + 8] * size.z
        ),
        false
      );
    }
    return new Ammo.btBvhTriangleMeshShape(trimesh, true, true);
  }
  iterateGeometries(root) {
    const inverse = new THREE.Matrix4();
    inverse.copy(root.matrixWorld).invert();
    const scale = new THREE.Vector3();
    scale.setFromMatrixScale(root.matrixWorld);
    const transform = new THREE.Matrix4();
    let mesh;
    root.traverse((tempMesh) => {
      mesh = tempMesh;
      if (mesh === root) {
        transform.identity();
      } else {
        mesh.updateWorldMatrix(true);
        transform.multiplyMatrices(inverse, mesh.matrixWorld);
      }
    });
    const attributes = {
      vertices: mesh.geometry.attributes.position.array,
      matrices: transform.elements,
      indexes: mesh.geometry.index.array
    };
    return attributes;
  }
  createShape3(size, mesh) {
    const geometry = mesh.geometry;
    if (!geometry.index) throw new Error("No index");
    const vertexCount = geometry.attributes.position.count;
    const indexCount = geometry.index.count;
    const indexes = geometry.index.array;
    const vertices = geometry.attributes.position.array;
    const trimesh = new AmmoInstance.btTriangleMesh(true, true);
    const vectors = [
      Vector3D.ZERO().toAmmo(),
      Vector3D.ZERO().toAmmo(),
      Vector3D.ZERO().toAmmo()
    ];
    for (let i = 0; i < indexCount; i += 3) {
      const triIndex = [indexes[i], indexes[i + 1], indexes[i + 2]];
      vectors[0].setValue(
        vertices[triIndex[0] * 3] * size.x,
        vertices[triIndex[0] * 3 + 1] * size.y,
        vertices[triIndex[0] * 3 + 2] * size.z
      );
      vectors[1].setValue(
        vertices[triIndex[1] * 3] * size.x,
        vertices[triIndex[1] * 3 + 1] * size.y,
        vertices[triIndex[1] * 3 + 2] * size.z
      );
      vectors[2].setValue(
        vertices[triIndex[2] * 3] * size.x,
        vertices[triIndex[2] * 3 + 1] * size.y,
        vertices[triIndex[2] * 3 + 2] * size.z
      );
      trimesh.addTriangle(vectors[0], vectors[1], vectors[2], true);
    }
    AmmoInstance.destroy(vectors[0]);
    AmmoInstance.destroy(vectors[1]);
    AmmoInstance.destroy(vectors[2]);
    return new AmmoInstance.btBvhTriangleMeshShape(trimesh, true, true);
  }
  createShape(size, mesh) {
    const { vertices, matrices, indexes } = this.iterateGeometries(mesh);
    const va = new THREE.Vector3();
    const vb = new THREE.Vector3();
    const vc = new THREE.Vector3();
    const matrix = new THREE.Matrix4();
    const scale = new Vector3D(1, 1, 1);
    const bta = new Ammo.btVector3();
    const btb = new Ammo.btVector3();
    const btc = new Ammo.btVector3();
    const triMesh = new Ammo.btTriangleMesh(true, false);
    for (let i = 0; i < vertices.length; i++) {
      const components = vertices[i];
      const index = indexes[i] ? indexes[i] : null;
      matrix.fromArray(matrices[i]);
      if (index) {
        for (let j = 0; j < index.length; j += 3) {
          const ai = index[j] * 3;
          const bi = index[j + 1] * 3;
          const ci = index[j + 2] * 3;
          va.set(
            components[ai],
            components[ai + 1],
            components[ai + 2]
          ).applyMatrix4(matrix);
          vb.set(
            components[bi],
            components[bi + 1],
            components[bi + 2]
          ).applyMatrix4(matrix);
          vc.set(
            components[ci],
            components[ci + 1],
            components[ci + 2]
          ).applyMatrix4(matrix);
          bta.setValue(va.x, va.y, va.z);
          btb.setValue(vb.x, vb.y, vb.z);
          btc.setValue(vc.x, vc.y, vc.z);
          triMesh.addTriangle(bta, btb, btc, false);
        }
      } else {
        for (let j = 0; j < components.length; j += 9) {
          va.set(
            components[j + 0],
            components[j + 1],
            components[j + 2]
          ).applyMatrix4(matrix);
          vb.set(
            components[j + 3],
            components[j + 4],
            components[j + 5]
          ).applyMatrix4(matrix);
          vc.set(
            components[j + 6],
            components[j + 7],
            components[j + 8]
          ).applyMatrix4(matrix);
          bta.setValue(va.x, va.y, va.z);
          btb.setValue(vb.x, vb.y, vb.z);
          btc.setValue(vc.x, vc.y, vc.z);
          triMesh.addTriangle(bta, btb, btc, false);
        }
      }
    }
    const localScale = new Ammo.btVector3(scale.x, scale.y, scale.z);
    triMesh.setScaling(localScale);
    Ammo.destroy(localScale);
    const collisionShape = new AmmoInstance.btBvhTriangleMeshShape(
      triMesh,
      true,
      true
    );
    Ammo.destroy(bta);
    Ammo.destroy(btb);
    Ammo.destroy(btc);
    return collisionShape;
  }
  createBody(shape, pos = Vector3D.ZERO(), rotation = Vector3D.ZERO(), mass = 1) {
    this.transform = new AmmoInstance.btTransform();
    const position = new AmmoInstance.btVector3(pos.x, pos.y, pos.z);
    const quat = TQuaternion.setFromVector3D(rotation).toAmmo();
    this.transform.setOrigin(position);
    this.transform.setRotation(quat);
    const myMotionState = new AmmoInstance.btDefaultMotionState(
      this.transform
    );
    this.transform.setIdentity();
    const localInertia = new AmmoInstance.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);
    const rbInfo = new AmmoInstance.btRigidBodyConstructionInfo(
      mass,
      myMotionState,
      shape,
      localInertia
    );
    const body = new AmmoInstance.btRigidBody(rbInfo);
    const DISABLE_DEACTIVATION = 4;
    return body;
  }
  addToWorld(physics) {
    physics.add(this.body);
  }
  constructor(mesh, pos = Vector3D.ZERO(), rotation = Vector3D.ZERO(), size = new Vector3D(1, 1, 1), mass = 1) {
    super(pos, rotation);
    this.mesh = mesh;
    const geometry = mesh.geometry;
    const posArray = geometry.attributes.position.array;
    const idxArray = geometry.index?.array;
    const itemSize = geometry.attributes.position.itemSize;
    const shape = this.createShape3(size, this.mesh);
    const body = this.createBody(shape, pos, rotation, mass);
    this.setBody(body);
  }
}