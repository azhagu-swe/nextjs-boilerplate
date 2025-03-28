// src/app/(app)/series/page.tsx
import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Alert, // For empty state
} from "@mui/material";
import { Tv, Library } from "lucide-react"; // Icons for title and cards

// Assuming direct JSON import for mock data (replace with API call later)
import seriesData from "@/data/series.json";
import { Series } from "@/types"; // Import your Series type

// --- Mock Data Fetching ---
// In a real app, fetch this from your API, perhaps with pagination
async function getAllSeries(): Promise<Series[]> {
  // Simulate fetching all series
  await new Promise((resolve) => setTimeout(resolve, 50)); // Tiny delay simulation
  return seriesData as Series[];
}
// --- End Mock Data Fetching ---

// Server Component for listing all series
export default async function SeriesListPage() {
  const allSeries = await getAllSeries();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {" "}
      {/* Use Container */}
      {/* Header Section with Playful Dialog */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Library
          size={48}
          color="secondary.main"
          style={{ marginBottom: "8px" }}
        />
        {/* --- PLAYFUL DIALOG --- */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Explore the Series Collection 📚
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto" }}>
          Ready for a multi-part journey? Browse our series below and dive deep
          into your favorite topics, episode by episode. 🍿
        </Typography>
        {/* --- END PLAYFUL DIALOG --- */}
      </Box>
      {/* Series Grid */}
      {allSeries && allSeries.length > 0 ? (
        <Grid container spacing={4}>
          {allSeries.map((series) => (
            <Grid key={series.id} size={{ xs: 12, sm: 6, md: 4 }}>
              {/* Reusable SeriesCard Component would be ideal here */}
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={series.thumbnailUrl || "/placeholder-series.jpg"} // Use series thumbnail
                  alt={series.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    noWrap
                    title={series.title}>
                    {series.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {series.description}
                  </Typography>
                  {/* Optional: Add episode count? */}
                  {/* <Typography variant="caption" color="text.secondary" sx={{mt: 1, display: 'block'}}>
                     {series.episodeIds?.length || 0} Episodes
                  </Typography> */}
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "flex-start", pl: 2, pb: 2 }}>
                  <Button
                    component={Link}
                    href={`/series/${series.id}`} // Link to the specific series page
                    size="small"
                    startIcon={<Tv size={16} />}>
                    View Series
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mt: 4 }}>
          No series available just yet. Our writers are hard at work scripting
          the next big saga!
        </Alert>
      )}
    </Container>
  );
}
