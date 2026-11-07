export default function Button({
  children,
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-navy",
    cta: "bg-brand-orange text-white hover:bg-orange-hover",
    outline: "border border-line bg-white text-brand-blue hover:bg-table-head",
    danger: "bg-danger text-white hover:opacity-90",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
