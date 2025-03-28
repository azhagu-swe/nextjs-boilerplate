// src/app/(app)/series/[seriesId]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar, // To show creator
  Tooltip,
} from "@mui/material";

// Import Lucide icons
import { Tv, Play, ListVideo, ArrowLeft, User as UserIcon, Clock } from "lucide-react";

// Assuming direct JSON import for mock data (replace with API call later)
import seriesData from "@/data/series.json";
import episodesData from "@/data/episodes.json"; // Assuming episodes have details here
import usersData from "@/data/users.json";
import { Series, Episode, User } from "@/types"; // Import your types

// --- Mock Data Fetching Function ---
async function getSeriesDetails(seriesId: string): Promise<{
  series: Series;
  episodes: Episode[];
  creator: User | null;
} | null> {
  const series = (seriesData as Series[]).find((s) => s.id === seriesId);
  if (!series) {
    return null;
  }

  // Find episodes belonging to this series
  const episodes = (episodesData as Episode[])
    .filter((ep) => series.episodeIds.includes(ep.id))
    // Optional: Sort episodes by episodeNumber if available
    .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));

  // Find creator details
  const creator =
    (usersData as User[]).find((u) => u.id === series.creatorId) || null;

  return { series, episodes, creator };
}
// --- End Mock Data Fetching ---

// Server Component for the Series Detail Page
export default async function SeriesPage({
  params,
}: {
  params: { seriesId: string };
}) {
  const data = await getSeriesDetails(params.seriesId);

  // Handle series not found
  if (!data) {
    notFound();
  }

  const { series, episodes, creator } = data;
  const firstEpisodeHref =
    episodes.length > 0 ? `/watch/${episodes[0].id}` : "#";

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Back Button */}
      <Button
        component={Link}
        href="/series"
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 3 }}>
        Back to Series List
      </Button>

      {/* Header Section with Playful Dialog */}
      <Paper
        elevation={2}
        sx={{ p: { xs: 2, md: 4 }, mb: 4, overflow: "hidden" }}>
        {/* Use Tv icon */}
        <Tv
          size={48}
          color="secondary.main"
          style={{ marginBottom: "8px", opacity: 0.8 }}
        />

        {/* --- PLAYFUL DIALOG --- */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Now Streaming: {series.title} 📺
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Get ready for a sequential deep dive! This series connects the dots on
          related concepts. Choose an episode below to begin the marathon. 🍿
        </Typography>
        {/* --- END PLAYFUL DIALOG --- */}

        {/* Optional: Creator Info */}
        {creator && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Avatar
              src={creator.avatarUrl || undefined}
              sx={{ width: 28, height: 28 }}>
              {!creator.avatarUrl && <UserIcon size={16} />}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              Created by {creator.name}
            </Typography>
          </Box>
        )}

        {/* Description */}
        <Typography variant="body1" paragraph sx={{ mt: 1, mb: 3 }}>
          {series.description}
        </Typography>

        {/* Start Series Button */}
        <Button
          component={Link}
          href={firstEpisodeHref}
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Play />}
          disabled={episodes.length === 0}
          sx={{
            "&:hover": { transform: "scale(1.02)" },
            transition: "transform 0.2s",
          }}>
          {episodes.length > 0 ? "Start Series (Ep 1)" : "No Episodes Yet"}
        </Button>
      </Paper>

      {/* --- Episodes List Section --- */}
      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <ListVideo /> Episode Playlist
        </Typography>
        <Paper elevation={1} sx={{}}>
          {" "}
          {/* No extra padding, List handles it */}
          {episodes && episodes.length > 0 ? (
            <List disablePadding>
              {episodes.map((episode, index) => (
                <ListItem
                  key={episode.id}
                  disablePadding
                  divider={index < episodes.length - 1}>
                  <ListItemButton
                    component={Link}
                    href={`/watch/${episode.id}`} // Link to the specific episode watch page
                    sx={{ py: 2 }} // More vertical padding for list items
                  >
                    <ListItemIcon
                      sx={{ minWidth: 50, textAlign: "center", mr: 1 }}>
                      {/* Display episode number clearly */}
                      <Typography variant="h6" color="text.secondary">
                        {episode.episodeNumber || index + 1}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={episode.title}
                      primaryTypographyProps={{ fontWeight: 500, mb: 0.5 }}
                      secondary={
                        <Box
                          component="span"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "text.secondary",
                            fontSize: "0.875rem",
                          }}>
                          <Clock size={14} />
                          {Math.round(episode.duration / 60)} min
                          {/* Add other metadata like upload date if needed */}
                        </Box>
                      }
                    />
                    {/* Indicate "Next up" or "Watched" state here later if possible */}
                    <Tooltip title="Watch Episode">
                      <Play /*color="action.active"*/ />
                    </Tooltip>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              color="text.secondary"
              sx={{ p: 4, textAlign: "center" }}>
              Looks like the episodes for this series are still rendering...
              Check back soon!
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
