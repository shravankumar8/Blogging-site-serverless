import NavBar from '../components/NavBar'
import MidPage from "../components/MidPage";
import Footbar from "../components/Footbar";

const LandingPage = () => {
  return (
    <div>
      <div className=" border-black border-b">
        <NavBar />
      </div>
      <MidPage />
      <div className="border-black border-t">
        <Footbar />
      </div>
    </div>
  );
}

export default LandingPage
