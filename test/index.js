import test from "node:test";
import assert from "node:assert";

import centerAndNormalize from "../index.js";

test("should normalize a typed array and return that array", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    1, 1, 1,
    2, 2, 2,
    3, 5, 3
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    -0.25, -0.5, -0.25,
    0, -0.25, 0,
    0.25, 0.5, 0.25,
  ]);

  assert.deepStrictEqual(centerAndNormalize(positions), normalizedPositions);
  assert.equal(centerAndNormalize(positions), positions);
});

test("should normalize a flat array of positions and return that array", (t) => {
  // prettier-ignore
  const positions = [
    1, 1, 1,
    2, 2, 2,
    3, 5, 3
  ];

  // prettier-ignore
  const normalizedPositions = [
    -0.25, -0.5, -0.25,
    0, -0.25, 0,
    0.25, 0.5, 0.25,
  ];

  assert.deepStrictEqual(centerAndNormalize(positions), normalizedPositions);
  assert.equal(centerAndNormalize(positions), positions);
});

test("should normalize an array of position arrays and return that array", (t) => {
  // prettier-ignore
  const positions = [
    [1, 1, 1],
    [2, 2, 2],
    [3, 5, 3]
  ];

  // prettier-ignore
  const normalizedPositions = [
    [-0.25, -0.5, -0.25],
    [0, -0.25, 0],
    [0.25, 0.5, 0.25],
  ];

  assert.deepStrictEqual(centerAndNormalize(positions), normalizedPositions);
  assert.equal(centerAndNormalize(positions), positions);
});

test("should normalize positions at unit bounds to the unit bbox", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0.5, 0, 0,
    -0.5, 0, 0,

    0, 0.5, 0,
    0, -0.5, 0,

    0, 0, 0.5,
    0, 0, -0.5,
  ]);

  assert.deepStrictEqual(centerAndNormalize(positions), positions);
});

test("should normalize positions uniformly", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    1, 1, 1,
    -1, -1, -1,
  ]);
  // prettier-ignore
  const normalizedPositions = new Float32Array([
    0.5, 0.5, 0.5,
    -0.5, -0.5, -0.5,
  ]);

  assert.deepStrictEqual(centerAndNormalize(positions), normalizedPositions);
});

test("should only center positions", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0, 0, 0,
    2, 0, 0,
    2, 2, 0,
    0, 2, 0,
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    -1, -1, 0,
    1, -1, 0,
    1, 1, 0,
    -1, 1, 0,
  ]);

  assert.deepStrictEqual(
    centerAndNormalize(positions, { normalize: false }),
    normalizedPositions,
  );
  assert.equal(centerAndNormalize(positions, { normalize: false }), positions);
});
test("should only normalize positions", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0, 0, 0,
    10, 0, 0,
    10, 10, 0,
    0, 10, 0,
    10, 10, 10,
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    4.5, 4.5, 4.5,
    5.5, 4.5, 4.5,
    5.5, 5.5, 4.5,
    4.5, 5.5, 4.5,
    5.5, 5.5, 5.5,
  ]);

  assert.deepStrictEqual(
    centerAndNormalize(positions, { center: false }),
    normalizedPositions,
  );
  assert.equal(centerAndNormalize(positions, { center: false }), positions);
});

test(`should center and normalize for normalizedSize 2 and return that array`, (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    1, 1, 1,
    2, 2, 2,
    3, 5, 3
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    -0.25, -0.5, -0.25,
    0, -0.25, 0,
    0.25, 0.5, 0.25,
  ]).map((n) => n * 2);

  assert.deepStrictEqual(
    centerAndNormalize(positions, { normalizedSize: 2 }),
    normalizedPositions,
  );
  assert.equal(centerAndNormalize(positions, { normalizedSize: 2 }), positions);
});

test("should normalize to size 0", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    1, 1, 1,
    2, 2, 2,
    3, 5, 3
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ]);

  assert.deepEqual(
    centerAndNormalize(positions, { normalizedSize: 0 }),
    normalizedPositions,
  );
});
test("should handle array of zero positions", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ]);

  assert.deepEqual(centerAndNormalize(positions), normalizedPositions);
});

test("should align positions on each axis", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    1, 1, 1,
    2, 2, 2,
    3, 5, 3
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    0, -0.5, -0.5,
    0.25, -0.25, -0.25,
    0.5, 0.5, 0,
  ]);

  assert.deepStrictEqual(
    centerAndNormalize(positions, { align: [-1, 0, 1] }),
    normalizedPositions,
  );
});

test("should align positions relative to their bbox center when not centering", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0.5, 0, 0,
    1.5, 1, 1,
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    0, 0.5, 0,
    1, 1.5, 1,
  ]);

  assert.deepStrictEqual(
    centerAndNormalize(positions, {
      center: false,
      normalize: false,
      align: [1, -1, 0],
    }),
    normalizedPositions,
  );
});

test("should align positions with their normalized size", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0, 0, 0,
    8, 4, 0,
  ]);

  // prettier-ignore
  const normalizedPositions = new Float32Array([
    0, -1, 0,
    2, 0, 0,
  ]);

  assert.deepStrictEqual(
    centerAndNormalize(positions, { normalizedSize: 2, align: [-1, 1, 0] }),
    normalizedPositions,
  );
});

test("should keep precision for positions far from the origin", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    10000.1, 0, 0,
    10000.13, 0.03, 0.03,
  ]);

  centerAndNormalize(positions);

  assert.equal(positions[0], -0.5);
  assert.equal(positions[3], 0.5);
});

test("should leave positions untouched when no transform is requested", (t) => {
  // prettier-ignore
  const positions = new Float32Array([
    0.001, 0, 0,
    10000, 0, 0,
  ]);
  const expectedPositions = positions.slice();

  assert.equal(
    centerAndNormalize(positions, { center: false, normalize: false }),
    positions,
  );
  assert.deepStrictEqual(positions, expectedPositions);
});

test("should align an array of position arrays", (t) => {
  // prettier-ignore
  const positions = [
    [0, 0, 0],
    [8, 4, 0],
  ];

  // prettier-ignore
  const normalizedPositions = [
    [0, -1, 0],
    [2, 0, 0],
  ];

  assert.deepStrictEqual(
    centerAndNormalize(positions, { normalizedSize: 2, align: [-1, 1, 0] }),
    normalizedPositions,
  );
});
