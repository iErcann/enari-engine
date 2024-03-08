import Ammo from "ammojs-typed";
import { Vector3D } from "../Core/Vector";

export interface IBody {
  body: Ammo.btRigidBody;
  setBody(body: Ammo.btRigidBody): void;
  createBody(
    pos?: Vector3D,
    rotation?: Vector3D,
    size?: Vector3D,
    mass?: number
  ): Ammo.btRigidBody;
}
