import {
  FETCH_CAT_FAILURE,
  FETCH_CAT_REQUEST,
  FETCH_CAT_SUCCESS,
  UPDATE_CAT_REQUEST,
  UPDATE_CAT_SUCCESS,
  UPDATE_CAT_FAILURE,
  NEW_CAT_REQUEST
} from "./actionType";
import axios from "axios";

export const fetchCatRequest = () => {
  return {
    type: FETCH_CAT_REQUEST,
  };
};

export const fetchCatSuccess = (cats) => {
  return {
    type: FETCH_CAT_SUCCESS,
    payload: cats,
  };
};

export const fetchCatFailure = (error) => {
  return {
    type: FETCH_CAT_FAILURE,
    payload: error,
  };
};

export const updateCatRequest = () => {
  return {
    type: UPDATE_CAT_REQUEST,
  };
};

export const updateCatSuccess = () => {
  return {
    type: UPDATE_CAT_SUCCESS,
  };
};

export const updateCatFailure = (error) => {
  return {
    type: UPDATE_CAT_FAILURE,
    payload: error,
  };
};

export const newCatRequest = (cat) => {
  return {
    type: NEW_CAT_REQUEST,
    payload: cat,
  };
};

export const newCat = (cat) => {
  return (dispatch) => {
    dispatch(newCatRequest(cat));
  }
}

export const undoCat = () => {
  return (dispatch) => {
    dispatch(fetchCats(true));
  }
}

export const fetchCats = (updating) => {
  return (dispatch) => {
    if (!updating) dispatch(fetchCatRequest());
    axios
      .get("http://localhost:3000/cat")
      .then((response) => {
        const cats = response.data.cats;
        dispatch(fetchCatSuccess(cats));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(fetchCatFailure(error));
      });
  };
};

export const updateCat = (data, id, loader) => {
  return (dispatch) => {
    if(loader) dispatch(updateCatRequest());
    axios
      .put(`http://localhost:3000/cat/${id}`, data)
      .then((response) => {
        dispatch(fetchCats(true));
        dispatch(updateCatSuccess());
      })
      .catch((err) => {
        const error = err.message;
        dispatch(updateCatFailure(error));
      });
  };
};

export const imageUpload = (data, id) => {
  return (dispatch) => {
    dispatch(updateCatRequest());
    const options = {
      method: "post",
      url: `http://localhost:3000/cat/img/${id}`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };

    axios(options)
      .then((res) => {
        console.log("res", res.data);
        dispatch(updateCatSuccess());
        dispatch(fetchCats(true));
      })
      .catch((error) => {
        dispatch(updateCatFailure(error));
      });
  };
};

export const saveNewCat = (data, image) => {
  return (dispatch) => {
    dispatch(updateCatRequest());
    axios.post("http://localhost:3000/cat", data)
    .then((response) => {
      const cat = response.data.cat;
      if(cat?._id){
           dispatch(imageUpload(image, cat._id));
      }
      console.log(cat);
    })
    .catch((err) => {
      const error = err.message;
      console.log(error);
    });
  }
}

export const incrementClicks = (data, id) => {
   return (dispatch) => {
    if(data && id) dispatch(updateCat(data, id, false));
   }
}