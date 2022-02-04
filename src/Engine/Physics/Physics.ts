import * as CANNON from 'cannon-es'
import { IUpdatable } from '../Interface/IUpdatable';
//import { Ammo } from './Ammo'
import Ammo from 'ammojs-typed'


export class Physics implements IUpdatable {
    public world: Ammo.btDiscreteDynamicsWorld;
    constructor(
        dispatcher: Ammo.btCollisionDispatcher,
        overlappingPairCache: Ammo.btDbvtBroadphase,
        solver: Ammo.btSequentialImpulseConstraintSolver,
        collisionConfiguration: Ammo.btDefaultCollisionConfiguration
    ) {
        this.world = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
        this.world.setGravity(new Ammo.btVector3(0, -10*5, 0));


    }
    static createDefault(): Physics {
        const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
            dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
            overlappingPairCache = new Ammo.btDbvtBroadphase(),
            solver = new Ammo.btSequentialImpulseConstraintSolver();

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