import * as THREE from "three";
export class AudioManager extends THREE.AudioListener {
  shotBuffer;
  soundPlayer;
  constructor() {
    super();
    this.soundPlayer = new THREE.Audio(this);
    const audioLoader = new THREE.AudioLoader();
    this.soundPlayer.setVolume(0.1);
  }
  playShot() {
    if (this.soundPlayer.isPlaying) {
      this.soundPlayer.stop();
    }
    this.soundPlayer.play();
  }
}