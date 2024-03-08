import * as THREE from "three";
import { Player } from "../../Core/Player";
import { Vector3D } from "../../Core/Vector";
import { CameraManager } from "./CameraManager";

export class TPSCameraManager extends CameraManager {
    private euler = new THREE.Euler(0, 0, 0, "YXZ");

    update(dt: number): void {
        super.update(dt);
        this.camera.position.copy(this.player.position.clone());
        this.player.lookingDirection = this.getDirection();
        this.camera.position.add(new Vector3D(0, this.player.eyeOffsetY*3 , 0));
        this.camera.position.add(this.player.lookingDirection.clone().setY(0).multiplyScalar(-4) );

    }

    public getDirection(): Vector3D {
        var direction = new Vector3D(0, 0, -1);
        return new THREE.Vector3(0, 0, 0).copy(direction).applyQuaternion(this.camera.quaternion) as Vector3D;
    }

    public onMouseMove(event) {
        super.onMouseMove(event);
        const PI_2 = Math.PI / 2;
        const minPolarAngle = 0; // radians
        const maxPolarAngle = Math.PI; // radians

        var movementX =
            event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY =
            event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        this.euler.setFromQuaternion(this.camera.quaternion);
        this.euler.y -= movementX * 0.0015;
        this.euler.x -= movementY * 0.0015;

        this.euler.x = Math.max(
            PI_2 - maxPolarAngle,
            Math.min(PI_2 - minPolarAngle, this.euler.x)
        );
        this.camera.quaternion.setFromEuler(this.euler);
    }
    constructor(player: Player, camera: THREE.PerspectiveCamera) {
        super(player, camera);
    }

}