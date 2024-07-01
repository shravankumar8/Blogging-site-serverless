import { useParams } from "react-router-dom";
import MainBlog from "../components/MainBlog";
import DashboardNavbar from "../components/DashboardNavbar";
const Blog = () => {
     const {id} = useParams();
  return (
    <div>
      <DashboardNavbar/>
      <MainBlog id={id}/>
    </div>
  );
};

export default Blog;
