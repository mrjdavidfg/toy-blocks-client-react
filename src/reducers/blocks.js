import {
  LOAD_BLOCKS_START,
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS_FAILURE,
} from "../constants/actionTypes";
import initialState from "./initialState";

//state is the node
export default function blocksReducer(state = initialState().blocks, action) {
  let nodeUrl;

  switch (action.type) {
    case LOAD_BLOCKS_START:
      nodeUrl = action.node.url;

      return {
        ...state,
        [nodeUrl]: { loading: true, error: false, list: [] },
      };
    case LOAD_BLOCKS_SUCCESS:
      nodeUrl = action.node.url;

      return {
        ...state,
        [nodeUrl]: {
          loading: false,
          error: false,
          list: action.res.data,
        },
      };
    case LOAD_BLOCKS_FAILURE:
      nodeUrl = action.node.url;

      return {
        ...state,
        [nodeUrl]: { loading: false, error: true, list: [] },
      };
    default:
      return state;
  }
}
