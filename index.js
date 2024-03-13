import { avec3, vec3 } from "pex-math";
import { aabb } from "pex-geom";

const TEMP_VEC3 = vec3.create();

function centerAndNormalize(positions, { center = true, scale = 1 } = {}) {
  scale = scale === true ? 1 : scale;

  const isFlatArray = !positions[0]?.length;
  const positionsCount = positions.length / (isFlatArray ? 3 : 1);

  const bbox = aabb.fromPoints(aabb.create(), positions);
  const bboxCenter = aabb.center(bbox);

  const normalize = Number.isFinite(scale);
  if (normalize) {
    const size = aabb.size(bbox);
    scale /= Math.max(...size);
  }

  for (let i = 0; i < positionsCount; i++) {
    if (isFlatArray) {
      avec3.sub(positions, i, bboxCenter, 0);
      if (normalize) {
        avec3.scale(positions, i, scale);
        if (!center) avec3.add(positions, i, bboxCenter, 0);
      }
    } else {
      vec3.set(TEMP_VEC3, positions[i]);
      vec3.sub(TEMP_VEC3, bboxCenter);
      if (normalize) {
        vec3.scale(TEMP_VEC3, scale);
        if (!center) vec3.add(TEMP_VEC3, bboxCenter);
      }
      vec3.set(positions[i], TEMP_VEC3);
    }
  }

  return positions;
}

export default centerAndNormalize;
