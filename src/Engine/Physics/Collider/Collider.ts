import { Actor } from "../../Core/Actor";
import { IUpdatable } from "../../Interface/IUpdatable";

export abstract class Collider extends Actor implements IUpdatable{
    update(dt: number): void {
        throw new Error("Method not implemented.");
    }
}
