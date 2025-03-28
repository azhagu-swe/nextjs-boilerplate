// src/app/(app)/browse/page.tsx
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
  Chip,
  Alert,
  Paper, // For filter section background
  TextField, // Placeholder for Search
  FormControl, // Placeholders for Filters
  InputLabel,
  Select,
  MenuItem,
  Stack,
  InputAdornment, // For filter layout
} from "@mui/material";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  Tv,
  PlaySquare,
  FileText,
  ArrowRight,
} from "lucide-react"; // Icons

// --- Mock Data Loading & Combining ---
// Import all relevant data sources
import coursesData from "@/data/courses.json";
import seriesData from "@/data/series.json";
import videoContentData from "@/data/videoContent.json"; // Vlogs, Standalone, etc.
import episodesData from "@/data/episodes.json"; // Maybe include individual episodes?
// import blogsData from '@/data/blogs.json'; // If you add blogs

import { Course, Series, VideoContent, Episode /*, Blog */ } from "@/types";

// Define a unified content item type
type ContentItem = (Course | Series | VideoContent | Episode) /* | Blog */ & {
  // Ensure a common 'type' field exists if not already standard across all interfaces
  // Add other common fields if needed for sorting/display (like simplified date)
  displayDate: Date;
  contentType: string; // e.g., 'Course', 'Series', 'Vlog', 'Episode', 'Blog'
  href: string; // Link to the content
};

async function getAllContent(): Promise<ContentItem[]> {
  // Simulate fetching and combining
  await new Promise((resolve) => setTimeout(resolve, 50));

  const combinedContent: ContentItem[] = [];

  // Add Courses
  (coursesData as Course[]).forEach((item) =>
    combinedContent.push({
      ...item,
      displayDate: new Date(item.uploadDate),
      contentType: "Course",
      href: `/courses/${item.id}`,
    })
  );

  // Add Series (Series itself might not have uploadDate, use first episode's?)
  (seriesData as Series[]).forEach((item) =>
    combinedContent.push({
      ...item,
      // Attempt to find the first episode's date or use a default/current date
      displayDate: new Date(
        (episodesData as Episode[]).find((ep) =>
          item.episodeIds.includes(ep.id)
        )?.uploadDate || Date.now()
      ),
      contentType: "Series",
      href: `/series/${item.id}`,
    })
  );

  // Add Videos (Vlogs, Standalone, etc. - filter out episodes if they are handled separately)
  (videoContentData as VideoContent[])
    // .filter(item => item.type !== 'episode') // Optional: exclude episodes if listed separately
    .forEach((item) =>
      combinedContent.push({
        ...item,
        displayDate: new Date(item.uploadDate),
        contentType: item.type.charAt(0).toUpperCase() + item.type.slice(1), // Capitalize type
        href: `/watch/${item.id}`, // Assuming a generic watch page
      })
    );

  // Add Episodes (Optional - could make the page very long)
  /*
   (episodesData as Episode[]).forEach(item => combinedContent.push({
      ...item,
      displayDate: new Date(item.uploadDate),
      contentType: 'Episode',
      href: `/watch/${item.id}`
   }));
   */

  // Add Blog Posts (if applicable)
  /*
   (blogsData as Blog[]).forEach(item => combinedContent.push({
      ...item,
      displayDate: new Date(item.publishDate), // Assuming publishDate field
      contentType: 'Blog',
      href: `/blog/${item.id}`
   }));
   */

  // Sort by date, newest first
  combinedContent.sort(
    (a, b) => b.displayDate.getTime() - a.displayDate.getTime()
  );

  return combinedContent;
}
// --- End Mock Data Loading ---

// Helper to get Icon based on type
const ContentIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "course":
      return <BookOpen size={16} />;
    case "series":
      return <Tv size={16} />;
    case "vlog":
    case "standalone":
    case "movie":
    case "song":
    case "episode":
      return <PlaySquare size={16} />;
    case "blog":
      return <FileText size={16} />;
    default:
      return null;
  }
};

// Server Component for Browse Page
export default async function BrowsePage() {
  const contentItems = await getAllContent();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header Section with Playful Dialog */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Search
          size={48}
          color="secondary.main"
          style={{ marginBottom: "8px" }}
        />
        {/* --- PLAYFUL DIALOG --- */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Discover Your Next Skill ✨
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto" }}>
          Your central command for finding courses, series, videos, and
          articles. Use the filters or search below to `grep` exactly what you
          need!
        </Typography>
        {/* --- END PLAYFUL DIALOG --- */}
      </Box>

      {/* Filter/Search Section (Placeholders) */}
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center">
          <TextField
            label="Search Content..."
            variant="outlined"
            size="small"
            fullWidth
            // Replace InputProps with slotProps.input
            slotProps={{
              input: {
                // Props applied to the underlying Input component (e.g., MuiOutlinedInput)
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
                // You could add sx styling specific to the input part here too if needed
                // sx: { ... }
              },
              // If you needed to pass props to the actual <input> element, you'd use htmlInput:
              // htmlInput: { 'aria-label': 'Search content input', ... }
            }}
            // Add state and onChange later for actual search functionality
            // onChange={(e) => setSearchTerm(e.target.value)}
            // value={searchTerm}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select label="Type" defaultValue="all">
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="course">Courses</MenuItem>
              <MenuItem value="series">Series</MenuItem>
              <MenuItem value="video">Videos</MenuItem>{" "}
              {/* Combine video types? */}
              <MenuItem value="blog">Blogs</MenuItem>
              {/* Add state and onChange later */}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Topic</InputLabel>
            <Select label="Topic" defaultValue="all">
              <MenuItem value="all">All Topics</MenuItem>
              {/* Populate topics dynamically or statically */}
              <MenuItem value="react">React</MenuItem>
              <MenuItem value="ai">AI/ML</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              {/* Add state and onChange later */}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<SlidersHorizontal size={18} />}>
            More Filters
          </Button>
        </Stack>
      </Paper>

      {/* Content Grid */}
      {contentItems && contentItems.length > 0 ? (
        <Grid container spacing={4}>
          {contentItems.map((item) => (
            <Grid
              item
              key={`${item.contentType}-${item.id}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              {" "}
              {/* Maybe 4 columns on large screens */}
              {/* Generic Content Card (Ideally a reusable component) */}
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
                  height="160" // Slightly shorter image for more cards?
                  image={item.thumbnailUrl || "/placeholder-general.jpg"}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Content Type Chip */}
                  <Chip
                    label={item.contentType}
                    icon={<ContentIcon type={item.contentType} />}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1, textTransform: "capitalize" }}
                    color="primary" // Or choose color based on type
                  />
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    noWrap
                    title={item.title}
                    sx={{ fontSize: "1.1rem" }}>
                    {" "}
                    {/* Slightly smaller title */}
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", // Limit lines more
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "flex-start", pl: 2, pb: 2 }}>
                  <Button
                    component={Link}
                    href={item.href} // Use the pre-defined href
                    size="small"
                    // Generic label, or customize based on type
                    startIcon={<ArrowRight size={16} />}>
                    View {item.contentType}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mt: 4 }}>
          No content found matching your criteria. Try broadening your search!
        </Alert>
      )}
    </Container>
  );
}
