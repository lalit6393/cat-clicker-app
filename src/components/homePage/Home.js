import React, { useEffect, useState } from "react";
import Cards from "../cards/Cards";
import CatList from "../catsList/CatList";
import Form from "../form/Form";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats, incrementClicks } from "../../redux/cats/actionCreator";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedCat, setSelectedCat] = useState(null);
  const [cardWidth, setCardWidth] = useState("200px");
  const [cardHeight, setCardHeight] = useState("140px");
  const state = useSelector((state) => state.cats);
  const dispatch = useDispatch();

  //for desktop view

  const galary = state.cats.map((cat) => (
    <li key={cat._id} onClick={() => handleListClick(cat._id, cat.clicks)}>
      {
        <Cards
          cat={cat}
          size={{
            width: cardWidth || "200px",
            height: cardHeight || "100px",
            font: "1.1rem",
          }}
        />
      }
    </li>
  ));

  //for mobile view

  const noGalary = ["", "", "", "", "", ""].map((no, i) => (
    <li key={i}>
      {
        <Cards
          cat={{}}
          size={{
            width: "150px",
            height: "100px",
            font: "1.1rem",
          }}
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

  const handleListClick = (_id, clicks) => {
    if (_id && clicks >= 0)
      dispatch(incrementClicks({ clicks: clicks + 1 }, _id));
    setSelectedId(_id);
    handleClose();
    setSelectedCat(state.cats.find((cat) => cat._id === _id));
  };

  //updating main card in the middle
  useEffect(() => {
    if (selectedId && state.cats.find((cat) => cat._id === selectedId)) {
      setSelectedCat(state.cats.find((cat) => cat._id === selectedId));
    }
  }, [state]);

  //selecting main card in the middle

  useEffect(() => {
    if (
      (selectedId === 0 &&
        !selectedCat &&
        state.loading === false &&
        state?.cats[0]?._id) ||
      state?.cats[0]?._id === "newcat" ||
      (state?.cats?.length > 0 &&
        !state.cats.find((cat) => cat._id === selectedId))
    ) {
      setSelectedId(state.cats[0]._id);
      setSelectedCat(state.cats[0]);
    }
  }, [state.loading || state?.cats[0]]);

  //calling cats fetch function and listening for resize event

  useEffect(() => {
    var screenWidth = window.innerWidth;
    if (screenWidth < 570){
      setCardWidth("160px");
      setCardHeight("100px");
    }
    if (screenWidth < 570 && open === true) setOpen(false);
    window.addEventListener("resize", (event) => {
      var screenWidth = window.innerWidth;
      if (screenWidth < 570) {
        handleClose();
        setCardWidth("160px");
        setCardHeight("100px");
      }
      if (screenWidth >= 570) {
        setOpen(true);
        setCardWidth("200px");
      }
    });
    // not updating so passed false
    dispatch(fetchCats(false));
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
          <ul>{galary?.length > 0 ? <>{galary}</> : <>{noGalary}</>}</ul>
        </article>
      </section>
    </>
  );
};

export default Home;
