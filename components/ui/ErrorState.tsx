export default function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="#4A6070" strokeWidth="1.5"/>
        <path d="M12 8v4M12 16h.01" stroke="#4A6070" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p className="text-sm text-grey-text">{message ?? "Something went wrong"}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold text-green-brand hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
