import { useEffect, useState } from "react";

/** Reactive matchMedia. */
export function useMedia(query: string, fallback = false) {
  const get = () => (typeof window === "undefined" ? fallback : window.matchMedia(query).matches);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}
