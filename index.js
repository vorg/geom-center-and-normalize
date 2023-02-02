import { avec3, vec3 } from "pex-math";
import { aabb } from "pex-geom";

function centerAndNormalize(positions) {
  const isTypedArray = !Array.isArray(positions);
  const stride = isTypedArray ? 3 : 1;

  const bbox = aabb.create();
  aabb.fromPoints(bbox, positions);
  const center = aabb.center(bbox);
  const size = aabb.size(bbox);
  const scale = 1 / Math.max(...size);

  for (let i = 0; i < positions.length / stride; i++) {
    if (isTypedArray) {
      avec3.sub(positions, i, center, 0);
      avec3.scale(positions, i, scale);
    } else {
      const p = vec3.copy(positions[i]);
      vec3.sub(p, center);
      vec3.scale(p, scale);
      positions[i] = p;
    }
  }

  return positions;
}

export default centerAndNormalize;
