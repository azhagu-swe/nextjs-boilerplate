// src/app/maintenance/page.tsx
"use client"; // Needed for useTheme

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Wrench } from "lucide-react"; // Or ServerCog

export default function MaintenancePage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 3,
      }}>
      <Wrench
        size={64}
        color={theme.palette.warning.main}
        style={{ marginBottom: theme.spacing(2) }}
      />
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 1, fontWeight: "bold" }}>
        🔧 Site Under Maintenance 🔧
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 2, maxWidth: "600px" }}>
        {`We're currently performing some routine maintenance (a.k.a. squashing bugs and deploying updates). We'll be back online before you can say "Hello, World!".`}
      </Typography>
      <Typography
        variant="body2"
        fontStyle="italic"
        color="text.secondary"
        sx={{
          mb: 3,
          p: 1,
          borderLeft: `3px solid ${theme.palette.divider}`,
          pl: 2,
        }}>
        {"Debugging: Removing the needles from the haystack."}
      </Typography>
      <CircularProgress color="primary" sx={{ mb: 2 }} />
      <Typography variant="body1" color="text.secondary">
        Please check back soon!
      </Typography>
    </Box>
  );
}
