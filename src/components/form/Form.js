import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  imageUpload,
  newCat,
  saveNewCat,
  undoCat,
  updateCat,
} from "../../redux/cats/actionCreator";

const Form = ({ cat }) => {
  const state = useSelector((state) => state.cats);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [name, setName] = useState(cat?.name || "name");
  const [clicks, setClicks] = useState(cat?.clicks || 0);
  const [imageName, setImageName] = useState(cat?.imgName || "image");
  const [image, setImage] = useState(null);

  //reading image to be uploaded

  const handleImageChange = (e) => {
    let file = e.nativeEvent.srcElement.files[0];
    let reader = new FileReader();
    if (file) {
      setImageName(file.name);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  //uploading image and image name

  const handleSubmit = (e, id) => {
    // console.log(e, id);
    e.preventDefault();
    if (id === "newcat") {
      if (name && clicks && imageName) {
        let mycat = {
          name: name,
          clicks: clicks,
          imgName: imageName,
          image: "",
        };
        let myimage = image || cat.image;
        dispatch(saveNewCat(mycat, myimage));
      } else {
        console.log("data not found");
      }
    } else {
      if (image !== cat.image && image && image.trim()) {
        dispatch(imageUpload(image, id));
        dispatch(
          updateCat({ name: name, clicks: clicks, imgName: imageName }, id)
        );
      } else {
        dispatch(
          updateCat({ name: name, clicks: clicks, imgName: imageName }, id)
        );
      }
    }
  };

  //adding new cat

  const addNewCat = () => {
    let newcat = {};
    newcat._id = "newcat";
    newcat.name = name;
    newcat.clicks = clicks;
    newcat.imgName = imageName;
    newcat.image = image || cat.image;
    dispatch(newCat(newcat));
  };

  //updating every time cat changes

  useEffect(() => {
    if (cat) {
      setName(cat.name);
      setClicks(cat.clicks);
      setImageName(cat.imgName);
    }
  }, [cat]);

  const styles = {
    form: {
      position: "relative",
      backgroundColor: "#f2f2f2",
    },
    progressBar: {
      position: "absolute",
      left: "40%",
      top: "40%",
    },
  };

  return (
    <div style={state?.updating ? styles.form : { position: "relative" }}>
      {state.updating ? (
        <div style={styles.progressBar}>
          <CircularProgress />
        </div>
      ) : null}
      <div>
        <Button onClick={addNewCat} variant="contained">
          Open New Form
        </Button>
      </div>
      <form onSubmit={(e) => handleSubmit(e, cat._id)}>
        <div>
          <label>Cat Name</label>
          <TextField
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div>
          <label>Cat Image</label>
          <input
            ref={inputRef}
            hidden
            type={"file"}
            onChange={handleImageChange}
            accept="image/png, image/gif, image/jpeg"
          ></input>
          <TextField
            onClick={() => inputRef.current.click()}
            id="outlined-basic"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={imageName}
          />
        </div>
        <div>
          <label>Cat Clicks</label>
          <TextField
            type={"number"}
            value={clicks >= 0 ? clicks : ''}
            onChange={(e) => setClicks(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
          <Button
            onClick={() => dispatch(undoCat())}
            variant="contained"
            color="error"
          >
            Undo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
