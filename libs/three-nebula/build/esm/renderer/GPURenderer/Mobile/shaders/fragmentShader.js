export const fragmentShader = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D uTexture;

    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;

    void main() {
      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);

      vec2 uv = gl_PointCoord;
      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);

      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);
    }
`;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9Nb2JpbGUvc2hhZGVycy9mcmFnbWVudFNoYWRlci5qcyJdLCJuYW1lcyI6WyJmcmFnbWVudFNoYWRlciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNQSxjQUFjLEdBQUcsTUFBTTtBQUNsQyxTQUFRO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FoQkU7QUFpQkQsQ0FsQk0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gICAgdW5pZm9ybSB2ZWMzIGJhc2VDb2xvcjtcbiAgICB1bmlmb3JtIHNhbXBsZXIyRCB1VGV4dHVyZTtcblxuICAgIHZhcnlpbmcgdmVjMyB0YXJnZXRDb2xvcjtcbiAgICB2YXJ5aW5nIGZsb2F0IHRhcmdldEFscGhhO1xuICAgIHZhcnlpbmcgdmVjNCB0aWxlUmVjdDtcblxuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoYmFzZUNvbG9yICogdGFyZ2V0Q29sb3IsIHRhcmdldEFscGhhKTtcblxuICAgICAgdmVjMiB1diA9IGdsX1BvaW50Q29vcmQ7XG4gICAgICB1diA9IG1peCh0aWxlUmVjdC54eSwgdGlsZVJlY3QuencsIGdsX1BvaW50Q29vcmQpO1xuXG4gICAgICBnbF9GcmFnQ29sb3IgPSBnbF9GcmFnQ29sb3IgKiB0ZXh0dXJlMkQodVRleHR1cmUsIHV2KTtcbiAgICB9XG5gO1xufTtcbiJdfQ==