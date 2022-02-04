import { Pawn } from "../Core/Pawn";
import { IUpdatable } from "../Interface/IUpdatable";
import { HitscanResult } from "../Interface/utils";

export abstract class Controller implements IUpdatable {
    protected controlledPawn: Pawn;
    constructor(controlletedPawn: Pawn) {
        this.controlledPawn = controlletedPawn;
    }
    abstract update(dt: number): void;
    abstract moveForward(speed: number, dt: number): void;;
    abstract moveBackward(speed: number, dt: number): void;;
    abstract moveLeft(speed: number, dt: number): void;;
    abstract moveRight(speed: number, dt: number): void;;
    abstract shoot(): HitscanResult | undefined;
    abstract jump(): boolean;


}