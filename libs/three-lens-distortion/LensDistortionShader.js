export const LensDistortionShader = {
  uniforms: {
    'tDiffuse': { value: null },
    'uK0': { value: null }, // radial distortion coeff 0
    'uCc': { value: null }, // principal point
    'uFc': { value: null },  // focal length
    'uAlpha_c': { value: 0 }, // skew coeff
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uK0;
    uniform vec2 uCc; 
    uniform vec2 uFc; 
    uniform float uAlpha_c;
    varying vec2 vUv;
    void main() {
      vec2 Xn = 2. * ( vUv.st - .5 ); // -1..1
      vec3 Xd = vec3(( 1. + uK0 * dot( Xn, Xn ) ) * Xn, 1.); // distorted 
      mat3 KK = mat3(
        vec3(uFc.x, 0., 0.),
        vec3(uAlpha_c * uFc.x, uFc.y, 0.),
        vec3(uCc.x, uCc.y, 1.)
      );
      vec2 Xp = ( KK * Xd ).xy * .5 + .5; // projected; into 0..1 
      if ( Xp.x >= 0. && Xp.x <= 1. && Xp.y >= 0. && Xp.y <= 1. ) {
        gl_FragColor = texture2D( tDiffuse, Xp );
      }
    }
  `
};