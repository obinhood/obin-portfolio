/* Small cartographic furniture: scale bar and north arrow. */

export function ScaleBar({ className = "" }: { className?: string }) {
  return (
    <svg width="132" height="26" viewBox="0 0 132 26" className={`text-ink ${className}`} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={2 + i * 32}
          y={14}
          width={32}
          height={5}
          fill={i % 2 ? "transparent" : "currentColor"}
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
      <g className="fill-current font-mono" fontSize="8.5" letterSpacing="0.06em">
        <text x={2} y={9}>0</text>
        <text x={63} y={9}>1</text>
        <text x={114} y={9}>2 km</text>
      </g>
    </svg>
  );
}

export function NorthArrow({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="34" viewBox="0 0 22 34" className={`text-ink ${className}`} aria-hidden>
      <text x="11" y="9" textAnchor="middle" className="fill-current font-mono" fontSize="9">
        N
      </text>
      <path d="M11 12 L17 32 L11 27 L5 32 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M11 12 L11 27 L5 32 Z" fill="currentColor" />
    </svg>
  );
}
