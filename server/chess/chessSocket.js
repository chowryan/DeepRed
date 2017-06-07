const ChessGame = require('./ChessGame');
// const chessDB = require('../chessDB');

const allGames = {};
const allRooms = {};
let roomInfo = {};
let count = 1;

const createAndSaveNewGame = (room) => {
  const newGame = new ChessGame();
  allGames[room] = newGame;
};

module.exports = (io, client) => {
  let currentName = '';
  let currentEmail = '';
  // user socket communications
  client.on('sendCurrentUserNameAndEmail', (currentUserName, currentUserEmail) => {
    currentName = currentUserName;
    currentEmail = currentUserEmail;

    // dynamically create room number
    const room = `room ${count}`;
    // if current room has no player
    if (roomInfo.playerW === undefined || roomInfo.playerW === '') {
      client.join(room, () => {
        // add room number and first player into current room
        roomInfo.room = room;
        roomInfo.playerW = currentName;
        roomInfo.playerWemail = currentEmail;
        roomInfo.playerWid = client.client.id;
        roomInfo.playerWclicked = false;
        roomInfo.playerWtime = 600;
        roomInfo.thisUserId = client.client.id;
        // create new game instance
        createAndSaveNewGame(room);
        // save to DB
        // chessDB.newGame({
        //   session_id: room,
        //   color: 'white',
        //   display: currentUser,
        // });
        //
        // currentUser = '';
        io.in(room).emit('firstPlayerJoined', roomInfo);
      });
      // if current room already has one player
    } else if (roomInfo.playerB === undefined || roomInfo.playerB === '') {
      client.join(room, () => {
        // add second player into current room
        roomInfo.playerB = currentName;
        roomInfo.playerBemail = currentEmail;
        roomInfo.playerBid = client.client.id;
        roomInfo.playerBclicked = false;
        roomInfo.playerBtime = 600;
        roomInfo.thisUserId = client.client.id;
        allRooms[room] = roomInfo;
        io.in(room).emit('secondPlayerJoined', roomInfo);
        // save playerB to current game in DB
        // chessDB.joinGame({
        //   session_id: room,
        //   color: 'black',
        //   display: currentUser,
        // });
        // create new game instance
        createAndSaveNewGame(room);
        io.in(room).emit('startGame', roomInfo);
        // empty room info array, increament count, and ready for creating new room)
        roomInfo = {};
        count += 1;
      });
    }
  });

  // logic socket communications
  client.on('attemptMove', (origin, dest, selection, clientRoom) => {
    console.log('attempted Move: ', origin, dest);
    console.log('room number: ', clientRoom);
    const newState = allGames[clientRoom].movePiece(origin, dest);
    io.in(clientRoom).emit('attemptMoveResult', newState.error, origin, dest, selection, newState.game.turn, newState.castling);
  });

  client.on('checkLegalMoves', (origin, clientRoom, id) => {
    // console.log('checkLegalMove: ', origin, dest);
    // console.log('room number: ', room);
    // const bool = isLegalMove(allGames[clientRoom], origin, dest).bool;
    if (origin) {
      const boolBoard = allGames[clientRoom].checkAllMovesOfOrigin(origin);
      io.to(id).emit('checkLegalMovesResults', boolBoard);
    }
  });

  // control socket communications
  client.on('requestPause', (clientRoom) => {
    io.in(clientRoom).emit('requestPauseDialogBox');
  });

  client.on('rejectPauseRequest', (clientRoom) => {
    io.in(clientRoom).emit('rejectPauseRequestNotification');
  });

  client.on('handleRejectPauseRequest', (room, id) => {
    if (id === allRooms[room].playerBid) {
      io.in(room).emit('cancelPauseNotification', allRooms[room].playerB);
    } else {
      io.in(room).emit('cancelPauseNotification', allRooms[room].playerW);
    }
  });

  client.on('agreePauseRequest', (room, id) => {
    if (id === allRooms[room].playerBid) {
      allRooms[room].playerBclicked = true;
    }
    if (id === allRooms[room].playerWid) {
      allRooms[room].playerWclicked = true;
    }
    if (allRooms[room].playerBclicked === true && allRooms[room].playerWclicked === true) {
      io.in(room).emit('executePauseRequest');
      allRooms[room].playerBclicked = false;
      allRooms[room].playerWclicked = false;
    }
  });

  client.on('requestResume', (room) => {
    io.in(room).emit('executeResumeRequest');
  });

  client.on('message', (msg, room) => {
    let user = '';
    for (let key in allRooms[room]) {
      if (allRooms[room][key] === client.id) {
        if (key === 'playerWid') {
          user = allRooms[room].playerW;
        } else {
          user = allRooms[room].playerB;
        }
      }
    }
    io.in(room).emit('message', `${user}: ${msg}`);
  });
};
