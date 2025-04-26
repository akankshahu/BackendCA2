const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const users = [
  { email: "alica@example.com", password: "aloce123" },
  { email: "bob@example", apssword: "bob12" },
  { email: "charlie@example.com", password: "charlie123" },
];
app.get("/users", (req, res) => {
  res.json({ users });
});
app.get("/users/:email", (req, res) => {
  const userEmail = req.params.email;
  const user = users.find((user) => user.email === userEmail);
  if (!user) {
    return res.status(404).json({ error: "Email not found" });
  }
  res.json({ user });
});

app.put("/users/:email", (req, res) => {
  const userEmail = req.params.email;
  const { password } = req.query;
  if (!password) {
    return res.status(404).json({ error: "Password required" });
  }
  const userIndex = users.findIndex((user) => user.email === userEmail);
  if (userIndex === -1) {
    return res.status(404).json({ error: "Users not found" });
  }
  users[userIndex].password = password;
  return res.json({ message: "users ", user: users[userIndex] });
});

app.delete("/users/:email", (req, res) => {
  const userEmail = req.params.email;
  const initialLength = users.length;
  users = users.filter((user) => user.email !== userEmail);
  if (initialLength === users.length) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json({ message: "User deleted successfully ", users });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
