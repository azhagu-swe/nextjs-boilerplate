import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Container,
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

import {
  BookOpen,
  User as UserIcon,
  BarChart,
  ListChecks,
  PlayCircle,
  ArrowLeft,
  Clock,
} from "lucide-react";

import coursesData from "@/data/courses.json";
import usersData from "@/data/users.json";
import { Course, User } from "@/types";

async function getCourseData(
  courseId: string
): Promise<{ course: Course; instructor: User | null } | null> {
  const course = (coursesData as Course[]).find((c) => c.id === courseId);
  if (!course) {
    return null;
  }
  const instructor =
    (usersData as User[]).find((u) => u.id === course.instructorId) || null;
  return { course, instructor };
}

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
  const totalDurationMinutes = Math.round(
    (course.contentIds?.length || 0) *
      (course.duration / (course.contentIds?.length || 1) / 60)
  ); // Rough estimate

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Button
        component={Link}
        href="/courses"
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 3, alignSelf: "flex-start" }}>
        Back to Courses
      </Button>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "action.hover",
              }}>
              {course.thumbnailUrl ? (
                <Image
                  src={course.thumbnailUrl}
                  alt={`${course.title} thumbnail`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
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
            </Box>
          </Grid>

          <Grid size={{ md: 5, xs: 12 }}>
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 3,
                flexWrap: "wrap",
                color: "text.secondary",
              }}>
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BarChart size={18} />
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}>
                  {course.difficultyLevel}
                </Typography>
              </Box>
              {totalDurationMinutes > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Clock size={18} />
                  <Typography variant="body2">
                    Approx. {totalDurationMinutes} min
                  </Typography>
                </Box>
              )}
            </Box>

            {/*  */}
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {course.description}
            </Typography>

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
      <Box>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <ListChecks /> Course Content (The Roadmap)
        </Typography>
        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 } }}>
          {course.modules && course.modules.length > 0 ? (
            <List disablePadding>
              {course.modules
                .sort((a, b) => a.order - b.order)
                .map((module, index) => (
                  <ListItem
                    key={module.id}
                    disablePadding
                    divider={index < course.modules.length - 1}
                    sx={{ alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 40, pt: 1.5 }}>
                      <Typography variant="h6" color="text.secondary">
                        {String(index + 1).padStart(2, "0")}
                      </Typography>{" "}
                    </ListItemIcon>
                    <ListItemButton
                      component={Link}
                      href={`/watch/${course.contentIds[index] || "#"}`}
                      sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <ListItemText
                        primary={module.title}
                        primaryTypographyProps={{ fontWeight: 500, mb: 0.5 }}
                      />
                      <PlayCircle />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          ) : course.contentIds && course.contentIds.length > 0 ? (
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
