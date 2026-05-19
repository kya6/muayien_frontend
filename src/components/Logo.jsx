// Reusable brand mark. The path is the 4-pointed concave star from the
// official "Muayien - Green.svg" asset, recolorable via the `fill` prop.

export default function Logo({ className = 'h-8 w-8', fill = '#39EB92' }) {
  return (
    <svg
      viewBox="0 0 412 412"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Muayien"
      role="img"
    >
      <path
        d="M412 206C298.674 206 206.72 114.49 206.004 1.33203L206 0C206 113.771 113.771 206 0 206C113.326 206 205.279 297.51 205.996 410.668L206 412C206 298.229 298.229 206 412 206Z"
        fill={fill}
      />
    </svg>
  )
}

// Wordmark = logo + "Muayien" text. Use this in the navbar and sidebar.
export function Wordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo className="h-7 w-7" />
      <span className="text-lg font-semibold tracking-tight text-white">
        Muayien
      </span>
    </div>
  )
}
