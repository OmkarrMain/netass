import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function ToastHost() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    function showToast(event) {
      setToast(event.detail);
    }

    window.addEventListener("netass:toast", showToast);

    return () => window.removeEventListener("netass:toast", showToast);
  }, []);

  if (!toast) return null;

  const success = toast.type !== "error";

  return (
    <div className="fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-xl">
      {success ? (
        <CheckCircle2 className="shrink-0 text-success" />
      ) : (
        <XCircle className="shrink-0 text-danger" />
      )}

      <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>

      <button onClick={() => setToast(null)} aria-label="Close notification">
        <X size={18} className="text-muted" />
      </button>
    </div>
  );
}
