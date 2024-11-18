import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { readFile, writeFile } from "node:fs/promises";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

async function readFileAsync(path: string) {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

async function writeFileAsync(users: any[]) {
  await writeFile("./users.json", JSON.stringify(users, null, 2));
}

app.get("/", (req: Request, res: Response) => {
  res.json({ author: "Serhii Sosnytskyi" });
});

app.get("/users", async (req: Request, res: Response) => {
  const data = await readFileAsync("./users.json");
  res.json(data);
});

app.post("/users", async (req: Request, res: Response) => {
  const { user, email } = req.body;
  const users = await readFileAsync("./users.json");
  const newUser = { id: users.length + 1, user, email };
  users.push(newUser);
  writeFileAsync(users);
  res.json(newUser);
});

app.patch("/users/:id", async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10);
  const { user, email } = req.body;
  const users = await readFileAsync("./users.json");

  const userIndex = users.findIndex((user: any) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: "User not found." });
  } else {
    users[userIndex] = { ...users[userIndex], user, email };
    writeFileAsync(users);
    res.json(users[userIndex]);
  }
});

app.delete("/users/:id", async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10);
  const users = await readFileAsync("./users.json");
  const updatedUsers = users.filter((user: any) => user.id !== userId);

  if (updatedUsers.length === users.length) {
    res.status(404).json({ error: "User not found." });
  } else {
    writeFileAsync(updatedUsers);
    res.sendStatus(204);
  }
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
