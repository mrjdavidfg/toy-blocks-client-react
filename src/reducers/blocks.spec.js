import * as ActionTypes from "../constants/actionTypes";
import reducer from "./blocks";
import initialState from "./initialState";

describe("todos reducer", () => {
  const getInitialState = () => {
    return initialState().blocks;
  };

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should return the initial state", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle LOAD_BLOCKS_START", () => {
    const appState = {
      [node.url]: {
        loading: false,
        error: false,
        list: [],
      },
    };

    const action = { type: ActionTypes.LOAD_BLOCKS_START, node };
    const expected = {
      [node.url]: {
        loading: true,
        error: false,
        list: [],
      },
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle LOAD_BLOCKS_SUCCESS", () => {
    const appState = {
      [node.url]: {
        loading: false,
        error: false,
        list: [],
      },
    };

    const action = {
      type: ActionTypes.LOAD_BLOCKS_SUCCESS,
      node,
      res: {
        data: [
          {
            id: 123,
            type: "blocks",
            attributes: {
              index: 1,
              timestamp: 1530674152,
              data: "Block 1",
              "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
              hash: "udfJLmh13UNAxG4F/1on07OMN1K1vCuaTYn9H2XGiX0=",
            },
          },
        ],
      },
    };

    const expected = {
      [node.url]: {
        loading: false,
        error: false,
        list: action.res.data,
      },
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle LOAD_BLOCKS_FAILURE", () => {
    const appState = {
      [node.url]: {
        loading: false,
        error: false,
        list: [],
      },
    };

    const action = {
      type: ActionTypes.LOAD_BLOCKS_FAILURE,
      node,
    };

    const expected = {
      [node.url]: {
        loading: false,
        error: true,
        list: [],
      },
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
