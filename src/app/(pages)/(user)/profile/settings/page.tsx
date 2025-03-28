// src/app/(app)/settings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Avatar, // Added Avatar
} from "@mui/material";
import { useAuth } from "@/providers/AuthProviders"; // Adjust path if needed
import { Settings, UserCog, ShieldCheck, Trash2, Save } from "lucide-react"; // Icons
import { useTheme } from "@mui/material/styles";

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth(); // Use mockUpdateUser for demo
  const theme = useTheme();

  // State for forms
  const [name, setName] = useState("");
  // Email change might need a separate flow/component
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // State for UI feedback
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Pre-fill name when user data loads
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setProfileLoading(true);
    setProfileSuccess(null);
    setProfileError(null);
    console.log("Simulating profile update:", { name });

    // --- Simulate API Call ---
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // --- Replace with actual API call ---
    const success = Math.random() > 0.1; // Simulate high success rate

    if (success) {
      //   mockUpdateUser(name); // Update context state (in real app, context would refetch/update)
      setProfileSuccess("Profile updated successfully!");
    } else {
      setProfileError("Failed to update profile. Please try again.");
    }
    setProfileLoading(false);
  };

  const handlePasswordChange = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    setPasswordLoading(true);
    console.log("Simulating password change...");

    // --- Simulate API Call ---
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // --- Replace with actual API call (send current + new password) ---
    const success = Math.random() > 0.2; // Simulate success

    if (success) {
      setPasswordSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword(""); // Clear fields
    } else {
      setPasswordError(
        "Failed to change password. Incorrect current password or server error."
      );
    }
    setPasswordLoading(false);
  };

  // Loading/Not Authenticated State
  if (!isAuthenticated || !user) {
    // Show loading or redirect if preferred
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
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
          <Settings size={40} /> Account Settings ⚙️
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your profile details, security, and preferences.
        </Typography>
      </Box>

      {/* Update Profile Section */}
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <UserCog size={20} /> Update Profile
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handleProfileUpdate}>
          {profileError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {profileError}
            </Alert>
          )}
          {profileSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {profileSuccess}
            </Alert>
          )}
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Avatar
                src={user.avatarUrl || undefined}
                alt={user.name}
                sx={{ width: 64, height: 64 }}>
                {!user.avatarUrl && user.name?.charAt(0).toUpperCase()}
              </Avatar>
              {/* Add Upload Button/Logic here later */}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name / Handle"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={profileLoading}
                sx={{ mb: { xs: 2, sm: 0 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={profileLoading}
                startIcon={<Save size={18} />}>
                {profileLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Save Name"
                )}
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={user.email}
                disabled
                InputProps={{ readOnly: true }}
                helperText="Contact support to change your email address."
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Change Password Section */}
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShieldCheck size={20} /> Change Password
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handlePasswordChange}>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {passwordSuccess}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={passwordLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                autoComplete="new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={passwordLoading}
                error={!!passwordError && passwordError.includes("match")}
              />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={passwordLoading}>
                {passwordLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Placeholder for Notifications */}
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 4, opacity: 0.6 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary">
          Notification preferences coming soon...
        </Typography>
      </Paper>

      {/* Placeholder for Danger Zone */}
      <Paper
        elevation={2}
        sx={{ p: { xs: 2, md: 3 }, borderColor: "error.main", border: 1 }}>
        <Typography
          variant="h6"
          color="error"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Trash2 size={20} /> Danger Zone
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Button variant="outlined" color="error" disabled>
          Delete Account
        </Button>
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Account deletion is permanent. This option is currently disabled.
        </Typography>
      </Paper>
    </Container>
  );
}
