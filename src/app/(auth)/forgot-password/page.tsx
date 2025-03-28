// src/app/(auth)/forgot-password/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Mail, Send, HelpCircle } from "lucide-react"; // Icons
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    console.log("Simulating reset request for:", email);

    // --- Simulate API Call (to send email) ---
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace with actual API call
    const success = email.includes("@"); // Simple mock success if email looks valid

    if (success) {
      console.log("Simulated reset link sent!");
      setSuccessMessage(
        `If an account exists for ${email}, a password reset link has been sent. Check your inbox (and maybe spam folder)!`
      );
      // Don't clear email here, user might need to see it
    } else {
      console.log("Simulated reset link failed!");
      setError(
        "Could not process request. Please ensure email is valid or try again later."
      );
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Paper
          component={motion.div}
          initial="hidden"
          animate="visible"
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2 /* other styles */,
          }}>
          <HelpCircle
            size={40}
            color={theme.palette.warning.main}
            style={{ marginBottom: "16px" }}
          />

          {/* --- DIALOG --- */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 1, fontWeight: 600 }}>
            Forgot Your Password? 🤔
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}>
            {` Cache miss on your password? No problem! Enter your email below, and we'll dispatch a reset token link.`}
          </Typography>
          {/* --- END DIALOG --- */}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2, width: "100%" }}>
                {successMessage}
              </Alert>
            )}

            <TextField
              component={motion.div}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Account Email"
              name="email"
              type="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || !!successMessage} // Disable if success message is shown
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                  sx: {
                    /* ... input styles if needed ... */
                  },
                },
                inputLabel: { sx: { color: theme.palette.text.secondary } },
              }}
              suppressHydrationWarning={true}
            />

            <motion.div style={{ width: "100%" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading || !!successMessage}
                startIcon={isLoading ? undefined : <Send size={18} />}
                sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </motion.div>

            <Box component={motion.div} textAlign="center">
              <Link href="/login" style={{ textDecoration: "none" }}></Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
