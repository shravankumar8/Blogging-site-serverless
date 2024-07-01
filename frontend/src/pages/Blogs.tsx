import { useNavigate } from "react-router-dom"
import Blogcard from "../components/Blogcard"
import DashboardNavbar from '../components/DashboardNavbar'
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/Loading"



const Blogs = () => {
  interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    author_name: string;
    author_id: string;
  }

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  if (!localStorage.getItem("token")) {
    navigate("signup");
  }
  useEffect(() => {
    try {
      axios
        .get("http://localhost:8787/api/v1/blog/bulk", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBlogs(response.data.result);
          console.log(response.data.result);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  console.log(blogs);
  return (
    <div>
      <DashboardNavbar />
      <div className="flex justify-center ">
        <div className=" justify-center max-w-xl">
          {blogs
            ? blogs.map((blog, index) => {
                return (
                  <Blogcard
                    key={index}
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt.toString().split("T")[0]}
                    authorName={blog.author_name}
                    authorId={blog.author_id}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Blogs


