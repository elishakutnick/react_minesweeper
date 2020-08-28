import { Board as GameBoard } from '../../lib/minesweeper';
import Board from '../components/board';
import React from 'react';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new GameBoard(this.props.size, this.props.bombs);
    this.state = { board: board, clock: 0 };
    this.timer = null;
    this.updateGame = this.updateGame.bind(this);
    this.restart = this.restart.bind(this);
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    if (!this.timer) {
      this.timer = setInterval(() => {
        const time = this.state.clock;
        this.setState({ clock: time + 1 })
      }, 1000);
    }
    this.setState({ board: this.state.board })
  }

  toDisplayString(number) {
    if (number < 0) {
      return `-${(-number).toString().padStart(2, "0")}`;
    } else {
      return number.toString().padStart(3, "0");
    }
  }

  restart() {
    this.setState({ board: new GameBoard(this.props.size, this.props.bombs) });
    this.setState({ clock: 0 });
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  get face() {
    if (this.state.board.lost()) return "🤣"
    if (this.state.board.won()) return "😎"
    return "🤔"
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.board.lost() || this.state.board.won()) {
      this.stopTimer();
    }
  }

  render() {
    let message = '';
    if (this.state.board.lost()) message = 'You Lose';
    if (this.state.board.won()) message = 'You Win';

    let klass = '';
    if (message) klass = 'show';

    const numLeft = this.state.board.numBombs - this.state.board.numFlag;

    return (
      <>
        <div className="status-bar">
          <div className="display"><span>{this.toDisplayString(numLeft)}</span></div>
          <button>{this.face}</button>
          <div className="display"><span>{this.toDisplayString(this.state.clock)}</span></div>
        </div>
        <div className="game-main">
          <Board board={this.state.board} update={this.updateGame}/>
          <div className={`window modal ${klass}`}>
            <div className="title-bar">
              <div className="title-bar-text">
                Alert
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={this.restart}></button>
              </div>
            </div>
            <div className="window-body">
              {message}
              <section className="field-row play-again">
                <button onClick={this.restart}>Play Again</button>
              </section>

            </div>
          </div>
        </div>
      </>
    )
  }


}


