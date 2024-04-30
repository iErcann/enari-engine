import * as THREE from 'three'

export class AudioManager extends THREE.AudioListener {
  private shotBuffer!: AudioBuffer
  private soundPlayer: THREE.Audio
  constructor() {
    super()
    this.soundPlayer = new THREE.Audio(this)
    const audioLoader = new THREE.AudioLoader()
    this.soundPlayer.setVolume(0.1)
    // audioLoader.load('silencer.mp3', (buffer: AudioBuffer) => {
    //     this.shotBuffer = buffer;
    //     this.soundPlayer.setBuffer(this.shotBuffer);
    // });
  }
  public playShot() {
    if (this.soundPlayer.isPlaying) {
      this.soundPlayer.stop()
    }
    this.soundPlayer.play()
  }
}
