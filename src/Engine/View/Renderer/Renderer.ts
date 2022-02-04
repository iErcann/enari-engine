import * as THREE from 'three'
import { Player } from '../../Core/Player';
import { ParticleManager } from '../Particle/ParticleManager';
import { IUpdatable } from '../../Interface/IUpdatable';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { BokehShader, BokehDepthShader } from 'three/examples/jsm/shaders/BokehShader2.js';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';


import { Sky } from 'three/examples/jsm/objects/Sky.js';
import {
	Emitter,
	ParticleSystem
} from 'three-nebula';
import { PlayerWrapper } from '../../Core/PlayerWrapper';
import { DebugUI } from '../DebugUI';
import { GameObject } from '../../Core/GameObject';
import { Vector3D } from '../../Core/Vector';
import { RenderingConfig } from '../../Interface/utils';
import { SceneLighting } from './SceneLighting';
import { PlayerRenderer } from './PlayerRenderer/PlayerRenderer';
import { ViewmodelRenderer } from './ViewmodelRenderer';
import { PeriodicUpdater } from '../../Core/PeriodicUpdater';


export class Renderer extends THREE.WebGLRenderer implements IUpdatable {
	public scene: THREE.Scene;
	private fps!: number;
	public camera!: THREE.PerspectiveCamera;
	public viewmodelRenderer: ViewmodelRenderer;
	public currentPlayer!: PlayerWrapper;
	public particleManager: ParticleManager;
	public debugUI: DebugUI;
	public renderingConfig!: RenderingConfig;
	private composer!: EffectComposer;
	public players: Array<PlayerWrapper>;
	private debugCamera!: THREE.PerspectiveCamera;
	private debugCameraPosition!: Vector3D;
	private sky!: Sky;
	public sceneLighting!: SceneLighting;
	constructor(players: Array<PlayerWrapper>) {
		super({ antialias: false, });
		this.autoClear = false;
		this.shadowMap.autoUpdate = false;
		this.players = players;
		this.scene = new THREE.Scene();
		this.viewmodelRenderer = new ViewmodelRenderer();
		this.particleManager = new ParticleManager(this.scene);
		this.debugUI = new DebugUI();
		this.debugUI.addMonitor(this.info.render, "calls")
		this.setSize(window.innerWidth, window.innerHeight);
		this.setRenderingConfig();
		this.onWindowResize = this.onWindowResize.bind(this);
		this.setPixelRatio(this.renderingConfig.resolution);
		this.fpsUpdater = new PeriodicUpdater(1000, (dt: number) => {
			this.updateFpsScreenText(dt)
		}, this);
		window.addEventListener('resize', this.onWindowResize, false)
		document.body.appendChild(this.domElement);



	}

	private setSky(): void {
		// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_sky.html
		this.sky = new Sky();

		this.sky.scale.setScalar(450000);

		this.addToRenderer(this.sky);

		const effectController = {
			turbidity: 1,
			rayleigh: 0.09,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			elevation: 64,
			azimuth: 180,
			exposure: this.toneMappingExposure
		};
		const sun = new Vector3D();
		const guiChanged = (): void => {

			const uniforms = this.sky.material.uniforms;
			uniforms['turbidity'].value = effectController.turbidity;
			uniforms['rayleigh'].value = effectController.rayleigh;
			uniforms['mieCoefficient'].value = effectController.mieCoefficient;
			uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

			const degToRad = (degrees) => {
				var pi = Math.PI;
				return degrees * (pi / 180);
			}

			const phi = degToRad(90 - effectController.elevation);
			const theta = degToRad(effectController.azimuth);

			sun.setFromSphericalCoords(1, phi, theta);

			uniforms['sunPosition'].value.copy(sun);

			this.toneMappingExposure = effectController.exposure;
			//this.render(this.scene, this.camera);

		}

		const folder = this.debugUI.addFolder({ title: "Sky shader" });
		folder.addInput(effectController, "turbidity", {
			min: 0, max: 20
		}).on("change", guiChanged)
		folder.addInput(effectController, "rayleigh", {
			min: 0, max: 4
		}).on("change", guiChanged)
		folder.addInput(effectController, "mieCoefficient", {
			min: 0, max: 0.1
		}).on("change", guiChanged)
		folder.addInput(effectController, "mieDirectionalG", {
			min: 0, max: 1
		}).on("change", guiChanged)
		folder.addInput(effectController, "elevation", {
			min: 0, max: 90
		}).on("change", guiChanged)
		folder.addInput(effectController, "azimuth", {
			min: - 180, max: 180
		}).on("change", guiChanged)
		folder.addInput(effectController, "exposure", {
			min: 0, max: 1
		}).on("change", guiChanged)
		guiChanged();
	}


