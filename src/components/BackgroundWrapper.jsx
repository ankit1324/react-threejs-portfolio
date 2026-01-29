import React from "react";
import { StarsCanvas } from "./canvas";
import CursorTrail from "./CursorTrail";
import ScrollProgress, { ScrollToTop } from "./ScrollProgress";
import CommandPalette from "./CommandPalette";
import FloatingActionButton from "./FloatingActionButton";
import SpotlightEffect from "./SpotlightEffect";
import MouseFollower from "./MouseFollower";
import GridPattern from "./GridPattern";
import BackgroundBeams from "./BackgroundBeams";
import ParticleBackground from "./ParticleBackground";
import SmoothScroll from "./SmoothScroll";

const BackgroundWrapper = () => {
  return (
    <>
      <div className="noise-overlay" />
      <SmoothScroll />
      <CursorTrail />
      <ScrollProgress />
      <ScrollToTop />
      <CommandPalette />
      <FloatingActionButton />
      <SpotlightEffect />
      <MouseFollower />
      <GridPattern />
      <BackgroundBeams />
      <ParticleBackground />
      <div className="aurora aurora--violet -top-32 -left-24" />
      <div className="aurora aurora--cyan top-1/3 -right-10" />
      <div className="aurora aurora--pink bottom-0 left-1/4" />
      <StarsCanvas />
    </>
  );
};

export default BackgroundWrapper;
