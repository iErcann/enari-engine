// Reference: https://github.com/swift502/Sketchbook/blob/master/src/ts/world/Sky.ts
import * as THREE from "three";
import { PeriodicUpdater } from "../../Core/PeriodicUpdater";
import { Vector3D } from "../../Core/Vector";
import { IUpdatable } from "../../Interface/IUpdatable.js";
import CSM from "../LightExtra/CSM.js"
import { SkyShader } from "../Shader/SkyShader";
import { Renderer } from "./Renderer";

export class SkyLight extends THREE.Object3D implements IUpdatable {
    public sunPosition: Vector3D = Vector3D.ZERO();
    public csm: CSM;
    private directionalLight: THREE.DirectionalLight;

    private _phi: number = 50;
    private _theta: number = 145;

    private hemiLight: THREE.HemisphereLight;
    private maxHemiIntensity: number = 0.7;
    private minHemiIntensity: number = 4.41;

    private skyMesh!: THREE.Mesh;
    private skyMaterial!: THREE.ShaderMaterial;

    private renderer: Renderer;

    constructor(renderer: Renderer) {
        super();
        const ambientFolder = renderer.debugUI.addFolder({ title: "Ambient" });
        this.renderer = renderer;
        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.08;
        const ambient = this.renderer.debugUI.addInput(ambientLight, "intensity", { title: "Ambient" });
        ambientFolder.add(ambient);
        this.renderer.addToRenderer(ambientLight);


        // Ambient light
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2.0);
        this.refreshHemiIntensity();
        this.hemiLight.color.setHSL(0.59, 0.4, 0.6);
        this.hemiLight.groundColor.setHSL(0.095, 0.2, 0.75);
        this.renderer.addToRenderer(this.hemiLight);
        let splitsCallback = (amount, near, far, target) => { 
            let arr = [];

            for (let i = amount - 1; i >= 0; i--) {
                target.push(Math.pow(1 / 4, i));
            }

            return arr;
        };
        this.directionalLight = new THREE.DirectionalLight(0xFEAAEE, 1.2);
        this.directionalLight.shadow.camera.near = 0.1;
        this.directionalLight.shadow.camera.far = 500;
        this.directionalLight.shadow.camera.right = 150;
        this.directionalLight.shadow.camera.left = -  150;
        this.directionalLight.shadow.camera.top = 150;
        this.directionalLight.shadow.camera.bottom = -  150;
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.directionalLight.shadow.radius = 1;
        this.directionalLight.shadow.bias = -0.001;
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.autoUpdate = false;
        const directionnalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        //this.renderer.addToRenderer(directionnalLightHelper);
        //this.renderer.addToRenderer(new THREE.CameraHelper(this.directionalLight.shadow.camera))


        this.renderer.addToRenderer(this.directionalLight);
        this.renderer.addToRenderer(this.directionalLight.target);
        this.renderer.debugUI.addVector(this.sunPosition);
        this.lightUpdater = new PeriodicUpdater(1000, () => {
            this.lightUpdate();
        }, this);
    }
    private lightUpdater: PeriodicUpdater;

    private lightUpdate(): void {
        this.directionalLight.shadow.needsUpdate = true;
        this.position.copy(this.renderer.camera.position);
        const pos = this.renderer.camera.position.clone();
        this.directionalLight.position.set(pos.x, pos.y + 100, pos.z);
        this.directionalLight.position.add(new Vector3D(-40, 0, -40));
        this.directionalLight.target.position.set(pos.x, pos.y, pos.z);
    }
    public update(dt: number): void {
        this.lightUpdater.update(dt);
        //this.directionalLight.target.position.add(new Vector3D(10, 0, 10));
    }

    public refreshHemiIntensity(): void {
        this.hemiLight.intensity = 0.9;
        //this.hemiLight.intensity = this.minHemiIntensity + Math.pow(1 - (Math.abs(this._phi - 90) / 90), 0.25) * (this.maxHemiIntensity - this.minHemiIntensity);
    }
}