import React, { useEffect, useState } from "react";
import Cards from "../cards/Cards";
import CatList from "../catsList/CatList";
import Form from "../form/Form";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats } from "../../redux/cats/actionCreator";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const state = useSelector((state) => state.cats);
  const dispatch = useDispatch();
  const galary = state.cats.map((cat) => (
    <li key={cat.id} onClick={() => handleListClick(cat.id)}>
      {
        <Cards
          cat={cat}
          size={{ width: "200px", height: "100px", font: "1.1rem" }}
        />
      }
    </li>
  ));
  const noGalary = ["", "", "", "", "", ""].map((no, i) => (
    <li key={i}>
      {
        <Cards
          cat={{}}
          size={{ width: "200px", height: "100px", font: "1.1rem" }}
        />
      }
    </li>
  ));

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListClick = (id) => {
    setSelectedId(id);
    handleClose();
    setSelectedCat(state.cats.find((cat) => cat.id === id));
  };

  useEffect(() => {
    if (state.loading === false) {
      setSelectedCat(state.cats.find((cat) => cat?.id === 1));
    }
  }, [state.loading]);

  useEffect(() => {
    var screenWidth = window.innerWidth;
    if (screenWidth < 570 && open === true) setOpen(false);
    window.addEventListener("resize", (event) => {
      var screenWidth = window.innerWidth;
      if (screenWidth < 570) {
        handleClose();
      }
      if (screenWidth >= 570) {
        setOpen(true);
      }
    });
    dispatch(fetchCats());
  }, []);

  return (
    <>
      <header className={styles.header}>
        <IconButton className={styles.iconButton} onClick={handleOpen}>
          <MenuIcon
            sx={{
              cursor: "pointer",
              width: "30px",
              height: "30px",
              paddingLeft: "1rem",
            }}
          />
        </IconButton>
        <h2>Cat Clicker App</h2>
      </header>
      <section style={open ? { width: "max-content" } : { width: "auto" }}>
        <div className={styles.catList}>
          <CatList
            open={open}
            handleListClick={handleListClick}
            selectedId={selectedId}
          />
        </div>
        <article>
          <div className={styles.card}>
            <Cards
              cat={selectedCat}
              size={{ width: "280px", height: "200px", font: "1.5rem" }}
            />
          </div>
          <div className={styles.form}>
            <Form cat={selectedCat} />
          </div>
        </article>
      </section>
      <section>
        <h2>Cat Image Galary</h2>
        <article className={styles.imgGalary}>
          <ul>{galary.length > 0 ? <>{galary}</> : <>{noGalary}</>}</ul>
        </article>
      </section>
    </>
  );
};

export default Home;
