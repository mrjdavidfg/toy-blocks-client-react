import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/blocks";
import Block from "../components/Block";

// Container
export class Blocks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.node.online !== prevProps.node.online) {
      if (this.props.node.online) {
        this.props.actions.loadBlocks(this.props.node);
      }
    }
  }

  render() {
    const { node, blocks } = this.props;

    if (!blocks) return null;

    const { loading, error, list } = blocks[node.url];

    return (
      <div style={{ width: "100%", display: "grid", gridGap: 8 }}>
        {loading
          ? "Loading..."
          : error
          ? "Error!"
          : list.length === 0
          ? "No blocks"
          : list.map((block) => <Block key={block.id} block={block} />)}
      </div>
    );
  }
}

Blocks.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    blocks: PropTypes.array,
  }).isRequired,
  blocks: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    blocks: state.blocks,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
