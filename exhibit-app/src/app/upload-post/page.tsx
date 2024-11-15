'use client';

import React, { useState } from "react";
import { uploadExhibit } from "../../api/exhibitActions";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(50, "Description must be less than 50 characters")
    .required("Description is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported file format, only .jpeg or .png are allowed",
      (value) => {
        return (
          value &&
          ["image/jpg", "image/jpeg", "image/png"].includes(
            (value as File).type
          )
        );
      }
    ),
});

const UploadExhibit: React.FC = () => {
  // const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleSubmit = async (values: {
    description: string;
    image: File | null;
  }) => {
    if (!values.image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("description", values.description);

    try {
      const response = await uploadExhibit(formData);
      console.log("Upload successful:", response.data);
      <Link href="/">Home</Link>;
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Upload New Exhibit
      </Typography>
      <Formik
        initialValues={{ description: "", image: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const files = event.target.files;

                    if (files && files.length > 0) {
                      const file = files[0];
                      setFieldValue("image", file);
                      setImageName(file.name);

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setImagePreview(null);
                      setImageName(null);
                      setFieldValue("image", null);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <label htmlFor="image">
                  <Button variant="contained" component="span">
                    {imagePreview ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor="image">
                          <Button variant="contained" component="span">
                            {imagePreview ? (
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Image
                                  src={imagePreview}
                                  alt="Preview"
                                  width={50}
                                  height={50}
                                  style={{
                                    objectFit: "cover",
                                    marginRight: 8,
                                  }}
                                />
                                <span>{imageName}</span>
                              </Box>
                            ) : (
                              "Choose Image"
                            )}
                          </Button>
                        </label>
                        <span>{imageName}</span>
                      </Box>
                    ) : (
                      "Choose Image"
                    )}
                  </Button>
                </label>
                <ErrorMessage name="image" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="description" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Upload Exhibit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UploadExhibit;
