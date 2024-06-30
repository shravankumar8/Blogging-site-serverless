import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign } from "hono/jwt";
import { creatBlogInput, UpdateBlogInput } from "@shravankumar8/medium-common";
export const blogRoute = new Hono<{
  Variables: {
    userId: string;
  };
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRoute.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const header = c.req.header("Authorization");
    console.log(header);
    if (!header) {
      c.status(404);
      return c.json({ message: "Authorization token not found" });
    }
    const token = header?.split(" ")[1];
    let payload: any;
    try {
      payload = await verify(token, c.env.JWT_SECRET);
    } catch (error) {
      payload = null;
    }
    console.log(payload);
    if (!payload) {
      console.log("ayya");
      c.status(401);
      return c.json({ message: "invalid token" });
    }
    // @ts-ignore
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    console.log(error);
    c.text("internal server error: " + error);
  }
});

blogRoute.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();
body.authorId=userId;
   const { success,error } = creatBlogInput.safeParse(body);
   if (!success) {
    console.log(error)
     c.status(400);
     return c.json({ message: "invalid input" });
   }

  // control is reached here only if the user is authenticaed
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
      
    },
  });

 
  console.log(userId + "has published some post");
  return c.json({ message: "saved the  some post", postId: blog.id});
});





// below route is to update the posts
blogRoute.put("/", async(c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    })
    const userId=c.get("userId")
    const body=await c.req.json()
    console.log(body.id,"body.id")
   const { success } = UpdateBlogInput.safeParse(body);
   if (!success) {
     c.status(400);
     return c.json({ message: "invalid input" });
   }

    try {
       await prisma.post.update({
            where:{
                id:body.id,
                authorId:userId
            },data:{
                title:body.title,
                content:body.content
            }
        })
        return c.json({message:"updated successfully"})
    } catch (error) {
        console.log(error);
        return c.json({message :"you did something wrong say sorry "})

        
    }

});
blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  
  const posts = await prisma.post.findMany({
    // where:{
    //   // published:true
    // },
    select: {
      id: true,
      content: true,
      title: true,
      createdAt: true,
      author: {
        select: {
          
          name: true,
          id:true
        },
      },
    },
  });
  return c.json({ message: "easy", posts });
});
blogRoute.get("/my", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.get("userId"));
  const posts = await prisma.post.findMany({
    where: { authorId: c.get("userId") },
  });
  return c.json({ message: "easy", posts });
});





blogRoute.get("/:id", async(c) => {
  const id = c.req.param("id");
//   console.log(id)
const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
}).$extends(withAccelerate())

const post = await prisma.post.findUnique({
    where:{
        id:id,

    }
})

  return c.json({post});
});
