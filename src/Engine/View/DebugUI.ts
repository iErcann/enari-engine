import { FolderApi, Pane, TpChangeEvent } from "tweakpane";
import { Vector3D } from "../Core/Vector";

class ObjectProperties {
    x!: number;
    y!: number;
    z!: number;
}
export class DebugUI extends Pane {
    constructor() {
        super();
    }
    public addVector(vector: ObjectProperties, name: string = "Unnamed vector", size: Vector3D = new Vector3D(2, 2, 2), incr?: number): FolderApi {
        const folder = this.addFolder({ title: name });
        const step = incr ? incr : size.x / 20;
        folder.addInput(vector, 'x', {
            min: -size.x,
            max: size.x,
            step: step,
            
        });
        folder.addInput(vector, 'y', {
            min: -size.y,
            max: size.y,
            step: step
        });
        folder.addInput(vector, 'z', {
            min: -size.z,
            max: size.z,
            step: step
        });
        return folder;
    }
    public monitorObject(object: Object, name: string = "Unnamed object monitor"): FolderApi {
        const folder = this.addFolder({ title: name });
        for (const [key, value] of Object.entries(object)) {
            folder.addMonitor(object, key)
        }
        this.addSeparator();
        return folder;
    }

    public addMesh(mesh: THREE.Object3D, name: string = "Mesh", size: Vector3D = new Vector3D(100, 10, 100)) {
        const folder = this.addFolder({ title: name });
        folder.add(this.addVector(mesh.position, "Position", size));
        folder.add(this.addVector(mesh.rotation, "Rotation", new Vector3D(Math.PI, Math.PI, Math.PI)));
        this.addSeparator();

    }
    public addObject(object: Object, name: string = "Unnamed object", callback?: any) {
        const folder = this.addFolder({ title: name });
        for (const [key, value] of Object.entries(object)) {
            const inp = folder.addInput(object, key)
            if (callback) {
                inp.on("change", callback);
            }
        }
        this.addSeparator();
    }


}