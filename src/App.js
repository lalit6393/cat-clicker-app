import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, Routes } from "react-router-dom";
import Home from "./components/homePage/Home";

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
