import { IUpdatable } from '../Interface/IUpdatable'
import { Pawn } from './Pawn'
import { Vector2D, Vector3D } from './Vector'
import { Game } from '../Game'
import * as THREE from 'three'
import Ammo from 'ammojs-typed'
import { Physics } from '../Physics/Physics'
import { IBody } from '../Interface/IBody'
import { GroundRaycastProperty, HitscanProperty, HitscanResult } from '../Interface/utils'
import { AmmoInstance } from '../Physics/Ammo'

// Good reference : https://github.com/222464/EvolvedVirtualCreaturesRepo/blob/master/VirtualCreatures/Volumetric_SDL/Source/SceneObjects/Physics/DynamicCharacterController.cpp
export class Player extends Pawn implements IUpdatable {
  public velocity: Vector3D = new Vector3D(0, 0, 0)
  public lookingDirection: Vector3D = Vector3D.ZERO()
  public lastShootTimeStamp = new Date()
  private jumpRechargeTime = 100
  private jumpRechargeTimer = 0
  public deceleration = new Vector3D(0.95, 1, 0.95)
  public airDeceleration = new Vector3D(0.98, 1, 0.98)

  private moveDirection: Vector3D = Vector3D.ZERO()
  public speed = 100
  private maxSpeed = 100
  public rateOfFire = 100
  public isCurrentPlayer = false
  public isOnGround = true

  public jumpVelocity = 200
  public capsuleDimension = new Vector2D(1, 2)
  private world!: Ammo.btDynamicsWorld
  public eyeOffsetY = (this.capsuleDimension.y * 2.5) / 3
  constructor(position: Vector3D) {
    super(position, Vector3D.ZERO())
    const shape = this.createShape(
      new Vector3D(this.capsuleDimension.x, this.capsuleDimension.y, this.capsuleDimension.x)
    )
    const body = this.createBody(shape, position)
    this.setBody(body)
  }
  protected createShape(size: Vector3D): Ammo.btCollisionShape {
    return new AmmoInstance!.btCapsuleShape(size.x, size.y)
  }
  protected createBody(shape: Ammo.btCollisionShape, position: Vector3D): Ammo.btRigidBody {
    const mass = 10
    const DISABLE_DEACTIVATION = 4
    const transform = new AmmoInstance!.btTransform()
    transform.setOrigin(new AmmoInstance!.btVector3(position.x, position.y, position.z))
    this.transform = transform
    const myMotionState = new AmmoInstance!.btDefaultMotionState(transform)

    const localInertia = new AmmoInstance!.btVector3(0, 0, 0)
    shape.calculateLocalInertia(mass, localInertia)
    const rbInfo = new AmmoInstance!.btRigidBodyConstructionInfo(mass, myMotionState, shape, localInertia)

    const vec3 = new AmmoInstance!.btVector3(0, 0, 0)

    const body = new AmmoInstance!.btRigidBody(rbInfo)
    body.setGravity(vec3)
    // No sleeping (or else setLinearVelocity won't work)
    body.setActivationState(DISABLE_DEACTIVATION)

    body.setFriction(0)
    body.setRestitution(0)
    // O.9, 0.9 for slower ramp
    body.setDamping(0.0, 0.0)
    body.setSleepingThresholds(0.0, 0.0)
    // Keep upright
    body.setAngularFactor(vec3)

    //body.setLinearFactor(vec3);
    body.setAngularFactor(vec3) // TODO: use the same ammo.vector3
    AmmoInstance!.destroy(vec3)
    return body
  }
  public getGroundRaycastProperties(): GroundRaycastProperty {
    // Do 4 and only update it once jump is pressed
    return {
      initialLocalPos: new Vector3D(0, -this.capsuleDimension.y / 2, 0),
      size: 1.5,
    }
  }
  addToWorld(physics: Physics) {
    this.world = physics.world
    physics.add(this.body)
  }
  prestep(dt: number) {
    this.moveDirection = Vector3D.ZERO()
  }
  private raycastToGround(): void {
    let { initialLocalPos, size } = this.getGroundRaycastProperties()

    const from: Ammo.btVector3 = this.position
      .clone()
      .add(new Vector3D(initialLocalPos.x, initialLocalPos.y, initialLocalPos.z))
      .toAmmo()
    const to: Ammo.btVector3 = this.position
      .clone()
      .add(new Vector3D(initialLocalPos.x, initialLocalPos.y - size, initialLocalPos.z))
      .toAmmo()

    const rayCallBack = new AmmoInstance!.ClosestRayResultCallback(from, to)
    this.world.rayTest(from, to, rayCallBack)
    if (!this.isOnGround && rayCallBack.hasHit()) this.velocityPreserveAcc = 0
    this.isOnGround = rayCallBack.hasHit()
    AmmoInstance!.destroy(from)
    AmmoInstance!.destroy(to)
    AmmoInstance!.destroy(rayCallBack)
  }
  private updateJumpRechargeTime(dt: number): void {
    if (this.jumpRechargeTimer < this.jumpRechargeTime) {
      this.jumpRechargeTimer += dt * 1000
    }
  }

