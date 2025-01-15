import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Stack,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CONFIG from "./../utils/common";
const Post = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const URL = `${CONFIG.BASE_URL}video`;
        const response = await axios.get(URL);
        setPosts(response.data);
      } catch (error) {
        toast.error("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Stack spacing={2}>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Posts
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mx: "auto" }} />
        ) : posts.length > 0 ? (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} key={post._id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  {post.s3_video_url && (
                    <CardMedia
                      component={
                        post.s3_video_url.endsWith(".mp4") ? "video" : "img"
                      }
                      src={post.s3_video_url}
                      controls={post.s3_video_url.endsWith(".mp4")}
                      sx={{
                        height: 200,
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography align="center" color="textSecondary">
            No posts available.
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default Post;
