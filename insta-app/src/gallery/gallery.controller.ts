import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  Query,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { GalleryService } from "./gallery.service";
import { CreateGalleryItemDto } from "./dto/create-gallery.dto";
import { GetUser } from "src/auth/get-user.decorator";
import { Users } from "src/users/users.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import * as Multer from "multer";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("gallery")
@ApiBearerAuth("access-token")
@Controller("gallery")
@UseGuards(JwtAuthGuard)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post("add-post")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Add a new post to the gallery" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Gallery post data with image file",
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary", // Указывает, что это файл
          description: "The image file to upload",
        },
        description: {
          type: "string",
          description: "Description of the gallery post",
        },
      },
      required: ["image", "description"], // Указываем обязательные поля
    },
  })
  @ApiResponse({
    status: 201,
    description: "Post successfully created",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - image file is required",
  })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./images",
        filename: (req, file, callback) => {
          const ext = path.extname(file.originalname);
          callback(null, `${uuidv4()}${ext}`);
        },
      }),
    })
  )
  async addGalleryPost(
    @UploadedFile() file: Multer.File,
    @Body() createGalleryItemDto: CreateGalleryItemDto,
    @GetUser() user: Users
  ) {
    if (!file) {
      throw new BadRequestException("Image file is required");
    }
    return await this.galleryService.create(file, createGalleryItemDto, user);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of all gallery posts" })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Number of posts to fetch",
    schema: { type: "integer", default: 10 },
  })
  @ApiResponse({
    status: 200,
    description: "Successfully fetched posts",
  })
  async findAll(@Query("limit") limit: number) {
    return await this.galleryService.findAll(limit || 10);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a gallery post by ID" })
  @ApiParam({
    name: "id",
    description: "ID of the gallery post",
    schema: { type: "integer" },
  })
  @ApiResponse({
    status: 200,
    description: "Post fetched successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Post not found",
  })
  async findById(@Param("id") id: number) {
    return await this.galleryService.findById(id);
  }

  @Get("/user/me")
  @ApiOperation({ summary: "Get gallery posts of the current user" })
  @ApiResponse({
    status: 200,
    description: "User's posts fetched successfully",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async findByUser(@GetUser() user: Users) {
    return await this.galleryService.findByUser(user);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a gallery post by ID" })
  @ApiParam({
    name: "id",
    description: "ID of the gallery post to delete",
    schema: { type: "integer" },
  })
  @ApiResponse({
    status: 200,
    description: "Post deleted successfully",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - user not authorized to delete this post",
  })
  @ApiResponse({
    status: 404,
    description: "Post not found",
  })
  async deleteById(@Param("id") id: number, @GetUser() user: Users) {
    return await this.galleryService.deleteById(id, user);
  }
}
