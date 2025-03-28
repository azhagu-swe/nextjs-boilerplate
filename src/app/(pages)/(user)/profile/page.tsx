// src/app/(app)/profile/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Skeleton, // For loading state
} from "@mui/material";
import { useAuth } from "@/providers/AuthProviders"; // Adjust path if needed
import {
  UserCircle,
  BadgeCheck,
  BookCopy,
  Star,
  Settings,
  ShieldCheck,
} from "lucide-react"; // Icons
import { useTheme } from "@mui/material/styles";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const theme = useTheme();

  // Loading state
  if (!isAuthenticated && typeof window !== "undefined") {
    // Handle case where auth context hasn't loaded or user isn't auth
    // Could redirect or show a specific message
    // For now, showing loading skeletons
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          sx={{ mx: "auto", mb: 2 }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={40}
          sx={{ mx: "auto", mb: 1 }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={24}
          sx={{ mx: "auto", mb: 4 }}
        />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Container>
    );
  }

  // Should not happen if layout/middleware protects route, but good practice
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography>User not found.</Typography>
      </Container>
    );
  }

  const getRoleChipColor = (role: string) => {
    switch (role) {
      case "admin":
        return "error";
      case "instructor":
        return "secondary";
      case "student":
      default:
        return "primary";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header Dialog */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}>
          <UserCircle size={40} /> Your Dev Dashboard ✨
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your progress, view saved content, and manage your details here,{" "}
          {user.name}!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              src={user.avatarUrl || undefined}
              alt={user.name}
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto 16px auto",
                fontSize: "3rem",
              }}>
              {!user.avatarUrl && user.name?.charAt(0).toUpperCase()}{" "}
              {/* Fallback to initial */}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Chip
              icon={<BadgeCheck size={16} />}
              label={user.role}
              color={getRoleChipColor(user.role)}
              size="small"
              sx={{ mt: 1, textTransform: "capitalize" }}
            />
            <Button
              component={Link}
              href="/settings"
              startIcon={<Settings size={16} />}
              sx={{ mt: 3 }}
              variant="outlined"
              size="small">
              Account Settings
            </Button>
          </Paper>
        </Grid>

        {/* Stats / Activity Section */}
        <Grid size={{ md: 8, xs: 12 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Activity Overview
            </Typography>
            {/* Replace with actual stats */}
            <Grid container spacing={2}>
              <Grid size={{ md: 8, xs: 12 }}>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Courses Completed
                </Typography>
              </Grid>
              <Grid size={{ md: 8, xs: 12 }}>
                <Typography variant="h4" color="secondary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lessons Watched
                </Typography>
              </Grid>
              {/* Add more stats */}
            </Grid>
          </Paper>

          {/* Placeholder for Saved/Bookmarked Content */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Star size={20} /> Saved Content
            </Typography>
            <Typography color="text.secondary">
              Your saved courses and videos will appear here.
            </Typography>
            {/* Add List/Grid of saved items later */}
          </Paper>

          {/* Placeholder for Instructor/Admin Content */}
          {(user.role === "instructor" || user.role === "admin") && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BookCopy size={20} /> My Content
              </Typography>
              <Typography color="text.secondary">
                Your created courses and videos will appear here.
              </Typography>
              {/* Add Link to Instructor/Admin Dashboard */}
              {user.role === "admin" && (
                <Button
                  component={Link}
                  href="/admin"
                  startIcon={<ShieldCheck size={16} />}
                  sx={{ mt: 2 }}>
                  Go to Admin Panel
                </Button>
              )}
              {user.role === "instructor" && (
                <Button
                  component={Link}
                  href="/instructor"
                  startIcon={<BookCopy size={16} />}
                  sx={{ mt: 2 }}>
                  Go to Instructor Panel
                </Button>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
