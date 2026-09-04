const COLORS: Record<string, string> = {
  green: "var(--color-green-signal)",
  red: "var(--color-red)",
  amber: "var(--color-amber)",
};

export default function StatusDot({
  color = "green",
  live = true,
}: {
  color?: "green" | "red" | "amber";
  live?: boolean;
}) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${live ? "status-dot-live" : ""}`}
      style={{ background: COLORS[color], boxShadow: `0 0 6px ${COLORS[color]}` }}
      aria-hidden="true"
    />
  );
}