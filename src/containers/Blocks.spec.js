import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedBlocks, { Blocks } from "./Blocks";
import Block from "../components/Block";

describe("<Blocks />", () => {
  const actions = {
    loadBlocks: jest.fn(),
  };

  const node = {
    url: "https://thawing-springs-53971.herokuapp.com",
    online: false,
    name: "Node 1",
    loading: false,
  };

  const blocks = {
    "https://thawing-springs-53971.herokuapp.com": {
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
  };

  it("should contain <Block />", () => {
    const wrapper = shallow(
      <Blocks actions={actions} node={node} blocks={blocks} />
    );

    expect(wrapper.find(Block).length).toEqual(1);
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({
      nodes: { list: [node] },
      blocks,
    });
    const component = create(
      <Provider store={store}>
        <ConnectedBlocks node={node} />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
