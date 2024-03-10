import { IUpdatable } from "../../../Interface/IUpdatable";
import { Key } from "../../../Input/KeyBinding";
import * as THREE from "three";
import { FPSMesh } from "../../Mesh/FPSMesh";
import ParticleSystem, {
    Alpha,
    Position,
    Body,
    Color,
    CrossZone,
    Emitter,
    Force,
    Life,
    Gravity, ease,
    Mass,
    RadialVelocity,
    RandomDrift,
    Radius,
    Rate,
    Scale,
    Rotate,
    ScreenZone,
    Span,
    SpriteRenderer,
    Vector3D as NebulaVector3D,
} from 'three-nebula';
import { DebugUI } from "../../DebugUI";
import { LoadableMesh } from "../../Mesh/LoadableMesh";
import { Player } from "../../../Core/Player";
import { HitscanResult } from "../../../Interface/utils";
import { PlayerRenderer } from "./PlayerRenderer";
import { Vector2D, Vector3D } from "../../../Core/Vector";
import { Game } from "../../../Game";
import { FPSCameraManager } from "../../CameraManager/FPSCameraManager";
import { CameraManager } from "../../CameraManager/CameraManager";
import { lerp } from "../../../Core/MathUtils";

// TODO: cette classe gère le mouvement de la FPS Mesh
export class FPSRenderer extends PlayerRenderer implements IUpdatable {
    public handleJump(): void {

    }
    protected removeMesh(): void {
        /*         this.viewmodelCamera.traverse((mesh) => {
                    if (mesh instanceof THREE.Mesh) {
                        mesh.geometry.dispose();
                        mesh.material.dispose();
                    };
                    this.viewmodelCamera.remove(mesh);
                }
                ) */
        this.viewmodelCamera.children = [];
    }
    show(): void {
        this.fpsMesh.mesh.visible = true;
    }
    hide(): void {
        this.fpsMesh.mesh.visible = false;
    }
    public handleWeaponSwitch(): void {
        this.switchVelocity = .05;
        this.fpsMesh.playAnimation("Switch");
    }
    public handleReload(): void {
        this.fpsMesh.playAnimation("Reload");
    }
    private switchVelocity = 0;
    private viewmodelCamera: THREE.PerspectiveCamera;
    private legacyViewmodel = true;
    public fpsMesh!: FPSMesh;
    private recoilEffect = 0;

    private bobbingAmount = 0.0002;
    private moveEffect = Vector3D.ZERO();
    private tempEmitter: Emitter;
    public weaponOffset = Vector3D.ZERO();
    public weaponRotation = Vector3D.ZERO();
    private playerLight!: THREE.Light;
    private weaponBobbingAcc = Vector3D.ZERO();
    constructor(player: Player) {
        super(player);
        this.viewmodelCamera = this.legacyViewmodel ? this.camera : this.game.renderer.viewmodelRenderer.camera;
        this.playerLight = new THREE.PointLight(0xE12121, 10, 100);
        this.playerLight.position.add(new Vector3D(3.565, -5, 1))
        this.playerLight.castShadow = true;
        const fpsMesh = <FPSMesh>Game.getInstance().globalLoadingManager.loadableMeshs.get("Usp")!.clone();
        this.initParticleEmitter();
        this.setMesh(fpsMesh);
        this.setFov(this.baseFov);
        if (this.showDebug) {
            const debugUI: DebugUI = this.game.renderer.debugUI;
            debugUI.addVector(this.weaponOffset, "Viewmodel Offset", new Vector3D(2, 4, 2), 0.01);
            debugUI.addVector(this.weaponRotation, "Viewmodel Rotation", new Vector3D(Math.PI, Math.PI, Math.PI));
            debugUI.addInput(this, "bobbingAmount" as any, {
                min: 0.0001,
                max: 0.01,
            }
            );

            debugUI.addMesh(this.playerLight, "Player PointLight")
            debugUI.addObject(this.playerLight.color, "Player PointLight Color");

        }
    }

