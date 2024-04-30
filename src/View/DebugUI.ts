import * as THREE from 'three'
import { FolderApi, Pane } from 'tweakpane'
import { Vector2D, Vector3D } from '../Core/Vector'

class ObjectProperties {
  x!: number
  y!: number
  z!: number
}
export class DebugUI extends Pane {
  public playerFolder: FolderApi
  public viewmodelFolder: FolderApi
  public lightFolder: FolderApi

  constructor() {
    super()
    this.playerFolder = this.addFolder({ title: 'Player' })
    this.viewmodelFolder = this.addFolder({ title: 'Viewmodel' })
    this.lightFolder = this.addFolder({ title: 'Light' })
  }
  public addVector2(
    vector: Vector2D,
    name: string = 'Unnamed vector',
    size: Vector2D = new Vector2D(2, 2),
    incr?: number
  ): FolderApi {
    const folder = this.addFolder({ title: name })
    const step = 0.001
    folder.addInput(vector, 'x', {
      min: -size.x,
      max: size.x,
      step: step,
    })
    folder.addInput(vector, 'y', {
      min: -size.y,
      max: size.y,
      step: step,
    })
    return folder
  }
  public addVector(
    vector: ObjectProperties,
    name: string = 'Unnamed vector',
    size: Vector3D = new Vector3D(2, 2, 2),
    incr?: number
  ): FolderApi {
    const folder = this.addFolder({ title: name })
    const step = 0.001
    folder.addInput(vector, 'x', {
      min: -size.x,
      max: size.x,
      step: step,
    })
    folder.addInput(vector, 'y', {
      min: -size.y,
      max: size.y,
      step: step,
    })
    folder.addInput(vector, 'z', {
      min: -size.z,
      max: size.z,
      step: step,
    })
    return folder
  }

  public monitorObject(object: Object, name: string = 'Unnamed object monitor'): FolderApi {
    const folder = this.addFolder({ title: name })
    for (const [key, value] of Object.entries(object)) {
      folder.addMonitor(object, key as any)
    }
    this.addSeparator()
    return folder
  }

  public addMesh(mesh: THREE.Object3D, name: string = 'Mesh', size: Vector3D = new Vector3D(100, 10, 100)) {
    const folder = this.addFolder({ title: name })
    folder.add(this.addVector(mesh.position, 'Position', size))
    folder.add(this.addVector(mesh.rotation, 'Rotation', new Vector3D(Math.PI, Math.PI, Math.PI)))
    this.addSeparator()
    return folder
  }
  public addObject(object: Object, name: string = 'Unnamed object', callback?: any) {
    const folder = this.addFolder({ title: name })
    for (const [key, value] of Object.entries(object)) {
      const inp = folder.addInput(object, key as any)
      if (callback) {
        inp.on('change', callback)
      }
    }
    this.addSeparator()
    return folder
  }
}
