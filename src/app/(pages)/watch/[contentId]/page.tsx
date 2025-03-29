// src/app/(app)/watch/[contentId]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Button,
} from "@mui/material";

// Import data sources and types (replace with API calls)
import episodesData from "@/data/episodes.json";
import videoContentData from "@/data/videoContent.json";
import seriesData from "@/data/series.json";
import coursesData from "@/data/courses.json";
import usersData from "@/data/users.json";
import { Episode, VideoContent, Series, Course, User } from "@/types";

// Import the Client Component Player Wrapper
import { VideoPlayerWrapper } from "@/components/video/VideoPlayerWrapper";
import {
  Clock,
  Tv,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Play,
  UserIcon,
} from "lucide-react";

// Define a unified type for easier handling
type WatchableContent = (Episode | VideoContent) & {
  videoSource?: string;
  sourceId?: string;
};

// --- Mock Data Fetching Function ---
async function getContentData(contentId: string): Promise<{
  content: WatchableContent;
  creator: User | null;
  relatedContext?: {
    type: "series" | "course";
    id: string;
    title: string;
    items: { id: string; title: string; number?: number }[]; // Episodes or Lessons
  };
} | null> {
  let content: WatchableContent | undefined;

  // Check episodes first
  content = (episodesData as Episode[]).find((ep) => ep.id === contentId);

  // If not found in episodes, check general videoContent
  if (!content) {
    content = (videoContentData as VideoContent[]).find(
      (vc) => vc.id === contentId
    );
  }

  if (!content || !content.videoSource || !content.sourceId) {
    return null; // Not found or missing required video fields
  }

  const creator =
    (usersData as User[]).find((u) => u.id === content.creatorId) || null;
  let relatedContext:
    | {
        type: "series" | "course";
        id: string;
        title: string;
        items: { id: string; title: string; number?: number }[];
      }
    | undefined;

  // If it's an episode, find its Series or Course
  if ("seriesId" in content && content.seriesId) {
    const series = (seriesData as Series[]).find(
      (s) => s.id === content.seriesId
    );
    if (series) {
      const relatedEpisodes = (episodesData as Episode[])
        .filter((ep) => series.episodeIds.includes(ep.id))
        .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));
      relatedContext = {
        type: "series",
        id: series.id,
        title: series.title,
        items: relatedEpisodes.map((ep) => ({
          id: ep.id,
          title: ep.title,
          number: ep.episodeNumber,
        })),
      };
    }
  } else if ("courseId" in content && content.courseId) {
    const course = (coursesData as Course[]).find(
      (c) => c.id === content.courseId
    );
    if (course) {
      // Fetch lesson details if needed, or just use IDs/Titles from course object
      const relatedLessons = (episodesData as Episode[]) // Assuming episodes are lessons
        .filter((ep) => course.contentIds.includes(ep.id))
        .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0)); // Assuming episodeNumber represents lesson order
      relatedContext = {
        type: "course",
        id: course.id,
        title: course.title,
        items: relatedLessons.map((ep) => ({
          id: ep.id,
          title: ep.title,
          number: ep.episodeNumber,
        })),
      };
    }
  }

  return { content, creator, relatedContext };
}
// --- End Mock Data Fetching ---

