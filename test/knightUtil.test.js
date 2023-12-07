const knightMoves = require("../js/knightUtil");

test("get shortest path from knight move function", () => {
  expect(knightMoves([3, 3], [4, 3])).toStrictEqual([
    [3, 3],
    [5, 4],
    [3, 5],
    [4, 3],
  ]);
});
