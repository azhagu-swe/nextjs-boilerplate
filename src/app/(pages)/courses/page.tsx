// src/app/(app)/courses/page.tsx
import React from "react";
import Link from "next/link";
import {
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
} from "@mui/material";
import { BookOpen, Library, BarChart } from "lucide-react";
import coursesData from "@/data/courses.json";
import { Course } from "@/types";

async function getAllCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return coursesData as Course[];
}

export default async function CoursesListPage() {
  const courses = await getAllCourses();

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Library
          size={48}
          color="secondary.main"
          style={{ marginBottom: "8px" }}
        />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Explore the Course Library 📚
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto" }}>
          Think of this as the package manager for your brain. Browse the
          courses below and `npm install` some new knowledge! 😉
        </Typography>
      </Box>
      {courses && courses.length > 0 ? (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                  height="180" // Slightly taller image maybe
                  image={course.thumbnailUrl || "/placeholder-image.jpg"}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    noWrap
                    title={course.title}>
                    {course.title}
                  </Typography>
                  <Chip
                    label={course.difficultyLevel}
                    icon={<BarChart size={16} />}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize", mb: 1 }}
                    color={
                      course.difficultyLevel === "beginner"
                        ? "success"
                        : course.difficultyLevel === "intermediate"
                        ? "warning"
                        : "error"
                    }
                  />
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
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "flex-start", pl: 2, pb: 2 }}>
                  <Button
                    component={Link}
                    href={`/courses/${course.id}`} // Link to the specific course page
                    size="small"
                    startIcon={<BookOpen size={16} />}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mt: 4 }}>
          No courses available right now. Check back soon!
        </Alert>
      )}
    </Box>
  );
}
