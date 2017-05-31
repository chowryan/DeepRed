import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from 'socket.io-client';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

// Components
import ChessMenu from '../components/ChessMenu';
import SettingsDrawer from '../components/SettingsDrawer';
import Board from './Board';
import Message from '../components/Message';
import CapturedPieces from '../components/CapturedPieces';
import Clock from '../components/Clock';
import MoveHistory from '../components/MoveHistory';
import './css/App.css';
import { receiveGame, movePiece } from '../store/actions';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
// CSS

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.attemptMove = this.attemptMove.bind(this);
    this.newChessGame = this.newChessGame.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.io = socket.connect();
    this.io.on('connect', () => {
      console.log('client side connected!');
    });
    this.newChessGame();
  }

  getUserInfo() {
    axios.get('/api/profiles/')
    .then((response) => {
      console.log('successfully fetched current user infomation', response);
    })
    .catch((err) => {
      console.error('failed to obtain current user infomation!', err);
    });
  }

  newChessGame() {
    const { dispatch } = this.props;
    console.log('make new game');
    this.io.emit('newChessGame');
    this.io.on('createdChessGame', game => dispatch(receiveGame(game)));
  }

  attemptMove(selectedPiece, origin, dest) {
    const { dispatch } = this.props;
    console.log('sending origin and dest coordinates to server');
    this.io.emit('attemptMove', origin, dest);
    this.io.on('attemptMoveResult', (board) => {
      dispatch(receiveGame(board));
      dispatch(movePiece(selectedPiece, origin, dest));
    })
  }

  render() {
    const { moveHistory, capturedPiecesBlack, capturedPiecesWhite, message } = this.props;

    return (
      <div className="site-wrap">
        <ChessMenu />
        <div className="header">
          <table>
            <tbody>
              <tr>
                <td><h1>Deep Red</h1></td>
                <td className="button-cell">
                  <SettingsDrawer />
                  <a href="/profile" className="button">Home</a>
                  <a href="/logout" className="button">Logout</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          <div className="flex-row">

            <div className="flex-col">
              <CapturedPieces color="Black" capturedPieces={capturedPiecesBlack} />
              <Board attemptMove={this.attemptMove} />
              <CapturedPieces color="White" capturedPieces={capturedPiecesWhite} />
              <Message message={message} />
            </div>

            <div className="flex-col right-col">
              <Clock />
              <MoveHistory moveHistory={moveHistory} />
              <Clock />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { gameState, moveState } = state;
  const {
    moveHistory,
    capturedPiecesBlack,
    capturedPiecesWhite,
  } = gameState;
  const { message } = moveState;
  return {
    message,
    moveHistory,
    capturedPiecesBlack,
    capturedPiecesWhite,
  };
}

export default connect(mapStateToProps)(App);
