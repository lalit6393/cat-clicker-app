import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Cards = ({ cat, size }) => {
  const state = useSelector((state) => state.cats);

  const styles = {
    card: {
      border: "1px solid lightgrey",
      boxSizing: "border-box",
      borderRadius: "5px",
      width: size.width || "200px",
    },
    name: {
      fontSize: size.font,
    },
    oddDiv: {
      boxSizing: "border-box",
      padding: "0 1rem",
    },
    imageDiv: {
      overflow: "hidden",
    },
    link: {
      color: "#1e88e5",
      cursor: "pointer",
    },
    p: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#5b5959",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.oddDiv}>
        <h2 style={styles.name}>
          {cat?.name ? (
            <>
              {cat.name?.length < 17 ? cat.name : cat.name.slice(0, 16) + "..."}
            </>
          ) : (
            <Skeleton variant="text" fontSize={size.font} />
          )}
        </h2>
        <p style={styles.p}>
          No. of times clicked: <span>{cat?.id}</span>
        </p>
      </div>
      <div style={styles.imageDiv}>
        {!state.loading ? (
          <img src="#" height={size.height} width={size.width} />
        ) : (
          <Skeleton
            variant="rectangular"
            height={size.height}
            width={size.width}
          />
        )}
      </div>
      <div style={styles.oddDiv}>
        <p style={styles.link}>Card Link</p>
      </div>
    </div>
  );
};

export default Cards;
