export const fragmentShader = () => {
  return `
    uniform vec3 baseColor;
    uniform sampler2D uTexture;
    uniform sampler2D atlasIndex;

    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;
    varying float tileID;

    void main() {
      gl_FragColor = vec4(baseColor * targetColor, targetAlpha);

      vec2 uv = gl_PointCoord;
      uv = mix(tileRect.xy, tileRect.zw, gl_PointCoord);

      gl_FragColor = gl_FragColor * texture2D(uTexture, uv);

    }
`;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL3NoYWRlcnMvZnJhZ21lbnRTaGFkZXIuanMiXSwibmFtZXMiOlsiZnJhZ21lbnRTaGFkZXIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTUEsY0FBYyxHQUFHLE1BQU07QUFDbEMsU0FBUTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBbkJFO0FBb0JELENBckJNIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGZyYWdtZW50U2hhZGVyID0gKCkgPT4ge1xuICByZXR1cm4gYFxuICAgIHVuaWZvcm0gdmVjMyBiYXNlQ29sb3I7XG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgdVRleHR1cmU7XG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgYXRsYXNJbmRleDtcblxuICAgIHZhcnlpbmcgdmVjMyB0YXJnZXRDb2xvcjtcbiAgICB2YXJ5aW5nIGZsb2F0IHRhcmdldEFscGhhO1xuICAgIHZhcnlpbmcgdmVjNCB0aWxlUmVjdDtcbiAgICB2YXJ5aW5nIGZsb2F0IHRpbGVJRDtcblxuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoYmFzZUNvbG9yICogdGFyZ2V0Q29sb3IsIHRhcmdldEFscGhhKTtcblxuICAgICAgdmVjMiB1diA9IGdsX1BvaW50Q29vcmQ7XG4gICAgICB1diA9IG1peCh0aWxlUmVjdC54eSwgdGlsZVJlY3QuencsIGdsX1BvaW50Q29vcmQpO1xuXG4gICAgICBnbF9GcmFnQ29sb3IgPSBnbF9GcmFnQ29sb3IgKiB0ZXh0dXJlMkQodVRleHR1cmUsIHV2KTtcblxuICAgIH1cbmA7XG59O1xuIl19