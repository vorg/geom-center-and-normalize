# geom-center-and-normalize

Center a simplicial complex geometry's positions and scale them to fill 1x1x1 bounding box.

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

- positions: `TypedArray|Array` – simplicial complex geometry positions (eg. `new Float32Array([x, y, z, x, y, z, ...])/new Array(x, y, z, x, y, z, ...) ` or `new Array([x, y, z], [x, y, z], ...)`)

- options: `{ center: boolean, normalize: boolean }` – only center or normalize. Both defaults to `true`.

**Returns**

- positions: `TypedArray|Array` – The positions parameter array updated, centered at `[0, 0, 0]` and normalized to a unit bounding box `[-0.5, -0.5, -0.5] x [0.5, 0.5, 0.5]`.

## License

MIT. See [license file](https://github.com/vorg/geom-center-and-normalize/blob/master/LICENSE.md).
