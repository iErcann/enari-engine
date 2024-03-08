import Ammo from "ammojs-typed";
import { IUpdatable } from "../Interface/IUpdatable";
import { AmmoInstance } from "./Ammo";

export class Physics implements IUpdatable {
  public world: Ammo.btDiscreteDynamicsWorld;
  constructor(
    dispatcher: Ammo.btCollisionDispatcher,
    overlappingPairCache: Ammo.btDbvtBroadphase,
    solver: Ammo.btSequentialImpulseConstraintSolver,
    collisionConfiguration: Ammo.btDefaultCollisionConfiguration
  ) {
    this.world = new AmmoInstance!.btDiscreteDynamicsWorld(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    this.world.setGravity(new AmmoInstance!.btVector3(0, -10 * 5, 0));
  }
  static createDefault(): Physics {
    console.log("Creating default physics");
    const collisionConfiguration =
        new AmmoInstance!.btDefaultCollisionConfiguration(),
      dispatcher = new AmmoInstance!.btCollisionDispatcher(
        collisionConfiguration
      ),
      overlappingPairCache = new AmmoInstance!.btDbvtBroadphase(),
      solver = new AmmoInstance!.btSequentialImpulseConstraintSolver();

    const physics = new Physics(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    return physics;
  }
  add(body: Ammo.btRigidBody) {
    this.world.addRigidBody(body);
  }
  update(dt: number): void {
    this.world.stepSimulation(dt);
  }
}
