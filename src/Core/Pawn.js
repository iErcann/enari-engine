import { Actor } from "./Actor.js";
export class Pawn extends Actor {
  createShape(size, mesh) {
    throw new Error("Method not implemented.");
  }
  createBody(shape, pos, rotation, mass) {
    throw new Error("Method not implemented.");
  }
  addToWorld(physics) {
    throw new Error("Method not implemented.");
  }
  constructor(position, rotation) {
    super(position, rotation);
  }
}