import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let posts = [];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const post = {
    id: Date.now(),
    text: req.body.text,
    likes: 0
  };
  posts.unshift(post);
  res.status(201).json(post);
});

app.post("/posts/:id/like", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: "Post no encontrado" });

  post.likes += 1;
  res.json(post);
});

app.listen(3001, () => {
  console.log("Backend corriendo en http://localhost:3001");
});
