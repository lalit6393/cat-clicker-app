import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats } from "../redux/cats/actionCreator";
import CircularProgress from "@mui/material/CircularProgress";

const Cat = () => {
  const state = useSelector((state) => state.cats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCats());
  }, []);

  return (
    <div>
      {!state.loading ? (
        <div>
          {state.cats.map((cat) => (
            <div key={cat.id}>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
      <p>Cat</p>
      <button>Cat + 1</button>
    </div>
  );
};

export default Cat;
