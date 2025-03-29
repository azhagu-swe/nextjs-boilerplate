// src/app/(app)/subscription/page.tsx
"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Check, X, Zap } from "lucide-react"; // Icons
import { useAuth } from "@/providers/AuthProviders"; // Assuming this provides subscription status
import { subscriptionPlans, SubscriptionPlan } from "@/config/subscriptions"; // Import plans

export default function SubscriptionPage() {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth(); // Get user auth state
  const [isLoading, setIsLoading] = useState(false); // For handling button clicks
  const [error, setError] = useState<string | null>(null);

  // --- Simulate User's Current Plan ---
  // In a real app, fetch this status based on the logged-in user
  const currentUserPlanId: SubscriptionPlan["id"] | null = isAuthenticated
    ? "free"
    : null; 

  const handleChoosePlan = async (planId: SubscriptionPlan["id"]) => {
    if (!isAuthenticated) {
      // Redirect to login or show message if needed
      setError("Please log in to choose a plan.");
      return;
    }
    if (planId === currentUserPlanId) return; // Do nothing if clicking current plan

    setIsLoading(true);
    setError(null);
    console.log(`Simulating choosing plan: ${planId} for user: ${user?.id}`);

    // --- Simulate API Call / Redirect to Payment ---
    // Replace with actual logic:
    // - Call backend API to create subscription session
    // - Redirect user to payment provider (Stripe Checkout, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const success = Math.random() > 0.2; // Simulate success
    // --- End Simulation ---

    if (success) {
      console.log(`Redirecting to payment/confirmation for plan ${planId}...`);
      // router.push('/payment-confirmation'); // Example redirect
      alert(
        `Successfully initiated process for ${planId}! (Replace with actual flow)`
      ); // Placeholder alert
    } else {
      console.error(`Failed to initiate process for plan ${planId}`);
      setError(
        `Something went wrong while trying to select the ${planId} plan. Please try again.`
      );
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header Dialog */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Zap size={48} color="secondary.main" style={{ marginBottom: "8px" }} />
        {/* --- PLAYFUL DIALOG --- */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Unlock Pro Features ✨
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto" }}>
          Choose the plan that fits your learning goals and gain access to
          exclusive content, advanced features, and more!
        </Typography>
        {/* --- END PLAYFUL DIALOG --- */}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Pricing Tiers Grid */}
      <Grid container spacing={4} alignItems="stretch">
        {" "}
        {/* alignItems stretch makes cards same height */}
        {subscriptionPlans.map((plan) => (
          <Grid key={plan.id} size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%", // Ensure card takes full grid item height
                display: "flex",
                flexDirection: "column",
                border:
                  plan.id === currentUserPlanId
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`, // Highlight current plan
                position: "relative",
                overflow: "visible", // Allow chip to overflow slightly
              }}
              elevation={plan.isPopular ? 6 : 2} // Elevate popular plan
            >
              {/* Popular Chip */}
              {plan.isPopular && (
                <Chip
                  label="Most Popular"
                  color="secondary"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -12, // Position above card
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontWeight: 600,
                    zIndex: 1, // Ensure above border
                  }}
                />
              )}

              <CardContent sx={{ flexGrow: 1, pt: plan.isPopular ? 4 : 2 }}>
                {" "}
                {/* Adjust padding if chip is present */}
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 600 }}>
                  {plan.name}
                </Typography>
                <Typography variant="h4" component="p" sx={{ mb: 1 }}>
                  {plan.price}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="span"
                    sx={{ ml: 0.5 }}>
                    {plan.price !== "$0"
                      ? plan.id.includes("annual")
                        ? "/ year"
                        : "/ month"
                      : ""}
                  </Typography>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, fontStyle: "italic" }}>
                  {plan.billingCycle}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    minHeight: "40px" /* Ensure consistent height */,
                  }}>
                  {plan.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Features List */}
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Features:
                </Typography>
                <List dense disablePadding>
                  {plan.features.map((feature) => (
                    <ListItem
                      key={feature.text}
                      disableGutters
                      sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {feature.included ? (
                          <Check size={18} color={theme.palette.success.main} />
                        ) : (
                          <X size={18} color={theme.palette.action.disabled} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        slotProps={{
                            primary: { 
                              variant: 'body2',
                              color: feature.included ? 'text.primary' : 'text.disabled'
                            }
                        
                          }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              {/* Action Button */}
              <CardActions sx={{ justifyContent: "center", p: 2, pt: 1 }}>
                <Button
                  fullWidth
                  variant={
                    plan.id === currentUserPlanId ? "outlined" : "contained"
                  } // Style based on current plan
                  color={
                    plan.id === currentUserPlanId
                      ? "primary"
                      : plan.isPopular
                      ? "secondary"
                      : "primary"
                  } // Use accent for popular CTA
                  size="large"
                  onClick={() => handleChoosePlan(plan.id)}
                  disabled={isLoading || plan.id === currentUserPlanId}
                  sx={{ fontWeight: 600 }}>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                  )}
                  {plan.id === currentUserPlanId
                    ? "Current Plan"
                    : plan.ctaText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Optional: Add FAQ or Comparison Table Link */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Need help choosing? Compare plans or visit our FAQ. {/* Add Links */}
        </Typography>
      </Box>
    </Container>
  );
}
