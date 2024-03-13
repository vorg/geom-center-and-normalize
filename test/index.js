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
    centerAndNormalize(positions, { scale: false }),
    normalizedPositions,
  );
  assert.equal(centerAndNormalize(positions, { scale: false }), positions);
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

test(`should center and normalize for scale "true" and return that array`, (t) => {
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

  assert.deepStrictEqual(
    centerAndNormalize(positions, { scale: true }),
    normalizedPositions,
  );
  assert.equal(centerAndNormalize(positions, { scale: true }), positions);
});
test(`should center and normalize for scale 2 and return that array`, (t) => {
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
    centerAndNormalize(positions, { scale: 2 }),
    normalizedPositions,
  );
  assert.equal(centerAndNormalize(positions, { scale: 2 }), positions);
});

test("should scale to 0", (t) => {
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
    centerAndNormalize(positions, { scale: 0 }),
    normalizedPositions,
  );
});
