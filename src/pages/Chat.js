import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import CONFIG from "../utils/common";

const socket = io(CONFIG.BASE_URL);

function ChatApp() {
  const [formData, setFormData] = useState({
    username: "",
    recipient: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Register the user when they provide a username
  const handleRegister = () => {
    const { username } = formData;
    if (username) {
      socket.emit("register", username); // Register the username with the backend
      setIsRegistered(true); // Set registered status to true
      toast.success("Registered successfully!");
    } else {
      toast.error("Please enter a username.");
    }
  };

  const handleSubmit = async () => {
    const { username, recipient, message } = formData;

    if (!username || !recipient || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Send message to backend
      socket.emit("sendMessage", { sender: username, recipient, message });

      // Add the sent message to the messages state to display it
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: username, message, isSent: true },
      ]);
      setFormData({ ...formData, message: "" });
    } catch (error) {
      toast.error("Failed to send the message.");
    } finally {
      setLoading(false);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log("Received message: ", message); // Add console log to verify message structure
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, isSent: false },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Stack spacing={3} sx={{ mt: 4 }}>
        <Typography variant="h4" align="center">
          Chat App
        </Typography>

        {/* Show username input if not registered */}
        {!isRegistered ? (
          <Box>
            <TextField
              label="Enter Your Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box>
            {/* Message input fields after registration */}
            <TextField
              label="Recipient's Username"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Type a Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
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
          </Box>
        )}

        <Box
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Messages:
          </Typography>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 2,
                alignItems: msg.isSent ? "flex-end" : "flex-start", // Align based on sent/received
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: msg.isSent ? "#d1e7ff" : "#f1f1f1", // Different colors for sent/received messages
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: "80%",
                }}
              >
                <strong>{msg.sender}: </strong>
                {msg.message}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}

export default ChatApp;
