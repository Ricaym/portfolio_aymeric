const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Portfolio OK 🚀" });
});

app.get("/projects", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Portfolio",
      description: "Mon site personnel",
    },
    {
      id: 2,
      title: "App recettes",
      description: "API Node + MongoDB",
    },
  ]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});