import { CircularProgress, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const CatList = ({ open, handleListClick, selectedId }) => {
  const state = useSelector((state) => state.cats);
  const catListforMobile = state.cats.map((cat) => (
    <li
      onClick={() => handleListClick(cat.id)}
      key={cat.id}
      style={
        selectedId == cat.id
          ? { backgroundColor: "#1976d2", color: "whitesmoke" }
          : { backgroundColor: "white" }
      }
    >
      <span>{open ? cat.name : cat.name.slice(0, 2)}</span>
      {open ? <span>{cat.id}</span> : null}
    </li>
  ));

  const catList = state.cats.map((cat) => (
    <li
      onClick={() => handleListClick(cat.id)}
      key={cat.id}
      style={
        selectedId == cat.id
          ? { backgroundColor: "#1976d2", color: "whitesmoke" }
          : { backgroundColor: "white" }
      }
    >
      <span>{cat.name}</span>
      <span>{cat.id}</span>
    </li>
  ));

  return (
    <>
      {!state.loading ? (
        <div className="catlist">
          <ul>{catList}</ul>
          <ul>{catListforMobile}</ul>
        </div>
      ) : (
        ["", "", "", "", "", ""].map((e, i) => (
          <Skeleton key={i} variant="text" width={"240px"} height={"60px"} />
        ))
      )}
    </>
  );
};

export default CatList;
