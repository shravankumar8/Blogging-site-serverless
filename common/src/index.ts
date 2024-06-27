import z from "zod";
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});


export const signinInput= z.object({
    email:z.string().email(),
    password:z.string().min(6)
})



export  const creatBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  published: z.boolean().optional()
});

export  const UpdateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id:z.string()
});




export type UpdateBlogInput =z.infer<typeof UpdateBlogInput>
export type signupInput =z.infer<typeof signupInput>
export type creatBlogInput =z.infer<typeof creatBlogInput>
export type signinInput =z.infer<typeof signinInput>