/** Original vector artwork: light to load, decorative, and sharp at every size. */
export function SailingIllustration() {
  return (
    <div aria-hidden="true" className="hero-art pointer-events-none relative mx-auto w-full max-w-[240px] select-none md:max-w-none">
      <svg viewBox="0 0 520 550" fill="none" focusable="false">
        <defs>
          <linearGradient id="sea" x1="115" y1="70" x2="450" y2="520" gradientUnits="userSpaceOnUse"><stop stopColor="#c9dbcf" /><stop offset="1" stopColor="#8bb7ac" /></linearGradient>
          <linearGradient id="sail" x1="230" y1="160" x2="352" y2="336" gradientUnits="userSpaceOnUse"><stop stopColor="#fffdf5" /><stop offset="1" stopColor="#e9e7d8" /></linearGradient>
          <clipPath id="chart-frame"><rect x="40" y="35" width="440" height="475" rx="220" /></clipPath>
        </defs>
        <rect x="26" y="21" width="468" height="503" rx="234" stroke="#bccfc3" />
        <g clipPath="url(#chart-frame)">
          <rect x="40" y="35" width="440" height="475" fill="url(#sea)" />
          <g opacity=".25" stroke="#39766a" strokeWidth=".8">
            {[110,190,270,350,430].map((x) => <path key={x} d={`M${x} 35v475`} />)}
            {[110,190,270,350,430].map((y) => <path key={y} d={`M40 ${y}h440`} />)}
          </g>
          <g stroke="#e9f0e4" strokeWidth="1.2" opacity=".65">
            <path className="sea-line" d="M-10 165C90 100 153 129 171 200S138 335 245 369s149-40 293 6" />
            <path className="sea-line" d="M-10 185C75 119 132 145 151 213S112 355 230 391s166-36 308 6" />
            <path className="sea-line" d="M-10 206C59 139 112 164 129 225S92 375 214 413s182-34 324 8" />
            <path className="sea-line" d="M-10 229C43 159 92 185 108 238S73 396 198 436s197-30 340 9" />
            <path className="sea-line" d="M-10 253C27 182 71 207 87 251S53 418 182 460s213-28 356 10" />
            <path className="sea-line" d="M-10 277C11 207 52 231 66 265S34 441 166 485s229-26 372 11" />
          </g>
          <circle cx="365" cy="146" r="44" fill="#f1eee0" opacity=".8" />
          <path className="chart-route" d="M109 465C237 437 369 450 384 379S273 311 292 233 393 222 444 88" stroke="#a15e47" strokeWidth="1.5" strokeLinecap="round" />
          <g className="hero-sailboat">
            <ellipse cx="273" cy="354" rx="70" ry="10" fill="#174b46" opacity=".09" />
            <path d="m265 155-3 173h-99Z" fill="url(#sail)" />
            <path d="m277 197 77 129h-80Z" fill="#f7f3e7" />
            <path d="m265 155-3 173M277 197l77 129" stroke="#fffdf5" strokeWidth="1.5" />
            <path d="M271 148v187" stroke="#204c49" strokeWidth="2" />
            <path d="m267 158 5-6 23 6-23 7" fill="#b5654b" />
            <path d="M158 335h204l-29 19H190Z" fill="#153f40" />
            <path d="M158 335h204" stroke="#fff9e9" strokeWidth="3" />
            <path d="M202 366c24 7 100 7 132-2" stroke="#f6f3e6" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <circle cx="110" cy="465" r="4" fill="#f7f5ef" stroke="#a15e47" strokeWidth="1.5" />
          <circle cx="443" cy="91" r="4" fill="#f7f5ef" stroke="#a15e47" strokeWidth="1.5" />
        </g>
        <g transform="translate(442 56)" stroke="#24685f" strokeWidth="1">
          <circle r="27" fill="#f7f5ef" /><path d="M0-20v40m-20-20h40M-14-14l28 28m0-28L-14 14" opacity=".5" />
          <path d="M0-18 5 5 0 1-5 5Z" fill="#24685f" /><path d="M0 18 5-5 0-1-5-5Z" fill="#f7f5ef" />
        </g>
        <g transform="translate(24 386)">
          <rect width="125" height="49" rx="3" fill="#f7f5ef" stroke="#b7cabd" />
          <path d="M15 16h18m-18 7h12m-12 7h18" stroke="#24685f" strokeWidth="1.2" />
          <text x="44" y="29" fill="#52666a" fontFamily="monospace" fontSize="10" letterSpacing="1">36°43′N</text>
        </g>
        <path d="M44 65v14m-7-7h14m420 385v14m-7-7h14" stroke="#7d9f90" />
      </svg>
    </div>
  );
}