    public setMesh(mesh: LoadableMesh): void {
        this.removeMesh();
        this.fpsMesh = mesh as FPSMesh;
        this.fpsMesh.addLight(this.playerLight);
        this.fpsMesh.init(); // shadow
        this.addToRenderer();
        this.initViewmodelPosition();
        this.handleWeaponSwitch();
    }
    private initViewmodelPosition(): void {
        this.fpsMesh.mesh.position.add(this.weaponOffset);
    }
    update(dt: number): void {
        // Debug update
        super.update(dt);
        if (this.game.renderer.renderingConfig.updateViewmodel) {
            this.fpsMesh.update(dt);
            // Viewmodel update
            const fpsCameraManager = this.playerCameraManager as FPSCameraManager;
            if (fpsCameraManager.isRotating) {
                // TODO: make the isRotating thing in abstract base 
                const rotationBobbing = new Vector2D(fpsCameraManager.rotationDelta.x, fpsCameraManager.rotationDelta.y).multiplyScalar(this.bobbingAmount);
                this.weaponBobbingAcc.add(new Vector3D(rotationBobbing.y, rotationBobbing.x, 0));
            }

            const bobbingRestitutionSpeed = 10;
            const bobbingLerpAmount = Math.min(1, bobbingRestitutionSpeed * dt);
            let jumpBobbing = this.player.velocity.y / 2500
            jumpBobbing = Math.max(-Math.PI / 128, jumpBobbing);
            this.weaponBobbingAcc.x = lerp(this.weaponBobbingAcc.x + jumpBobbing, 0, bobbingLerpAmount)
            this.weaponBobbingAcc.y = lerp(this.weaponBobbingAcc.y, 0, bobbingLerpAmount);
            this.fpsMesh.mesh.rotation.x = -this.weaponBobbingAcc.x + this.weaponRotation.x;
            this.fpsMesh.mesh.rotation.y = -this.weaponBobbingAcc.y + this.weaponRotation.y
            this.fpsMesh.mesh.rotation.z = -this.weaponBobbingAcc.y;

            this.fpsMesh.mesh.position.x = this.weaponOffset.x + this.fpsMesh.viewmodelOffset.x;
            this.fpsMesh.mesh.position.y = this.weaponOffset.y + this.fpsMesh.viewmodelOffset.y + Math.sin(this.moveEffect.y) / 50;
            this.fpsMesh.mesh.position.z = this.weaponOffset.z + this.fpsMesh.viewmodelOffset.z + this.recoilEffect;


            if (this.recoilEffect > 0) this.recoilEffect -= dt / 2;
            this.switchVelocity += dt * 4;
            if (this.switchVelocity >= -this.weaponOffset.y / 2) {
                this.switchVelocity -= dt * 4;
                this.switchVelocity = Math.max(0, this.switchVelocity);
            }
        }

    }

    // Left click given by InputManager
    public handleShoot(hitscanResult: HitscanResult): void {
        super.handleShoot(hitscanResult);
        this.fpsMesh.playAnimation("Shoot");
        this.recoilEffect = 0.1;
        (this.playerCameraManager as FPSCameraManager).createRecoil();
        this.tempEmitter.setRate(new Rate(1, this.playerCameraManager.player.rateOfFire / 1000));
        this.tempEmitter.emit();
        setTimeout(() => {
            this.tempEmitter.setRate(new Rate(0, 0));
        }, this.playerCameraManager.player.rateOfFire);
    }

    public handleMove(moveVector: Vector3D, dt: number): void {
        this.moveEffect = new Vector3D(moveVector.x, this.moveEffect.y + 8 * dt, moveVector.z);
    }

    private initParticleEmitter() {
        const createSprite = () => {
            var map = new THREE.TextureLoader().load("dot.png");
            var material = new THREE.SpriteMaterial({
                map: map,
                color: 0xff0000,
                blending: THREE.AdditiveBlending,
                fog: true,
            });
            return new THREE.Sprite(material);
        };
        this.tempEmitter = new Emitter();

        this.tempEmitter
            .addInitializers([
                new Mass(1),
                new Radius(80),
                new Life(2),
                new RadialVelocity(1, new NebulaVector3D(4, 1, 0), 0),
            ])
            .addBehaviours([
                new RandomDrift(1, 0, 1, 0.05),
                new Alpha(.1, 0),
                new Rotate('random', 'random'),
                new Gravity(.1),
                new Color(0xFFFFFF, 'random', Infinity, ease.easeOutQuart),
            ])

        this.game.renderer.particleManager.addParticleEmitter(this.tempEmitter);
    }

    public handleZoom(): void {
        let fov: number = (<THREE.PerspectiveCamera>this.camera).fov;
        const zoom: Array<number> = [20, 50]
        if (fov === zoom[0]) {
            fov = this.baseFov;
        } else if (fov === zoom[1]) {
            fov = zoom[0];
        } else {
            fov = zoom[1];
        }
        this.setFov(fov);
        this.viewmodelCamera.fov = fov;

    }

    addToRenderer(): void {
        this.viewmodelCamera.add(this.fpsMesh.mesh);
    }

}