  private Accelerate(
    accelDir: Vector3D,
    prevVelocity: Vector3D,
    wishSpeed: number,
    airAccel: number,
    dt: number
  ): Vector3D {
    let wishSpd = wishSpeed
    const currentSpeed = prevVelocity.dot(accelDir)
    const addSpeed = wishSpd - currentSpeed
    if (addSpeed <= 0) {
      return prevVelocity
    }

    let accelSpeed = wishSpeed * airAccel * dt
    if (accelSpeed > addSpeed) {
      accelSpeed = addSpeed
    }
    const vel = prevVelocity.clone()
    vel.x += accelSpeed * accelDir.x
    vel.y += accelSpeed * accelDir.y
    vel.z += accelSpeed * accelDir.z
    return vel
  }

  private MoveGround(accelDir: Vector3D, prevVelocity: Vector3D, dt: number): Vector3D {
    const friction = 1
    const speed = Math.pow(prevVelocity.x, 2) + Math.pow(prevVelocity.z, 2)
    if (speed != 0) {
      const drop = speed * friction * dt
      prevVelocity.multiplyScalar((this.deceleration.x * Math.max(speed - drop, 0)) / speed)
    }
    return this.Accelerate(accelDir, prevVelocity, 10, 200, dt)
  }

  private Decelerate(prevVelocity: Vector3D, dt: number, deceleration: number) {
    const friction = 1
    const speed = Math.pow(prevVelocity.x, 2) + Math.pow(prevVelocity.z, 2)
    if (speed != 0) {
      const drop = speed * friction * dt
      prevVelocity.multiplyScalar((this.deceleration.x * Math.max(speed - drop, 0)) / speed)
    }
  }
  private velocityPreserveAcc = 0
  private velocityPreserveDelay = 100
  public currentSpeedMagnitude = 0
  update(dt: number): void {
    super.update(dt, true, false) // Only update the position
    const linearVelocity: Ammo.btVector3 = this.body.getLinearVelocity()

    let colWithAnything = false
    this.raycastToGround()

    const resultCallback = new AmmoInstance!.ConcreteContactResultCallback()
    resultCallback.addSingleResult = function (
      manifoldPoint,
      collisionObjectA,
      id0,
      index0,
      collisionObjectB,
      id1,
      index1
    ) {
      colWithAnything = true
      /*             var manifold = (Ammo as any).wrapPointer(manifoldPoint.ptr, Ammo.btManifoldPoint);
                        var localPointA = manifold.get_m_localPointA();
                        var localPointB = manifold.get_m_localPointB(); */
      return 0
    }

    this.world.contactTest(this.body, resultCallback)
    const y = linearVelocity.y()
    this.currentSpeedMagnitude = Math.pow(linearVelocity.x(), 2) + Math.pow(linearVelocity.z(), 2)

    if (colWithAnything && this.velocityPreserveAcc > this.velocityPreserveDelay) {
      this.velocity = this.MoveGround(this.moveDirection, this.velocity, dt)
    } else {
      this.velocity = this.Accelerate(this.moveDirection, this.velocity, 10 / 2, 200 / 2, dt)
      this.velocityPreserveAcc += dt * 1000
    }

    linearVelocity.setValue(this.velocity.x, y, this.velocity.z)
    this.velocity.y = y
    this.updateJumpRechargeTime(dt)
    this.addHalfGravity(dt)
  }
  private addHalfGravity(dt: number) {
    const velY = this.body.getLinearVelocity().y()
    this.body.getLinearVelocity().setY(velY - 9.81 * 0.5 * dt)
  }

  private copyVelocity() {
    const vel = this.body.getLinearVelocity()
    this.velocity.setFromAmmo(vel)
  }
  private move(movementVector: THREE.Vector3) {
    this.moveDirection.add(Vector3D.fromThree(movementVector))
    this.moveDirection.normalize()
  }

