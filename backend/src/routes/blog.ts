import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign } from "hono/jwt";

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

blogRoute.post("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();

  // control is reached here only if the user is authenticaed
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });

 
  console.log(userId + "has published some post");
  return c.text(userId);
});
blogRoute.put("/blog", (c) => {
  return c.text("write update a blog!");
});
blogRoute.get("/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get a specific blog");
});
blogRoute.get("/blog/bulk", (c) => {
  return c.text("blog bulk route");
});
