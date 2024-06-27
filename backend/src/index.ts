import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign } from "hono/jwt";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";

const app = new Hono<{
  Variables: {
    userId: string
    
  };
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
// here c in callback everything req,res,etc

app.route("/api/v1/user",userRoute)

app.route("/api/v1/blog", blogRoute);
app.get("/", async(c)=>{
 return c.text("everything works like a charm ")
});



// writing a middle ware here for all the rouutes which are associated with blog routes



export default app;
