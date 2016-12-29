var AABB = require('pex-geom/AABB')
var Vec3 = require('pex-math/Vec3')

function centerAndNormalize (positions) {
  var aabb = AABB.fromPoints(positions)
  var center = AABB.center(aabb)
  var size = AABB.size(aabb)
  var scale = Math.max(size[0], Math.max(size[1], size[2]))

  var newPositions = []
  for (var i = 0; i < positions.length; i++) {
    var p = Vec3.copy(positions[i])
    Vec3.sub(p, center)
    Vec3.scale(p, 1 / scale)
    newPositions.push(p)
  }
  return newPositions
}

module.exports = centerAndNormalize
