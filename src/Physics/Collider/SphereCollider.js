// NOT_USED


//import Ammo from '../../../libs/ammo/ammo.js'
//import { IBody } from "../../Interface/IBody";
//import { IUpdatable } from '../../Interface/IUpdatable'
//import { Physics } from '../Physics'
import { Actor } from '../../Core/Actor.js'
import { TQuaternion } from '../../Core/Quaternion.js'
import { Vector3D } from '../../Core/Vector.js'
import * as THREE from 'three'
//import { Game } from "../../Game";
import { AmmoInstance } from '../Ammo.js'

export class SphereCollider extends Actor {
  constructor(pos, rotation, size, mass) {
    super(pos, rotation)
    const shape = this.createShape(size)
    const body = this.createBody(shape, pos, rotation, mass)
    this.setBody(body)
  }

  update(dt) {
    super.update(dt, true, true)
  }

  addToWorld(physics) {
    physics.add(this.body)
  }

  follow(dt, actor) {
    const otherPos = actor.position

    const dir = new THREE.Vector3()
      .subVectors(otherPos, this.position)
      .setY(this.body.getLinearVelocity().y())
      .multiplyScalar(dt * 100)
    const dirAmmo = Vector3D.fromThree(dir).toAmmo()
    this.body.setLinearVelocity(dirAmmo)
    AmmoInstance.destroy(dirAmmo)
  }

  createShape(size) {
    return new AmmoInstance.btSphereShape(size.x)
  }

  createBody(shape, pos = Vector3D.ZERO(), rotation = Vector3D.ZERO(), mass = 1) {
    this.transform = new AmmoInstance.btTransform()
    const position = pos.toAmmo()
    const quat = TQuaternion.setFromVector3D(rotation).toAmmo()
    this.transform.setOrigin(position)
    this.transform.setRotation(quat)

    //this.transform.setIdentity();

    const myMotionState = new AmmoInstance.btDefaultMotionState(this.transform)
    const localInertia = new AmmoInstance.btVector3(0, 0, 0)
    shape.calculateLocalInertia(mass, localInertia)
    const rbInfo = new AmmoInstance.btRigidBodyConstructionInfo(mass, myMotionState, shape, localInertia)

    const body = new AmmoInstance.btRigidBody(rbInfo)
    if (mass === 0) {
      const DISABLE_SIMULATION = 5 // For hitscan raycast detection
      body.setActivationState(DISABLE_SIMULATION)
    }
    AmmoInstance.destroy(position)
    AmmoInstance.destroy(quat)
    AmmoInstance.destroy(localInertia)
    //  Ammo.destroy(myMotionState);
    const DISABLE_DEACTIVATION = 4
    body.setActivationState(DISABLE_DEACTIVATION)
    body.setFriction(0.5)
    return body
  }
}
