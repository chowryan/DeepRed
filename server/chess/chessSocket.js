const ChessGame = require('./ChessGame');

const testGame = new ChessGame();

module.exports = (io, client) => {
  // triggered when user picks up a chess piece and
  // attenpt to drop it to a new grid
  client.on('newChessGame', () => {
    console.log('client started new game');
    io.emit('createdChessGame', testGame);
  });
  client.on('attemptMove', (origin, dest) => {
    console.log('attempted Move', origin, dest);
    const board = testGame.movePiece(origin, dest);
    io.emit('attemptMoveResult', board);
  });
  client.on('checkLegalMove', (data) => {
    console.log('coordinates received at server');
    console.log('coordinates: ', data);
    // check chess logic
    // return boolean result
    // client.emit(result);
  });
};
