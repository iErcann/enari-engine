const Pane = Tweakpane.Pane;

import { Vector2D, Vector3D } from "../Core/Vector.js";
class ObjectProperties {
  x;
  y;
  z;
}
export class DebugUI extends Pane {
  playerFolder;
  viewmodelFolder;
  lightFolder;
  constructor() {
    super();
    this.playerFolder = this.addFolder({ title: "Player" });
    this.viewmodelFolder = this.addFolder({ title: "Viewmodel" });
    this.lightFolder = this.addFolder({ title: "Light" });
  }
  addVector2(vector, name = "Unnamed vector", size = new Vector2D(2, 2), incr) {
    const folder = this.addFolder({ title: name });
    const step = 1e-3;
    folder.addInput(vector, "x", {
      min: -size.x,
      max: size.x,
      step
    });
    folder.addInput(vector, "y", {
      min: -size.y,
      max: size.y,
      step
    });
    return folder;
  }
  addVector(vector, name = "Unnamed vector", size = new Vector3D(2, 2, 2), incr) {
    const folder = this.addFolder({ title: name });
    const step = 1e-3;
    folder.addInput(vector, "x", {
      min: -size.x,
      max: size.x,
      step
    });
    folder.addInput(vector, "y", {
      min: -size.y,
      max: size.y,
      step
    });
    folder.addInput(vector, "z", {
      min: -size.z,
      max: size.z,
      step
    });
    return folder;
  }
  monitorObject(object, name = "Unnamed object monitor") {
    const folder = this.addFolder({ title: name });
    for (const [key, value] of Object.entries(object)) {
      folder.addMonitor(object, key);
    }
    this.addSeparator();
    return folder;
  }
  addMesh(mesh, name = "Mesh", size = new Vector3D(100, 10, 100)) {
    const folder = this.addFolder({ title: name });
    folder.add(this.addVector(mesh.position, "Position", size));
    folder.add(this.addVector(mesh.rotation, "Rotation", new Vector3D(Math.PI, Math.PI, Math.PI)));
    this.addSeparator();
    return folder;
  }
  addObject(object, name = "Unnamed object", callback) {
    const folder = this.addFolder({ title: name });
    for (const [key, value] of Object.entries(object)) {
      const inp = folder.addInput(object, key);
      if (callback) {
        inp.on("change", callback);
      }
    }
    this.addSeparator();
    return folder;
  }
}

