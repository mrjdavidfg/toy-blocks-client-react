import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("cross-fetch");
import fetch from "cross-fetch";

describe("Actions::Blocks", () => {
  beforeAll(() => {});
  afterAll(() => {});

  const node = {
    url: "https://thawing-springs-53971.herokuapp.com",
    online: true,
    name: "Node 1",
    loading: false,
  };

  it("Should create an action to start loading node blocks", () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve(
        mockResponse(200, "Ok", {
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
        })
      )
    );

    const expectedActions = [
      { type: ActionTypes.LOAD_BLOCKS_START, node },
      {
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
      },
    ];
    const store = mockStore({ blocks: {} });

    return store.dispatch(ActionCreators.loadBlocks(node)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should create an failure action loading node blocks with an error", () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve(mockResponse(422, "Unprocessable Entity", undefined))
    );

    const expectedActions = [
      { type: ActionTypes.LOAD_BLOCKS_START, node },
      { type: ActionTypes.LOAD_BLOCKS_FAILURE, node },
    ];
    const store = mockStore({ blocks: {} });

    return store.dispatch(ActionCreators.loadBlocks(node)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

const mockResponse = (status, statusText, jsonData) => {
  return {
    status: status,
    statusText: statusText,
    headers: {
      "Content-type": "application/json",
    },
    json: () => Promise.resolve(jsonData),
  };
};
