import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { LoadableMesh } from './LoadableMesh'
import { FPSMesh } from './FPSMesh'
import { ThirdPersonMesh } from './ThirdPersonMesh'
import { MapMesh } from './MapMesh'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { Vector3D } from '../../Core/Vector'
import { Game } from '../../Game'

export class GlobalLoadingManager extends THREE.LoadingManager {
  public static instance: GlobalLoadingManager
  private static gltfLoader: GLTFLoader = new GLTFLoader()
  private static jsonLoader: THREE.ObjectLoader = new THREE.ObjectLoader()
  private static dracoLoader: DRACOLoader = new DRACOLoader()
  public loadableMeshs: Map<string, LoadableMesh> = new Map<string, LoadableMesh>()

  public fpsMesh!: THREE.Mesh
  public thirdPersonMesh!: THREE.Mesh
  constructor() {
    super()
    this.onStart = this._onStart
    this.onLoad = this._onLoad
    this.onProgress = this._onProgress
    this.onError = this._onError
    // GlobalLoadingManager.dracoLoader.setDecoderPath(
    //   "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
    // );

    GlobalLoadingManager.gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    GlobalLoadingManager.gltfLoader.setDRACOLoader(GlobalLoadingManager.dracoLoader)
  }
  _onStart(url, itemsLoaded, itemsTotal): void {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
  }
  _onLoad() {
    console.log('Loading complete!')
  }
  _onProgress(url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
  }

  _onError(url) {
    console.log('There was an error loading ' + url)
  }
  public static getInstance(): GlobalLoadingManager {
    if (!GlobalLoadingManager.instance) {
      GlobalLoadingManager.instance = new GlobalLoadingManager()
    }
    return GlobalLoadingManager.instance
  }
  async loadAllMeshs() {
    // Good looking textures
    // https://opengameart.org/users/rubberduck
    // https://opengameart.org/content/2k-handpainted-style-textures
    // https://opengameart.org/content/8-handpainted-style-textures

    const tpsmesh = new ThirdPersonMesh()
    await tpsmesh.load()
    tpsmesh.register(this.loadableMeshs)

    const mapmesh = new MapMesh()
    await mapmesh.load()
    mapmesh.register(this.loadableMeshs)

    const ak = new FPSMesh('fps_mine_sketch_galil.glb', 'AK47')
    await ak.load()
    ak.register(this.loadableMeshs)

    const usp = new FPSMesh('fps_mine_sketch_compressed.glb', 'Usp', new Vector3D(-0.09, 0.26, 0.35))
    await usp.load()
    usp.register(this.loadableMeshs)

    const m9 = new FPSMesh('fps_mine_sketch_m9.glb', 'Knife')
    await m9.load()
    m9.register(this.loadableMeshs)

    const bullet = new LoadableMesh('9mm2douille.glb', 'Bullet')
    await bullet.load()
    bullet.register(this.loadableMeshs)

    // Loading finished
    document.getElementById('loading')?.remove()
  }
  static async loadJson(path: string): Promise<any> {
    return fetch(path)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        return undefined
      })
  }
  static async loadMesh(path: string): Promise<THREE.Mesh> {
    /*         const renderer = Game.getInstance().renderer;
                if (renderer) {
                    const csm = renderer.sceneLighting.sky.csm;
                } */

    return await new Promise((resolve, reject) => {
      GlobalLoadingManager.gltfLoader.load(
        path,
        (object) => {
          const mesh = object.scene as unknown as THREE.Mesh
          mesh.animations = object.animations
          //csm.setupMaterial(mesh.animations);
          resolve(mesh)
        },
        (xhr) => {
          //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error)
          console.log('An error happened')
        }
      )
    })
  }
}
