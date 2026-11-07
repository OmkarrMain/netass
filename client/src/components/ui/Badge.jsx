const styles = {
  success: "bg-green-100 text-success",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-danger",
  info: "bg-sky-100 text-brand-blue",
  neutral: "bg-gray-100 text-muted",
};

export default function Badge({ children, variant = "neutral" }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