	private createDebugCamera() {
		this.debugCamera = new THREE.PerspectiveCamera();
		this.debugCamera.aspect = window.innerWidth / window.innerHeight;
		this.debugCamera.updateProjectionMatrix();
		this.debugCameraPosition = new Vector3D(-5.4, 1, 0);
		this.debugUI.addVector(this.debugCameraPosition, "Second Camera", new Vector3D(10, 10, 10));
	}
	public setCurrentPlayer(player: PlayerWrapper) {
		this.setCamera(player.renderer!.camera);
		if (this.renderingConfig.hasPostProcess) {
			this.addPostProcess();
		}

		if (!this.currentPlayer) {
			this.sceneLighting = new SceneLighting(this);
			//this.setSkybox();

			if (this.renderingConfig.debugCamera) {
				this.createDebugCamera();
			}
			this.setSky();
		}
		this.currentPlayer = player;

	}

	private createScissor(viewleft: number, viewbottom: number, viewwidth: number, viewheight: number) {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		const left = Math.floor(windowWidth * viewleft);
		const bottom = Math.floor(windowHeight * viewbottom);
		const width = Math.floor(windowWidth * viewwidth);
		const height = Math.floor(windowHeight * viewheight);

		this.setViewport(left, bottom, width, height);
		this.setScissor(left, bottom, width, height);
		this.setScissorTest(true);
	}
	private addPostProcess() {
		this.composer = new EffectComposer(this);
		this.composer.setSize(window.innerWidth, window.innerHeight);
		this.composer.addPass(new RenderPass(this.scene, this.camera));

		/* const ssaoPass = new SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight);
		ssaoPass.kernelRadius = 3;
		ssaoPass.minDistance = 0.001;
		ssaoPass.kernelRadius = 0.13;
		
		this.composer.addPass(ssaoPass);
		this.debugUI.addInput(ssaoPass, 'kernelRadius', { min: 0, max: 32 });
		this.debugUI.addInput(ssaoPass, 'minDistance', { min: 0.001 , max: 0.02 });
		this.debugUI.addInput(ssaoPass, 'maxDistance', { min: 0.01 , max: 0.3  });
 */



		const saoPass = new SAOPass(this.scene, this.camera, false, false);
		this.composer.addPass(saoPass);
		this.debugUI.addInput(saoPass.params, 'saoBias');
		this.debugUI.addInput(saoPass.params, 'saoIntensity');
		this.debugUI.addInput(saoPass.params, 'saoScale');
		this.debugUI.addInput(saoPass.params, 'saoKernelRadius');
		this.debugUI.addInput(saoPass.params, 'saoMinResolution');
		this.debugUI.addInput(saoPass.params, 'saoBlur');
		this.debugUI.addInput(saoPass.params, 'saoBlurRadius');
		this.debugUI.addInput(saoPass.params, 'saoBlurStdDev');
		this.debugUI.addInput(saoPass.params, 'saoBlurDepthCutoff');


	}
	private setSkybox(): void {
		const loader = new THREE.TextureLoader();
		const texture = loader.load(
			'skybox - Copy.png',
			() => {
				const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
				rt.fromEquirectangularTexture(this, texture);
				this.scene.background = rt.texture;
			});

	}
	private setRenderingConfig() {
		this.renderingConfig = {
			resolution: 1,
			hasParticle: true,
			hasPostProcess: false,
			hasLight: true,
			hasShadow: true,
			debugCamera: true,
			updateViewmodel: true,
			showViewmodel: true,
			legacyViewmodel: true
		};
		const folder = this.debugUI.addFolder({ title: "Rendering config" });
		const particles = this.debugUI.addInput(this.renderingConfig, "hasParticle").on("change", () => {
			this.sceneLighting.applyRenderingConfig();
		})
		const process = this.debugUI.addInput(this.renderingConfig, "hasPostProcess").on("change", () => {
			if (this.renderingConfig.hasPostProcess && !this.composer) {
				this.addPostProcess();
			}
		})
		const shadow = this.debugUI.addInput(this.renderingConfig, "hasShadow").on("change", () => {
			this.sceneLighting.enableShadow(this.renderingConfig.hasShadow);
		})

		const light = this.debugUI.addInput(this.renderingConfig, "hasLight").on("change", () => {
			// If there is no sunlight already
			if (this.renderingConfig.hasLight && !this.sceneLighting.sunLight) {
				//this.sceneLighting.createSunLight();
			}
		})
		const debugCam = this.debugUI.addInput(this.renderingConfig, "debugCamera").on("change", () => {
			if (this.renderingConfig.debugCamera && !this.debugCamera) {
				this.createDebugCamera();
			}
		})

		const viewmodel = this.debugUI.addInput(this.renderingConfig, "updateViewmodel");
		const viewmodel2 = this.debugUI.addInput(this.renderingConfig, "showViewmodel");

		folder.add(particles);
		folder.add(process);
		folder.add(light);
		folder.add(shadow);
		folder.add(debugCam);
		folder.add(viewmodel);
		folder.add(viewmodel2);

	}
	public setCamera(camera: THREE.PerspectiveCamera) {
		this.camera = camera;
		this.scene.add(camera);
	}
	private onWindowResize(): void {
		if (this.camera instanceof THREE.PerspectiveCamera) {
			const width = window.innerWidth;
			const height = window.innerHeight;

			this.camera.aspect = width /height;
			this.setPixelRatio(this.renderingConfig.resolution);
			this.camera.updateProjectionMatrix();
			this.viewmodelRenderer.camera.aspect = width /height;
			this.viewmodelRenderer.camera.updateProjectionMatrix();
			this.setSize(width,height);
			this.update();
		}
	}
	public addToRenderer(gameObject: GameObject, viewmodel = false) {
		if (!viewmodel) this.scene.add(gameObject);
		else this.viewmodelRenderer.scene.add(gameObject);
	}

