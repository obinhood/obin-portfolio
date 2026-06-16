import { useEffect } from "react";

/** Adds the fixed film-grain overlay (defined in index.css via .grain::after). */
export default function Grain() {
  useEffect(() => {
    document.body.classList.add("grain");
    return () => document.body.classList.remove("grain");
  }, []);
  return null;
}
