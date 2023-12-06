/**
 * Problem: find shortest path for a knight in chess to move from A to B
 * GUI: console terminal
 * Input: 2D position array i.e. [x,y] of start and end position
 * Output: 2D array of shortest path from A to B
 * Constraint:
 * - chess board size is 8x8 (position can go from [0,0] to [7,7])
 * - [0,0] is at bottom left of the board
 * - [7,7] is at top right of the board
 * - rules of chess
 * - knight movement:
 *      - 2 square horizontal + 1 square vertical
 *      - 2 square vertical + 1 square horizontal
 *
 * Some possible Solutions
 * - knight move is an undirected graph (since it can go the same way forward/backward)
 * - generate all vertexes of all position in an 8x8 graph
 * - dijkstra algorithm: traverse through graph and store shortest path distance
 */

const BOARD_SIZE = 8;

class Vertex {
  constructor(pos, previousVert) {
    this.pos = pos;
    this.previousVert = previousVert;
  }
}

/**
 *
 * @param {Array} startPos
 * @param {Array} endPos
 */
function knightMoves(startPos, endPos) {
  if (!isValidMove(startPos) || !isValidMove(endPos)) return null;
  let queue = [];
  let visited = [];
  let vertex = null;

  queue.push(new Vertex(startPos, null));
  visited.push(new Vertex(startPos, null));

  while (queue.length > 0) {
    vertex = queue.shift();

    if (vertex.pos[0] === endPos[0] && vertex.pos[1] === endPos[1]) {
      break;
    }

    let neighbors = getPossibleKnightMoves(vertex.pos);

    for (let neighbor of neighbors) {
      if (
        visited.find(
          (item) => item.pos[0] === neighbor[0] && item.pos[1] === neighbor[1]
        ) != null
      ) {
        continue;
      }

      let nextVertex = new Vertex(neighbor, vertex);
      queue.push(nextVertex);
      visited.push(nextVertex);
    }
  }

  return getVertexArray(vertex);
}

function getVertexArray(vertex) {
  let stack = [];
  let currentVert = vertex;
  while (currentVert != null) {
    stack.unshift(currentVert.pos);
    currentVert = currentVert.previousVert;
  }
  return stack;
}

function isValidMove(pos) {
  if (pos[0] == null || pos[1] == null) return false;
  if (pos[0] > BOARD_SIZE - 1 || pos[0] < 0) return false;
  if (pos[1] > BOARD_SIZE - 1 || pos[1] < 0) return false;
  return true;
}

function getPossibleKnightMoves(pos) {
  //max knight move is 8
  const possibleMoves = [
    [pos[0] + 2, pos[1] + 1],
    [pos[0] + 2, pos[1] - 1],
    [pos[0] - 2, pos[1] + 1],
    [pos[0] - 2, pos[1] - 1],
    [pos[0] + 1, pos[1] + 2],
    [pos[0] + 1, pos[1] - 2],
    [pos[0] - 1, pos[1] + 2],
    [pos[0] - 1, pos[1] - 2],
  ];

  const realPossibleMoves = [];

  for (let move of possibleMoves) {
    if (isValidMove(move)) {
      realPossibleMoves.push(move);
    }
  }
  return realPossibleMoves;
}

module.exports = knightMoves;
