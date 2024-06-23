import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign } from "hono/jwt";


export const userRoute = new Hono<{
  Variables: {
    userId: string;
  };
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


userRoute.post("/signup", async (c) => {
  console.log("_________________________________________________")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
   
    const user = prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token: string = await sign({ id: (await user).id }, c.env.JWT_SECRET);
    console.log(token);
    return c.json({ message: "user signup succcesfull", token: token });
  } catch (error) {
    
    return c.json({ message: "email already in use " });
  }
});



userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json<{ email: string; password: string }>();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ messsage: "user not found" });
    }
    const password = user.password;

    if (user.email == body.email && user.password == body.password) {
     const token: string = await sign({ id: ( user).id }, c.env.JWT_SECRET);
      return c.json({ message: "signin succesul", token: token });
    }
  } catch (error) {}
});