"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy"; // Use lazy loading
import { Box, Skeleton } from "@mui/material";

interface VideoPlayerWrapperProps {
  videoSource: "youtube" | "self-hosted" | "vimeo" | "other" | string; // Allow string for flexibility
  sourceId: string;
}

// Helper to construct URL based on source
const getVideoUrl = (
  sourceType: VideoPlayerWrapperProps["videoSource"],
  sourceId: string
): string => {
  switch (sourceType) {
    case "youtube":
      return `https://www.youtube.com/watch?v=${sourceId}`;
    case "vimeo":
      return `https://vimeo.com/${sourceId}`;
    case "self-hosted":
      // Assuming self-hosted videos are served from /videos/ path
      // Adjust this path based on your actual setup
      return `/videos/${sourceId}`;
    default:
      // Assume sourceId might be a full URL if type is 'other' or unknown
      return sourceId;
  }
};

export function VideoPlayerWrapper({
  videoSource,
  sourceId,
}: VideoPlayerWrapperProps) {
  const [hasWindow, setHasWindow] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // ReactPlayer needs the window object, so only render client-side
    setHasWindow(true);
    setUrl(getVideoUrl(videoSource, sourceId));
  }, [videoSource, sourceId]); // Recalculate URL if props change

  return (
    <Box
      sx={{
        position: "relative",
        paddingTop: "56.25%", // 16:9 aspect ratio
        backgroundColor: "#000", // Black background while loading
        borderRadius: 1, // Optional rounding
        overflow: "hidden", // Keep player contained
      }}>
      {hasWindow ? (
        <ReactPlayer
          url={url}
          controls={true}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          // Add other react-player props as needed (playing, volume, etc.)
        />
      ) : (
        // Show skeleton while waiting for client-side mount
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "grey.900",
          }}
        />
      )}
    </Box>
  );
}
