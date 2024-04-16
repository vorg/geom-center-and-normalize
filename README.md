# geom-center-and-normalize

Center a simplicial complex geometry's positions in place and scale them to fill a defined bounding box.

## Installation

```bash
npm install geom-center-and-normalize
```

## Usage

```js
import centerAndNormalize from "geom-center-and-normalize";

const positions = new Float32Array([
  // p1 [x, y, z]
  1, 1, 1,
  // p2 [x, y, z]
  2, 2, 2,
  // p3 [x, y, z]
  3, 5, 3,
]);
const normalizedPositions = centerAndNormalize(positions);
// => Float32Array(9) [
//   -0.25, -0.5, -0.25,
//   0, -0.25, 0,
//   0.25, 0.5, 0.25,
// ]
```

## API

#### `centerAndNormalize(positions, [options]): positions`

**Parameters**

- positions: `TypedArray | Array | Array<[x, y, z]>` – simplicial complex geometry positions (eg. `new Float32Array([x, y, z, x, y, z, ...])/new Array(x, y, z, x, y, z, ...)` or `new Array([x, y, z], [x, y, z], ...)`)

- options: `{ center: boolean, normalize: boolean, normalizedSize: number }` – enable/disable centering/normalizing and control normalized scaling. `center` and `normalize` defaults to `true`. Scale defaults to `1`.

**Returns**

- positions: `TypedArray | Array | Array<[x, y, z]>` – The positions parameter array updated, centered at `[0, 0, 0]` and normalized to a bounding box of `normalizedSize` (`[-halfScale, -halfScale, -halfScale] x [halfScale, halfScale, halfScale]`).

## License

MIT. See [license file](https://github.com/vorg/geom-center-and-normalize/blob/master/LICENSE.md).
