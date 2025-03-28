// src/app/(auth)/reset-password/[token]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Lock, KeyRound, EyeOff, Eye, CheckCircle } from "lucide-react"; // Icons
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants (optional)
const containerVariants = {
  /* ... */
};
const itemVariants = {
  /* ... */
};

export default function ResetPasswordPage() {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams(); // Get params from URL

  // Extract token - params can be string or string[]
  const token = typeof params.token === "string" ? params.token : undefined;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null); // To track token validity

  // --- Simulate Token Validation ---
  useEffect(() => {
    const validateToken = async () => {
      console.log("Validating token:", token);
      if (!token) {
        setError("Invalid or missing reset token.");
        setIsTokenValid(false);
        return;
      }
      // --- Simulate API Call to validate token ---
      await new Promise((resolve) => setTimeout(resolve, 500));
      const isValid = token.length > 10; // Very basic mock validation
      // --- Replace with actual API call ---

      if (isValid) {
        setIsTokenValid(true);
      } else {
        setError("This password reset link is invalid or has expired.");
        setIsTokenValid(false);
      }
    };
    validateToken();
  }, [token]); // Run when token changes

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match! Please re-enter.");
      return;
    }
    if (password.length < 8) {
      setError("Password needs to be at least 8 characters strong.");
      return;
    }

    setIsLoading(true);
    console.log("Simulating password reset with token:", token);

    // --- Simulate API Call (to reset password) ---
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace with actual API call using token and new password
    const success = Math.random() > 0.2;

    if (success) {
      console.log("Simulated password reset successful!");
      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } else {
      console.log("Simulated password reset failed!");
      setError(
        "Could not reset password. The link might have expired, or an error occurred."
      );
      setIsLoading(false);
    }
  };

  // Decide what to show based on token validation state
  let content;
  if (isTokenValid === null) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    ); // Loading state
  } else if (isTokenValid === false) {
    content = // Show only error and link back
      (
        <>
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error || "Invalid Request"}
          </Alert>
          <Box textAlign="center">
            <Link href="/login" style={{ textDecoration: "none" }}></Link>
          </Box>
        </>
      );
  } else {
    // Token is valid, show the form
    content = (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {successMessage}
          </Alert>
        )}

        {/* New Password Field */}
        <TextField
          component={motion.div}
          required
          fullWidth
          id="password"
          label="New Password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading || !!successMessage}
          variant="outlined"
          suppressHydrationWarning={true}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: theme.palette.text.secondary }}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                /* ... input styles ... */
              },
            },
            inputLabel: { sx: { color: theme.palette.text.secondary } },
          }}
        />

        {/* Confirm New Password Field */}
        <TextField
          component={motion.div}
          required
          fullWidth
          id="confirmPassword"
          label="Confirm New Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading || !!successMessage}
          variant="outlined"
          suppressHydrationWarning={true}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password confirmation visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: theme.palette.text.secondary }}>
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                /* ... input styles ... */
              },
            },
            inputLabel: { sx: { color: theme.palette.text.secondary } },
          }}
          error={!!error && error.includes("Passwords don't match")}
        />

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading || !!successMessage}
            startIcon={isLoading ? undefined : <CheckCircle size={18} />}
            sx={{ mt: 3, mb: 2, py: 1.5 }}>
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </motion.div>
      </Box>
    );
  }

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
          variants={containerVariants}
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
          <KeyRound
            size={40}
            color={theme.palette.primary.main}
            style={{ marginBottom: "16px" }}
          />

          {/* --- DIALOG --- */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 1, fontWeight: 600 }}>
            Set Your New Password 🔐
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}>
            Almost there! Create a strong, new password below. Make it something
            memorable (but not *too* memorable 😉).
          </Typography>
          {/* --- END DIALOG --- */}

          {/* Render loading, error, or form based on token validation */}
          {content}
        </Paper>
      </Box>
    </Container>
  );
}
