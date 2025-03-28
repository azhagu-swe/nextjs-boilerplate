// src/app/(app)/courses/[courseId]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image"; // Import Next.js Image for optimization
import {
  Container, // Use Container for consistent max-width and padding
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // UseTheme can be used within Server Components via helper or passed down if needed for complex logic, but sx prop handles most cases

// Import Lucide icons
import {
  BookOpen,
  User as UserIcon,
  BarChart,
  ListChecks,
  PlayCircle,
  ArrowLeft,
  Clock,
} from "lucide-react";

// Assuming direct JSON import for mock data (replace with API call later)
import coursesData from "@/data/courses.json";
import usersData from "@/data/users.json";
import { Course, User } from "@/types";

// --- Mock Data Fetching Function (Keep as before) ---
async function getCourseData(
  courseId: string
): Promise<{ course: Course; instructor: User | null } | null> {
  // ... (fetch logic remains the same) ...
  const course = (coursesData as Course[]).find((c) => c.id === courseId);
  if (!course) {
    return null;
  }
  const instructor =
    (usersData as User[]).find((u) => u.id === course.instructorId) || null;
  return { course, instructor };
}
// --- End Mock Data Fetching ---

// Server Component for the Course Detail Page
export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const data = await getCourseData(params.courseId);

  if (!data) {
    notFound();
  }

  const { course, instructor } = data;
  const firstLessonHref = course.contentIds?.[0]
    ? `/watch/${course.contentIds[0]}`
    : "#";
  // Calculate total duration roughly (example)
  const totalDurationMinutes = Math.round(
    (course.contentIds?.length || 0) *
      (course.duration / (course.contentIds?.length || 1) / 60)
  ); // Rough estimate

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {" "}
      {/* Use Container for padding/width */}
      {/* Back Button */}
      <Button
        component={Link}
        href="/courses"
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 3, alignSelf: "flex-start" }}>
        Back to Courses
      </Button>
      {/* --- Main Course Info Section --- */}
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Left Column (Image/Video Preview) */}
          <Grid item size={{xs:12,md:5}}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "action.hover",
              }}>
              {/* Use next/image if urls are known and optimized */}
              {course.thumbnailUrl ? (
                <Image
                  src={course.thumbnailUrl}
                  alt={`${course.title} thumbnail`}
                  fill // Use fill to cover the container
                  style={{ objectFit: "cover" }} // Cover ensures image fills space
                  priority // Prioritize loading hero image
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "text.secondary",
                  }}>
                  <BookOpen size={64} />
                </Box>
              )}
              {/* Optional: Add a play button overlay */}
            </Box>
          </Grid>

          {/* Right Column (Details) */}
          <Grid item size={{md:5,xs:12}}>
            {/* --- PLAYFUL DIALOG --- */}
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
              Level Up: {course.title} ✨
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {`Welcome to the learning environment! Let's debug concepts and
              build something awesome. 🚀`}
            </Typography>
            {/* --- END PLAYFUL DIALOG --- */}

            {/* Metadata Row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 3,
                flexWrap: "wrap",
                color: "text.secondary",
              }}>
              {/* Instructor */}
              {instructor && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={instructor.avatarUrl || undefined}
                    sx={{ width: 28, height: 28 }}>
                    {!instructor.avatarUrl && <UserIcon size={16} />}
                  </Avatar>
                  <Typography variant="body2">
                    {" "}
                    Taught by {instructor.name}
                  </Typography>
                </Box>
              )}
              {/* Difficulty */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BarChart size={18} />
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}>
                  {course.difficultyLevel}
                </Typography>
              </Box>
              {/* Duration (Example) */}
              {totalDurationMinutes > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Clock size={18} />
                  <Typography variant="body2">
                    Approx. {totalDurationMinutes} min
                  </Typography>
                </Box>
              )}
              {/* Last Updated (Example - if available) */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <Calendar size={18} />
                     <Typography variant="body2">Updated {new Date(course.uploadDate).toLocaleDateString()}</Typography>
                  </Box> */}
            </Box>

            {/* Description */}
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {course.description}
            </Typography>

            {/* Start Course Button */}
            <Button
              component={Link}
              href={firstLessonHref}
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<PlayCircle />}
              disabled={!firstLessonHref || firstLessonHref === "#"}
              sx={{
                "&:hover": { transform: "scale(1.02)" },
                transition: "transform 0.2s",
              }}>
              Start Course
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* --- Course Content Section --- */}
      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <ListChecks /> Course Content (The Roadmap)
        </Typography>
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
          {" "}
          {/* Slightly less padding inside list */}
          {course.modules && course.modules.length > 0 ? (
            <List disablePadding>
              {course.modules
                .sort((a, b) => a.order - b.order)
                .map(
                  (
                    module,
                    index // Sort modules by order
                  ) => (
                    <ListItem
                      key={module.id}
                      disablePadding
                      divider={index < course.modules.length - 1}
                      sx={{ alignItems: "flex-start" }}>
                      <ListItemIcon sx={{ minWidth: 40, pt: 1.5 }}>
                        {" "}
                        {/* Align icon top */}
                        <Typography variant="h6" color="text.secondary">
                          {String(index + 1).padStart(2, "0")}
                        </Typography>{" "}
                        {/* Padded numbers */}
                      </ListItemIcon>
                      <ListItemButton
                        component={Link}
                        href={`/watch/${course.contentIds[index] || "#"}`} // Adjust link logic as needed
                        sx={{
                          py: 1.5,
                          display: "flex",
                          justifyContent: "space-between",
                        }} // Align items
                      >
                        <ListItemText
                          primary={module.title}
                          primaryTypographyProps={{ fontWeight: 500, mb: 0.5 }} // Style title
                          // secondary={`Est. XX min`} // Add duration if available
                        />
                        <PlayCircle /* color="action.active" */ />{" "}
                        {/* Icon on the right */}
                      </ListItemButton>
                    </ListItem>
                  )
                )}
            </List>
          ) : course.contentIds && course.contentIds.length > 0 ? (
            // Fallback list rendering (as before)
            <List disablePadding></List>
          ) : (
            <Typography
              color="text.secondary"
              sx={{ p: 3, textAlign: "center" }}>
              Course content details are being uploaded! Check back soon.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
