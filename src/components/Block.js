import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";

const Block = ({ block }) => {
  const classes = useStyles();

  const { attributes } = block;

  return (
    <div className={classes.root}>
      <div className={classes.index}>{attributes.index}</div>
      <Typography variant="body2" className={classes.text}>
        {attributes.data}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px 8px 4px",
    background: "rgba(0, 0, 0, 0.12)",
    borderRadius: 2,
  },
  index: {
    fontSize: theme.typography.pxToRem(10),
    lineHeight: "16px",
    fontWeight: 700,
    color: "#304FFE",
  },
  text: {
    lineHeight: "20px",
  },
}));

Block.propTypes = {
  block: PropTypes.object,
};

export default Block;
