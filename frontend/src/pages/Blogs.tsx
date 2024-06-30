import { useNavigate } from "react-router-dom"
import Blogcard from "../components/Blogcard"
import DashboardNavbar from '../components/DashboardNavbar'
import { useEffect, useState } from "react"
import axios from "axios"


const Blogs = () => {
  interface Author {
    id: string;
    name: string;
  }

  interface Blog {
    id:string;
    title: string;
    content: string;
    createdAt: Date;
    author: Author;
  }

    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([])
    
    if(!localStorage.getItem("token")){
    navigate("signup")
    }
        useEffect(() => {
            try {
                axios.get("http://localhost:8787/api/v1/blog/bulk", {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((response) => {
                    setBlogs(response.data.posts);
                    console.log(response.data.posts);
                    setIsLoading(false);           
                  });
                
            } catch (error) {
                console.log(error);                
            }

        }, []);



        if(isLoading) {
            return <div>Loading...</div>;
        }

console.log(blogs)
  return (
    <div>
      <DashboardNavbar />
      <div className="flex justify-center ">
        <div className="flex justify-center max-w-xl">
          {blogs.map((blog, index) => {
            return (
              <Blogcard
                key={index}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.createdAt.toString()}
                authorName={blog.author.name}
                authorId={blog.author.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Blogs


