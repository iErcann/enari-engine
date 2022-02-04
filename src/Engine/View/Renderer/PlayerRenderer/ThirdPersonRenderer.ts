import * as THREE from "three";
import { ThirdPersonMesh } from "../../Mesh/ThirdPersonMesh";
import { LoadableMesh } from "../../Mesh/LoadableMesh";
import { PlayerRenderer } from "./PlayerRenderer";
import { Vector3D } from "../../../Core/Vector";
import { Game } from "../../../Game";
import { TPSCameraManager } from "../../CameraManager/TPSCameraManager";
import { Player } from "../../../Core/Player";

// https://sketchfab.com/3d-models/low-poly-mccree-38aedc02c0b2412babdc4d0eac7c6803
export class ThirdPersonRenderer extends PlayerRenderer {
    public handleJump(): void {
        this.tpsMesh.playAnimation("Jump");
    }
    protected removeMesh(): void {
        throw new Error("Method not implemented.");
    }
    show(): void {
        this.tpsMesh.mesh.visible = true;
    }
    hide(): void {
        this.tpsMesh.mesh.visible = false;
    }

    public handleReload(): void {
    }
    public handleWeaponSwitch(): void {
    }
    public setMesh(mesh: LoadableMesh): void {
        this.tpsMesh = mesh as ThirdPersonMesh;
        this.tpsMesh.init();
        this.addToRenderer();

    }
    private tpsMesh!: ThirdPersonMesh;

    public handleZoom(): void {
        let fov: number = (<THREE.PerspectiveCamera>this.playerCameraManager.camera).fov;
        const zoom: Array<number> = [20, 50]
        if (fov === zoom[0]) {
            fov = this.baseFov;
        } else if (fov === zoom[1]) {
            fov = zoom[0];
        } else {
            fov = zoom[1];
        }
        this.setFov(fov);
    }
    public handleShoot(hitscanResult): void {
        super.handleShoot(hitscanResult)
    }
    public handleMove(moveVector: Vector3D): void {
        this.tpsMesh.playAnimation("Walking", true);
    }
    update(dt: number): void {
        this.tpsMesh.mesh.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
        this.tpsMesh.mesh.rotation.y = Math.atan2(this.player.lookingDirection.x, this.player.lookingDirection.z) // -Math.PI/2
        this.tpsMesh.update(dt);
        if (this.player.velocity.distanceTo(Vector3D.ZERO()) < 0.1) {
            this.tpsMesh.playAnimation("Wave", true);

        }
    }

    constructor(player: Player) {
        super(player);
        const mesh = <ThirdPersonMesh>Game.getInstance().globalLoadingManager.loadableMeshs.get("ThirdPersonMesh")!.clone();
        this.setMesh(mesh);
    }


    addToRenderer(): void {
        this.game.addToRenderer(this.tpsMesh.mesh);
    }
}