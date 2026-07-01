/* BrewdBro circular logo mark. Source art lives at /public/logo.svg —
   drop a pixel-perfect PNG there as /public/logo.png and swap the src to replace it. */
export function Logo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="BrewdBro"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
