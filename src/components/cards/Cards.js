import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { incrementClicks } from "../../redux/cats/actionCreator";
import { useDispatch } from "react-redux";

const Cards = ({ cat, size }) => {
  const state = useSelector((state) => state.cats);
  const dispatch = useDispatch();

  const handleClick = (_id, clicks) => {
    if (_id && clicks >= 0)
      dispatch(incrementClicks({ clicks: clicks + 1 }, _id));
  };

  const styles = {
    card: {
      border: "1px solid lightgrey",
      boxSizing: "border-box",
      borderRadius: "5px",
      width: size.width || "200px",
      cursor: "pointer",
      minWidth: "150px"
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
      display: "flex",
      justifyContent: "center",
      height: size.height || "100px"
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
    <div style={styles.card} onClick={() => handleClick(cat._id, cat.clicks)}>
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
          No. of times clicked: <span>{cat?.clicks}</span>
        </p>
      </div>
      <div style={styles.imageDiv}>
        <div>
        {!state.loading ? (
          <img src={cat?.image} width={size.width} alt={"Card"}/>
        ) : (
          <Skeleton
            variant="rectangular"
            height={size.height}
            width={size.width}
          />
        )}
        </div>
      </div>
      <div style={styles.oddDiv}>
        <p style={styles.link}>Card Link</p>
      </div>
    </div>
  );
};

export default Cards;
