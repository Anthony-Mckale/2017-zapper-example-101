function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    return (
      <div>
        {[0,1,2].map((item, i) =>
          <div key={i} className="board-row">
            {[0,1,2].map((item, j) =>
              this.renderSquare((i * 3) + j)
            )}
          </div>
        )}
      </div>
    );
  }
  /**
   * @param {number} i
   */
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        selected: null
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    this.state.stepNumber++;

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    var that = this;

    const moves = history.map((step, move) => {
      var x = (step.selected % 3) + 1;
      var y = Math.floor(step.selected / 3) + 1;
      const desc = move ?
      'Move #' + move + ' (' + x + ',' + y + ') selected':
        'Game start';
      const className = (move == that.state.stepNumber - 1) ? 'active' : '';
      // console.log(desc, move, that.state.stepNumber, move == that.state.stepNumber - 1);
      return (
        <li key={move} className={className}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });
  }

  /**
   * @param {number} i
   */
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        selected: i
      }]),
      xIsNext: !this.state.xIsNext
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
