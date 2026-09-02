export default function Header() {
  return (
    <header className="app-header">
      <svg className="mascot" viewBox="0 0 64 64" fill="none">
        <g transform="translate(32,37) scale(0.74)">
          <path d="M-15 -26 Q-20 -50 -9 -52 Q-3 -36 -5 -18" fill="#FFE3DA" />
          <path d="M15 -26 Q20 -50 9 -52 Q3 -36 5 -18" fill="#FFE3DA" />
          <circle cx="0" cy="0" r="27" fill="#FFE3DA" />
          <circle cx="0" cy="0" r="20" fill="#FFFFFF" />
          <circle cx="-6" cy="-2" r="2.2" fill="#3D3427" />
          <circle cx="6" cy="-2" r="2.2" fill="#3D3427" />
          <circle cx="-13" cy="7" r="5.5" fill="#FF9A82" opacity="0.7" />
          <circle cx="13" cy="7" r="5.5" fill="#FF9A82" opacity="0.7" />
          <path d="M-5 5 Q0 8 5 5" stroke="#3D3427" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <g transform="translate(-31,21) rotate(-18)">
            <rect x="-1.5" y="0" width="3" height="13" rx="1.5" fill="#FF9A82" />
            <ellipse cx="0" cy="-4.5" rx="4.2" ry="5.8" fill="#FF9A82" />
          </g>
          <g transform="translate(31,21) rotate(18)">
            <rect x="-1.4" y="0" width="2.8" height="11" rx="1.4" fill="#FF9A82" />
            <rect x="-3.2" y="-7.5" width="1.6" height="7.5" rx="0.8" fill="#FF9A82" />
            <rect x="-0.8" y="-8.5" width="1.6" height="8.5" rx="0.8" fill="#FF9A82" />
            <rect x="1.6" y="-7.5" width="1.6" height="7.5" rx="0.8" fill="#FF9A82" />
          </g>
        </g>
      </svg>
      <div>
        <h1>이유식콕</h1>
        <p className="subtitle">
          작은 재료 하나도 놓치지 않고 <span className="hand">콕콕</span> 골라내면, 안심 메뉴만 쏙!
        </p>
      </div>
    </header>
  );
}
