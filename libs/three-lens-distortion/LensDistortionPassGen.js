import { LensDistortionShader } from './LensDistortionShader.js'

export function LensDistortionPassGen({ THREE, Pass, FullScreenQuad }) {

  // expose
  return class LensDistortionPass extends Pass {

    constructor({
      distortion = new THREE.Vector2(0, 0),
      principalPoint = new THREE.Vector2(0, 0),
      focalLength = new THREE.Vector2(1, 1),
      skew = 0,
    } = {}) {
      super();

      this._fsQuad = new FullScreenQuad(new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(LensDistortionShader.uniforms),
        vertexShader: LensDistortionShader.vertexShader,
        fragmentShader: LensDistortionShader.fragmentShader,
      }));

      this._fsQuad.material.uniforms['uK0'].value = distortion; // radial distortion coeff of term r^2
      this._fsQuad.material.uniforms['uCc'].value = principalPoint;
      this._fsQuad.material.uniforms['uFc'].value = focalLength;
      this._fsQuad.material.uniforms['uAlpha_c'].value = skew;

      this._uniforms = this._fsQuad.material.uniforms;
    }

    render(renderer, writeBuffer, readBuffer) {
      this._fsQuad.material.uniforms['tDiffuse'].value = readBuffer.texture;
      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
      }
      this._fsQuad.render(renderer);
    }

    get distortion() { return this._uniforms['uK0'].value }
    set distortion(value) { this._uniforms['uK0'].value = value }

    get principalPoint() { return this._uniforms['uCc'].value }
    set principalPoint(value) { this._uniforms['uCc'].value = value }

    get focalLength() { return this._uniforms['uFc'].value }
    set focalLength(value) { this._uniforms['uFc'].value = value }

    get skew() { return this._uniforms['uAlpha_c'].value }
    set skew(value) { this._uniforms['uAlpha_c'].value = value }

  };
}
