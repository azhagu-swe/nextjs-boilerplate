// src/app/(app)/page.tsx (Alternative: Goal-Oriented Path Finder)

import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar, // For Skill icons maybe
  Chip,
  CardMedia,
} from "@mui/material";
import {
  Map, // For Paths
  Target, // For Goals/Skills
  GraduationCap, // For Beginner
  BookOpen, // For Course link
  ArrowRight,
  Code, // Placeholder Skill Icon
  Cpu, // Placeholder Skill Icon
  Database, // Placeholder Skill Icon
} from "lucide-react";

// --- Mock Data ---
// Replace with actual data fetching or more robust CMS data later

// Mock Learning Paths
const learningPaths = [
  {
    id: "web-dev",
    title: "Web Dev Fundamentals",
    description:
      "Master HTML, CSS, JavaScript, and React to build modern web apps.",
    icon: <Code size={32} />,
    color: "primary",
  },
  {
    id: "ai-basics",
    title: "AI Essentials with Python",
    description:
      "Understand core AI concepts and implement them using Python libraries.",
    icon: <Cpu size={32} />,
    color: "secondary",
  },
  {
    id: "data-sql",
    title: "Data & SQL Bootcamp",
    description: "Learn to manage and query databases effectively using SQL.",
    icon: <Database size={32} />,
    color: "success",
  },
];

// Mock Skills/Topics
const popularSkills = [
  { id: "react", name: "React", icon: <Code size={20} /> },
  { id: "python", name: "Python", icon: <Code size={20} /> },
  { id: "ai-ml", name: "AI/ML", icon: <Cpu size={20} /> },
  { id: "sql", name: "SQL", icon: <Database size={20} /> },
  { id: "nextjs", name: "Next.js", icon: <Code size={20} /> },
];

// Mock Beginner Courses (Fetch or filter from your main course data)
import coursesData from "@/data/courses.json";
import { Course } from "@/types";
const beginnerCourses = (coursesData as Course[])
  .filter((c) => c.difficultyLevel === "beginner")
  .slice(0, 2); // Get first 2 beginner courses

// --- End Mock Data ---

export default async function GoalOrientedHomePage() {
  // const theme = useTheme(); // Can't use hook directly in Server Component top level

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* --- Hero Section --- */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Map size={48} color="secondary.main" style={{ marginBottom: "8px" }} />
        {/* --- PLAYFUL DIALOG --- */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Chart Your Learning Path 🗺️
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto", mb: 3 }}>
          {`Select a goal or technology below, and we'll guide you through the
          necessary skills and tutorials to get you deploying knowledge!`}
        </Typography>
        {/* --- CTAs --- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}>
          {/* Example Path Buttons */}
          <Button
            component={Link}
            href={`/paths/${learningPaths[0]?.id || "#"}`}
            variant="contained"
            size="large"
            color="primary">
            Web Dev Path
          </Button>
          <Button
            component={Link}
            href={`/paths/${learningPaths[1]?.id || "#"}`}
            variant="contained"
            size="large"
            color="secondary">
            AI with Python Path
          </Button>
          <Button
            component={Link}
            href="/browse"
            variant="outlined"
            size="large">
            Browse All Content
          </Button>
        </Box>
      </Box>

      {/* --- Popular Learning Paths Section --- */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Popular Learning Paths
        </Typography>
        <Grid container spacing={4}>
          {learningPaths.map((path) => (
            <Grid key={path.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderTop: `4px solid ${path.color}.main`,
                }}>
                <CardContent sx={{ flexGrow: 1, textAlign: "center", pt: 4 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${path.color}.light`,
                      color: `${path.color}.dark`,
                      width: 56,
                      height: 56,
                      margin: "0 auto 16px auto",
                    }}>
                    {path.icon}
                  </Avatar>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}>
                    {path.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {path.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  {/* CTA */}
                  <Button
                    component={Link}
                    href={`/paths/${path.id}`} // Link to a specific path detail page (needs creating)
                    size="medium"
                    variant="contained"
                    color={path.color as "primary" | "secondary" | "success"} // Use path color
                    endIcon={<ArrowRight size={18} />}>
                    Explore Path
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* --- Skill Focus Section --- */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}>
          <Target /> Focus on a Skill
        </Typography>
        <Grid container spacing={2}>
          {popularSkills.map((skill) => (
            <Grid key={skill.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <Button
                component={Link}
                href={`/browse?skill=${skill.id}`} // Link to browse filtered by skill
                variant="outlined"
                fullWidth
                startIcon={skill.icon}
                sx={{
                  justifyContent: "flex-start",
                  py: 1.5,
                  textTransform: "none",
                }}>
                {skill.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* --- Beginner Starting Points Section --- */}
      {beginnerCourses.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
            <GraduationCap /> Perfect for Beginners
          </Typography>
          <Grid container spacing={4}>
            {beginnerCourses.map((course) => (
              <Grid key={course.id} size={{ xs: 12, sm: 6 }}>
                {" "}
                {/* Show 2 side-by-side */}
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                  }}>
                  {" "}
                  {/* Adjust layout for horizontal card */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: "100%", sm: 160 },
                      height: { xs: 140, sm: "auto" },
                      objectFit: "cover",
                    }}
                    image={course.thumbnailUrl || "/placeholder-image.jpg"}
                    alt={course.title}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography component="div" variant="h6">
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}>
                        {course.description.substring(0, 100)}...{" "}
                        {/* Shorter description */}
                      </Typography>
                      <Chip
                        label={course.difficultyLevel}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </CardContent>
                    <CardActions sx={{ pl: 2, pb: 2 }}>
                      {/* CTA */}
                      <Button
                        component={Link}
                        href={`/courses/${course.id}`}
                        size="small"
                        startIcon={<BookOpen size={16} />}>
                        Start Here!
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
