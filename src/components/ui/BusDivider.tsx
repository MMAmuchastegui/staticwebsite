export default function BusDivider({ className = "" }: { className?: string }) {
  return <div className={`bus-divider ${className}`} aria-hidden="true" />;
}