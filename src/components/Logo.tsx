interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const h = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const w = Math.round(h * 3.8);
  const kiaColor = variant === "light" ? "#FFFFFF" : "#05141F";
  const subColor = "#BB162B";

  return (
    <svg width={w} height={h} viewBox="0 0 152 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="KIA Hồ Chí Minh">
      {/* Red left accent bars */}
      <rect x="0" y="4" width="5" height="32" rx="2.5" fill={subColor} />
      <rect x="8" y="10" width="3" height="20" rx="1.5" fill={subColor} opacity="0.5" />

      {/* KIA wordmark */}
      <text
        x="18" y="28"
        fontFamily="'Arial Black', 'Arial', sans-serif"
        fontSize="26"
        fontWeight="900"
        fontStyle="italic"
        fill={kiaColor}
        letterSpacing="-1"
      >
        KIA
      </text>

      {/* Divider */}
      <line x1="72" y1="8" x2="72" y2="32" stroke={subColor} strokeWidth="1.5" opacity="0.4" />

      {/* Dealership name */}
      <text
        x="78" y="17"
        fontFamily="'Arial', sans-serif"
        fontSize="8.5"
        fontWeight="700"
        fill={subColor}
        letterSpacing="1.5"
      >
        HỒ CHÍ MINH
      </text>
      <text
        x="78" y="30"
        fontFamily="'Arial', sans-serif"
        fontSize="7.5"
        fontWeight="500"
        fill={variant === "light" ? "rgba(255,255,255,0.7)" : "#64748b"}
        letterSpacing="0.5"
      >
        Đại lý chính hãng
      </text>
    </svg>
  );
}
