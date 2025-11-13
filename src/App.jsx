import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Education,
  Experience,
  Extracurricular,
  Hero,
  Navbar,
  Tech,
  Terminal,
  Works,
  Assistant,
  StarsCanvas,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="aurora aurora--violet -top-32 -left-24" />
        <div className="aurora aurora--cyan top-1/3 -right-10" />
        <div className="aurora aurora--pink bottom-0 left-1/4" />
        <StarsCanvas />
        <Navbar />
        <main className="relative z-10 flex flex-col gap-6">
          <Hero />
          <About />
          <Education />
          <Experience />
          <Terminal />
          <Extracurricular />
          <Tech />
          <Works />
          <Contact />
        </main>
        <Assistant />
      </div>
    </BrowserRouter>
  );
}

export default App;
