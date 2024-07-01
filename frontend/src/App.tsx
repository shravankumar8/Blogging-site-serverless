import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Singup";
import LandingPage from "./pages/LandingPage";
import Blogs from "./pages/Blogs";
import Blog from './pages/Blog';
import Write from './pages/Write';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
          <Route path="/" Component={LandingPage} />
          <Route path="blogs" Component={Blogs} />
          <Route path="/blog/write" Component={Write} />

          <Route path="blog/:id" Component={Blog} />
          {/* <Route path="/*" Component={NotFound} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
