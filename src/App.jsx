import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  About,
  Contact,
  Education,
  Experience,
  Extracurricular,
  Hero,
  Tech,
  Works,
} from "./components";
import ScrollProgress, { ScrollToTop } from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import SplashCursor from "./components/SplashCursor";

const RouteScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <RouteScrollToTop />
        <SmoothScroll />
        <SplashCursor />
        <ScrollProgress />
        <ScrollToTop />
        <main className="relative z-10 flex flex-col gap-6">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/work" element={<Experience />} />
            <Route path="/certifications" element={<Extracurricular />} />
            <Route path="/skills" element={<Tech />} />
            <Route path="/projects" element={<Works />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Hero />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
