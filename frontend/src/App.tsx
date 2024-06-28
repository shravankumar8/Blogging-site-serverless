import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {Signin }from "./pages/Signin";
import {Signup} from "./pages/Singup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
          {/* <Route path="blogs" Component={Singup} /> */}
          {/* <Route path="blog/:id" Component={Singup} /> */}
          {/* <Route path="/*" Component={NotFound} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
