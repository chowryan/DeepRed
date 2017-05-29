import React, { Component } from 'react';
import { connect } from 'react-redux';

import { invalidSelection, selectPiece, movePiece, capturePiece } from '../store/actions';
import './css/Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
        ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
        ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
      ],
      message: '  ',
      selectedPosition: '',
      selectedPiece: '',
      originDestCoord: [],
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
  }

  getImage(CP) {
    return <img className="piece-img" src={`/assets/${CP}.png`} />;
  }

  onClick(coordinates) {
    const { dispatch, board, fromPosition, selectedPiece, playerColor } = this.props;

    const x = coordinates[0];
    const y = coordinates[1];
    const selection = board[x][y];

    // If no piece is currently selected
    if (selectedPiece === '') {
      if (selection && selection[0] === playerColor) {
        dispatch(selectPiece(selection, coordinates));
      } else {
        dispatch(invalidSelection(coordinates));
      }

      // If a piece is already selected
      /* NOTE: CHECK FOR VALID MOVE REQUIRED HERE    */
    } else if (selection === null) {
      dispatch(movePiece(selectedPiece, fromPosition, coordinates));
    } else if (selectedPiece[0] === board[x][y][0]) {
      dispatch(invalidSelection(coordinates));
    } else {
      dispatch(capturePiece(coordinates));
    }
  }

  render() {
    const { board } = this.props;
    return (
      <div className="board">
        {board.map((row, rowIndex) => {
          return (<div key={Math.random()} className="board-row">
            {row.map((col, colIndex) => (
              <div
                className={((rowIndex + colIndex) % 2 === 1) ? 'board-col dark' : 'board-col light'}
                key={rowIndex.toString() + colIndex.toString()}
                onClick={() => this.onClick([rowIndex, colIndex])}
              >
                {(col) ? this.getImage(col) : ''}
              </div>),
            )}
          </div>);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { gameState, boardState, moveState } = state;
  const { playerColor } = gameState;
  const { board } = boardState;
  const { fromPosition, selectedPiece } = moveState;
  return {
    playerColor,
    board,
    fromPosition,
    selectedPiece,
  };
}

export default connect(mapStateToProps)(Board);
