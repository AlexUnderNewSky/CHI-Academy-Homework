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
import { AppDataSource } from "../data-source/data-source";

// ПО ХОРОШЕМУ ЭТО ДОЛЖНО ПОМОЧЬ С ВОССТАНОВЛЕНИЕМ ID
// async function resetIdSequence() {
//   await AppDataSource.query(
//     `SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 1), false) FROM users;`
//   );
// }
// ПО ХОРОШЕМУ ЭТО ДОЛЖНО ПОМОЧЬ С ВОССТАНОВЛЕНИЕМ ID

@JsonController("")
export class UserController {
  @Get("/")
  getMain() {
    return { author: "Serhii Sosnytskyi" };
  }

  @Get("/users")
  async getAll() {
    const users = await AppDataSource.getRepository("Users").find();
    console.log("Users: ", users);
    return users;
  }

  @Post("/users")
  @ValidateArgs
  async post(@Body() body: any) {
    const newUser = { ...body };
    await AppDataSource.getRepository("Users").save(newUser);
    return newUser;
  }

  @Patch("/users/:id")
  async patch(@Param("id") id: number, @Body() body: any) {
    const result = await AppDataSource.getRepository("Users").update(id, body);
    if (result.affected === 0) {
      throw new Error("User not found.");
    } else {
      const updatedUser = await AppDataSource.getRepository("Users").findOneBy({
        id,
      });
      return updatedUser;
    }
  }

  @Delete("/users/:id")
  async delete(@Param("id") id: number) {
    const deleteUser = await AppDataSource.getRepository("Users").delete(id);
    if (deleteUser.affected === 0) {
      throw new Error("User not found.");
    }
    // await resetIdSequence(); ПО ХОРОШЕМУ ЭТО ДОЛЖНО ПОМОЧЬ С ВОССТАНОВЛЕНИЕМ ID
    return { message: "User deleted successfully." };
  }
}
