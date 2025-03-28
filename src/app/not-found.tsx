// src/app/not-found.tsx
"use client"; // Needed for useTheme and Link component

import React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SearchX } from "lucide-react"; // Or Frown, AlertTriangle

export default function NotFound() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: theme.palette.background.default, // Use theme background
        color: theme.palette.text.primary,
        p: 3,
      }}>
      <SearchX
        size={64}
        color={theme.palette.secondary.main}
        style={{ marginBottom: theme.spacing(2) }}
      />
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 1, fontWeight: "bold" }}>
        404: Page Not Found 🧐
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 2, maxWidth: "500px" }}>
        {` Oops! Looks like you've encountered a NullPointerException in the real
        world. Don't worry, even seasoned developers have these moments.`}
      </Typography>
      <Typography
        variant="body2"
        fontStyle="italic"
        color="text.secondary"
        sx={{
          mb: 4,
          p: 1,
          borderLeft: `3px solid ${theme.palette.divider}`,
          pl: 2,
        }}>
        {"I'd explain the bug, but you wouldn't get it."}
      </Typography>
      <Button
        component={Link} // Use Next.js Link
        href="/"
        variant="contained"
        color="primary" // Use primary theme color
        size="large">
        Take Me Home
      </Button>
    </Box>
  );
}
