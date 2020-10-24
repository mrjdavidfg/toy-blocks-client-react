import * as ActionTypes from "../constants/actionTypes";

import configureStore from "./configureStore";

describe("Store", () => {
  const nodes = {
    list: [
      { url: "a.com", online: false, name: null, loading: false },
      { url: "b.com", online: false, name: null, loading: false },
      { url: "c.com", online: false, name: null, loading: false },
      { url: "d.com", online: false, name: null, loading: false },
    ],
  };

  beforeAll(() => {});
  afterAll(() => {});

  it("should display results when necessary data is provided", () => {
    const store = configureStore({ nodes });

    const actions = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[0],
        res: { node_name: "alpha" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[1],
        res: { node_name: "beta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[0],
        res: { node_name: "gamma" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[2],
        res: { node_name: "delta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[1],
        res: { node_name: "epsilon" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[0],
        res: { node_name: "zeta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[0],
        res: { node_name: "eta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.list[0],
        res: { node_name: "theta" },
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { url: "a.com", online: true, name: "theta", loading: false },
        { url: "b.com", online: true, name: "epsilon", loading: false },
        { url: "c.com", online: true, name: "delta", loading: false },
        { url: "d.com", online: false, name: null, loading: false },
      ],
    };

    expect(actual.nodes).toEqual(expected);
  });

  it("should display blocks results when necessary data is provided", () => {
    const store = configureStore({
      nodes: {
        list: [
          { url: "a.com", online: true, name: "theta", loading: false },
          { url: "b.com", online: false, name: "epsilon", loading: false },
          { url: "c.com", online: true, name: "delta", loading: false },
        ],
      },
      blocks: {
        "a.com": {
          loading: false,
          error: false,
          list: [],
        },
        "b.com": {
          loading: false,
          error: false,
          list: [],
        },
        "c.com": {
          loading: false,
          error: false,
          list: [],
        },
      },
    });

    const actions = [
      {
        type: ActionTypes.LOAD_BLOCKS_SUCCESS,
        node: { url: "a.com", online: true, name: "theta", loading: false },
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
      {
        type: ActionTypes.LOAD_BLOCKS_START,
        node: { url: "b.com", online: false, name: "epsilon", loading: false },
      },
      {
        type: ActionTypes.LOAD_BLOCKS_FAILURE,
        node: { url: "c.com", online: true, name: "delta", loading: false },
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      "a.com": {
        loading: false,
        error: false,
        list: [
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
      "b.com": {
        loading: true,
        error: false,
        list: [],
      },
      "c.com": {
        loading: false,
        error: true,
        list: [],
      },
    };

    expect(actual.blocks).toEqual(expected);
  });
});
