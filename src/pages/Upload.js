import React from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Container,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MP4Upload() {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    file: null,
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!formData.file || !formData.name || !formData.description) {
      toast.error("Please complete all fields.");
      return;
    }

    setLoading(true);
    try {
      // Prepare form data for API submission
      const data = new FormData();
      data.append("file", formData.file);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("video_lengths", 30);
      // Send the data to the API
      const response = await axios.post(
        "https://video-player-backend-lo6k.onrender.com/video",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      debugger;
      if (response.status === 201) {
        toast.success("MP4 uploaded successfully!");
        setFormData({ file: null, name: "", description: "" });
      } else {
        throw new Error("Failed to upload");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload MP4.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Stack spacing={2}>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          MP4 Upload
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mx: "auto" }} />
        ) : (
          <Card
            sx={{
              mt: 4,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "background.paper",
            }}
          >
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Upload MP4 File</Typography>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Choose File
                  <input
                    type="file"
                    name="file"
                    accept="video/mp4"
                    hidden
                    onChange={handleChange}
                  />
                </Button>
                {formData.file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected File: {formData.file.name}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">File Name</Typography>
                <TextField
                  fullWidth
                  label="Enter file name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Description</Typography>
                <TextField
                  fullWidth
                  label="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ mt: 1 }}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