// Server Component for the Watch Page
export default async function WatchPage({
  params,
}: {
  params: { contentId: string };
}) {
  const data = await getContentData(params.contentId);

  if (!data) {
    notFound();
  }

  const { content, creator, relatedContext } = data;

  // Find index of current item in context list for Next/Prev links
  const currentItemIndex =
    relatedContext?.items.findIndex((item) => item.id === content.id) ?? -1;
  const prevItem =
    currentItemIndex > 0 ? relatedContext?.items[currentItemIndex - 1] : null;
  const nextItem =
    relatedContext?.items && currentItemIndex < relatedContext.items.length - 1
      ? relatedContext.items[currentItemIndex + 1]
      : null;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {" "}
      {/* Use wider container */}
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Main Content Area (Player + Details) */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          {/* Video Player */}
          <Box sx={{ mb: 3 }}>
            <VideoPlayerWrapper
              videoSource={content.videoSource!} // Assert non-null as we checked in fetcher
              sourceId={content.sourceId!} // Assert non-null
            />
          </Box>

          {/* Content Details */}
          <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 700, mb: 1 }}>
              {content.title}
            </Typography>
            {/* Context Link (Series/Course) */}
            {relatedContext && (
              <Link
                href={`/${
                  relatedContext.type === "series" ? "series" : "courses"
                }/${relatedContext.id}`}
                passHref>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  component="a"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    "&:hover": { textDecoration: "underline" },
                  }}>
                  {relatedContext.type === "series" ? (
                    <Tv size={18} />
                  ) : (
                    <BookOpen size={18} />
                  )}
                  Part of: {relatedContext.title}
                </Typography>
              </Link>
            )}

            {/* Creator & Metadata */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                color: "text.secondary",
                flexWrap: "wrap",
              }}>
              {creator && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={creator.avatarUrl || undefined}
                    sx={{ width: 24, height: 24 }}>
                    {!creator.avatarUrl && <UserIcon size={14} />}
                  </Avatar>
                  <Typography variant="body2">{creator.name}</Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Clock size={16} />
                <Typography variant="body2">
                  {Math.round(content.duration / 60)} min
                </Typography>
              </Box>
              <Typography variant="body2">
                Uploaded: {new Date(content.uploadDate).toLocaleDateString()}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph>
              {content.description}
            </Typography>

            {/* Placeholder for actions like like/bookmark */}
            <Box sx={{ mt: 3 }}>{/* Add Like/Bookmark buttons later */}</Box>
          </Paper>

          {/* Placeholder for Comments */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Comments
            </Typography>
            <Paper
              elevation={1}
              sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
              Comment section coming soon...
            </Paper>
          </Box>
        </Grid>

        {/* Context Sidebar (Series/Course Playlist) */}
        {relatedContext && (
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                position: "sticky",
                top: 80 /* Adjust based on AppBar height */,
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  px: 1,
                }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}>
                  {relatedContext.type === "series" ? (
                    <Tv size={20} />
                  ) : (
                    <BookOpen size={20} />
                  )}
                  {relatedContext.title}
                </Typography>
                {/* Add Link back to series/course page */}
                <Link
                  href={`/${
                    relatedContext.type === "series" ? "series" : "courses"
                  }/${relatedContext.id}`}
                  passHref>
                  <Button size="small" endIcon={<ArrowRight size={16} />}>
                    View All
                  </Button>
                </Link>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <List
                dense
                sx={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
                {" "}
                {/* Make list scrollable */}
                {relatedContext.items.map((item, index) => {
                  const isCurrent = item.id === content.id;
                  return (
                    <ListItem
                      key={item.id}
                      disablePadding
                      sx={{
                        backgroundColor: isCurrent
                          ? (theme) => theme.palette.action.selected
                          : "transparent",
                      }}>
                      <ListItemButton
                        component={Link}
                        href={`/watch/${item.id}`}
                        sx={{
                          background: isCurrent
                            ? (theme) => theme.palette.action.selected
                            : "transparent",
                        }}>
                        <ListItemIcon
                          sx={{
                            minWidth: 36,
                            color: isCurrent
                              ? "primary.main"
                              : "text.secondary",
                          }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: isCurrent ? 600 : 400 }}>
                            {item.number || index + 1}
                          </Typography>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{
                            variant: "body2",
                            fontWeight: isCurrent ? 600 : 400,
                            noWrap: true,
                          }}
                        />
                        {isCurrent && <Play size={16} color="primary" />}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              {/* Optional Prev/Next Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  px: 1,
                }}>
                <Button
                  size="small"
                  startIcon={<ArrowLeft size={16} />}
                  disabled={!prevItem}
                  component={Link}
                  href={prevItem ? `/watch/${prevItem.id}` : "#"}>
                  Prev
                </Button>
                <Button
                  size="small"
                  endIcon={<ArrowRight size={16} />}
                  disabled={!nextItem}
                  component={Link}
                  href={nextItem ? `/watch/${nextItem.id}` : "#"}>
                  Next
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
