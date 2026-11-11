import { useEffect, useState } from "react";

/** Local time in a given IANA zone, refreshed every 15s. */
export function useClock(timeZone = "Europe/London") {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 15000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}
