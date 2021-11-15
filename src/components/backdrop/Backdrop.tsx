import React from "react";
import classes from "./backdrop.module.scss";

type BackdropProps = {
  posterUrl: string;
  height?: string;
};

const Backdrop = ({ posterUrl, height }: BackdropProps) => (
  <div
    className={classes.backdrop}
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.42), rgba(23, 27, 34, 1)), url(${posterUrl})`,
      minHeight: height ?? "inherit",
    }}
  />
);

export default Backdrop;
