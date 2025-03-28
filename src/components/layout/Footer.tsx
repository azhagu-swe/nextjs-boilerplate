// src/components/layout/Footer.tsx
import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
// Import Icon component from @iconify/react
import { Icon } from "@iconify/react";
// Import specific icons if you prefer, or use strings as below
// import githubFill from '@iconify/icons-akar-icons/github-fill';
// import linkedinBoxFill from '@iconify/icons-akar-icons/linkedin-box-fill';
// import twitterFill from '@iconify/icons-akar-icons/twitter-fill';
// import instagramFill from '@iconify/icons-akar-icons/instagram-fill';

// Styled components (keep as defined before)
const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  marginTop: theme.spacing(5),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  width: "100%",
}));

const SocialMediaLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  "& a": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(0, 1.5),
    color: theme.palette.text.secondary, // Start with secondary color
    transition: "color 0.3s, transform 0.3s",
    "&:hover": {
      color: theme.palette.primary.main, // Hover to primary color
      transform: "translateY(-2px)",
    },
  },
}));

const FooterQuote = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontStyle: "italic",
  maxWidth: "500px",
}));
// --- End Styled Components ---

const Footer = () => {
  return (
    <FooterBox as="footer">
      {/* Inspiring Quotes */}
      <FooterQuote variant="body2" align="center">
        {"Coding is my art, and this site is my canvas."}
      </FooterQuote>
      <FooterQuote variant="body2" align="center" sx={{ mb: 2 }}>
        {`Keep learning, keep building. Your next 'aha!' moment awaits! ✨`}
      </FooterQuote>

      <SocialMediaLinks>
        {/* Using Iconify Icons */}
        <Link href="https://github.com/azhagu-swe" passHref target="_blank">
          <Icon icon="akar-icons:github-fill" width="24" height="24" />
        </Link>
        <Link href="https://linkedin.com/in/azhagu379" passHref target="_blank">
          <Icon icon="akar-icons:linkedin-box-fill" width="24" height="24" />
        </Link>
        <Link href="https://twitter.com/azhagu-swe" passHref target="_blank">
          <Icon icon="akar-icons:twitter-fill" width="24" height="24" />
        </Link>
        <Link href="https://instagram.com/azhagu.dev" passHref target="_blank">
          <Icon icon="akar-icons:instagram-fill" width="24" height="24" />
        </Link>
      </SocialMediaLinks>

      <Typography variant="caption" align="center">
        Crafted with ❤️ by Azhagu-swe
        <br />
        &copy; {new Date().getFullYear()} CodeMaster Tutorials. All rights
        reserved.
      </Typography>
    </FooterBox>
  );
};

export default Footer;
