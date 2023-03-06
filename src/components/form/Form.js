import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Form = ({ cat }) => {
  const inputRef = useRef(null);
  const [name, setName] = useState(cat?.name || "name");
  const [clicks, setClicks] = useState(cat?.id || "0");
  const [imageName, setImageName] = useState("image");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    let file = e.nativeEvent.srcElement.files[0];
    let reader = new FileReader();
    setImageName(file.name);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    console.log({ name: name, image: image, clicks: clicks });
    e.preventDefault();
  };

  useEffect(() => {
    if (cat) {
      setName(cat.name);
      setClicks(cat.id);
    }
  }, [cat]);

  return (
    <div>
      <div>
        <Button variant="contained">Open New Form</Button>
      </div>
      <form onSubmit={handleSubmit}>
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
            value={clicks}
            onChange={(e) => setClicks(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
          <Button variant="contained" color="error">
            Undo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
