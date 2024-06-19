import { Hono } from 'hono'

const app = new Hono()
// here c in callback everything req,res,etc
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/user/signup', (c) => {
  return c.text('user signup')
})
app.post("/api/v1/user/signin", (c) => {
  return c.text("user sigin");
});
app.post("/api/v1/blog", (c) => {
  return c.text("create blog");
});
app.put('/api/v1/blog', (c) => {
  return c.text('write update a blog!')
})
app.get('/api/v1/blog/:id', (c) => {
  const id=c.req.param("id")
  console.log(id)
  return c.text('get a specific blog')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('blog bulk route')
})

export default app
