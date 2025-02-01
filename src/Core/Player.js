import { Pawn } from "./Pawn.js";
import { Vector2D, Vector3D } from "./Vector.js";
import { AmmoInstance } from "../Physics/Ammo.js";
export class Player extends Pawn {
  velocity = new Vector3D(0, 0, 0);
  lookingDirection = Vector3D.ZERO();
  lastShootTimeStamp = /* @__PURE__ */ new Date();
  jumpRechargeTime = 100;
  jumpRechargeTimer = 0;
  deceleration = new Vector3D(0.95, 1, 0.95);
  airDeceleration = new Vector3D(0.98, 1, 0.98);
  moveDirection = Vector3D.ZERO();
  speed = 100;
  maxSpeed = 100;
  rateOfFire = 100;
  isCurrentPlayer = false;
  isOnGround = true;
  jumpVelocity = 200;
  capsuleDimension = new Vector2D(1, 2);
  world;
  eyeOffsetY = this.capsuleDimension.y * 2.5 / 3;
  constructor(position) {
    super(position, Vector3D.ZERO());
    const shape = this.createShape(
      new Vector3D(this.capsuleDimension.x, this.capsuleDimension.y, this.capsuleDimension.x)
    );
    const body = this.createBody(shape, position);
    this.setBody(body);
  }
  createShape(size) {
    return new AmmoInstance.btCapsuleShape(size.x, size.y);
  }
  createBody(shape, position) {
    const mass = 10;
    const DISABLE_DEACTIVATION = 4;
    const transform = new AmmoInstance.btTransform();
    transform.setOrigin(new AmmoInstance.btVector3(position.x, position.y, position.z));
    this.transform = transform;
    const myMotionState = new AmmoInstance.btDefaultMotionState(transform);
    const localInertia = new AmmoInstance.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);
    const rbInfo = new AmmoInstance.btRigidBodyConstructionInfo(mass, myMotionState, shape, localInertia);
    const vec3 = new AmmoInstance.btVector3(0, 0, 0);
    const body = new AmmoInstance.btRigidBody(rbInfo);
    body.setGravity(vec3);
    body.setActivationState(DISABLE_DEACTIVATION);
    body.setFriction(0);
    body.setRestitution(0);
    body.setDamping(0, 0);
    body.setSleepingThresholds(0, 0);
    body.setAngularFactor(vec3);
    body.setAngularFactor(vec3);
    AmmoInstance.destroy(vec3);
    return body;
  }
  getGroundRaycastProperties() {
    return {
      initialLocalPos: new Vector3D(0, -this.capsuleDimension.y / 2, 0),
      size: 1.5
    };
  }
  addToWorld(physics) {
    this.world = physics.world;
    physics.add(this.body);
  }
  prestep(dt) {
    this.moveDirection = Vector3D.ZERO();
  }
  raycastToGround() {
    let { initialLocalPos, size } = this.getGroundRaycastProperties();
    const from = this.position.clone().add(new Vector3D(initialLocalPos.x, initialLocalPos.y, initialLocalPos.z)).toAmmo();
    const to = this.position.clone().add(new Vector3D(initialLocalPos.x, initialLocalPos.y - size, initialLocalPos.z)).toAmmo();
    const rayCallBack = new AmmoInstance.ClosestRayResultCallback(from, to);
    this.world.rayTest(from, to, rayCallBack);
    if (!this.isOnGround && rayCallBack.hasHit()) this.velocityPreserveAcc = 0;
    this.isOnGround = rayCallBack.hasHit();
    AmmoInstance.destroy(from);
    AmmoInstance.destroy(to);
    AmmoInstance.destroy(rayCallBack);
  }
  updateJumpRechargeTime(dt) {
    if (this.jumpRechargeTimer < this.jumpRechargeTime) {
      this.jumpRechargeTimer += dt * 1e3;
    }
  }
  Accelerate(accelDir, prevVelocity, wishSpeed, airAccel, dt) {
    let wishSpd = wishSpeed;
    const currentSpeed = prevVelocity.dot(accelDir);
    const addSpeed = wishSpd - currentSpeed;
    if (addSpeed <= 0) {
      return prevVelocity;
    }
    let accelSpeed = wishSpeed * airAccel * dt;
    if (accelSpeed > addSpeed) {
      accelSpeed = addSpeed;
    }
    const vel = prevVelocity.clone();
    vel.x += accelSpeed * accelDir.x;
    vel.y += accelSpeed * accelDir.y;
    vel.z += accelSpeed * accelDir.z;
    return vel;
  }
  MoveGround(accelDir, prevVelocity, dt) {
    const friction = 1;
    const speed = Math.pow(prevVelocity.x, 2) + Math.pow(prevVelocity.z, 2);
    if (speed != 0) {
      const drop = speed * friction * dt;
      prevVelocity.multiplyScalar(this.deceleration.x * Math.max(speed - drop, 0) / speed);
    }
    return this.Accelerate(accelDir, prevVelocity, 10, 200, dt);
  }
  Decelerate(prevVelocity, dt, deceleration) {
    const friction = 1;
    const speed = Math.pow(prevVelocity.x, 2) + Math.pow(prevVelocity.z, 2);
    if (speed != 0) {
      const drop = speed * friction * dt;
      prevVelocity.multiplyScalar(this.deceleration.x * Math.max(speed - drop, 0) / speed);
    }
  }
  velocityPreserveAcc = 0;
  velocityPreserveDelay = 100;
  currentSpeedMagnitude = 0;
  update(dt) {
    super.update(dt, true, false);
    const linearVelocity = this.body.getLinearVelocity();
    let colWithAnything = false;
    this.raycastToGround();
    const resultCallback = new AmmoInstance.ConcreteContactResultCallback();
    resultCallback.addSingleResult = function(manifoldPoint, collisionObjectA, id0, index0, collisionObjectB, id1, index1) {
      colWithAnything = true;
      return 0;
    };
    this.world.contactTest(this.body, resultCallback);
    const y = linearVelocity.y();
    this.currentSpeedMagnitude = Math.pow(linearVelocity.x(), 2) + Math.pow(linearVelocity.z(), 2);
    if (colWithAnything && this.velocityPreserveAcc > this.velocityPreserveDelay) {
      this.velocity = this.MoveGround(this.moveDirection, this.velocity, dt);
    } else {
      this.velocity = this.Accelerate(this.moveDirection, this.velocity, 10 / 2, 200 / 2, dt);
      this.velocityPreserveAcc += dt * 1e3;
    }
    linearVelocity.setValue(this.velocity.x, y, this.velocity.z);
    this.velocity.y = y;
    this.updateJumpRechargeTime(dt);
    this.addHalfGravity(dt);
  }
  addHalfGravity(dt) {
    const velY = this.body.getLinearVelocity().y();
    this.body.getLinearVelocity().setY(velY - 9.81 * 0.5 * dt);
  }
  copyVelocity() {
    const vel = this.body.getLinearVelocity();
    this.velocity.setFromAmmo(vel);
  }
  move(movementVector) {
    this.moveDirection.add(Vector3D.fromThree(movementVector));
    this.moveDirection.normalize();
  }
  moveForward() {
    const lookingDir = this.lookingDirection.clone().setY(0);
    lookingDir.normalize();
    this.move(lookingDir);
  }
  moveBackward() {
    const lookingDir = this.lookingDirection.clone().setY(0);
    lookingDir.multiplyScalar(-1);
    this.move(lookingDir);
  }
  moveLeft() {
    const vectorUp = new Vector3D(0, 1, 0);
    const lookingDir = this.lookingDirection.clone().setY(0);
    let movementVector = new Vector3D().crossVectors(vectorUp, lookingDir);
    this.move(movementVector);
  }
  moveRight() {
    const vectorUp = new Vector3D(0, 1, 0);
    const lookingDir = this.lookingDirection.clone().setY(0);
    let movementVector = new Vector3D().crossVectors(vectorUp, lookingDir);
    movementVector.multiplyScalar(-1);
    this.move(movementVector);
  }
  canShoot() {
    return (/* @__PURE__ */ new Date()).getTime() - this.lastShootTimeStamp.getTime() > this.rateOfFire;
  }
  createHitscanPoints() {
    const from = this.position.clone().add(new Vector3D(0, this.eyeOffsetY, 0));
    const to = new Vector3D().addVectors(from, this.lookingDirection.clone().multiplyScalar(1e4));
    return {
      from,
      to
    };
  }
  shoot() {
    const { from, to } = this.createHitscanPoints();
    const fromAmmo = from.toAmmo();
    const toAmmo = to.toAmmo();
    const hitScanResult = {
      hasHit: false,
      hitPosition: void 0
    };
    const rayCallBack = new AmmoInstance.ClosestRayResultCallback(fromAmmo, toAmmo);
    this.world.rayTest(fromAmmo, toAmmo, rayCallBack);
    if (hitScanResult.hasHit = rayCallBack.hasHit()) {
      const object = rayCallBack.get_m_collisionObject();
      const hitPointAmmo = rayCallBack.get_m_hitPointWorld();
      const hitPoint = Vector3D.fromAmmo(hitPointAmmo);
      hitScanResult.hitPosition = hitPoint;
      const collisionBody = AmmoInstance.btRigidBody.prototype.upcast(object);
      const delta = hitPoint.clone().sub(from).multiplyScalar(25);
      const force = delta.toAmmo();
      collisionBody.applyCentralImpulse(force);
      AmmoInstance.destroy(force);
    }
    AmmoInstance.destroy(fromAmmo);
    AmmoInstance.destroy(toAmmo);
    AmmoInstance.destroy(rayCallBack);
    this.lastShootTimeStamp = /* @__PURE__ */ new Date();
    return hitScanResult;
  }
  canResetRecoil() {
    return (/* @__PURE__ */ new Date()).getTime() - this.lastShootTimeStamp.getTime() > this.rateOfFire * 2;
  }
  canJump() {
    return this.isOnGround && this.jumpRechargeTimer >= this.jumpRechargeTime;
  }
  jump() {
    console.log("jump");
    const vec3 = new AmmoInstance.btVector3(0, this.jumpVelocity, 0);
    const linearVel = this.body.getLinearVelocity();
    linearVel.setY(0);
    this.body.applyCentralImpulse(vec3);
    this.isOnGround = false;
    this.jumpRechargeTimer = 0;
    AmmoInstance.destroy(vec3);
    AmmoInstance.destroy(linearVel);
    const jumpYOffset = 0.11;
    const previousY = this.getY();
    this.setY(previousY + jumpYOffset);
  }
  // TODO: put this in the abstract super class
  setPosition(pos) {
    const posAmmo = pos.toAmmo();
    this.body.getWorldTransform().setOrigin(posAmmo);
    AmmoInstance.destroy(posAmmo);
  }
  setX(x) {
    this.body.getWorldTransform().getOrigin().setX(x);
  }
  setY(y) {
    this.body.getWorldTransform().getOrigin().setY(y);
  }
  setZ(z) {
    this.body.getWorldTransform().getOrigin().setZ(z);
  }
  getX() {
    return this.body.getWorldTransform().getOrigin().x();
  }
  getY() {
    return this.body.getWorldTransform().getOrigin().y();
  }
  getZ() {
    return this.body.getWorldTransform().getOrigin().z();
  }
  multiplyVelocity(otherVel) {
    const oldVel = this.body.getLinearVelocity();
    oldVel.setValue(oldVel.x() * otherVel.x, oldVel.y() * otherVel.y, oldVel.z() * otherVel.z);
  }
  setVelocity(vel) {
    this.body.getLinearVelocity().setValue(vel.x, vel.y, vel.z);
    this.velocity = vel;
  }
}