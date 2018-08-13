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
    // this.checkGame = this.checkGame.bind(this);
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
    }
  }

  checkGame(row, col) {
    // checking row
    let count1 = 0;
    for (let i = col - 3; i <= col + 3; i++) {
      if (this.cellExists(this.state.board(row, i))) {
        if (this.state.board[row][i] === this.state.player) {
          count1++;
        } else {
          count1 = 0;
        }
      }
    }
    // checking col
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
      this.togglePlayer();
    }
    this.state.moves[this.state.player]++;
    console.log(this.state.board);
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
