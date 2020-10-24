import fetch from "cross-fetch";
import {
  LOAD_BLOCKS_START,
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS_FAILURE,
} from "../constants/actionTypes";

const loadBlocksStart = (node) => {
  return {
    type: LOAD_BLOCKS_START,
    node,
  };
};

const loadBlocksSuccess = (node, res) => {
  return {
    type: LOAD_BLOCKS_SUCCESS,
    node,
    res,
  };
};

const loadBlocksFailure = (node) => {
  return {
    type: LOAD_BLOCKS_FAILURE,
    node,
  };
};

export function loadBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(loadBlocksStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(loadBlocksFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(loadBlocksSuccess(node, json));
    } catch (err) {
      dispatch(loadBlocksFailure(node));
    }
  };
}
