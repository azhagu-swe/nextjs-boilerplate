// src/app/unauthorized/page.tsx
import React from "react";
import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";
import { ShieldAlert } from "lucide-react"; // Example icon

export default function UnauthorizedPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}>
        <ShieldAlert
          size={60}
          color="orange"
          style={{ marginBottom: "16px" }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Sorry, you do not have the necessary permissions to access this page.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/" // Link back to home page
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