  public moveForward(): void {
    const lookingDir = this.lookingDirection.clone().setY(0)
    lookingDir.normalize()
    this.move(lookingDir)
  }
  public moveBackward(): void {
    const lookingDir = this.lookingDirection.clone().setY(0)
    lookingDir.multiplyScalar(-1)
    this.move(lookingDir)
  }
  public moveLeft(): void {
    const vectorUp = new Vector3D(0, 1, 0)
    const lookingDir = this.lookingDirection.clone().setY(0)
    let movementVector = new Vector3D().crossVectors(vectorUp, lookingDir)
    this.move(movementVector)
  }
  public moveRight(): void {
    const vectorUp = new Vector3D(0, 1, 0)
    const lookingDir = this.lookingDirection.clone().setY(0)
    let movementVector = new Vector3D().crossVectors(vectorUp, lookingDir)
    movementVector.multiplyScalar(-1)
    this.move(movementVector)
  }
  public canShoot(): boolean {
    // TODO: do this with dt
    return new Date().getTime() - this.lastShootTimeStamp.getTime() > this.rateOfFire
  }
  public createHitscanPoints(): HitscanProperty {
    const from = this.position.clone().add(new Vector3D(0, this.eyeOffsetY, 0))
    const to = new Vector3D().addVectors(from, this.lookingDirection.clone().multiplyScalar(10000))
    return {
      from,
      to,
    }
  }
  public shoot(): HitscanResult {
    const { from, to } = this.createHitscanPoints()

    const fromAmmo = from.toAmmo()
    const toAmmo = to.toAmmo()

    const hitScanResult: HitscanResult = {
      hasHit: false,
      hitPosition: undefined,
    }

    const rayCallBack = new AmmoInstance!.ClosestRayResultCallback(fromAmmo, toAmmo)
    this.world.rayTest(fromAmmo, toAmmo, rayCallBack)
    if ((hitScanResult.hasHit = rayCallBack.hasHit())) {
      const object = rayCallBack.get_m_collisionObject()
      const hitPointAmmo = rayCallBack.get_m_hitPointWorld()
      const hitPoint = Vector3D.fromAmmo(hitPointAmmo)
      hitScanResult.hitPosition = hitPoint

      const collisionBody: Ammo.btRigidBody = AmmoInstance!.btRigidBody.prototype.upcast(object)

      const delta = hitPoint.clone().sub(from).multiplyScalar(25)
      const force = delta.toAmmo()
      collisionBody.applyCentralImpulse(force)
      AmmoInstance!.destroy(force)
    }
    AmmoInstance!.destroy(fromAmmo)
    AmmoInstance!.destroy(toAmmo)
    AmmoInstance!.destroy(rayCallBack)

    this.lastShootTimeStamp = new Date()
    return hitScanResult
  }

  public canResetRecoil(): boolean {
    // TODO: do it with deltaTime.
    return new Date().getTime() - this.lastShootTimeStamp.getTime() > this.rateOfFire * 2
  }
  public canJump(): boolean {
    return this.isOnGround && this.jumpRechargeTimer >= this.jumpRechargeTime
  }

  public jump(): void {
    console.log('jump')
    const vec3 = new AmmoInstance!.btVector3(0, this.jumpVelocity, 0)
    const linearVel = this.body.getLinearVelocity()
    linearVel.setY(0)
    this.body.applyCentralImpulse(vec3)
    this.isOnGround = false
    this.jumpRechargeTimer = 0
    AmmoInstance!.destroy(vec3)
    AmmoInstance!.destroy(linearVel)

    const jumpYOffset = 0.11
    const previousY = this.getY()
    this.setY(previousY + jumpYOffset)
  }

  // TODO: put this in the abstract super class
  private setPosition(pos: Vector3D): void {
    const posAmmo = pos.toAmmo()
    this.body.getWorldTransform().setOrigin(posAmmo)
    AmmoInstance!.destroy(posAmmo)
  }
  private setX(x: number): void {
    this.body.getWorldTransform().getOrigin().setX(x)
  }
  private setY(y: number): void {
    this.body.getWorldTransform().getOrigin().setY(y)
  }
  private setZ(z: number): void {
    this.body.getWorldTransform().getOrigin().setZ(z)
  }
  private getX(): number {
    return this.body.getWorldTransform().getOrigin().x()
  }
  private getY(): number {
    return this.body.getWorldTransform().getOrigin().y()
  }
  private getZ(): number {
    return this.body.getWorldTransform().getOrigin().z()
  }
  private multiplyVelocity(otherVel: Vector3D): void {
    const oldVel = this.body.getLinearVelocity()
    oldVel.setValue(oldVel.x() * otherVel.x, oldVel.y() * otherVel.y, oldVel.z() * otherVel.z)
  }
  private setVelocity(vel: Vector3D): void {
    this.body.getLinearVelocity().setValue(vel.x, vel.y, vel.z)
    this.velocity = vel
  }
}
