import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

// action types
const MOVE = "MOVE";

// action creators
export const move = (player, row) => {
  type: MOVE, player, row;
};

const reducer = (state = { player: 0, coord: 0 }, action) => {
  switch (action.type) {
    case MOVE: {
      return { player: action.player, row: action.row };
    }
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(createLogger({ collapsed: true }))
);
