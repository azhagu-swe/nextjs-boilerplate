// src/app/(pages)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import if using for redirect
import {
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  // Divider,
  InputAdornment, // Make sure InputAdornment is imported
  CircularProgress, // Import for loading state
  Alert, // Import for error state
  // Tooltip, // Import MuiLink for styling link text
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access theme tokens
import {
  Terminal,
  Bug,
  Code2,
  Shield,
  Rocket,
  // Github,
  // Gitlab,
  KeyRound,
  EyeOff,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const theme = useTheme(); // Get theme object
  const router = useRouter(); // Get router if needed for redirect
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log("Simulating login with:", { email, password });
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
    if (email === "user@example.com" && password === "password") {
      // Dummy check
      console.log("Simulated login successful!");
      router.push("/"); // Redirect on success
    } else {
      console.log("Simulated login failed!");
      setError("Invalid credentials. Hint: user@example.com / password"); // Simpler error
      setIsLoading(false);
    }
  };
  // --- End handleSubmit Logic ---

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          width: "100%",
          borderRadius: 4, // Consider theme.shape.borderRadius * 2 or similar
          p: 4,
          boxShadow: theme.shadows[12], // Use theme shadows
          border: `1px solid ${theme.palette.divider}`, // Use theme divider color
          backdropFilter: "blur(12px)",
          color: theme.palette.text.primary, // Set base text color from theme
        }}>
        {/* Animated Header */}
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{ textAlign: "center", mb: 4, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: -60,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}>
            {/* Icons can use theme colors */}
            <Terminal
              size={48}
              color={theme.palette.primary.light}
              strokeWidth={1.5}
            />
            <Code2
              size={48}
              color={theme.palette.secondary.light}
              strokeWidth={1.5}
            />
            <Bug
              size={48}
              color={theme.palette.error.light}
              strokeWidth={1.5}
            />
          </Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            CodeMaster
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
            Developer Portal Access
          </Typography>
        </Box>

        {/* Auth Form using slotProps */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {" "}
              {error}{" "}
            </Alert>
          )}

          {/* --- Email Field with slotProps --- */}
          <TextField
            component={motion.div} // Apply animation to TextField container
            fullWidth
            required // Added required prop
            label="Email Address" // Changed label back
            id="email"
            name="email" // Added id/name
            autoComplete="email" // Added autocomplete
            value={email} // Bind value
            onChange={(e) => setEmail(e.target.value)} // Add onChange
            disabled={isLoading}
            variant="outlined"
            suppressHydrationWarning={true} // Keep if needed
            // --- Using slotProps ---
            slotProps={{
              // Props for the root element of the underlying Input (MuiOutlinedInput-root)
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyRound color={theme.palette.primary.light} />
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary, // Use theme text color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider, // Use theme divider color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main, // Use theme primary color
                  },
                  // Ensure focused styles are also themed if needed
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              },
              // Props for the <label> element
              inputLabel: {
                sx: { color: theme.palette.text.secondary }, // Use theme secondary text color
              },
            }}
          />

          {/* --- Password Field with slotProps --- */}
          <TextField
            component={motion.div} // Apply animation to TextField container
            fullWidth
            required // Added required prop
            label="Password" // Changed label back
            id="password"
            name="password" // Added id/name
            type={showPassword ? "text" : "password"}
            autoComplete="current-password" // Added autocomplete
            value={password} // Bind value
            onChange={(e) => setPassword(e.target.value)} // Add onChange
            disabled={isLoading}
            variant="outlined"
            suppressHydrationWarning={true} // Keep if needed
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Shield size={20} color={theme.palette.primary.light} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              },
              inputLabel: {
                sx: { color: theme.palette.text.secondary },
              },
            }}
          />

          <Box component={motion.div} variants={itemVariants}>
            <Button
              type="submit" // Ensure type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading} // Use isLoading state
              startIcon={isLoading ? undefined : <Rocket size={20} />} // Hide icon when loading
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // Use theme colors in gradient
                fontWeight: 600,
                letterSpacing: "0.05em",
                py: 1.5,
                mt: 2,
                color: theme.palette.primary.contrastText, // Ensure text contrast
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-2px)", // Keep hover effect
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}4D`, // Use theme color with opacity
                },
              }}>
              {isLoading ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Verify Identity"
              )}
            </Button>
          </Box>

          {/* <Box component={motion.div} variants={itemVariants}>
            <Divider
              sx={{
                my: 3,
                "&::before, &::after": { borderColor: theme.palette.divider },
              }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}>
                Quick Deploy Options
              </Typography>
            </Divider>
          </Box> */}

          {/* <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            // Social Login Buttons - Add onClick handlers 
            <Tooltip title="Login with GitHub">
              <IconButton
                aria-label="Login with GitHub"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": { background: theme.palette.action.hover },
                }}>
                <Github size={24} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Login with GitLab">
              <IconButton
                aria-label="Login with GitLab"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": { background: theme.palette.action.hover },
                }}>
                <Gitlab size={24} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Login with Magic Link/SSO">
              <IconButton
                aria-label="Login with Magic Link or SSO"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": { background: theme.palette.action.hover },
                }}>
                <KeyRound size={24} />
              </IconButton>
            </Tooltip>
          </Box> */}
        </Box>

        <Typography
          component={motion.div}
          variants={itemVariants}
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 4,
            color: theme.palette.text.secondary,
          }}>
          New to CodeMaster?{" "}
          <Link
            href="/signup"
            style={{
              color: theme.palette.primary.light,
              textDecoration: "none",
            }}>
            Request Access
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
