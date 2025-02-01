import { AmmoInstance } from "./Ammo.js";
export class Physics {
  world;
  constructor(dispatcher, overlappingPairCache, solver, collisionConfiguration) {
    this.world = new AmmoInstance.btDiscreteDynamicsWorld(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    this.world.setGravity(new AmmoInstance.btVector3(0, -10 * 5, 0));
  }
  static createDefault() {
    console.log("Creating default physics");
    const collisionConfiguration = new AmmoInstance.btDefaultCollisionConfiguration(), dispatcher = new AmmoInstance.btCollisionDispatcher(
      collisionConfiguration
    ), overlappingPairCache = new AmmoInstance.btDbvtBroadphase(), solver = new AmmoInstance.btSequentialImpulseConstraintSolver();
    const physics = new Physics(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    return physics;
  }
  add(body) {
    this.world.addRigidBody(body);
  }
  update(dt) {
    this.world.stepSimulation(dt);
  }
}