import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { move } from "./store";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: this.makeBoard(),
      player: 1,
      moves: {
        "1": 0,
        "2": 0
      }
    };
    this.makeBoard = this.makeBoard.bind(this);
    this.makeGameBoard = this.makeGameBoard.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.checkGame = this.checkGame.bind(this);
    this.cellExists = this.cellExists.bind(this);
  }

  makeBoard() {
    const board = [];
    for (let row = 0; row < 6; row++) {
      let newRow = [];
      for (let col = 0; col < 7; col++) {
        newRow.push(0);
      }
      board.push(newRow);
    }
    return board;
  }

  makeGameBoard() {
    const tds = [];

    // <table> element
    const table = document.createElement("tbody");
    // build a table row <tr>
    for (let h = 0; h < 6; h++) {
      const tr = document.createElement("tr");
      // build a table column <td>
      for (let w = 0; w < 7; w++) {
        const td = document.createElement("td");
        // We'll put the coordinates on the cell
        // Element itself (using dataset),
        // letting us fetch it in a click listener later.
        td.dataset.row = h;
        td.dataset.col = w;
        td.classList.add(`${h}${w}`);
        td.onClick = this.makeMove;
        tds.push(td);
        tr.append(td);
      }
      table.append(tr);
    }
    document.getElementById("board").append(table);
  }

  cellExists(row, col) {
    if (row < 0 || row > 5) {
      return false;
    }
    if (col < 0 || col > 6) {
      return false;
    } else return true;
  }

  checkGame(row, col) {
    // checking row
    let rowCount = 0;
    for (let i = col - 3; i <= col + 3; i++) {
      if (this.cellExists(row, i)) {
        if (this.state.board[row][i] === this.state.player) {
          rowCount++;
          if (rowCount === 4) break;
        } else {
          rowCount = 0;
        }
      }
    }
    // checking col
    let colCount = 0;
    for (let i = row - 3; i <= row + 3; i++) {
      if (this.cellExists(i, col)) {
        if (this.state.board[i][col] === this.state.player) {
          colCount++;
          if (colCount === 4) break;
        } else {
          colCount = 0;
        }
      }
    }
    // checking diag1
    let diag1count = 0;
    let cells = [
      [+row - 3, +col - 3],
      [+row - 2, +col - 2],
      [+row - 1, +col - 1],
      [+row, +col],
      [+row + 1, +col + 1],
      [+row + 2, +col + 2],
      [+row + 3, +col + 3]
    ];
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (this.cellExists(cell[0], cell[1])) {
        if (this.state.board[cell[0]][cell[1]] === this.state.player) {
          diag1count++;
          if (diag1count === 4) break;
        } else {
          diag1count = 0;
        }
      }
    }
    // checking diag2
    let diag2count = 0;
    let secondCells = [
      [+row + 3, +col - 3],
      [+row + 2, +col - 2],
      [+row + 1, +col - 1],
      [+row, +col],
      [+row - 1, +col + 1],
      [+row - 2, +col + 2],
      [+row - 3, +col + 3]
    ];
    for (let i = 0; i < secondCells.length; i++) {
      let cell = secondCells[i];
      if (this.cellExists(cell[0], cell[1])) {
        if (this.state.board[cell[0]][cell[1]] === this.state.player) {
          diag2count++;
          if (diag2count === 4) break;
        } else {
          diag2count = 0;
        }
      }
    }
    console.log(
      "column count: ",
      colCount,
      "row count: ",
      rowCount,
      "diag1 count: ",
      diag1count,
      "diag2 count: ",
      diag2count
    );
    if (colCount >= 4 || rowCount >= 4 || diag1count >= 4 || diag2count >= 4) {
      alert(`Player ${this.state.player} wins!`);
    }
  }

  componentDidMount() {
    this.makeGameBoard();
  }

  makeMove(event) {
    let fill;
    this.state.player === 1 ? (fill = "red") : (fill = "blue");
    let row;
    let col = event.target.dataset.col;
    let i = 5;
    while (i >= 0) {
      if (this.state.board[i][col] === 0) {
        this.state.board[i][col] = this.state.player;
        row = i;
        break;
      } else {
        i--;
      }
    }
    const selectedCol = document.getElementsByClassName(`${row}${col}`);
    if (selectedCol[0] === undefined) {
      alert("That column is full!");
    } else {
      selectedCol[0].classList.add(fill);
      this.state.moves[this.state.player]++;
      this.togglePlayer();
    }
    console.log(this.state.board, this.state.moves);
    if (this.state.moves[this.state.player] >= 4) {
      this.checkGame(row, col);
    }
  }

  togglePlayer() {
    this.state.player === 1
      ? this.setState({ player: 2 })
      : this.setState({ player: 1 });
  }

  render() {
    return (
      <div className="App">
        <div id="board" onClick={this.makeMove} />
      </div>
    );
  }
}

// const mapState = state => {
//   return {
//     player: state.player,
//     row: state.row
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     makeMove: (player, row) => dispatch(move(player, row))
//   };
// };

export default App;
