import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import CONFIG from "./../utils/common";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const URL = `${CONFIG.BASE_URL}user`;
        const response = await axios.get(URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Users...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User List
      </Typography>
      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card sx={{ textAlign: "center", padding: 2 }}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  src={
                    user.profile_picture ||
                    "https://via.placeholder.com/100?text=No+Image"
                  }
                  alt={`${user.username}'s profile`}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "2px solid #1976d2",
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {user.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Name: {user.first_name} {user.last_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserPage;