	private fpsUpdater: PeriodicUpdater;
	private updateFps(dt: number) {
		this.fps = Math.floor(1 / dt);
	}
	private updateFpsScreenText(dt: number) {
		this.updateFps(dt);
		document.getElementById("fps")!.innerText = this.fps + " FPS";
	}


	public update(dt: number = 1 / 60): void {
		if (!this.camera) {
			throw new Error("No camera to render to!");
		}
		this.currentPlayer.cameraManager!.update(dt);
		this.fpsUpdater.update(dt);
		if (this.renderingConfig.hasParticle) {
			this.particleManager.update(dt);
		}
		this.sceneLighting.update(dt);

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].renderer) {
				 this.players[i].renderer?.update(dt);
			} else {
				console.log(this.players[i] + "doesn't have a PlayerRenderer")
			}
		}
		if (this.renderingConfig.debugCamera) {
			this.createScissor(0, 0, 1, 1);
		}
		if (this.renderingConfig.hasPostProcess) {
			this.composer.render();
		} else {
			this.render(this.scene, this.camera);
		}
		if (this.renderingConfig.showViewmodel && !this.renderingConfig.legacyViewmodel) {
			this.viewmodelRenderer.render(this, dt);
		}


		if (this.renderingConfig.debugCamera) {
			this.createScissor(0, 0.5, 0.2, 0.2);
			this.debugCamera.position.copy(this.currentPlayer.player.position).add(this.debugCameraPosition);
			this.debugCamera.lookAt(this.currentPlayer.player.position);
			this.render(this.scene, this.debugCamera);
		}
		//this.camera.updateProjectionMatrix();


	}



}