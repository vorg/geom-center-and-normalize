# geom-center-and-normalize

Centers the geometry and scales it to fill 1x1x1 bounding box

## Usage

```bash
npm install geom-center-and-normalize --save
```

#### `normalizedPositions = centerAndNormalize(positions)`

Parameters:
`positions` - list of [x, y, z]

Returns:
List of positions [x, y, z] centered at [0, 0, 0] and normalized to bounding box [-0.5, -0.5, -0.5] x [0.5, 0.5, 0.5]

## Example

```javascript
var centerAndNormalize = require('geom-center-and-normalize')

var positions = [[1, 1, 1], [2, 2, 2], [3, 5, 3]]
var normalizedPositions = centerAndNormalize(positions)

// normalizedPositions = [
//   [ -0.25, -0.5, -0.25 ],
//   [ 0, -0.25, 0 ],
//   [ 0.25, 0.5, 0.25 ]
// ]
```

## License

MIT, see [LICENSE.md](http://github.com/vorg/geom-center-and-scale/blob/master/LICENSE.md) for details.
