import {
  Get,
  Param,
  Post,
  Body,
  JsonController,
  Patch,
  Delete,
} from "routing-controllers";
import { ValidateArgs } from "../decorators/validator";
import { readFile, writeFile } from "node:fs/promises";

async function readFileAsync(path: string) {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

const writeFileAsync = async (path: string, users: any[]) => {
  await writeFile(path, JSON.stringify(users, null, 2));
};

@JsonController("")
export class UserController {
  @Get("/")
  getMain() {
    return { author: "Serhii Sosnytskyi" };
  }

  @Get("/users")
  async getAll() {
    return await readFileAsync("./users.json");
  }

  @Post("/users")
  @ValidateArgs
  async post(@Body() body: any) {
    const users = await readFileAsync("./users.json");
    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);
    await writeFileAsync("./users.json", users);
    return newUser;
  }

  @Patch("/users/:id")
  async patch(@Param("id") id: number, @Body() body: any) {
    const users = await readFileAsync("./users.json");
    const userId = users.findIndex((user: any) => user.id === id);
    if (userId === -1) {
      throw new Error("User not found.");
    } else {
      users[userId] = { ...users[userId], ...body };
      await writeFileAsync("./users.json", users);
      return users[userId];
    }
  }

  @Delete("/users/:id")
  async delete(@Param("id") id: number) {
    const users = await readFileAsync("./users.json");
    const updatedUsers = users.filter((user: any) => user.id !== id);

    if (updatedUsers.length === users.length) {
      throw new Error("User not found.");
    } else {
      await writeFileAsync("./users.json", updatedUsers);
      return { message: "User deleted." };
    }
  }
}
