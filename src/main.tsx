import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { ThemeProvider } from "@/lib/theme";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* reducedMotion="user" makes Framer Motion drop transform/scroll animations
        for visitors with prefers-reduced-motion (the CSS @media block can't). */}
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MotionConfig>
  </StrictMode>
);
