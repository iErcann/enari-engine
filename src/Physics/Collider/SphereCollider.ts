import Ammo from "ammojs-typed";
import { IBody } from "../../Interface/IBody";
import { IUpdatable } from "../../Interface/IUpdatable";
import { Physics } from "../Physics";
import { Actor } from "../../Core/Actor";
import { TQuaternion } from "../../Core/Quaternion";
import { Vector3D } from "../../Core/Vector";
import * as THREE from "three";
import { Game } from "../../Game";
import { AmmoInstance } from "../Ammo";

export class SphereCollider extends Actor implements IUpdatable {
  constructor(pos: Vector3D, rotation: Vector3D, size: Vector3D, mass: number) {
    super(pos, rotation);
    const shape = this.createShape(size);
    const body = this.createBody(shape, pos, rotation, mass);
    this.setBody(body);
  }
  update(dt: number): void {
    super.update(dt, true, true);
  }
  public addToWorld(physics: Physics): void {
    physics.add(this.body);
  }
  follow(dt: number, actor: Actor): void {
    const otherPos = actor.position;

    const dir = new THREE.Vector3()
      .subVectors(otherPos, this.position)
      .setY(this.body.getLinearVelocity().y())
      .multiplyScalar(dt * 100);
    const dirAmmo = Vector3D.fromThree(dir).toAmmo();
    this.body.setLinearVelocity(dirAmmo);
    AmmoInstance!.destroy(dirAmmo);
  }
  protected createShape(size: Vector3D): Ammo.btCollisionShape {
    return new AmmoInstance!.btSphereShape(size.x);
  }
  protected createBody(
    shape: Ammo.btCollisionShape,
    pos: Vector3D = Vector3D.ZERO(),
    rotation: Vector3D = Vector3D.ZERO(),
    mass: number = 1
  ): Ammo.btRigidBody {
    this.transform = new AmmoInstance!.btTransform();
    const position = pos.toAmmo();
    const quat = TQuaternion.setFromVector3D(rotation).toAmmo();
    this.transform.setOrigin(position);
    this.transform.setRotation(quat);

    //this.transform.setIdentity();

    const myMotionState = new AmmoInstance!.btDefaultMotionState(
      this.transform
    );
    const localInertia = new AmmoInstance!.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);
    const rbInfo = new AmmoInstance!.btRigidBodyConstructionInfo(
      mass,
      myMotionState,
      shape,
      localInertia
    );

    const body = new AmmoInstance!.btRigidBody(rbInfo);
    if (mass === 0) {
      const DISABLE_SIMULATION = 5; // For hitscan raycast detection
      body.setActivationState(DISABLE_SIMULATION);
    }
    AmmoInstance!.destroy(position);
    AmmoInstance!.destroy(quat);
    AmmoInstance!.destroy(localInertia);
    //  Ammo.destroy(myMotionState);
    const DISABLE_DEACTIVATION = 4;
    body.setActivationState(DISABLE_DEACTIVATION);
    body.setFriction(0.5);
    return body;
  }
}
