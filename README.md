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

- options: `object`
  - `center: boolean` – move the bounding box center to `[0, 0, 0]`. Defaults to `true`.
  - `normalize: boolean` – scale positions uniformly so that the bounding box largest side is `normalizedSize`. Defaults to `true`.
  - `normalizedSize: number` – size of the bounding box largest side when normalizing. Defaults to `1`.
  - `align: [x, y, z]` – per axis `-1`, `0` or `1` to put the bounding box max (`-1`) or min (`1`) at its center (`[0, 0, 0]` when centering), eg. `[0, 1, 0]` to sit a geometry on the floor. Defaults to `[0, 0, 0]`.

**Returns**

- positions: `TypedArray | Array | Array<[x, y, z]>` – The positions parameter array updated in place, by default centered at `[0, 0, 0]` with its bounding box largest side normalized to `normalizedSize`.

## License

MIT. See [license file](https://github.com/vorg/geom-center-and-normalize/blob/master/LICENSE.md).
