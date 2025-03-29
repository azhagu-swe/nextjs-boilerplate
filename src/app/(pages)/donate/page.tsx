// src/app/(app)/donate/page.tsx
"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  TextField, // For custom amount
  InputAdornment,
  ToggleButton, // For preset amounts
  ToggleButtonGroup, // For preset amounts
  CircularProgress,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Heart, Coffee, DollarSign, Gift } from "lucide-react"; // Icons

// Preset donation amounts
const presetAmounts = [5, 10, 25, 50];

export default function DonationPage() {
  const theme = useTheme();
  const [selectedAmount, setSelectedAmount] = useState<number | string | null>(
    10
  ); // Default selection or null
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (
    event: React.MouseEvent<HTMLElement>,
    newAmount: number | string | null
  ) => {
    if (newAmount !== null) {
      setSelectedAmount(newAmount);
      setCustomAmount(""); // Clear custom amount if preset is selected
    }
  };

  const handleCustomAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // Allow only numbers and potentially a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount("custom"); // Indicate custom amount is active
    }
  };

  // Determine the final amount to donate
  const finalAmount =
    selectedAmount === "custom"
      ? parseFloat(customAmount) || 0
      : (selectedAmount as number);

  const handleDonate = async () => {
    setError(null);
    if (finalAmount <= 0) {
      setError("Please select or enter a valid donation amount.");
      return;
    }

    setIsLoading(true);
    console.log(`Simulating donation process for $${finalAmount}`);

    // --- Simulate Redirect/API Call to Payment Gateway ---
    // Replace with actual logic:
    // - Redirect to Stripe Payment Link, PayPal, BuyMeACoffee, etc.
    // - Example: window.location.href = 'https://your-donation-link.com?amount=' + finalAmount;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const success = Math.random() > 0.1; // Simulate success
    // --- End Simulation ---

    if (success) {
      console.log("Redirecting to external donation platform...");
      alert(
        `Thank you for your generous $${finalAmount} donation! (Redirect simulation)`
      );
      // Reset state maybe? Or redirect to a thank you page
      // setSelectedAmount(10); setCustomAmount('');
    } else {
      setError(
        "Something went wrong processing the donation. Please try again later."
      );
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        {/* Header Dialog */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Coffee
            size={48}
            color={theme.palette.secondary.main}
            style={{ marginBottom: "8px" }}
          />
          {/* --- PLAYFUL DIALOG --- */}
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}>
            Fuel Our Servers (& Coffee!) ☕️💻
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}>
            Enjoying the free tutorials? Your optional contribution helps us
            cover costs, create more content, and keep the learning accessible
            to everyone. Thank you! 🙏
          </Typography>
          {/* --- END PLAYFUL DIALOG --- */}
        </Box>

        <Divider sx={{ my: 3 }}>
          <Chip label="Choose Amount" size="small" />
        </Divider>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Amount Selection */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={selectedAmount}
            exclusive
            onChange={handleAmountChange}
            aria-label="donation amount"
            color="primary">
            {presetAmounts.map((amount) => (
              <ToggleButton
                key={amount}
                value={amount}
                aria-label={`$${amount}`}>
                ${amount}
              </ToggleButton>
            ))}
            <ToggleButton value="custom" aria-label="custom amount">
              Custom
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Custom Amount Input (appears if 'custom' is selected) */}
        {selectedAmount === "custom" && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <TextField
              label="Custom Amount"
              id="custom-amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              variant="outlined"
              size="small"
              type="number" // Use number type, though validation handles input
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DollarSign size={16} />
                  </InputAdornment>
                ),
                inputProps: { min: 1, step: "0.01" }, // Basic HTML validation hints
              }}
              sx={{ maxWidth: "200px" }}
            />
          </Box>
        )}

        {/* Donation Button */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="success" // Using success color for donation feels appropriate
            size="large"
            disabled={isLoading || finalAmount <= 0}
            onClick={handleDonate}
            startIcon={isLoading ? undefined : <Heart size={18} />}
            sx={{ minWidth: "200px", fontWeight: 600, py: 1.5 }}>
            {
              isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Donate $${finalAmount}`
              ) // Show selected amount
            }
          </Button>
        </Box>

        {/* Optional: How donations help section */}
        <Box sx={{ mt: 5, textAlign: "center", color: "text.secondary" }}>
          <Divider sx={{ mb: 2 }}>
            <Gift size={16} />
          </Divider>
          <Typography variant="body2">
            Your contributions directly support server costs, new course
            development, and keeping core content free. Thank you for being
            awesome!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
