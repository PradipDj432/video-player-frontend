import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CONFIG from "./../utils/common";
function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    first_name: "",
    last_name: "",
    file: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file: file });
    }
  };

  const handleSubmit = async () => {
    const { username, email, phone, password } = formData;

    if (!username || !email || !phone || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email address.");
      return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
      toast.error("Invalid phone number.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    setLoading(true);

    try {
      const URL = `${CONFIG.BASE_URL}user`;
      const response = await axios.post(URL, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message || "Profile submitted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Stack spacing={3} sx={{ mt: 4 }}>
        <Typography variant="h4" align="center">
          Profile
        </Typography>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
        />
        <Box display="flex" alignItems="center">
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              type="file"
              name="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {formData.file && (
            <Avatar
              src={URL.createObjectURL(formData.file)}
              alt="Profile"
              sx={{ ml: 2, width: 56, height: 56 }}
            />
          )}
        </Box>
        <Box position="relative">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary.main",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default Profile;
