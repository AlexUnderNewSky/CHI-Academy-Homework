import React, { useState } from "react";
import { uploadExhibit } from "../api/exhibitActions"; // Импортируем функцию загрузки
import { TextField, Button, Grid, Typography, Box } from "@mui/material";

const UploadExhibit: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await uploadExhibit(formData);
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Upload New Exhibit
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{ display: "none" }} // Скрываем стандартный input
            />
            <label htmlFor="image">
              <Button variant="contained" component="span">
                {image ? image.name : "Choose Image"}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Upload Exhibit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UploadExhibit;
