export function Logo({ className = "", size = "default" }) {
  const sizes = {
    small: "h-8 w-8",
    default: "h-9 w-9",
    large: "h-12 w-12",
  };

  const sizeClass = sizes[size] || sizes.default;

  return (
    <div className={`${sizeClass} ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-label="F&D Staging Logo"
      >
        {/* White circle background */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="white"
        />
        
        {/* Golden-brown elegant border */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="#c9a26b"
          strokeWidth="1.5"
          className="text-luxaccent"
        />
        
        {/* Bold black F & D text - sans-serif */}
        <text
          x="50"
          y="58"
          fontSize="24"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="#1f1f1f"
          textAnchor="middle"
          letterSpacing="0.05em"
          className="text-luxtxt"
        >
          F &amp; D
        </text>
      </svg>
    </div>
  );
}

