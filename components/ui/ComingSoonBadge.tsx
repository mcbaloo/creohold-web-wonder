export default function ComingSoonBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold leading-none px-2 py-1 rounded-full bg-green-brand/10 text-green-deep border border-green-brand/20 ${className}`}
    >
      Coming soon
    </span>
  );
}
