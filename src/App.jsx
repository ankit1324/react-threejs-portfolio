import "./App.css";
import { Hero } from "./components";
import SplashCursor from "./components/SplashCursor";

function App() {
  return (
    <div className="app-shell">
      <SplashCursor />
      <main className="relative z-10">
        <Hero />
      </main>
    </div>
  );
}

export default App;
