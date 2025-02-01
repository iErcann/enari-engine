import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { LoadableMesh } from "../../View/Mesh/LoadableMesh.js";
import { FPSMesh } from "../../View/Mesh/FPSMesh.js";
import { ThirdPersonMesh } from "../../View/Mesh/ThirdPersonMesh.js";
import { MapMesh } from "../../View/Mesh/MapMesh.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { Vector3D } from "../../Core/Vector.js";
export class GlobalLoadingManager extends THREE.LoadingManager {
  static instance;
  static gltfLoader = new GLTFLoader();
  static jsonLoader = new THREE.ObjectLoader();
  static dracoLoader = new DRACOLoader();
  loadableMeshs = /* @__PURE__ */ new Map();
  fpsMesh;
  thirdPersonMesh;
  constructor() {
    super();
    this.onStart = this._onStart;
    this.onLoad = this._onLoad;
    this.onProgress = this._onProgress;
    this.onError = this._onError;
    GlobalLoadingManager.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    GlobalLoadingManager.gltfLoader.setDRACOLoader(GlobalLoadingManager.dracoLoader);
  }
  _onStart(url, itemsLoaded, itemsTotal) {
    console.log("Started loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
  }
  _onLoad() {
    console.log("Loading complete!");
  }
  _onProgress(url, itemsLoaded, itemsTotal) {
    console.log("Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
  }
  _onError(url) {
    console.log("There was an error loading " + url);
  }
  static getInstance() {
    if (!GlobalLoadingManager.instance) {
      GlobalLoadingManager.instance = new GlobalLoadingManager();
    }
    return GlobalLoadingManager.instance;
  }
  async loadAllMeshs() {
    const tpsmesh = new ThirdPersonMesh();
    await tpsmesh.load();
    tpsmesh.register(this.loadableMeshs);
    const mapmesh = new MapMesh();
    await mapmesh.load();
    mapmesh.register(this.loadableMeshs);
    const ak = new FPSMesh("./assets/fps_mine_sketch_galil.glb", "AK47");
    await ak.load();
    ak.register(this.loadableMeshs);
    const usp = new FPSMesh("./assets/fps_mine_sketch_compressed.glb", "Usp", new Vector3D(-0.09, 0.26, 0.35));
    await usp.load();
    usp.register(this.loadableMeshs);
    const m9 = new FPSMesh("./assets/fps_mine_sketch_m9.glb", "Knife");
    await m9.load();
    m9.register(this.loadableMeshs);
    const bullet = new LoadableMesh("./assets/9mm2douille.glb", "Bullet");
    await bullet.load();
    bullet.register(this.loadableMeshs);
    document.getElementById("loading")?.remove();
  }
  static async loadJson(path) {
    return fetch(path).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    }).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      return void 0;
    });
  }
  static async loadMesh(path) {
    return await new Promise((resolve, reject) => {
      GlobalLoadingManager.gltfLoader.load(
        path,
        (object) => {
          const mesh = object.scene;
          mesh.animations = object.animations;
          resolve(mesh);
        },
        (xhr) => {
        },
        (error) => {
          console.log(error);
          console.log("An error happened");
        }
      );
    });
  }
}