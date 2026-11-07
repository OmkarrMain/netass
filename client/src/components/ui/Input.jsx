export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-ink">{label}</label>
      )}

      <input
        className={`w-full rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
