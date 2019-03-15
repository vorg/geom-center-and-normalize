var aabb = require('pex-geom/aabb')
var vec3 = require('pex-math/vec3')

function centerAndNormalize (positions) {
  var aabb = aabb.fromPoints(positions)
  var center = aabb.center(aabb)
  var size = aabb.size(aabb)
  var scale = Math.max(size[0], Math.max(size[1], size[2]))

  var newPositions = []
  for (var i = 0; i < positions.length; i++) {
    var p = vec3.copy(positions[i])
    vec3.sub(p, center)
    vec3.scale(p, 1 / scale)
    newPositions.push(p)
  }
  return newPositions
}

module.exports = centerAndNormalize
