import { DATA_TEXTURE_SIZE } from '../../common/TextureAtlas/constants';
import { SIZE_ATTENUATION_FACTOR } from '../../common/shaders/constants';
export const vertexShader = () => {
  return `
    uniform sampler2D uTexture;
    //atlasIndex is a 256x1 float texture of tile rectangles as r=minx g=miny b=maxx a=maxy
    uniform sampler2D atlasIndex;

    attribute float size;
    attribute vec3 color;
    attribute float alpha;
    attribute float texID;

    varying vec3 targetColor;
    varying float targetAlpha;
    varying vec4 tileRect;
    varying float tileID;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      targetColor = color;
      targetAlpha = alpha;

      tileID = texID;
      //get the tile rectangle from the atlasIndex texture..
      tileRect = texture2D(atlasIndex, vec2((tileID + 0.5) / ${DATA_TEXTURE_SIZE}.0, 0.5));

      gl_PointSize = ((size * ${SIZE_ATTENUATION_FACTOR}) / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
`;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9EZXNrdG9wL3NoYWRlcnMvdmVydGV4U2hhZGVyLmpzIl0sIm5hbWVzIjpbIkRBVEFfVEVYVFVSRV9TSVpFIiwiU0laRV9BVFRFTlVBVElPTl9GQUNUT1IiLCJ2ZXJ0ZXhTaGFkZXIiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLGlCQUFULFFBQWtDLHFDQUFsQztBQUNBLFNBQVNDLHVCQUFULFFBQXdDLGdDQUF4QztBQUVBLE9BQU8sTUFBTUMsWUFBWSxHQUFHLE1BQU07QUFDaEMsU0FBUTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErREYsaUJBQWtCO0FBQ2pGO0FBQ0EsZ0NBQWdDQyx1QkFBd0I7QUFDeEQ7QUFDQTtBQUNBLENBM0JFO0FBNEJELENBN0JNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgREFUQV9URVhUVVJFX1NJWkUgfSBmcm9tICcuLi8uLi9jb21tb24vVGV4dHVyZUF0bGFzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBTSVpFX0FUVEVOVUFUSU9OX0ZBQ1RPUiB9IGZyb20gJy4uLy4uL2NvbW1vbi9zaGFkZXJzL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSAoKSA9PiB7XG4gIHJldHVybiBgXG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgdVRleHR1cmU7XG4gICAgLy9hdGxhc0luZGV4IGlzIGEgMjU2eDEgZmxvYXQgdGV4dHVyZSBvZiB0aWxlIHJlY3RhbmdsZXMgYXMgcj1taW54IGc9bWlueSBiPW1heHggYT1tYXh5XG4gICAgdW5pZm9ybSBzYW1wbGVyMkQgYXRsYXNJbmRleDtcblxuICAgIGF0dHJpYnV0ZSBmbG9hdCBzaXplO1xuICAgIGF0dHJpYnV0ZSB2ZWMzIGNvbG9yO1xuICAgIGF0dHJpYnV0ZSBmbG9hdCBhbHBoYTtcbiAgICBhdHRyaWJ1dGUgZmxvYXQgdGV4SUQ7XG5cbiAgICB2YXJ5aW5nIHZlYzMgdGFyZ2V0Q29sb3I7XG4gICAgdmFyeWluZyBmbG9hdCB0YXJnZXRBbHBoYTtcbiAgICB2YXJ5aW5nIHZlYzQgdGlsZVJlY3Q7XG4gICAgdmFyeWluZyBmbG9hdCB0aWxlSUQ7XG5cbiAgICB2b2lkIG1haW4oKSB7XG4gICAgICB2ZWM0IG12UG9zaXRpb24gPSBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xuICAgICAgdGFyZ2V0Q29sb3IgPSBjb2xvcjtcbiAgICAgIHRhcmdldEFscGhhID0gYWxwaGE7XG5cbiAgICAgIHRpbGVJRCA9IHRleElEO1xuICAgICAgLy9nZXQgdGhlIHRpbGUgcmVjdGFuZ2xlIGZyb20gdGhlIGF0bGFzSW5kZXggdGV4dHVyZS4uXG4gICAgICB0aWxlUmVjdCA9IHRleHR1cmUyRChhdGxhc0luZGV4LCB2ZWMyKCh0aWxlSUQgKyAwLjUpIC8gJHtEQVRBX1RFWFRVUkVfU0laRX0uMCwgMC41KSk7XG5cbiAgICAgIGdsX1BvaW50U2l6ZSA9ICgoc2l6ZSAqICR7U0laRV9BVFRFTlVBVElPTl9GQUNUT1J9KSAvIC1tdlBvc2l0aW9uLnopO1xuICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbXZQb3NpdGlvbjtcbiAgICB9XG5gO1xufTtcbiJdfQ==