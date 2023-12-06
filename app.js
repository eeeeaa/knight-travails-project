const knightMoves = require("./js/knightUtil");

function printAnswer(array) {
  console.log(`You made it in ${array.length} moves! Here's your path:`);
  for (let item of array) {
    console.log(item);
  }
}

printAnswer(knightMoves([3, 3], [4, 3]));
