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
